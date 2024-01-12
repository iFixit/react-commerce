import { DEFAULT_STORE_CODE, IFIXIT_ORIGIN } from '@config/env';
import { flags } from '@config/flags';
import Product from '@pages/api/nextjs/cache/product';
import { devSandboxOrigin, shouldSkipCache } from 'app/_helpers/app-helpers';
import { notFound, redirect } from 'next/navigation';

export interface ProductPageProps {
   params: {
      handle: string;
   };
   searchParams: {
      disableCacheGets?: string | string[] | undefined;
      variant?: string;
   };
}

export default async function ProductPage({
   params,
   searchParams,
}: ProductPageProps) {
   if (!flags.APP_ROUTER_PRODUCT_PAGE_ENABLED) notFound();

   const data = await Product.get(
      {
         handle: params.handle,
         storeCode: DEFAULT_STORE_CODE,
         ifixitOrigin: devSandboxOrigin() ?? IFIXIT_ORIGIN,
      },
      { forceMiss: shouldSkipCache(searchParams) }
   );

   if (data == null) notFound();

   if (data.__typename === 'ProductRedirect') redirect(data.target);

   return <div>Product: {data.title}</div>;
}
