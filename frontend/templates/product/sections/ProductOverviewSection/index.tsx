import { QualityGuarantee } from '@assets/svg/files';
import {
   Accordion,
   AccordionButton,
   AccordionIcon,
   AccordionItem,
   AccordionPanel,
   Alert,
   AlertProps,
   Box,
   chakra,
   Flex,
   Heading,
   HStack,
   Icon,
   Link,
   StackProps,
   Text,
   VStack,
} from '@chakra-ui/react';
import { BuyBoxPropositionSection } from '@components/sections/ServiceValuePropositionSection';
import { faCircleExclamation } from '@fortawesome/pro-solid-svg-icons';
import { useAppContext } from '@ifixit/app';
import { isLifetimeWarranty } from '@ifixit/helpers';
import { FaIcon } from '@ifixit/icons';
import { ProductVariantPrice, Wrapper } from '@ifixit/ui';
import type { Product, ProductVariant } from '@pages/api/nextjs/cache/product';
import { useInternationalBuyBox } from '@templates/product/hooks/useInternationalBuyBox';
import { useIsProductForSale } from '@templates/product/hooks/useIsProductForSale';
import * as React from 'react';
import { AddToCart, isVariantWithSku } from './AddToCart';
import { CompatibilityNotes } from './CompatibilityNotes';
import { CompatibleDevices } from './CompatibleDevices';
import { PRODUCT_OVERVIEW_SECTION_ID } from './constants';
import { CrossSell } from './CrossSell';
import { GenuinePartBanner } from './GenuinePartBanner';
import { InternationalBuyBox } from './InternationalBuyBox';
import { ProductDescription } from './ProductDescription';
import { ProductGallery } from './ProductGallery';
import { ProductOptions } from './ProductOptions';
import { ProductRating } from './ProductRating';
import { ProductVideos } from './ProductVideos';
import { Prop65Warning } from './Prop65Warning';
import { PrerenderedHTML } from '@components/common';

export interface ProductOverviewSectionProps {
   product: Product;
   selectedVariant: ProductVariant;
   onVariantChange: (variantId: string) => void;
   internationalBuyBox: ReturnType<typeof useInternationalBuyBox>;
}

