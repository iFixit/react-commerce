import { Box, Text, ThemeTypings } from '@chakra-ui/react';
import { IconBadge } from '@components/ui';
import { faRectanglePro } from '@fortawesome/pro-solid-svg-icons';
import { FaIcon } from '@ifixit/icons';

export type ProductPriceProps = {
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

export function ProductPrice({
   formattedPrice,
   formattedCompareAtPrice,
   isDiscounted,
   discountLabel,
   showDiscountLabel = true,
   showProBadge = false,
   size = 'large',
   colorScheme = 'red',
   direction = 'row',
}: ProductPriceProps) {
   const priceFontSize =
      size === 'large' ? 'xl' : size === 'medium' ? 'md' : 'sm';
   const compareAtPriceFontSize = size === 'large' ? 'md' : 'sm';

   return (
      <Box
         display="flex"
         flexDir={direction}
         alignSelf="flex-start"
         alignItems={direction === 'row' ? 'center' : 'flex-end'}
      >
         <Text
            mr={direction === 'row' ? 1 : 0}
            fontSize={priceFontSize}
            fontWeight="semibold"
            color={isDiscounted ? `${colorScheme}.600` : 'gray.900'}
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
