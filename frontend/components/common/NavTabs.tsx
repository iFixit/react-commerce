import {
   Box,
   BoxProps,
   Flex,
   FlexProps,
   Link,
   LinkProps,
} from '@chakra-ui/react';

type NavTab = {
   isCurrentPage?: boolean;
   name: string;
   url?: string;
};

export function NavTabs({
   tabs,
   ...props
}: {
   tabs: NavTab[];
} & FlexProps) {
   // The type here works because all the styles we want to use are available on
   // both Box and Link
   const baseStyleProps: BoxProps & LinkProps = {
      outline: '2px solid transparent',
      outlineOffset: '2px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 2,
      paddingBottom: 2,
      paddingInlineStart: 4,
      paddingInlineEnd: 4,
      position: 'relative',
      fontSize: 'sm',
   };

   const bottomFeedbackStyleProps = {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '3px',
      borderRadius: '2px 2px 0px 0px',
   };

   const selectedStyleProps = {
      ...baseStyleProps,
      borderColor: 'blue.500',
      color: 'gray.900',
      fontWeight: 'medium',
      _visited: {
         color: 'gray.900',
      },
      _hover: {
         textDecoration: 'none',
         background: 'gray.100',
         '::after': {
            background: 'blue.700',
         },
      },
      _after: {
         ...bottomFeedbackStyleProps,
         background: 'blue.500',
      },
   };

   const notSelectedStyleProps = {
      ...baseStyleProps,
      borderColor: 'transparent',
      color: 'gray.500',
      fontWeight: 'normal',
      _hover: {
         textDecoration: 'none',
      },
      _visited: {
         color: 'gray.500',
      },
      sx: {
         '&:hover:not(.isDisabled)': {
            color: 'gray.700',
            background: 'gray.100',
         },
         '&.isDisabled': {
            opacity: 0.4,
            cursor: 'not-allowed',
            color: 'gray.700',
            background: 'gray.100',
         },
      },
   };

   return (
      <Flex
         overflowX="auto"
         flexGrow="1"
         paddingInline={{ base: 0, sm: 2 }}
         gap={1.5}
         height="100%"
         borderLeftWidth={{ base: '1px', xl: '0' }}
         {...props}
      >
         {tabs.map((tab: NavTab) =>
            tab.isCurrentPage ? (
               <Box key={tab.name} {...selectedStyleProps}>
                  {tab.name}
               </Box>
            ) : tab.url ? (
               <Link key={tab.name} {...notSelectedStyleProps} href={tab.url}>
                  {tab.name}
               </Link>
            ) : (
               <Box
                  key={tab.name}
                  className="isDisabled"
                  {...notSelectedStyleProps}
               >
                  {tab.name}
               </Box>
            )
         )}
      </Flex>
   );
}
