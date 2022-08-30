import {
   Box,
   BoxProps,
   forwardRef,
   List,
   ListIcon,
   ListItem,
   ListItemProps,
   ListProps,
   SimpleGrid,
   SimpleGridProps,
} from '@chakra-ui/react';

export const FooterNavigationSection = forwardRef<SimpleGridProps, 'div'>(
   (props, ref) => {
      return (
         <SimpleGrid
            ref={ref}
            columns={{
               base: 1,
               sm: 3,
               lg: 4,
            }}
            spacing="4"
            px={{
               base: 5,
               sm: 0,
            }}
            py="10"
            autoFlow="row"
            {...props}
         />
      );
   }
);

export const FooterNavigationList = forwardRef<ListProps, 'ul'>(
   ({ children, ...otherProps }, ref) => {
      return (
         <List
            ref={ref}
            pb={{
               base: 4,
               sm: 0,
            }}
            borderBottomWidth={{
               base: 'thin',
               sm: 0,
            }}
            borderBottomColor="gray.700"
            {...otherProps}
         >
            {children}
         </List>
      );
   }
);

export const FooterNavigationItem = (props: ListItemProps) => {
   return (
      <ListItem
         py="1"
         fontSize="sm"
         fontWeight="black"
         color="gray.300"
         {...props}
      />
   );
};

type FooterNavigationLinkProps = BoxProps & {
   icon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
};

export const FooterNavigationLink = forwardRef<FooterNavigationLinkProps, 'a'>(
   ({ icon, children, ...otherProps }, ref) => {
      return (
         <Box
            ref={ref}
            as="a"
            cursor="pointer"
            transition="all 400ms"
            _hover={{
               color: 'white',
            }}
            {...otherProps}
         >
            {icon && <ListIcon as={icon} boxSize="4" filter="opacity(0.5)" />}
            {children}
         </Box>
      );
   }
);
