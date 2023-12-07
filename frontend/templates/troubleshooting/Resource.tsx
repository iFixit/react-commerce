import {
   Stack,
   Image,
   Badge,
   StackProps,
   LinkBox,
   LinkOverlay,
   Wrap,
   HStack,
   Text,
   Box,
   Flex,
   SystemProps,
   Button,
   ButtonProps,
   ThemingProps,
   useBreakpoint,
} from '@chakra-ui/react';
import { FaIcon } from '@ifixit/icons';
import { faClock } from '@fortawesome/pro-solid-svg-icons';
import { PrerenderedHTML } from '@components/common';
import { DifficultyThemeLookup, GuideDifficultyNames } from './DifficultyBadge';
import { Rating } from '@components/ui';
import { Money, formatMoney, shouldShowProductRating } from '@ifixit/helpers';
import {
   SectionProduct,
   SectionGuide,
   SectionPartCollection,
} from './hooks/useTroubleshootingProps';

export function GuideResource({ guide }: { guide: SectionGuide }) {
   return (
      <Resource
         href={guide.url}
         title={guide.title}
         imageUrl={guide.image.thumbnail}
         timeRequired={guide.time_required}
         difficulty={guide.difficulty}
         spacing={1.5}
      >
         {guide.introduction_rendered && (
            <PrerenderedHTML
               html={guide.introduction_rendered}
               template="troubleshooting"
               lineHeight="1.36"
               fontSize="12px"
               color="gray.600"
               height="16px"
               noOfLines={1}
            />
         )}
      </Resource>
   );
}

export function ProductResource({ product }: { product: SectionProduct }) {
   const { image, url, title, price } = product;

   return (
      <Resource
         href={url}
         title={title}
         imageUrl={image}
         spacing={1}
         showBuyButton={true}
         openInNewTab={true}
      >
         <ResourceProductRating product={product} />
         <ResourceProductPrice price={price} />
      </Resource>
   );
}

export function PartCollectionResource({
   partCollection,
}: {
   partCollection: SectionPartCollection;
}) {
   const { title, url, description, imageUrl } = partCollection;

   return (
      <Resource
         href={url}
         title={title}
         imageUrl={imageUrl}
         spacing={1}
         showBuyButton={'Find Your Parts'}
         openInNewTab={true}
         showStackedImages={true}
      >
         <Text color="gray.600" fontSize="12px">
            {description}
         </Text>
      </Resource>
   );
}

function ResourceProductRating({ product }: { product: SectionProduct }) {
   if (!shouldShowProductRating(product.reviews)) {
      return null;
   }
   return (
      <HStack spacing={1.5} fontWeight="normal">
         <Rating value={product.reviews.rating} size={3} />
         <Text color="gray.600" fontSize="12px">
            {product.reviews.rating}
         </Text>
         <Box w="1px" h="14px" bg="gray.300"></Box>
         <Text color="gray.600" fontSize="12px">
            {product.reviews.count} reviews
         </Text>
      </HStack>
   );
}

function ResourceProductPrice({ price }: { price: Money }) {
   return (
      <Box alignItems="center">
         <Text fontSize="12px" color="gray.600" fontWeight="medium">
            {formatMoney(price)}
         </Text>
      </Box>
   );
}

function BuyButton({
   url,
   buyButtonText,
   buttonStyling,
   buttonSize,
   openInNewTab,
   colorScheme,
   margin,
}: {
   url: string;
   buyButtonText: string;
   buttonStyling?: ButtonProps;
   buttonSize: ThemingProps<'Button'>['size'];
   openInNewTab?: boolean;
   colorScheme: ThemingProps<'Button'>['colorScheme'];
   margin: SystemProps['margin'];
}) {
   const openSettings = openInNewTab
      ? { target: '_blank', rel: 'noopener' }
      : {};

   return (
      <Button
         as="a"
         href={url}
         {...openSettings}
         alignSelf={{ base: 'flex-end', sm: 'flex-start' }}
         flexShrink={0}
         size={buttonSize}
         colorScheme={colorScheme}
         margin={margin}
         {...buttonStyling}
      >
         {buyButtonText}
      </Button>
   );
}

