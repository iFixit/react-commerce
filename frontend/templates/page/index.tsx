import { Box } from '@chakra-ui/react';
import { IFIXIT_ORIGIN } from '@config/env';
import { flags } from '@config/flags';
import { ifixitOriginFromHost } from '@helpers/path-helpers';
import { assertNever } from '@ifixit/helpers';
import { DefaultLayout, getLayoutServerSideProps } from '@layouts/default';
import { clearCache } from '@lib/cache';
import { findPage } from '@models/page';
import { GetServerSideProps } from 'next';
import {
   PageTemplateProps,
   usePageTemplateProps,
} from './hooks/usePageTemplateProps';
import { BrowseSection } from './sections/BrowseSection';
import { HeroSection } from './sections/HeroSection';
import { StatsSection } from './sections/StatsSection';

export const PageTemplate: NextPageWithLayout<PageTemplateProps> = () => {
   const { page } = usePageTemplateProps();
   return (
      <Box>
         {page.sections.map((section) => {
            switch (section.__typename) {
               case 'ComponentPageHero': {
                  return <HeroSection key={section.id} data={section} />;
               }
               case 'ComponentPageBrowse': {
                  return <BrowseSection key={section.id} data={section} />;
               }
               case 'ComponentPageStats': {
                  return <StatsSection key={section.id} data={section} />;
               }
               default:
                  return assertNever(section);
            }
         })}
      </Box>
   );
};

PageTemplate.getLayout = function getLayout(page, pageProps) {
   return <DefaultLayout {...pageProps.layoutProps}>{page}</DefaultLayout>;
};

export const getServerSideProps: GetServerSideProps<PageTemplateProps> = async (
   context
) => {
   if (!flags.STORE_HOME_PAGE_ENABLED) {
      return {
         notFound: true,
      };
   }

   const ifixitOrigin = ifixitOriginFromHost(context);
   const isProxied = ifixitOrigin !== IFIXIT_ORIGIN;
   if (isProxied) {
      context.res.setHeader(
         'Cache-Control',
         'no-store, no-cache, must-revalidate, stale-if-error=0'
      );
      clearCache();
   }

   const layoutProps = await getLayoutServerSideProps();
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
         ifixitOrigin,
      },
      page,
   };
   return {
      props: pageProps,
   };
};
