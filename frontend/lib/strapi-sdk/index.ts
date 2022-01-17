import { STRAPI_ORIGIN } from '@config/env';
import { getSdk, Requester } from './generated/sdk';
export * from './generated/sdk';

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
   let result: any;
   try {
      result = await response.json();
   } catch (error) {
      throw new Error(`Response is not a json: ${response.statusText}`);
   }
   if (response.ok) {
      if (result?.data) {
         return result.data;
      }
      throw new Error('Data not available in GraphQL response');
   }
   if (Array.isArray(result.errors)) {
      console.log('GraphQL query failed with errors:');
      result.errors.map((error: any) => {
         const code = error.extensions?.code || 'UNKNOWN';
         console.log(`\t[${code}]`, error.message);
      });
   }
   throw new Error(`GraphQL query failed to execute: ${response.statusText}`);
};

export const strapi = getSdk(requester);
