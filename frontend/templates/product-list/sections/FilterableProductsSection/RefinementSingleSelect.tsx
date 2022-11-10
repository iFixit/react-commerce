import {
   Box,
   HStack,
   StackProps,
   Text,
   useBoolean,
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
import {
   DEFAULT_SHOW_MORE_LIMIT,
   useFilteredRefinementList,
} from './useFilteredRefinementList';
import { useSortBy } from './useSortBy';

type RefinementSingleSelectProps = Omit<
   UseRefinementListProps,
   'sortBy' | 'limit'
> & {
   productList: ProductList;
   onItemClick?: () => void;
};

export function RefinementSingleSelect({
   productList,
   onItemClick,
   ...otherProps
}: RefinementSingleSelectProps) {
   const isDevicePartsItemType =
      otherProps.attribute === 'facet_tags.Item Type' &&
      productList.type === ProductListType.DeviceParts;
   const shouldRenderHiddenItems =
      isDevicePartsItemType && otherProps.showMore && otherProps.showMoreLimit;
   const limit = shouldRenderHiddenItems
      ? otherProps.showMoreLimit! - 1
      : undefined;
   const { items, isShowingMore, toggleShowMore, canToggleShowMore } =
      useFilteredRefinementList({
         ...otherProps,
         limit,
         sortBy: useSortBy(otherProps),
      });

   return shouldRenderHiddenItems ? (
      <SingleSelectRenderAll
         items={items}
         attribute={otherProps.attribute}
         showMoreLimit={DEFAULT_SHOW_MORE_LIMIT}
         onItemClick={onItemClick}
      />
   ) : (
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

type SingleSelectRenderAllProps = {
   items: RefinementListRenderState['items'];
   attribute: string;
   showMoreLimit: number;
   onItemClick?: () => void;
};

const SingleSelectRenderAll = React.memo(function SingleSelectRenderAll({
   items,
   attribute,
   showMoreLimit,
   onItemClick,
}: SingleSelectRenderAllProps) {
   const [isShowingAll, { toggle: toggleShowAll }] = useBoolean(false);
   const previewItems = React.useMemo(
      () => items.slice(0, showMoreLimit),
      [items, showMoreLimit]
   );
   const invisibleItems = React.useMemo(
      () => items.slice(showMoreLimit),
      [items, showMoreLimit]
   );
   return (
      <>
         <SingleSelectStack>
            {(isShowingAll ? items : previewItems).map((item) => (
               <SingleSelectItem
                  key={item.label}
                  item={item}
                  attribute={attribute}
                  shouldBeLink
                  onClick={onItemClick}
               />
            ))}
            {!isShowingAll && (
               <Box h="0" overflow="hidden">
                  {invisibleItems.map((item) => (
                     <SingleSelectItem
                        key={item.label}
                        item={item}
                        attribute={attribute}
                        shouldBeLink
                        onClick={onItemClick}
                     />
                  ))}
               </Box>
            )}
         </SingleSelectStack>
         <ShowMoreButton isShowingMore={isShowingAll} onClick={toggleShowAll} />
      </>
   );
});

type SingleSelectItemProps = {
   item: RefinementListRenderState['items'][0];
   attribute: string;
   shouldBeLink: boolean;
   onClick?: () => void;
};

const SingleSelectItem = React.memo(function SingleSelectItem({
   item,
   attribute,
   shouldBeLink,
   onClick,
}: SingleSelectItemProps) {
   const { createURL } = useCurrentRefinements();
   const { setIndexUiState } = useInstantSearch();

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
               delete prevUiState.page;
               return {
                  ...prevUiState,
                  refinementList,
               };
            });
            onClick?.();
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
