import * as React from 'react';
import { useDynamicWidgets } from 'react-instantsearch-hooks-web';
import { ProductList, ProductListType } from '@models/product-list';
import { formatFacetName } from '@helpers/algolia-helpers';

export function useFacets() {
   const { attributesToRender } = useDynamicWidgets({
      maxValuesPerFacet: 200,
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
   const isItemTypeProductList =
      productList.type === ProductListType.DeviceItemTypeParts;

   const infoNames = React.useMemo(() => {
      return new Set(
         productList.wikiInfo.map((info) => `facet_tags.${info.name}`)
      );
   }, [productList.wikiInfo]);

   const sortBy = React.useMemo(() => {
      return sortFacets(productList.type);
   }, [productList.type]);

   const usefulFacets = React.useMemo(() => {
      const usefulFacets = facets
         .slice()
         .filter((facet) => {
            if (facet === 'facet_tags.Item Type' && isItemTypeProductList) {
               return false;
            }
            return !infoNames.has(facet);
         })
         .sort(sortBy);
      return usefulFacets;
   }, [facets, infoNames, isItemTypeProductList, sortBy]);

   return usefulFacets;
}

const partsFacetRanking = new Map([
   ['facet_tags.Item Type', 1],
   ['facet_tags.Part or Kit', 2],
]);

const toolsFacetRanking = new Map([
   ['facet_tags.Tool Category', 1],
   ['price_range', 2],
]);

function sortFacets(productListType: ProductListType) {
   switch (productListType) {
      case ProductListType.AllParts:
      case ProductListType.DeviceParts:
      case ProductListType.DeviceItemTypeParts:
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
      if (ranking.get(a) && ranking.get(b)) {
         return ranking.get(a)! - ranking.get(b)!;
      } else if (ranking.get(a)) {
         return -1;
      } else if (ranking.get(b)) {
         return 1;
      } else {
         return sortFacetsAlphabetically(a, b);
      }
   };
}

const enCollator = new Intl.Collator('en');
function sortFacetsAlphabetically(a: string, b: string) {
   return enCollator.compare(formatFacetName(a), formatFacetName(b));
}
