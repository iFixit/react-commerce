import { test as base, expect, Page, Locator } from '@playwright/test';
import { ProductFixtures, ProductPage } from './fixtures';
import { format } from 'util';

export const test = base.extend<ProductFixtures>({
   productPage: async ({ page }, use) => {
      await use(new ProductPage(page));
   },
});

expect.extend({
   async toBeWithinViewport(
      element: Locator,
      viewportSize: { width: number; height: number } | null
   ) {
      if (!viewportSize) {
         throw new Error('Viewport size was null.');
      }

      const boundingBox = await element.boundingBox();
      if (!boundingBox) {
         return {
            message: () => 'Element is not visible.',
            pass: false,
         };
      }

      const { x, y, width, height } = boundingBox;
      const { width: viewportWidth, height: viewportHeight } = viewportSize;

      if (
         x < 0 ||
         y < 0 ||
         x + width > viewportWidth ||
         y + height > viewportHeight
      ) {
         return {
            message: () =>
               format(
                  'Element is not within viewport. Element: %o, Viewport: %o',
                  boundingBox,
                  viewportSize
               ),
            pass: false,
         };
      }
      return {
         message: () =>
            format(
               'Element is within viewport. Element: %o, Viewport: %o',
               boundingBox,
               viewportSize
            ),
         pass: true,
      };
   },
});

export { expect };
