# Playwright Testing Documentation

This document contains extra information for writing Playwright tests within the context of our application.

-  [Mocking API Requests](#mocking-api-requests)
   -  [Mock Handlers](#mock-handlers)
   -  [Static Handlers](#static-handlers)
      -  [Practical Usage: Developing Components](#practical-usage-developing-components)
      -  [Practical Usage: Global Test Mock](#practical-usage-global-test-mock)
   -  [Dynamic Handlers](#dynamic-handlers)
   -  [Working with Mock Data](#working-with-mock-data)
-  [Debugging Playwright Tests](#debugging-playwright-tests)
   -  [`pnpm playwright:debug`](#pnpm-playwrightdebug)
      -  [`--debug` flag](#--debug-flag)
      -  [`--project="Desktop Chrome"` flag](#--projectdesktop-chrome-flag)
      -  [`DEBUG=pw:api` flag](#debugpwapi-flag)
   -  [Playwright Trace Viewer](#playwright-trace-viewer)
      -  [Recording a Trace Log](#recording-a-trace-log)
      -  [Viewing Trace Logs](#viewing-trace-logs)

## Mocking API Requests

Currently, we only mock API Requests for Playwright tests.

We use [MSW](https://mswjs.io/) to mock API requests. We have the ability to mock either Client-Side or Server-Side API requests using an MSW handler. You can find the default handlers in [`frontend/tests/playwright/msw/handlers.ts`](./msw/handlers.ts)

### Mock Handlers

MSW uses something called a ["request handler"](https://mswjs.io/docs/basics/request-handler) to define how matching requests should be mocked according to the API type _(i.e. `graphql` or `rest`)_. We have built a wrapper around these handlers to make it easier to create such handlers. The wrapper logic can be in [`frontend/tests/playwright/msw/request-handler.ts`](./msw/request-handler.ts)

<table>
   <tr>
      <th>MSW Handler Interface</th>
      <th>Wrapper Handler Interface</th>
   </tr>
   <tr>
   <td>

```ts
rest.get(
   '*/api/2.0/internal/international_store_promotion/buybox',
   (req, res, ctx) => {
      return res(ctx.status(200));
   }
),
```

   </td>
   <td>

```ts
   createRestHandler({
      request: {
         endpoint: '*/api/2.0/internal/international_store_promotion/buybox',
         method: 'get',
      },
      response: {
         status: 200,
      },
   }),
```

   </td>
   </tr>

</table>

We can use these handlers to statically mock API requests or dynamically mock API requests.

### Static Handlers

Static handlers are defined in [`frontend/tests/playwright/msw/handlers.ts`](./msw/handlers.ts). These handlers can be considered the default handlers that will be used by both the MSW client-side service worker (_a.k.a. browser side_) and server-side service worker.

#### Practical Usage: Developing Components

These handlers are more useful when you want to mock API requests without having to run Playwright. For example, if you are working on a component that requires a Product to be in a certain state, you can define a handler in the [`frontend/tests/playwright/msw/handlers.ts`](./msw/handlers.ts) file to mock the API request for such a product. This way, you can develop the component without having to manually alter the state of the product in the database.

To do this, you will need to do the following:

1. Append a new handler to the array in the [`frontend/tests/playwright/msw/handlers.ts`](./msw/handlers.ts) file
2. Run the application with the `NEXT_PUBLIC_MOCK_API` environment variable set to `true`
   ```sh
   NEXT_PUBLIC_MOCK_API=true pnpm dev
   ```
3. Use and develop the application as you normally would. The API requests will be mocked according to the handlers you defined in the [`frontend/tests/playwright/msw/handlers.ts`](./msw/handlers.ts) file.

#### Practical Usage: Global Test Mock

If you want to mock an API request for all tests, you can define a handler in the [`frontend/tests/playwright/msw/handlers.ts`](./msw/handlers.ts) file. This way, you can mock an API request without having to define it in every test.

### Dynamic Handlers

Dynamic handlers are meant to be used in tests. These handlers are defined within the tests themsevles as opposed to the handlers defined in [`frontend/tests/playwright/msw/handlers.ts`](./msw/handlers.ts). These handlers are useful when you want to mock API requests for a specific test.

To enable these handlers, you will need to import the respective MSW worker as part of the Playwright fixtures we have defined in [`frontend/tests/playwright/test-fixtures.ts`](test-fixtures.ts).

For example, if you want to mock an API request for a **server-side request**, you will need to import the `serverRequestInterceptor` fixture. This fixture will provide a reference to the MSW **server-side** worker. You can define a handler(s) for this worker to use.

```ts
  test('Low stocked product changes quantity', async ({
         productPage,
         cartDrawer,
         serverRequestInterceptor,
      }) => {
         const lowStockedProduct = cloneDeep(mockedProductQuery);
         if (lowStockedProduct.product) {
            lowStockedProduct.product.variants.nodes[0].quantityAvailable = 3;
         }

         serverRequestInterceptor.use(
            createGraphQLHandler({
               request: {
                  endpoint: 'findProduct',
                  method: 'query',
               },
               response: {
                  status: 200,
                  body: lowStockedProduct,
               },
            })
         );
```

Likewise, if you want to mock an API request for a **client-side request**, you will need to import the `clientRequestHandler` fixture. This fixture will provide a reference to the MSW **client-side** worker.

```ts
 test('Out of stock product cannot be added to cart', async ({
         productPage,
         cartDrawer,
         serverRequestInterceptor,
         clientRequestHandler,
      }) => {
         clientRequestHandler.use(
            createRestHandler({
               request: {
                  endpoint: '/api/2.0/cart/product/notifyWhenSkuInStock',
                  method: 'post',
               },
               response: {
                  status: 200,
               },
            })
         );
```

### Working with Mock Data

We are currently only mocking the `findProduct` GraphQL query from `shopify` -- [mocked queries](./fixtures/shopify-mocked-queries.ts).

If we ever change the fields we request or the schema changes, we will need to do the following to update the mock data:

1. Copy the `graphql` query from [`findProduct` query](../../lib/shopify-storefront-sdk/operations/findProduct.graphql)
2. Grab a `shopify` storefront access token
3. Send a curl request to `https://store.cominor.com/api/<latest>/graphql.json` where `latest` is the most recently generate graphql schema date. For example `2022-10`

```bash
curl --location 'https://store.cominor.com/api/2022-10/graphql.json' \
--header 'X-Shopify-Storefront-Access-Token: <access-token>' \
--header 'Content-Type: application/json' \
--data '{"query":"<graphql-query>", "variables":{"handle": "<product-handle>"}}'
```

4. Copy the response body and paste it into [`shopify-mocked-queries.ts`](./fixtures/shopify-mocked-queries.ts)

_💡 It can be easier to use `Postman` to send the request and copy the response body._

## Debugging Playwright Tests

The Playwright docs are very extensive and contain a lot of information on how to [debug tests](https://playwright.dev/docs/debug), however it can be difficult to find the information you need. This section contains some useful information that we have found useful when debugging Playwright tests.

### `pnpm playwright:debug`

As mentioned in the [`README`](../../../README.md#running-playwright-tests), you can run the Playwright tests in a custom debug mode by running the following command, where `test_name` is an optional argument if you want to debug a specific test.

```sh
pnpm playwright:debug [test_name]
```

<br/>

Overall, this `pnpm` script will execute the following command:

```sh
DEBUG=pw:api playwright test --project="Desktop Chrome" --debug
```

#### `--debug` flag

The `--debug` flag will run Playwright in [debug mode](https://playwright.dev/docs/debug#pwdebug) which is the same as setting the `PWDEBUG` environment variable to `console`. In this mode, Playwright will do the following:

-  Runs a headed browser
-  disables parallelization
-  Sets the `timeout` to `0` _(i.e. no timeout)_
-  Adds a `playwright` object to the browser to allow you to interact with the Playwright Locator api via the console
   -  What this means is that you can use the `playwright` object to interact with the DOM and debug your tests in the browser console. For example, you can use the `playwright` object to help you find the correct selector for a specific element. For more information on how to use the `playwright` object, see the [playwright debug object docs](https://playwright.dev/docs/debug-selectors#using-devtools).
      ![image](https://user-images.githubusercontent.com/22064420/225163397-ea4409ca-0cf4-4a1c-96ae-c3307c0d1e0f.png)

#### `--project="Desktop Chrome"` flag

The `--project="Desktop Chrome"` flag will run the tests using a Chromium instance and the presets for a Desktop browser. This is to narrow down the scope of the tests to be ran. It is possible to
change this to run the tests in a different browser or device preset by using one of the project names defined within the `projects` array in the [`playwright.config.ts`](../../playwright.config.ts) file.

#### `DEBUG=pw:api` flag

Lastly, the [`DEBUG=pw:api`](https://playwright.dev/docs/debug-selectors#verbose-api-logs) flag will enable verbose logging of Playwright's API. This will log all the Playwright API calls to the console. This is useful when you want to see what Playwright is doing under the hood. Ideally it would be used to ensure that certain events are being triggered or gain more insight into the order of events.

-  For example, if you want to use `page.waitForLoadState('networkidle')` to wait for a page to no longer have any network requests, but you are not sure if the page is actually waiting for the network to be idle, you can enable this flag to see if the `networkidle` event is being triggered.
   ![image](https://user-images.githubusercontent.com/22064420/225164688-0f2a8df7-12f1-4cdc-9e4b-a3e2d2a341bc.png)

### Playwright Trace Viewer

Playwright has a built-in [trace viewer](https://playwright.dev/docs/trace-viewer) that can be used to debug tests that have already ran. This is useful when you want to see what happened during a test run while having access to the following runtime information:

-  Browser Console
-  Network Requests
-  The DOM
-  Associated Playwright actions and source code
-  Metadata
-  Screenshots

This is a lot more useful than just looking at the failure log and trying to reproduce the failure. In order to use the trace viewer, you will need to record a trace log of a test run to obtain a `trace.zip` file.

#### Recording a Trace Log

We have already enabled trace viewer in CI, and have uploaded the `trace.zip` files as an artifact. More information on this can be found in [Viewing Trace Logs](#viewing-trace-logs).

To enable trace viewer locally, you will need to add the `--trace on` flag to the Playwright commands. This will create a `trace.zip` file in the `frontend/tests/playwright/test-results` directory.

Note, this won't really be that useful if you are running debug mode.

```bash
pnpm playwright:run --trace on

pnpm playwright:debug --trace on # Not really useful for debug mode
```

#### Viewing Trace Logs

In order to view a trace log, you will need a `trace.zip` file. If you
have already enabled trace viewer locally, you can find the `trace.zip` file in the `frontend/tests/playwright/test-results` directory after a test run.

If you are trying to view a trace log from CI, you can download the `playwright-artifacts.zip` file from the `Summary` tab of the `E2E` workflow run. Then you can unzip the `artifacts.zip` file which will contain a `trace.zip` file for each `device-test` failure.

<details>
<summary>Location of the <code>playwright-artifacts.zip</code> file</summary>

![image](https://user-images.githubusercontent.com/22064420/225168783-470c1337-4894-4371-a205-251e31a33846.png)

</details>

**View the Trace Log Locally**

To view the trace logs locally, you can run the following command:

```bash
npx playwright show-trace <path-to-trace.zip>
```

**View the Trace Log in the Browser**
Otherwise, you can upload the `trace.zip` file to [Playwright Trace Viewer](https://trace.playwright.dev/).

![image](https://user-images.githubusercontent.com/22064420/225170856-ac20e320-83cf-4cbd-967f-b858a1bf773a.png)
