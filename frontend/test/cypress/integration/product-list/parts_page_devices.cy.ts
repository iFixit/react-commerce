describe('parts page devices', () => {
   beforeEach(() => {
      cy.loadCollectionPageByPath('/Parts');
   });

   it('should navigate until the last device page', () => {
      assertVisibleFilterAndProducts();
      assertAvailableProducts();

      cy.get('body').then(($body) => {
         const device = $body.find('a[href="/Parts/Mac"]');
         if (!device.is(':visible')) {
            cy.get('button', { timeout: 10000 })
               .contains('Show more')
               .should('be.visible')
               .click();
         }
         device[0].click();
      });

      cy.location('pathname', { timeout: 20000 }).should(
         'include',
         '/Parts/Mac'
      );
      cy.get('h1').contains('Mac Parts').should('be.visible');

      navigateUntilLastDevice();
      assertVisibleFilterAndProducts();
      assertAvailableProducts();
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

   // Recursively navigate to the first device until no sub-devices are left
   function navigateUntilLastDevice() {
      cy.get('body').then(($body) => {
         if ($body.find('[data-testid="product-list-devices"]').length <= 0)
            return false;

         cy.findByTestId('product-list-devices')
            .find('a')
            .first()
            .as('device')
            .click();

         cy.get('@device')
            .should('have.attr', 'href')
            .then((href) => {
               cy.location('pathname', { timeout: 20000 }).should(
                  'include',
                  href
               );
            });
         assertVisibleFilterAndProducts();
         navigateUntilLastDevice();
      });
   }
});

export {};
