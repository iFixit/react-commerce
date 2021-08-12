import { chakra } from '@chakra-ui/react';
import { Facet, useFacets } from '@lib/algolia';
import memoize from 'memoize-one';
import React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeList, VariableSizeListProps } from 'react-window';
import { FilterRow, ListItemData } from './FilterRow';
import {
   MeasuredContentProvider,
   useMeasuredContentContext,
} from './MeasuredContent';

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

const Sizer = chakra(AutoSizer);

export const FilterList = chakra(({ className }: CollectionFiltersProps) => {
   const facets = useFacets();
   const sortedFacets = React.useMemo(() => {
      return facets.slice().sort((a, b) => a.name.localeCompare(b.name));
   }, [facets]);
   const usefulFacets = React.useMemo(() => {
      return sortedFacets.filter(filterUselessFacet);
   }, [sortedFacets]);
   const refinedFacets = React.useMemo(() => {
      return usefulFacets.filter(filterNoMatchesFacet);
   }, [usefulFacets]);
   const displayedFacets = React.useMemo(() => {
      return refinedFacets.length > 0 ? refinedFacets : usefulFacets;
   }, [usefulFacets, refinedFacets]);
   const [expandedFacets, setExpandedFacets] = React.useState<string[]>(
      displayedFacets.map((f) => f.name)
   );
   const toggleFacet = React.useCallback((name: string) => {
      setExpandedFacets((current) => {
         if (current.includes(name)) {
            return current.filter((f) => f !== name);
         }
         return [...current, name];
      });
   }, []);
   const showAllFacetValues = refinedFacets.length === 0;

   const itemData = createItemData(
      displayedFacets,
      showAllFacetValues,
      expandedFacets,
      toggleFacet
   );

   return (
      <MeasuredContentProvider>
         <Sizer className={className}>
            {({ height, width }) => {
               const count = Math.ceil(height / 40);
               // console.log('height', height, count);
               return (
                  <VirtualFilterList
                     // overscanCount={count}
                     height={height}
                     itemCount={displayedFacets.length}
                     itemKey={itemKey}
                     estimatedItemSize={40}
                     width={width}
                     itemData={itemData}
                  >
                     {FilterRow}
                  </VirtualFilterList>
               );
            }}
         </Sizer>
      </MeasuredContentProvider>
   );
});

const createItemData = memoize(
   (
      facets: Facet[],
      showAllFacetValues: boolean,
      expandedFacets: string[],
      toggleFacet: (name: string) => void
   ): ListItemData => ({
      facets,
      showAllFacetValues,
      expandedFacets,
      toggleFacet,
   })
);

function itemKey(index: number, data: ListItemData): string {
   const item = data.facets[index];
   return item.name;
}

const VirtualFilterList = (props: Omit<VariableSizeListProps, 'itemSize'>) => {
   const { listRef, getSize } = useMeasuredContentContext();

   return <VariableSizeList {...props} ref={listRef} itemSize={getSize} />;
};

function filterUselessFacet(facet: Facet): boolean {
   return !FACET_BLOCKLIST.includes(facet.name) && facet.values.length > 1;
}

function filterNoMatchesFacet(facet: Facet): boolean {
   return facet.values.some((value) => value.filteredHitCount > 0);
}
