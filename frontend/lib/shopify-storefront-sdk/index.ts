import { SHOPIFY_STOREFRONT_VERSION } from '@config/env';
import { z } from 'zod';
import { getSdk, Requester } from './generated/sdk';
import { SentryError, SentryDetails } from '@ifixit/sentry';
export * from './generated/sdk';

export type ShopCredentials = {
   shopDomain: string;
   storefrontDelegateToken: string;
};

export function getServerShopifyStorefrontSdk(shop: ShopCredentials) {
   const requester: Requester = async <R, V>(
      doc: string,
      variables: V
   ): Promise<R> => {
      const response = await fetch(
         `https://${shop.shopDomain}/api/${SHOPIFY_STOREFRONT_VERSION}/graphql.json`,
         {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'Shopify-Storefront-Private-Token': shop.storefrontDelegateToken,
            },
            body: JSON.stringify({
               query: doc,
               variables,
            }),
         }
      );
      const result = await getResult(response);
      if (result.errors && result.errors.length > 0) {
         let errorMessage = 'GraphQL query failed with errors: ';
         const errorMessages = result.errors.map((error) => {
            const code = error.extensions?.code ?? 'UNKNOWN';
            return `[code: ${code}]: ${error.message}`;
         });
         if (errorMessages.length > 1) {
            errorMessage += errorMessages.join('\n\t - ');
         } else {
            errorMessage += errorMessages[0];
         }
         console.log(errorMessage);
         const sentryDetails: SentryDetails = {
            extra: [
               ['query', doc],
               ['variables', variables],
               ['errors', result.errors],
            ],
         };
         throw new SentryError(errorMessage, sentryDetails);
      }
      return result.data;
   };

   return getSdk(requester);
}

const GraphQLResultSchema = z.object({
   data: z.any(),
   errors: z
      .array(
         z.object({
            message: z.string().optional().nullable(),
            path: z.array(z.string()).optional().nullable(),
            extensions: z
               .object({
                  code: z.string().optional().nullable(),
               })
               .optional()
               .nullable(),
         })
      )
      .optional()
      .nullable(),
});

async function getResult(response: Response) {
   if (!response.ok) {
      throw new Error(
         `GraphQL query failed to execute: ${response.statusText}`
      );
   }
   let result: any;
   try {
      result = await response.json();
      const parsedResult = GraphQLResultSchema.parse(result);
      return parsedResult;
   } catch (error) {
      if (error instanceof z.ZodError) {
         throw error;
      }
      throw new Error(`Response is not a json: ${response.statusText}`);
   }
}
