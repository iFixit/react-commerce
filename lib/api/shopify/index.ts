import { getSdk } from './generated/sdk';

export interface GetShopifySdkArgs {
   domain: string;
   accessToken: string;
   version?: string;
   language?: string;
}
export const getShopifySdk = ({
   domain,
   accessToken,
   version = '2021-07',
   language = 'en',
}: GetShopifySdkArgs) =>
   getSdk(
      async <R, V>(query: string, variables: V): Promise<R> => {
         const response = await fetch(
            `https://${domain}/api/${version}/graphql.json`,
            {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
                  'x-shopify-storefront-access-token': accessToken,
                  'Accept-Language': language,
               },
               body: JSON.stringify({
                  query,
                  variables,
               }),
            }
         );
         if (response.ok) {
            const result = await response.json();
            if (result?.data) {
               return result.data;
            }
            throw new Error('Data not available in GraphQL response');
         }
         throw new Error('GraphQL query failed to execute');
      }
   );
