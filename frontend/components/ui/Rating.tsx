import {
   Box,
   Flex,
   FlexProps,
   forwardRef,
   HStack,
   StackProps,
} from '@chakra-ui/react';
import { FaStar, FaStarHalf } from 'react-icons/fa';

export interface RatingProps extends StackProps {
   value?: number;
}

const stars = new Array(5).fill(null).map((_, index) => index + 1);

export const Rating = (props: RatingProps) => {
   const { value = 5, ...rest } = props;

   const halfStarsValue = Math.round(value * 2);

   return (
      <HStack spacing="1" {...rest}>
         {stars.map((i) => {
            let appearance = RatingStarAppearance.Empty;
            if (halfStarsValue >= i * 2) {
               appearance = RatingStarAppearance.Full;
            } else if (halfStarsValue >= i * 2 - 1) {
               appearance = RatingStarAppearance.Half;
            }
            return <RatingStar key={i} appearence={appearance} />;
         })}
      </HStack>
   );
};

type RatingStarProps = FlexProps & {
   appearence: RatingStarAppearance;
};

export enum RatingStarAppearance {
   Full = 'full',
   Half = 'half',
   Empty = 'empty',
}

export const RatingStar = forwardRef<RatingStarProps, 'div'>(
   ({ appearence = RatingStarAppearance.Empty, ...otherProps }, ref) => {
      switch (appearence) {
         case RatingStarAppearance.Empty: {
            return (
               <Flex
                  ref={ref}
                  as={FaStar}
                  color="gray.300"
                  fontSize="larger"
                  {...otherProps}
               />
            );
         }
         case RatingStarAppearance.Full: {
            return (
               <Flex
                  ref={ref}
                  as={FaStar}
                  color="blue.500"
                  fontSize="larger"
                  {...otherProps}
               />
            );
         }
         case RatingStarAppearance.Half: {
            return (
               <Flex ref={ref} {...otherProps}>
                  <Box
                     as={FaStarHalf}
                     color="blue.500"
                     fontSize="larger"
                     w="19px"
                  />
                  <Box
                     as={FaStarHalf}
                     color="gray.300"
                     fontSize="larger"
                     transform="scaleX(-1)"
                     position="absolute"
                     w="19px"
                  />
               </Flex>
            );
         }
      }
   }
);
