import * as React from 'react';
import {
   Box,
   forwardRef,
   List,
   ListIcon,
   ListItem,
   ListProps,
   SimpleGrid,
   Text,
} from '@chakra-ui/react';
import type { BoxProps, ListItemProps, SimpleGridProps } from '@chakra-ui/react';
import { NewsletterComponent } from './Newsletter';
import type { NewsletterFormProps } from './Newsletter';
import type { Menu as MenuType, MenuItem } from '@ifixit/ui';
import { useTrackedOnClick } from '../hooks/useTrackedOnClick';

type NavSectionProps = {
   menu1: MenuType | null;
   menu2: MenuType | null;
   menu3: MenuType | null;
   newsletterForm: NewsletterFormProps;
};

export const NavigationSection = ({
   menu1,
   menu2,
   menu3,
   newsletterForm,
}: NavSectionProps) => {
   return (
      <FooterNavigationSection p={5}>
         <FooterNavigationList pl={-5}>
            <NavigationColumn menu={menu1} />
         </FooterNavigationList>
         <FooterNavigationList pl={-5}>
            <NavigationColumn menu={menu2} />
         </FooterNavigationList>
         <FooterNavigationList pl={-5}>
            <NavigationColumn menu={menu3} />
         </FooterNavigationList>
         <NewsletterComponent newsletterForm={newsletterForm} />
      </FooterNavigationSection>
   );
};

const NavigationColumn = ({ menu }: { menu: MenuType | null }) => {
   console.log('Menu: ', menu);

   if (!menu) {
      return null;
   }
   return (
      <>
         <Text fontSize="lg" fontWeight="bold" color="white" my={2}>
            {menu.title}
         </Text>
         <FooterNavigationListItems menu={menu} />
      </>
   );
};

const FooterNavigationListItems = ({ menu }: { menu: MenuType }) => {
   const listItems = menu.items.map((item: MenuItem, index: number) => {
      console.log('Item: ', item);
      if (item.type !== 'link') {
         return null;
      }

      return (
         <FooterNavigationItem key={index}>
            <FooterNavigationLink
               fontSize="md"
               fontWeight="normal"
               m={0}
               p={0}
               color="gray.300"
               _visited={{ color: 'gray.300' }}
               _hover={{ color: 'white', textDecoration: 'none' }}
               sx={{
                  '&:visited:hover': {
                     color: 'white',
                  },
               }}
               href={item.url}
            >
               {item.name}
            </FooterNavigationLink>
         </FooterNavigationItem>
      );
   });

   return <>{listItems}</>;
};

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
   return <ListItem py="1" fontSize="sm" color="gray.300" {...props} />;
};

type FooterNavigationLinkProps = BoxProps & {
   icon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
};

export const FooterNavigationLink = forwardRef<FooterNavigationLinkProps, 'a'>(
   ({ icon, children, ...otherProps }, ref) => {
      const trackedOnClick = useTrackedOnClick({
         clickName: children?.toString(),
         ...otherProps,
      });
      return (
         <Box
            ref={ref}
            as="a"
            onClick={trackedOnClick}
            cursor="pointer"
            transition="all 400ms"
            _hover={{
               color: 'white',
               textDecoration: 'none',
            }}
            {...otherProps}
         >
            {icon && <ListIcon as={icon} boxSize="4" filter="opacity(0.5)" />}
            {children}
         </Box>
      );
   }
);
