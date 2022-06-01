describe('product list filters', () => {
   const user = cy;
   beforeEach(() => {
      cy.intercept('/1/indexes/**').as('search');
      user.visit('/Store/Parts');
   });

   it('should help user filter', () => {
      user
         .findAllByTestId(/facet-accordion-item-.*/i)
         .first()
         .as('first-facet-accordion-item')
         .next()
         .as('second-facet-accordion-item');

      user
         .get('@first-facet-accordion-item')
         .invoke('attr', 'data-facet-name')
         .as('first-facet-name');

      // Click the first facet accordion item.
      user
         .get('@first-facet-accordion-item')
         .findByRole('button', { name: /expand/i, expanded: false })
         .click();

      // Click the first facet item
      user
         .get('@first-facet-accordion-item')
         .findAllByRole('option')
         .first()
         .click()
         .invoke('attr', 'data-value')
         .as('first-facet-option-value');

      // Wait for the search to be triggered and let the UI update.
      user.wait('@search');
      user.wait(2000);

      user.get('@first-facet-option-value').then((refinementValue) => {
         const lowercaseRefinementValue: string = (
            refinementValue as any
         ).toLowerCase();

         // Check that the refinement value is in the current refinements.
         user
            .findAllByTestId(`current-refinement-${refinementValue}`)
            .should('exist');

         // Check that the refinement value is in the search results.
         user.get('@first-facet-name').then((facetName) => {
            user
               .window()
               .its('filteredProducts')
               .each((product) => {
                  cy.wrap(product)
                     .its(facetName as any)
                     .should(
                        'satisfy',
                        function isRefinedFacetValue(value: any) {
                           return (
                              (typeof value === 'string' &&
                                 value.toLowerCase() ===
                                    lowercaseRefinementValue) ||
                              (Array.isArray(value) &&
                                 value.some(
                                    (t) =>
                                       t.toLowerCase() ===
                                       lowercaseRefinementValue
                                 ))
                           );
                        }
                     );
               });
         });
      });

      user
         .get('@second-facet-accordion-item')
         .invoke('attr', 'data-facet-name')
         .as('second-facet-name');

      // Click the second facet accordion item.
      user
         .get('@second-facet-accordion-item')
         .findByRole('button', { name: /expand/i, expanded: false })
         .click();

      // Click the second facet item
      user
         .get('@second-facet-accordion-item')
         .findAllByRole('option')
         .first()
         .click()
         .invoke('attr', 'data-value')
         .as('second-facet-option-value');

      user.get('@second-facet-option-value').then((refinementValue) => {
         // Check that the refinement value is in the current refinements.
         user
            .findAllByTestId(`current-refinement-${refinementValue}`)
            .should('exist');
      });

      user
         .findByRole('button', {
            name: /expand price range$/i,
            expanded: false,
         })
         .click();

      user
         .findByLabelText(/set min price/i)
         .invoke('attr', 'placeholder')
         .as('min-price-placeholder')
         .then((placeholder) => {
            // Type a value in the min price input
            const minPrice = parseFloat(placeholder ?? '0') + 1;
            user.findByLabelText(/set min price/i).type(minPrice.toString());

            // Verify that the min price is in the current refinements.
            user
               .findAllByTestId(`current-refinement-${minPrice.toString()}`)
               .should('exist');

            const invalidMaxPrice = minPrice - 1;
            user
               .findByLabelText(/set max price/i)
               .type(invalidMaxPrice.toString());

            user.findByText(/max should be higher than min/i).should('exist');

            const validMaxPrice = minPrice + 10;
            user
               .findByLabelText(/set max price/i)
               .type(`{selectall}{backspace}${validMaxPrice}`);

            // Verify that the max price is in the current refinements.
            user
               .findAllByTestId(
                  `current-refinement-${validMaxPrice.toString()}`
               )
               .should('exist');

            user.wait('@search');
            user.wait(1000);

            user.findByTestId('filterable-products-section').within(() => {
               // Check that all articles prices are within the range
               user.findAllByTestId('product-price').each((priceEl) => {
                  cy.wrap(priceEl)
                     .invoke('text')
                     .then((priceText) => {
                        const valueMatch = priceText.match(/(\d+\.\d+)/);
                        return valueMatch && valueMatch[0]
                           ? parseFloat(valueMatch[0])
                           : 0;
                     })
                     .should('be.within', minPrice, validMaxPrice);
               });
            });
         });

      user
         .findAllByTestId(/current-refinement-/i)
         .first()
         .invoke('attr', 'data-testid')
         .then((testId) => {
            // Remove the refinement
            user
               .findByTestId(testId!)
               .findByRole('button', { name: /remove/i })
               .click();

            // Check that the refinement is no longer in the current refinements.
            user.findByTestId(testId!).should('not.exist');
         });

      // Reset the filters
      user.findByRole('button', { name: /clear all filters/i }).click();
      // Check that the current refinements are empty
      user.findByTestId(/current-refinement-/i).should('not.exist');
   });
});

export {};
