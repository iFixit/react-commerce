import { Box, Button, HStack, Icon, VStack, Text } from '@chakra-ui/react';
import React from 'react';
import { HiSelector } from 'react-icons/hi';
import { RefinementListRenderState } from 'instantsearch.js/es/connectors/refinement-list/connectRefinementList';
import {
   useClearRefinements,
   useCurrentRefinements,
   UseRefinementListProps,
} from 'react-instantsearch-hooks-web';
import NextLink from 'next/link';
import { useSortBy } from './useSortBy';
import { useFilteredRefinementList } from './useFilteredRefinementList';
import { ProductList } from '@models/product-list';
import { useDecoupledState } from '@ifixit/ui';
import { encodeDeviceItemType } from '@helpers/product-list-helpers';

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
         <VStack align="stretch" spacing="1" role="listbox">
            {items.map((item) => {
               return (
                  <SingleSelectItem
                     key={item.label}
                     item={item}
                     attribute={otherProps.attribute}
                     refine={refine}
                     onClose={onClose}
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
   refine: RefinementListRenderState['refine'];
   onClose?: () => void;
};

const SingleSelectItem = React.memo(function SingleSelectItem({
   item,
   attribute,
   refine,
   onClose,
}: SingleSelectItemProps) {
   const [isRefined, setIsRefined] = useDecoupledState(item.isRefined);
   const { refine: clearRefinements } = useClearRefinements({
      includedAttributes: [attribute],
   });
   const { createURL } = useCurrentRefinements();

   const TitleText = (
      <Text
         as={attribute === 'facet_tags.Item Type' ? 'a' : 'button'}
         onClick={(event) => {
            event.preventDefault();
            setIsRefined((current) => !current);
            clearRefinements();
            refine(item.value);
            onClose?.();
         }}
         _hover={{
            textDecoration: 'underline',
         }}
      >
         {item.label}
      </Text>
   );

   let RefinementTitle;
   if (attribute === 'facet_tags.Item Type') {
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
      const itemTypeHandle = encodeDeviceItemType(item.value);
      const href = `${url.origin}/${path[0]}/${path[1]}/${itemTypeHandle}${url.search}`;
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
         color={isRefined ? 'brand.500' : 'inherit'}
         fontWeight={isRefined ? 'bold' : 'inherit'}
      >
         {RefinementTitle}
         <Text size="sm" fontFamily="sans-serif" color={'gray.500'}>
            {item.count}
         </Text>
      </HStack>
   );
});
