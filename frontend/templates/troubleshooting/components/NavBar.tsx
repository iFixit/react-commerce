import {
   Box,
   BoxProps,
   Button,
   Flex,
   FlexProps,
   IconButton,
   Link,
   LinkProps,
   Menu,
   MenuButton,
   MenuItem,
   MenuList,
} from '@chakra-ui/react';
import { BreadCrumbs } from '@ifixit/breadcrumbs';
import type { BreadcrumbEntry } from '../hooks/useTroubleshootingProps';
import {
   faPenToSquare,
   faAngleDown,
   faClockRotateLeft,
} from '@fortawesome/pro-solid-svg-icons';
import { FaIcon } from '@ifixit/icons';
import { SecondaryNavbarItem, SecondaryNavbarLink } from '@components/common';

export function NavBar({
   editUrl,
   historyUrl,
   deviceGuideUrl,
   devicePartsUrl,
   breadcrumbs,
}: {
   editUrl: string;
   historyUrl: string;
   breadcrumbs: BreadcrumbEntry[];
} & NavTabsProps) {
   const bc = breadcrumbs.map((breadcrumb) => ({
      label: breadcrumb.title,
      url: breadcrumb.url,
   }));
   const padding = { base: '16px', sm: '32px' };
   const breadcrumbMinHeight = '48px';
   return (
      <Flex
         w="100%"
         backgroundColor="white"
         borderBottomColor="gray.200"
         borderBottomWidth={{ base: '0', sm: '1px' }}
         justify="center"
         minHeight={breadcrumbMinHeight}
      >
         <Flex
            className="NavBar"
            maxW="1280px"
            width="100%"
            flexDirection={{ base: 'column-reverse', sm: 'row' }}
            justify="stretch"
         >
            <BreadCrumbs
               breadCrumbs={bc.slice(0, -1)}
               paddingInline={padding}
               minHeight={breadcrumbMinHeight}
               borderTop={{ base: '1px', sm: '0' }}
               borderTopColor="gray.200"
               bgColor={{ base: 'blueGray.50', sm: 'transparent' }}
               fontSize={{ base: '13px', md: '14px' }}
            />
            <Flex flexShrink="1" fontSize="14px">
               <Box
                  sx={{
                     '::before, ::after': {
                        minWidth: padding,
                        display: { base: 'default', sm: 'none' },
                        position: 'absolute',
                        top: '0',
                        content: '""',
                        height: '100%',
                        zIndex: '1',
                        isolation: 'isolate',
                     },
                     '::before': {
                        left: '0',
                        background:
                           'linear-gradient(to right, #fff 60%, rgba(255, 255, 255, 0))',
                     },
                     '::after': {
                        right: '0',
                        background:
                           'linear-gradient(to left, #fff 60%, rgba(255, 255, 255, 0))',
                     },
                  }}
                  position="relative"
                  flex="1 2"
                  overflowX="auto"
               >
                  <NavTabs
                     deviceGuideUrl={deviceGuideUrl}
                     devicePartsUrl={devicePartsUrl}
                  />
               </Box>
               <EditButton editUrl={editUrl} />
               <ActionsMenu historyUrl={historyUrl} />
            </Flex>
         </Flex>
      </Flex>
   );
}

function EditButton({ editUrl }: { editUrl: string }) {
   return (
      <Button
         leftIcon={<FaIcon icon={faPenToSquare} />}
         variant="link"
         as={Link}
         bgColor="transparent"
         textColor="brand"
         borderLeftColor="gray.200"
         borderLeftWidth="1px"
         borderRightColor="gray.200"
         borderRightWidth="1px"
         borderRadius="0px"
         py="9px"
         px={4}
         fontFamily="heading"
         lineHeight="1.29"
         fontWeight="semibold"
         fontSize="sm"
         color="brand.500"
         textAlign="center"
         href={editUrl}
         minW="fit-content"
      >
         Edit
      </Button>
   );
}

function ActionsMenu({ historyUrl }: { historyUrl: string }) {
   return (
      <Menu>
         {({ isOpen }) => {
            return (
               <>
                  <MenuButton
                     as={IconButton}
                     aria-label="Options"
                     icon={
                        <FaIcon
                           color={isOpen ? 'brand.500' : 'gray.500'}
                           icon={faAngleDown}
                        />
                     }
                     variant="link"
                     borderRightColor="gray.200"
                     borderRightWidth={1}
                     borderRightRadius={0}
                  />
                  <MenuList>
                     <MenuItem
                        as={Link}
                        _hover={{ textDecoration: 'none' }}
                        href={historyUrl}
                        icon={<FaIcon icon={faClockRotateLeft} />}
                     >
                        History
                     </MenuItem>
                  </MenuList>
               </>
            );
         }}
      </Menu>
   );
}

type NavTabsProps = {
   deviceGuideUrl?: string;
   devicePartsUrl?: string;
};

function NavTabs({ devicePartsUrl, deviceGuideUrl }: NavTabsProps & FlexProps) {
   const disabledStyleProps = {
      borderColor: 'transparent',
      _hover: {
         textDecoration: 'none',
      },
      opacity: 0.4,
      cursor: 'not-allowed',
      color: 'gray.700',
      isDisabled: true,
   };

   return (
      <Flex
         h="full"
         align="stretch"
         borderLeftWidth={{
            base: '0',
            sm: '1px',
            md: '0',
         }}
         bg="white"
      >
         <SecondaryNavbarItem>
            <SecondaryNavbarLink
               href={devicePartsUrl ? devicePartsUrl : undefined}
               {...(devicePartsUrl ? {} : disabledStyleProps)}
            >
               Parts
            </SecondaryNavbarLink>
         </SecondaryNavbarItem>
         <SecondaryNavbarItem>
            <SecondaryNavbarLink
               href={deviceGuideUrl ? deviceGuideUrl : undefined}
               {...(deviceGuideUrl ? {} : disabledStyleProps)}
            >
               Guides
            </SecondaryNavbarLink>
         </SecondaryNavbarItem>
         <SecondaryNavbarItem isCurrent>Troubleshooting</SecondaryNavbarItem>
      </Flex>
   );
}
