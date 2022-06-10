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
   const [searchQuery, setSearchQuery] = useDebouncedSearchQuery(searchBox);

   const clearSearch = React.useCallback(() => {
      setSearchQuery('');
      if (inputRef.current) {
         inputRef.current.focus();
      }
   }, []);

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

type SearchBoxRenderState = ReturnType<typeof useSearchBox>;

/**
 * Maintains a local search query while keeping it in sync with the Algolia search box query.
 * The purpose of this hook is to make the input field feel more responsive.
 *
 * @param searchBox state returned from Algolia `useSearchBox` hook
 * @returns
 */
function useDebouncedSearchQuery(
   searchBox: SearchBoxRenderState
): [string, React.Dispatch<React.SetStateAction<string>>] {
   const [localSearchQuery, setLocalSearchQuery] = React.useState(
      searchBox.query
   );
   const debouncedQuery = useDebounce(
      localSearchQuery,
      DEBOUNCE_INTERVAL_MILLIS
   );
   const lastDebouncedQueryRef = React.useRef<string | null>(null);

   React.useEffect(() => {
      if (debouncedQuery !== searchBox.query) {
         // If the last debounced value is the same as the current debounced value, then it means
         // that the value from the Algolia context has changed and we need to update the local
         // search query to keep it in sync.
         if (lastDebouncedQueryRef.current === debouncedQuery) {
            setLocalSearchQuery(searchBox.query);
         } else {
            // If the last debounced value is different than the current debounced value, then it means
            // that the value from the local search query has changed and we need to update the Algolia
            // context to update the search results
            searchBox.refine(debouncedQuery);
         }
      }
      lastDebouncedQueryRef.current = debouncedQuery;
   }, [searchBox, debouncedQuery]);

   return [localSearchQuery, setLocalSearchQuery];
}
