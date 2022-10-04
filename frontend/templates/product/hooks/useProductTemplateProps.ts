import { WithProvidersProps } from '@components/common';
import { WithLayoutProps } from '@layouts/default';
import { useServerSideProps } from '@lib/server-side-props';
import { Product } from '@models/product';

export type ProductTemplateProps = WithProvidersProps<
   WithLayoutProps<{
      product: Product;
   }>
>;

export const useProductTemplateProps = () =>
   useServerSideProps<ProductTemplateProps>();
