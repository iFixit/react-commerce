import type { ProductOptionFieldsFragment } from '@lib/shopify-storefront-sdk';
import { z } from 'zod';
import { ProductVariant } from './product-variant';

export type ProductOption = z.infer<typeof ProductOptionSchema>;

export const ProductOptionSchema = z.object({
   values: z.array(z.string()),
   id: z.string(),
   name: z.string(),
});

export function productOptionFromShopify(
   option: ProductOptionFieldsFragment,
   variants: ProductVariant[],
   iFixitOptions?: string[]
): ProductOption {
   // TODO: cleanup
   const values = iFixitOptions?.length
      ? iFixitOptions.map((option) =>
           option === 'New-TEsstss' ? 'New' : option
        )
      : option.values;

   const valuesWithMatchingVariants = values.filter((value: string) =>
      valueHasMatchingVariant(value, option, variants)
   );
   return {
      id: option.id,
      name: option.name,
      values: valuesWithMatchingVariants,
   };
}

function valueHasMatchingVariant(
   value: string,
   option: ProductOptionFieldsFragment,
   variants: ProductVariant[]
) {
   return variants.some((variant) =>
      variant.selectedOptions.find(
         (selectedOption) =>
            selectedOption.name === option.name &&
            selectedOption.value === value
      )
   );
}
