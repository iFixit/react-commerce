import * as Sentry from '@sentry/nextjs';

export const sentryFetch: typeof fetch = async (resource, options) => {
   const context = {
      resource,
      credentials: options?.credentials,
      headers: options?.headers,
      method: options?.method,
      parameters: options?.body,
   };
   Sentry.configureScope((scope) => scope.setContext('request', context));
   return fetch(resource, options).catch((error) => {
      console.error(error, context);
      throw error;
   });
};
