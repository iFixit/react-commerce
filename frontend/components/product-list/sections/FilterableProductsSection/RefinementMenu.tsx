import { Box, Button, HStack, Icon, VStack, Text } from '@chakra-ui/react';
import React from 'react';
import { HiSelector } from 'react-icons/hi';
import {
   useInstantSearch,
   UseRefinementListProps,
} from 'react-instantsearch-hooks-web';
import NextLink from 'next/link';
import { useSortBy } from './useSortBy';
import { useFilteredRefinementList } from './useFilteredRefinementList';
import { uiStateToQueryString } from '@components/common/InstantSearchProvider';
import { getProductListPath } from '@helpers/product-list-helpers';
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
   const { indexUiState } = useInstantSearch();
   const queryString = React.useMemo(
      () => uiStateToQueryString(indexUiState, ['facet_tags.Item Type']),
      [indexUiState]
   );
   const createItemTypeURL = React.useCallback(
      (itemType: string) => {
         const path = getProductListPath(productList, itemType);
         return `${path}${queryString}`;
      },
      [productList, queryString]
   );

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
                     createURL={createItemTypeURL}
                     onChange={refine}
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
   createURL: (value: string) => string;
   onChange: (value: string) => void;
};

const MenuItem = React.memo(function RefinementListItem({
   label,
   count,
   value,
   createURL,
   onChange,
}: MenuItemProps) {
   return (
      <HStack key={label} justify="space-between">
         <NextLink href={createURL(value)} passHref>
            <Text
               as="a"
               onClick={(event) => {
                  event.preventDefault();
                  onChange(value);
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
