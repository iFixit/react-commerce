import {
   compareAlphabetically,
   compareCapacity,
   comparePriceRangeFn,
} from '@ifixit/helpers';
import { filterNullableItems, isBlank, isPresent } from '@ifixit/helpers';
import startCase from 'lodash/startCase';
import { ProductListType } from '@models/product-list';
import { SearchResponse } from './algolia';

export const SUPPORTED_FACETS = [
   'facet_tags.Capacity',
   'facet_tags.Device Brand',
   'facet_tags.Device Category',
   'facet_tags.Device Type',
   'facet_tags.Item Type',
   'facet_tags.OS',
   'facet_tags.Part or Kit',
   'facet_tags.Tool Category',
   'device',
   'worksin',
];

const MULTI_OPTION_FACETS = ['facet_tags.Capacity'];

const TOOLS_FACETS_EXCLUSION_LIST = [
   'facet_tags.Item Type',
   'facet_tags.Capacity',
   'device',
   'facet_tags.Device Brand',
   'facet_tags.Device Category',
   'facet_tags.Device Type',
   'facet_tags.OS',
   'facet_tags.Part or Kit',
];

const PARTS_FACET_RANKING: Record<string, number> = {
   'facet_tags.Item Type': 2,
   'facet_tags.Part or Kit': 1,
};

const TOOLS_FACET_RANKING: Record<string, number> = {
   'facet_tags.Tool Category': 2,
   price_range: 1,
};

export interface Facet {
   name: string;
   displayName: string;
   multiple: boolean;
   options: FacetOption[];
   selectedCount: number;
}

export interface FacetOption {
   value: string;
   count: number;
   selected: boolean;
}

type AlgoliaFacets = Record<string, OptionsCountByValue>;
type OptionsCountByValue = Record<string, number>;

interface CreateFacetsOptions {
   productListType: ProductListType;
   results: SearchResponse[];
   refinements: Record<string, string[]>;
}

export function createFacets({
   productListType,
   results,
   refinements,
}: CreateFacetsOptions): Facet[] {
   const facetsList = filterNullableItems(results.map((r) => r.facets));

   if (facetsList == null || facetsList.length === 0) return [];

   return filterNullableItems(
      SUPPORTED_FACETS.map((facetName) => {
         const options = findFacetOptions(
            facetsList,
            facetName,
            refinements[facetName]
         );

         if (isBlank(options)) return null;

         return createFacet(facetName, options, refinements[facetName]);
      })
   )
      .filter(facetFilterFn(productListType))
      .sort(facetCompareFn(productListType));
}

interface ProductListAttributes {
   filters?: string | null;
   deviceTitle?: string | null;
}

export function getProductListAlgoliaFiltersPreset<
   T extends ProductListAttributes
>({ filters, deviceTitle }: T): string | undefined {
   if (isPresent(filters)) {
      // Algolia can't handle newlines in the filter, so replace with space.
      return filters.replace(/(\n|\r)+/g, ' ');
   }
   if (isPresent(deviceTitle)) {
      return `device:${JSON.stringify(deviceTitle)}`;
   }
   return undefined;
}

function findFacetOptions(
   algoliaFacetsList: AlgoliaFacets[],
   facetName: string,
   refinements: string[]
) {
   const [nonRefinedFacets, ...refinedFacetsList] = algoliaFacetsList;

   const facets =
      refinedFacetsList.find(
         (refinedFacets) => refinedFacets[facetName] != null
      ) ?? nonRefinedFacets;

   const options = facets[facetName] ?? {};
   return addEmptyRefinedOptions(options, refinements);
}

// Make sure that options that are refined but have no results are still
// included in the facets list.
function addEmptyRefinedOptions(
   optionsCountByValue: OptionsCountByValue,
   refinedOptions: string[] = []
) {
   for (const refinement of refinedOptions) {
      optionsCountByValue[refinement] = optionsCountByValue[refinement] ?? 0;
   }
   return optionsCountByValue;
}

function facetFilterFn(
   productListType: ProductListType
): (facet: Facet) => boolean {
   switch (productListType) {
      case 'tools':
      case 'tools-category':
         return (facet) => !TOOLS_FACETS_EXCLUSION_LIST.includes(facet.name);
      default:
         return () => true;
   }
}

function facetCompareFn(
   productListType: ProductListType
): (a: Facet, b: Facet) => number {
   switch (productListType) {
      case 'parts':
      case 'device-parts':
         return compareWithRankingFn(PARTS_FACET_RANKING);
      case 'tools':
      case 'tools-category':
         return compareWithRankingFn(TOOLS_FACET_RANKING);
      default:
         return (a, b) => compareAlphabetically(a.displayName, b.displayName);
   }
}

function createFacet(
   facetName: string,
   algoliaOptions: Record<string, number>,
   refinedOptions: string[] = []
): Facet {
   let selectedCount = 0;

   const options = Object.entries(algoliaOptions).map(
      ([value, count]): FacetOption => {
         const selected = refinedOptions.includes(value);
         if (selected) selectedCount++;
         return { value, count, selected };
      }
   );
   options.sort(facetOptionCompareFn(facetName));

   return {
      name: facetName,
      displayName: getFacetDisplayName(facetName),
      multiple: MULTI_OPTION_FACETS.includes(facetName),
      options,
      selectedCount,
   };
}

function compareWithRankingFn(ranking: Record<string, number>) {
   return (a: Facet, b: Facet) => {
      const aRank = ranking[a.name] ?? 0;
      const bRank = ranking[b.name] ?? 0;
      return (
         bRank - aRank || compareAlphabetically(a.displayName, b.displayName)
      );
   };
}

function getFacetDisplayName(facetName: string) {
   let displayName = facetName.replace('facet_tags.', '');
   displayName = startCase(displayName);
   return displayName;
}

const facetOptionCompareFn =
   (facetName: string) => (a: FacetOption, b: FacetOption) => {
      switch (facetName) {
         case 'price_range':
            return comparePriceRangeFn(a.value, b.value);
         case 'facet_tags.Capacity':
            return compareCapacity(a.value, b.value);
         case 'facet_tags.Item Type':
            return compareAlphabetically(a.value, b.value);
         default:
            return compareFacetOptionByCountHighToLowAndAZ(a, b);
      }
   };

function compareFacetOptionByCountHighToLowAndAZ(
   a: FacetOption,
   b: FacetOption
) {
   const countDiff = b.count - a.count;
   if (countDiff !== 0) return countDiff;

   return compareAlphabetically(a.value, b.value);
}
