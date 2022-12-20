import { screen } from '@testing-library/react';
import {
   renderWithAppContext,
   getMockProduct,
} from '../utils';
import { ReplacementGuidesSection } from '@templates/product/sections/ReplacementGuidesSection';

describe('Product Replacement Guides Section Tests', () => {
   test('renders Replacement Guides Section for a product with a replacement guide', async () => {
      const mockedProduct = getMockProduct();
      renderWithAppContext(
         <ReplacementGuidesSection product={mockedProduct} />
      );

      const replacementGuidesSectionText = await screen.findByText(
         /Replacement Guides/i
      );
      (expect(replacementGuidesSectionText) as any).toBeVisible();

      const expectedGuideTitle = mockedProduct.replacementGuides[0].title;
      const guideTitle = await screen.findByText(
         new RegExp(expectedGuideTitle, 'i')
      );
      (expect(guideTitle) as any).toBeVisible();

      const expectedGuideUrl = mockedProduct.replacementGuides[0].guide_url;
      (
         expect(screen.getByRole('link', { name: expectedGuideTitle })) as any
      ).toHaveAttribute('href', expectedGuideUrl);
   });
});
