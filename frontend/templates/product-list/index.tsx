import { DefaultLayout } from '@layouts/default';
import { ProductListTemplateProps } from './hooks/useProductListTemplateProps';
import { ProductListView } from './ProductListView';

const ProductListTemplate: NextPageWithLayout<ProductListTemplateProps> = ({
   productList,
}) => {
   return <ProductListView productList={productList} />;
};

ProductListTemplate.getLayout = function getLayout(page, pageProps) {
   return <DefaultLayout {...pageProps.layoutProps}>{page}</DefaultLayout>;
};

export default ProductListTemplate;
