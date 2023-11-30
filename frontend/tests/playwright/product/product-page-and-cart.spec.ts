import { test, expect } from '../test-fixtures';
import { createRestHandler } from '../msw/request-handler';

test.describe('Product Page and Cart Interactions', () => {
   test('Multiple Add To Cart Clicks with Quantity Check', async ({
      productPage,
      cartDrawer,
   }) => {
      await productPage.gotoProduct('spudger-retail-3-pack');

      const sku = await productPage.getSku();
      for (let i = 1; i <= 5; i++) {
         await productPage.addToCart();
         await cartDrawer.assertItemQuantity(sku, i);
         await cartDrawer.close();
      }

      await cartDrawer.open();
      await cartDrawer.assertItemQuantity(sku, 5);
   });

   test('Adjust Cart Item Quantity With Increase and Decrease', async ({
      productPage,
      cartDrawer,
   }) => {
      await productPage.gotoProduct('spudger-retail-3-pack');

      const sku = await productPage.getSku();
      await productPage.addToCart();
      await cartDrawer.assertCartTotalQuantity(1);

      for (let i = 2; i <= 5; i++) {
         await cartDrawer.increaseItemQuantity(sku);
         await cartDrawer.assertItemQuantity(sku, i);
      }

      await cartDrawer.close();
      await cartDrawer.open();

      for (let i = 5; i > 1; i--) {
         await cartDrawer.decreaseItemQuantity(sku);
         await cartDrawer.assertItemQuantity(sku, i - 1);
      }

      await cartDrawer.assertCartTotalQuantity(1);
      await cartDrawer.assertItemQuantity(sku, 1);
   });

   test('Remove Item and Re-add to Cart', async ({
      productPage,
      cartDrawer,
   }) => {
      await productPage.gotoProduct('spudger-retail-3-pack');
      const sku = await productPage.getSku();

      await productPage.addToCart();
      await cartDrawer.assertCartTotalQuantity(1);

      await cartDrawer.removeItem(sku);

      await cartDrawer.assertCartTotalQuantity(0);
      await cartDrawer.assertItemIsNotPresent(sku);
      await cartDrawer.close();
      await productPage.addToCart();
      await cartDrawer.assertCartTotalQuantity(1);
   });

   test('Cart Drawer Navigation and Item Removal', async ({
      productPage,
      cartDrawer,
   }) => {
      await productPage.gotoProduct('spudger-retail-3-pack');
      const sku = await productPage.getSku();

      await cartDrawer.open();
      await cartDrawer.assertCartTotalQuantity(0);
      await cartDrawer.assertItemIsNotPresent(sku);
      await productPage.page.getByTestId('back-to-shopping').click();
      await cartDrawer.assertDrawerIsClosed();

      await productPage.addToCart();
      await cartDrawer.assertCartTotalQuantity(1);
      await expect(
         productPage.page.getByTestId('back-to-shopping')
      ).not.toBeVisible();

      await cartDrawer.removeItem(sku);

      await cartDrawer.assertCartTotalQuantity(0);
      await cartDrawer.assertItemIsNotPresent(sku);
      await productPage.page.getByTestId('back-to-shopping').click();
      await cartDrawer.assertDrawerIsClosed();
   });

   test.describe('Product Stock Levels', () => {
      test('Low Stock Product Inventory Management Visibility', async ({
         productPage,
         cartDrawer,
      }) => {
         await productPage.gotoProduct('playwright-low-stock-product');

         const firstOptionSku = await productPage.getSku();

         await productPage.assertInventoryMessage('Only 3 left');
         await productPage.addToCart();
         await cartDrawer.assertItemQuantity(firstOptionSku, 1);

         await cartDrawer.close();
         await productPage.assertInventoryMessage('Only 2 left');

         await cartDrawer.open();
         await cartDrawer.increaseItemQuantity(firstOptionSku);
         await cartDrawer.assertItemQuantity(firstOptionSku, 2);

         await cartDrawer.close();
         await productPage.assertInventoryMessage('Only 1 left');

         await cartDrawer.open();
         await cartDrawer.increaseItemQuantity(firstOptionSku);
         await cartDrawer.assertItemQuantity(firstOptionSku, 3);

         await cartDrawer.close();
         await productPage.assertInventoryMessage('No more items available');
         await expect(productPage.addToCartButton).toBeDisabled();

         await productPage.switchSelectedVariant();
         const secondOptionSku = await productPage.getSku();

         await expect(productPage.addToCartButton).toBeVisible();
         await productPage.assertInventoryMessage();
         await productPage.addToCart();

         await cartDrawer.assertItemQuantity(secondOptionSku, 1);
         await cartDrawer.assertItemQuantity(firstOptionSku, 3);

         await cartDrawer.decreaseItemQuantity(firstOptionSku);
         await cartDrawer.assertItemQuantity(firstOptionSku, 2);

         await cartDrawer.close();
         await productPage.switchSelectedVariant();
         await productPage.assertInventoryMessage('Only 1 left');
      });

      test('Out of Stock Product Notifications and Variant Switching', async ({
         productPage,
         cartDrawer,
         clientRequestHandler,
      }) => {
         clientRequestHandler.use(
            createRestHandler({
               request: {
                  endpoint: '/api/2.0/cart/product/notifyWhenSkuInStock',
                  method: 'post',
               },
               response: {
                  status: 200,
               },
            })
         );

         await productPage.gotoProduct('playwright-out-of-stock-product');

         await productPage.switchSelectedVariant();

         await expect(productPage.addToCartButton).not.toBeVisible();
         await productPage.assertInventoryMessage();

         await expect(
            productPage.page.getByTestId('out-of-stock-alert')
         ).toBeVisible();

         const notifyMeForm = productPage.page.getByTestId('notify-me-form');
         await expect(notifyMeForm).toBeVisible();

         await notifyMeForm
            .getByLabel('Email address')
            .fill('test@example.com');
         await notifyMeForm.getByRole('button', { name: 'Notify me' }).click();
         await expect(
            productPage.page.getByTestId('notify-me-form-successful')
         ).toBeVisible();

         await productPage.switchSelectedVariant();
         await expect(productPage.addToCartButton).toBeVisible();
         await productPage.assertInventoryMessage();

         const partOnlySku = await productPage.getSku();

         await productPage.addToCart();
         await cartDrawer.assertItemQuantity(partOnlySku, 1);
         await cartDrawer.assertItemIsPresent(partOnlySku);

         await cartDrawer.close();
         await expect(productPage.addToCartButton).toBeEnabled();
         await productPage.assertInventoryMessage();
      });
   });
});
