import { test, expect } from '../test-fixtures';

test.describe('Vulcan Page Content and SEO', () => {
   test('Loads Successfully', async ({ page }) => {
      await page.goto('/Vulcan/Dryer_Not_Spinning');
      await expect(
         page.getByRole('heading', { name: 'Dryer Not Spinning' })
      ).toBeVisible();
   });

   test('Loads By Wikiid Successfully', async ({ page }) => {
      await page.goto('/Troubleshooting/Dryer/Making%20Loud%20Noise/479415');
      await expect(
         page.getByRole('heading', { name: 'Dryer Making Loud Noise' })
      ).toBeVisible();
   });

   test('noindex Meta Tag Included', async ({ page }) => {
      await page.goto('/Vulcan/Dryer_Not_Spinning');
      // check that the meta robots tag is set to noindex
      const meta = page.locator('meta[name="robots"]');
      await expect(meta).toHaveAttribute('content', 'noindex');
   });

   test('Canonical Link Included', async ({ page }) => {
      await page.goto('/Vulcan/Dryer_Not_Spinning');
      // check that the canonical link is a resonable URL
      const canonical = page.locator('link[rel="canonical"]');
      await expect(canonical).toHaveAttribute('href', /Not%20Spinning/);
      // Check that the canonical link is an absolute URL
      await expect(canonical).toHaveAttribute('href', /^http/);
   });

   test('Redirect to Canonical URL', async ({ page }) => {
      await page.goto('/Vulcan/Dryer_Not_Spinning');
      await expect(page.url()).toMatch(/Not%20Spinning/);
   });

   test('Breadcrumbs Visible', async ({ page }) => {
      await page.goto('/Vulcan/Dryer_Not_Spinning');
      const nav = page.getByRole('navigation', { name: 'breadcrumb' });
      await expect(nav).toBeVisible();

      // Check that some expected breadcrumbs are present
      await expect(nav.getByRole('link', { name: 'Home' })).toBeVisible();
      const dryerLinks = await nav.getByRole('link', { name: 'Dryer' }).count();
      expect(dryerLinks).toBeGreaterThan(0);
   });

   test('Edit Page Link Visibile', async ({ page }) => {
      await page.goto('/Vulcan/Dryer_Not_Spinning');
      // check that the edit link is a resonable URL
      const editLink = page.getByRole('link', { name: 'Edit' });
      await expect(editLink).toBeVisible();
   });

   test('History Page Link in Dropdown', async ({ page }) => {
      await page.goto('/Vulcan/Dryer_Not_Spinning');
      const dropdown = page.getByRole('button', { name: 'Options' });
      dropdown.click();
      const historyLink = page.getByRole('menuitem', { name: 'History' });
      await expect(historyLink).toBeVisible();
   });

   test('Last Updated Date Visible', async ({ page }) => {
      await page.goto('/Vulcan/Dryer_Not_Spinning');
      await expect(page.getByText('Last updated')).toBeVisible();
   });

   test("Author's Name Visible", async ({ page }) => {
      await page.goto('/Vulcan/Dryer_Not_Spinning');
      await expect(page.getByText(/and \d+ contributors/)).toBeVisible();
   });
});
