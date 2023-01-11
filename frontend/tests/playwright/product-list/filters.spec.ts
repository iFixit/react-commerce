import { test, expect } from '@playwright/test';
import { waitForAlgoliaSearch, resolvePath } from '../utils';

test.describe('product list filters', () => {
   test.beforeEach(async ({ page }) => {
      await page.goto('/Parts');
   });

   test.describe('Desktop', () => {
      test.skip(({ page }) => {
         const viewPort = page.viewportSize();
         return !viewPort || viewPort.width < 768;
      }, 'Only run on desktop.');

      test('Should help user filter', async ({ page }) => {
         const facetList = page
            .getByTestId('facets-accordion')
            .locator('[data-testid^=collapsed-facet-accordion-item-]');

         const firstCollapsedAccordionItem = await facetList
            .nth(0)
            .elementHandle();
         const secondCollapsedAccordionItem = await facetList
            .nth(1)
            .elementHandle();

         // Click the first facet accordion item.
         if (!firstCollapsedAccordionItem) {
            throw new Error('Could not find first collapsed accordion item');
         }
         await firstCollapsedAccordionItem.click();

         // Define a Promise to wait for the search to be triggered and let the UI update.
         const queryResponse = waitForAlgoliaSearch(page);

         // Click the first facet item
         const firstFacetOption = await firstCollapsedAccordionItem.$(
            'button[role="option"]'
         );
         await firstFacetOption?.click();
         const { results } = await (await queryResponse).json();

         // Check that the refinement value is in the current refinements.
         const firstFacetOptionValue = await firstFacetOption?.getAttribute(
            'data-value'
         );
         if (!firstFacetOptionValue) {
            throw new Error('Could not find first facet option value');
         }
         await expect(
            page.getByTestId(`current-refinement-${firstFacetOptionValue}`)
         ).toBeVisible();

         // Reduce the search results to a single array of products.
         const filteredProducts = results.reduce(
            (products: [], searchResults: { hits: [] }) => {
               return [...products, ...searchResults.hits];
            },
            []
         );

         // Check that the refinement value is in the search results.
         const firstFacetName = await firstCollapsedAccordionItem.getAttribute(
            'data-facet-name'
         );
         if (!firstFacetName) {
            throw new Error('Could not find first facet name');
         }
         filteredProducts.forEach((product: any) => {
            expect(resolvePath(product, firstFacetName)).toContain(
               firstFacetOptionValue
            );
         });

         // Click the second facet accordion item.
         if (!secondCollapsedAccordionItem) {
            throw new Error('Could not find second collapsed accordion item');
         }
         await secondCollapsedAccordionItem.click();

         // Click the second facet item
         const secondFacetOption = await secondCollapsedAccordionItem.$(
            '[role="option"]'
         );
         await secondFacetOption?.click();

         // Check that the refinement value is in the current refinements.
         const secondFacetOptionValue = await secondFacetOption?.getAttribute(
            'data-value'
         );
         if (!secondFacetOptionValue) {
            throw new Error('Could not find second facet option value');
         }
         await expect(
            page.getByTestId(`current-refinement-${secondFacetOptionValue}`)
         ).toBeVisible();

         // Remove the newest refinement.
         await page
            .getByTestId(`current-refinement-${secondFacetOptionValue}`)
            .getByRole('button', { name: /remove/i })
            .click();

         // Check that the refinement value is not in the current refinements.
         await expect(
            page.getByTestId(`current-refinement-${secondFacetOptionValue}`)
         ).not.toBeVisible();

         // Reset the filters.
         await page.getByRole('button', { name: /clear all filters/i }).click();

         // Check that the current refinements are empty
         expect(
            await page.locator('[data-testid^=current-refinement-]').count()
         ).toBe(0);
      });
   });

   test.describe('Mobile and Tablet', () => {
      test.skip(({ page }) => {
         const viewPort = page.viewportSize();
         return !viewPort || viewPort.width > 768;
      }, 'Only run on mobile and tablet.');

      test('Should help user filter', async ({ page }) => {
         // Select the first filter and close the drawer
         await page
            .getByRole('button', { name: 'Filters', exact: true })
            .click();
         const firstFacet = page.getByTestId('facets-drawer-list-item').nth(1);
         const firstFacetName = await firstFacet?.getAttribute(
            'data-drawer-list-item-name'
         );
         await firstFacet.click();

         const queryResponse = waitForAlgoliaSearch(page);
         const firstFacetOption = page
            .getByTestId('facet-panel-open')
            .getByRole('option')
            .first();
         const firstFacetOptionValue = await firstFacetOption?.getAttribute(
            'data-value'
         );
         await firstFacetOption.click();
         await page.getByRole('button', { name: 'Close' }).click();
         const { results } = await (await queryResponse).json();

         // Check that the refinement value is in the current refinements.
         if (!firstFacetOptionValue) {
            throw new Error('Could not find first facet option value');
         }
         await expect(
            page.getByTestId(`current-refinement-${firstFacetOptionValue}`)
         ).toBeVisible();

         // Check that the refinement value is in the search results.
         if (!firstFacetName) {
            throw new Error('Could not find first facet name');
         }
         const filteredProducts = results.reduce(
            (products: [], searchResults: { hits: [] }) => {
               return [...products, ...searchResults.hits];
            },
            []
         );
         filteredProducts.forEach((product: any) => {
            expect(resolvePath(product, firstFacetName)).toContain(
               firstFacetOptionValue
            );
         });

         // Select the second filter and close the drawer
         await page
            .getByRole('button', { name: 'Filters', exact: true })
            .click();
         const secondFacet = page.getByTestId('facets-drawer-list-item').nth(2);
         await secondFacet.click();
         const secondFacetOption = page
            .getByTestId('facet-panel-open')
            .getByRole('option')
            .first();
         const secondFacetOptionValue = await firstFacetOption?.getAttribute(
            'data-value'
         );
         await secondFacetOption.click();
         await page.getByRole('button', { name: 'Close' }).click();

         // Check that the refinement value is in the current refinements.
         if (!secondFacetOptionValue) {
            throw new Error('Could not find second facet option value');
         }
         await expect(
            page.getByTestId(`current-refinement-${secondFacetOptionValue}`)
         ).toBeVisible();

         // Remove the newest refinement.
         await page
            .getByTestId(`current-refinement-${secondFacetOptionValue}`)
            .getByRole('button', { name: /remove/i })
            .click();

         // Check that the refinement value is not in the current refinements.
         await expect(
            page.getByTestId(`current-refinement-${secondFacetOptionValue}`)
         ).not.toBeVisible();

         await page.getByRole('button', { name: /clear all filters/i }).click();

         // Check that the current refinements are empty
         expect(
            await page.locator('[data-testid^=current-refinement-]').count()
         ).toBe(0);
      });
   });
});
