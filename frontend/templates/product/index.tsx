import { Box, Flex } from '@chakra-ui/react';
import { PageEditMenu } from '@components/admin';
import { PageBreadcrumb } from '@components/common';
import { BannersSection } from '@components/sections/BannersSection';
import { FeaturedProductsSection } from '@components/sections/FeaturedProductsSection';
import { ReplacementGuidesSection } from '@components/sections/ReplacementGuidesSection';
import { ServiceValuePropositionSection } from '@components/sections/ServiceValuePropositionSection';
import { SplitWithImageContentSection } from '@components/sections/SplitWithImageSection';
import { DEFAULT_STORE_CODE } from '@config/env';
import { getAdminLinks } from '@helpers/product-helpers';
import {
   trackGoogleProductView,
   trackInMatomoAndGA,
   trackMatomoEcommerceView,
} from '@ifixit/analytics';
import { useAuthenticatedUser } from '@ifixit/auth-sdk';
import {
   assertNever,
   isLifetimeWarranty,
   moneyToNumber,
   parseItemcode,
} from '@ifixit/helpers';
import { DefaultLayout } from '@layouts/default';
import { ProductPreview } from '@models/components/product-preview';
import { useInternationalBuyBox } from '@templates/product/hooks/useInternationalBuyBox';
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
import { LifetimeWarrantySection } from './sections/LifetimeWarrantySection';
import { ProductOverviewSection } from './sections/ProductOverviewSection';
import { ProductReviewsSection } from './sections/ProductReviewsSection';

const ProductTemplate: NextPageWithLayout<ProductTemplateProps> = () => {
   const { product } = useProductTemplateProps();
   const [selectedVariant, setSelectedVariantId] = useSelectedVariant(product);

   const internationalBuyBox = useInternationalBuyBox(product);

   const isProductForSale = useIsProductForSale(product);
   const isAdminUser = useAuthenticatedUser().data?.isAdmin ?? false;

   React.useEffect(() => {
      trackMatomoEcommerceView({
         productSku: selectedVariant.sku ?? selectedVariant.id,
         productName: selectedVariant.internalDisplayName ?? product.title,
         price: selectedVariant.price,
      });
      trackGoogleProductView({
         id: selectedVariant.sku ?? selectedVariant.id,
         name: product.title,
         variant: selectedVariant.internalDisplayName ?? undefined,
         category: parseItemcode(selectedVariant.sku ?? '')?.category,
         price: moneyToNumber(selectedVariant.price).toFixed(2),
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const trackFeaturedProductClick = React.useCallback(
      (product: ProductPreview) => {
         trackInMatomoAndGA({
            eventCategory: 'Featured Products - Product Page',
            eventAction: `Featured on Product Page - ${product.handle}`,
         });
      },
      []
   );

   const adminLinks = React.useMemo(
      () =>
         getAdminLinks({
            productcode: product.productcode,
            productId: product.id,
            storeCode: DEFAULT_STORE_CODE,
         }),
      [product.productcode, product.id]
   );

   return (
      <React.Fragment key={product.handle}>
         <MetaTags product={product} selectedVariant={selectedVariant} />
         {isAdminUser && (
            <SecondaryNavigation
               display={{ lg: 'none' }}
               bg="white"
               borderBottomWidth="thin"
            >
               <Flex w="full" direction="row-reverse">
                  <PageEditMenu links={adminLinks} />
               </Flex>
            </SecondaryNavigation>
         )}
         {product.breadcrumbs != null && (
            <SecondaryNavigation>
               <Flex w="full" justify="space-between">
                  <PageBreadcrumb items={product.breadcrumbs} w="full" />
                  {isAdminUser && (
                     <PageEditMenu
                        links={adminLinks}
                        display={{
                           base: 'none',
                           lg: 'block',
                        }}
                     />
                  )}
               </Flex>
            </SecondaryNavigation>
         )}
         <Box>
            {product.sections.map((section) => {
               switch (section.type) {
                  case 'ProductOverview':
                     return (
                        <ProductOverviewSection
                           key={section.id}
                           product={product}
                           selectedVariant={selectedVariant}
                           onVariantChange={setSelectedVariantId}
                           internationalBuyBox={internationalBuyBox}
                        />
                     );
                  case 'ReplacementGuides':
                     return (
                        <ReplacementGuidesSection
                           key={section.id}
                           title={section.title}
                           guides={section.guides}
                        />
                     );
                  case 'SplitWithImage':
                     return (
                        <SplitWithImageContentSection
                           key={section.id}
                           data={section}
                        />
                     );
                  case 'CrossSell': {
                     if (!isProductForSale || internationalBuyBox != null)
                        return null;

                     return (
                        <CrossSellSection
                           key={section.id}
                           title={section.title}
                           product={product}
                           selectedVariant={selectedVariant}
                        />
                     );
                  }
                  case 'ServiceValueProposition': {
                     if (!product.isEnabled) return null;

                     return (
                        <ServiceValuePropositionSection
                           key={section.id}
                           selectedVariant={selectedVariant}
                        />
                     );
                  }
                  case 'ProductReviews': {
                     if (!isProductForSale) return null;

                     return (
                        <ProductReviewsSection
                           key={section.id}
                           title={section.title}
                           product={product}
                           selectedVariant={selectedVariant}
                        />
                     );
                  }
                  case 'DeviceCompatibility':
                     return (
                        <CompatibilitySection
                           key={section.id}
                           compatibility={product.compatibility}
                        />
                     );
                  case 'FeaturedProducts': {
                     if (section.products.length === 0) return null;

                     return (
                        <FeaturedProductsSection
                           key={section.id}
                           title={section.title}
                           description={section.description}
                           background={section.background}
                           products={section.products}
                           onProductClick={trackFeaturedProductClick}
                        />
                     );
                  }
                  case 'LifetimeWarranty': {
                     if (!isLifetimeWarranty(selectedVariant.warranty))
                        return null;

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
                           banners={section.banners}
                        />
                     );
                  }
                  case 'Quote': {
                     console.log('Quote section', section);
                     return null;

                     // return (
                     //    <QuoteSection
                     //       key={section.id}
                     //       quote={section.quote}
                     //       author={section.author}
                     //    />
                     // );
                  }
                  default:
                     return assertNever(section);
               }
            })}
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

export default ProductTemplate;
