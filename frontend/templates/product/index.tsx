import { Box } from '@chakra-ui/react';
import { PageBreadcrumb } from '@components/common';
import { DEFAULT_STORE_CODE } from '@config/env';
import {
   noindexDevDomains,
   serverSidePropsWrapper,
} from '@helpers/next-helpers';
import { ifixitOriginFromHost } from '@helpers/path-helpers';
import {
   trackGoogleProductView,
   trackMatomoEcommerceView,
} from '@ifixit/analytics';
import { invariant, moneyToNumber, parseItemcode } from '@ifixit/helpers';
import { DefaultLayout, getLayoutServerSideProps } from '@layouts/default';
import { findProduct } from '@models/product';
import { useInternationalBuyBox } from '@templates/product/hooks/useInternationalBuyBox';
import { GetServerSideProps } from 'next';
import * as React from 'react';
import { PixelPing } from './components/PixelPing';
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

   const internationalBuyBox = useInternationalBuyBox(product);

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
               internationalBuyBox={internationalBuyBox}
            />
            <ReplacementGuidesSection product={product} />
            <ServiceValuePropositionSection selectedVariant={selectedVariant} />
            {isProductForSale && !internationalBuyBox && (
               <CrossSellSection
                  key={selectedVariant.id}
                  product={product}
                  selectedVariant={selectedVariant}
               />
            )}
            {isProductForSale && (
               <ReviewsSection
                  product={product}
                  selectedVariant={selectedVariant}
               />
            )}

            <CompatibilitySection compatibility={product.compatibility} />
            <FeaturedProductsSection product={product} />
            <LifetimeWarrantySection variant={selectedVariant} />
         </Box>
         {product.productcode && <PixelPing productcode={product.productcode} />}
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
      const layoutProps = await getLayoutServerSideProps({
         storeCode: DEFAULT_STORE_CODE,
      });
      const product = await findProduct({
         handle,
         storeCode: DEFAULT_STORE_CODE,
      });

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
         appProps: {
            ifixitOrigin: ifixitOriginFromHost(context),
         },
         product,
      };
      return {
         props: pageProps,
      };
   });
