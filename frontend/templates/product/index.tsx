import { Box, Flex } from '@chakra-ui/react';
import { PageEditMenu } from '@components/admin';
import { PageBreadcrumb } from '@components/common';
import { BannersSection } from '@components/sections/BannersSection';
import { FAQsSection } from '@components/sections/FAQsSection';
import { FeaturedProductsSection } from '@components/sections/FeaturedProductsSection';
import { QuoteSection } from '@components/sections/QuoteSection';
import { ReplacementGuidesSection } from '@components/sections/ReplacementGuidesSection';
import { ServiceValuePropositionSection } from '@components/sections/ServiceValuePropositionSection';
import { SplitWithImageContentSection } from '@components/sections/SplitWithImageSection';
import { DEFAULT_STORE_CODE } from '@config/env';
import {
   trackGoogleProductView,
   trackInPiwikAndGA,
   trackMatomoEcommerceView,
   trackGA4ViewItem,
} from '@ifixit/analytics';
import { useAuthenticatedUser } from '@ifixit/auth-sdk';
import {
   assertNever,
   isLifetimeWarranty,
   moneyToNumber,
   parseItemcode,
   getVariantIdFromVariantURI,
} from '@ifixit/helpers';
import { DefaultLayout } from '@layouts/default';
import { ProductPreview } from '@models/components/product-preview';
import { useInternationalBuyBox } from '@templates/product/hooks/useInternationalBuyBox';
import * as React from 'react';
import { LifetimeWarrantySection } from '../../components/sections/LifetimeWarrantySection';
import { ProductPixelPing } from './components/PixelPing';
import { SecondaryNavigation } from './components/SecondaryNavigation';
import { useIsProductForSale } from './hooks/useIsProductForSale';
import { useProductPageAdminLinks } from './hooks/useProductPageAdminLinks';
import {
   ProductTemplateProps,
   useProductTemplateProps,
} from './hooks/useProductTemplateProps';
import { useSelectedVariant } from './hooks/useSelectedVariant';
import { MetaTags } from './MetaTags';
import { CompatibilityNotesSection } from './sections/CompatibilityNotesSection';
import { CompatibilitySection } from './sections/CompatibilitySection';
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
      trackGA4ViewItem({
         currency: selectedVariant.price.currencyCode,
         value: selectedVariant.price.amount,
         items: [
            {
               item_id: selectedVariant.sku,
               item_name: selectedVariant.internalDisplayName,
               item_variant: getVariantIdFromVariantURI(selectedVariant.id),
               price: selectedVariant.price.amount,
               quantity: selectedVariant.quantityAvailable,
            },
         ],
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const trackFeaturedProductClick = React.useCallback(
      (product: ProductPreview) => {
         trackInPiwikAndGA({
            eventCategory: 'Featured Products - Product Page',
            eventAction: `Featured on Product Page - ${product.handle}`,
         });
      },
      []
   );

   const adminLinks = useProductPageAdminLinks({
      product,
      storeCode: DEFAULT_STORE_CODE,
   });

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
                           id={section.id}
                           title={section.title}
                           guides={section.guides}
                        />
                     );
                  case 'SplitWithImage':
                     return (
                        <SplitWithImageContentSection
                           key={section.id}
                           id={section.id}
                           title={section.title}
                           label={section.label}
                           description={section.description}
                           image={section.image}
                           imagePosition={section.imagePosition}
                           callToAction={section.callToAction}
                        />
                     );
                  case 'ServiceValueProposition': {
                     if (!product.isEnabled) return null;

                     return (
                        <ServiceValuePropositionSection
                           key={section.id}
                           id={section.id}
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
                     return product.compatibilityNotes?.length ? (
                        <CompatibilityNotesSection
                           key={section.id}
                           compatibilityNotes={product.compatibilityNotes}
                        />
                     ) : (
                        <CompatibilitySection
                           key={section.id}
                           compatibility={product.compatibility}
                        />
                     );
                  case 'FeaturedProducts': {
                     return (
                        <FeaturedProductsSection
                           key={section.id}
                           id={section.id}
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
                           id={section.id}
                           banners={section.banners}
                        />
                     );
                  }
                  case 'Quote': {
                     return (
                        <QuoteSection
                           key={section.id}
                           id={section.id}
                           quote={section.text}
                           author={section.author}
                           image={section.image}
                        />
                     );
                  }
                  case 'FAQs': {
                     return (
                        <FAQsSection
                           key={section.id}
                           id={section.id}
                           title={section.title}
                           description={section.description}
                           faqs={section.faqs}
                        />
                     );
                  }

                  default:
                     return assertNever(section);
               }
            })}
         </Box>
         {product.productcode && (
            <ProductPixelPing productcode={parseInt(product.productcode)} />
         )}
      </React.Fragment>
   );
};

ProductTemplate.getLayout = function getLayout(page, pageProps) {
   return <DefaultLayout {...pageProps.layoutProps}>{page}</DefaultLayout>;
};

export default ProductTemplate;
