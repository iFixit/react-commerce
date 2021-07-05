import { chakra, Divider, VStack } from '@chakra-ui/react';
import { Facet, FacetValueState, useFacets } from '@lib/algolia';
import { capitalize } from '@lib/utils';
import React from 'react';
import { ClearButton } from './ClearButton';
import { FilterList } from './FilterList';
import { FilterSection, FilterSectionTitle } from './FilterSection';
import { RangeFilter, RangeFilterInput, RangeFilterList } from './RangeFilter';

interface CollectionFiltersProps {
   className?: string;
}

const FACET_BLOCKLIST = [
   'tags',
   'vendor',
   'collections',
   'option_names',
   'collection_ids',
   'named_tags_names',
   'named_tags.worksin',
   'price',
   'inventory_management',
];

export const CollectionFilters = chakra(
   ({ className }: CollectionFiltersProps) => {
      const facets = useFacets();
      const sortedFacets = React.useMemo(() => {
         return facets.slice().sort((a, b) => a.name.localeCompare(b.name));
      }, [facets]);

      return (
         <VStack spacing={4} align="stretch" className={className}>
            {sortedFacets.filter(filterFacet).map((facet) => {
               const name = formatFacetName(facet.name);
               if (facet.name === 'price_range') {
                  return (
                     <FilterSection key={facet.name}>
                        <FilterSectionTitle>{name}</FilterSectionTitle>
                        <Divider />
                        <RangeFilter>
                           <RangeFilterList
                              facetName={facet.name}
                              multiple
                              sortItems={sortByPriceRange}
                              renderItem={(item, index, list) => {
                                 const [min, max] = parseRange(item.value);
                                 if (index === 0) {
                                    return `Under $${max}`;
                                 }
                                 if (index === list.length - 1) {
                                    return `$${min} +`;
                                 }
                                 return `$${min} - $${max}`;
                              }}
                           />
                           <RangeFilterInput
                              facetName="price"
                              minFieldPrefix="$"
                              minFieldPlaceholder="Min"
                              maxFieldPrefix="$"
                              maxFieldPlaceholder="Max"
                           />
                        </RangeFilter>
                        <ClearButton onlyFacetNames={['price', 'price_range']}>
                           clear
                        </ClearButton>
                     </FilterSection>
                  );
               }
               return (
                  <FilterSection key={facet.name}>
                     <FilterSectionTitle>{name}</FilterSectionTitle>
                     <Divider />
                     <FilterList
                        key={facet.name}
                        facetName={facet.name}
                        multiple
                     />
                     <ClearButton onlyFacetNames={facet.name}>
                        clear
                     </ClearButton>
                  </FilterSection>
               );
            })}
         </VStack>
      );
   }
);

function filterFacet(facet: Facet): boolean {
   return !FACET_BLOCKLIST.includes(facet.name) && facet.values.length > 1;
}

function formatFacetName(facetName: string): string {
   let name = facetName;
   if (name.startsWith('options.')) {
      name = name.replace('options.', '');
   }
   if (name.startsWith('named_tags.')) {
      name = name.replace('named_tags.', '');
   }
   name = name.replace(/_/g, ' ');
   name = capitalize(name);
   return name;
}

function parseRange(value: string): [number, number] {
   const [min, max] = value.split(':');
   return [parseFloat(min), parseFloat(max)];
}

function sortByPriceRange(a: FacetValueState, b: FacetValueState): number {
   const [aMin] = parseRange(a.value);
   const [bMin] = parseRange(b.value);
   return aMin - bMin;
}
