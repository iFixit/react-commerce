import { SentryError } from '@ifixit/sentry';
import { test, expect } from '../test-fixtures';
import { createGraphQLHandler } from '../msw/request-handler';

test.describe('Product List Data', () => {
   test.skip(true, 'Only run once mocks to getProductList are fixed.');
   test('Product List with no Item Type Overrides', async ({
      partsPage,
      serverRequestInterceptor,
      getProductListMock,
   }) => {
      const productList = getProductListMock;
      const itemType = 'Screens';
      productList.productLists!.data[0].attributes!.title =
         'Microsoft Super duper Screen No Override [DEVICE] oh yeah';
      productList.productLists!.data[0].attributes!.metaTitle =
         'Microsoft Super duper Screen No Override meta';
      productList.productLists!.data[0].attributes!.description =
         'Microsoft Super duper [ITEM] Screen item description no override';
      productList.productLists!.data[0].attributes!.metaDescription =
         'meta description no override';
      productList.productLists!.data[0].attributes!.tagline =
         'A normal tagline';

      serverRequestInterceptor.use(
         createGraphQLHandler({
            request: {
               endpoint: 'getProductList',
               method: 'query',
            },
            response: {
               status: 200,
               body: productList,
            },
         })
      );

      await partsPage.goToProductPartsItemType(
         'Microsoft_Surface_Laptop_2',
         itemType
      );

      expect(
         await partsPage.page.getByTestId('hero-tagline').textContent()
      ).toBeUndefined();
      expect(
         await partsPage.page.getByTestId('hero-description').textContent()
      ).toBeUndefined();
      expect(
         await partsPage.page.getByTestId('hero-title').textContent()
      ).toEqual('Microsoft Super duper Screen Override [DEVICE] oh yeah');

      const metaDescription = partsPage.page.locator(
         'meta[name="og:description"]'
      );
      await expect(metaDescription).toHaveAttribute(
         'content',
         'meta description no override'
      );
      const metaTagsDescription = partsPage.page.locator(
         'meta[name="description"]'
      );
      await expect(metaTagsDescription).toHaveAttribute(
         'content',
         'meta description no override'
      );

      const metaTitle = partsPage.page.locator('meta[property="og:title"]');
      await expect(metaTitle).toHaveAttribute(
         'content',
         'Microsoft Super duper Screen No Override meta'
      );
   });
   test('Product List with Item Type Overrides', async ({
      partsPage,
      serverRequestInterceptor,
      getProductListMock,
   }) => {
      const productList = getProductListMock;
      const itemType = 'Screens';
      productList.productLists!.data[0].attributes!.itemOverrides = [
         {
            __typename: 'ComponentProductListItemTypeOverride',
            title: 'Microsoft Super duper Screen Override [DEVICE] oh yeah',
            metaTitle: 'Microsoft Super duper Screen Override meta',
            description:
               'Microsoft Super duper [ITEM] Screen item description override',
            metaDescription: 'meta description for override',
            itemType: itemType,
            tagline: 'override [DEVICE] tagline [ITEM]',
         },
      ];

      serverRequestInterceptor.use(
         createGraphQLHandler({
            request: {
               endpoint: 'getProductList',
               method: 'query',
            },
            response: {
               status: 200,
               body: productList,
            },
         })
      );

      await partsPage.goToProductPartsItemType(
         'Microsoft_Surface_Laptop_2',
         itemType
      );

      expect(
         await partsPage.page.getByTestId('hero-tagline').textContent()
      ).toEqual('overrice tagline');
      expect(
         await partsPage.page.getByTestId('hero-description').textContent()
      ).toEqual('Microsoft Super duper Screen item description override');
      expect(
         await partsPage.page.getByTestId('hero-title').textContent()
      ).toEqual(
         'Microsoft Super duper Screen Override Microsoft Surface Laptop 2 oh yeah Screens'
      );

      const metaDescription = partsPage.page.locator(
         'meta[name="og:description"]'
      );
      await expect(metaDescription).toHaveAttribute(
         'content',
         'meta description for overrice'
      );
      const metaTagsDescription = partsPage.page.locator(
         'meta[name="description"]'
      );
      await expect(metaTagsDescription).toHaveAttribute(
         'content',
         'meta description for overrice'
      );

      const metaTitle = partsPage.page.locator('meta[property="og:title"]');
      await expect(metaTitle).toHaveAttribute(
         'content',
         'Microsoft Super duper Screen Override meta'
      );
   });
   test('Product List with Item Type Overrides Fallback', async ({
      partsPage,
      serverRequestInterceptor,
      getProductListMock,
   }) => {
      const productList = getProductListMock;
      productList.productLists!.data[0].attributes!.itemOverrides = [
         {
            __typename: 'ComponentProductListItemTypeOverride',
            title: 'Fallback title',
            metaTitle: 'Fallback metatitle',
            description: 'This is a fallback description',
            metaDescription: 'meta description for fallback',
            tagline: 'fallback override [DEVICE] tagline [ITEM]',
         },
      ];

      serverRequestInterceptor.use(
         createGraphQLHandler({
            request: {
               endpoint: 'getProductList',
               method: 'query',
            },
            response: {
               status: 200,
               body: productList,
            },
         })
      );

      await partsPage.goToProductPartsItemType(
         'Microsoft_Surface_Laptop_2',
         'Screens'
      );

      expect(
         await partsPage.page.getByTestId('hero-tagline').textContent()
      ).toEqual('fallback override Microsoft Surface Laptop 2 tagline Screens');
      expect(
         await partsPage.page.getByTestId('hero-description').textContent()
      ).toEqual('This is a fallback description');
      expect(
         await partsPage.page.getByTestId('hero-title').textContent()
      ).toEqual('Fallback title');

      const metaDescription = partsPage.page.locator(
         'meta[name="og:description"]'
      );
      await expect(metaDescription).toHaveAttribute(
         'content',
         'meta description for fallback'
      );
      const metaTagsDescription = partsPage.page.locator(
         'meta[name="description"]'
      );
      await expect(metaTagsDescription).toHaveAttribute(
         'content',
         'meta description for fallback'
      );

      const metaTitle = partsPage.page.locator('meta[property="og:title"]');
      await expect(metaTitle).toHaveAttribute('content', 'Fallback metatitle');
   });
   test('Product List test Boosted Search Skus', async ({
      partsPage,
      serverRequestInterceptor,
      getProductListMock,
   }) => {
      const productList = getProductListMock;
      serverRequestInterceptor.use(
         createGraphQLHandler({
            request: {
               endpoint: 'getProductList',
               method: 'query',
            },
            response: {
               status: 200,
               body: productList,
            },
         })
      );

      await partsPage.goToProductParts('Microsoft_Surface_Laptop_2');

      await partsPage.page.waitForSelector(
         '[data-testid="list-view-products"]'
      );

      const lastProduct = partsPage.page
         .getByTestId('list-view-products')
         .getByRole('group')
         .last();

      expect(lastProduct).toBeTruthy();

      const lastProductTitle = await lastProduct
         .getByTestId('heading-product-title')
         .textContent();
      expect(lastProductTitle).toBeTruthy();
      if (!lastProductTitle)
         throw new SentryError('lastProductName is undefined');

      const productsToSku: { [key: string]: string } = {
         'Surface Laptop 2 13.5" Screen': 'IF413-007-1',
         'Surface Laptop 1/2 Battery': 'IF413-000-1',
      };

      const skuToProducts: { [key: string]: string } = {};

      for (const [product, sku] of Object.entries(productsToSku)) {
         skuToProducts[sku] = product;
      }

      const lastSku = productsToSku[lastProductTitle];
      productList.productLists!.data[0].attributes!.optionalFilters = `identifier:${lastSku}`;

      serverRequestInterceptor.use(
         createGraphQLHandler({
            request: {
               endpoint: 'getProductList',
               method: 'query',
            },
            response: {
               status: 200,
               body: productList,
            },
         })
      );

      await partsPage.goToProductParts('Microsoft_Surface_Laptop_2');

      const firstProductAfterBoost = partsPage.page
         .getByTestId('list-view-products')
         .getByRole('group')
         .first();

      const productBoosted = firstProductAfterBoost.first();
      const firstTitle = await productBoosted
         .getByTestId('heading-product-title')
         .textContent();
      expect(firstTitle).toEqual(skuToProducts[lastSku]);
   });
});
