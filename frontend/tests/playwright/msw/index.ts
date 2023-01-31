import bootstrapMockServer from './server';
import bootstrapMockWorker from './browser';

export const setupMocks = async () => {
   if (typeof window === 'undefined') {
      const mswServer = bootstrapMockServer();

      mswServer.listen({
         onUnhandledRequest: process.env.CI ? 'bypass' : 'warn',
      });
   } else {
      const mswWorker = bootstrapMockWorker();

      await mswWorker.start({
         onUnhandledRequest: process.env.CI ? 'bypass' : 'warn',
      });
   }
};
