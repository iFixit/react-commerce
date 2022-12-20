import { DEFAULT_STORE_CODE } from '@config/env';
import { flags } from '@config/flags';
import { ifixitOriginFromHost } from '@helpers/path-helpers';
import { getLayoutServerSideProps } from '@layouts/default/server';
import { findPage } from '@models/page';
import { GetServerSideProps } from 'next';
import { PageTemplateProps } from './hooks/usePageTemplateProps';

export const getServerSideProps: GetServerSideProps<PageTemplateProps> = async (
   context
) => {
   if (!flags.STORE_HOME_PAGE_ENABLED) {
      return {
         notFound: true,
      };
   }

   const layoutProps = await getLayoutServerSideProps({
      storeCode: DEFAULT_STORE_CODE,
   });
   const page = await findPage({
      path: '/Store',
   });

   if (page == null) {
      return {
         notFound: true,
      };
   }

   const pageProps: PageTemplateProps = {
      layoutProps,
      appProps: {
         ifixitOrigin: ifixitOriginFromHost(context),
      },
      page,
   };
   return {
      props: pageProps,
   };
};
