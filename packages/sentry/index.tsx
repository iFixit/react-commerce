import * as Sentry from '@sentry/nextjs';

export const sentryFetch: typeof fetch = async (input, init) => {
   const context = {
      input,
      credentials: init?.credentials,
      headers: init?.headers,
      method: init?.method,
      parameters: init?.body,
   };
   Sentry.configureScope((scope) => scope.setContext('request', context));
   return fetch(input, init).catch((error) => {
      console.error(error);
      console.error(context);
      throw error;
   });
};
