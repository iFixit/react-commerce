import {
   Box,
   Flex,
   FlexProps,
   forwardRef,
   ThemeTypings,
   useTheme,
} from '@chakra-ui/react';
import { IconDefinition } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export type IconBadgeProps = FlexProps & {
   colorScheme?: ThemeTypings['colorSchemes'];
   icon?: IconDefinition;
};

export const IconBadge = forwardRef<IconBadgeProps, 'div'>(
   ({ children, colorScheme = 'gray', icon, ...props }, ref) => {
      const theme = useTheme();
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
            borderRadius="md"
            flexShrink={0}
            {...props}
         >
            {icon && (
               <Box mr="1">
                  <FontAwesomeIcon
                     icon={icon}
                     size="1x"
                     color={theme.colors[colorScheme][500]}
                     style={{ display: 'block' }}
                  />
               </Box>
            )}
            {children}
         </Flex>
      );
   }
);
