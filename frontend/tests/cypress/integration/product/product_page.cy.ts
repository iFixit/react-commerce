describe('Product page test', () => {
   it('verify product title, price and sku are visible', () => {
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
            /* eslint-disable no-useless-escape */
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
         });
   });
});
export {};