export function ProductOverviewSection({
   product,
   selectedVariant,
   onVariantChange,
   internationalBuyBox,
}: ProductOverviewSectionProps) {
   const [selectedImageId, setSelectedImageId] = React.useState<string | null>(
      null
   );

   const handleVariantChange = React.useCallback(
      (variantId: string) => {
         onVariantChange(variantId);
         setSelectedImageId(null);
      },
      [onVariantChange]
   );
   const isForSale = useIsProductForSale(product);
   return (
      <Wrapper as="section" id={PRODUCT_OVERVIEW_SECTION_ID} mb="16" pt="6">
         <Flex>
            <Flex
               position="sticky"
               alignSelf="flex-start"
               display={{ base: 'none', md: 'flex' }}
               top="10"
               mr={{ base: 6, lg: 10 }}
               direction="column"
               flex="1"
               w="0"
               zIndex="1"
            >
               <ProductGallery
                  data-testid="product-gallery-desktop"
                  product={product}
                  selectedVariant={selectedVariant}
                  selectedImageId={selectedImageId}
                  showThumbnails
                  enableZoom
                  onChangeImage={setSelectedImageId}
               />

               <Box
                  id="zoom-container"
                  position="absolute"
                  top="0"
                  // Calculation description: https://github.com/iFixit/react-commerce/pull/1398#issuecomment-1440432678
                  w={{
                     md: '320px',
                     lg: 'calc(16px + 400px + 32px - 24px)',
                     xl: 'calc(16px + 400px + 32px + (100vw - 1280px) / 2 - 24px)',
                  }}
                  left="calc(100% + 24px)"
                  boxShadow="md"
                  borderRadius="md"
               />
            </Flex>

            <Box
               w={{
                  base: 'full',
                  md: '320px',
                  lg: '400px',
               }}
               pt={{
                  base: 0,
                  md: 5,
               }}
               fontSize="sm"
               position="relative"
               data-testid="product-info-section"
            >
               {selectedVariant.sku && (
                  <Text color="gray.500" data-testid="product-sku">
                     Item # {selectedVariant.sku}
                  </Text>
               )}

               <ProductTitle mb="2.5">{product.title}</ProductTitle>

               {isForSale && (
                  <ProductVariantPrice
                     price={selectedVariant.price}
                     compareAtPrice={selectedVariant.compareAtPrice}
                     proPricesByTier={selectedVariant.proPricesByTier}
                     data-testid="product-price-section"
                     size={{ base: 'medium', md: 'large' }}
                  />
               )}

               {!product.isEnabled && <NotForSaleAlert />}

               {isForSale && <ProductRating product={product} />}

               <Flex display={{ base: 'flex', md: 'none' }} w="full" pt="6">
                  <ProductGallery
                     data-testid="product-gallery-mobile"
                     product={product}
                     selectedVariant={selectedVariant}
                     selectedImageId={selectedImageId}
                     onChangeImage={setSelectedImageId}
                  />
               </Flex>

               {product.isEnabled && (
                  <ProductOptions
                     product={product}
                     selected={selectedVariant.id}
                     onChange={handleVariantChange}
                     data-testid="product-variants-selector"
                  />
               )}

               {isForSale ? (
                  isVariantWithSku(selectedVariant) &&
                  (internationalBuyBox ? (
                     <InternationalBuyBox {...internationalBuyBox} />
                  ) : (
                     <>
                        <AddToCart
                           product={product}
                           selectedVariant={selectedVariant}
                        />
                        <CrossSell
                           product={product}
                           selectedVariant={selectedVariant}
                        />
                     </>
                  ))
               ) : product.isEnabled ? (
                  <ProOnlyAlert mt="4" />
               ) : null}

               {product.oemPartnership && (
                  <GenuinePartBanner oemPartnership={product.oemPartnership} />
               )}

               {isForSale && (
                  <BuyBoxPropositionSection selectedVariant={selectedVariant} />
               )}

               <Accordion
                  defaultIndex={product.isEnabled ? [0, 1] : undefined}
                  allowMultiple
                  mt="10"
                  sx={{
                     '& > :not(style)': {
                        borderColor: 'gray.200',
                     },
                  }}
               >
                  <AccordionItem>
                     <CustomAccordionButton>Description</CustomAccordionButton>
                     <CustomAccordionPanel>
                        <VStack>
                           <ProductDescription
                              product={product}
                              selectedVariant={selectedVariant}
                           />
                        </VStack>
                     </CustomAccordionPanel>
                  </AccordionItem>

                  <WikiHtmlAccordianItem title="Assembly contents">
                     {selectedVariant.assemblyContents}
                  </WikiHtmlAccordianItem>

                  <WikiHtmlAccordianItem title="Kit contents">
                     {selectedVariant.kitContents}
                  </WikiHtmlAccordianItem>

                  <AccordionItem
                     hidden={
                        product.compatibility == null ||
                        product.compatibility.devices.length <= 0
                     }
                  >
                     {product.compatibilityNotes?.length ? (
                        <>
                           <CustomAccordionButton>
                              Compatibility Notes
                           </CustomAccordionButton>
                           <CustomAccordionPanel data-testid="product-compatibility-dropdown">
                              <CompatibilityNotes
                                 compatibilityNotes={product.compatibilityNotes}
                              />
                           </CustomAccordionPanel>
                        </>
                     ) : (
                        <>
                           <CustomAccordionButton>
                              Compatibility
                           </CustomAccordionButton>
                           <CustomAccordionPanel data-testid="product-compatibility-dropdown">
                              <CompatibleDevices product={product} />
                           </CustomAccordionPanel>
                        </>
                     )}
                  </AccordionItem>
                  <WikiHtmlAccordianItem title="Specifications">
                     {selectedVariant.specifications}
                  </WikiHtmlAccordianItem>
               </Accordion>

               <VariantWarranty variant={selectedVariant} mt="5" />

               <VStack mt="10" align="flex-start" spacing="4">
                  {product.prop65WarningType && product.prop65Chemicals && (
                     <Prop65Warning
                        type={product.prop65WarningType}
                        chemicals={product.prop65Chemicals}
                     />
                  )}

                  <ProductVideos product={product} />
               </VStack>
            </Box>
         </Flex>
      </Wrapper>
   );
}

