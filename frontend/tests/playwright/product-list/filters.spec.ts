import { test, expect } from '@playwright/test';
import { resolvePath } from '../utils';

test.describe('product list filters', () => {
   test.beforeEach(async ({ page }) => {
      await page.goto('/Parts');
   });

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
      const queryResponse = page.waitForResponse(async (response) => {
         return (
            response.url().includes('algolia') &&
            response.url().includes('queries?') &&
            response.status() === 200
         );
      });

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
