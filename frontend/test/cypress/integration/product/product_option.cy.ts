describe('Product option test', () => {
   it('test different styles', function () {
      cy.loadProductPageByPath('/products/repair-business-toolkit');

      cy.findByText('Style').should('be.visible');
      cy.findByTestId('product-option-selector').as('selector');

      // Get the price, sku, and name for the first product option
      cy.findAllByTestId('product-price')
         .first()
         .invoke('text')
         .as('firstOptionPrice');
      cy.findAllByTestId('product-sku')
         .first()
         .invoke('text')
         .as('firstOptionSkuText');
      cy.get('@selector')
         .get('option:selected')
         .invoke('text')
         .as('firstOptionName');

      // Add the first product option to the cart
      cy.findByTestId('product-add-to-cart-button').click();
      cy.findByTestId('cart-drawer-close').click();

      cy.get('@selector').select(1);

      // Get the price, sku, and name for the second product option
      cy.findAllByTestId('product-price')
         .first()
         .invoke('text')
         .as('secondOptionPrice');
      cy.findAllByTestId('product-sku')
         .first()
         .invoke('text')
         .as('secondOptionSkuText');
      cy.get('@selector')
         .get('option:selected')
         .invoke('text')
         .as('secondOptionName');

      // Add the second product option to the cart
      cy.findByTestId('product-add-to-cart-button').click();

      // Assert that the cart drawer contains the skus and prices of the added products
      cy.findByTestId('cart-drawer-body')
         .should('be.visible')
         .then((el) => {
            // Parse out the skus from the skuTexts which are in form of "Item # IF145-278-14"
            const sku1 = this.firstOptionSkuText.match(/IF\d*\-\d*\-\d*/g)[0];
            const sku2 = this.secondOptionSkuText.match(/IF\d*\-\d*\-\d*/g)[0];

            cy.wrap(el).contains(sku1);
            cy.wrap(el).contains(sku2);
            cy.wrap(el).contains(this.firstOptionPrice);
            cy.wrap(el).contains(this.secondOptionPrice);

            expect(sku1).to.not.eq(sku2);
            expect(this.firstOptionName).to.not.eq(this.secondOptionName);
            expect(this.firstOptionPrice).to.not.eq(this.secondOptionPrice);
         });
   });
});

export {};
