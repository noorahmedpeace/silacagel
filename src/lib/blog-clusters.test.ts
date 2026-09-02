import { describe, it, expect } from "vitest";
import redirectsConfig from "../../next.config";
import { blogArticles } from "@/app/blog/articles";
import { blogClusters } from "./blog-clusters";
import { isSeoLandingSlug } from "./seo-landing-pages";
import { META_TITLE_LIMIT } from "./seo";

// Cluster links are the only internal path from the blog to a commercial page,
// and a 301 or a 404 in one is invisible until traffic is already lost.

describe("blog cluster links resolve", () => {
  const blogSlugs = new Set(blogArticles.map((a) => a.slug));

  const allLinks = Object.entries(blogClusters).flatMap(([from, c]) =>
    [...c.guides, ...c.products, c.compare, c.industry, c.commercial]
      .filter(Boolean)
      .map((link) => ({ from, href: link!.href, label: link!.label })),
  );

  it("has links to check", () => {
    expect(allLinks.length).toBeGreaterThan(0);
  });

  it("never points at a blog slug that does not exist", () => {
    const broken = allLinks
      .filter((l) => l.href.startsWith("/blog/"))
      .filter((l) => !blogSlugs.has(l.href.replace("/blog/", "")));
    expect(broken).toEqual([]);
  });

  it("never points at a landing slug that does not exist", () => {
    const single = allLinks.filter(
      (l) => !l.href.startsWith("/blog/") && l.href.split("/").filter(Boolean).length === 1,
    );
    const broken = single.filter((l) => !isSeoLandingSlug(l.href.replace("/", "")));
    expect(broken).toEqual([]);
  });
});

describe("blog SERP metadata contract", () => {
  const withTitle = blogArticles.filter((a) => a.metaTitle);
  const withDesc = blogArticles.filter((a) => a.metaDescription);

  it("keeps every hand-written metaTitle inside the SERP limit", () => {
    // These bypass compactMetaTitle entirely - generateMetadata uses
    // `article.metaTitle ?? compactMetaTitle(article.title)` - so nothing
    // truncates them at render time and the length has to hold here.
    const tooLong = withTitle
      .filter((a) => a.metaTitle!.length > META_TITLE_LIMIT)
      .map((a) => `${a.slug} (${a.metaTitle!.length})`);
    expect(tooLong).toEqual([]);
  });

  it("keeps every hand-written metaDescription in the documented 140-158 range", () => {
    const outOfRange = withDesc
      .filter((a) => a.metaDescription!.length < 140 || a.metaDescription!.length > 158)
      .map((a) => `${a.slug} (${a.metaDescription!.length})`);
    expect(outOfRange).toEqual([]);
  });

  it("ends every metaDescription on a complete sentence", () => {
    const unfinished = withDesc
      .filter((a) => !/[.!?]$/.test(a.metaDescription!.trim()))
      .map((a) => a.slug);
    expect(unfinished).toEqual([]);
  });
});

describe("the pages this change targets", () => {
  const bySlug = (s: string) => blogArticles.find((a) => a.slug === s)!;

  it("answers the packet query in the title, which is what it ranks for", () => {
    // 8,595 impressions at position 10.1 and zero clicks for "what is a silica
    // gel packet". The word was in the description but not the title.
    const a = bySlug("what-is-silica-gel-and-how-does-it-work");
    expect(a.metaTitle!.toLowerCase()).toContain("packet");
    expect(a.sections[0].body.toLowerCase()).toContain("silica gel packet is");
  });

  it("does not claim one HS code covers every desiccant chemistry", () => {
    // Clay, calcium chloride and composite desiccants can classify differently,
    // so the description must not imply 2811.22 is universal.
    const a = bySlug("silica-gel-import-customs-hs-code-guide");
    expect(a.metaDescription).toMatch(/can differ|may differ|vary/i);
  });

  it("gives both target articles a commercial destination", () => {
    for (const slug of [
      "what-is-silica-gel-and-how-does-it-work",
      "silica-gel-import-customs-hs-code-guide",
    ]) {
      expect(blogClusters[slug]?.commercial).toBeDefined();
    }
  });
});

describe("no cluster link lands on a redirect", () => {
  it("avoids every configured redirect source", async () => {
    const cfg = redirectsConfig as { redirects?: () => Promise<{ source: string }[]> };
    if (typeof cfg.redirects !== "function") return;
    const sources = new Set((await cfg.redirects()).map((r) => r.source));

    const hits = Object.entries(blogClusters).flatMap(([from, c]) =>
      [...c.guides, ...c.products, c.compare, c.industry, c.commercial]
        .filter(Boolean)
        .filter((l) => sources.has(l!.href))
        .map((l) => `${from} -> ${l!.href}`),
    );
    expect(hits).toEqual([]);
  });
});
