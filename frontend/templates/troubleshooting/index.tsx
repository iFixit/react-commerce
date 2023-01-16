import { useRouter } from 'next/router';
import { DefaultLayout } from '@layouts/default';
import { DefaultLayoutProps } from '@layouts/default/server';
import Head from 'next/head';
import { IFixitAPIClient } from '@ifixit/ifixit-api-client';
import React from 'react';
import { useAppContext } from '@ifixit/app';
import {
   Box,
   chakra,
   ChakraProps,
   Circle,
   Container,
   Grid,
   Heading,
   Link,
   ListItem,
   OrderedList,
} from '@chakra-ui/react';
import { Problem, TroubleshootingData } from './hooks/useTroubleshootingProps';

const borderStyle: ChakraProps = {
   borderBottomStyle: 'solid',
   borderBottomColor: 'gray.300',
   borderBottomWidth: '1px',
};

const Wiki: NextPageWithLayout<{
   wikiData: TroubleshootingData;
   layoutProps: DefaultLayoutProps;
}> = ({ wikiData }) => {
   const appContext = useAppContext();
   const client = new IFixitAPIClient({ origin: appContext.ifixitOrigin });

   const groups = wikiData.groups;
   const frontMatter =
      groups[0] && groups[0].heading === null ? wikiData.groups[0] : null;
   const endMatterItems = groups
      .slice(1)
      .filter(
         (group) => group.heading === null || /Related/.test(group.heading)
      );

   const problems = groups.filter(
      (group) => group.heading !== null && !/Related/.test(group.heading)
   );

   return (
      <Container maxWidth="740px" fontSize="md" paddingTop="60px">
         <Head>
            <meta name="robots" content="noindex" />
         </Head>
         <Heading as="h1">{wikiData.title}</Heading>
         {frontMatter && (
            <EndMatter
               paddingTop="6"
               paddingBottom="5"
               {...borderStyle}
               item={frontMatter}
            />
         )}
         <Box paddingTop="6" paddingBottom="6" paddingLeft="3" {...borderStyle}>
            <Heading as="h3" fontSize="md" marginBottom="3">
               Causes
            </Heading>
            <OrderedList>
               {problems.map((group, idx) => (
                  <ListItem
                     fontWeight="bold"
                     color="blue.ifixit"
                     lineHeight="20px"
                     marginTop="2.5"
                  >
                     <Link href={`#${idFromProblem(group)}`}>
                        {group.heading}
                     </Link>
                  </ListItem>
               ))}
            </OrderedList>
         </Box>
         {problems.map((group, idx) => (
            <ProblemCard problem={group} key={group.heading} index={idx + 1} />
         ))}
         {endMatterItems &&
            endMatterItems.map((item) => (
               <EndMatter paddingTop="6" paddingBottom="5" item={item} />
            ))}
      </Container>
   );
};

function ProblemCard({ index, problem }: { index: number; problem: Problem }) {
   return (
      <Grid
         templateColumns="48px 1fr"
         templateRows="48px 1fr"
         columnGap="4"
         rowGap="6px"
         {...borderStyle}
         paddingBottom="22px"
         paddingTop="22px"
         paddingLeft="3"
         paddingRight="3"
      >
         <Circle
            size="48px"
            color="white"
            bg="blue.ifixit"
            fontSize="xl"
            fontWeight="bold"
         >
            {index}
         </Circle>
         <Heading
            alignSelf="center"
            fontSize="3xl"
            fontWeight="extrabold"
            id={idFromProblem(problem)}
         >
            {problem.heading}
         </Heading>
         <Box></Box>
         <Box>
            {/* <Box>Up 42</Box> */}
            <Prerendered
               paddingTop="2.5"
               paddingBottom="5"
               html={problem.body}
            />
            {/* <Box borderTop="1px solid #e4e4e7">This solution was suggested by</Box> */}
         </Box>
      </Grid>
   );
}

const EndMatter = chakra(function EndMatter({
   item,
   className,
}: {
   item: Problem;
   className?: string;
}) {
   if (item.heading) {
      return (
         <Box className={className}>
            {item.heading && (
               <Heading fontWeight="extrabold" fontSize="3xl">
                  {item.heading}
               </Heading>
            )}
            <Prerendered paddingTop="2.5" paddingBottom="5" html={item.body} />
         </Box>
      );
   } else {
      return <Prerendered className={className} html={item.body} />;
   }
});

Wiki.getLayout = function getLayout(page, pageProps) {
   return <DefaultLayout {...pageProps.layoutProps}>{page}</DefaultLayout>;
};

const Prerendered = chakra(function Prerendered({
   html,
   className,
}: {
   html: string;
   className?: string;
}) {
   const renderStyles = {
      a: {
         color: 'blue.500',
      },
      'ul, ol': {
         paddingLeft: 4,
      },

      p: {
         marginBottom: '14px',
      },

      'p:last-child': {
         marginBottom: 0,
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

function idFromProblem(group: Problem): string {
   return group.heading?.replace(/ /g, '-')?.toLowerCase();
}

export default Wiki;
