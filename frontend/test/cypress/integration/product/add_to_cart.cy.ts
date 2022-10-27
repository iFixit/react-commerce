describe('product page add to cart', () => {
   beforeEach(() => {
      cy.loadProductPageByPath(
         '/products/spudger-retail-3-pack?variantid=39419992408154'
      );
      cy.findByTestId('cart-drawer-open').click().wait(10);
      cy
         .findAllByTestId('cart-drawer-item-count')
         .should('exist')
         .invoke('text')
         .should('eq', '0');
      cy.findByTestId('cart-drawer-quantity').should('not.exist');
      cy.findByTestId('cart-drawer-close').click().wait(10);
      cy.findByTestId('cart-drawer-close').should('not.exist');
   });

   it('Clicking Add To Cart Adds Items To Cart', () => {
      const genArr = Array.from({ length: 5 }, (v, k) => k + 1);
      cy.wrap(genArr).each((index) => {
         cy.findByTestId('product-add-to-cart-button').click().wait(10);
         cy
            .findAllByTestId('cart-drawer-quantity')
            .invoke('text')
            .then(parseInt)
            .should('eq', index);
         cy.findByTestId('cart-drawer-close').click().wait(10);
      });

      cy.findByTestId('cart-drawer-open').click().wait(10);
      cy.removeItemsFromCartAndCloseDrawer();
   });

   it('Clicking + and - Buttons Changes Item Quantity in Cart', () => {
      cy.findByTestId('product-add-to-cart-button').click().wait(10);
      cy
         .findAllByTestId('cart-drawer-item-count')
         .invoke('text')
         .then(parseInt)
         .should('eq', 1);
      const genArr = Array.from({ length: 5 }, (v, k) => k + 2);
      cy.wrap(genArr).each((index) => {
         cy.findByTestId('cart-drawer-increase-quantity').click().wait(10);
         cy
            .findAllByTestId('cart-drawer-quantity')
            .invoke('text')
            .then(parseInt)
            .should('eq', index);
      });
      cy.findByTestId('cart-drawer-close').click().wait(10);

      cy.findByTestId('cart-drawer-open').click().wait(10);
      const genArrRev = Array.from({ length: 5 }, (v, k) => k + 1).reverse();
      cy.wrap(genArrRev).each((index) => {
         cy.findByTestId('cart-drawer-decrease-quantity').click().wait(10);
         cy
            .findAllByTestId('cart-drawer-quantity')
            .invoke('text')
            .then(parseInt)
            .should('eq', index);
      });
      cy
         .findAllByTestId('cart-drawer-item-count')
         .invoke('text')
         .then(parseInt)
         .should('eq', 1);
      cy
         .findAllByTestId('cart-drawer-quantity')
         .invoke('text')
         .then(parseInt)
         .should('eq', 1);
      cy.removeItemsFromCartAndCloseDrawer();
   });

   it('Item Can Be Added Again After Removing The Item', () => {
      cy.findByTestId('product-add-to-cart-button').click().wait(10);
      cy
         .findAllByTestId('cart-drawer-item-count')
         .invoke('text')
         .then(parseInt)
         .should('eq', 1);
      cy
         .findAllByTestId('cart-drawer-remove-item')
         .wait(10)
         .then((items) => items.trigger('click'))
         .wait(10);
      cy
         .findAllByTestId('cart-drawer-item-count')
         .invoke('text')
         .then(parseInt)
         .should('eq', 0);
      cy.findAllByTestId('cart-drawer-quantity').should('not.exist');
      cy.findByTestId('cart-drawer-close').click().wait(10);
      cy.findByTestId('product-add-to-cart-button').click().wait(10);
      cy
         .findAllByTestId('cart-drawer-item-count')
         .invoke('text')
         .then(parseInt)
         .should('eq', 1);
      cy.removeItemsFromCartAndCloseDrawer();
   });

   it('Back to Shopping Button Works', () => {
      cy.findByTestId('cart-drawer-open').click().wait(10);
      cy
         .findAllByTestId('cart-drawer-item-count')
         .should('exist')
         .invoke('text')
         .should('eq', '0');
      cy.findAllByTestId('cart-drawer-quantity').should('not.exist');
      cy.findByTestId('back-to-shopping').click().wait(10);
      cy.findAllByTestId('cart-drawer-item-count').should('not.exist');

      cy.findByTestId('product-add-to-cart-button').click().wait(10);
      cy
         .findAllByTestId('cart-drawer-item-count')
         .invoke('text')
         .then(parseInt)
         .should('eq', 1);
      cy.findByTestId('back-to-shopping').should('not.be.visible');
      cy
         .findAllByTestId('cart-drawer-remove-item')
         .wait(10)
         .then((items) => items.trigger('click'))
         .wait(10);
      cy
         .findAllByTestId('cart-drawer-item-count')
         .invoke('text')
         .then(parseInt)
         .should('eq', 0);
      cy.findByTestId('cart-drawer-quantity').should('not.exist');
      cy.findByTestId('back-to-shopping').click().wait(10);
      cy.findAllByTestId('cart-drawer-item-count').should('not.exist');
      cy.findByTestId('cart-drawer-close').should('not.exist');
   });
});

export {};
