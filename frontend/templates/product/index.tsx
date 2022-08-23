import { Heading } from '@chakra-ui/react';
import { WithProvidersProps } from '@components/common';
import { flags } from '@config/flags';
import { invariant } from '@ifixit/helpers';
import {
   DefaultLayout,
   getLayoutServerSideProps,
   WithLayoutProps,
} from '@layouts/default';
import { findProduct, Product } from '@models/product';
import { GetServerSideProps } from 'next';

export type ProductTemplateProps = WithProvidersProps<
   WithLayoutProps<{
      product: Product;
   }>
>;

export const ProductTemplate: NextPageWithLayout<ProductTemplateProps> = ({
   product,
}) => {
   return (
      <div>
         <Heading>{product.title}</Heading>
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
      const layoutProps = await getLayoutServerSideProps();
      const product = await findProduct(
         {
            shopDomain: layoutProps.currentStore.shopify.storefrontDomain,
            accessToken: layoutProps.currentStore.shopify.storefrontAccessToken,
         },
         handle
      );
      if (product == null) {
         return {
            notFound: true,
         };
      }
      const pageProps: ProductTemplateProps = {
         layoutProps,
         appProps: {},
         product,
      };
      return {
         props: pageProps,
      };
   };
