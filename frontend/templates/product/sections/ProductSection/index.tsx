import { QualityGuarantee } from '@assets/svg';
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
import { faCircleExclamation } from '@fortawesome/pro-solid-svg-icons';
import { useAppContext } from '@ifixit/app';
import { isLifetimeWarranty } from '@ifixit/helpers';
import { FaIcon } from '@ifixit/icons';
import { PageContentWrapper, ProductVariantPrice } from '@ifixit/ui';
import { Product, ProductVariant } from '@models/product';
import { useIsProductForSale } from '@templates/product/hooks/useIsProductForSale';
import * as React from 'react';
import { BuyBoxPropositionSection } from '../ServiceValuePropositionSection';
import { AddToCart, isVariantWithSku } from './AddToCart';
import { GenuinePartBanner } from './GenuinePartBanner';
import { ProductGallery } from './ProductGallery';
import { ProductOptions } from './ProductOptions';
import { ProductRating } from './ProductRating';
import { ProductVideos } from './ProductVideos';
import { Prop65Warning } from './Prop65Warning';
import { useInternationalBuyBox } from '@templates/product/hooks/useInternationalBuyBox';
import { InternationalBuyBox } from './InternationalBuyBox';
import { ProductDescription } from './ProductDescription';
import { CompatibleDevices } from './CompatibleDevices';

export type ProductSectionProps = {
   product: Product;
   selectedVariant: ProductVariant;
   onVariantChange: (variantId: string) => void;
   internationalBuyBox: ReturnType<typeof useInternationalBuyBox>;
};

export function ProductSection({
   product,
   selectedVariant,
   onVariantChange,
   internationalBuyBox,
}: ProductSectionProps) {
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
      <PageContentWrapper as="section">
         <Flex px={{ base: 5, sm: 0 }}>
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
                  w={{
                     md: '320px',
                     lg: 'calc(400px + 16px + ((100vw - 960px) / 2 - 24px))',
                     xl: 'calc(400px + 16px + ((100vw - 1100px) / 2 - 24px))',
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
                  />
               )}

               {isForSale && <ProductRating product={product} />}

               <Flex display={{ base: 'flex', md: 'none' }} w="full" pt="6">
                  <ProductGallery
                     product={product}
                     selectedVariant={selectedVariant}
                     selectedImageId={selectedImageId}
                     onChangeImage={setSelectedImageId}
                  />
               </Flex>

               <ProductOptions
                  product={product}
                  selected={selectedVariant.id}
                  onChange={handleVariantChange}
               />

               {isForSale ? (
                  isVariantWithSku(selectedVariant) &&
                  (internationalBuyBox ? (
                     <InternationalBuyBox {...internationalBuyBox} />
                  ) : (
                     <AddToCart
                        product={product}
                        selectedVariant={selectedVariant}
                     />
                  ))
               ) : (
                  <NotForSaleAlert mt="4" />
               )}

               {product.oemPartnership && (
                  <GenuinePartBanner oemPartnership={product.oemPartnership} />
               )}

               {isForSale && (
                  <BuyBoxPropositionSection selectedVariant={selectedVariant} />
               )}

               <Accordion
                  defaultIndex={[0, 1]}
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

                  <WikiHtmlAccordianItem title="Kit contents">
                     {selectedVariant.kitContents}
                  </WikiHtmlAccordianItem>

                  <WikiHtmlAccordianItem title="Assembly contents">
                     {selectedVariant.assemblyContents}
                  </WikiHtmlAccordianItem>

                  <AccordionItem
                     hidden={
                        product.compatibility == null ||
                        product.compatibility.devices.length <= 0
                     }
                  >
                     <CustomAccordionButton>
                        Compatibility
                     </CustomAccordionButton>
                     <CustomAccordionPanel data-testid="product-compatibility-dropdown">
                        <CompatibleDevices product={product} />
                     </CustomAccordionPanel>
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
      </PageContentWrapper>
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
            size="xl"
            fontFamily="Archivo Black"
            data-testid="product-title"
         >
            {children}
         </Heading>
      );
   }
);

type CustomAccordionButtonProps = React.PropsWithChildren<{}>;

function CustomAccordionButton({ children }: CustomAccordionButtonProps) {
   return (
      <AccordionButton py="5" px="1.5">
         <Box
            flex="1"
            textAlign="left"
            color="gray.800"
            fontWeight="bold"
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

function NotForSaleAlert(props: AlertProps) {
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
               <Box
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
                        fontWeight: 'bold',
                        transition: 'all 300ms',
                        color: 'brand.500',
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
                     th: {
                        textAlign: 'left',
                     },
                  }}
                  dangerouslySetInnerHTML={{
                     __html: children,
                  }}
               ></Box>
            )}
         </CustomAccordionPanel>
      </AccordionItem>
   );
}
