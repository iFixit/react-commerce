import { QualityGuarantee } from '@assets/svg';
import {
   Accordion,
   AccordionButton,
   AccordionIcon,
   AccordionItem,
   AccordionPanel,
   Alert,
   Box,
   chakra,
   Flex,
   Heading,
   HStack,
   Icon,
   Link,
   List,
   ListIcon,
   ListItem,
   StackProps,
   Text,
   VStack,
} from '@chakra-ui/react';
import { CompatibleDevice } from '@components/common';
import {
   faBadgeDollar,
   faCircleExclamation,
   faRocket,
   faShieldCheck,
} from '@fortawesome/pro-solid-svg-icons';
import { useAppContext } from '@ifixit/app';
import { isLifetimeWarranty } from '@ifixit/helpers';
import { FaIcon } from '@ifixit/icons';
import { PageContentWrapper, ProductVariantPrice } from '@ifixit/ui';
import { Product, ProductVariant } from '@models/product';
import NextLink from 'next/link';
import * as React from 'react';
import { AddToCart, isVariantWithSku } from './AddToCart';
import { ProductGallery } from './ProductGallery';
import { ProductOptions } from './ProductOptions';
import { ProductRating } from './ProductRating';
import { Prop65Warning } from './Prop65Warning';

export type ProductSectionProps = {
   product: Product;
   selectedVariant: ProductVariant;
   onVariantChange: (variantId: string) => void;
};

