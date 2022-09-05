import {
   Text,
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
   TextProps,
} from '@chakra-ui/react';

export const FooterNavigationSection = forwardRef<SimpleGridProps, 'div'>(
   ({ menu1, menu2, menu3, newsletterForm, ...props }, ref) => {
      return (
         <SimpleGrid
            ref={ref}
            columns={{
               base: 1,
               sm: 3,
               lg: 4,
            }}
            spacing="0"
            px={{
               base: 5,
               lg: 0,
            }}
            py="10"
            autoFlow="row"
            {...props}
         >
            <FooterNavigationList menu={menu1} />
            <FooterNavigationList menu={menu2} />
            <FooterNavigationList menu={menu3} />

            <NewsletterForm
               title={newsletterForm.title}
               description={newsletterForm.subtitle}
               subscribeLabel={newsletterForm.callToActionButtonTitle}
               emailPlaceholder={newsletterForm.inputPlaceholder}
            />
         </SimpleGrid>
      );
   }
);

export const FooterNavigationListHeader = (props: TextProps) => {
   return <Text fontSize="md" fontWeight="bold" color="white" {...props} />;
};

export const FooterNavigationList = forwardRef<ListProps, 'ul'>(
   ({ menu, ...otherProps }, ref) => {
      if (!menu) {
         return null;
      }
      return (
         <List
            ref={ref}
            mb={{
               base: 4,
               sm: 0,
            }}
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
            <FooterNavigationListHeader>
               {menu.title}
            </FooterNavigationListHeader>
            <FooterNavigationListItems menu={menu} />
         </List>
      );
   }
);

const FooterNavigationListItems = ({ menu }: { menu: Menu }) => {
   const listItems = menu.items.map((item, index) => {
      if (item.type === 'link') {
         return (
            <FooterNavigationItem key={index}>
               <FooterNavigationLink href={item.url}>
                  {item.name}
               </FooterNavigationLink>
            </FooterNavigationItem>
         );
      }
      return null;
   });

   return <>{listItems}</>;
};

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
