import { test, expect } from '../test-fixtures';

test.describe('Troubleshooting Page Content and SEO', () => {
   test('Loads Successfully', async ({ page }) => {
      await page.goto('/Troubleshooting/Dryer/Not+Spinning/478872');
      await expect(
         page.getByRole('heading', { name: 'Dryer Not Spinning' })
      ).toBeVisible();
   });

   test('Related Problems hidden by feature flag', async ({ page }) => {
      await page.goto('/Troubleshooting/Dryer/Not+Spinning/478872');
      // Select the element with the ID 'related-problems'
      const element = await page.locator('#related-problems');

      // Assert that the element's 'data-test' attribute is 'related-problems-v2'
      await expect(element).not.toHaveAttribute(
         'data-test',
         'related-problems-v2'
      );
   });

   test('Related Problems visible behind feature flag', async ({ page }) => {
      await page.goto(
         '/Troubleshooting/Dryer/Not+Spinning/478872#enable-extended-related-problems'
      );
      // Select the element with the ID 'related-problems'
      const element = await page.locator('#related-problems');

      // Assert that the element's 'data-test' attribute is 'related-problems-v2'
      await expect(element).toHaveAttribute('data-test', 'related-problems-v2');
   });

   test('Loads By Wikiid Successfully', async ({ page }) => {
      await page.goto('/Troubleshooting/Dryer/Making%20Loud%20Noise/479415');
      await expect(
         page.getByRole('heading', { name: 'Dryer Making Loud Noise' })
      ).toBeVisible();
   });

   test('index, follow Meta Tag Included', async ({ page }) => {
      await page.goto('/Troubleshooting/Dryer/Not+Spinning/478872');
      // check that the meta robots tag is set to index, follow
      const meta = page.locator('meta[name="robots"]');
      await expect(meta).toHaveAttribute('content', 'index, follow');
   });

   test('Canonical Link Included', async ({ page }) => {
      await page.goto('/Troubleshooting/Dryer/Not+Spinning/478872');
      // check that the canonical link is a resonable URL
      const canonical = page.locator('link[rel="canonical"]');
      await expect(canonical).toHaveAttribute('href', /Not.Spinning/);
      // Check that the canonical link is an absolute URL
      await expect(canonical).toHaveAttribute('href', /^http/);
   });

   test('HrefLangs are rendered', async ({ page }) => {
      await page.goto(
         '/Troubleshooting/Television/TV+Has+Sound+But+No+Picture/493422'
      );
      const langsToHrefs = [
         {
            lang: 'de',
            href: 'https://de.www.cominor.com/Wiki/TV_Has_Sound_But_No_Picture',
         },
         {
            lang: 'es',
            href: 'https://es.www.cominor.com/Wiki/TV_Has_Sound_But_No_Picture',
         },
         {
            lang: 'it',
            href: 'https://it.www.cominor.com/Wiki/TV_Has_Sound_But_No_Picture',
         },
         {
            lang: 'en',
            href: 'https://www.cominor.com/Troubleshooting/Television/TV+Has+Sound+But+No+Picture/493422',
         },
         {
            lang: 'x-default',
            href: 'https://www.cominor.com/Troubleshooting/Television/TV+Has+Sound+But+No+Picture/493422',
         },
      ];

      const checkLang = async function (langToHref: {
         lang: string;
         href: string;
      }): Promise<void> {
         const hrefLang = page.locator(`link[hreflang="${langToHref.lang}"]`);
         await Promise.all([
            expect(hrefLang).toHaveAttribute('hreflang', langToHref.lang),
            expect(hrefLang).toHaveAttribute('href', langToHref.href),
         ]);
      };

      await Promise.all(langsToHrefs.map(checkLang));
   });

   test('Redirect to Canonical URL', async ({ page }) => {
      await page.goto('/Troubleshooting/Dryer/Not+Spinning/478872');
      expect(page.url()).toMatch(/Not.Spinning/);
   });

   test('Breadcrumbs Visible', async ({ page }) => {
      await page.goto('/Troubleshooting/Dryer/Not+Spinning/478872');
      const nav = page.getByRole('navigation', { name: 'breadcrumb' });
      await expect(nav).toBeVisible();

      // Check that some expected breadcrumbs are present
      await expect(nav.getByRole('link', { name: 'Home' })).toBeVisible();
      const dryerLinks = await nav.getByRole('link', { name: 'Dryer' }).count();
      expect(dryerLinks).toBeGreaterThan(0);
   });

   test('Edit Page Link Visibile', async ({ page }) => {
      await page.goto('/Troubleshooting/Dryer/Not+Spinning/478872');
      // check that the edit link is a resonable URL
      const editLink = page.getByRole('link', { name: 'Edit' });
      await expect(editLink).toBeVisible();
   });

   test('History Page Link in Dropdown', async ({ page }) => {
      await page.goto('/Troubleshooting/Dryer/Not+Spinning/478872');
      const dropdown = page.getByRole('button', { name: 'Options' });
      dropdown.click();
      const historyLink = page.getByRole('menuitem', { name: 'History' });
      await expect(historyLink).toBeVisible();
   });

   test('Last Updated Date Visible', async ({ page }) => {
      await page.goto('/Troubleshooting/Dryer/Not+Spinning/478872');
      await expect(page.getByText('Last updated')).toBeVisible();
   });

   test("Author's Name Visible", async ({ page }) => {
      await page.goto('/Troubleshooting/Dryer/Not+Spinning/478872');
      await expect(page.getByText(/and \d+ contributors/)).toBeVisible();
   });
});
