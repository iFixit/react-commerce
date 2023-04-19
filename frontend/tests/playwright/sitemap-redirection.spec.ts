import { test, expect } from './test-fixtures';

test.describe('Sitemap Redirection', () => {
   test('Verify Redirection for Each Sitemap Page', async ({ page }) => {
      // Use the APIRequestContext object to make requests without
      // redirecting.
      const request = page.request;

      let response = await request.get('/Parts/sitemap.xml', {
         maxRedirects: 0,
      });
      expect(response.status()).toBe(308);
      expect(response.headers().location).toMatch(/\/sitemap\/parts\.xml$/);

      response = await request.get('/Tools/sitemap.xml', { maxRedirects: 0 });
      expect(response.status()).toBe(308);
      expect(response.headers().location).toMatch(/\/sitemap\/tools\.xml$/);

      response = await request.get('/Shop/sitemap.xml', { maxRedirects: 0 });
      expect(response.status()).toBe(308);
      expect(response.headers().location).toMatch(/\/sitemap\/marketing\.xml$/);

      response = await request.get('/products/sitemap.xml', {
         maxRedirects: 0,
      });
      expect(response.status()).toBe(308);
      expect(response.headers().location).toMatch(/\/sitemap\/products\.xml$/);
   });
});

export {};
