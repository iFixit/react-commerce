import { WithProvidersProps } from '@components/common';
import { WithLayoutProps } from '@layouts/default';
import { useLoaderData } from '@lib/loader-data';
import { Product } from '@models/product';

export type ProductTemplateProps = WithProvidersProps<
   WithLayoutProps<{
      product: Product;
   }>
>;

export const useProductTemplateData = () =>
   useLoaderData<ProductTemplateProps>();
