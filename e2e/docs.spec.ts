import { test, expect } from '@playwright/test';

test.describe('Documentation Site', () => {
  test('should display the home page', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/macOS UI/);
    await expect(page.locator('h1')).toContainText('A macOS-style component library for React.');
  });

  test('should navigate to the installation page', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Get Started');
    await expect(page).toHaveURL('/docs/getting-started');
    await expect(page.locator('h1')).toContainText('Getting Started');
  });

  test('should navigate to the window component page', async ({ page }) => {
    await page.goto('/docs/getting-started');
    await page.click('text=Window');
    await expect(page).toHaveURL('/docs/components/window');
    await expect(page.locator('h1')).toContainText('Window');
  });

  test('should show live component examples', async ({ page }) => {
    await page.goto('/docs/components/window');
    const preview = page.locator('div[class*="component-preview"]').first();
    await expect(preview).toBeVisible();
    const window = preview.frameLocator('iframe').locator('.c-window');
    await expect(window).toBeVisible();
  });

  test('should have a working copy button', async ({ page }) => {
    await page.goto('/docs/components/window');
    const installCommand = page.locator('div[class*="install-command"]').first();
    await installCommand.locator('button').click();
    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardText).toContain('npx @sylonik/macos-ui add window');
  });
});
