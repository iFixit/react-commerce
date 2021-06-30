import {
   chakra,
   Icon,
   Input,
   InputGroup,
   InputLeftElement,
} from '@chakra-ui/react';
import { useSearch } from '@lib/algolia';
import * as React from 'react';
import { RiSearchLine } from 'react-icons/ri';

interface SearchInputProps {
   className?: string;
}

export const SearchInput = chakra(({ className }: SearchInputProps) => {
   const [query, search] = useSearch();

   return React.useMemo(
      () => (
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
      ),
      [className, query, search]
   );
});
