import { invariant } from '@ifixit/helpers';
import type { Product, ProductVariant } from '@pages/api/nextjs/cache/product';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

type SetVariantIdFn = (variantId: string) => void;

export function useSelectedVariant(
   product: Product
): [ProductVariant, SetVariantIdFn] {
   const router = useRouter();
   const searchParams = useSearchParams();
   const pathname = usePathname();

   const defaultVariantId = getDefaultVariantId(product);
   const searchParamVariantId = getSearchParamVariantId(
      searchParams?.get('variant')
   );
   const currentVariantId = searchParamVariantId ?? defaultVariantId;

   let variant = product.variants.find((v) => v.id === currentVariantId);
   if (variant == null) {
      variant = product.variants.find((v) => v.id === defaultVariantId);
   }

   invariant(
      variant,
      `Something went wrong, variant with id "${currentVariantId}" not found`
   );

   const setVariantId = useCallback<SetVariantIdFn>(
      (variantId) => {
         const newQuery = new URLSearchParams(searchParams as URLSearchParams);
         newQuery.delete('variant');
         if (variantId !== defaultVariantId) {
            newQuery.append('variant', encodeVariantId(variantId));
         }
         router.replace(`${pathname}?${newQuery.toString()}`);
      },
      [defaultVariantId, router, pathname, searchParams]
   );

   return [variant, setVariantId];
}

export function getDefaultVariantId(product: Product): string {
   const variant =
      product.variants.find(
         (variant) => variant.quantityAvailable && variant.quantityAvailable > 0
      ) ?? product.variants[0];
   return variant.id;
}

export function getSearchParamVariantId(
   searchParamVariantId?: string | null
): string | null {
   if (typeof searchParamVariantId !== 'string') {
      return null;
   }
   const decodedVariantId = decodeVariantId(searchParamVariantId);
   return decodedVariantId;
}

export function encodeVariantId(variantId: string) {
   if (!variantId.startsWith('gid://')) {
      throw new Error('Variant id must be a global shopify product variant id');
   }
   return variantId.replace(/^gid:\/\/shopify\/ProductVariant\//, '');
}

function decodeVariantId(variantId: string) {
   return `gid://shopify/ProductVariant/${variantId}`;
}
