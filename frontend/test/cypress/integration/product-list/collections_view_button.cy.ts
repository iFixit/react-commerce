describe('collection display', () => {
   beforeEach(() => {
      cy.loadCollectionPageByPath('/Tools');
   });

   it('should display grid view when selected', () => {
      cy.findByTestId('grid-view-button').click();
      cy.findByTestId('list-view-products').should('not.exist');

      // Make sure the display property equals to grid
      cy.findByTestId('grid-view-products')
         .invoke('css', 'display')
         .should('equal', 'grid');
   });

   it('should display list view when selected', () => {
      // First click on grid view button
      cy.findByTestId('grid-view-button').click();
      // Then switch back to list view button
      cy.findByTestId('list-view-button').click();
      cy.findByTestId('grid-view-products').should('not.exist');

      // Make sure the display property equals to flex
      cy.findByTestId('list-view-products')
         .invoke('css', 'display')
         .should('equal', 'flex');
   });
});

export {};
