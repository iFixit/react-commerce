import { Page } from '@playwright/test';
import { test, expect } from '../test-fixtures';
import { waitForAlgoliaSearch, resolvePath } from '../utils';

// Check that the refinement value is in the current refinements.
async function checkRefinementValue(
   value: string | null | undefined,
   page: Page,
   layout: 'desktop' | 'mobile'
) {
   if (!value) {
      throw new Error('Could not find ' + value);
   }
   if (layout === 'desktop') {
      await expect(
         page.getByTestId(`current-refinement-${value}`).first()
      ).toBeVisible();
   } else {
      await expect(
         page.getByTestId(`current-refinement-${value}`).last()
      ).toBeVisible();
   }
}

// Check that the refinement value is in the search results
async function checkRefinementInSearchResult(
   facetName: string | null,
   facetOptionValue: string,
   results: Array<any>
) {
   if (!facetName) {
      throw new Error('Could not find first facet name');
   }

   let filteredProducts: any = [];

   results.forEach((result: any) => {
      const decodedParams = decodeURIComponent(result.params);

      if (decodedParams.includes(facetOptionValue)) {
         if (filteredProducts.length) {
            throw new Error(
               `Found multiple associated results for "${facetOptionValue}".\n\nThe Algolia search results may have changed in a way that is no longer compatible with this test.\nDouble check the search results structure and update the test accordingly if necessary.`
            );
         }

         filteredProducts = result.hits;
      }
   });

   if (!filteredProducts.length) {
      throw new Error(
         `Could not find associated results where facet option "${facetOptionValue}" is included in the params.`
      );
   }

   filteredProducts.forEach((product: any) => {
      expect(resolvePath(product, facetName)).toContain(facetOptionValue);
   });
}

async function removeAndCheckRefinement(
   facetOptionValue: string,
   buttonText: string,
   page: Page
) {
   // Remove the newest refinement.
   await page
      .getByTestId(`current-refinement-${facetOptionValue}`)
      .getByRole('button', { name: new RegExp(buttonText, 'i') })
      .click();

   // Check that the refinement value is not in the current refinements.
   await expect(
      page.getByTestId(`current-refinement-${facetOptionValue}`)
   ).not.toBeVisible();
}

async function resetAndCheckRefinements(buttonText: string, page: Page) {
   // Reset the filters.
   await page.getByRole('button', { name: buttonText, exact: true }).click();

   // Check that the current refinements are empty
   expect(
      await page.locator('[data-testid^=current-refinement-]').count()
   ).toBe(0);
}

const SHOP_PAGE_URL = '/Shop/Samsung_Repair_Kits';

