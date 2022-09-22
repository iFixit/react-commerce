import { HStack, StackProps, Text } from '@chakra-ui/react';
import { Rating } from '@components/ui';

export type ProductRatingProps = StackProps & {
   rating: number;
   count: number;
};

export const ProductRating = ({
   rating,
   count,
   ...stackProps
}: ProductRatingProps) => {
   if (rating < 4 && count <= 10) {
      return null;
   }
   return (
      <HStack {...stackProps} align="flex-end">
         <Rating value={rating} />
         <Text lineHeight="1em">{count}</Text>
      </HStack>
   );
};
