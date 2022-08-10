import {
   Box,
   Button,
   ButtonGroup,
   Flex,
   Heading,
   Tab,
   TabList,
   TabPanel,
   TabPanels,
   Tabs,
   useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import LoginModal from '../login/modal';
import links from '../../lib/links';

interface TabData {
   url: string;
   label: string;
   showTab: boolean;
}

export default function NavigationDisplay({
   title,
   privileges,
   setUser,
   patrolEnabled,
}: {
   title: string;
   privileges: { isLoggedIn: boolean; isMod: boolean; canPatrol: boolean };
   setUser: React.Dispatch<React.SetStateAction<{}>>;
   patrolEnabled: boolean;
}) {
   const [onIfixit, setOnIfixit] = useState(true);
   const { isOpen, onOpen, onClose } = useDisclosure();
   const router = useRouter();
   const visibleTabs = getTabs();

   useEffect(() => {
      const iFixitURL = window.location.hostname.toLowerCase() == 'ifixit';
      const testing = true;
      setOnIfixit(testing || iFixitURL);
   }, []);

   function getTabs(): Array<TabData> {
      return [
         {
            url: links.COMMUNITY,
            label: 'Community',
            showTab: onIfixit,
         },
         {
            url: links.LEADERBOARD,
            label: 'Leaderboard',
            showTab: true,
         },
         {
            url: links.ALL_TEAMS,
            label: 'Teams',
            showTab: true,
         },
         {
            url: links.BUSINESS,
            label: 'Businesses',
            showTab: onIfixit,
         },
         {
            url: links.CONTRIBUTE,
            label: 'Contribute',
            showTab: true,
         },
         {
            url: links.TRANSLATE,
            label: 'Translate',
            showTab: true,
         },
         {
            url: links.PATROL,
            label: 'Patrol',
            showTab: patrolEnabled && privileges.canPatrol,
         },
         {
            url: links.MODERATION,
            label: 'Moderation',
            showTab: privileges.isMod,
         },
      ].filter((tab: TabData) => tab.showTab);
   }

   function ChakraTabs(title: string) {
      const router = useRouter();
      return visibleTabs.map((tab: TabData, index: number) => {
         const url = tab.url;
         const label = tab.label;
         return (
            <Tab
               className={label === title ? 'active' : ''}
               key={index}
               minWidth="100px"
               onClick={() => router.push(url)}
               sx={{
                  '&.active': {
                     color: 'var(--color-blue)',
                     borderColor: 'var(--color-blue)',
                  },
                  '&:hover:not(.active)': {
                     color: 'var(--color-gray-6)',
                     borderColor: 'var(--color-gray-4)',
                  },
               }}
            >
               {label}
            </Tab>
         );
      });
   }

   function listTabPanelComponents() {
      return visibleTabs.map(tabInfo => {
         return <TabPanel key={tabInfo.label}></TabPanel>;
      });
   }

   function getActiveTabIndex(pageTitle: string) {
      let index = 0;
      while (index < visibleTabs.length) {
         const tab = visibleTabs[index];
         if (tab.label === pageTitle) {
            break;
         }
         index++;
      }
      return index;
   }

   return (
      <React.Fragment>
         <Flex
            mb="var(--space-5)"
            align="center"
            direction={{ base: 'column', md: 'row' }}
            justify={{ base: 'center', md: 'space-between' }}
         >
            <Heading as="h1" margin="0">
               Community
            </Heading>
            <ButtonGroup
               variant="outline"
               spacing={{ base: 0, xs: 'var(--space-4)' }}
               marginTop={{ base: 'var(--space-4)', md: 0 }}
               flexDirection={{ base: 'column', xs: 'row' }}
            >
               <Button onClick={() => router.push(links.USE_GUIDELINES)}>How this Works</Button>
               {!privileges.isLoggedIn && (
                  <Button onClick={onOpen} mt={{ base: '8px', xs: '0' }}>
                     Join the Community
                  </Button>
               )}
               <LoginModal isOpen={isOpen} onClose={onClose} setUser={setUser} />
            </ButtonGroup>
         </Flex>
         <Box
            position="relative"
            sx={{
               '@media screen and (max-width: 886px)': {
                  '&::after': {
                     content: "''",
                     position: 'absolute',
                     right: '-1px',
                     top: '0',
                     height: '100%',
                     width: '5%',
                     background:
                        'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, var(--color-white) 100%)',
                  },
               },
            }}
         >
            <Tabs
               variant="line"
               overflowX="auto"
               padding="3px"
               height="55px"
               defaultIndex={getActiveTabIndex(title)}
            >
               <TabList>{ChakraTabs(title)}</TabList>
               <TabPanels display="none">{listTabPanelComponents()}</TabPanels>
            </Tabs>
         </Box>
      </React.Fragment>
   );
}
