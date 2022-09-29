import { Box } from '@chakra-ui/react';
import { PageBreadcrumb, WithProvidersProps } from '@components/common';
import { flags } from '@config/flags';
import { invariant } from '@ifixit/helpers';
import {
   DefaultLayout,
   getLayoutServerSideProps,
   WithLayoutProps,
} from '@layouts/default';
import { findProduct, Product } from '@models/product';
import { GetServerSideProps } from 'next';
import { SecondaryNavigation } from './component/SecondaryNavigation';
import { useSelectedVariant } from './hooks/useSelectedVariant';
import { CrossSellSection } from './sections/CrossSellSection';
import { ProductSection } from './sections/ProductSection';
import { FeaturedProductsSection } from './sections/FeaturedProductsSection';
import { ReplacementGuidesSection } from './sections/ReplacementGuidesSection';
import { ReviewsSection } from './sections/ReviewsSection';
import { ServiceValuePropositionSection } from './sections/ServiceValuePropositionSection';
import { CompatibilitySection } from './sections/CompatibilitySection';

export type ProductTemplateProps = WithProvidersProps<
   WithLayoutProps<{
      product: Product;
   }>
>;

export const ProductTemplate: NextPageWithLayout<ProductTemplateProps> = ({
   product,
}) => {
   const { selectedVariant, setSelectedVariantId } =
      useSelectedVariant(product);

   return (
      <>
         {product.breadcrumbs != null && (
            <SecondaryNavigation zIndex="10">
               <PageBreadcrumb items={product.breadcrumbs} />
            </SecondaryNavigation>
         )}
         <Box pt="6">
            <ProductSection
               product={product}
               selectedVariant={selectedVariant}
               onVariantChange={setSelectedVariantId}
            />
            <ReplacementGuidesSection product={product} />
            <ServiceValuePropositionSection />
            <CrossSellSection
               product={product}
               selectedVariant={selectedVariant}
            />
            <ReviewsSection
               product={product}
               selectedVariant={selectedVariant}
            />
            <CompatibilitySection compatibility={product.compatibility} />
            <FeaturedProductsSection product={product} />
         </Box>
      </>
   );
};

ProductTemplate.getLayout = function getLayout(page, pageProps) {
   return <DefaultLayout {...pageProps.layoutProps}>{page}</DefaultLayout>;
};

export const getServerSideProps: GetServerSideProps<ProductTemplateProps> =
   async (context) => {
      const { handle } = context.params || {};
      invariant(typeof handle === 'string', 'handle param is missing');
      if (!flags.PRODUCT_PAGE_ENABLED) {
         return {
            notFound: true,
         };
      }
      const layoutProps = await getLayoutServerSideProps();
      const product = await findProduct(
         {
            shopDomain: layoutProps.currentStore.shopify.storefrontDomain,
            accessToken: layoutProps.currentStore.shopify.storefrontAccessToken,
         },
         handle
      );
      if (product == null) {
         return {
            notFound: true,
         };
      }
      const pageProps: ProductTemplateProps = {
         layoutProps,
         appProps: {},
         product,
      };
      return {
         props: pageProps,
      };
   };
