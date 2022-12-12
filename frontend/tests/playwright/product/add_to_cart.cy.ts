describe('product page add to cart', () => {
   beforeEach(() => {
      cy.intercept('/api/2.0/internal/international_store_promotion/buybox*', {
         statusCode: 200,
         body: null,
      }).as('buybox');
      cy.loadProductPageByPath('/products/spudger-retail-3-pack');
   });

   it('Clicking Add To Cart Adds Items To Cart', () => {
      cy.times(5, (index) => {
         cy.findByTestId('product-add-to-cart-button').click();
         const expectedQuantity = index + 1;
         cy.findAllByTestId('cart-drawer-quantity').should(
            'have.text',
            expectedQuantity
         );
         cy.findByTestId('cart-drawer-close').click();
      });
      cy.findByTestId('cart-drawer-open').click();
   });

   it('Clicking + and - Buttons Changes Item Quantity in Cart', () => {
      cy.findByTestId('product-add-to-cart-button').click();
      cy.findAllByTestId('cart-drawer-item-count').should('have.text', 1);
      cy.times(5, (index) => {
         cy.findByTestId('cart-drawer-increase-quantity').click();
         const expectedQuantity = index + 2;
         cy.findAllByTestId('cart-drawer-quantity').should(
            'have.text',
            expectedQuantity
         );
      });
      cy.findByTestId('cart-drawer-close').click();
      cy.findByTestId('cart-drawer-open').click();
      cy.times(5, (index) => {
         cy.findByTestId('cart-drawer-decrease-quantity').click();
         const expectedQuantity = 5 - index;
         cy.findAllByTestId('cart-drawer-quantity').should(
            'have.text',
            expectedQuantity
         );
      });
      cy.findAllByTestId('cart-drawer-item-count').should('have.text', 1);
      cy.findAllByTestId('cart-drawer-quantity').should('have.text', 1);
   });

   it('Item Can Be Added Again After Removing The Item', () => {
      cy.findByTestId('product-add-to-cart-button').click();
      cy.findAllByTestId('cart-drawer-item-count').should('have.text', 1);
      cy.findAllByTestId('cart-drawer-remove-item').click();
      cy.findAllByTestId('cart-drawer-item-count').should('have.text', 0);
      cy.findAllByTestId('cart-drawer-quantity').should('not.exist');
      cy.findByTestId('cart-drawer-close').click();
      cy.findByTestId('product-add-to-cart-button').click();
      cy.findAllByTestId('cart-drawer-item-count').should('have.text', 1);
   });

   it('Back to Shopping Button Works', () => {
      cy.findByTestId('cart-drawer-open').click();
      cy.findAllByTestId('cart-drawer-item-count').should('have.text', 0);
      cy.findAllByTestId('cart-drawer-quantity').should('not.exist');
      cy.findByTestId('back-to-shopping').click();
      cy.findAllByTestId('cart-drawer-item-count').should('not.exist');

      cy.findByTestId('product-add-to-cart-button').click();
      cy.findAllByTestId('cart-drawer-item-count').should('have.text', 1);
      cy.findByTestId('back-to-shopping').should('not.be.visible');
      cy.findAllByTestId('cart-drawer-remove-item').click();
      cy.findAllByTestId('cart-drawer-item-count').should('have.text', 0);
      cy.findByTestId('cart-drawer-quantity').should('not.exist');
      cy.findByTestId('back-to-shopping').click();
      cy.findAllByTestId('cart-drawer-item-count').should('not.exist');
      cy.findByTestId('cart-drawer-close').should('not.exist');
   });
});

export {};
