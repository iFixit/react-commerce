describe('Pro user test', () => {
   it('will give pro users a discount', () => {
      cy.loadProductPageByPath('/products/repair-business-toolkit');

      // Assert product title is visible
      cy.findByTestId('product-title')
         .should('be.visible')
         .invoke('text')
         .then((productTitle) => {
            expect(productTitle).to.equal('Repair Business Toolkit');
         });

      // Get price from page
      cy.findAllByTestId('product-price')
         .first()
         .invoke('text')
         .then((originalPriceString) => {
            // Login as pro
            cy.interceptLogin('pro_4');
            cy.reload();

            // Wait until the pro icon is shown.
            cy.get('.fa-rectangle-pro').should('be.visible');

            // Assert price on page is lower than step 1
            cy.findAllByTestId('product-price')
               .first()
               .invoke('text')
               .then((proPriceString) => {
                  const originalPrice = parseFloat(
                     originalPriceString.replace('$', '')
                  );
                  const proPrice = parseFloat(proPriceString.replace('$', ''));
                  expect(originalPrice).to.be.greaterThan(proPrice);
               });
         });
   });
});
export {};
