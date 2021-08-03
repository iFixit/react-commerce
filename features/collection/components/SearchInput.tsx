import {
   chakra,
   Icon,
   IconButton,
   Input,
   InputGroup,
   InputLeftElement,
   InputRightElement,
} from '@chakra-ui/react';
import { useSearch } from '@lib/algolia';
import * as React from 'react';
import { HiXCircle } from 'react-icons/hi';
import { RiSearchLine } from 'react-icons/ri';

interface SearchInputProps {
   className?: string;
}

export const SearchInput = chakra(({ className }: SearchInputProps) => {
   const [query, search] = useSearch();

   const clearSearch = React.useCallback(() => {
      search('');
   }, [search]);

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
            {query.length > 0 && (
               <InputRightElement>
                  <IconButton
                     variant="ghost"
                     aria-label="clear search"
                     onClick={clearSearch}
                     _hover={{
                        bg: 'transparent',
                     }}
                     _active={{
                        bg: 'transparent',
                     }}
                     icon={
                        <Icon
                           as={HiXCircle}
                           color="gray.300"
                           transition="color 300ms"
                           _hover={{ color: 'gray.500' }}
                        />
                     }
                  />
               </InputRightElement>
            )}
         </InputGroup>
      ),
      [className, clearSearch, query, search]
   );
});
