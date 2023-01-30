import { Center, Divider, Heading, Text, VStack } from '@chakra-ui/react';
import { DEFAULT_STORE_CODE } from '@config/env';
import { DefaultLayout } from '@layouts/default';
import type { WithLayoutProps } from '@layouts/default/server';
import { getLayoutServerSideProps } from '@layouts/default/server';
import { GetStaticProps } from 'next';

type Custom404Props = WithLayoutProps<{}>;

export const Custom404: NextPageWithLayout<Custom404Props> = () => {
   return (
      <Center
         flexGrow={1}
         paddingTop="16px"
         paddingBottom="60px"
         paddingLeft="20px"
         paddingRight="20px"
      >
         <VStack>
            <Heading
               as="h2"
               fontSize={{ base: '4xl', md: '5xl' }}
               fontWeight="medium"
            >
               404
            </Heading>
            <Text fontWeight="medium" pb="3" textTransform="uppercase">
               Page not found
            </Text>
            <Divider borderWidth="1px" borderColor="red.500" width="50px" />
            <Text pt="3" overflowWrap="break-word" align="center" maxW="360px">
               We can&apos;t find the page you&apos;re looking for. Whoops.
            </Text>
         </VStack>
      </Center>
   );
};

Custom404.getLayout = function getLayout(page, pageProps) {
   return <DefaultLayout {...pageProps.layoutProps}>{page}</DefaultLayout>;
};

export const getStaticProps: GetStaticProps<Custom404Props> = async () => {
   return {
      props: {
         layoutProps: await getLayoutServerSideProps({
            storeCode: DEFAULT_STORE_CODE,
         }),
      },
   };
};

export default Custom404;
