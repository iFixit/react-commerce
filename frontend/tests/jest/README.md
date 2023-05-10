# Jest Testing Documentation

This document contains extra information for writing `Jest` tests within the context of our application.

-  [Updating Jest Snapshots](#updating-jest-snapshots)
-  [Working with Mock Data](#working-with-mock-data)
   -  [`products` Mock Data](#products-mock-data)
      -  [Updating Mock Data with `TypeScript`](#updating-mock-data-with-typescript)
      -  [Updating Mock Data with `console`](#updating-mock-data-with-console)
   -  [Adding New Mock Data](#adding-new-mock-data)

## Updating Jest Snapshots

To update a Jest snapshot, follow these steps:

1. Ensure the changes are intentional.
2. Run the command below, where `[test-name]` is an optional parameter to update a specific test's snapshot. If no test name is provided, all snapshots will be updated.

```sh
pnpm test -- [test-name] --updateSnapshot
```

## Working with Mock Data

Unlike `Playwright`, we don't use `MSW` for mocking. We use static mock data passed to our components. The mock data is located in the `__mocks__` directory, containing both `ts` and `tsx` files.

⚠ **Important**: Match the file extension with the type of data being mocked to avoid confusion. See https://github.com/iFixit/react-commerce/issues/1400 for context.

### `products` Mock Data

The `products` subdirectory stores the mock data for the [`Product` model](../../models/product/index.ts#L55). Each file contains a snapshot of a specific product type, such as `battery`, `tool`, or `part`. All these products are of the `Product` model type.

Using `TypeScript`, the `Product` type helps ensure the mock data's validity. If the mock data is invalid, tests will fail, requiring an update to the mock data.

#### Updating Mock Data with `TypeScript`

For minor changes, like adding a new scalar field, update the mock data by adding the missing field with a default value. Tests should pass after this change.

For significant changes, like adding a new field referencing a custom type, a re-snapshot of the mock data may be needed. See the next section for more details.

#### Updating Mock Data with `console`

To easily update the mock data:

1. Start the dev server.
2. Navigate to a product page for the desired product type.
3. Open the console.
4. Run the command:
   ```js
   copy(window.__NEXT_DATA__.props.pageProps.product);
   ```
5. Paste the copied product data into the mock data file and update the snapshot accordingly.

### Adding New Mock Data

When adding new mock data, ensure:

1. The file extension is correct.
2. The mock data is assigned a type matching the type of data being mocked. For example, if mocking a `Product`, the mock data should be of type `Product`.
3. Snapshot the mock data.

   To mock data from the `pageProps` object, follow the instructions in [ Updating Mock Data with `console`](#updating-mock-data-with-console). Otherwise, manually add a `console.log` statement to obtain the data you want to mock.

4. Add the mock data to the `__mocks__` directory.