function ResourceBox({
   children,
   ...props
}: React.PropsWithChildren<StackProps>) {
   return (
      <LinkBox
         borderColor="gray.400"
         borderWidth="1px"
         borderRadius="md"
         minHeight="72px"
         padding={3}
         display="flex"
         width="100%"
         transition={`border-color var(--chakra-transition-duration-normal)`}
         _hover={{ borderColor: 'brand.500' }}
         {...props}
      >
         {children}
      </LinkBox>
   );
}

// https://dev.to/mapleleaf/indexing-objects-in-typescript-1cgi
function hasKey<O extends Object>(obj: O, key: PropertyKey): key is keyof O {
   return key in obj;
}

function Resource({
   title,
   showStackedImages,
   imageUrl,
   timeRequired,
   difficulty,
   href,
   spacing,
   showBuyButton,
   openInNewTab,
   children,
}: React.PropsWithChildren<{
   title: string;
   showStackedImages?: boolean;
   imageUrl?: string | null;
   introduction?: string | null;
   timeRequired?: string;
   difficulty?: string;
   spacing: SystemProps['margin'];
   href: string;
   showBuyButton?: string | boolean;
   openInNewTab?: boolean;
}>) {
   const difficultyTheme =
      difficulty && hasKey(DifficultyThemeLookup, difficulty)
         ? DifficultyThemeLookup[difficulty]
         : DifficultyThemeLookup[GuideDifficultyNames.Moderate];
   const { themeColor, iconColor, icon } = difficultyTheme;
   const breakpoint = useBreakpoint();
   const isMobile = breakpoint === 'base';
   const buyButtonText =
      typeof showBuyButton === 'string' ? showBuyButton : 'Buy';

   return (
      <ResourceBox>
         {imageUrl && (
            <Box width="64px" position="relative" mr={2}>
               <Box
                  width="100%"
                  borderRadius="md"
                  outline="1px solid"
                  outlineColor="gray.300"
                  aspectRatio={4 / 3}
               >
                  {showStackedImages && (
                     // Renders an empty box to fake the stacked image effect
                     <Box
                        aspectRatio="inherit"
                        width="inherit"
                        height="inherit"
                        borderRadius="inherit"
                        outline="inherit"
                        outlineColor="inherit"
                        position="absolute"
                        top="0"
                        transform="rotate(6deg)"
                     />
                  )}
                  <Image
                     outline="inherit"
                     outlineColor="inherit"
                     borderRadius="inherit"
                     objectFit="contain"
                     width="100%"
                     height="100%"
                     alt={title}
                     src={imageUrl}
                     position="relative"
                     zIndex="1"
                     bgColor="white"
                  />
               </Box>
            </Box>
         )}
         <Flex flex="1" flexDirection={{ base: 'column', sm: 'row' }}>
            <Stack
               justify="center"
               align="flex-start"
               spacing={spacing}
               alignSelf="stretch"
               flex="2"
            >
               <LinkOverlay
                  href={href}
                  lineHeight="1.07"
                  fontWeight="semibold"
                  fontSize="sm"
                  color="gray.900"
                  isExternal={openInNewTab}
               >
                  {title}
               </LinkOverlay>
               {children}
               {(timeRequired || difficulty) && (
                  <Wrap spacing={1}>
                     {timeRequired && (
                        <Badge display="flex">
                           <FaIcon icon={faClock} mr={1} color="gray.500" />
                           {timeRequired}
                        </Badge>
                     )}
                     {difficulty && (
                        <Badge display="flex" colorScheme={themeColor}>
                           <FaIcon
                              icon={icon}
                              mr={1}
                              color={
                                 (iconColor as string) || `${themeColor}.500`
                              }
                           />
                           {difficulty}
                        </Badge>
                     )}
                  </Wrap>
               )}
            </Stack>
            {isMobile && showBuyButton && (
               <BuyButton
                  colorScheme="brand"
                  buttonSize="xs"
                  openInNewTab={false}
                  url={href}
                  buyButtonText={buyButtonText}
                  margin="8px 0 0 0"
               />
            )}
            {!isMobile && showBuyButton && (
               <BuyButton
                  colorScheme="brand"
                  buttonSize="sm"
                  openInNewTab={openInNewTab}
                  url={href}
                  buyButtonText={buyButtonText}
                  margin="0 0 0 12px"
               />
            )}
         </Flex>
      </ResourceBox>
   );
}
