describe('parts page search', () => {
   const user = cy;

   beforeEach(() => {
      user.intercept('/1/indexes/**').as('search');
      user.visit('/Parts');
   });

   it('should show results when the search term exists', () => {
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
   });

   it('should show no results when search term doesn\'t exist', () => {
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
