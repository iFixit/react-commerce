describe('collections click on product view buttons', () => {
   const user = cy;
   beforeEach(() => {
      user.visit('/Tools');
   });

   it('Click on grid view button and check product display styling is grid', () => {
      user.findByTestId('grid-view-button').click();
      user.findByTestId('list-view-products').should('not.exist');

      // Make sure the display property equals to grid
      user
         .get('[data-testid="grid-view-products"]')
         .invoke('css', 'display')
         .should('equal', 'grid');
   });

   it('Click on grid, then list view button and check product display styling', () => {
      // First click on grid view button
      user.findByTestId('grid-view-button').click();
      // Then switch back to list view button
      user.findByTestId('list-view-button').click();
      user.findByTestId('grid-view-products').should('not.exist');

      // Make sure the display property equals to flex
      user
         .get('[data-testid="list-view-products"]')
         .invoke('css', 'display')
         .should('equal', 'flex');
   });
});

export {};