const ProductTitle = chakra(
   ({
      children,
      className,
   }: React.PropsWithChildren<{ className?: string }>) => {
      return (
         <Heading
            as="h1"
            className={className}
            data-testid="product-title"
            fontSize={{ base: '2xl', md: '3xl' }}
            fontWeight="medium"
         >
            {children}
         </Heading>
      );
   }
);

type CustomAccordionButtonProps = React.PropsWithChildren<{}>;

export function CustomAccordionButton({
   children,
}: CustomAccordionButtonProps) {
   return (
      <AccordionButton py="5" px="1.5">
         <Box
            flex="1"
            textAlign="left"
            color="gray.800"
            fontWeight="semibold"
            fontSize="sm"
         >
            {children}
         </Box>
         <AccordionIcon />
      </AccordionButton>
   );
}

type CustomAccordionPanelProps = React.PropsWithChildren<{}>;

function CustomAccordionPanel({
   children,
   ...other
}: CustomAccordionPanelProps) {
   return (
      <AccordionPanel pb={4} px="1.5" {...other}>
         {children}
      </AccordionPanel>
   );
}

type VariantWarrantyProps = StackProps & {
   variant: ProductVariant;
};

function VariantWarranty({ variant, ...other }: VariantWarrantyProps) {
   const appContext = useAppContext();
   return (
      <HStack
         color="brand.500"
         fontSize="sm"
         as="a"
         target="_blank"
         href={`${appContext.ifixitOrigin}/Info/Warranty`}
         {...other}
      >
         {isLifetimeWarranty(variant.warranty ?? '') && (
            <Icon
               data-testid="quality-guarantee-icon"
               as={QualityGuarantee}
               boxSize="50px"
               color="brand.500"
               borderRadius="full"
            />
         )}
         <Box>{variant.warranty}</Box>
      </HStack>
   );
}

function ProOnlyAlert(props: AlertProps) {
   return (
      <Alert
         status="warning"
         borderWidth={1}
         borderColor="orange.300"
         borderRadius="md"
         alignItems="flex-start"
         {...props}
      >
         <FaIcon
            icon={faCircleExclamation}
            h="4"
            mt="0.5"
            mr="2.5"
            color="orange.500"
         />

         <Box fontSize="sm">
            <p>Product available for pro users only.</p>
            <p>
               Learn more about{' '}
               <Link
                  href="https://pro.ifixit.com"
                  target="_blank"
                  fontWeight="bold"
                  textDecoration="underline"
                  _hover={{
                     color: 'orange.800',
                  }}
               >
                  iFixit Pro
               </Link>
               .
            </p>
         </Box>
      </Alert>
   );
}

function NotForSaleAlert(props: AlertProps) {
   return (
      <Alert status="warning" {...props} data-testid="not-for-sale-alert">
         <FaIcon icon={faCircleExclamation} h="5" mr="2" color="amber.600" />
         <span>Not for Sale.</span>
      </Alert>
   );
}

interface WikiHtmlAccordianItemProps {
   title: string;
   children: string | null | undefined;
}

function WikiHtmlAccordianItem({
   title,
   children,
}: WikiHtmlAccordianItemProps) {
   return (
      <AccordionItem hidden={children == null}>
         <CustomAccordionButton>{title}</CustomAccordionButton>
         <CustomAccordionPanel>
            {children && (
               <PrerenderedHTML
                  html={children}
                  styles="commerce"
                  fontSize="sm"
                  sx={{
                     ul: {
                        listStyle: 'none',
                     },
                     li: {
                        borderTopWidth: '1px',
                        borderTopColor: 'gray.200',
                        py: 3,
                        '& ul': {
                           mt: 3,
                           ml: 5,
                        },
                     },
                     a: {
                        fontWeight: 'medium',
                        transition: 'all 300ms',
                     },
                     'a:hover': {
                        color: 'brand.600',
                     },
                     table: {
                        display: 'flex',
                        p: 1.5,
                     },
                     tbody: {
                        w: 'full',
                     },
                     tr: {
                        display: 'flex',
                        flexDirection: 'column',
                        borderTopWidth: '1px',
                        borderTopColor: 'gray.200',
                        py: 2,
                     },
                  }}
               />
            )}
         </CustomAccordionPanel>
      </AccordionItem>
   );
}
