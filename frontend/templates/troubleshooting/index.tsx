import { useRouter } from 'next/router';
import { DefaultLayout } from '@layouts/default';
import { DefaultLayoutProps } from '@layouts/default/server';
import Head from 'next/head';
import { IFixitAPIClient } from '@ifixit/ifixit-api-client';
import React from 'react';
import { useAppContext } from '@ifixit/app';
import { Box, Container, Heading } from '@chakra-ui/react';
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
         {wikiData.groups.map((group) => (
            <ProblemCard key={group.heading} problem={group} />
         ))}
      </Container>
   );
};

function ProblemCard({ problem }: { problem: Problem }) {
   return (
      <Box>
         <Heading>{problem.heading}</Heading>
         <Box dangerouslySetInnerHTML={{ __html: problem.body }} />
      </Box>
   );
}

Wiki.getLayout = function getLayout(page, pageProps) {
   return <DefaultLayout {...pageProps.layoutProps}>{page}</DefaultLayout>;
};

export default Wiki;
