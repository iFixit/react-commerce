import { useIFixitApiClient } from '@ifixit/ifixit-api-client';
import { useMutation, useQueryClient } from 'react-query';
import { APICart } from '../types';
import { cartKeys } from '../utils';

export interface AddProductVariantInput {
   name: string;
   itemcode: string;
   formattedPrice: string;
   quantity: number;
   imageSrc: string;
}

export type AddToCartBundleInput = {
   currentItemCode: string;
   items: AddProductVariantInput[];
};

/**
 * Update line item quantity.
 */
export function useAddToCart() {
   const client = useQueryClient();
   const iFixitApiClient = useIFixitApiClient();
   const mutation = useMutation(
      async (input) => {
         if (isBundleInput(input)) {
            return iFixitApiClient.post(`store/user/cart/product`, {
               body: JSON.stringify({
                  skus: input.items.map((item) =>
                     getApiSkuFromItemCode(item.itemcode)
                  ),
                  pageSku: getApiSkuFromItemCode(input.currentItemCode),
               }),
            });
         }
         return iFixitApiClient.post(
            `store/user/cart/product/${input.itemcode}`,
            {
               body: JSON.stringify({
                  quantity: input.quantity,
               }),
            }
         );
      },
      {
         onMutate: async (
            input: AddProductVariantInput | AddToCartBundleInput
         ) => {
            await client.cancelQueries(cartKeys.cart);
            window.onbeforeunload = () =>
               'Some products are being added to the cart. Do you really want to quit?';

            const previousCart = client.getQueryData<APICart>(cartKeys.cart);

            client.setQueryData<APICart | undefined>(
               cartKeys.cart,
               (currentCart) => {
                  if (currentCart == null) {
                     return currentCart;
                  }
                  const inputLineItems = isBundleInput(input)
                     ? input.items
                     : [input];

                  const updatedCart = inputLineItems.reduce(
                     addLineItem,
                     currentCart
                  );

                  updatedCart.products.sort((a, b) =>
                     a.itemcode.localeCompare(b.itemcode)
                  );

                  return updatedCart;
               }
            );

            return { previousCart };
         },
         onError: (error, variables, context) => {
            client.setQueryData<APICart | undefined>(
               cartKeys.cart,
               context?.previousCart
            );
         },
         onSettled: () => {
            window.onbeforeunload = () => undefined;
            client.invalidateQueries(cartKeys.cart);
         },
      }
   );
   return mutation;
}

function addLineItem(cart: APICart, inputLineItem: AddProductVariantInput) {
   const currentLineItemIndex = cart.products.findIndex(
      (item) => item.itemcode === inputLineItem.itemcode
   );
   const isAlreadyInCart = currentLineItemIndex >= 0;
   let updatedLineItems = cart.products.slice();
   if (isAlreadyInCart) {
      const currentLineItem = cart.products[currentLineItemIndex];
      updatedLineItems.splice(currentLineItemIndex, 1, {
         ...currentLineItem,
         quantity: currentLineItem.quantity + inputLineItem.quantity,
      });
   } else {
      updatedLineItems.push({
         discount: '',
         imageSrc: inputLineItem.imageSrc,
         itemcode: inputLineItem.itemcode,
         maxToAdd: 0,
         name: inputLineItem.name,
         quantity: inputLineItem.quantity,
         subPrice: inputLineItem.formattedPrice,
         subPriceStr: inputLineItem.formattedPrice,
         subTotal: inputLineItem.formattedPrice,
         subTotalStr: inputLineItem.formattedPrice,
      });
   }
   return {
      ...cart,
      totalNumItems: cart.totalNumItems + inputLineItem.quantity,
      products: updatedLineItems,
   };
}

function getApiSkuFromItemCode(itemCode: string): string {
   return itemCode.replace(/\D/g, '');
}

function isBundleInput(input: any): input is AddToCartBundleInput {
   const maybeBundle = input as AddToCartBundleInput;
   return (
      Array.isArray(maybeBundle.items) &&
      typeof maybeBundle.currentItemCode === 'string'
   );
}
