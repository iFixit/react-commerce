import { Heading } from '@chakra-ui/react';
import { WithProvidersProps } from '@components/common';
import { flags } from '@config/flags';
import { invariant } from '@ifixit/helpers';
import {
   DefaultLayout,
   DefaultLayoutProps,
   getLayoutServerSideProps,
   WithLayoutProps,
} from '@layouts/default';
import { GetServerSideProps } from 'next';

export type ProductTemplateProps = WithProvidersProps<WithLayoutProps<{}>>;

export const ProductTemplate: NextPageWithLayout<ProductTemplateProps> = () => {
   return (
      <div>
         <Heading>Product page</Heading>
      </div>
   );
};

ProductTemplate.getLayout = function getLayout(page, pageProps) {
   return <DefaultLayout {...pageProps.layoutProps}>{page}</DefaultLayout>;
};

export const getServerSideProps: GetServerSideProps<ProductTemplateProps> =
   async (context) => {
      const { handle } = context.params || {};
      invariant(typeof handle === 'string', 'handle param is missing');
      if (!flags.PRODUCT_PAGE_ENABLED) {
         return {
            notFound: true,
         };
      }
      const layoutProps: Promise<DefaultLayoutProps> =
         getLayoutServerSideProps();
      const pageProps: ProductTemplateProps = {
         layoutProps: await layoutProps,
         appProps: {},
      };
      return {
         props: pageProps,
      };
   };
