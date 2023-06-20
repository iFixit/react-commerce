import { z } from 'zod';

export type { ProductListPreview } from './component/product-list-preview';
export type { ProductListSection } from './sections';
export { ProductListType } from './component/product-list-type';
export type {
   ProductList,
   ProductListAncestor,
   ProductSearchHit,
   StorePage,
   WikiInfoEntry,
} from './types';

export enum iFixitPageType {
   Store = 'store',
}

export const iFixitPageTypeSchema = z.nativeEnum(iFixitPageType);

export enum FacetWidgetType {
   RefinementList = 'refinement-list',
   Menu = 'menu',
}
