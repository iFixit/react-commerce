import { DEFAULT_STORE_CODE } from '@config/env';
import { flags } from '@config/flags';
import { invariant } from '@helpers/application-helpers';
import { hasDisableCacheGets } from '@helpers/cache-control-helpers';
import { ifixitOriginFromHost } from '@helpers/path-helpers';
import { getLayoutServerSideProps } from '@layouts/default/server';
import { findPage } from '@models/page/server';
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

   const slug = context.params?.slug || [];
   invariant(Array.isArray(slug), 'page slug param is missing');
   slug.unshift('Store');
   const path = `/${slug.join('/')}`;

   const layoutProps = await getLayoutServerSideProps({
      storeCode: DEFAULT_STORE_CODE,
      forceMiss: hasDisableCacheGets(context),
   });
   const page = await findPage({
      path,
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
