// Assert that when a user clicks the pagination buttons,
// the page scrolls back up.

describe('collections scroll', () => {
   const user = cy;
   beforeEach(() => {
      user.intercept('/1/indexes/**').as('search');
      user.visit('/Tools');
   });

   it('should scroll to the top of the page after clicking next page', () => {
      user.findByTestId('collections-search-box').should('be.visible');
      user.findByTestId('next-page').click();

      // Wait for the next page to be updated and scrolled to top.
      user.wait('@search');
      user.wait(3000);

       // When it scrolls to the top, the search bar should be visible
      user.window().isWithinViewport(user.get('[data-testid=collections-search-box]'));

       // Check that url parameter contains ?p after clicking next page
      user.location().should((loc) => {
         expect(loc.search).to.have.string('?p=')
      })
   });
});

export {};
