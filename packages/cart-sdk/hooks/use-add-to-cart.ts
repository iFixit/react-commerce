import {
   convertAddToCartInputToAnalyticsItemEvent,
   convertCartLineItemsToAnalyticsItem,
   trackInAnalyticsAddToCart,
   trackPiwikCartUpdate,
   trackPiwikCustomAddToCart,
} from '@ifixit/analytics';
import { assertNever, getProductVariantSku } from '@ifixit/helpers';
import { useIFixitApiClient } from '@ifixit/ifixit-api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Cart, CartLineItem } from '../types';
import { cartKeys } from '../utils';
import { useCartDrawer } from '@ifixit/ui';

export type AddToCartInput = AddProductToCartInput | AddBundleToCartInput;

type AddProductToCartInput = {
   type: 'product';
   product: CartLineItem;
};

type AddBundleToCartInput = {
   type: 'bundle';
   bundle: {
      currentItemCode: string;
      items: CartLineItem[];
   };
};

/**
 * Update line item quantity.
 */
export function useAddToCart(analyticsMessage?: string) {
   const client = useQueryClient();
   const iFixitApiClient = useIFixitApiClient();
   const { addErrorMessage } = useCartDrawer();
   const mutation = useMutation(
      async (input) => {
         switch (input.type) {
            case 'product': {
               return iFixitApiClient.post(
                  `store/user/cart/product/${input.product.itemcode}`,
                  'add-to-cart',
                  {
                     body: JSON.stringify({
                        quantity: input.product.quantity,
                     }),
                  }
               );
            }
            case 'bundle': {
               return iFixitApiClient.post(
                  `store/user/cart/product`,
                  'add-to-cart-bundle',
                  {
                     body: JSON.stringify({
                        skus: input.bundle.items.map((item) =>
                           getProductVariantSku(item.itemcode)
                        ),
                        pageSku: getProductVariantSku(
                           input.bundle.currentItemCode
                        ),
                     }),
                  }
               );
            }
            default: {
               throw assertNever(input);
            }
         }
      },
      {
         onMutate: async (input: AddToCartInput) => {
            await client.cancelQueries(cartKeys.cart);
            window.onbeforeunload = () =>
               'Some products are being added to the cart. Do you really want to quit?';

            const previousCart = client.getQueryData<Cart>(cartKeys.cart);

            client.setQueryData<Cart | undefined>(
               cartKeys.cart,
               (currentCart) => {
                  if (currentCart == null) {
                     return currentCart;
                  }
                  const inputLineItems: CartLineItem[] =
                     input.type === 'bundle'
                        ? input.bundle.items
                        : [input.product];

                  const updatedCart = inputLineItems.reduce(
                     addLineItem,
                     currentCart
                  );

                  updatedCart.lineItems.sort((a, b) =>
                     a.itemcode.localeCompare(b.itemcode)
                  );

                  return updatedCart;
               }
            );

            return { previousCart };
         },
         onError: (error, variables, context) => {
            client.setQueryData<Cart | undefined>(
               cartKeys.cart,
               context?.previousCart
            );
            addErrorMessage(
               (error as string) || 'An error occurred updating the cart.'
            );
         },
         onSuccess: (data, variables) => {
            trackPiwikCustomAddToCart(variables, analyticsMessage);
            const event = convertAddToCartInputToAnalyticsItemEvent(variables);
            trackInAnalyticsAddToCart(event);
            const cart = client.getQueryData<Cart>(cartKeys.cart);
            if (cart) {
               trackPiwikCartUpdate({
                  items: convertCartLineItemsToAnalyticsItem(cart.lineItems),
                  value: Number(cart.totals.price.amount),
                  currency: cart.totals.price.currencyCode,
               });
            }
         },
         onSettled: () => {
            window.onbeforeunload = () => undefined;
            client.invalidateQueries(cartKeys.cart);
         },
      }
   );
   return mutation;
}

function addLineItem(cart: Cart, inputLineItem: CartLineItem): Cart {
   const currentLineItemIndex = cart.lineItems.findIndex(
      (item) => item.itemcode === inputLineItem.itemcode
   );
   const isAlreadyInCart = currentLineItemIndex >= 0;
   let updatedLineItems = cart.lineItems.slice();
   if (isAlreadyInCart) {
      const currentLineItem = cart.lineItems[currentLineItemIndex];
      const updatedQuantity = currentLineItem.quantity + inputLineItem.quantity;
      updatedLineItems.splice(currentLineItemIndex, 1, {
         ...currentLineItem,
         quantity: updatedQuantity,
      });
   } else {
      updatedLineItems.push(inputLineItem);
   }
   const updateTotalPrice = Math.max(
      Number(cart.totals.price.amount) +
         inputLineItem.quantity * Number(inputLineItem.price.amount),
      0
   ).toFixed(2);
   return {
      ...cart,
      hasItemsInCart: true,
      lineItems: updatedLineItems,
      totals: {
         ...cart.totals,
         price: {
            ...cart.totals.price,
            amount: updateTotalPrice,
         },
         itemsCount: cart.totals.itemsCount + inputLineItem.quantity,
      },
   };
}
