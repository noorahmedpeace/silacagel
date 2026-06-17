#!/usr/bin/env node
/**
 * Daily AI content-freshness for drygelworld.com
 *
 * Picks the stalest blog article (oldest updatedAt), asks Claude to write ONE
 * genuinely useful new buyer FAQ for it, appends that FAQ to the article, and
 * bumps the article's updatedAt + the global sitemapLastModified to today.
 *
 * This is the "real content" freshness path: every run adds a substantive,
 * on-topic Q&A to a real indexed article (good for People-Also-Ask / AI
 * citations) instead of mass-producing thin new posts. Run by the daily
 * GitHub Actions workflow, which then commits, pushes, and pings IndexNow.
 *
 * Requires ANTHROPIC_API_KEY in the environment.
 *
 *   node scripts/daily-blog-ai-faq.mjs
 */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const ARTICLES = join(ROOT, "src", "app", "blog", "articles.ts");
const SEO = join(ROOT, "src", "lib", "seo.ts");

const MODEL = "claude-sonnet-4-6"; // cheap-but-good Sonnet tier
const API_URL = "https://api.anthropic.com/v1/messages";

function today() {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
}

/** Find the slug with the oldest updatedAt in the articlePublication record. */
function pickStalestSlug(src) {
  const re =
    /"([^"]+)":\s*\{\s*publishedAt:\s*"([^"]+)",\s*updatedAt:\s*"([^"]+)"\s*\}/g;
  const list = [];
  let m;
  while ((m = re.exec(src)) !== null) {
    list.push({ slug: m[1], publishedAt: m[2], updatedAt: m[3] });
  }
  if (list.length === 0) throw new Error("No articlePublication entries found.");
  list.sort(
    (a, b) =>
      a.updatedAt.localeCompare(b.updatedAt) ||
      a.publishedAt.localeCompare(b.publishedAt),
  );
  return list[0].slug;
}