test.describe('Product List Filtering', () => {
   test.describe('Desktop Filters', () => {
      test.skip(({ page }) => {
         const viewPort = page.viewportSize();
         return !viewPort || viewPort.width < 768;
      }, 'Only run on desktop.');

      test('Filter Products on /Parts Page', async ({ page }) => {
         await page.goto('/Parts');

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
         await checkRefinementValue(firstFacetOptionValue, page, 'desktop');

         // Check that the refinement value is in the search results.
         const firstFacetName = await firstCollapsedAccordionItem.getAttribute(
            'data-facet-name'
         );
         await checkRefinementInSearchResult(
            firstFacetName,
            firstFacetOptionValue!,
            results
         );

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
         await checkRefinementValue(secondFacetOptionValue, page, 'desktop');
         await removeAndCheckRefinement(
            secondFacetOptionValue!,
            'remove',
            page
         );
         await resetAndCheckRefinements('Clear all filters', page);
      });

      test('Filter Products on /Shop Page', async ({ page }) => {
         await page.goto(SHOP_PAGE_URL);

         const facetList = page
            .getByTestId('facets-accordion')
            .locator('[data-testid^=collapsed-facet-accordion-item-]');

         // Get the visible facet
         let visibleFacet = null;
         for (const element of await facetList.all()) {
            if (await element.isVisible()) {
               visibleFacet = element;
               break;
            }
         }

         if (!visibleFacet) {
            throw new Error('Could not find a visible facet');
         }

         const firstCollapsedAccordionItem = await visibleFacet.elementHandle();

         // Check current url path and search params.
         const url = new URL(page.url());
         expect(url.pathname).toEqual(SHOP_PAGE_URL);
         expect(url.search).toEqual('');

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
         await checkRefinementValue(firstFacetOptionValue, page, 'desktop');

         // Check that the refinement value is in the search results.
         const firstFacetName = await firstCollapsedAccordionItem.getAttribute(
            'data-facet-name'
         );
         await checkRefinementInSearchResult(
            firstFacetName,
            firstFacetOptionValue!,
            results
         );

         // Check that url pathname is still /Shop/Samsung_Repair_Kits
         // after clicking on a facet button.
         const urlAfterApplyingFilters = new URL(page.url());
         expect(urlAfterApplyingFilters.pathname).toEqual(SHOP_PAGE_URL);
         expect(urlAfterApplyingFilters.search).not.toEqual('');

         await resetAndCheckRefinements('Clear all filters', page);

         const urlAfterClearingFilters = new URL(page.url());
         expect(urlAfterClearingFilters.pathname).toEqual(SHOP_PAGE_URL);
         expect(urlAfterClearingFilters.search).toEqual('');
      });
   });

   test.describe('Mobile and Tablet Filters', () => {
      test.skip(({ page }) => {
         const viewPort = page.viewportSize();
         return !viewPort || viewPort.width > 768;
      }, 'Only run on mobile and tablet.');

      test('Filter Products on /Parts Page', async ({ page }) => {
         await page.goto('/Parts');

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
         await checkRefinementValue(firstFacetOptionValue, page, 'mobile');

         // Check that the refinement value is in the search results.
         await checkRefinementInSearchResult(
            firstFacetName,
            firstFacetOptionValue!,
            results
         );

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
         await checkRefinementValue(secondFacetOptionValue, page, 'mobile');
         await removeAndCheckRefinement(
            secondFacetOptionValue!,
            'remove',
            page
         );
         await resetAndCheckRefinements('Clear all filters', page);
      });

      test('Filter Products on /Shop Page', async ({ page }) => {
         await page.goto(SHOP_PAGE_URL);

         // Check current url path and search params.
         const url = new URL(page.url());
         expect(url.pathname).toEqual(SHOP_PAGE_URL);
         expect(url.search).toEqual('');

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
         await checkRefinementValue(firstFacetOptionValue, page, 'mobile');

         // Check that the refinement value is in the search results.
         await checkRefinementInSearchResult(
            firstFacetName,
            firstFacetOptionValue!,
            results
         );

         // Check that url pathname is still /Shop/Samsung_Repair_Kits
         // after clicking on a facet button.
         const urlAfterApplyingFilters = new URL(page.url());
         expect(urlAfterApplyingFilters.pathname).toEqual(SHOP_PAGE_URL);
         expect(urlAfterApplyingFilters.search).not.toEqual('');

         await resetAndCheckRefinements('Clear all filters', page);

         const urlAfterClearingFilters = new URL(page.url());
         expect(urlAfterClearingFilters.pathname).toEqual(SHOP_PAGE_URL);
         expect(urlAfterClearingFilters.search).toEqual('');
      });

      test('Facet Drawer Apply and Clear All Buttons', async ({ page }) => {
         await page.goto('/Parts');

         // Select the first filter and click Apply button
         await page
            .getByRole('button', { name: 'Filters', exact: true })
            .click();
         await page.getByTestId('facets-drawer-list-item').nth(1).click();
         const firstFacetOption = page
            .getByTestId('facet-panel-open')
            .getByRole('option')
            .first();
         const firstFacetOptionValue = await firstFacetOption?.getAttribute(
            'data-value'
         );
         await firstFacetOption.click();
         await page.getByRole('button', { name: 'Apply' }).click();

         // Check that the refinement value is in the current refinements.
         await checkRefinementValue(firstFacetOptionValue, page, 'mobile');

         // Select the second filter and click Apply button
         await page
            .getByRole('button', { name: 'Filters', exact: true })
            .click();
         await page.getByTestId('facets-drawer-list-item').nth(2).click();
         const secondFacetOption = page
            .getByTestId('facet-panel-open')
            .getByRole('option')
            .first();
         const secondFacetOptionValue = await firstFacetOption?.getAttribute(
            'data-value'
         );
         await secondFacetOption.click();
         await page
            .getByRole('button', { name: 'Apply' })
            .click({ clickCount: 2 });

         // Check that the refinement value is in the current refinements.
         await checkRefinementValue(secondFacetOptionValue, page, 'mobile');

         // Click "Clear all" button and check if refinements are empty.
         await page
            .getByRole('button', { name: 'Filters', exact: true })
            .click();
         await resetAndCheckRefinements('Clear all', page);
      });
   });
});
