import { invariant } from '@ifixit/helpers';
import type { Product, ProductVariant } from '@pages/api/nextjs/cache/product';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

type SetVariantIdFn = (variantId: string) => ProductVariant | null;

export function useSelectedVariant(
   product: Product
): [ProductVariant, SetVariantIdFn] {
   const router = useRouter();

   const defaultVariantId = useDefaultVariantId(product);
   const searchParamVariantId = useSearchParamVariantId();

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
         const { variant, ...newQuery } = router.query;
         if (variantId !== defaultVariantId) {
            newQuery.variant = encodeVariantId(variantId);
         }
         router.replace(
            {
               query: newQuery,
            },
            undefined,
            { shallow: true }
         );
         return product.variants.find((v) => v.id === variantId) ?? null;
      },
      [defaultVariantId, router]
   );

   return [variant, setVariantId];
}

export function useDefaultVariantId(product: Product): string {
   const variant =
      product.variants.find(
         (variant) => variant.quantityAvailable && variant.quantityAvailable > 0
      ) ?? product.variants[0];
   return variant.id;
}

function useSearchParamVariantId(): string | null {
   const router = useRouter();

   const searchParamVariantId = router.query?.variant;

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
