import {
   chakra,
   Input,
   InputGroup,
   InputLeftElement,
   Icon,
} from '@chakra-ui/react';
import React from 'react';
import { useSearch } from '@libs/algolia';
import { RiSearchLine } from 'react-icons/ri';

interface SearchInputProps {
   className?: string;
}

export const SearchInput = chakra(({ className }: SearchInputProps) => {
   const [query, search] = useSearch();
   return (
      <InputGroup className={className}>
         <InputLeftElement pointerEvents="none">
            <Icon as={RiSearchLine} color="gray.300" />
         </InputLeftElement>
         <Input
            bg="white"
            placeholder="Search"
            tabIndex={0}
            onChange={(event) => search(event.currentTarget.value)}
            value={query}
         />
      </InputGroup>
   );
});
