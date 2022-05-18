import { useAuthenticatedUser } from '@ifixit/auth-sdk';
import { useShopifyStorefrontClient } from '@ifixit/shopify-storefront-client';
import { useAppContext } from '@ifixit/app';
import { useQuery } from 'react-query';
import { cartKeys } from '../utils';
import { useCart } from './use-cart';

const LOCAL_CHECKOUT_STORAGE_KEY = 'checkout';

interface UseCheckoutData {
   url: string;
}

export function useCheckout() {
   const appContext = useAppContext();
   const cart = useCart();
   const user = useAuthenticatedUser();
   const ssoRoute = `${appContext.ifixitOrigin}/User/sso/shopify/ifixit-test?checkout=1`;
   const createCheckout = useCreateCheckout({
      isUserLoggedIn: user.data != null,
      ssoRoute: ssoRoute,
   });
   const updateCheckout = useUpdateCheckout({
      isUserLoggedIn: user.data != null,
      ssoRoute: ssoRoute,
   });
   const query = useQuery(
      cartKeys.checkoutUrl,
      async (): Promise<UseCheckoutData | null> => {
         const lineItems = cart.data?.miniCart.products.map((product) => {
            return {
               variantId: product.variantId,
               quantity: product.quantity,
            };
         });
         if (lineItems == null || lineItems.length === 0) {
            return null;
         }
         const localCheckout = getLocalCheckout();
         if (localCheckout != null) {
            const checkout = await updateCheckout(localCheckout.id, lineItems);
            if (checkout != null) {
               return checkout;
            }
         }
         const checkout = await createCheckout(lineItems);
         return checkout;
      },
      {
         enabled: cart.data != null && user.isSuccess,
      }
   );
   return query;
}

interface LineItemInput {
   variantId: string;
   quantity: number;
}

interface UseCheckoutOptions {
   isUserLoggedIn: boolean;
   ssoRoute: string;
}

function useCreateCheckout({ isUserLoggedIn, ssoRoute }: UseCheckoutOptions) {
   const client = useShopifyStorefrontClient();
   return async (lineItems: LineItemInput[]): Promise<UseCheckoutData> => {
      const response = await client.request(checkoutCreateMutation, {
         input: {
            lineItems,
         },
      });
      const { checkout, checkoutUserErrors } = response.checkoutCreate;
      if (checkoutUserErrors.length > 0) {
         console.error(checkoutUserErrors);
         throw new Error('checkout unavailable');
      }
      setLocalCheckout({
         id: checkout.id,
      });
      const ssoUrl = new URL(ssoRoute);
      ssoUrl.searchParams.set('return_to', checkout.webUrl);
      return {
         url: isUserLoggedIn ? ssoUrl.href : checkout.webUrl,
      };
   };
}

function useUpdateCheckout({ isUserLoggedIn, ssoRoute }: UseCheckoutOptions) {
   const client = useShopifyStorefrontClient();
   return async (
      checkoutId: string,
      lineItems: LineItemInput[]
   ): Promise<UseCheckoutData | null> => {
      const response = await client.request(checkoutLineItemReplaceMutation, {
         checkoutId,
         lineItems,
      });

      const { checkout, userErrors } = response.checkoutLineItemsReplace;
      if (userErrors.length > 0) {
         if (
            userErrors.some(
               (userError: any) =>
                  userError.code === 'ALREADY_COMPLETED' ||
                  userError.code === 'INVALID'
            )
         ) {
            return null;
         }
         console.error(userErrors);
         throw new Error('checkout unavailable');
      }
      const ssoUrl = new URL(ssoRoute);
      ssoUrl.searchParams.set('return_to', checkout.webUrl);
      return {
         url: isUserLoggedIn ? ssoUrl.href : checkout.webUrl,
      };
   };
}

interface LocalCheckout {
   id: string;
}

function getLocalCheckout(): LocalCheckout | null {
   const session = localStorage.getItem(LOCAL_CHECKOUT_STORAGE_KEY);
   if (session == null) {
      return null;
   }
   return JSON.parse(session);
}

function setLocalCheckout(checkout: LocalCheckout) {
   localStorage.setItem(LOCAL_CHECKOUT_STORAGE_KEY, JSON.stringify(checkout));
}

const checkoutCreateMutation = /* GraphQL */ `
   mutation ($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
         checkout {
            id
            webUrl
         }
         checkoutUserErrors {
            field
            message
            code
         }
      }
   }
`;

const checkoutLineItemReplaceMutation = /* GraphQL */ `
   mutation ($checkoutId: ID!, $lineItems: [CheckoutLineItemInput!]!) {
      checkoutLineItemsReplace(checkoutId: $checkoutId, lineItems: $lineItems) {
         checkout {
            id
            webUrl
         }
         userErrors {
            field
            message
            code
         }
      }
   }
`;
