# Playwright Testing Documentation
This document contains extra information for writing Playwright tests within the context of our application.

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
These handlers are more useful when you want to mock API requests without having to run Playwright. For example, if you are working on a component that requires a Product to be in a certain state, you can define a handler in the  [`frontend/tests/playwright/msw/handlers.ts`](./msw/handlers.ts) file to mock the API request for such a product. This way, you can develop the component without having to manually alter the state of the product in the database.

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