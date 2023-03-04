import {
   Box,
   Flex,
   FlexProps,
   forwardRef,
   ThemeTypings,
} from '@chakra-ui/react';
import { IconDefinition } from '@fortawesome/pro-solid-svg-icons';
import { FaIcon } from '@ifixit/icons';

export type IconBadgeProps = FlexProps & {
   colorScheme?: ThemeTypings['colorSchemes'];
   icon?: IconDefinition;
};

export const IconBadge = forwardRef<IconBadgeProps, 'div'>(
   ({ children, colorScheme = 'gray', icon, ...props }, ref) => {
      return (
         <Flex
            ref={ref}
            bgColor={`${colorScheme}.100`}
            borderColor={`${colorScheme}.300`}
            borderWidth="1px"
            py="1"
            px="1.5"
            fontWeight="semibold"
            fontSize="sm"
            lineHeight="1em"
            color={`${colorScheme}.700`}
            alignItems="center"
            borderRadius="base"
            flexShrink={0}
            maxW="full"
            {...props}
         >
            {icon && (
               <Box mr="1">
                  <FaIcon
                     display="block"
                     icon={icon}
                     h="4"
                     color={`${colorScheme}.500`}
                  />
               </Box>
            )}
            <Box noOfLines={1}>{children}</Box>
         </Flex>
      );
   }
);
