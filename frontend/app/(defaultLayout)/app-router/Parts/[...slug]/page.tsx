import { flags } from '@config/flags';
import { productListPath } from '@helpers/path-helpers';
import {
   destylizeDeviceItemType,
   destylizeDeviceTitle,
} from '@helpers/product-list-helpers';
import { invariant } from '@ifixit/helpers';
import ProductList from '@pages/api/nextjs/cache/product-list';
import { ifixitOrigin, shouldSkipCache } from 'app/_helpers/app-helpers';
import {
   getDeviceCanonicalPath,
   parseSearchParams,
} from 'app/_helpers/product-list-helpers';
import { notFound, redirect } from 'next/navigation';
import { ProductListType } from '@models/product-list';
import { search } from 'app/_data/product-list';

export interface DevicePartsPageProps {
   params: {
      slug?: string[];
   };
   searchParams: {
      disableCacheGets?: string | string[] | undefined;
   };
}

export default async function DevicePartsPage({
   params,
   searchParams,
}: DevicePartsPageProps) {
   if (!flags.APP_ROUTER_PARTS_PAGE_ENABLED) notFound();

   if (params.slug == null) notFound();

   const [deviceHandle, itemTypeHandle, ...otherPathSegments] = params.slug;

   if (deviceHandle == null || otherPathSegments.length > 0) notFound();

   const deviceTitle = destylizeDeviceTitle(deviceHandle);
   const itemType = itemTypeHandle
      ? destylizeDeviceItemType(itemTypeHandle)
      : null;

   const productList = await ProductList.get(
      {
         filters: {
            deviceTitle: {
               eqi: deviceTitle,
            },
         },
         ifixitOrigin: ifixitOrigin(),
      },
      { forceMiss: shouldSkipCache(searchParams) }
   );

   if (productList == null) notFound();

   const shouldRedirectToCanonical =
      typeof productList?.deviceTitle === 'string' &&
      productList.deviceTitle !== deviceTitle;

   const canonicalPath = getDeviceCanonicalPath(
      productList?.deviceTitle,
      itemType
   );

   if (shouldRedirectToCanonical) {
      invariant(canonicalPath != null, 'canonical path is required');
      redirect(canonicalPath);
   }

   if (productList.redirectTo) {
      const path = productListPath({
         productList: productList.redirectTo,
         itemType: itemType ?? undefined,
      });
      return redirect(`${path}?${params}`);
   }

   const urlState = parseSearchParams(searchParams);
   const { hitsCount } = await search({
      productListType: ProductListType.DeviceParts,
      baseFilters: `device:${JSON.stringify(deviceTitle)}`,
      // Todo: handle this
      excludePro: true,
      ...urlState,
   });

   console.log({
      productListType: ProductListType.DeviceParts,
      excludePro: true,
      ...urlState,
   });

   return (
      <>
         <div>Device parts page</div>
         <div>{JSON.stringify(productList)}</div>
         <div>{hitsCount}</div>
      </>
   );
}
