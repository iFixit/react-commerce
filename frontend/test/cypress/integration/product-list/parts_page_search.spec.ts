describe('parts page search', () => {
   const user = cy;

   beforeEach(() => {
      user.intercept('/1/indexes/**').as('search');
      user.visit('/Parts');
   });

   it('should search for products', () => {
      user
         .findByTestId('collections-search-box')
         .should('be.visible')
         .type('watch');
      user.wait('@search');

      // Assert that all products in the result contains word watch
      user
         .findByTestId('list-view-products')
         .children('article')
         .each((productCart) => {
            user.wrap(productCart).contains('watch', { matchCase: false });
         });

      user.findByTestId('collections-search-box').should('be.visible').clear();
      user
         .findByTestId('collections-search-box')
         .should('be.visible')
         .type('asdasasdadasd');
      user.wait('@search');

      user.findByTestId('list-view-products').should('not.exist');
      user.contains('No results found');
      user.contains(
         "Try adjusting your search or filter to find what you're looking for"
      );
   });
});

export {};
