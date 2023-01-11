import { useRouter } from 'next/router';
import { DefaultLayout } from '@layouts/default';
import { DefaultLayoutProps } from '@layouts/default/server';
import Head from 'next/head';
import { IFixitAPIClient } from '@ifixit/ifixit-api-client';
import React from 'react';
import { useAppContext } from '@ifixit/app';
import { Box, Container, Heading } from '@chakra-ui/react';

type Problem = {
   heading: string;
   body: string;
};

type TroubleshootingData = {
   title: string;
   toc: string;
   groups: Problem[];
};

const renderStyles = {
   a: {
      color: 'blue.500',
   },
   'ul, ol': {
      paddingLeft: 4,
   },
};

const Wiki: NextPageWithLayout<{ layoutProps: DefaultLayoutProps }> = () => {
   const appContext = useAppContext();
   const client = new IFixitAPIClient({ origin: appContext.ifixitOrigin });

   const { wikiname } = useRouter().query;
   const [wikiData, setWikiData] = React.useState<TroubleshootingData | null>(
      null
   );
   React.useEffect(() => {
      client
         .get(`Troubleshooting/${wikiname}`, {
            credentials: 'include',
         })
         .then((res: any) => {
            setWikiData(res);
         });
   }, [wikiname]);
   if (!wikiData) {
      return <p>waiting</p>;
   }
   return (
      <Container sx={renderStyles}>
         <Head>
            <meta name="robots" content="noindex" />
         </Head>
         <Heading as="h1">{wikiData.title}</Heading>
         {wikiData.groups.map((group) => (
            <ProblemCard problem={group} />
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