/** Scan forward from a `[` to its matching `]`, skipping string contents. */
function matchBracket(src, openIdx) {
  let depth = 0;
  let inStr = null;
  for (let i = openIdx; i < src.length; i++) {
    const c = src[i];
    if (inStr) {
      if (c === "\\") i++;
      else if (c === inStr) inStr = null;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") inStr = c;
    else if (c === "[") depth++;
    else if (c === "]") {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

/** Pull the article's title/description/heading + existing FAQ questions. */
function readArticleContext(src, slug) {
  const slugIdx = src.indexOf(`slug: "${slug}"`);
  if (slugIdx === -1) throw new Error(`Article object not found for slug: ${slug}`);

  const faqsKey = src.indexOf("faqs:", slugIdx);
  if (faqsKey === -1) throw new Error(`faqs array not found for slug: ${slug}`);
  const openIdx = src.indexOf("[", faqsKey);
  const closeIdx = matchBracket(src, openIdx);
  if (closeIdx === -1) throw new Error(`Unbalanced faqs array for slug: ${slug}`);

  const objText = src.slice(slugIdx, openIdx);
  const grab = (key) => {
    const m = objText.match(new RegExp(`${key}:\\s*"((?:[^"\\\\]|\\\\.)*)"`));
    return m ? m[1] : "";
  };
  const faqsText = src.slice(openIdx, closeIdx);
  const questions = [...faqsText.matchAll(/question:\s*"((?:[^"\\]|\\.)*)"/g)].map(
    (m) => m[1],
  );

  return {
    title: grab("title"),
    description: grab("description"),
    label: grab("label"),
    existingQuestions: questions,
    closeIdx,
  };
}

async function generateFaq(ctx) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY is not set.");

  const system =
    "You are the technical content editor for DryGelWorld, a B2B silica gel " +
    "and desiccant exporter (origin: Karachi, Pakistan). You write accurate, " +
    "useful FAQ entries for international procurement buyers. Facts to respect: " +
    "the brand is DryGelWorld; silica gel adsorbs up to ~33% of its own weight " +
    "in water vapor. Never invent specific certifications, prices, lab numbers, " +
    "or claims you cannot stand behind. Keep answers practical and specific.";

  const prompt =
    `Article: "${ctx.title}"\n` +
    `Section/label: ${ctx.label}\n` +
    `Summary: ${ctx.description}\n\n` +
    `These buyer questions are ALREADY answered in this article — do NOT repeat or paraphrase them:\n` +
    ctx.existingQuestions.map((q) => `- ${q}`).join("\n") +
    `\n\nWrite ONE new, genuinely useful B2B buyer FAQ for this article that is ` +
    `not already covered above. The question should be something a real ` +
    `international procurement buyer would ask. The answer must be 40-80 words, ` +
    `specific, accurate, and consistent with the facts in the system prompt.`;

  const body = {
    model: MODEL,
    max_tokens: 1024,
    system,
    messages: [{ role: "user", content: prompt }],
    output_config: {
      format: {
        type: "json_schema",
        schema: {
          type: "object",
          properties: {
            question: { type: "string" },
            answer: { type: "string" },
          },
          required: ["question", "answer"],
          additionalProperties: false,
        },
      },
    },
  };

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Anthropic API ${res.status}: ${text}`);
  }

  const data = await res.json();
  if (data.stop_reason === "refusal") {
    throw new Error("Model refused the request; no FAQ generated.");
  }
  const textBlock = (data.content || []).find((b) => b.type === "text");
  if (!textBlock) throw new Error("No text block in API response.");

  const faq = JSON.parse(textBlock.text);
  if (!faq.question || !faq.answer) throw new Error("FAQ missing question/answer.");
  return faq;
}

function insertFaq(src, closeIdx, faq) {
  const before = src.slice(0, closeIdx).replace(/\s*$/, "");
  const after = src.slice(closeIdx);
  const entry =
    `\n      {\n` +
    `        question: ${JSON.stringify(faq.question)},\n` +
    `        answer: ${JSON.stringify(faq.answer)},\n` +
    `      },\n    `;
  return before + entry + after;
}

function bumpDates(articlesSrc, slug, date) {
  const entryRe = new RegExp(
    `("${slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}":\\s*\\{\\s*publishedAt:\\s*"[^"]+",\\s*updatedAt:\\s*")[^"]+(")`,
  );
  if (!entryRe.test(articlesSrc)) {
    throw new Error(`Could not bump updatedAt for slug: ${slug}`);
  }
  const updatedArticles = articlesSrc.replace(entryRe, `$1${date}$2`);

  let seo = readFileSync(SEO, "utf8");
  const seoRe = /(export const sitemapLastModified = ")[^"]+(";)/;
  if (!seoRe.test(seo)) throw new Error("sitemapLastModified not found in seo.ts");
  seo = seo.replace(seoRe, `$1${date}$2`);
  writeFileSync(SEO, seo);

  return updatedArticles;
}

async function main() {
  const date = today();
  let articles = readFileSync(ARTICLES, "utf8");

  const slug = pickStalestSlug(articles);
  console.log(`Stalest article: ${slug}`);

  const ctx = readArticleContext(articles, slug);
  const faq = await generateFaq(ctx);
  console.log(`New FAQ: ${faq.question}`);

  // Re-read closeIdx against the current source (unchanged) and insert.
  articles = insertFaq(articles, ctx.closeIdx, faq);
  articles = bumpDates(articles, slug, date);
  writeFileSync(ARTICLES, articles);

  console.log(`Appended FAQ to ${slug}; bumped updatedAt + sitemapLastModified to ${date}.`);
  // Expose the slug for the workflow's commit message.
  if (process.env.GITHUB_ENV) {
    writeFileSync(process.env.GITHUB_ENV, `FRESH_SLUG=${slug}\n`, { flag: "a" });
  }
}

main().catch((err) => {
  console.error("daily-blog-ai-faq failed:", err.message);
  process.exit(1);
});