export function ProductSection({
   product,
   selectedVariant,
   onVariantChange,
}: ProductSectionProps) {
   const [selectedImageId, setSelectedImageId] = React.useState(
      selectedVariant.image?.id
   );

   const handleVariantChange = React.useCallback(
      (variantId: string) => {
         onVariantChange(variantId);
         const variant = product.variants.find(
            (variant) => variant.id === variantId
         )!;
         setSelectedImageId(variant.image?.id);
      },
      [product.variants, onVariantChange]
   );

   return (
      <PageContentWrapper as="section">
         <Flex px={{ base: 5, sm: 0 }}>
            <Flex
               position="sticky"
               alignSelf="flex-start"
               display={{ base: 'none', md: 'flex' }}
               top="10"
               mr={{ base: 5, lg: 10 }}
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
                     base: 'full',
                     md: '320px',
                     lg: '400px',
                  }}
                  left={{ base: 'calc(100% + 20px)', lg: 'calc(100% + 40px)' }}
                  boxShadow="md"
                  borderRadius="md"
               />
            </Flex>
            <Flex
               w={{
                  base: 'full',
                  md: '320px',
                  lg: '400px',
               }}
               pt={{
                  base: 0,
                  md: 5,
               }}
               direction="column"
               fontSize="sm"
               position="relative"
            >
               {selectedVariant.sku && (
                  <Text color="gray.500">Item # {selectedVariant.sku}</Text>
               )}
               <ProductTitle mb="2.5">{product.title}</ProductTitle>
               <ProductVariantPrice
                  price={selectedVariant.price}
                  compareAtPrice={selectedVariant.compareAtPrice}
                  proPricesByTier={selectedVariant.proPricesByTier}
               />
               <ProductRating product={product} />
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
               {isVariantWithSku(selectedVariant) && (
                  <AddToCart
                     product={product}
                     selectedVariant={selectedVariant}
                  />
               )}
               <div>
                  <List spacing="2.5" fontSize="sm" mt="5" lineHeight="short">
                     <ListItem display="flex" alignItems="center">
                        <ListIcon
                           as={FaIcon}
                           h="4"
                           w="5"
                           mr="1.5"
                           color="brand.500"
                           icon={faBadgeDollar}
                        />
                        Satisfaction guaranteed or your money back
                     </ListItem>
                     <ListItem display="flex" alignItems="center">
                        <ListIcon
                           as={FaIcon}
                           h="4"
                           w="5"
                           mr="1.5"
                           color="brand.500"
                           icon={faShieldCheck}
                        />

                        <div>
                           If it doesn&apos;t meet our meticulous standards, we
                           won&apos;t sell it. Period.
                        </div>
                     </ListItem>
                     <ListItem display="flex" alignItems="center">
                        <ListIcon
                           as={FaIcon}
                           h="4"
                           w="5"
                           mr="1.5"
                           color="brand.500"
                           icon={faRocket}
                        />
                        Same day shipping if ordered by 5PM
                     </ListItem>
                  </List>
               </div>
               <Accordion defaultIndex={[0, 1]} allowMultiple mt="10">
                  <AccordionItem>
                     <CustomAccordionButton>Description</CustomAccordionButton>
                     <CustomAccordionPanel>
                        <VStack>
                           <VariantDescription>
                              {selectedVariant.description ??
                                 product.descriptionHtml}
                           </VariantDescription>
                           {selectedVariant.note && (
                              <Alert
                                 status="info"
                                 borderWidth={1}
                                 borderColor="brand.300"
                                 borderRadius="md"
                                 alignItems="flex-start"
                              >
                                 <FaIcon
                                    icon={faCircleExclamation}
                                    h="4"
                                    mt="0.5"
                                    mr="2.5"
                                    color="brand.500"
                                 />
                                 <Box
                                    fontSize="sm"
                                    dangerouslySetInnerHTML={{
                                       __html: selectedVariant.note,
                                    }}
                                 />
                              </Alert>
                           )}
                           {selectedVariant.disclaimer && (
                              <Alert
                                 status="warning"
                                 borderWidth={1}
                                 borderColor="orange.300"
                                 borderRadius="md"
                                 alignItems="flex-start"
                              >
                                 <FaIcon
                                    icon={faCircleExclamation}
                                    h="4"
                                    mt="0.5"
                                    mr="2.5"
                                    color="orange.500"
                                 />
                                 <Box
                                    fontSize="sm"
                                    dangerouslySetInnerHTML={{
                                       __html: selectedVariant.disclaimer,
                                    }}
                                 />
                              </Alert>
                           )}
                           {selectedVariant.warning && (
                              <Alert
                                 status="error"
                                 borderWidth={1}
                                 borderColor="red.300"
                                 borderRadius="md"
                                 alignItems="flex-start"
                              >
                                 <FaIcon
                                    icon={faCircleExclamation}
                                    color="red.500"
                                    h="4"
                                    mt="0.5"
                                    mr="2.5"
                                 />
                                 <Box
                                    fontSize="sm"
                                    dangerouslySetInnerHTML={{
                                       __html: selectedVariant.warning,
                                    }}
                                 />
                              </Alert>
                           )}
                        </VStack>
                     </CustomAccordionPanel>
                  </AccordionItem>
                  <AccordionItem hidden={selectedVariant.kitContents == null}>
                     <CustomAccordionButton>Kit contents</CustomAccordionButton>
                     <CustomAccordionPanel>
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
                           }}
                           dangerouslySetInnerHTML={{
                              __html: selectedVariant.kitContents ?? '',
                           }}
                        ></Box>
                     </CustomAccordionPanel>
                  </AccordionItem>

                  <AccordionItem
                     hidden={
                        product.compatibility == null ||
                        product.compatibility.devices.length <= 0
                     }
                  >
                     <CustomAccordionButton>
                        Compatibility
                     </CustomAccordionButton>
                     <CustomAccordionPanel>
                        {product.compatibility?.devices
                           .slice(0, 3)
                           .map((device, index) => (
                              <NextLink
                                 key={index}
                                 href={device.deviceUrl}
                                 passHref
                              >
                                 <chakra.a
                                    role="group"
                                    display="flex"
                                    transition="all 300m"
                                    mb="6px"
                                 >
                                    <CompatibleDevice device={device} />
                                 </chakra.a>
                              </NextLink>
                           ))}

                        {product.compatibility &&
                        product.compatibility.devices.length > 3 ? (
                           <NextLink href="#compatibility" passHref>
                              <Link
                                 mt={3}
                                 display="block"
                                 fontWeight="medium"
                                 color="brand.500"
                              >
                                 See all compatible devices
                              </Link>
                           </NextLink>
                        ) : null}
                     </CustomAccordionPanel>
                  </AccordionItem>

                  <AccordionItem
                     hidden={selectedVariant.specifications == null}
                  >
                     <CustomAccordionButton>
                        Specifications
                     </CustomAccordionButton>
                     <CustomAccordionPanel>
                        <Box
                           dangerouslySetInnerHTML={{
                              __html: selectedVariant.specifications ?? '',
                           }}
                           fontSize="sm"
                           sx={{
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
                        />
                     </CustomAccordionPanel>
                  </AccordionItem>
               </Accordion>

               <VariantWarranty variant={selectedVariant} mt="5" />

               <VStack mt="10" align="flex-start" spacing="4">
                  {product.prop65WarningType && product.prop65Chemicals && (
                     <Prop65Warning
                        type={product.prop65WarningType}
                        chemicals={product.prop65Chemicals}
                     />
                  )}
                  {product.productVideos && (
                     <Box
                        as="iframe"
                        width="100%"
                        height="315"
                        src={product.productVideos}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                     />
                  )}
               </VStack>
            </Flex>
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

function CustomAccordionPanel({ children }: CustomAccordionPanelProps) {
   return (
      <AccordionPanel pb={4} px="1.5">
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

type VariantDescriptionProps = {
   children: string;
};

function VariantDescription({ children }: VariantDescriptionProps) {
   return (
      <Box
         dangerouslySetInnerHTML={{
            __html: children,
         }}
         fontSize="sm"
         sx={{
            ul: {
               my: 3,
               pl: 5,
            },
            p: {
               mb: 3,
               _last: {
                  mb: 0,
               },
            },
            a: {
               color: 'brand.500',
            },
            'a:hover': {
               textDecoration: 'underline',
            },
         }}
      />
   );
}
