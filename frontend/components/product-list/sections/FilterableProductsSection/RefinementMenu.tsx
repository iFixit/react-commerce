import { Box, Button, HStack, Icon, VStack, Text } from '@chakra-ui/react';
import React from 'react';
import { HiSelector } from 'react-icons/hi';
import {
   useRefinementList,
   UseRefinementListProps,
} from 'react-instantsearch-hooks-web';
import NextLink from 'next/link';

export type RefinementMenuProps = UseRefinementListProps & {
   createURL: (value: string) => string;
   activeValue?: string;
};

export function RefinementMenu({
   createURL,
   activeValue,
   ...otherProps
}: RefinementMenuProps) {
   const { items, isShowingMore, toggleShowMore, canToggleShowMore } =
      useRefinementList(otherProps);

   return (
      <Box>
         <VStack align="stretch" spacing="1" role="listbox">
            {items.map((item) => {
               return (
                  <MenuItem
                     key={item.label}
                     label={item.label}
                     value={item.value}
                     isRefined={item.value === activeValue}
                     count={item.count}
                     createURL={createURL}
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
   isRefined: boolean;
   count: number;
   createURL: (value: string) => string;
};

const MenuItem = React.memo(function RefinementListItem({
   label,
   count,
   value,
   createURL,
   isRefined,
}: MenuItemProps) {
   return (
      <HStack
         key={label}
         justify="space-between"
         color={isRefined ? 'brand.500' : 'inherit'}
         fontWeight={isRefined ? 'bold' : 'inherit'}
      >
         <NextLink href={createURL(value)} passHref>
            <Text
               as="a"
               _hover={{
                  textDecoration: 'underline',
               }}
            >
               {label}
            </Text>
         </NextLink>
         <Text
            size="sm"
            fontFamily="sans-serif"
            color={isRefined ? 'brand.500' : 'gray.500'}
         >
            {count}
         </Text>
      </HStack>
   );
});
