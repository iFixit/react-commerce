import { test, expect } from '../test-fixtures';

test.describe('Vulcan page', () => {
   test('it loads', async ({ page }) => {
      await page.goto('/Vulcan/Dryer_Not_Spinning');
      await expect(
         page.getByRole('heading', { name: 'Dryer Not Spinning' })
      ).toBeVisible();
   });

   test('it should not be indexed', async ({ page }) => {
      await page.goto('/Vulcan/Dryer_Not_Spinning');
      // check that the meta robots tag is set to noindex
      const meta = page.locator('meta[name="robots"]');
      await expect(meta).toHaveAttribute('content', 'noindex');
   });

   test('it should include the canonical link', async ({ page }) => {
      await page.goto('/Vulcan/Dryer_Not_Spinning');
      // check that the canonical link is a resonable URL
      const canonical = page.locator('link[rel="canonical"]');
      await expect(canonical).toHaveAttribute('href', /Dryer.*Not.*Spinning/);
      // Check that the canonical link is an absolute URL
      await expect(canonical).toHaveAttribute('href', /^http/);
   });

   test('there are breadcrumbs on the page', async ({ page }) => {
      await page.goto('/Vulcan/Dryer_Not_Spinning');
      const nav = page.getByRole('navigation', { name: 'breadcrumb' });
      await expect(nav).toBeVisible();

      // Check that some expected breadcrumbs are present
      await expect(nav.getByRole('link', { name: 'Home' })).toBeVisible();
      const dryerLinks = await nav.getByRole('link', { name: 'Dryer' }).count();
      expect(dryerLinks).toBeGreaterThan(0);
   });
});
