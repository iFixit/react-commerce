import { STRAPI_ORIGIN } from '@config/env';
import { getSdk, Requester } from './generated/sdk';
import { SentryDetails, SentryError } from '@ifixit/sentry';
export * from './generated/sdk';
export * from './generated/validation';

const requester: Requester = async <R, V>(
   doc: string,
   variables: V
): Promise<R> => {
   const body = {
      query: doc,
      variables,
   };
   const response = await fetch(`${STRAPI_ORIGIN}/graphql`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
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
      console.error('GraphQL query failed with errors:');
      result.errors.map((error: any) => {
         const code = error.extensions?.code || 'UNKNOWN';
         console.error(`\t[${code}]`, error.message);
      });
      const sentryDetails: SentryDetails = {
         contexts: {
            graphql_response: result,
            body: body,
            errors: result.errors,
         },
         tags: {
            request_url: response.url,
            request_status: response.status.toString(),
            request_status_text: response.statusText,
         },
      };
      throw new SentryError(
         'Strapi SDK GraphQL query failed with errors',
         sentryDetails
      );
   }
   throw new Error(`GraphQL query failed to execute: ${response.statusText}`);
};

export const strapi = getSdk(requester);
