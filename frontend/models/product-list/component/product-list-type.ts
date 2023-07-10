import { z } from 'zod';

export enum ProductListType {
   AllParts = 'parts',
   DeviceParts = 'device-parts',
   AllTools = 'tools',
   ToolsCategory = 'tools-category',
   Marketing = 'marketing',
}

export const ProductListTypeSchema = z.nativeEnum(ProductListType);
