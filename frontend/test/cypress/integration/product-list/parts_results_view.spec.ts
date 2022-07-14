describe('parts page results view', () => {
   const user = cy;

   beforeEach(() => {
      user.visit('/Parts');
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

   /**
    * TODO: Unskip when the new product page is implemented
    *
    * We can link to the old product page by setting
    * `chromeWebSecurity: false` but it will disable
    * cors for all cypress tests, thus skipped.
    */
   it.skip('product View button directs to the product page', () => {
      user
         .contains('.chakra-button', 'View')
         .parent()
         .then((link) => {
            // Find the first product View button and click
            user.wrap(link).click();

            // Assert the current window url is the same as button link
            user
               .location('href', { timeout: 20000 })
               .should('equal', link.attr('href'));
         });
   });
});

export {};
