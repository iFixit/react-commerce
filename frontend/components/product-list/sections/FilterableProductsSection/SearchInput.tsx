import {
   forwardRef,
   Icon,
   IconButton,
   Input,
   InputGroup,
   InputGroupProps,
   InputLeftElement,
   InputRightElement,
} from '@chakra-ui/react';
import { useDebounce } from '@ifixit/ui';
import * as React from 'react';
import { HiXCircle } from 'react-icons/hi';
import { RiSearchLine } from 'react-icons/ri';
import { useSearchBox } from 'react-instantsearch-hooks-web';

type SearchInputProps = InputGroupProps;

const MAX_SEARCH_QUERY_LENGTH = 100;
const DEBOUNCE_INTERVAL_MILLIS = 300;

export const SearchInput = forwardRef<SearchInputProps, 'div'>((props, ref) => {
   const searchBox = useSearchBox();
   const inputRef = React.useRef<HTMLInputElement>(null);
   const [searchQuery, setSearchQuery] = React.useState(searchBox.query);
   const debouncedQuery = useDebounce(searchQuery, DEBOUNCE_INTERVAL_MILLIS);
   const lastDeboucedQueryRef = React.useRef<string | null>(null);

   React.useEffect(() => {
      if (debouncedQuery !== searchBox.query) {
         if (lastDeboucedQueryRef.current === debouncedQuery) {
            setSearchQuery(searchBox.query);
         } else {
            searchBox.refine(debouncedQuery);
         }
      }
      lastDeboucedQueryRef.current = debouncedQuery;
   }, [searchBox, debouncedQuery]);

   const clearSearch = React.useCallback(() => {
      setSearchQuery('');
      if (inputRef.current) {
         inputRef.current.focus();
      }
   }, [searchBox.clear]);

   return (
      <InputGroup ref={ref} {...props}>
         <InputLeftElement pointerEvents="none">
            <Icon as={RiSearchLine} color="gray.300" />
         </InputLeftElement>
         <Input
            ref={inputRef}
            bg="white"
            placeholder="Search"
            tabIndex={0}
            onChange={(event) => setSearchQuery(event.currentTarget.value)}
            value={searchQuery}
            maxLength={MAX_SEARCH_QUERY_LENGTH}
         />
         <InputRightElement
            opacity={searchQuery.length > 0 ? 1 : 0}
            pointerEvents={searchQuery.length > 0 ? 'initial' : 'none'}
         >
            <IconButton
               disabled={searchQuery.length === 0}
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
      </InputGroup>
   );
});
