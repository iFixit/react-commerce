import {
   Box,
   Flex,
   FlexProps,
   forwardRef,
   ThemeTypings,
   useMultiStyleConfig,
} from '@chakra-ui/react';
import { IconDefinition } from '@fortawesome/pro-solid-svg-icons';
import { FaIcon } from '@ifixit/icons';

type IconBadgeSize = 'tiny' | 'small' | 'base';

export type IconBadgeProps = FlexProps & {
   size?:
      | IconBadgeSize
      | Partial<Record<ThemeTypings['breakpoints'] | string, IconBadgeSize>>;
   colorScheme?: ThemeTypings['colorSchemes'];
   icon?: IconDefinition;
};

export const IconBadge = forwardRef<IconBadgeProps, 'div'>(
   (
      { children, size = 'small', colorScheme = 'gray', icon, ...props },
      ref
   ) => {
      const styles = useMultiStyleConfig('IconBadge', { size });

      return (
         <Flex
            ref={ref}
            __css={styles.container}
            bgColor={`${colorScheme}.100`}
            borderColor={`${colorScheme}.300`}
            color={`${colorScheme}.700`}
            {...props}
         >
            {icon && (
               <FaIcon
                  __css={styles.icon}
                  icon={icon}
                  color={`${colorScheme}.500`}
               />
            )}
            <Box __css={styles.label}>{children}</Box>
         </Flex>
      );
   }
);
