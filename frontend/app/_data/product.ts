import { DEFAULT_STORE_CODE } from '@config/env';
import Product from '@pages/api/nextjs/cache/product';
import { ifixitOrigin } from 'app/_helpers/app-helpers';
import { cache } from 'react';

interface FindProductArgs {
   handle: string;
   noCache: boolean;
}

export async function findProduct({ handle, noCache }: FindProductArgs) {
   const result = await findProductOrRedirect(handle, noCache);
   if (result?.__typename === 'Product') return result;
   return null;
}

export async function findProductRedirect({
   handle,
   noCache,
}: FindProductArgs) {
   const result = await findProductOrRedirect(handle, noCache);
   if (result?.__typename === 'ProductRedirect') return result;
   return null;
}

const findProductOrRedirect = cache(
   async (handle: string, skipCache: boolean) => {
      return await Product.get(
         {
            handle,
            storeCode: DEFAULT_STORE_CODE,
            ifixitOrigin: ifixitOrigin(),
         },
         { forceMiss: skipCache }
      );
   }
);
