/**
 * This component is used to display product pricing information.
 * The component is aware of the logged-in user and will display the
 * pro badge if the user is a pro member.
 *
 * Disclaimer: Right now the component assumes that if there is a discount and the user is a pro member,
 * then it should show a pro badge, even if the discount is due to a general sale. The reason for this is
 * that the cart API does not return the reason for the discount, so we decided to make this assumption
 * for the time being.
 */
import {
   Box,
   BoxProps,
   forwardRef,
   Text,
   ThemeTypings,
} from '@chakra-ui/react';
import { faRectanglePro } from '@fortawesome/pro-solid-svg-icons';
import { computeDiscountPercentage, formatMoney, Money } from '@ifixit/helpers';
import { FaIcon } from '@ifixit/icons';
import { IconBadge } from '../misc';
import { useUserPrice } from './hooks/useUserPrice';

export type ProductVariantPriceProps = Omit<BoxProps, 'children'> & {
   price: Money;
   compareAtPrice?: Money | null;
   proPricesByTier?: Record<string, Money> | null;
   showDiscountLabel?: boolean;
   formatDiscountLabel?: (discountPercentage: number) => string;
   size?: 'large' | 'medium' | 'small';
   direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
};

export const ProductVariantPrice = forwardRef<ProductVariantPriceProps, 'div'>(
   (
      {
         price,
         compareAtPrice,
         proPricesByTier,
         showDiscountLabel,
         formatDiscountLabel = (discountPercentage) =>
            `${discountPercentage}% OFF`,
         size,
         direction,
         ...other
      },
      ref
   ) => {
      const userPrice = useUserPrice({
         price,
         compareAtPrice,
         proPricesByTier,
      });
      const discountPercentage =
         userPrice.compareAtPrice != null
            ? computeDiscountPercentage(
                 userPrice.price,
                 userPrice.compareAtPrice
              )
            : 0;
      const isDiscounted = discountPercentage > 0;
      return (
         <ProductPrice
            ref={ref}
            formattedPrice={formatMoney(userPrice.price)}
            formattedCompareAtPrice={
               userPrice.compareAtPrice
                  ? formatMoney(userPrice.compareAtPrice)
                  : null
            }
            isDiscounted={isDiscounted}
            discountLabel={
               isDiscounted
                  ? formatDiscountLabel(discountPercentage)
                  : undefined
            }
            showDiscountLabel={showDiscountLabel}
            showProBadge={userPrice.isProPrice && isDiscounted}
            size={size}
            colorScheme={userPrice.isProPrice ? 'orange' : 'red'}
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
   direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
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
         size = 'medium',
         colorScheme = 'red',
         direction = 'row',
         ...other
      },
      ref
   ) => {
      const priceFontSize =
         size === 'large' ? 'xl' : size === 'medium' ? 'md' : 'sm';
      const compareAtPriceFontSize = size === 'large' ? 'md' : 'sm';
      const isHorizontal = direction === 'row' || direction === 'row-reverse';

      return (
         <Box
            ref={ref}
            display="flex"
            flexDir={direction}
            alignSelf="flex-start"
            alignItems={isHorizontal ? 'center' : 'flex-end'}
            {...other}
         >
            <Text
               mr={isHorizontal ? 1 : 0}
               fontSize={priceFontSize}
               fontWeight="semibold"
               color={isDiscounted ? `${colorScheme}.600` : 'gray.900'}
               data-testid="current-price"
            >
               {showProBadge && !isHorizontal && (
                  <FaIcon
                     icon={faRectanglePro}
                     h="4"
                     mr="1.5"
                     color={`${colorScheme}.500`}
                     display="inline-block"
                  />
               )}
               {formattedPrice}
            </Text>
            {isDiscounted && (
               <>
                  <Text
                     mr={isHorizontal ? '10px' : 0}
                     fontSize={compareAtPriceFontSize}
                     color="gray.500"
                     textDecor="line-through"
                     data-testid="compare-at-price"
                  >
                     {formattedCompareAtPrice}
                  </Text>
                  {isDiscounted && showDiscountLabel && isHorizontal && (
                     <IconBadge
                        icon={showProBadge ? faRectanglePro : undefined}
                        colorScheme={colorScheme}
                        data-testid="product-discount"
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
