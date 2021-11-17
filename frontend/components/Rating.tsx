import { Box, Flex, HStack, StackProps } from '@chakra-ui/react';
import * as React from 'react';
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
            const isFirstHalfFilled = halfStarsValue >= i * 2 - 1;
            const isSecondHalfFilled = halfStarsValue >= i * 2;
            if (isSecondHalfFilled) {
               return (
                  <Box key={i} as={FaStar} color="blue.500" fontSize="larger" />
               );
            }
            return (
               <Flex key={i}>
                  <Box
                     as={FaStarHalf}
                     color={isFirstHalfFilled ? 'blue.500' : 'gray.300'}
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
         })}
      </HStack>
   );
};
