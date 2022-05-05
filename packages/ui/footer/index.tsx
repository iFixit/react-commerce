import {
   Box,
   BoxProps,
   Flex,
   FlexProps,
   forwardRef,
   HStack,
   Icon,
   List,
   ListIcon,
   ListItem,
   ListItemProps,
   ListProps,
   StackProps,
   Text,
   SimpleGridProps,
   SimpleGrid,
   MenuButtonProps,
   MenuButton,
   MenuItemProps,
   MenuItem,
   Link,
   LinkProps,
   Stack,
   DividerProps,
   Divider,
   TextProps,
   FormControlProps,
   FormLabelProps,
   FormControl,
   FormLabel,
   InputProps,
   Input,
} from '@chakra-ui/react';
import React from 'react';
import PageContentWrapper from '../misc/PageContentWrapper';

export const Footer = forwardRef<FlexProps, 'footer'>(
   ({ children, ...otherProps }, ref) => {
      return (
         <Flex
            ref={ref}
            as="footer"
            direction="column"
            bg="gray.900"
            color="white"
            {...otherProps}
         >
            <PageContentWrapper>{children}</PageContentWrapper>
         </Flex>
      );
   }
);

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

export type FooterNavigationLinkProps = BoxProps & {
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

export type FooterLinkProps = StackProps & {
   icon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
};

export const FooterLink = forwardRef<FooterLinkProps, 'a'>(
   ({ children, icon, ...otherProps }, ref) => {
      return (
         <HStack
            ref={ref}
            as="a"
            align="center"
            color="gray.300"
            transition="color 300ms"
            _hover={{ color: 'white' }}
            {...otherProps}
         >
            <Text fontSize="sm" lineHeight="1em" fontWeight="semibold">
               {children}
            </Text>
            {icon && <Icon as={icon} boxSize="6" filter="opacity(0.5)" />}
         </HStack>
      );
   }
);

export const FooterSettingsSection = forwardRef<StackProps, 'div'>(
   (props, ref) => {
      return (
         <Stack
            ref={ref}
            py={{
               base: 6,
               xl: 5,
            }}
            direction={{
               base: 'column',
               xl: 'row',
            }}
            spacing={{
               base: 10,
               xl: 0,
            }}
            justify="space-between"
            align="center"
            {...props}
         />
      );
   }
);

export const FooterSettings = forwardRef<StackProps, 'div'>((props, ref) => {
   return (
      <HStack
         ref={ref}
         spacing={{
            base: 6,
            sm: 12,
         }}
         {...props}
      />
   );
});

export const FooterLegalSection = forwardRef<StackProps, 'div'>(
   ({ children, ...otherProps }, ref) => {
      return (
         <Stack
            ref={ref}
            direction={{
               base: 'column-reverse',
               md: 'row',
            }}
            spacing={{
               base: 5,
               md: 0,
            }}
            py="6"
            px={{
               base: 5,
               sm: 0,
            }}
            color="gray.400"
            justify="center"
            align="center"
            {...otherProps}
         >
            {children}
         </Stack>
      );
   }
);

export const FooterCopyright = forwardRef<Omit<BoxProps, 'children'>, 'div'>(
   (props, ref) => {
      const year = new Date().getFullYear();
      return (
         <Box ref={ref} fontSize="sm" {...props}>
            &copy; {year} iFixit
         </Box>
      );
   }
);

export const FooterLegalLinkList = forwardRef<StackProps, 'div'>(
   ({ children, ...otherProps }, ref) => {
      return (
         <Stack
            ref={ref}
            fontSize="sm"
            direction={{
               base: 'column',
               md: 'row',
            }}
            spacing={{
               base: 1.5,
               md: 0,
            }}
            {...otherProps}
         >
            <Box
               px="1"
               display={{
                  base: 'none',
                  md: 'block',
               }}
            >
               —
            </Box>
            {children}
         </Stack>
      );
   }
);

export const FooterLegalLink = forwardRef<LinkProps, 'a'>((props, ref) => {
   return (
      <Link
         ref={ref}
         as="a"
         align="center"
         color="gray.400"
         transition="color 300ms"
         _hover={{ color: 'gray.100' }}
         sx={{
            _notFirst: {
               _before: {
                  content: { base: '""', md: '"-"' },
                  color: 'gray.400',
                  px: { base: 0, md: 1 },
               },
            },
         }}
         {...props}
      />
   );
});

export const FooterPartners = forwardRef<BoxProps, 'div'>(
   ({ children, ...otherProps }, ref) => {
      return (
         <Box
            ref={ref}
            mt={{
               base: 2,
               sm: 6,
               lg: 0,
            }}
            gridColumnEnd={{
               sm: 'span 3',
               lg: 'auto',
            }}
            {...otherProps}
         >
            <SimpleGrid columns={3} spacing="4">
               {children}
            </SimpleGrid>
         </Box>
      );
   }
);

export const FooterPartnerLink = forwardRef<BoxProps, 'a'>(
   ({ children, ...otherProps }, ref) => {
      return (
         <Box
            ref={ref}
            as="a"
            bg="gray.800"
            opacity="0.5"
            h="48px"
            p="4"
            borderRadius="md"
            cursor="pointer"
            transition="all 400ms"
            _hover={{
               opacity: '0.7',
            }}
            {...otherProps}
         >
            {children}
         </Box>
      );
   }
);

export type StoreMenuButtonProps = MenuButtonProps & {
   icon?: React.ReactNode;
};

export const StoreMenuButton = forwardRef<StoreMenuButtonProps, 'button'>(
   ({ children, icon, ...otherProps }, ref) => {
      return (
         <MenuButton
            ref={ref}
            color="gray.300"
            _hover={{ color: 'white' }}
            {...otherProps}
         >
            <HStack alignItems="center">
               <Text
                  color="inherit"
                  fontSize="sm"
                  lineHeight="1em"
                  fontWeight="semibold"
               >
                  {children}
               </Text>
               <StoreFlagBackdrop>{icon}</StoreFlagBackdrop>
            </HStack>
         </MenuButton>
      );
   }
);

const StoreFlagBackdrop = (props: BoxProps) => {
   return <Box p="1.5" borderRadius="base" bg="gray.800" {...props} />;
};

export type StoreMenuItemProps = Omit<MenuItemProps, 'children'> & {
   icon: React.ReactNode;
   name: string;
   currency: string;
};

export const StoreMenuItem = forwardRef<StoreMenuItemProps, 'div'>(
   ({ icon, name, currency, ...otherProps }, ref) => {
      return (
         <MenuItem ref={ref} fontSize="sm" color="black" {...otherProps}>
            <Flex w="full" align="center">
               {icon}
               <Text ref={ref} ml="3" mt="-1px" flexGrow={1}>
                  {name}
               </Text>
               <Text ref={ref} ml="2" mt="-1px" color="gray.500">
                  {currency}
               </Text>
            </Flex>
         </MenuItem>
      );
   }
);

export const FooterDivider = forwardRef<DividerProps, 'hr'>((props, ref) => {
   return <Divider ref={ref} borderColor="gray.700" {...props} />;
});

export const FooterNewsletter = forwardRef<StackProps, 'div'>((props, ref) => {
   return (
      <Stack
         ref={ref}
         direction={{
            base: 'column',
            xl: 'row',
         }}
         spacing={{
            base: 6,
            xl: 8,
         }}
         align="center"
         justifyContent="flex-end"
         w={{
            base: 'full',
            sm: 'auto',
         }}
         px={{
            base: 5,
            sm: 0,
         }}
         {...props}
      />
   );
});

export const FooterNewsletterCopy = forwardRef<BoxProps, 'div'>(
   (props, ref) => {
      return (
         <Box
            ref={ref}
            textAlign={{
               base: 'center',
               xl: 'left',
            }}
            {...props}
         />
      );
   }
);

export const FooterNewsletterTitle = forwardRef<TextProps, 'div'>(
   (props, ref) => {
      return <Text ref={ref} fontSize="sm" fontWeight="semibold" {...props} />;
   }
);

export const FooterNewsletterDescription = forwardRef<TextProps, 'div'>(
   (props, ref) => {
      return <Text ref={ref} fontSize="sm" color="gray.200" {...props} />;
   }
);

export const FooterNewsletterForm = forwardRef<StackProps, 'form'>(
   (props, ref) => {
      return (
         <HStack
            ref={ref}
            as="form"
            data-testid="footer-newsletter-form"
            spacing="3"
            w={{
               base: 'full',
               xl: 'auto',
            }}
            justify="flex-end"
            align="flex-start"
            {...props}
         />
      );
   }
);

export const FooterNewsletterFormControl = forwardRef<FormControlProps, 'div'>(
   (props, ref) => {
      return (
         <FormControl
            ref={ref}
            w={{
               base: 'full',
               sm: 96,
            }}
            maxW={{
               base: 'full',
               sm: 96,
               xl: 64,
            }}
            {...props}
         />
      );
   }
);

export const FooterNewsletterEmailLabel = forwardRef<FormLabelProps, 'label'>(
   (props, ref) => {
      return (
         <FormLabel
            ref={ref}
            htmlFor="newsletter-email-input"
            srOnly
            {...props}
         />
      );
   }
);

export const FooterNewsletterEmailInput = forwardRef<InputProps, 'input'>(
   (props, ref) => {
      return (
         <Input
            ref={ref}
            id="newsletter-email-input"
            type="email"
            variant="filled"
            bg="white"
            color="gray.900"
            fontSize="sm"
            _focus={{
               bg: 'white',
               boxShadow: 'outline',
            }}
            {...props}
         />
      );
   }
);
