import { Badge, BadgeProps } from '@chakra-ui/react';
import * as React from 'react';

export const ProductCardBadge = (props: BadgeProps) => {
   return (
      <Badge
         textTransform="none"
         borderRadius="lg"
         px="2.5"
         py="1"
         {...props}
      />
   );
};
