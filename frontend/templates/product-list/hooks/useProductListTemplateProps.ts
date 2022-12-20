import { WithProvidersProps } from '@components/common';
import { WithLayoutProps } from '@layouts/default';
import { useServerSideProps } from '@lib/server-side-props';
import type { ProductList } from '@models/product-list';

export type ProductListTemplateProps = WithProvidersProps<
   WithLayoutProps<{
      productList: ProductList;
      indexName: string;
   }>
>;

export const useProductListTemplateProps = () =>
   useServerSideProps<ProductListTemplateProps>();
