import { Box } from '@chakra-ui/react';
import { PageBreadcrumb } from '@components/common';
import {
   noindexDevDomains,
   serverSidePropsWrapper,
} from '@helpers/next-helpers';
import {
   trackGoogleProductView,
   trackMatomoEcommerceView,
} from '@ifixit/analytics';
import { invariant, moneyToNumber, parseItemcode } from '@ifixit/helpers';
import { useIFixitApiClient } from '@ifixit/ifixit-api-client';
import { DefaultLayout, getLayoutServerSideProps } from '@layouts/default';
import {
   fetchProductReviews,
   findProduct,
   ProductReviewData,
} from '@models/product';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { SecondaryNavigation } from './components/SecondaryNavigation';
import { useIsProductForSale } from './hooks/useIsProductForSale';
import {
   ProductTemplateProps,
   useProductTemplateProps,
} from './hooks/useProductTemplateProps';
import { useSelectedVariant } from './hooks/useSelectedVariant';
import { MetaTags } from './MetaTags';
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
   const apiClient = useIFixitApiClient();
   const [reviewsData, setReviewsData] = useState<
      ProductReviewData | null | undefined
   >();
   useEffect(() => {
      if (!product.iFixitProductId) {
         return;
      }
      fetchProductReviews(apiClient, product.iFixitProductId)
         .then((res) => {
            setReviewsData(res);
         })
         .catch(() => {
            setReviewsData(null);
         });
   }, []);

   const isProductForSale = useIsProductForSale(product);

   React.useEffect(() => {
      trackMatomoEcommerceView({
         productSku: selectedVariant.sku ?? selectedVariant.id,
         productName:
            selectedVariant.internalDisplayName?.value ?? product.title,
         price: selectedVariant.price,
      });
      trackGoogleProductView({
         id: selectedVariant.sku ?? selectedVariant.id,
         name: product.title,
         variant: selectedVariant.internalDisplayName?.value,
         category: parseItemcode(selectedVariant.sku ?? '')?.category,
         price: moneyToNumber(selectedVariant.price).toFixed(2),
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <React.Fragment key={product.handle}>
         <MetaTags product={product} selectedVariant={selectedVariant} />
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
               reviewsData={reviewsData}
            />
            <ReplacementGuidesSection product={product} />
            <ServiceValuePropositionSection />
            {isProductForSale && (
               <CrossSellSection
                  key={selectedVariant.id}
                  product={product}
                  selectedVariant={selectedVariant}
                  reviewsData={reviewsData}
               />
            )}
            {isProductForSale && (
               <ReviewsSection
                  reviewsData={reviewsData}
                  selectedVariant={selectedVariant}
               />
            )}

            <CompatibilitySection compatibility={product.compatibility} />
            <FeaturedProductsSection product={product} />
            <LifetimeWarrantySection variant={selectedVariant} />
         </Box>
      </React.Fragment>
   );
};

ProductTemplate.getLayout = function getLayout(page, pageProps) {
   return <DefaultLayout {...pageProps.layoutProps}>{page}</DefaultLayout>;
};

export const getServerSideProps: GetServerSideProps<ProductTemplateProps> =
   serverSidePropsWrapper<ProductTemplateProps>(async (context) => {
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

      if (product == null) {
         return {
            notFound: true,
         };
      }

      const proOnly = product?.tags.find((tag: string) => tag === 'Pro Only');
      if (proOnly) {
         context.res.setHeader('X-Robots-Tag', 'noindex, follow');
      }

      const pageProps: ProductTemplateProps = {
         layoutProps,
         appProps: {},
         product,
      };
      return {
         props: pageProps,
      };
   });
