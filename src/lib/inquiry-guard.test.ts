import { describe, it, expect } from "vitest";
import { classifySubmit, FAST_SUBMIT_MS } from "./inquiry-guard";

describe("classifySubmit, honeypot", () => {
  it("flags a filled honeypot as a bot", () => {
    expect(classifySubmit({ website2: "http://spam", formElapsedMs: 9000 }).honeypot).toBe(true);
  });
  it("ignores an empty or whitespace honeypot", () => {
    expect(classifySubmit({ website2: "", formElapsedMs: 9000 }).honeypot).toBe(false);
    expect(classifySubmit({ website2: "   ", formElapsedMs: 9000 }).honeypot).toBe(false);
  });
  it("treats a non-string honeypot as empty", () => {
    expect(classifySubmit({ website2: 123 as unknown, formElapsedMs: 9000 }).honeypot).toBe(false);
  });
});

describe("classifySubmit, timing is a risk signal, never a hard drop", () => {
  it("marks a fast submit as suspected but keeps it capturable", () => {
    const c = classifySubmit({ formElapsedMs: 500 });
    expect(c.suspectedBot).toBe(true);
    expect(c.elapsedBucket).toBe("lt1500");
  });

  it("does not flag a normal-speed submit", () => {
    expect(classifySubmit({ formElapsedMs: 3000 }).suspectedBot).toBe(false);
    expect(classifySubmit({ formElapsedMs: 9000 }).suspectedBot).toBe(false);
  });

  it("handles the 1499/1500 boundary", () => {
    expect(classifySubmit({ formElapsedMs: FAST_SUBMIT_MS - 1 }).suspectedBot).toBe(true);
    expect(classifySubmit({ formElapsedMs: FAST_SUBMIT_MS }).suspectedBot).toBe(false);
  });

  it("treats missing timing as suspected, not dropped", () => {
    expect(classifySubmit({}).suspectedBot).toBe(true);
    expect(classifySubmit({}).elapsedBucket).toBe("missing");
    expect(classifySubmit({ formElapsedMs: undefined }).elapsedBucket).toBe("missing");
    expect(classifySubmit({ formElapsedMs: null as unknown }).elapsedBucket).toBe("missing");
  });

  it("treats NaN, Infinity, negatives and strings as invalid (suspected)", () => {
    for (const bad of [NaN, Infinity, -Infinity, -5, "500" as unknown, {} as unknown]) {
      const c = classifySubmit({ formElapsedMs: bad });
      expect(c.suspectedBot).toBe(true);
      expect(c.elapsedBucket).toBe("invalid");
    }
    expect(classifySubmit({ formElapsedMs: NaN }).elapsedBucket).toBe("invalid");
    expect(classifySubmit({ formElapsedMs: Infinity }).elapsedBucket).toBe("invalid");
    expect(classifySubmit({ formElapsedMs: -5 }).elapsedBucket).toBe("invalid");
    expect(classifySubmit({ formElapsedMs: "500" as unknown }).elapsedBucket).toBe("invalid");
  });

  it("buckets slow submits above 5s", () => {
    expect(classifySubmit({ formElapsedMs: 5001 }).elapsedBucket).toBe("gt5000");
    expect(classifySubmit({ formElapsedMs: 5000 }).elapsedBucket).toBe("1500-5000");
  });
});
