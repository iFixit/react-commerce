import { Box, Button, HStack, Icon, VStack, Text } from '@chakra-ui/react';
import React from 'react';
import { HiSelector } from 'react-icons/hi';
import {
   RefinementListRenderState,
   RefinementListItem,
} from 'instantsearch.js/es/connectors/refinement-list/connectRefinementList';
import {
   useCurrentRefinements,
   UseRefinementListProps,
} from 'react-instantsearch-hooks-web';
import NextLink from 'next/link';
import { useSortBy } from './useSortBy';
import { useFilteredRefinementList } from './useFilteredRefinementList';
import { ProductList, ProductListType } from '@models/product-list';
import { stylizeDeviceItemType } from '@helpers/product-list-helpers';

type RefinementSingleSelectProps = UseRefinementListProps & {
   productList: ProductList;
   onClose?: () => void;
};

export function RefinementSingleSelect({
   productList,
   onClose,
   ...otherProps
}: RefinementSingleSelectProps) {
   const { items, refine, isShowingMore, toggleShowMore, canToggleShowMore } =
      useFilteredRefinementList({
         ...otherProps,
         sortBy: useSortBy(otherProps),
      });

   const onClickSingleSelect = React.useCallback(
      (newSelected: RefinementListItem) => {
         refine(newSelected.value);

         const oldSelected: RefinementListItem | undefined = items.find(
            (item) => item.isRefined
         );
         if (oldSelected && oldSelected !== newSelected) {
            refine(oldSelected.value);
         }
      },
      [items, refine]
   );
   return (
      <Box>
         <VStack align="stretch" spacing="1" role="listbox">
            {items.map((item) => {
               return (
                  <SingleSelectItem
                     key={item.label}
                     item={item}
                     attribute={otherProps.attribute}
                     productListType={productList.type}
                     onClose={onClose}
                     onClick={onClickSingleSelect}
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

type SingleSelectItemProps = {
   item: RefinementListRenderState['items'][0];
   attribute: string;
   productListType: ProductListType;
   onClose?: () => void;
   onClick?: (newSelected: RefinementListItem) => void;
};

const SingleSelectItem = React.memo(function SingleSelectItem({
   item,
   attribute,
   productListType,
   onClose,
   onClick,
}: SingleSelectItemProps) {
   const { createURL } = useCurrentRefinements();
   const shouldBeLink =
      attribute === 'facet_tags.Item Type' &&
      productListType === ProductListType.DeviceParts;

   const TitleText = (
      <Text
         role="option"
         data-value={item.value}
         as={shouldBeLink ? 'a' : 'button'}
         onClick={(event) => {
            event.preventDefault();
            onClick && onClick(item);
            onClose?.();
         }}
         _hover={{
            textDecoration: 'underline',
         }}
         align="left"
      >
         {item.label}
      </Text>
   );

   let RefinementTitle;
   if (shouldBeLink) {
      const url = new URL(
         createURL({
            attribute,
            type: 'disjunctive',
            value: item.value,
            label: item.label,
         })
      );
      // The url created by InstantSearch doesn't have the correct item type slug.
      const path = url.pathname.split('/').filter((part) => part !== '');
      const itemTypeHandle = encodeURIComponent(
         stylizeDeviceItemType(item.value)
      );
      const href = `/${path[0]}/${path[1]}/${itemTypeHandle}${url.search}`;
      RefinementTitle = (
         <NextLink href={href} passHref>
            {TitleText}
         </NextLink>
      );
   } else {
      RefinementTitle = TitleText;
   }

   if (item.count > 0) {
      return (
         <HStack
            key={item.label}
            justify="space-between"
            color={item.isRefined ? 'brand.500' : 'inherit'}
            fontWeight={item.isRefined ? 'bold' : 'inherit'}
         >
            {RefinementTitle}
            <Text size="sm" fontFamily="sans-serif" color={'gray.500'}>
               {item.count}
            </Text>
         </HStack>
      );
   }
   return null;
});
