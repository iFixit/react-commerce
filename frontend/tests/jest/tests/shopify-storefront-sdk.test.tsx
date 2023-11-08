import { SentryError } from '@ifixit/sentry';
import {
   getServerShopifyStorefrontSdk,
   ShopCredentials,
} from '../../../lib/shopify-storefront-sdk/index';
import { Response } from 'node-fetch';

jest.mock('node-fetch');

describe('getServerShopifyStorefrontSdk', () => {
   it('throws a SentryError when fetch result has errors', async () => {
      const mockFetch = jest.fn();
      (global as any).fetch = mockFetch;

      const mockResponse: Partial<Response> = {
         ok: false,
         statusText: 'Not Found',
         json: async () => ({
            errors: [
               {
                  message: 'Error message',
                  extensions: {
                     code: 'ERROR_CODE',
                  },
               },
            ],
         }),
      };

      mockFetch.mockResolvedValue(mockResponse);

      const shop: ShopCredentials = {
         shopDomain: 'test.myshopify.com',
         storefrontDelegateToken: 'test_token',
      };

      try {
         await getServerShopifyStorefrontSdk(shop);
      } catch (error) {
         expect(error).toBeInstanceOf(SentryError);
         expect((error as SentryError).sentryDetails).toEqual({
            contexts: {
               graphql_response: {
                  errors: [
                     {
                        message: 'Error message',
                        extensions: {
                           code: 'ERROR_CODE',
                        },
                     },
                  ],
               },
               body: {
                  query: expect.any(String),
                  variables: expect.any(Object),
               },
            },
            tags: {
               request_url: expect.any(String),
               request_status: '404',
               request_status_text: 'Not Found',
            },
         });
      }
   });
});
