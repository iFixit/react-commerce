import { serverSidePropsWrapper } from '@helpers/next-helpers';
import { ProductListType } from '@models/product-list';
import { getProductListServerSideProps } from '@templates/product-list';

export { default } from '@templates/product-list';

export const getServerSideProps = serverSidePropsWrapper(
   getProductListServerSideProps({
      productListType: ProductListType.Marketing,
   })
);
