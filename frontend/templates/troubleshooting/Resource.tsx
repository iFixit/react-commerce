import {
   Stack,
   Image,
   Badge,
   StackProps,
   Link,
   Wrap,
   HStack,
   Text,
   Box,
   SystemProps,
   Button,
   ButtonProps,
   ThemingProps,
   useBreakpoint,
} from '@chakra-ui/react';
import { Guide } from './hooks/GuideModel';
import { FaIcon } from '@ifixit/icons';
import { faClock } from '@fortawesome/pro-solid-svg-icons';
import Prerendered from './prerendered';
import { DifficultyThemeLookup, GuideDifficultyNames } from './DifficultyBadge';
import { Product } from '@models/product';
import { useSelectedVariant } from '@templates/product/hooks/useSelectedVariant';
import { useIsProductForSale } from '../product/hooks/useIsProductForSale';
import { Rating } from '@components/ui';
import { Money, formatMoney, shouldShowProductRating } from '@ifixit/helpers';

export function GuideResource({ guide }: { guide: Guide }) {
   return (
      <Resource
         href={guide.url}
         title={guide.title}
         imageUrl={guide.image.thumbnail}
         timeRequired={guide.time_required}
         difficulty={guide.difficulty}
         spacing="6px"
      >
         {guide.introduction_rendered && (
            <Prerendered
               lineHeight="1.36"
               fontWeight="regular"
               fontSize="12px"
               color="gray.600"
               overflow="hidden"
               height="16px"
               noOfLines={1}
               html={guide.introduction_rendered}
            />
         )}
      </Resource>
   );
}

export function ProductResource({ product }: { product: Product }) {
   const [selectedVariant, _setSelectedVariant] = useSelectedVariant(product);
   const isForSale = useIsProductForSale(product);
   const productUrl = `/products/${product.handle}`;

   return (
      <Resource
         href={productUrl}
         title={product.title}
         imageUrl={
            selectedVariant.image?.url ||
            product.images[0]?.thumbnailUrl ||
            product.images[0]?.url
         }
         spacing="4px"
         showBuyButton={isForSale}
         openInNewTab={true}
      >
         {isForSale && <ResourceProductRating product={product} />}
         {isForSale && <ResourceProductPrice price={selectedVariant.price} />}
      </Resource>
   );
}

function ResourceProductRating({ product }: { product: Product }) {
   if (!shouldShowProductRating(product.reviews)) {
      return null;
   }
   return (
      <HStack spacing="6px" fontWeight={400}>
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
         <Text fontSize="12px" color="gray.600" fontWeight={510}>
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
}: {
   url: string;
   buyButtonText: string;
   buttonStyling?: ButtonProps;
   buttonSize: ThemingProps<'Button'>['size'];
   openInNewTab?: boolean;
   colorScheme: ThemingProps<'Button'>['colorScheme'];
}) {
   const openSettings = openInNewTab
      ? { target: '_blank', rel: 'noopener' }
      : {};

   return (
      <Button
         as="a"
         href={url}
         {...openSettings}
         alignSelf={{ md: 'flex-start', sm: 'flex-start', base: 'flex-end' }}
         flexShrink={0}
         size={buttonSize}
         colorScheme={colorScheme}
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
      <Stack
         alignSelf="stretch"
         justify="flex-start"
         align="flex-start"
         spacing="0px"
         overflow="hidden"
         borderColor="gray.400"
         borderWidth="1px"
         borderRadius="4px"
         minHeight="88px"
         {...props}
      >
         {children}
      </Stack>
   );
}

// https://dev.to/mapleleaf/indexing-objects-in-typescript-1cgi
function hasKey<O>(obj: O, key: PropertyKey): key is keyof O {
   return key in obj;
}

function Resource({
   title,
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
   imageUrl?: string | null;
   introduction?: string | null;
   timeRequired?: string;
   difficulty?: string;
   spacing: SystemProps['margin'];
   href: string;
   showBuyButton?: boolean;
   openInNewTab?: boolean;
}>) {
   const difficultyTheme =
      difficulty && hasKey(DifficultyThemeLookup, difficulty)
         ? DifficultyThemeLookup[difficulty]
         : DifficultyThemeLookup[GuideDifficultyNames.Moderate];
   const { themeColor, iconColor, icon } = difficultyTheme;
   const breakpoint = useBreakpoint();
   const isMobile = breakpoint === 'base';

   return (
      <ResourceBox>
         <Stack
            padding="12px"
            direction="row"
            justify="flex-start"
            align="center"
            alignSelf="stretch"
            spacing="8px"
         >
            {imageUrl && (
               <Link href={href} isExternal={openInNewTab}>
                  <Image
                     boxSize="64px"
                     border="1px solid"
                     borderColor="gray.300"
                     borderRadius="4px"
                     objectFit="cover"
                     alt={title}
                     src={imageUrl}
                  />
               </Link>
            )}
            <Stack
               justify="center"
               align="flex-start"
               spacing={spacing}
               flex="1"
               overflow="hidden"
            >
               <Stack
                  justify="flex-start"
                  align="flex-start"
                  spacing={spacing}
                  alignSelf="stretch"
               >
                  <Link
                     href={href}
                     lineHeight="1.07"
                     fontWeight="semibold"
                     fontSize="14px"
                     color="gray.900"
                     isExternal={openInNewTab}
                  >
                     {title}
                  </Link>
                  {children}
               </Stack>
               {(timeRequired || difficulty) && (
                  <Wrap spacing="4px">
                     {timeRequired && (
                        <Badge display="flex">
                           <FaIcon icon={faClock} mr="4px" color="gray.500" />
                           {timeRequired}
                        </Badge>
                     )}
                     {difficulty && (
                        <Badge display="flex" colorScheme={themeColor}>
                           <FaIcon
                              icon={icon}
                              mr="4px"
                              color={iconColor || `${themeColor}.500`}
                           />
                           {difficulty}
                        </Badge>
                     )}
                  </Wrap>
               )}
               {isMobile && showBuyButton && (
                  <BuyButton
                     colorScheme="brand"
                     buttonSize="xs"
                     openInNewTab={false}
                     url={href}
                     buyButtonText="Buy"
                  />
               )}
            </Stack>
            {!isMobile && showBuyButton && (
               <BuyButton
                  colorScheme="brand"
                  buttonSize="sm"
                  openInNewTab={openInNewTab}
                  url={href}
                  buyButtonText="Buy"
               />
            )}
         </Stack>
      </ResourceBox>
   );
}
