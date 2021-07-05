import {
   Button,
   ButtonGroup,
   HStack,
   Icon,
   IconButton,
   Stack,
   Text,
} from '@chakra-ui/react';
import { ProductHit } from '@features/collection';
import { useHits } from '@lib/algolia';
import * as React from 'react';
import { HiOutlineMenu, HiOutlineViewGrid } from 'react-icons/hi';
import { RiSearchLine } from 'react-icons/ri';
import { FiltersModal } from './FiltersModal';
import { SearchInput } from './SearchInput';
import { ProductViewType } from './types';

export type CollectionToolbarProps = {
   productViewType: ProductViewType;
   onProductViewTypeChange: (type: ProductViewType) => void;
};
export function CollectionToolbar({
   productViewType = ProductViewType.List,
   onProductViewTypeChange,
}: CollectionToolbarProps) {
   const { numberOfHits } = useHits<ProductHit>();
   const [isFilterModalOpen, setIsFilterModalOpen] = React.useState(false);
   const onChangeProductViewType = React.useCallback(
      (newViewType: ProductViewType) => {
         if (newViewType !== productViewType) {
            onProductViewTypeChange(newViewType);
         }
      },
      [productViewType, onProductViewTypeChange]
   );
   return (
      <Stack
         justify={{ sm: 'space-between' }}
         align={{ base: 'stretch', sm: 'center' }}
         direction={{ base: 'column', sm: 'row' }}
      >
         <Text textAlign="center" color="gray.500" fontWeight="bold">
            {numberOfHits}
            {numberOfHits === 1 ? ' result' : ' results'}
         </Text>
         <HStack px={{ base: 4, sm: 0 }}>
            <FiltersModal
               isOpen={isFilterModalOpen}
               onClose={() => setIsFilterModalOpen(false)}
            />
            <IconButton
               aria-label="open search and filters modal"
               icon={<Icon as={RiSearchLine} color="gray.500" />}
               variant="outline"
               size="md"
               bg="white"
               display={{ base: 'flex', md: 'none' }}
               onClick={() => setIsFilterModalOpen(true)}
            />
            <Button
               variant="outline"
               bg="white"
               display={{ base: 'block', md: 'none' }}
               flex={1}
               onClick={() => setIsFilterModalOpen(true)}
            >
               Filters
            </Button>
            <Button
               variant="outline"
               bg="white"
               display={{ base: 'block', md: 'none' }}
               flex={1}
               onClick={() => alert('not implemented yet')}
            >
               Sorting
            </Button>
            <SearchInput maxW={300} display={{ base: 'none', md: 'block' }} />
            <ButtonGroup
               size="sm"
               isAttached
               bg="white"
               display={{ base: 'none', sm: 'flex' }}
            >
               <IconButton
                  aria-label="Select list view"
                  icon={<Icon as={HiOutlineMenu} color="gray.500" />}
                  mr="-px"
                  variant="outline"
                  size="md"
                  isActive={productViewType === ProductViewType.List}
                  onClick={() => onChangeProductViewType(ProductViewType.List)}
               />
               <IconButton
                  aria-label="Select grid view"
                  icon={<Icon as={HiOutlineViewGrid} color="gray.500" />}
                  variant="outline"
                  size="md"
                  isActive={productViewType === ProductViewType.Grid}
                  onClick={() => onChangeProductViewType(ProductViewType.Grid)}
               />
            </ButtonGroup>
         </HStack>
      </Stack>
   );
}
