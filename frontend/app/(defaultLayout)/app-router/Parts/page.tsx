import { flags } from '@config/flags';
import { productListPath } from '@helpers/path-helpers';
import { ProductListType } from '@models/product-list';
import ProductList from '@pages/api/nextjs/cache/product-list';
import { ProductListView } from '@templates/product-list/ProductListView';
import { search } from 'app/_data/product-list';
import { AlgoliaSearchProvider } from 'app/_data/product-list/useAlgoliaSearch';
import { ifixitOrigin, shouldSkipCache } from 'app/_helpers/app-helpers';
import { parseSearchParams } from 'app/_helpers/product-list-helpers';
import { notFound, redirect } from 'next/navigation';

export interface AllPartsPageProps {
   params: {};
   searchParams: {
      disableCacheGets?: string | string[] | undefined;
   };
}

export default async function AllPartsPage({
   params,
   searchParams,
}: AllPartsPageProps) {
   if (!flags.APP_ROUTER_PARTS_PAGE_ENABLED) notFound();

   const productList = await ProductList.get(
      {
         filters: { handle: { eq: 'Parts' } },
         ifixitOrigin: ifixitOrigin(),
      },
      { forceMiss: shouldSkipCache(searchParams) }
   );

   if (productList == null) notFound();

   if (productList.redirectTo) {
      const path = productListPath({
         productList: productList.redirectTo,
      });
      return redirect(`${path}?${params}`);
   }

   const urlState = parseSearchParams(searchParams);
   const algoliaSearchResponse = await search({
      productListType: ProductListType.DeviceParts,
      // Todo: handle this
      excludePro: true,
      ...urlState,
   });

   return (
      <>
         <AlgoliaSearchProvider {...algoliaSearchResponse}>
            <ProductListView productList={productList} />
         </AlgoliaSearchProvider>
      </>
   );
}
