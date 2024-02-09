import { Enum_Productlist_Type } from '@/lib/strapi-sdk';
import { z } from 'zod';

export enum ProductListType {
   AllParts = 'parts',
   DeviceParts = 'device-parts',
   AllTools = 'tools',
   ToolsCategory = 'tools-category',
   Marketing = 'marketing',
}

export const ProductListTypeSchema = z.nativeEnum(ProductListType);

export function productListTypeFromStrapi(
   type?: Enum_Productlist_Type | null
): ProductListType {
   switch (type) {
      case Enum_Productlist_Type.AllParts:
         return ProductListType.AllParts;
      case Enum_Productlist_Type.AllTools:
         return ProductListType.AllTools;
      case Enum_Productlist_Type.Tools:
         return ProductListType.ToolsCategory;
      case Enum_Productlist_Type.Marketing:
         return ProductListType.Marketing;
      default:
         return ProductListType.DeviceParts;
   }
}
