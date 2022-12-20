describe('parts page devices', () => {
   beforeEach(() => {
      cy.loadCollectionPageByPath('/Parts');
   });

   it('should navigate until the last device page', () => {
      assertVisibleFilterAndProducts();
      assertAvailableProducts();
      const navigateUntilLastDevice = () => {
         cy.get('body').then(($body) => {
            const $children = $body.find(
               '[data-testid="product-list-children"]'
            );
            if ($children.length <= 0) return false;

            cy.findByTestId('product-list-children')
               .findAllByRole('link')
               .first()
               .as('childLink');

            cy.get('@childLink').then(($childLink) => {
               const childHref = $childLink.attr('href');
               cy.location('pathname').should('not.equal', childHref);

               cy.get('@childLink').click();

               cy.location('pathname').should('equal', childHref);

               const childTitle = $childLink.text();
               const childTitleRegexp = new RegExp(`^${childTitle}$`, 'i');
               cy.findByRole('heading', {
                  level: 1,
                  name: childTitleRegexp,
                  timeout: 10000,
               }).should('exist');

               navigateUntilLastDevice();
            });
         });
      };

      navigateUntilLastDevice();
   });
});

function assertVisibleFilterAndProducts() {
   cy.findByTestId('filterable-products-section').should('be.visible');
   cy.findByTestId('facets-accordion').scrollIntoView().should('be.visible');
}

// Makes sure there is at least 1 product available
function assertAvailableProducts() {
   cy.findByTestId('list-view-products')
      .children('article')
      .its('length')
      .should('be.gte', 1);
}

export {};
