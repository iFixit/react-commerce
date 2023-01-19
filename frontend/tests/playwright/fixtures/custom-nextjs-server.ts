/**
 * This file is a custom Next.js server for the Playwright tests.
 *
 * It is used to set up the MSW server for the Next.js instance in the same
 * process as the Playwright tests to allow us to dynamically change the handlers.
 *
 * This format is based on a combination of the following sources:
 * - Next.js' own custom server example: https://nextjs.org/docs/advanced-features/custom-server
 * - A Dev.to article by Daniel Kuroski: https://dev.to/kuroski/writing-integration-tests-for-nextjs-next-auth-prisma-using-playwright-and-msw-388m
 */
import { createServer } from 'http';
import next from 'next';
import { parse } from 'node:url';
import bootstrapMockServer from '../msw/server';

// Load environment variables
import { loadEnvConfig } from '@next/env';
loadEnvConfig('./', process.env.NODE_ENV !== 'production');

/*
 * If we are not in development mode, then Next will look for a production build
 * in the `.next` directory when preparing the Next.js instance.
 * In which case, we will need to make sure to run `pnpm build` before
 * running the tests.
 */
const isDev = process.env.NODE_ENV !== 'production' || process.env.CI != null;
const hostname = 'localhost';

// Create Next.js instance
const app = next({ dev: isDev, hostname, quiet: true });
// The handle function will send our requests to the Next.js app
const handle = app.getRequestHandler();

async function bootstrap(): Promise<any> {
   // eslint-disable-next-line no-async-promise-executor
   return new Promise(async (resolve) => {
      try {
         // Get the Next.js instance ready
         await app.prepare();

         // Create the MSW server after the Next.js instance is ready
         const mswServer = bootstrapMockServer();
         mswServer.listen({
            onUnhandledRequest: process.env.CI ? 'bypass' : 'warn',
         });

         /*
          * Create middleware for our custom Nextjs server to send requests to
          * the Next.js app. These requests will be intercepted by the MSW
          * server we started on top of the Next.js app.
          */
         const server = createServer(async (req, res) => {
            try {
               const parsedUrl = parse(req.url!, true);
               return handle(req, res, parsedUrl);
            } catch (err) {
               console.error('Error occurred handling', req.url, err);
               res.statusCode = 500;
               res.end('internal server error');
            }
         });

         /*
          * Listen for when the server is ready and resolve the promise by
          * returning the MSW server and the port the custom Next.js
          * server is running on.
          */
         server.on('listening', async () => {
            const port = (server.address() as any).port;
            console.log(`> Ready on http://${hostname}:${port}`);

            /*
             * Although the server is ready, the Next.js app has not finished
             * building yet.
             * So we need to wait a bit before resolving the promise.
             */
            await new Promise((resolve) => setTimeout(resolve, 3000));

            resolve({
               serverRequestInterceptor: mswServer,
               port: port,
            });
         });

         // Start the server and listen on a random port
         server.listen(0, hostname);
      } catch (error) {
         console.error(error);
         process.exit(1);
      }
   });
}

export default bootstrap;
