import { DefaultLayout } from '@layouts/default';
import { ProductListTemplateProps } from './hooks/useProductListTemplateProps';
import { ProductListView } from './ProductListView';

const ProductListTemplate: NextPageWithLayout<ProductListTemplateProps> = ({
   productList,
   indexName,
}) => {
   return <ProductListView productList={productList} indexName={indexName} />;
};

ProductListTemplate.getLayout = function getLayout(page, pageProps) {
   return <DefaultLayout {...pageProps.layoutProps}>{page}</DefaultLayout>;
};

export default ProductListTemplate;
