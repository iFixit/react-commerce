import { constants } from 'test/cypress/support/constants';

describe('parts page search', () => {
   beforeEach(() => {
      cy.loadCollectionPageByPath('/Parts');
   });

   it('should show results when the search term exists', () => {
      cy.findByTestId('collections-search-box')
         .should('be.visible')
         .should('not.be.disabled')
         .type('iphone');

      // Wait for search result to be updated
      cy.wait('@search');

      // Check that url parameter contains ?q after searching
      cy.location().should((loc) => {
         expect(loc.search).to.have.string('?q=iphone');
      });

      // Assert that all products in the result contains word watch
      cy.findByTestId('list-view-products')
         .children('article')
         .each((productListItem) => {
            cy.wrap(productListItem).contains('iphone', { matchCase: false });
         });
   });

   it("should show no results when search term doesn't exist", () => {
      cy.findByTestId('collections-search-box')
         .should('be.visible')
         .should('not.be.disabled')
         .type('asdasasdadasd');

      // Wait for search result to be updated
      cy.wait('@search');

      // Check that url parameter contains ?q after searching
      cy.location().should((loc) => {
         expect(loc.search).to.have.string('?q=');
      });

      cy.findByTestId('list-view-products').should('not.exist');
      cy.contains(constants.NO_SEARCH_RESULTS);
      cy.contains(constants.NO_SEARCH_RESULT_DESC);
   });
});

export {};
