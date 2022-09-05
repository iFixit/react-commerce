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
import { Menu } from '@models/menu';
import { GlobalSettings } from '@models/global-settings';
import { NewsletterForm } from './Newsletter';

// Since Strapi does not have a 'menu3' yet, the prop is optional in store.ts.
// This means that it could be undefined. Once we merge the footers (and Strapi
// gets a 'menu3') we can make this type Menu | null.
type FooterNavigationSectionProps = SimpleGridProps & {
   menu1: Menu | null;
   menu2: Menu | null;
   menu3: Menu | null | undefined;
   newsletterForm: GlobalSettings['newsletterForm'];
};

export const FooterNavigationSection = forwardRef<
   FooterNavigationSectionProps,
   'div'
>(({ menu1, menu2, menu3, newsletterForm, ...props }, ref) => {
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
});

export const FooterNavigationListHeader = (props: TextProps) => {
   return <Text fontSize="md" fontWeight="bold" color="white" {...props} />;
};

// See the comment above about 'undefined'.
type FooterNavigationListProps = ListProps & {
   menu: Menu | null | undefined;
};

export const FooterNavigationList = forwardRef<FooterNavigationListProps, 'ul'>(
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
