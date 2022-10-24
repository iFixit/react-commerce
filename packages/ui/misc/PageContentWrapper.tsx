import { Box, BoxProps } from '@chakra-ui/react';

export type PageContentWrapperProps = BoxProps & {
   /**
    * This makes the wrapper handle mobile padding. This should be done by default,
    * but there are usages of this component previous to this change that already
    * handle mobile padding. To enable a gradual migration, we add this prop.
    * When all usages of this component are migrated, we can remove this prop.
    */
   isResponsive?: boolean;
};

export function PageContentWrapper({
   isResponsive,
   ...props
}: PageContentWrapperProps) {
   return (
      <Box
         w={{ base: 'full', lg: '960px', xl: '1100px' }}
         mx="auto"
         px={{
            base: isResponsive ? 5 : 0,
            sm: 6,
            lg: 0,
         }}
         {...props}
      />
   );
}
