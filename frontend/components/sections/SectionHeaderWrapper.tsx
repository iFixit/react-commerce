import { Box, BoxProps } from '@chakra-ui/react';

export type SectionHeaderWrapper = BoxProps;

export function SectionHeaderWrapper({ ...props }: SectionHeaderWrapper) {
   return (
      <Box
         maxW="container.md"
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
