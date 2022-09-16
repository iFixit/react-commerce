import { Box } from '@chakra-ui/react';
import {
   PageBreadcrumb,
   SecondaryNavbar,
   TBreadcrumbItem,
   WithProvidersProps,
} from '@components/common';
import { flags } from '@config/flags';
import { invariant } from '@ifixit/helpers';
import { PageContentWrapper } from '@ifixit/ui';
import {
   DefaultLayout,
   getLayoutServerSideProps,
   WithLayoutProps,
} from '@layouts/default';
import { findProduct, Product } from '@models/product';
import { GetServerSideProps } from 'next';
import { useSelectedVariant } from './hooks/useSelectedVariant';
import { CrossSellSection } from './sections/CrossSellSection';
import { ProductSection } from './sections/ProductSection';
import { RelatedProductsSection } from './sections/RelatedProductsSection';
import { ReplacementGuidesSection } from './sections/ReplacementGuidesSection';
import { ReviewsSection } from './sections/ReviewsSection';
import { ServiceValuePropositionSection } from './sections/ServiceValuePropositionSection';

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
   const items: TBreadcrumbItem[] = [
      { label: 'Parts', url: '/Parts' },
      { label: product.title, url: `/Products/${product.handle}` },
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
            <RelatedProductsSection product={product} />
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
