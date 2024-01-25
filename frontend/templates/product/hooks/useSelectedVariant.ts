import {
   getProductVariantURI,
   getVariantIdFromVariantURI,
} from '@ifixit/helpers';
import type { Product, ProductVariant } from '@pages/api/nextjs/cache/product';
import { defaultVariantFor } from 'app/_helpers/product-helpers';
import { useRouter, useSearchParams } from 'next/navigation';

type SelectVariantFn = (variantId: string) => void;

export function useSelectedVariant(
   product: Product
): [ProductVariant, SelectVariantFn] {
   const router = useRouter();
   const searchParams = useSearchParams();

   const selectVariant = (variantId: string) => {
      router.replace(variantUrlFor(variantId), { scroll: false });
   };

   return [selectedVariant(), selectVariant];

   function selectedVariant() {
      return searchParamVariant() ?? defaultVariant();
   }

   function searchParamVariant() {
      if (variantGIDParam() == null) return null;
      return product.variants.find((v) => v.id === variantGIDParam()) ?? null;
   }

   function defaultVariant() {
      return defaultVariantFor(product);
   }

   function variantUrlFor(variantId: string) {
      const newSearchParams = searchParamsCopy();
      if (variantId !== defaultVariant().id) {
         newSearchParams.set('variant', getVariantIdFromVariantURI(variantId));
      } else {
         newSearchParams.delete('variant');
      }
      return `?${newSearchParams.toString()}`;
   }

   function searchParamsCopy() {
      const newSearchParams = new URLSearchParams();

      if (searchParams == null) return newSearchParams;

      searchParams.forEach((value, key) => {
         newSearchParams.append(key, value);
      });
      return newSearchParams;
   }

   function variantGIDParam() {
      const searchParamVariantId = searchParams?.get('variant');

      if (searchParamVariantId == null) return null;

      return getProductVariantURI(searchParamVariantId);
   }
}
