describe('parts page results view', () => {
   beforeEach(() => {
      cy.loadCollectionPageByPath('/Parts');
   });

   it('all products have a visible price', () => {
      cy.findByTestId('list-view-products')
         .children('article')
         .each((productListItem) => {
            cy.wrap(productListItem)
               .findByTestId('product-price')
               .should('be.visible');
         });
   });

   it('product View button directs to the product page', () => {
      cy.contains('.chakra-button', 'View')
         .parent()
         .then((link) => {
            // Find the first product View button and click
            cy.wrap(link).click();

            // Assert the current window url path is the same as button link
            cy.location('pathname').should('equal', link.attr('href'));
         });
   });
});

export {};
