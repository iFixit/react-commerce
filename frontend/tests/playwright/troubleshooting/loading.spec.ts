import { test, expect } from '../test-fixtures';

test.describe('Vulcan page', () => {
   test('it loads', async ({ page }) => {
      await page.goto('/Vulcan/Dryer_Not_Spinning');
      await expect(page.getByText('Dryer Not Spinning')).toBeVisible();
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

   test('it should have a link to the edit page', async ({ page }) => {
      await page.goto('/Vulcan/Dryer_Not_Spinning');
      // check that the edit link is a resonable URL
      const editLink = page.getByRole('link', { name: 'Edit' });
      await expect(editLink).toBeVisible();
   });

   test('it should have a link to the history page in a dropdown', async ({
      page,
   }) => {
      await page.goto('/Vulcan/Dryer_Not_Spinning');
      const dropdown = page.getByRole('button', { name: 'Options' });
      dropdown.click();
      const historyLink = page.getByRole('menuitem', { name: 'History' });
      await expect(historyLink).toBeVisible();
   });
});
