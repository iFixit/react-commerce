import { flags } from '@config/flags';
import { productListPath } from '@helpers/path-helpers';
import { invariant } from '@ifixit/helpers';
import { ProductListType } from '@models/product-list';
import ProductList from '@pages/api/nextjs/cache/product-list';
import { search } from 'app/_data/product-list';
import { ifixitOrigin, shouldSkipCache } from 'app/_helpers/app-helpers';
import { parseSearchParams } from 'app/_helpers/product-list-helpers';
import { notFound, redirect } from 'next/navigation';

export interface ToolCategoryPageProps {
   params: {
      handle?: string;
   };
   searchParams: {
      disableCacheGets?: string | string[] | undefined;
   };
}

export default async function ToolCategoryPage({
   params,
   searchParams,
}: ToolCategoryPageProps) {
   if (!flags.APP_ROUTER_TOOLS_PAGE_ENABLED) notFound();

   if (params.handle == null) notFound();

   const productList = await ProductList.get(
      {
         filters: {
            handle: { eqi: params.handle },
            type: { in: ['marketing', 'tools'] },
         },
         ifixitOrigin: ifixitOrigin(),
      },
      { forceMiss: shouldSkipCache(searchParams) }
   );

   if (productList == null) notFound();

   const isMarketing = productList?.type === ProductListType.Marketing;
   const isMiscapitalized =
      typeof productList?.handle === 'string' &&
      productList.handle !== params.handle;
   const shouldRedirectToCanonical = isMiscapitalized || isMarketing;
   const canonicalPath =
      typeof productList?.handle === 'string'
         ? isMarketing
            ? `/Shop/${productList.handle}`
            : `/Tools/${productList.handle}`
         : null;

   if (shouldRedirectToCanonical) {
      invariant(canonicalPath != null, 'canonical path is required');
      redirect(canonicalPath);
   }

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
      baseFilters: productList.filters || undefined,
      ...urlState,
   });

   return (
      <>
         <div>Tool category page</div>
         <div>{JSON.stringify(productList)}</div>
         <div>{hitsCount}</div>
      </>
   );
}
