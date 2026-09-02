import { describe, expect, it } from "vitest";
import { compactMetaDescription, compactMetaTitle } from "./seo";

describe("compactMetaDescription", () => {
  it("never assembles a description that starts mid-string", () => {
    // The shipped bug: the dot in "DryGelWorld.com" is not a sentence end, so
    // the sentence scan failed at position 0, resumed after the domain, and
    // /drygelworld went to Google with a description starting at "com".
    const src =
      "Official DryGelWorld.com brand page for industrial silica gel packets, bulk desiccants, cargo strips, private-label sachets, export RFQs, SDS, COA, and worldwide buyer support.";
    const out = compactMetaDescription(src);
    expect(out.startsWith("Official DryGelWorld.com")).toBe(true);
    expect(out.startsWith("com ")).toBe(false);
  });

  it("still assembles whole sentences when they parse from the start", () => {
    // The first sentence must clear the helper's 70-character floor, or it
    // falls through to word truncation by design.
    const first =
      "A first sentence about silica gel packets, bulk desiccant beads and container strips for export cartons.";
    const src = `${first} A second sentence with enough additional detail that keeping both would push the assembled result far past the one-hundred-and-fifty-eight character limit.`;
    const out = compactMetaDescription(src);
    expect(out).toBe(first);
  });

  it("returns short descriptions untouched", () => {
    expect(compactMetaDescription("Short and fine.")).toBe("Short and fine.");
  });
});

describe("compactMetaTitle", () => {
  it("keeps titles at or under the limit untouched", () => {
    const t = "Silica Gel Pakistan | Packets & Bulk from Karachi";
    expect(compactMetaTitle(t)).toBe(t);
  });
});
