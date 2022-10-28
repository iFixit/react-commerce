describe('product list filters', () => {
   beforeEach(() => {
      cy.loadCollectionPageByPath('/Parts');
   });

   it('should help user filter', () => {
      cy.findAllByTestId(/collapsed-facet-accordion-item-.*/i)
         .first()
         .as('first-facet-accordion-item')
         .next()
         .as('second-facet-accordion-item');

      cy.get('@first-facet-accordion-item')
         .invoke('attr', 'data-facet-name')
         .as('first-facet-name');

      // Click the first facet accordion item.
      cy.get('@first-facet-accordion-item')
         .findByRole('button', { name: /expand/i, expanded: false })
         .click();

      // Click the first facet item
      cy.get('@first-facet-accordion-item')
         .findAllByRole('option')
         .first()
         .click()
         .invoke('attr', 'data-value')
         .as('first-facet-option-value');

      // Wait for the search to be triggered and let the UI update.
      cy.wait('@search');
      cy.wait(2000);

      cy.get('@first-facet-option-value').then((refinementValue) => {
         const lowercaseRefinementValue: string = (
            refinementValue as any
         ).toLowerCase();

         // Check that the refinement value is in the current refinements.
         cy.findAllByTestId(`current-refinement-${refinementValue}`).should(
            'exist'
         );

         // Check that the refinement value is in the search results.
         cy.get('@first-facet-name').then((facetName) => {
            cy.window()
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

      cy.get('@second-facet-accordion-item')
         .invoke('attr', 'data-facet-name')
         .as('second-facet-name');

      // Click the second facet accordion item.
      cy.get('@second-facet-accordion-item')
         .findByRole('button', { name: /expand/i, expanded: false })
         .click();

      // Click the second facet item
      cy.get('@second-facet-accordion-item')
         .findAllByRole('option')
         .first()
         .click()
         .invoke('attr', 'data-value')
         .as('second-facet-option-value');

      cy.get('@second-facet-option-value').then((refinementValue) => {
         // Check that the refinement value is in the current refinements.
         cy.findAllByTestId(`current-refinement-${refinementValue}`).should(
            'exist'
         );
      });

      cy.findAllByTestId(/current-refinement-/i)
         .first()
         .invoke('attr', 'data-testid')
         .then((testId) => {
            // Remove the refinement
            cy.findByTestId(testId!)
               .findByRole('button', { name: /remove/i })
               .click();

            // Check that the refinement is no longer in the current refinements.
            cy.findByTestId(testId!).should('not.exist');
         });

      // Reset the filters
      cy.findByRole('button', { name: /clear all filters/i }).click();
      // Check that the current refinements are empty
      cy.findByTestId(/current-refinement-/i).should('not.exist');
   });
});

export {};
