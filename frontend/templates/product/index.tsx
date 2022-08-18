import { Heading } from '@chakra-ui/react';
import { flags } from '@config/flags';
import { invariant } from '@ifixit/helpers';
import { GetServerSideProps } from 'next';

type ProductTemplateProps = {};

export const ProductTemplate: NextPageWithLayout<ProductTemplateProps> = () => {
   return (
      <div>
         <Heading>Product page</Heading>
      </div>
   );
};

ProductTemplate.getLayout = function getLayout(page, pageProps) {
   return page;
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
      return {
         props: {},
      };
   };
