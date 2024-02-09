import { flags } from '@config/flags';
import { productListPath } from '@helpers/path-helpers';
import { ProductListType } from '@models/product-list';
import ProductList from '@pages/api/nextjs/cache/product-list';
import { search } from 'app/_data/product-list';
import { ifixitOrigin, shouldSkipCache } from 'app/_helpers/app-helpers';
import { parseSearchParams } from 'app/_helpers/product-list-helpers';
import { notFound, redirect } from 'next/navigation';

export interface AllToolsPageProps {
   params: {};
   searchParams: {
      disableCacheGets?: string | string[] | undefined;
   };
}

export default async function AllToolsPage({
   params,
   searchParams,
}: AllToolsPageProps) {
   if (!flags.APP_ROUTER_TOOLS_PAGE_ENABLED) notFound();

   const productList = await ProductList.get(
      {
         filters: { handle: { eq: 'Tools' } },
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
   const { hitsCount } = await search({
      productListType: ProductListType.AllTools,
      excludePro: true,
      ...urlState,
   });

   return (
      <>
         <div>All tools page</div>
         <div>{JSON.stringify(productList)}</div>
         <div>{hitsCount}</div>
      </>
   );
}
