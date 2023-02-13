import { DefaultLayout } from '@layouts/default';
import { DefaultLayoutProps } from '@layouts/default/server';
import Head from 'next/head';
import React from 'react';
import {
   Text,
   Box,
   Button,
   Flex,
   Heading,
   HStack,
   Spacer,
} from '@chakra-ui/react';
import Prerendered from './prerendered';
import { Section, TroubleshootingData } from './hooks/useTroubleshootingProps';
import SolutionCard from './solution';
import { FaIcon } from '@ifixit/icons';
import { faPenToSquare } from '@fortawesome/pro-solid-svg-icons';

const Wiki: NextPageWithLayout<{
   wikiData: TroubleshootingData;
   layoutProps: DefaultLayoutProps;
}> = ({ wikiData }) => {
   return (
      <Flex direction="column" alignItems="center" width="100%" fontSize="16px">
         <NavBar />
         <Flex
            padding="0px 32px 32px"
            paddingLeft="48px"
            paddingRight="48px"
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

function NavBar() {
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
            <Box flexGrow="1">Breadcrumbs</Box>
            <Box>Parts/Guide/Answers</Box>
            <EditButton />
         </Flex>
      </Flex>
   );
}

function EditButton() {
   return (
      <Button
         leftIcon={<FaIcon icon={faPenToSquare} />}
         variant="link"
         bgColor="transparent"
         textColor="brand"
         borderLeftColor="gray.200"
         borderLeftWidth="1px"
         borderRadius="0px"
         padding="9px, 16px, 9px, 16px"
      >
         <Text
            fontFamily="SF Pro"
            lineHeight="1.29"
            fontWeight="semibold"
            fontSize="14px"
            color="brand.500"
            textAlign="center"
         >
            Edit
         </Text>
      </Button>
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
