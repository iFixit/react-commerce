import { DefaultLayout } from '@layouts/default';
import { DefaultLayoutProps } from '@layouts/default/server';
import Head from 'next/head';
import React from 'react';
import {
   Box,
   chakra,
   Container,
   Heading,
   SystemStyleObject,
} from '@chakra-ui/react';
import { Problem, TroubleshootingData } from './hooks/useTroubleshootingProps';

const renderStyles = {
   a: {
      color: 'blue.500',
   },
   'ul, ol': {
      paddingLeft: 4,
   },
};

const Wiki: NextPageWithLayout<{
   wikiData: TroubleshootingData;
   layoutProps: DefaultLayoutProps;
}> = ({ wikiData }) => {
   return (
      <Container sx={renderStyles}>
         <Head>
            <meta name="robots" content="noindex" />
         </Head>
         <Heading as="h1">{wikiData.title}</Heading>
         {wikiData.introduction.map((intro) => (
            <IntroductionSection key={intro.heading} intro={intro} />
         ))}
         {wikiData.solutions.map((solution) => (
            <SolutionCard key={solution.heading} solution={solution} />
         ))}
         {wikiData.conclusion.map((conclusion) => (
            <ConclusionSection
               key={conclusion.heading}
               conclusion={conclusion}
            />
         ))}
      </Container>
   );
};

function SolutionCard({ solution }: { solution: Problem }) {
   return (
      <Box>
         <Heading>{solution.heading}</Heading>
         <Prerendered html={solution.body} />
      </Box>
   );
}

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

const Prerendered = chakra(function Prerendered({
   html,
   className,
}: {
   html: string;
   className?: string;
}) {
   const renderStyles: SystemStyleObject = {
      '.headerContainer': {
         display: 'flex',
         alignItems: 'baseline',
      },

      '.selfLink': {
         display: 'none',
      },

      h3: {
         fontSize: 'xl',
         lineHeight: '1.2',
      },

      'h3,h4': {
         fontWeight: 590,
      },

      'h4,h5': {
         fontSize: 'md',
         lineHeight: '1.25',
      },
   };

   return (
      <Box
         className={className}
         sx={renderStyles}
         dangerouslySetInnerHTML={{ __html: html }}
      />
   );
});

Wiki.getLayout = function getLayout(page, pageProps) {
   return <DefaultLayout {...pageProps.layoutProps}>{page}</DefaultLayout>;
};

export default Wiki;
