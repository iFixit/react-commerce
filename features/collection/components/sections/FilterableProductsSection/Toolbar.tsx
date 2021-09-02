import {
   Button,
   ButtonGroup,
   ButtonProps,
   Icon,
   IconButton,
   IconButtonProps,
   Select,
   SelectProps,
   Stack,
   Text,
} from '@chakra-ui/react';
import { ProductHit } from '@features/collection';
import { useHits } from '@lib/algolia';
import * as React from 'react';
import { HiOutlineMenu, HiOutlineViewGrid } from 'react-icons/hi';

export interface ToolbarProps {
   leftContent: React.ReactNode;
   rightContent: React.ReactNode;
}

export function Toolbar({ leftContent, rightContent }: ToolbarProps) {
   return (
      <Stack
         justify={{ md: 'space-between' }}
         align={{ base: 'stretch', md: 'center' }}
         direction={{ base: 'column', md: 'row' }}
      >
         {leftContent}
         {rightContent}
      </Stack>
   );
}

export function NumberOfHits() {
   const { numberOfHits } = useHits<ProductHit>();
   return (
      <Text textAlign="center" color="gray.500" fontWeight="bold">
         {numberOfHits}
         {numberOfHits === 1 ? ' result' : ' results'}
      </Text>
   );
}

export const OpenFiltersButton = (props: ButtonProps) => {
   return (
      <Button
         variant="outline"
         bg="white"
         display={{ base: 'block', md: 'none' }}
         flexBasis="100px"
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
