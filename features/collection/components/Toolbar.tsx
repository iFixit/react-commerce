import {
   Button,
   ButtonGroup,
   HStack,
   Icon,
   IconButton,
   IconButtonProps,
   Stack,
   Text,
   VStack,
} from '@chakra-ui/react';
import { Hit } from '@features/collection';
import { useHits } from '@lib/algolia';
import * as React from 'react';
import { HiOutlineMenu, HiOutlineViewGrid } from 'react-icons/hi';
import { RiSearchLine } from 'react-icons/ri';
import { FiltersModal } from './FiltersModal';
import { SearchInput } from './SearchInput';
import { ProductViewType } from './CollectionProducts';

export type ToolbarProps = {
   productViewType: ProductViewType;
   onProductViewTypeChange: (type: ProductViewType) => void;
};

export function Toolbar({
   productViewType = ProductViewType.List,
   onProductViewTypeChange,
}: ToolbarProps) {
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
         justify={{ md: 'space-between' }}
         align={{ base: 'stretch', md: 'center' }}
         direction={{ base: 'column', md: 'row' }}
      >
         <NumberOfHits />
         <HStack px={{ base: 4, sm: 0 }}>
            <FiltersModal
               isOpen={isFilterModalOpen}
               onClose={() => setIsFilterModalOpen(false)}
            />
            {/* <IconButton
               aria-label="open search and filters modal"
               icon={<Icon as={RiSearchLine} color="gray.500" />}
               variant="outline"
               size="md"
               bg="white"
               display={{ base: 'flex', md: 'none' }}
               onClick={() => setIsFilterModalOpen(true)}
            /> */}
            <VStack w="full" align="stretch" spacing={{ base: 2, md: 0 }}>
               <HStack>
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
               </HStack>
               <SearchInput
                  maxW={{
                     md: 300,
                  }}
                  // w={{ base: 'full' }}
                  //  display={{ base: 'none', md: 'block' }}
               />
            </VStack>
            <ProductViewSwitch>
               <ProductViewListButton
                  aria-label="Select list view"
                  isActive={productViewType === ProductViewType.List}
                  onClick={() => onChangeProductViewType(ProductViewType.List)}
               />
               <ProductViewGridButton
                  aria-label="Select grid view"
                  isActive={productViewType === ProductViewType.Grid}
                  onClick={() => onChangeProductViewType(ProductViewType.Grid)}
               />
            </ProductViewSwitch>
         </HStack>
      </Stack>
   );
}

export function NumberOfHits() {
   const { numberOfHits } = useHits<Hit>();
   return (
      <Text textAlign="center" color="gray.500" fontWeight="bold">
         {numberOfHits}
         {numberOfHits === 1 ? ' result' : ' results'}
      </Text>
   );
}

type ProductViewSwitchProps = React.PropsWithChildren<unknown>;

export const ProductViewSwitch = ({ children }: ProductViewSwitchProps) => {
   return (
      <ButtonGroup
         size="sm"
         isAttached
         bg="white"
         display={{ base: 'none', md: 'flex' }}
      >
         {children}
      </ButtonGroup>
   );
};

export const ProductViewListButton = (props: IconButtonProps) => {
   return (
      <IconButton
         icon={<Icon as={HiOutlineMenu} color="gray.500" />}
         mr="-px"
         variant="outline"
         size="md"
         {...props}
      />
   );
};

export const ProductViewGridButton = (props: IconButtonProps) => {
   return (
      <IconButton
         icon={<Icon as={HiOutlineViewGrid} color="gray.500" />}
         mr="-px"
         variant="outline"
         size="md"
         {...props}
      />
   );
};
