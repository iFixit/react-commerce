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
         await expect(
            page.getByTestId('breadcrumb-last-child-link')
         ).toBeVisible();

         await expect(page.getByTestId('breadcrumb-menu-mobile')).toBeVisible();

         // Assert that the ancestor breadcrumb links are not visible on mobile
         const desktopBreadcrumbAncestorLinks = page.getByTestId(
            'breadcrumb-ancestor-link-desktop'
         );
         const count = await desktopBreadcrumbAncestorLinks.count();
         for (let i = 0; i < count; i++) {
            await expect(
               desktopBreadcrumbAncestorLinks.nth(i)
            ).not.toBeVisible();
         }
      });
   });

   test.describe('Desktop', () => {
      test.skip(({ page }) => {
         const viewPort = page.viewportSize();
         return !viewPort || viewPort.width < 1000;
      }, 'Only run on desktop.');

      /*
       * Makes sure that the ancestor and last child breadcrumbs are visible
       * and the breadcrumb menu is not visible.
       */
      test('with less than or equal to 3 breacrumb links', async ({ page }) => {
         await page.goto('/products/iflex-opening-tool');

         await expect(
            page.getByTestId('breadcrumb-last-child-link')
         ).toBeVisible();

         const desktopBreadcrumbAncestorLinks = page.getByTestId(
            'breadcrumb-ancestor-link-desktop'
         );
         const ancestorLinksCount =
            await desktopBreadcrumbAncestorLinks.count();

         for (let i = 0; i < ancestorLinksCount; i++) {
            expect(desktopBreadcrumbAncestorLinks.nth(i)).toBeVisible();
            expect(
               await desktopBreadcrumbAncestorLinks.nth(i).getAttribute('href')
            ).not.toBeNull();
         }
         expect(ancestorLinksCount).toBeLessThanOrEqual(2);

         // If the product has less than or equal to 3 breadcrumb links, we don't display the breadcrumb menu
         await expect(
            page.getByTestId('breadcrumb-menu-desktop')
         ).not.toBeVisible();

         await expect(
            page.getByTestId('breadcrumb-menu-mobile')
         ).not.toBeVisible();
      });

      /*
       * Same as the test above, but checks that the desktop breadcrumb menu is visible.
       */
      test('with more than 3 breacrumb links', async ({ page }) => {
         await page.goto('/products/iphone-6s-plus-replacement-battery');

         await expect(
            page.getByTestId('breadcrumb-last-child-link')
         ).toBeVisible();

         const desktopBreadcrumbAncestorLinks = page.getByTestId(
            'breadcrumb-ancestor-link-desktop'
         );
         const ancestorLinksCount =
            await desktopBreadcrumbAncestorLinks.count();
         for (let i = 0; i < ancestorLinksCount; i++) {
            expect(desktopBreadcrumbAncestorLinks.nth(i)).toBeVisible();
            expect(
               await desktopBreadcrumbAncestorLinks.nth(i).getAttribute('href')
            ).not.toBeNull();
         }
         expect(ancestorLinksCount).toBeLessThanOrEqual(2);

         await expect(
            page.getByTestId('breadcrumb-menu-desktop')
         ).toBeVisible();

         await expect(
            page.getByTestId('breadcrumb-menu-mobile')
         ).not.toBeVisible();
      });
   });
});
