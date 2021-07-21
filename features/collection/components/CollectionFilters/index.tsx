import { Box, chakra } from '@chakra-ui/react';
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

export const CollectionFilters = chakra(
   ({ className }: CollectionFiltersProps) => {
      const facets = useFacets();
      const sortedFacets = React.useMemo(() => {
         return facets.slice().sort((a, b) => a.name.localeCompare(b.name));
      }, [facets]);
      const filteredFacets = React.useMemo(() => {
         return sortedFacets.filter(filterFacet);
      }, [sortedFacets]);
      const [expandedFacets, setExpandedFacets] = React.useState<string[]>([]);
      const toggleFacet = React.useCallback((name: string) => {
         setExpandedFacets((current) => {
            if (current.includes(name)) {
               return current.filter((f) => f !== name);
            }
            return [...current, name];
         });
      }, []);

      const itemData = createItemData(
         filteredFacets,
         expandedFacets,
         toggleFacet
      );

      return (
         <MeasuredContentProvider>
            <Sizer className={className}>
               {({ height, width }) => {
                  return (
                     <FilterList
                        height={height}
                        itemCount={filteredFacets.length}
                        itemKey={itemKey}
                        estimatedItemSize={40}
                        width={width}
                        itemData={itemData}
                     >
                        {FilterRow}
                     </FilterList>
                  );
               }}
            </Sizer>
         </MeasuredContentProvider>
      );
   }
);

const createItemData = memoize(
   (
      facets: Facet[],
      expandedFacets: string[],
      toggleFacet: (name: string) => void
   ): ListItemData => ({
      facets,
      expandedFacets,
      toggleFacet,
   })
);

function itemKey(index: number, data: ListItemData): string {
   const item = data.facets[index];
   return item.name;
}

const FilterList = (props: Omit<VariableSizeListProps, 'itemSize'>) => {
   const { listRef, getSize } = useMeasuredContentContext();

   return <VariableSizeList ref={listRef} {...props} itemSize={getSize} />;
};

function filterFacet(facet: Facet): boolean {
   return (
      !FACET_BLOCKLIST.includes(facet.name) &&
      facet.values.length > 1 &&
      facet.values.some((value) => value.filteredHitCount > 0)
   );
}
