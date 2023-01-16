export const setupMocks = async () => {
   // Only setup mocks for the server and not the browser

   /* We currently don't have a way to dynamically set up the handlers for MSW.
    * This wouldn't be a problem, because we can just pass through any requests
    * that aren't handled. However, we're using Playwright's `page.route` method
    * to intercept and mock Browser requests, and it seems that this method is
    * incompatible with MSW's interceptor.
    *
    * As a result, it always defaults to using MSW's interceptor. This means we
    * can't handle the current request, because the test that's using page.route
    * is intentionally returning a failed response. We don't want to set this
    * failed response as the default for all requests.
    *
    * Therefore, we only set up MSW for the server, and not the browser.
    */
   if (typeof window === 'undefined') {
      const { mswServer } = await import('./server');
      mswServer.listen({
         onUnhandledRequest: process.env.CI ? 'bypass' : 'warn',
      });
   }
};
