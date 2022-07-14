import { Box } from '@chakra-ui/react';
import {
   Layout,
   PageBreadcrumb,
   SecondaryNavbar,
   TBreadcrumbItem,
   WithLayoutProps,
   WithProvidersProps,
} from '@components/common';
import { PageContentWrapper } from '@ifixit/ui';
import { getGlobalSettings } from '@models/global-settings';
import type { Product } from '@models/product';
import { findProduct } from '@models/product';
import { getStoreByCode, getStoreList } from '@models/store';
import { GetServerSideProps } from 'next';
import { FAQSection } from './sections/FAQSection';
import { LegacyBannerSection } from './sections/LegacyBannerSection';
import { ProductSection, useSelectedVariant } from './sections/ProductSection';
import { ReplacementGuidesSection } from './sections/ReplacementGuidesSection';
import { ReviewsSection } from './sections/ReviewsSection';
import { StoriesSection } from './sections/StoriesSection';
import { ServiceValuePropositionSection } from './sections/ServiceValuePropositionSection';

export type ProductTemplateProps = WithProvidersProps<
   WithLayoutProps<{ product: Product }>
>;

export const ProductTemplate: NextPageWithLayout<ProductTemplateProps> = ({
   product,
}) => {
   const { selectedVariant, setSelectedVariantId } =
      useSelectedVariant(product);
   const items: TBreadcrumbItem[] = [
      { label: 'Parts', url: '/Parts' },
      { label: product.title, url: '#' },
   ];

   return (
      <>
         <SecondaryNavbar>
            <PageContentWrapper>
               <PageBreadcrumb items={items} />
            </PageContentWrapper>
         </SecondaryNavbar>
         <Box pt="10">
            <ProductSection
               product={product}
               selectedVariant={selectedVariant}
               onVariantChange={setSelectedVariantId}
            />
            <LegacyBannerSection />
            <ReplacementGuidesSection />
            <StoriesSection />
            <ServiceValuePropositionSection />
            <ReviewsSection
               product={product}
               selectedVariant={selectedVariant}
            />
            <FAQSection product={product} />
            <PageContentWrapper>
               <Box w="full" h="500px">
                  a few other sections..
               </Box>
            </PageContentWrapper>
         </Box>
      </>
   );
};

ProductTemplate.getLayout = function getLayout(page, pageProps) {
   return <Layout {...pageProps.layoutProps}>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps<ProductTemplateProps> =
   async (context) => {
      const { handle } = context.params || {};
      if (typeof handle !== 'string') {
         return {
            notFound: true,
         };
      }

      const title = `iFixit | ${handle}`;

      const [globalSettings, stores, currentStore] = await Promise.all([
         getGlobalSettings(),
         getStoreList(),
         getStoreByCode('us'),
      ]);

      const product = await findProduct(
         {
            shopDomain: currentStore.shopify.storefrontDomain,
            accessToken: currentStore.shopify.storefrontAccessToken,
         },
         handle
      );

      if (product == null) {
         return {
            notFound: true,
         };
      }

      const pageProps: ProductTemplateProps = {
         product,
         layoutProps: {
            globalSettings,
            currentStore,
            stores,
            title,
         },
         appProps: {},
      };

      return {
         props: pageProps,
      };
   };
