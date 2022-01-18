import { STRAPI_ORIGIN } from '@config/env';
import { getSdk, Requester } from './generated/sdk';

const requester: Requester = async <R, V>(
   doc: string,
   variables: V
): Promise<R> => {
   const response = await fetch(`${STRAPI_ORIGIN}/graphql`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         query: doc,
         variables,
      }),
   });
   if (response.ok) {
      const result = await response.json();
      if (result?.data) {
         return result.data;
      }
      throw new Error('Data not available in GraphQL response');
   }
   throw new Error(`GraphQL query failed to execute: ${response.statusText}`);
};

export const strapi = getSdk(requester);
