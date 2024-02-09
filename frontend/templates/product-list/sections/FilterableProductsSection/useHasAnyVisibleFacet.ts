import { ProductList as TProductList } from '@models/product-list';
import { Facet } from 'app/_data/product-list/concerns/facets';
import { useAlgoliaSearch } from 'app/_data/product-list/useAlgoliaSearch';
import { useFilteredFacets } from './facets/useFacets';

export function useHasAnyVisibleFacet(productList: TProductList): boolean {
   const { hits, hitsCount, facets } = useAlgoliaSearch();

   const activeFacetsName = useFilteredFacets(productList);

   if (!hits) {
      return false;
   }

   const isFacetActive = (facet: Facet) =>
      activeFacetsName.includes(facet) &&
      facet.options.some(
         (facetOption) => facetOption.count > 0 && facetOption.count < hitsCount
      );

   return facets.some(isFacetActive);
}
