import { InstantSearchProvider } from '@components/common/InstantSearchProvider';
import { DefaultLayout } from '@layouts/default';
import { ProductListTemplateProps } from './hooks/useProductListTemplateProps';
import { ProductListView } from './ProductListView';
import { useRouter } from 'next/router';
import { getRouteData } from '@helpers/path-helpers';

const ProductListTemplate: NextPageWithLayout<ProductListTemplateProps> = ({
   appProps,
   productList,
}) => {
   const router = useRouter();
   const { deviceHandle } = getRouteData(router.asPath);
   return (
      <InstantSearchProvider {...appProps.algolia!}>
         <ProductListView
            productList={productList}
            deviceHandle={deviceHandle}
         />
      </InstantSearchProvider>
   );
};

ProductListTemplate.getLayout = function getLayout(page, pageProps) {
   return <DefaultLayout {...pageProps.layoutProps}>{page}</DefaultLayout>;
};

export default ProductListTemplate;
