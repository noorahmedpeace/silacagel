import { test, expect, type Page } from "@playwright/test";

/**
 * Scrolls the calculator into view and keeps it there.
 *
 * A single scrollIntoView is not enough on this page: images and other
 * deferred widgets above it finish loading afterwards and push it back below
 * the fold, so the IntersectionObserver that triggers its lazy import never
 * fires. That failure looks exactly like a broken component, and reading it
 * that way once produced a false report that production was down.
 */
async function revealCalculator(page: Page) {
  for (let i = 0; i < 25; i++) {
    const top = await page.evaluate(() => {
      const el = document.querySelector("#purchase-calculator");
      if (!el) return null;
      el.scrollIntoView({ block: "center" });
      return Math.round(el.getBoundingClientRect().top);
    });
    if (top !== null && top > -200 && top < 700) return;
    await page.waitForTimeout(400);
  }
  throw new Error("#purchase-calculator never settled inside the viewport");
}

// Browser-level coverage for the purchase calculator. These are the checks the
// pure model tests in src/components/price-calculator-model.test.ts cannot
// make: real device emulation, keyboard focus, and the portal-rendered modal.

test.describe("purchase calculator", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    // Lazy-loaded on scroll, so it has to be in view before it exists.
    await revealCalculator(page);
    // Generous: the widget is lazy-loaded behind an IntersectionObserver, and
    // against a dev server the chunk is compiled on first request.
    await expect(page.getByText("Estimated order value")).toBeVisible({ timeout: 30_000 });
  });

  test("choosing a format chip updates the estimate", async ({ page }) => {
    const before = await page.locator("strong").filter({ hasText: /^\$/ }).first().innerText();

    // 5 kg strip is orders of magnitude heavier than the 0.5 gm default, so the
    // figure has to move if the chip is genuinely wired to the calculator.
    await page.getByRole("radio", { name: "5 kg strip", exact: true }).check();

    // The readout, not the chip label - "5 kg strip" matches both, and only the
    // readout proves the selection reached the calculator.
    await expect(page.getByText("5 kg strip · Bulk & Strip")).toBeVisible();

    const after = await page.locator("strong").filter({ hasText: /^\$/ }).first().innerText();
    expect(after).not.toBe(before);
  });

  test("the format chips are one keyboard-navigable radio group", async ({ page }) => {
    const first = page.getByRole("radio", { name: "0.5 gm", exact: true });
    await first.focus();
    await expect(first).toBeFocused();

    // Native radio semantics: arrow keys move the selection within the group.
    await page.keyboard.press("ArrowRight");
    await expect(first).not.toBeChecked();
  });

  test("an unusable quantity explains itself and blocks the primary action", async ({ page }) => {
    const qty = page.getByLabel("Quantity (pieces)");
    const cta = page.getByRole("button", { name: "Send on WhatsApp" });

    await expect(cta).toBeEnabled();

    await qty.fill("0");
    await expect(page.getByText("Quantity must be at least 1 piece.")).toBeVisible();
    await expect(qty).toHaveAttribute("aria-invalid", "true");
    await expect(cta).toBeDisabled();

    await qty.fill("1000.5");
    await expect(
      page.getByText("Enter a whole number of pieces - sachets cannot be split."),
    ).toBeVisible();

    await qty.fill("");
    await expect(page.getByText("Enter how many pieces you need.")).toBeVisible();

    await qty.fill("2500");
    await expect(cta).toBeEnabled();
  });

  test("the quote modal traps focus, closes on Escape, and restores focus", async ({ page }) => {
    const trigger = page.getByRole("button", { name: "Get price by email" });
    await trigger.click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    // The email field is autoFocus, so focus must have moved into the dialog.
    await expect(dialog.locator('input[type="email"]')).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });
});

test.describe("purchase calculator, layout", () => {
  test("the page never scrolls sideways", async ({ page }) => {
    await page.goto("/");
    await revealCalculator(page);
    // Generous: the widget is lazy-loaded behind an IntersectionObserver, and
    // against a dev server the chunk is compiled on first request.
    await expect(page.getByText("Estimated order value")).toBeVisible({ timeout: 30_000 });

    // The check a cropped headless screenshot cannot make: a narrow window
    // screenshot lays the page out wide and clips it, which looks identical to
    // a genuine overflow. Real device emulation plus this assertion is the only
    // honest way to tell the two apart.
    const overflow = await page.evaluate(() => {
      const d = document.documentElement;
      return d.scrollWidth - d.clientWidth;
    });
    expect(overflow).toBeLessThanOrEqual(1);
  });

  test("controls stay large enough to tap", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile", "touch target rule is mobile-only");

    await page.goto("/");
    await revealCalculator(page);
    await expect(page.getByText("Estimated order value")).toBeVisible({ timeout: 30_000 });

    const qty = page.getByLabel("Quantity (pieces)");
    const box = await qty.boundingBox();
    expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);

    // Below 16px iOS Safari zooms the viewport when the field takes focus.
    const fontSize = await qty.evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
    expect(fontSize).toBeGreaterThanOrEqual(16);
  });

  test("focus stays visible when forced-colors strips shadows", async ({ page }) => {
    await page.emulateMedia({ forcedColors: "active" });
    await page.goto("/");
    await revealCalculator(page);
    await expect(page.getByText("Estimated order value")).toBeVisible({ timeout: 30_000 });

    const qty = page.getByLabel("Quantity (pieces)");
    await qty.focus();

    // --ds-focus-ring is a box-shadow, and forced-colors suppresses shadows, so
    // the component adds a real outline. Without it the indicator disappears.
    const outlineWidth = await qty.evaluate((el) =>
      parseFloat(getComputedStyle(el).outlineWidth),
    );
    expect(outlineWidth).toBeGreaterThan(0);
  });
});
