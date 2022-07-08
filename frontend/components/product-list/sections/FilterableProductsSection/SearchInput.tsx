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
import debounce from 'lodash/debounce';
import * as React from 'react';
import { HiXCircle } from 'react-icons/hi';
import { RiSearchLine } from 'react-icons/ri';
import { useSearchBox } from 'react-instantsearch-hooks-web';

type SearchInputProps = InputGroupProps;

const MAX_SEARCH_QUERY_LENGTH = 100;
const DEBOUNCE_INTERVAL_MILLIS = 300;

export const SearchInput = forwardRef<SearchInputProps, 'div'>((props, ref) => {
   const { query, refine, clear } = useSearchBox({
      queryHook: debouncedQueryHook,
   });
   const inputRef = React.useRef<HTMLInputElement>(null);

   const clearSearch = React.useCallback(() => {
      if (inputRef.current) {
         clear();
         inputRef.current.value = '';
         inputRef.current.focus();
      }
   }, [clear]);

   return (
      <InputGroup ref={ref} {...props}>
         <InputLeftElement pointerEvents="none">
            <Icon as={RiSearchLine} color="gray.300" />
         </InputLeftElement>
         <Input
            ref={inputRef}
            data-testid="collections-search-box"
            bg="white"
            tabIndex={0}
            onChange={(event) => refine(event.currentTarget.value)}
            defaultValue={query}
            maxLength={MAX_SEARCH_QUERY_LENGTH}
         />
         <InputRightElement
            opacity={query.length > 0 ? 1 : 0}
            pointerEvents={query.length > 0 ? 'initial' : 'none'}
         >
            <IconButton
               disabled={query.length === 0}
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

function queryHook(query: string, search: (value: string) => void) {
   search(query);
}

const debouncedQueryHook = debounce(queryHook, DEBOUNCE_INTERVAL_MILLIS);
