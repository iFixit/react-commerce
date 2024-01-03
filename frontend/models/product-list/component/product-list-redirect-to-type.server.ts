import { Enum_Productlist_Redirecttotype } from '@lib/strapi-sdk';
import { ProductListRedirectToType } from './product-list-redirect-to-type';
import type { TProductListRedirectToType } from './product-list-redirect-to-type';

export function productListRedirectToTypeFromStrapi(
   type?: Enum_Productlist_Redirecttotype | null
): TProductListRedirectToType {
   switch (type) {
      case Enum_Productlist_Redirecttotype.Permanent:
         return ProductListRedirectToType.enum.Permanent;
      case Enum_Productlist_Redirecttotype.Temporary:
         return ProductListRedirectToType.enum.Temporary;
      default:
         return ProductListRedirectToType.enum.Permanent;
   }
}
