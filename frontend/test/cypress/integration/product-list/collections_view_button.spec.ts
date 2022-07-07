describe('collection display', () => {
   const user = cy;
   beforeEach(() => {
      user.visit('/Tools');
   });

   it('should display grid view when selected', () => {
      user.findByTestId('grid-view-button').click();
      user.findByTestId('list-view-products').should('not.exist');

      // Make sure the display property equals to grid
      user
         .getByDataTestId('grid-view-products')
         .invoke('css', 'display')
         .should('equal', 'grid');
   });

   it('should display list view when selected', () => {
      // First click on grid view button
      user.findByTestId('grid-view-button').click();
      // Then switch back to list view button
      user.findByTestId('list-view-button').click();
      user.findByTestId('grid-view-products').should('not.exist');

      // Make sure the display property equals to flex
      user
         .getByDataTestId('list-view-products')
         .invoke('css', 'display')
         .should('equal', 'flex');
   });
});

export {};
