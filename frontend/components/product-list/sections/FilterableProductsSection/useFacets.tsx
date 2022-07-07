import * as React from 'react';
import { useDynamicWidgets } from 'react-instantsearch-hooks-web';
import { ProductList, ProductListType } from '@models/product-list';

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

   const usefulFacets = React.useMemo(() => {
      const usefulFacets = facets.slice().filter((facet) => {
         if (facet === 'facet_tags.Item Type' && isItemTypeProductList) {
            return false;
         }
         return !infoNames.has(facet);
      });
      return usefulFacets;
   }, [facets, infoNames, isItemTypeProductList]);

   return usefulFacets;
}
