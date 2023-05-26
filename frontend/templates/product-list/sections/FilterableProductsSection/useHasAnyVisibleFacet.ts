import {
   ProductList as TProductList,
   ProductSearchHit,
} from '@models/product-list';
import { useSearchDetails } from '@templates/product-list/hooks/useSearchDetails';
import { SearchResults } from 'algoliasearch-helper';
import { useFilteredFacets } from './facets/useFacets';

type Facet = SearchResults<ProductSearchHit>['facets'][number];
type DisjunctiveFacet =
   SearchResults<ProductSearchHit>['disjunctiveFacets'][number];
type HierarchicalFacet =
   SearchResults<ProductSearchHit>['hierarchicalFacets'][number];

export function useHasAnyVisibleFacet(productList: TProductList): boolean {
   const { results } = useSearchDetails();
   const activeFacetsName = useFilteredFacets(productList);

   if (!results) {
      return false;
   }

   const isFacetActive = (facet: Facet | DisjunctiveFacet) =>
      activeFacetsName.includes(facet.name) &&
      Object.values(facet.data).some(
         (value) => value > 0 && value < results.nbHits
      );

   const isHierarchicalFacetActive = (facet: HierarchicalFacet) =>
      activeFacetsName.includes(facet.name) &&
      facet.data?.some(({ count }) => count > 0 && count < results.nbHits);

   return (
      results.facets.some(isFacetActive) ||
      results.disjunctiveFacets.some(isFacetActive) ||
      results.hierarchicalFacets.some(isHierarchicalFacetActive)
   );
}
