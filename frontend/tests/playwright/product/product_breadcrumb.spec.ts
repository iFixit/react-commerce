import { test, expect } from '@playwright/test';

test.describe('Product breadcrumb test', () => {
   test.describe('Mobile and Tablet', () => {
      test.skip(({ page }) => {
         const viewPort = page.viewportSize();
         return !viewPort || viewPort.width > 1000;
      }, 'Only run on mobile and tablet.');

      /*
       * On viewport width sizes below 1000px, we display only the last child breadcrumb
       * regardless of the number of breadcrumb links. Everything else is collapsed in
       * the breadcrumb menu.
       */
      test('with number of any breadcrumb links', async ({ page }) => {
         await page.goto('/products/iflex-opening-tool');

         // Last child breadcrumb is visible on both mobile and desktop
         const lastChildBreadcrumb = page.getByTestId(
            'breadcrumb-last-child-link'
         );
         await expect(lastChildBreadcrumb).toBeVisible();

         const mobileBreadcrumbMenu = page.getByTestId(
            'breadcrumb-menu-mobile'
         );
         await expect(mobileBreadcrumbMenu).toBeVisible();

         // Assert that the ancestor breadcrumb links are not visible on mobile
         const desktopBreadcrumbAncestorLinks = page.getByTestId(
            'breadcrumb-ancestor-link-desktop'
         );
         const count = await desktopBreadcrumbAncestorLinks.count();
         for (let i = 0; i < count; i++) {
            expect(desktopBreadcrumbAncestorLinks.nth(i)).not.toBeVisible();
         }
      });
   });
});
