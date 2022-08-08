import * as Sentry from '@sentry/nextjs';

export const sentryFetch: typeof fetch = async (resource, options) => {
   const context = {
      // Underscore sorts the resource first in Sentry's UI
      _resource: resource,
      headers: options?.headers,
      method: options?.method,
      // Parse to pretty print GraphQL queries
      body: options?.body ? JSON.parse(String(options?.body)) : undefined,
   };
   return fetch(resource, options)
      .then((response) => {
         if (response.status >= 400 && response.status !== 401) {
            const msg = `fetch() HTTP error: ${response.status} ${response.statusText}`;
            Sentry.captureException(new Error(msg), (scope) => {
               scope.setContext('request', context);
               return scope;
            });
            console.error(msg, context);
         }
         return response;
      })
      .catch((error) => {
         // We don't want to hear about network errors in Sentry
         console.error(error, context);
         throw error;
      });
};
