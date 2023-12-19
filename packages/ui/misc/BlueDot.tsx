import { Circle, SquareProps } from '@chakra-ui/react';

export function BlueDot(props: SquareProps) {
   return (
      <Circle
         size="3.5"
         bg="brand.500"
         borderRadius="full"
         borderWidth={2}
         borderColor="gray.900"
         {...props}
      />
   );
}
