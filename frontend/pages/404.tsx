import { Center, Text, Divider, VStack } from '@chakra-ui/react';
import { WithProvidersProps } from '@components/common';
import {
   DefaultLayout,
   getLayoutServerSideProps,
   WithLayoutProps,
} from '@layouts/default';
import { GetStaticProps } from 'next';
import { colors } from '../../packages/ui/theme/foundations/colors';

type Custom404Props = WithProvidersProps<WithLayoutProps<{}>>;

export const Custom404: NextPageWithLayout<Custom404Props> = () => {
   return (
      <Center flexGrow={1}>
         <VStack>
            <Text fontSize={36} fontWeight="bold">
               404
            </Text>
            <Text fontSize={24} fontWeight="semibold" paddingBottom="24px">
               Page not Found
            </Text>
            <Divider
               borderWidth="1px"
               borderColor={colors.red['500']}
               width="50px"
            />
            <Text
               fontSize={20}
               paddingTop="24px"
               overflowWrap="break-word"
               align="center"
               maxW="360px"
            >
               We can&#39;t find the page you&#39;re looking for. Whoops.
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
         layoutProps: await getLayoutServerSideProps(),
         appProps: {},
      },
   };
};

export default Custom404;
