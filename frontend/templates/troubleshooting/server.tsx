import { DEFAULT_STORE_CODE } from '@config/env';
import { ifixitOriginFromHost } from '@helpers/path-helpers';
import { getLayoutServerSideProps } from '@layouts/default/server';
import { GetServerSideProps } from 'next';
import { TroubleshootingProps } from './hooks/useTroubleshootingProps';

export const getServerSideProps: GetServerSideProps<TroubleshootingProps> = async (
   context
) => {
   const layoutProps = await getLayoutServerSideProps({
      storeCode: DEFAULT_STORE_CODE,
   });

   const pageProps: TroubleshootingProps = {
      layoutProps,
      appProps: {
         ifixitOrigin: ifixitOriginFromHost(context),
      },
   };
   return {
      props: pageProps,
   };
};
