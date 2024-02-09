import { flags } from '@config/flags';
import { productListPath } from '@helpers/path-helpers';
import { invariant } from '@ifixit/helpers';
import ProductList from '@pages/api/nextjs/cache/product-list';
import { ifixitOrigin, shouldSkipCache } from 'app/_helpers/app-helpers';
import { notFound, redirect } from 'next/navigation';

export interface ToolCategoryPageProps {
   params: {
      handle?: string;
   };
   searchParams: {
      disableCacheGets?: string | string[] | undefined;
   };
}

export default async function ShopPage({
   params,
   searchParams,
}: ToolCategoryPageProps) {
   if (!flags.APP_ROUTER_MARKETING_PAGE_ENABLED) notFound();

   if (params.handle == null) notFound();

   const productList = await ProductList.get(
      {
         filters: {
            handle: { eqi: params.handle },
            type: { eq: 'marketing' },
         },
         ifixitOrigin: ifixitOrigin(),
      },
      { forceMiss: shouldSkipCache(searchParams) }
   );

   if (productList == null) notFound();

   const shouldRedirectToCanonical =
      typeof productList?.handle === 'string' &&
      productList.handle !== params.handle;
   const canonicalPath =
      typeof productList?.handle === 'string'
         ? `/Shop/${productList.handle}`
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
   return (
      <>
         <div>Marketing page</div>
         <div>{JSON.stringify(productList)}</div>
      </>
   );
}
