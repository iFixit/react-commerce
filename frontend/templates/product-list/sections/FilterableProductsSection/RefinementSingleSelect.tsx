import {
   Box,
   HStack,
   StackProps,
   Text,
   VStack,
} from '@chakra-ui/react';
import { stylizeDeviceItemType } from '@helpers/product-list-helpers';
import { ProductList, ProductListType } from '@models/product-list';
import { RefinementListRenderState } from 'instantsearch.js/es/connectors/refinement-list/connectRefinementList';
import NextLink from 'next/link';
import React from 'react';
import {
   useCurrentRefinements,
   UseRefinementListProps,
   useInstantSearch,
} from 'react-instantsearch-hooks-web';
import { ShowMoreButton } from './ShowMoreButton';
import { useFilteredRefinementList } from './useFilteredRefinementList';
import { useSortBy } from './useSortBy';

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

   return (
      <Box>
         <SingleSelectStack>
            {items.map((item) => (
               <SingleSelectItem
                  key={item.label}
                  item={item}
                  attribute={otherProps.attribute}
                  shouldBeLink={isDevicePartsItemType}
                  onClick={onItemClick}
               />
            ))}
         </SingleSelectStack>
         {canToggleShowMore && (
            <ShowMoreButton
               isShowingMore={isShowingMore}
               onClick={toggleShowMore}
            />
         )}
      </Box>
   );
}

type SingleSelectItemProps = {
   item: RefinementListRenderState['items'][0];
   attribute: string;
   productListType: ProductListType;
   onClose?: () => void;
};

const SingleSelectItem = React.memo(function SingleSelectItem({
   item,
   attribute,
   productListType,
   onClose,
}: SingleSelectItemProps) {
   const { createURL } = useCurrentRefinements();
   const { setIndexUiState } = useInstantSearch();
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
            setIndexUiState((prevUiState) => {
               const refinementList = {
                  ...prevUiState.refinementList,
                  [attribute]: [item.value],
               };
               if (
                  item.value === prevUiState?.refinementList?.[attribute]?.[0]
               ) {
                  delete refinementList[attribute];
               }
               return {
                  ...prevUiState,
                  refinementList: refinementList,
               };
            });
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
});

function SingleSelectStack(props: StackProps) {
   return <VStack align="stretch" spacing="1" role="listbox" {...props} />;
}
