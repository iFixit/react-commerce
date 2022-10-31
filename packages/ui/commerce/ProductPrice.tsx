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
   direction?: 'row' | 'column' | 'column-reverse';
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
               color={isDiscounted ? `${colorScheme}.600` : 'gray.900'}
               data-testid="product-price"
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
