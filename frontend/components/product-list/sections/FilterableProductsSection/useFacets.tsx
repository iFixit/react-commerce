import * as React from 'react';
import { useDynamicWidgets } from 'react-instantsearch-hooks-web';
import { ProductList, ProductListType } from '@models/product-list';
import { formatFacetName } from '@helpers/algolia-helpers';

export const MAX_VALUES_PER_FACET = 200;

export function useFacets() {
   const { attributesToRender } = useDynamicWidgets({
      maxValuesPerFacet: MAX_VALUES_PER_FACET,
   });

   return [
      'facet_tags.Capacity',
      'facet_tags.Device Brand',
      'facet_tags.Device Category',
      'facet_tags.Device Type',
      'facet_tags.Item Type',
      'facet_tags.OS',
      'facet_tags.Part or Kit',
      'facet_tags.Tool Category',
      'device',
      'price_range',
      'worksin',
   ];
   // return attributesToRender;
}

export function useFilteredFacets(productList: ProductList) {
   const facets = useFacets();

   const infoNames = React.useMemo(() => {
      return new Set(
         productList.wikiInfo.map((info) => `facet_tags.${info.name}`)
      );
   }, [productList.wikiInfo]);

   const sortBy = React.useMemo(() => {
      return getFacetComparator(productList.type);
   }, [productList.type]);

   const usefulFacets = React.useMemo(() => {
      const usefulFacets = facets
         .slice()
         .filter((facet) => {
            return !infoNames.has(facet);
         })
         .sort(sortBy);
      return usefulFacets;
   }, [facets, infoNames, sortBy]);

   if (productList.type === ProductListType.AllTools) {
      const excludedToolsFacets = [
         'facet_tags.Item Type',
         'facet_tags.Capacity',
         'device',
         'facet_tags.Device Brand',
         'facet_tags.Device Category',
         'facet_tags.Device Type',
         'facet_tags.OS',
      ];
      return facets.filter((facet) => !excludedToolsFacets.includes(facet));
   }

   return usefulFacets;
}

// Higher number == closer to top, default is 0
const partsFacetRanking = new Map([
   ['facet_tags.Item Type', 2],
   ['facet_tags.Part or Kit', 1],
]);

// Higher number == closer to top, default is 0
const toolsFacetRanking = new Map([
   ['facet_tags.Tool Category', 2],
   ['price_range', 1],
]);

function getFacetComparator(productListType: ProductListType) {
   switch (productListType) {
      case ProductListType.AllParts:
      case ProductListType.DeviceParts:
         return sortFacetsWithRanking(partsFacetRanking);
      case ProductListType.AllTools:
      case ProductListType.ToolsCategory:
         return sortFacetsWithRanking(toolsFacetRanking);
      default:
         return sortFacetsAlphabetically;
   }
}

function sortFacetsWithRanking(ranking: Map<string, number>) {
   return (a: string, b: string): number => {
      const aRank = ranking.get(a) || 0;
      const bRank = ranking.get(b) || 0;
      return bRank - aRank || sortFacetsAlphabetically(a, b);
   };
}

const enCollator = new Intl.Collator('en');
function sortFacetsAlphabetically(a: string, b: string) {
   return enCollator.compare(formatFacetName(a), formatFacetName(b));
}
