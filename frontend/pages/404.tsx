import {
   Center,
   Divider,
   Heading,
   Text,
   VStack,
   Flex,
   UnorderedList,
   ListItem,
   Link,
} from '@chakra-ui/react';
import { DEFAULT_STORE_CODE } from '@config/env';
import { DefaultLayout } from '@layouts/default';
import type { WithLayoutProps } from '@layouts/default/server';
import { getLayoutServerSideProps } from '@layouts/default/server';
import { GetStaticProps } from 'next';
import { useTranslations } from 'next-intl';

type Messages = Record<string, any>;
type Custom404Props = WithLayoutProps<{ messages: Messages }>;

export const Custom404: NextPageWithLayout<Custom404Props> = () => {
   const t = useTranslations();

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

export const getStaticProps: GetStaticProps<Custom404Props> = async (
   context
) => {
   const messages = (await import(`../messages/${context.locale}.json`))
      .default;

   return {
      props: {
         layoutProps: await getLayoutServerSideProps({
            storeCode: DEFAULT_STORE_CODE,
         }),
         // You can get the messages from anywhere you like. The recommended
         // pattern is to put them in JSON files separated by locale and read
         // the desired one based on the `locale` received from Next.js.
         messages: messages,
      },
   };
};

export default Custom404;
