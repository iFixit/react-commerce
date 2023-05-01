import { WithProvidersProps } from '@components/common';
import type { WithLayoutProps } from '@layouts/default/server';
import { useServerSideProps } from '@lib/server-side-props';
import type { ProductList } from '@models/product-list';

export type ProductListTemplateProps = WithProvidersProps<
   WithLayoutProps<{
      productList: ProductList;
   }>
>;

export const useProductListTemplateProps = () =>
   useServerSideProps<ProductListTemplateProps>();
