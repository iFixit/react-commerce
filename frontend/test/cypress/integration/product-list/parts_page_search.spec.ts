import { constants } from 'test/cypress/support/constants';

describe('parts page search', () => {
   const user = cy;

   beforeEach(() => {
      user.loadCollectionPageByPath('/Parts');
   });

   it('should show results when the search term exists', () => {
      user
         .findByTestId('collections-search-box')
         .should('be.visible')
         .should('not.be.disabled')
         .type('iphone');

      // Wait for search result to be updated
      user.wait('@search');
      user.wait(2000);

      // Check that url parameter contains ?q after searching
      user.location({ timeout: 2000 }).should((loc) => {
         expect(loc.search).to.have.string('?q=iphone');
      });

      // Assert that all products in the result contains word watch
      user
         .findByTestId('list-view-products')
         .children('article')
         .each((productListItem) => {
            user.wrap(productListItem).contains('iphone', { matchCase: false });
         });
   });

   it.skip("should show no results when search term doesn't exist", () => {
      user
         .findByTestId('collections-search-box')
         .should('be.visible')
         .should('not.be.disabled')
         .type('asdasasdadasd');

      // Wait for search result to be updated
      user.wait('@search');

      // Check that url parameter contains ?q after searching
      user.location({ timeout: 2000 }).should((loc) => {
         expect(loc.search).to.have.string('?q=');
      });

      user.findByTestId('list-view-products').should('not.exist');
      user.contains(constants.NO_SEARCH_RESULTS);
      user.contains(constants.NO_SEARCH_RESULT_DESC);
   });
});

export {};
