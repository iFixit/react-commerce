import { InstantSearchProvider } from '@components/common/InstantSearchProvider';
import { DefaultLayout } from '@layouts/default';
import { ProductListTemplateProps } from './hooks/useProductListTemplateProps';
import { ProductListView } from './ProductListView';

const ProductListTemplate: NextPageWithLayout<ProductListTemplateProps> = ({
   appProps,
   productList,
}) => {
   return (
      <InstantSearchProvider {...appProps.algolia!}>
         <ProductListView productList={productList} />
      </InstantSearchProvider>
   );
};

ProductListTemplate.getLayout = function getLayout(page, pageProps) {
   return <DefaultLayout {...pageProps.layoutProps}>{page}</DefaultLayout>;
};

export default ProductListTemplate;
