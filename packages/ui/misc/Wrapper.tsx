import { Box, BoxProps } from '@chakra-ui/react';

export type WrapperProps = BoxProps;

export function Wrapper({ ...props }: WrapperProps) {
   return (
      <Box
         w="full"
         maxW="80rem"
         mx="auto"
         px={{
            base: 4,
            md: 6,
            lg: 8,
         }}
         {...props}
      />
   );
}
