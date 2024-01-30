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
   useMultiStyleConfig,
   VisuallyHidden,
} from '@chakra-ui/react';
import { faRectanglePro } from '@fortawesome/pro-solid-svg-icons';
import { computeDiscountPercentage, formatMoney, Money } from '@ifixit/helpers';
import { FaIcon } from '@ifixit/icons';
import { IconBadge } from '../misc';
import { useUserPrice } from './hooks/useUserPrice';

type ProductPriceSize = 'extra-small' | 'small' | 'medium' | 'large';
type ProductPriceVariant = 'normal' | 'subdued';

export type ProductVariantPriceProps = Omit<BoxProps, 'children'> & {
   price: Money;
   compareAtPrice?: Money | null;
   proPricesByTier?: Record<string, Money> | null;
   showDiscountLabel?: boolean;
   formatDiscountLabel?: (discountPercentage: number) => string;
   size?:
      | ProductPriceSize
      | Partial<Record<ThemeTypings['breakpoints'], ProductPriceSize>>;
   direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
   variant?: ProductPriceVariant;
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
         variant = 'normal',
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
            colorScheme={userPrice.isProPrice ? 'amber' : 'red'}
            direction={direction}
            variant={variant}
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
   size?:
      | ProductPriceSize
      | Partial<Record<ThemeTypings['breakpoints'], ProductPriceSize>>;
   colorScheme?: ThemeTypings['colorSchemes'];
   direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
   variant: ProductPriceVariant;
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
         variant,
         ...other
      },
      ref
   ) => {
      const styles = useMultiStyleConfig('ProductPrice', { size });
      const isHorizontal = direction === 'row' || direction === 'row-reverse';

      return (
         <Box
            ref={ref}
            __css={styles.container}
            flexDir={direction}
            alignItems={isHorizontal ? 'center' : 'flex-end'}
            {...other}
         >
            <Text
               sx={styles.price}
               color={
                  isDiscounted
                     ? `${colorScheme}.600`
                     : variant === 'normal'
                     ? 'gray.900'
                     : 'gray.600'
               }
               data-testid="price"
            >
               {showProBadge && !isHorizontal && (
                  <FaIcon
                     __css={styles.proBadgeVertical}
                     icon={faRectanglePro}
                     color={`${colorScheme}.500`}
                  />
               )}
               <VisuallyHidden>Sale price </VisuallyHidden>
               {formattedPrice}
            </Text>
            {isDiscounted && (
               <>
                  <Text
                     sx={styles.compareAtPrice}
                     ml={direction === 'row' ? 1 : 0}
                     mr={direction === 'row-reverse' ? 1 : 0}
                     data-testid="compare-at-price"
                  >
                     <VisuallyHidden>Regular price </VisuallyHidden>
                     {formattedCompareAtPrice}
                  </Text>
                  {isDiscounted && showDiscountLabel && isHorizontal && (
                     <IconBadge
                        sx={styles.proBadgeHorizontal}
                        ml={direction === 'row' ? '10px' : 0}
                        mr={direction === 'row-reverse' ? '10px' : 0}
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
