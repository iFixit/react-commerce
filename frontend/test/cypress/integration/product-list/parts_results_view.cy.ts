describe('parts page results view', () => {
   const user = cy;

   beforeEach(() => {
      user.loadCollectionPageByPath('/Parts');
   });

   it('all products have a visible price', () => {
      user
         .findByTestId('list-view-products')
         .children('article')
         .each((productListItem) => {
            user
               .wrap(productListItem)
               .findByTestId('product-price')
               .should('be.visible');
         });
   });

   it('product View button directs to the product page', () => {
      user
         .contains('.chakra-button', 'View')
         .parent()
         .then((link) => {
            // Find the first product View button and click
            user.wrap(link).click();

            // Assert the current window url path is the same as button link
            user
               .location('pathname', { timeout: 10000 })
               .should('equal', link.attr('href'));
         });
   });
});

export {};
