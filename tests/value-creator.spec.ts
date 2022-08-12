import { test } from "@playwright/test";

test("can create value", async ({ page }) => {
  // Go to page
  await page.goto("");

  // Click Create value button
  await page.locator("text=Create value").click();
  //
  // Click text=Enter your name
  await page.locator("text=Enter your name").click();

  // Fill [placeholder="Enter your name"]
  await page.locator('[placeholder="Enter your name"]').fill("Sebastian");

  // Press Enter
  await page.locator('[placeholder="Enter your name"]').press("Enter");

  // Click text=Create value
  await page.locator("text=Create value").click();

  // TODO: add assertions
});
