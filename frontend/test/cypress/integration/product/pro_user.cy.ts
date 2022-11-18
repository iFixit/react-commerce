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

      // Assert product sku is visible
      cy.findByTestId('product-sku')
         .should('be.visible')
         .invoke('text')
         .then((productSku) => {
            expect(productSku).to.match(/IF\d*\-\d*/g);
         });

      // Get price from page
      cy.findAllByTestId('product-price')
         .first()
         .should('be.visible')
         .invoke('text')
         .then((originalPriceString) => {
            // regex to match $299.99 with dollar sign
            expect(originalPriceString).to.match(/\$\d*\.\d*/g);

            // Login as pro
            cy.interceptLogin({ discount_tier: 'pro_4' });
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
