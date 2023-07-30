import { DEFAULT_STORE_CODE } from '@config/env';
import { withCacheLong } from '@helpers/cache-control-helpers';
import { withLogging, withNoindexDevDomains } from '@helpers/next-helpers';
import { ifixitOriginFromHost } from '@helpers/path-helpers';
import { getLayoutServerSideProps } from '@layouts/default/server';
import compose from 'lodash/flowRight';
import { GetServerSideProps } from 'next';
import { ViewCartTemplateProps } from './useViewCartProps';

const withMiddleware = compose(
   withLogging<ViewCartTemplateProps>,
   withCacheLong<ViewCartTemplateProps>,
   withNoindexDevDomains<ViewCartTemplateProps>
);

export const getServerSideProps: GetServerSideProps<ViewCartTemplateProps> =
   withMiddleware(async (context) => {
      const layoutProps = await getLayoutServerSideProps({
         storeCode: DEFAULT_STORE_CODE,
      });
      const ifixitOrigin = ifixitOriginFromHost(context);

      const pageProps: ViewCartTemplateProps = {
         layoutProps: layoutProps,
         appProps: {
            ifixitOrigin: ifixitOrigin,
         },
      };
      return {
         props: pageProps,
      };
   });
