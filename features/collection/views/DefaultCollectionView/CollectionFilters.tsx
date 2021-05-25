import { chakra, VStack } from '@chakra-ui/react';
import { Facet, useFacets } from '@libs/algolia';
import { capitalize } from '@libs/utils';
import React from 'react';
import { RefinementList } from './RefinementList';

type CollectionFiltersProps = {
   className?: string;
};

const FACET_BLOCKLIST = [
   'tags',
   'vendor',
   'collections',
   'option_names',
   'collection_ids',
   'named_tags_names',
   'named_tags.worksin',
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
               return (
                  <RefinementList
                     key={facet.name}
                     title={name}
                     facet={facet.name}
                     multiple
                  />
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
