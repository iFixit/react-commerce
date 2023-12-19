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
} from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import links from '../../lib/links';
import { color, fontWeight, fontSize, space } from '@core-ds/primitives';

interface TabData {
   url: string;
   label: string;
   showTab: boolean;
}

export default function NavigationDisplay({
   title,
   privileges,
   patrolEnabled,
}: {
   title: string;
   privileges: { isLoggedIn: boolean; isMod: boolean };
   patrolEnabled: boolean;
}) {
   const [onIfixit, setOnIfixit] = useState(true);
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
            showTab: patrolEnabled,
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
               color={`${color.gray[500]}`}
               fontWeight={`${fontWeight.bold}`}
               fontSize={`${fontSize.md}`}
               sx={{
                  '&.active': {
                     color: `${color.blue[500]}`,
                     borderColor: `${color.blue}`,
                  },
                  '&:hover:not(.active)': {
                     color: `${color.gray[600]}`,
                     borderColor: `${color.gray[400]}`,
                  },
               }}
            >
               {label}
            </Tab>
         );
      });
   }

   function listTabPanelComponents() {
      return visibleTabs.map((tabInfo) => {
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
            mb={`${space[5]}`}
            align="center"
            direction={{ base: 'column', md: 'row' }}
            justify={{ base: 'center', md: 'space-between' }}
         >
            <Heading as="h1" margin="0" fontSize={`${fontSize['5xl']}`}>
               Community
            </Heading>
            <ButtonGroup
               spacing={{ base: 2, md: 4 }} // {{ base: 0, xs: 4}}
               variant="outline"
               marginTop={{ base: `${space[4]}`, md: `${space[2]}` }} // {{ base: 4, md: 0}}
               flexDirection={{ base: 'column', xs: 'row' }}
            >
               {onIfixit && (
                  <Button
                     onClick={() => router.push(links.USE_GUIDELINES)}
                     fontSize={`${fontSize.md}`}
                     fontWeight={`${fontWeight.normal}`}
                  >
                     {'How this Works'}
                  </Button>
               )}
               {!privileges.isLoggedIn && (
                  <Button
                     onClick={() => router.push(links.LOGIN)}
                     mt={{ base: `${space[2]}`, xs: '0' }}
                     fontSize={`${fontSize.md}`}
                     fontWeight={`${fontWeight.normal}`}
                  >
                     {'Community'}
                  </Button>
               )}
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
                     background: `linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, ${color.white} 100%)`,
                  },
               },
            }}
         >
            <Tabs
               isLazy
               isFitted
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
