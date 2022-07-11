import { constants } from 'test/cypress/support/constants';

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
         .type('iphone');

      user.wait('@search');

      // Assert that all products in the result contains word watch
      user
         .findByTestId('list-view-products')
         .children('article')
         .each((productListItem) => {
            user.wrap(productListItem).contains('iphone', { matchCase: false });
         });
   });

   it("should show no results when search term doesn't exist", () => {
      user
         .findByTestId('collections-search-box')
         .should('be.visible')
         .type('asdasasdadasd');

      user.wait('@search');

      user.findByTestId('list-view-products').should('not.exist');
      user.contains(constants.NO_SEARCH_RESULTS);
      user.contains(constants.NO_SEARCH_RESULT_DESC);
   });
});

export {};
