import { Box } from '@chakra-ui/react';
import { flags } from '@config/flags';
import { DefaultLayout, getLayoutServerSideProps } from '@layouts/default';
import { GetServerSideProps } from 'next';
import { LandingTemplateProps } from './hooks/useLandingTemplateProps';

export const LandingTemplate: NextPageWithLayout<LandingTemplateProps> = () => {
   return (
      <>
         <Box py="6">Store home page</Box>
      </>
   );
};

LandingTemplate.getLayout = function getLayout(page, pageProps) {
   return <DefaultLayout {...pageProps.layoutProps}>{page}</DefaultLayout>;
};

export const getServerSideProps: GetServerSideProps<LandingTemplateProps> =
   async (context) => {
      if (!flags.STORE_HOME_PAGE_ENABLED) {
         return {
            notFound: true,
         };
      }
      const layoutProps = await getLayoutServerSideProps();
      const pageProps: LandingTemplateProps = {
         layoutProps,
         appProps: {},
      };
      return {
         props: pageProps,
      };
   };
