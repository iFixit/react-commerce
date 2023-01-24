import { DefaultLayout } from '@layouts/default';
import { DefaultLayoutProps } from '@layouts/default/server';
import Head from 'next/head';
import React from 'react';
import { Box, Container, Flex, Heading } from '@chakra-ui/react';
import Prerendered from './prerendered';
import { Problem, TroubleshootingData } from './hooks/useTroubleshootingProps';
import SolutionCard from './solution';

const Wiki: NextPageWithLayout<{
   wikiData: TroubleshootingData;
   layoutProps: DefaultLayoutProps;
}> = ({ wikiData }) => {
   return (
      <Flex
         direction="column"
         justifyContent="center"
         width="100%"
         fontSize="16px"
      >
         <Flex padding="0px 32px 32px" gap="48px" maxW="1280px" id="wrapper">
            <Flex gap="16px" direction="column" id="main">
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
      </Flex>
   );
};

function IntroductionSection({ intro }: { intro: Problem }) {
   return (
      <Box>
         <Heading>{intro.heading}</Heading>
         <Prerendered html={intro.body} />
      </Box>
   );
}

function ConclusionSection({ conclusion }: { conclusion: Problem }) {
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
