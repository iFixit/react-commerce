import { Box } from '@chakra-ui/react';
import { PageBreadcrumb } from '@components/common';
import { noindexDevDomains } from '@helpers/next-helpers';
import { invariant } from '@ifixit/helpers';
import { trackMatomoEcommerceView } from '@ifixit/matomo';
import { DefaultLayout, getLayoutServerSideProps } from '@layouts/default';
import { findProduct } from '@models/product';
import { GetServerSideProps } from 'next';
import * as React from 'react';
import { SecondaryNavigation } from './component/SecondaryNavigation';
import {
   ProductTemplateProps,
   useProductTemplateProps,
} from './hooks/useProductTemplateProps';
import { useSelectedVariant } from './hooks/useSelectedVariant';
import { CompatibilitySection } from './sections/CompatibilitySection';
import { CrossSellSection } from './sections/CrossSellSection';
import { FeaturedProductsSection } from './sections/FeaturedProductsSection';
import { LifetimeWarrantySection } from './sections/LifetimeWarrantySection';
import { ProductSection } from './sections/ProductSection';
import { ReplacementGuidesSection } from './sections/ReplacementGuidesSection';
import { ReviewsSection } from './sections/ReviewsSection';
import { ServiceValuePropositionSection } from './sections/ServiceValuePropositionSection';

export const ProductTemplate: NextPageWithLayout<ProductTemplateProps> = () => {
   const { product } = useProductTemplateProps();
   const [selectedVariant, setSelectedVariantId] = useSelectedVariant(product);

   React.useEffect(() => {
      trackMatomoEcommerceView({
         productSku: selectedVariant.sku ?? selectedVariant.id,
         productName:
            selectedVariant.internalDisplayName?.value ?? product.title,
         price: selectedVariant.price,
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <>
         {product.breadcrumbs != null && (
            <SecondaryNavigation>
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
            <LifetimeWarrantySection variant={selectedVariant} />
         </Box>
      </>
   );
};

ProductTemplate.getLayout = function getLayout(page, pageProps) {
   return <DefaultLayout {...pageProps.layoutProps}>{page}</DefaultLayout>;
};

export const getServerSideProps: GetServerSideProps<ProductTemplateProps> =
   async (context) => {
      noindexDevDomains(context);
      const { handle } = context.params || {};
      invariant(typeof handle === 'string', 'handle param is missing');
      const layoutProps = await getLayoutServerSideProps();
      const product = await findProduct(
         {
            shopDomain: layoutProps.currentStore.shopify.storefrontDomain,
            accessToken: layoutProps.currentStore.shopify.storefrontAccessToken,
         },
         handle
      );
      const proOnly = product?.tags.find((tag: string) => tag === "Pro Only");
      if (proOnly) {
         context.res.setHeader('X-Robots-Tag', 'noindex, nofollow');
      } else {
         // @TODO: Remove this before the page goes live
         context.res.setHeader('X-Robots-Tag', 'noindex, nofollow');
      }
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
