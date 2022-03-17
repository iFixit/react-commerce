import { Box, BoxProps, forwardRef } from '@chakra-ui/react';
import { DEFAULT_ANIMATION_DURATION_MS } from '@config/constants';

export function SecondaryNavbar(props: BoxProps) {
   return (
      <Box
         bg="white"
         borderBottomWidth="thin"
         borderColor="gray.300"
         h="12"
         {...props}
      />
   );
}

export type SecondaryNavbarItemProps = BoxProps & {
   isCurrent?: boolean;
};

export const SecondaryNavbarItem = forwardRef<SecondaryNavbarItemProps, 'div'>(
   ({ isCurrent, ...props }, ref) => {
      return (
         <Box
            ref={ref}
            as="div"
            px="3"
            fontSize="sm"
            fontWeight="bold"
            borderColor="transparent"
            borderBottomColor={isCurrent ? 'blue.500' : undefined}
            borderBottomWidth={isCurrent ? '3px' : undefined}
            borderTopWidth={isCurrent ? '3px' : undefined}
            display="flex"
            alignItems="center"
            {...props}
         />
      );
   }
);

export const SecondaryNavbarLink = forwardRef<BoxProps, 'a'>((props, ref) => {
   return (
      <Box
         ref={ref}
         as="a"
         color="gray.500"
         fontWeight="normal"
         h="full"
         mx="-3"
         px="3"
         display="flex"
         alignItems="center"
         transition={`all ${DEFAULT_ANIMATION_DURATION_MS}ms`}
         _hover={{
            color: 'gray.600',
         }}
         {...props}
      />
   );
});
