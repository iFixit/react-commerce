import {
   Box,
   forwardRef,
   IconButton,
   Input,
   InputGroup,
   InputGroupProps,
   InputLeftElement,
   InputRightElement,
} from '@chakra-ui/react';
import {
   faCircleXmark,
   faMagnifyingGlass,
} from '@fortawesome/pro-solid-svg-icons';
import { FaIcon } from '@ifixit/icons';
import { useSearchQuery } from '@templates/product-list/hooks/useSearchQuery';
import debounce from 'lodash/debounce';
import * as React from 'react';
import { useSearchBox } from 'react-instantsearch';

type SearchInputProps = InputGroupProps;

const MAX_SEARCH_QUERY_LENGTH = 100;
const DEBOUNCE_INTERVAL_MILLIS = 50;

export const SearchInput = forwardRef<SearchInputProps, 'div'>((props, ref) => {
   const { query, refine, clear } = useSearchBox({
      queryHook: debouncedQueryHook,
   });
   const { searchQuery, setSearchQuery } = useSearchQuery();

   const inputRef = React.useRef<HTMLInputElement>(null);

   const clearSearch = React.useCallback(() => {
      setSearchQuery('');
      clear();
      inputRef.current?.focus();
   }, [setSearchQuery, clear]);

   return (
      <InputGroup ref={ref} {...props}>
         <InputLeftElement pointerEvents="none">
            <FaIcon icon={faMagnifyingGlass} h="4" color="gray.300" />
         </InputLeftElement>
         <Input
            ref={inputRef}
            data-testid="collections-search-box"
            bg="white"
            borderColor="gray.300"
            _placeholder={{
               color: 'gray.400',
            }}
            placeholder={props.placeholder}
            tabIndex={0}
            onChange={(event) => {
               refine(event.currentTarget.value);
               setSearchQuery(event.currentTarget.value);
            }}
            value={searchQuery}
            maxLength={MAX_SEARCH_QUERY_LENGTH}
            borderRadius="base"
         />
         <InputRightElement
            opacity={query.length > 0 ? 1 : 0}
            pointerEvents={query.length > 0 ? 'initial' : 'none'}
         >
            <IconButton
               isDisabled={query.length === 0}
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
                  <Box color="gray.300" _hover={{ color: 'gray.500' }}>
                     <FaIcon
                        icon={faCircleXmark}
                        h="4"
                        transition="color 300ms"
                     />
                  </Box>
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
