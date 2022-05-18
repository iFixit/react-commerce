import { useAuthenticatedUser } from '@ifixit/auth-sdk';
import { useShopifyStorefrontClient } from '@ifixit/shopify-storefront-client';
import { useAppContext } from '@ifixit/app';
import { useQuery } from 'react-query';
import { cartKeys } from '../utils';
import { useCart } from './use-cart';
import { useIFixitApiClient } from '@ifixit/ifixit-api-client';

const LOCAL_CHECKOUT_STORAGE_KEY = 'checkout';

interface CheckoutData {
   url: string;
}

export function useCheckout() {
   const cart = useCart();
   const user = useAuthenticatedUser();
   const standardCheckout = useStandardCheckout();
   const draftOrderCheckout = useDraftOrderCheckout();
   const query = useQuery(
      cartKeys.checkoutUrl,
      async (): Promise<CheckoutData | null> => {
         if (user.data?.is_pro) {
            return draftOrderCheckout();
         } else {
            return standardCheckout();
         }
      },
      {
         enabled: cart.data != null && user.isSuccess,
      }
   );
   return query;
}

function useDraftOrderCheckout() {
   const appContext = useAppContext();
   const client = useIFixitApiClient();
   const ssoRoute = `${appContext.ifixitOrigin}/User/sso/shopify/ifixit-test?checkout=1`;
   return async (): Promise<CheckoutData | null> => {
      const result = await client.post('cart/order/draftOrder');
      const returnToUrl = new URL(result.invoiceUrl);
      const ssoUrl = new URL(ssoRoute);
      ssoUrl.searchParams.set('return_to', returnToUrl.toString());
      return {
         url: ssoUrl.href,
      };
   };
}

function useStandardCheckout() {
   const appContext = useAppContext();
   const cart = useCart();
   const user = useAuthenticatedUser();
   const ssoRoute = `${appContext.ifixitOrigin}/User/sso/shopify/ifixit-test?checkout=1`;
   const isUserLoggedIn = user.data != null;
   const createCheckout = useCreateCheckout();
   const updateCheckout = useUpdateCheckout();
   return async (): Promise<CheckoutData | null> => {
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
      let checkoutUrl: string | null = null;
      if (localCheckout != null) {
         const checkout = await updateCheckout(localCheckout.id, lineItems);
         if (checkout != null) {
            checkoutUrl = checkout.webUrl;
         }
      }
      if (checkoutUrl == null) {
         const checkout = await createCheckout(lineItems);
         checkoutUrl = checkout.webUrl;
      }
      const ssoUrl = new URL(ssoRoute);
      ssoUrl.searchParams.set('return_to', checkoutUrl);
      return {
         url: isUserLoggedIn ? ssoUrl.href : checkoutUrl,
      };
   };
}

interface LineItemInput {
   variantId: string;
   quantity: number;
}

interface CreateCheckoutPayload {
   webUrl: string;
}

function useCreateCheckout() {
   const client = useShopifyStorefrontClient();
   return async (
      lineItems: LineItemInput[]
   ): Promise<CreateCheckoutPayload> => {
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
      return checkout;
   };
}

interface UpdateCheckoutPayload {
   webUrl: string;
}

function useUpdateCheckout() {
   const client = useShopifyStorefrontClient();
   return async (
      checkoutId: string,
      lineItems: LineItemInput[]
   ): Promise<UpdateCheckoutPayload | null> => {
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
      return checkout;
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
