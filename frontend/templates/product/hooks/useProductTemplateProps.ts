import { WithProvidersProps } from '@components/common';
import type { WithLayoutProps } from '@layouts/default/server';
import { useServerSideProps } from '@lib/server-side-props';
import type { Product } from '@models/product';

export type ProductTemplateProps = WithProvidersProps<
   WithLayoutProps<{
      product: Product;
   }>
>;

export const useProductTemplateProps = () =>
   useServerSideProps<ProductTemplateProps>();
