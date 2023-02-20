import { DefaultLayout } from '@layouts/default';
import { DefaultLayoutProps } from '@layouts/default/server';
import Head from 'next/head';
import React from 'react';
import {
   Box,
   Button,
   Flex,
   Heading,
   IconButton,
   Link,
   Menu,
   MenuButton,
   MenuItem,
   MenuList,
} from '@chakra-ui/react';
import Prerendered from './prerendered';
import { Section, TroubleshootingData } from './hooks/useTroubleshootingProps';
import SolutionCard from './solution';
import { FaIcon } from '@ifixit/icons';
import {
   faAngleDown,
   faClockRotateLeft,
   faPenToSquare,
} from '@fortawesome/pro-solid-svg-icons';

const Wiki: NextPageWithLayout<{
   wikiData: TroubleshootingData;
   layoutProps: DefaultLayoutProps;
}> = ({ wikiData }) => {
   return (
      <Flex direction="column" alignItems="center" width="100%" fontSize="16px">
         <NavBar editUrl={wikiData.editUrl} historyUrl={wikiData.historyUrl} />
         <Flex
            padding="0px 32px 32px"
            gap="16px"
            maxW="1280px"
            direction="column"
            id="main"
         >
            <Head>
               <meta name="robots" content="noindex" />
            </Head>
            <Heading as="h1">{wikiData.title}</Heading>
            {wikiData.introduction.map((intro) => (
               <IntroductionSection key={intro.heading} intro={intro} />
            ))}
            {wikiData.solutions.map((solution, index) => (
               <SolutionCard
                  key={solution.heading}
                  index={index + 1}
                  solution={solution}
               />
            ))}
            {wikiData.conclusion.map((conclusion) => (
               <ConclusionSection
                  key={conclusion.heading}
                  conclusion={conclusion}
               />
            ))}
         </Flex>
      </Flex>
   );
};

function NavBar({
   editUrl,
   historyUrl,
}: {
   editUrl: string;
   historyUrl: string;
}) {
   return (
      <Flex
         w="100%"
         h="48px"
         backgroundColor="white"
         borderBottomColor="gray.200"
         borderBottomWidth="1px"
         justify="center"
      >
         <Flex maxW="1280px" flexGrow="1">
            <Breadcrumbs />
            <AreaLinks />
            <EditButton editUrl={editUrl} />
            <ActionsMenu historyUrl={historyUrl} />
         </Flex>
      </Flex>
   );
}

function Breadcrumbs() {
   return <Box flexGrow="1"></Box>;
}

function AreaLinks() {
   return <> </>;
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
         padding="9px, 16px, 9px, 16px"
         fontFamily="heading"
         lineHeight="1.29"
         fontWeight="semibold"
         fontSize="14px"
         color="brand.500"
         textAlign="center"
         href={editUrl}
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

function IntroductionSection({ intro }: { intro: Section }) {
   return (
      <Box>
         <Heading>{intro.heading}</Heading>
         <Prerendered html={intro.body} />
      </Box>
   );
}

function ConclusionSection({ conclusion }: { conclusion: Section }) {
   return (
      <Box>
         <Heading>{conclusion.heading}</Heading>
         <Prerendered html={conclusion.body} />
      </Box>
   );
}

Wiki.getLayout = function getLayout(page, pageProps) {
   return <DefaultLayout {...pageProps.layoutProps}>{page}</DefaultLayout>;
};

export default Wiki;
