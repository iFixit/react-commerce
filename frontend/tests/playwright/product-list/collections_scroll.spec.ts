// Assert that when a user clicks the pagination buttons,
// the page scrolls back up.

describe('collections scroll', () => {
   beforeEach(() => {
      cy.loadCollectionPageByPath('/Tools');
   });

   it('should scroll to the top of the page after clicking next page', () => {
      cy.findByTestId('collections-search-box').should('be.visible');
      cy.findByTestId('next-page').click();

      // When it scrolls to the top, the search bar should be visible
      cy.findByTestId('collections-search-box').isWithinViewport();

      // Check that url parameter contains ?p after clicking next page
      cy.location().should((loc) => {
         expect(loc.search).to.have.string('?p=');
      });
   });
});

export {};
