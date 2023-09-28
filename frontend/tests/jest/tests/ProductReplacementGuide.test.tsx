import type { ReplacementGuidePreview } from '@models/components/replacement-guide-preview';
import { ReplacementGuidesSection } from '@components/sections/ReplacementGuidesSection';
import { screen } from '@testing-library/react';
import { renderWithAppContext } from '../utils';

const replacementGuide: ReplacementGuidePreview = {
   id: '0',
   title: 'iPhone 6s Plus Battery Replacement',
   url: '/Guide/iPhone+6s+Plus+Battery+Replacement/51380',
   imageUrl: 'https://mmcelvain.cominor.com/igi/LVQpdSdCEY1YxPkM.thumbnail',
   summary: 'Use this guide to bring life back to your...',
   difficulty: 'Moderate',
   timeRequired: '15 - 45 minutes',
};

describe('Product Replacement Guides Section Tests', () => {
   test('renders Replacement Guides Section for a product with a replacement guide', async () => {
      renderWithAppContext(
         <ReplacementGuidesSection id="1" guides={[replacementGuide]} />
      );

      const replacementGuidesSectionText = await screen.findByText(
         /Replacement Guides/i
      );
      expect(replacementGuidesSectionText).toBeVisible();

      const guideTitle = await screen.findByText(
         new RegExp(replacementGuide.title, 'i')
      );
      expect(guideTitle).toBeVisible();

      expect(
         screen.getByRole('link', { name: replacementGuide.title })
      ).toHaveAttribute('href', replacementGuide.url);
   });

   test('does not render Replacement Guides Section for a product with no replacement guides', async () => {
      const { container } = renderWithAppContext(
         <ReplacementGuidesSection id="1" guides={[]} />
      );

      const replacementGuidesHeading =
         screen.queryByText(/Replacement Guides/i);
      expect(replacementGuidesHeading).not.toBeInTheDocument();

      expect(container.firstChild).toBeEmptyDOMElement();
   });
});
