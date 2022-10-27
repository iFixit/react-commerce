describe('product page add to cart', () => {
   beforeEach(() => {
      cy.loadProductPageByPath(
         '/products/spudger-retail-3-pack?variantid=39419992408154'
      );
      cy.findByTestId('cart-drawer-open').click();
      cy.findAllByTestId('cart-drawer-item-count').should('have.text', 0);
      cy.findByTestId('cart-drawer-quantity').should('not.exist');
      cy.findByTestId('cart-drawer-close').click();
      cy.findByTestId('cart-drawer-close').should('not.exist');
   });

   it('Clicking Add To Cart Adds Items To Cart', () => {
      for (let i = 1; i <= 5; i++) {
         cy.findByTestId('product-add-to-cart-button').click();
         cy.findAllByTestId('cart-drawer-quantity').should('have.text', i);
         cy.findByTestId('cart-drawer-close').click();
      }
      cy.findByTestId('cart-drawer-open').click();
      cy.removeItemsFromCartAndCloseDrawer();
   });

   it('Clicking + and - Buttons Changes Item Quantity in Cart', () => {
      cy.findByTestId('product-add-to-cart-button').click();
      cy.findAllByTestId('cart-drawer-item-count').should('have.text', 1);
      for (let i = 2; i <= 6; i++) {
         cy.findByTestId('cart-drawer-increase-quantity').click();
         cy.findAllByTestId('cart-drawer-quantity').should('have.text', i);
      }
      cy.findByTestId('cart-drawer-close').click();

      cy.findByTestId('cart-drawer-open').click();
      for (let i = 5; i >= 1; i--) {
         cy.findByTestId('cart-drawer-decrease-quantity').click();
         cy.findAllByTestId('cart-drawer-quantity').should('have.text', i);
      }
      cy.findAllByTestId('cart-drawer-item-count').should('have.text', 1);
      cy.findAllByTestId('cart-drawer-quantity').should('have.text', 1);
      cy.removeItemsFromCartAndCloseDrawer();
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
      cy.removeItemsFromCartAndCloseDrawer();
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
