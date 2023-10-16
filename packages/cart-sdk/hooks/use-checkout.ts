import { trackInPiwikAndGA } from '@ifixit/analytics';
import { useAppContext } from '@ifixit/app';
import { useAuthenticatedUser } from '@ifixit/auth-sdk';
import { assertNever, isError } from '@ifixit/helpers';
import { useIFixitApiClient } from '@ifixit/ifixit-api-client';
import { useSafeLocalStorage } from '@ifixit/local-storage';
import { useShopifyStorefrontClient } from '@ifixit/shopify-storefront-client';
import * as React from 'react';
import z from 'zod';
import { CartError } from '../utils';
import { useCart } from './use-cart';

const LOCAL_CHECKOUT_STORAGE_KEY = 'checkout';

type UseCheckout = CheckoutState & {
   redirectToCheckout: RedirectToCheckoutFn;
   reset(): void;
};

interface CheckoutState {
   error: CartError | null;
   isRedirecting: boolean;
}

interface RedirectToCheckoutFn {
   (): Promise<void>;
}

export function useCheckout(): UseCheckout {
   const cart = useCart();
   const user = useAuthenticatedUser();
   const standardCheckout = useStandardCheckout();
   const draftOrderCheckout = useDraftOrderCheckout();
   const [state, dispatch] = React.useReducer(reducer, {
      error: null,
      isRedirecting: false,
   });
   return {
      ...state,
      redirectToCheckout: async () => {
         if (cart.data == null || !cart.data.hasItemsInCart) {
            dispatch({
               type: ActionType.FailedCheckout,
               error: CartError.EmptyCart,
            });
         } else {
            dispatch({ type: ActionType.StartCheckout });
            let url: string;
            try {
               if (user.data?.is_pro) {
                  url = await draftOrderCheckout();
               } else {
                  url = await standardCheckout();
               }
               trackInPiwikAndGA({
                  eventCategory: 'Mini Cart',
                  eventAction: 'Btn "Check Out" - Click',
               });
               window.location.href = url;
            } catch (error) {
               if (isError(error)) {
                  console.error(error.message);
               }
               dispatch({
                  type: ActionType.FailedCheckout,
                  error: CartError.UnknownError,
               });
            }
         }
      },
      reset: () => {
         dispatch({ type: ActionType.ResetCheckout });
      },
   };
}

enum ActionType {
   StartCheckout,
   FailedCheckout,
   ResetCheckout,
}

type CheckoutAction =
   | StartCheckoutAction
   | FailedCheckoutAction
   | ResetCheckoutAction;

interface StartCheckoutAction {
   type: ActionType.StartCheckout;
}

interface FailedCheckoutAction {
   type: ActionType.FailedCheckout;
   error: CartError;
}

interface ResetCheckoutAction {
   type: ActionType.ResetCheckout;
}

function reducer(state: CheckoutState, action: CheckoutAction): CheckoutState {
   switch (action.type) {
      case ActionType.StartCheckout:
         return { isRedirecting: true, error: null };
      case ActionType.FailedCheckout:
         return { isRedirecting: false, error: action.error };
      case ActionType.ResetCheckout:
         return { isRedirecting: false, error: null };
      default:
         return assertNever(action);
   }
}

function useDraftOrderCheckout() {
   const appContext = useAppContext();
   const client = useIFixitApiClient();
   const shopifyClient = useShopifyStorefrontClient();
   const ssoRoute = `${appContext.ifixitOrigin}/User/sso/shopify/${shopifyClient.shopDomain}?checkout=1`;
   return async () => {
      const result = await client.post(
         'cart/order/draftOrder',
         'create-draft-order'
      );
      const draftOrder = DraftOrderResponseSchema.parse(result);
      const returnToUrl = new URL(draftOrder.invoiceUrl);
      const ssoUrl = new URL(ssoRoute);
      ssoUrl.searchParams.set('return_to', returnToUrl.toString());
      return ssoUrl.href;
   };
}

const DraftOrderResponseSchema = z.object({
   invoiceUrl: z.string(),
});

function useStandardCheckout() {
   const appContext = useAppContext();
   const cart = useCart();
   const user = useAuthenticatedUser();
   const shopifyClient = useShopifyStorefrontClient();
   const ssoRoute = `${appContext.ifixitOrigin}/User/sso/shopify/${shopifyClient.shopDomain}?checkout=1`;
   const isUserLoggedIn = user.data != null;
   const createCheckout = useCreateCheckout();
   const updateCheckout = useUpdateCheckout();
   return async () => {
      const lineItems = cart.data?.lineItems.map((product) => {
         return {
            variantId: product.shopifyVariantId,
            quantity: product.quantity,
         };
      });
      if (lineItems == null || lineItems.length === 0) {
         throw new Error(CartError.EmptyCart);
      }
      const localCheckout = getLocalCheckout();
      let checkoutUrl: string | null = null;
      if (localCheckout != null) {
         try {
            const checkout = await updateCheckout(localCheckout.id, lineItems);
            if (checkout != null) {
               checkoutUrl = checkout.webUrl;
            }
         } catch (error) {}
      }
      if (checkoutUrl == null) {
         const checkout = await createCheckout(lineItems);
         checkoutUrl = checkout.webUrl;
      }
      const ssoUrl = new URL(ssoRoute);
      ssoUrl.searchParams.set('return_to', checkoutUrl);
      return isUserLoggedIn ? ssoUrl.href : checkoutUrl;
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
      if (!response?.checkoutCreate) {
         throw new Error('checkout unavailable');
      }
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
      if (!response?.checkoutLineItemsReplace) {
         return null;
      }
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
   const safeLocalStorage = useSafeLocalStorage();
   const session = safeLocalStorage.getItem(LOCAL_CHECKOUT_STORAGE_KEY);
   if (session == null) {
      return null;
   }
   return JSON.parse(session);
}

function setLocalCheckout(checkout: LocalCheckout) {
   const safeLocalStorage = useSafeLocalStorage();
   safeLocalStorage.setItem(
      LOCAL_CHECKOUT_STORAGE_KEY,
      JSON.stringify(checkout)
   );
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
