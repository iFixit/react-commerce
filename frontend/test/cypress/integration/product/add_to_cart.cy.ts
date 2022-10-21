describe('product page add to cart', () => {
   const user = cy;

   beforeEach(() => {
      user.loadProductPageByPath(
         '/products/spudger-retail-3-pack?variantid=39419992408154'
      );
      user.findByTestId('cart-drawer-open').click().wait(10);
      user
         .findAllByTestId('cart-drawer-item-count')
         .should('exist')
         .invoke('text')
         .should('eq', '0');
      user.findByTestId('cart-drawer-quantity').should('not.exist');
      user.findByTestId('cart-drawer-close').click().wait(10);
      user.findByTestId('cart-drawer-close').should('not.exist');
   });

   it('Clicking Add To Cart Adds Items To Cart', () => {
      var genArr = Array.from({ length: 5 }, (v, k) => k + 1);
      user.wrap(genArr).each((index) => {
         user.findByTestId('product-add-to-cart-button').click().wait(10);
         user
            .findAllByTestId('cart-drawer-quantity')
            .invoke('text')
            .then(parseInt)
            .should('eq', index);
         user.findByTestId('cart-drawer-close').click().wait(10);
      });

      user.findByTestId('cart-drawer-open').click().wait(10);
      user.removeItemsFromCartAndCloseDrawer();
   });

   it('Clicking + and - Buttons Changes Item Quantity in Cart', () => {
      user.findByTestId('product-add-to-cart-button').click().wait(10);
      user
         .findAllByTestId('cart-drawer-item-count')
         .invoke('text')
         .then(parseInt)
         .should('eq', 1);
      const genArr = Array.from({ length: 5 }, (v, k) => k + 2);
      user.wrap(genArr).each((index) => {
         user.findByTestId('cart-drawer-increase-quantity').click().wait(10);
         user
            .findAllByTestId('cart-drawer-quantity')
            .invoke('text')
            .then(parseInt)
            .should('eq', index);
      });
      user.findByTestId('cart-drawer-close').click().wait(10);

      user.findByTestId('cart-drawer-open').click().wait(10);
      const genArrRev = Array.from({ length: 5 }, (v, k) => k + 1).reverse();
      user.wrap(genArrRev).each((index) => {
         user.findByTestId('cart-drawer-decrease-quantity').click().wait(10);
         user
            .findAllByTestId('cart-drawer-quantity')
            .invoke('text')
            .then(parseInt)
            .should('eq', index);
      });
      user
         .findAllByTestId('cart-drawer-item-count')
         .invoke('text')
         .then(parseInt)
         .should('eq', 1);
      user
         .findAllByTestId('cart-drawer-quantity')
         .invoke('text')
         .then(parseInt)
         .should('eq', 1);
      user.removeItemsFromCartAndCloseDrawer();
   });

   it('Item Can Be Added Again After Removing The Item', () => {
      user.findByTestId('product-add-to-cart-button').click().wait(10);
      user
         .findAllByTestId('cart-drawer-item-count')
         .invoke('text')
         .then(parseInt)
         .should('eq', 1);
      user
         .findAllByTestId('cart-drawer-remove-item')
         .wait(10)
         .then((items) => items.trigger('click'))
         .wait(10);
      user
         .findAllByTestId('cart-drawer-item-count')
         .invoke('text')
         .then(parseInt)
         .should('eq', 0);
      user.findAllByTestId('cart-drawer-quantity').should('not.exist');
      user.findByTestId('cart-drawer-close').click().wait(10);
      user.findByTestId('product-add-to-cart-button').click().wait(10);
      user
         .findAllByTestId('cart-drawer-item-count')
         .invoke('text')
         .then(parseInt)
         .should('eq', 1);
      user.removeItemsFromCartAndCloseDrawer();
   });

   it('Back to Shopping Button Works', () => {
      user.findByTestId('cart-drawer-open').click().wait(10);
      user
         .findAllByTestId('cart-drawer-item-count')
         .should('exist')
         .invoke('text')
         .should('eq', '0');
      user.findAllByTestId('cart-drawer-quantity').should('not.exist');
      user.findByTestId('back-to-shopping').click().wait(10);
      user.findAllByTestId('cart-drawer-item-count').should('not.exist');

      user.findByTestId('product-add-to-cart-button').click().wait(10);
      user
         .findAllByTestId('cart-drawer-item-count')
         .invoke('text')
         .then(parseInt)
         .should('eq', 1);
      user.findByTestId('back-to-shopping').should('not.be.visible');
      user
         .findAllByTestId('cart-drawer-remove-item')
         .wait(10)
         .then((items) => items.trigger('click'))
         .wait(10);
      user
         .findAllByTestId('cart-drawer-item-count')
         .invoke('text')
         .then(parseInt)
         .should('eq', 0);
      user.findByTestId('cart-drawer-quantity').should('not.exist');
      user.findByTestId('back-to-shopping').click().wait(10);
      user.findAllByTestId('cart-drawer-item-count').should('not.exist');
      user.findByTestId('cart-drawer-close').should('not.exist');
   });
});

export {};
