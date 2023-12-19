import { InstantSearchProvider } from '@components/common/InstantSearchProvider';
import { DefaultLayout } from '@layouts/default';
import { ProductListTemplateProps } from './hooks/useProductListTemplateProps';
import { ProductListView } from './ProductListView';
import { CurrentProductListProvider } from './hooks/useCurrentProductList';

const ProductListTemplate: NextPageWithLayout<ProductListTemplateProps> = ({
   appProps,
   productList,
}) => {
   return (
      <InstantSearchProvider {...appProps.algolia!}>
         <CurrentProductListProvider
            productList={productList}
            algoliaUrl={appProps.algolia?.url}
         >
            <ProductListView
               productList={productList}
               algoliaUrl={appProps.algolia?.url}
            />
         </CurrentProductListProvider>
      </InstantSearchProvider>
   );
};

ProductListTemplate.getLayout = function getLayout(page, pageProps) {
   return <DefaultLayout {...pageProps.layoutProps}>{page}</DefaultLayout>;
};

export default ProductListTemplate;
