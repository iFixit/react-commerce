import { FaIcon } from '@ifixit/icons';
import {
   Box,
   BoxProps,
   forwardRef,
   Text,
   ThemeTypings,
   useTheme,
} from '@chakra-ui/react';
import { IconBadge } from '@components/ui';
import { faRectanglePro } from '@fortawesome/pro-solid-svg-icons';
import {
   computeDiscountPercentage,
   formatShopifyPrice,
   Money,
} from '@helpers/commerce-helpers';

export type ProductVariantPriceProps = Omit<BoxProps, 'children'> & {
   price: Money;
   compareAtPrice?: Money | null;
   showProBadge?: boolean;
   showDiscountLabel?: boolean;
   formatDiscountLabel?: (discountPercentage: number) => string;
   size?: 'large' | 'medium' | 'small';
   colorScheme?: ThemeTypings['colorSchemes'];
   direction?: 'row' | 'column' | 'column-reverse';
};

export const ProductVariantPrice = forwardRef<ProductVariantPriceProps, 'div'>(
   (
      {
         price,
         compareAtPrice,
         showProBadge,
         showDiscountLabel,
         formatDiscountLabel = (discountPercentage) =>
            `${discountPercentage}% OFF`,
         size,
         colorScheme,
         direction,
         ...other
      },
      ref
   ) => {
      const discountPercentage =
         compareAtPrice != null
            ? computeDiscountPercentage(price, compareAtPrice)
            : 0;
      const isDiscounted = discountPercentage > 0;
      return (
         <ProductPrice
            ref={ref}
            formattedPrice={formatShopifyPrice(price)}
            formattedCompareAtPrice={
               compareAtPrice ? formatShopifyPrice(compareAtPrice) : null
            }
            isDiscounted={isDiscounted}
            discountLabel={
               isDiscounted
                  ? formatDiscountLabel(discountPercentage)
                  : undefined
            }
            showDiscountLabel={showDiscountLabel}
            showProBadge={showProBadge}
            size={size}
            colorScheme={colorScheme}
            direction={direction}
            {...other}
         />
      );
   }
);

type ProductPriceProps = {
   formattedPrice: string;
   formattedCompareAtPrice?: string | null;
   isDiscounted: boolean;
   discountLabel?: string;
   showDiscountLabel?: boolean;
   showProBadge?: boolean;
   size?: 'large' | 'medium' | 'small';
   colorScheme?: ThemeTypings['colorSchemes'];
   direction?: 'row' | 'column' | 'column-reverse';
};

const ProductPrice = forwardRef<BoxProps & ProductPriceProps, 'div'>(
   (
      {
         formattedPrice,
         formattedCompareAtPrice,
         isDiscounted,
         discountLabel,
         showDiscountLabel = true,
         showProBadge = false,
         size = 'large',
         colorScheme = 'red',
         direction = 'row',
         ...other
      },
      ref
   ) => {
      const theme = useTheme();
      const priceFontSize =
         size === 'large' ? 'xl' : size === 'medium' ? 'md' : 'sm';
      const compareAtPriceFontSize = size === 'large' ? 'md' : 'sm';

      return (
         <Box
            ref={ref}
            display="flex"
            flexDir={direction}
            alignSelf="flex-start"
            alignItems={direction === 'row' ? 'center' : 'flex-end'}
            {...other}
         >
            <Text
               mr={direction === 'row' ? 1 : 0}
               fontSize={priceFontSize}
               fontWeight="semibold"
               color={
                  isDiscounted ? theme.colors[colorScheme][600] : 'gray.900'
               }
            >
               {showProBadge && direction !== 'row' && (
                  <FaIcon
                     icon={faRectanglePro}
                     h="4"
                     mr="1.5"
                     color={`${colorScheme}.500`}
                  />
               )}
               {formattedPrice}
            </Text>
            {isDiscounted && (
               <>
                  <Text
                     mr={direction === 'row' ? '10px' : 0}
                     fontSize={compareAtPriceFontSize}
                     color="gray.500"
                     textDecor="line-through"
                  >
                     {formattedCompareAtPrice}
                  </Text>
                  {isDiscounted && showDiscountLabel && direction === 'row' && (
                     <IconBadge
                        icon={showProBadge ? faRectanglePro : undefined}
                        colorScheme={colorScheme}
                     >
                        {discountLabel}
                     </IconBadge>
                  )}
               </>
            )}
         </Box>
      );
   }
);
