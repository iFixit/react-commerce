import bootstrapMockServer from './server';

export const setupMocks = async () => {
   // Only setup mocks for the server and not the browser

   /**
    * To Do -- Integrate the browser service worker to be able to use static
    * handlers when debugging or testing handlers in development mode.
    */
   if (typeof window === 'undefined') {
      const mswServer = bootstrapMockServer();

      mswServer.listen({
         onUnhandledRequest: process.env.CI ? 'bypass' : 'warn',
      });
   }
};
