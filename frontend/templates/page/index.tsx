import { Box } from '@chakra-ui/react';
import { BannersSection } from '@components/sections/BannersSection';
import { FeaturedProductsSection } from '@components/sections/FeaturedProductsSection';
import { IFixitStatsSection } from '@components/sections/IFixitStatsSection';
import { LifetimeWarrantySection } from '@components/sections/LifetimeWarrantySection';
import { QuoteGallerySection } from '@components/sections/QuoteGallerySection';
import { SocialGallerySection } from '@components/sections/SocialGallerySection';
import { SplitWithImageContentSection } from '@components/sections/SplitWithImageSection';
import { assertNever } from '@ifixit/helpers';
import { DefaultLayout } from '@layouts/default';
import {
   PageTemplateProps,
   usePageTemplateProps,
} from './hooks/usePageTemplateProps';
import { MetaTags } from './meta-tags';
import { BrowseSection } from './sections/BrowseSection';
import { HeroSection } from './sections/HeroSection';
import { PressQuotesSection } from './sections/PressQuotesSection';

const PageTemplate: NextPageWithLayout<PageTemplateProps> = () => {
   const { page } = usePageTemplateProps();
   return (
      <>
         <MetaTags page={page} />
         <Box>
            {page.sections.map((section) => {
               switch (section.type) {
                  case 'Hero': {
                     return <HeroSection key={section.id} data={section} />;
                  }
                  case 'Browse': {
                     return <BrowseSection key={section.id} data={section} />;
                  }
                  case 'IFixitStats': {
                     return (
                        <IFixitStatsSection key={section.id} data={section} />
                     );
                  }
                  case 'SplitWithImage': {
                     return (
                        <SplitWithImageContentSection
                           key={section.id}
                           id={section.id}
                           title={section.title}
                           description={section.description}
                           image={section.image}
                           imagePosition={section.imagePosition}
                           callToAction={section.callToAction}
                        />
                     );
                  }
                  case 'PressQuotes': {
                     return (
                        <PressQuotesSection
                           key={section.id}
                           title={section.title}
                           description={section.description}
                           callToAction={section.callToAction}
                           quotes={section.quotes}
                        />
                     );
                  }
                  case 'FeaturedProducts': {
                     return (
                        <FeaturedProductsSection
                           key={section.id}
                           id={section.id}
                           title={section.title}
                           description={section.description}
                           background={section.background}
                           products={section.products}
                        />
                     );
                  }
                  case 'SocialGallery': {
                     return (
                        <SocialGallerySection
                           key={section.id}
                           title={section.title}
                           description={section.description}
                           posts={section.posts}
                        />
                     );
                  }
                  case 'LifetimeWarranty': {
                     return (
                        <LifetimeWarrantySection
                           key={section.id}
                           title={section.title}
                           description={section.description}
                        />
                     );
                  }
                  case 'Banners': {
                     return (
                        <BannersSection
                           key={section.id}
                           id={section.id}
                           banners={section.banners}
                        />
                     );
                  }
                  case 'QuoteGallery': {
                     return (
                        <QuoteGallerySection
                           key={section.id}
                           id={section.id}
                           title={section.title}
                           description={section.description}
                           quotes={section.quotes}
                        />
                     );
                  }
                  default:
                     return assertNever(section);
               }
            })}
         </Box>
      </>
   );
};

PageTemplate.getLayout = function getLayout(page, pageProps) {
   return <DefaultLayout {...pageProps.layoutProps}>{page}</DefaultLayout>;
};

export default PageTemplate;
