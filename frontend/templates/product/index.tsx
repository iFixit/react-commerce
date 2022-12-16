import { Box } from '@chakra-ui/react';
import { ProductEditMenu } from '@components/admin';
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
import { useAuthenticatedUser } from '@ifixit/auth-sdk';
import { invariant, moneyToNumber, parseItemcode } from '@ifixit/helpers';
import { urlFromContext } from '@ifixit/helpers/nextjs';
import { DefaultLayout, getLayoutServerSideProps } from '@layouts/default';
import { findProduct } from '@models/product';
import { useInternationalBuyBox } from '@templates/product/hooks/useInternationalBuyBox';
import { GetServerSideProps } from 'next';
import * as React from 'react';
import { PixelPing } from './components/PixelPing';
import {
   SecondaryNavigation,
   SecondaryNavigationRow,
} from './components/SecondaryNavigation';
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
   const isAdminUser = useAuthenticatedUser().data?.isAdmin ?? false;

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
         {isAdminUser && (
            <SecondaryNavigation
               display={{ lg: 'none' }}
               bg="white"
               borderBottomWidth="thin"
            >
               <SecondaryNavigationRow direction="row-reverse">
                  <ProductEditMenu links={[]} />
               </SecondaryNavigationRow>
            </SecondaryNavigation>
         )}
         {product.breadcrumbs != null && (
            <SecondaryNavigation>
               <SecondaryNavigationRow justify="space-between">
                  <PageBreadcrumb items={product.breadcrumbs} />
                  {isAdminUser && (
                     <ProductEditMenu
                        links={[]}
                        display={{
                           base: 'none',
                           lg: 'block',
                        }}
                     />
                  )}
               </SecondaryNavigationRow>
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
         {product.productcode && (
            <PixelPing productcode={product.productcode} />
         )}
      </React.Fragment>
   );
};

ProductTemplate.getLayout = function getLayout(page, pageProps) {
   return <DefaultLayout {...pageProps.layoutProps}>{page}</DefaultLayout>;
};

export const getServerSideProps: GetServerSideProps<ProductTemplateProps> =
   serverSidePropsWrapper<ProductTemplateProps>(async (context) => {
      context.res.setHeader(
         'Cache-Control',
         'public, s-maxage=60, stale-while-revalidate=600'
      );

      noindexDevDomains(context);
      const { handle } = context.params || {};
      invariant(typeof handle === 'string', 'handle param is missing');
      const { stores, ...otherLayoutProps } = await getLayoutServerSideProps({
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

      if (product.redirectUrl) {
         const query = new URL(urlFromContext(context)).search;
         return {
            redirect: {
               destination: `${product.redirectUrl}${query}`,
               permanent: true,
            },
         };
      }

      const proOnly = product?.tags.find((tag: string) => tag === 'Pro Only');
      if (proOnly) {
         context.res.setHeader('X-Robots-Tag', 'noindex, follow');
      }

      const codeToDomain =
         product.enabledDomains?.reduce((acc, { code, domain }) => {
            acc[code] = domain;
            return acc;
         }, {} as Record<string, string>) ?? {};
      const storesWithProductUrls = stores.map((store) => {
         const domain =
            store.code === DEFAULT_STORE_CODE
               ? new URL(store.url).origin
               : codeToDomain[store.code];
         if (domain) {
            store.url = `${domain}/products/${product.handle}`;
         }
         return store;
      });

      const pageProps: ProductTemplateProps = {
         layoutProps: {
            ...otherLayoutProps,
            stores: storesWithProductUrls,
         },
         appProps: {
            ifixitOrigin: ifixitOriginFromHost(context),
         },
         product,
      };
      return {
         props: pageProps,
      };
   });
