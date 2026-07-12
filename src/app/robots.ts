import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

// SINGLE SOURCE OF TRUTH for robots policy.
//
// IMPORTANT - edge override: if a CDN/Vercel "managed AI bots" feature is
// enabled, it injects a richer robots.txt at the edge that OVERRIDES this file
// and Disallows GPTBot/ClaudeBot/Google-Extended/CCBot etc. That defeats the
// site's own /llms.txt (which exists to feed those very agents) and makes this
// file dead. Decision here: ALLOW AI grounding (recommended, given the llms.txt
// investment). To make it effective, the managed "block AI bots" toggle must be
// turned OFF in the CDN/Vercel dashboard so this app-generated file is served.
// Verify with:  curl -A Googlebot https://www.drygelworld.com/robots.txt
//
// If AI *training* must instead be blocked while still allowing grounding,
// keep /llms.txt and uncomment the explicit trainer block below - so the policy
// lives in version control rather than an unversioned edge toggle.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/preview", "/preview/", "/admin", "/admin/"],
      },
      // Explicit, version-controlled welcome for AI search / grounding crawlers
      // so the policy is unambiguous. These agents consume /llms.txt and can
      // cite the site in AI answers. To instead BLOCK them, change `allow: "/"`
      // to `disallow: "/"` here.
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-Web",
          "anthropic-ai",
          "PerplexityBot",
          "Perplexity-User",
          "Google-Extended",
          "Bingbot",
          "CCBot",
        ],
        allow: "/",
        disallow: ["/preview", "/preview/"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl(),
  };
}
