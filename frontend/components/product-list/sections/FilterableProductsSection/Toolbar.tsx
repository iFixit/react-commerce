import {
   Button,
   ButtonGroup,
   ButtonGroupProps,
   ButtonProps,
   Flex,
   Icon,
   IconButton,
   IconButtonProps,
   Select,
   SelectProps,
   Stack,
   Text,
   useDisclosure,
} from '@chakra-ui/react';
import { ProductList } from '@models/product-list';
import { HiOutlineMenu, HiOutlineViewGrid } from 'react-icons/hi';
import { useHits } from 'react-instantsearch-hooks-web';
import { FacetsDrawer } from './FacetsDrawer';
import { SearchInput } from './SearchInput';

export enum ProductViewType {
   Grid = 'grid',
   List = 'list',
}

export type ToolbarProps = {
   viewType: ProductViewType;
   productList: ProductList;
   onViewTypeChange: (viewType: ProductViewType) => void;
};

export function Toolbar(props: ToolbarProps) {
   const { viewType, onViewTypeChange, productList } = props;
   const drawer = useDisclosure({
      defaultIsOpen: false,
   });
   return (
      <>
         <FacetsDrawer
            isOpen={drawer.isOpen}
            onClose={drawer.onClose}
            productList={productList}
         />
         <Stack
            justify={{ md: 'space-between' }}
            align={{ base: 'stretch', md: 'center' }}
            direction={{ base: 'column', md: 'row' }}
         >
            <NumberOfHits />
            <Flex
               wrap="wrap"
               flexGrow={1}
               justify="flex-end"
               px={{ base: 6, sm: 0 }}
            >
               <OpenFiltersButton onClick={drawer.onOpen}>
                  Filters
               </OpenFiltersButton>
               <SearchInput
                  order={{
                     base: 3,
                     md: 2,
                  }}
                  maxW={{
                     base: 'full',
                     md: '80',
                  }}
                  mt={{
                     base: '2',
                     md: '0',
                  }}
                  flexGrow={1}
               />
               <ProductViewSwitch
                  ml="2"
                  order={{
                     base: 2,
                     md: 3,
                  }}
               >
                  <ProductViewListButton
                     aria-label="Select list view"
                     isActive={viewType === ProductViewType.List}
                     onClick={() => onViewTypeChange(ProductViewType.List)}
                  />
                  <ProductViewGridButton
                     aria-label="Select grid view"
                     isActive={viewType === ProductViewType.Grid}
                     onClick={() => onViewTypeChange(ProductViewType.Grid)}
                  />
               </ProductViewSwitch>
            </Flex>
         </Stack>
      </>
   );
}

export function NumberOfHits() {
   const { results } = useHits();
   const hitsCount = results?.nbHits;
   if (hitsCount == null) {
      return null;
   }
   return (
      <Text textAlign="center" color="gray.500" fontWeight="bold">
         {hitsCount}
         {hitsCount === 1 ? ' result' : ' results'}
      </Text>
   );
}

export const OpenFiltersButton = (props: ButtonProps) => {
   return (
      <Button
         variant="outline"
         bg="white"
         display={{ base: 'block', md: 'none' }}
         minW="50%"
         flexGrow={1}
         {...props}
      />
   );
};

export const SortBySelect = (props: SelectProps) => {
   return (
      <Select
         variant="outline"
         bg="white"
         flexBasis="100px"
         flexGrow={1}
         display={{ base: 'block', md: 'none' }}
         fontWeight="semibold"
         {...props}
      />
   );
};

export const ProductViewSwitch = (props: ButtonGroupProps) => {
   return (
      <ButtonGroup
         size="sm"
         isAttached
         bg="white"
         borderRadius="md"
         {...props}
      />
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
