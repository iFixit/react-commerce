import { Box, Button, HStack, Icon, VStack, Text } from '@chakra-ui/react';
import React from 'react';
import { HiSelector } from 'react-icons/hi';
import { RefinementListRenderState } from 'instantsearch.js/es/connectors/refinement-list/connectRefinementList';
import {
   useCurrentRefinements,
   UseRefinementListProps,
} from 'react-instantsearch-hooks-web';
import NextLink from 'next/link';
import { useSortBy } from './useSortBy';
import { useFilteredRefinementList } from './useFilteredRefinementList';
import { ProductList } from '@models/product-list';

export type RefinementMenuProps = UseRefinementListProps & {
   productList: ProductList;
};

export function RefinementMenu({
   productList,
   ...otherProps
}: RefinementMenuProps) {
   const { items, refine, isShowingMore, toggleShowMore, canToggleShowMore } =
      useFilteredRefinementList({
         ...otherProps,
         sortBy: useSortBy(otherProps),
      });
   return (
      <Box>
         <VStack align="stretch" spacing="1" role="listbox">
            {items.map((item) => {
               return (
                  <MenuItem
                     key={item.label}
                     label={item.label}
                     value={item.value}
                     count={item.count}
                     refine={refine}
                  />
               );
            })}
         </VStack>
         {canToggleShowMore && (
            <Button
               variant="ghost"
               fontWeight="normal"
               leftIcon={
                  <Icon as={HiSelector} boxSize="6" color="gray.600" ml="-1" />
               }
               mt="3"
               p="0"
               w="full"
               justifyContent="flex-start"
               onClick={toggleShowMore}
            >
               {isShowingMore ? 'Show less' : 'Show more'}
            </Button>
         )}
      </Box>
   );
}

type MenuItemProps = {
   label: string;
   value: string;
   count: number;
   refine: RefinementListRenderState['refine'];
};

const MenuItem = React.memo(function RefinementListItem({
   label,
   count,
   value,
   refine,
}: MenuItemProps) {
   const { createURL } = useCurrentRefinements();
   const href = createURL({
      attribute: 'facet_tags.Item Type',
      type: 'disjunctive',
      value,
      label,
   });
   return (
      <HStack key={label} justify="space-between">
         <NextLink href={href} passHref>
            <Text
               as="a"
               onClick={(event) => {
                  event.preventDefault();
                  refine(value);
               }}
               _hover={{
                  textDecoration: 'underline',
               }}
            >
               {label}
            </Text>
         </NextLink>
         <Text size="sm" fontFamily="sans-serif" color={'gray.500'}>
            {count}
         </Text>
      </HStack>
   );
});
