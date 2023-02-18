import { ProductListType } from '@models/product-list';
import { getProductListServerSideProps } from '@templates/product-list/server';

export { default } from '@templates/product-list';

export const getServerSideProps = getProductListServerSideProps({
   productListType: ProductListType.AllTools,
});
