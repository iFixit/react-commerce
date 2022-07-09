describe('parts page results view', () => {
   const user = cy;

   beforeEach(() => {
      user.visit('/Parts');
   });

   it('all products have price visible', () => {
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
    * In ProductListItem, we set noOfLines prop to 3
    * to truncate the product description text. This
    * tests each product description to be less than 4
    * lines.
    */
   it('product description is truncated', () => {
      // Counting text lines https://stackoverflow.com/questions/783899
      user.get('[data-testid="product-short-desc"]').each((descriptionDiv) => {
         const divHeight = descriptionDiv.outerHeight() ?? 0;
         const lineHeigth = parseInt(descriptionDiv.css('lineHeight'));
         const noOfLines = divHeight / lineHeigth;

         expect(noOfLines).to.be.below(
            4,
            'Product description text is more than 3 lines!'
         );
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
