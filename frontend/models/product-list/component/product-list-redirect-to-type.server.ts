import { Enum_Productlist_Redirecttotype } from '@lib/strapi-sdk';
import { ProductListRedirectToTypeSchema } from './product-list-redirect-to-type';
import type { ProductListRedirectToType } from './product-list-redirect-to-type';

export function productListRedirectToTypeFromStrapi(
   type?: Enum_Productlist_Redirecttotype | null
): ProductListRedirectToType {
   switch (type) {
      case Enum_Productlist_Redirecttotype.Permanent:
         return ProductListRedirectToTypeSchema.enum.Permanent;
      case Enum_Productlist_Redirecttotype.Temporary:
         return ProductListRedirectToTypeSchema.enum.Temporary;
      default:
         return ProductListRedirectToTypeSchema.enum.Permanent;
   }
}
