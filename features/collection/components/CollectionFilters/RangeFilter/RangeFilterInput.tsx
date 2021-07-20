import {
   FormControl,
   FormErrorMessage,
   HStack,
   Input,
   InputGroup,
   InputLeftElement,
} from '@chakra-ui/react';
import { useRangeFilter } from '@lib/algolia';
import { useDebouncedCallback } from '@lib/hooks';
import * as React from 'react';
import { useRangeFilterContext, useRegisterFacet } from './context';

export interface RangeFilterInputProps {
   facetName: string;
   minFieldPrefix?: React.ReactNode;
   minFieldPlaceholder?: string;
   maxFieldPrefix?: React.ReactNode;
   maxFieldPlaceholder?: string;
}

export function RangeFilterInput(props: RangeFilterInputProps) {
   const { minRef, maxRef, error, handleChange } = useRangeFilterInput(props);
   const {
      minFieldPrefix,
      minFieldPlaceholder,
      maxFieldPrefix,
      maxFieldPlaceholder,
   } = props;
   return (
      <FormControl isInvalid={error != null} pt="2">
         <HStack>
            <InputGroup size="sm">
               {minFieldPrefix && (
                  <InputLeftElement zIndex="0">
                     {minFieldPrefix}
                  </InputLeftElement>
               )}
               <Input
                  ref={minRef}
                  type="number"
                  name="min"
                  placeholder={minFieldPlaceholder}
                  borderRadius="md"
                  onChange={handleChange}
               />
            </InputGroup>
            <InputGroup size="sm">
               {maxFieldPrefix && (
                  <InputLeftElement zIndex="0">
                     {maxFieldPrefix}
                  </InputLeftElement>
               )}
               <Input
                  ref={maxRef}
                  type="number"
                  name="max"
                  placeholder={maxFieldPlaceholder}
                  borderRadius="md"
                  onChange={handleChange}
               />
            </InputGroup>
         </HStack>
         <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
   );
}

function useRangeFilterInput({ facetName }: RangeFilterInputProps) {
   const { getFacetNames } = useRangeFilterContext();
   useRegisterFacet(facetName);
   const minRef = React.useRef<HTMLInputElement | null>(null);
   const maxRef = React.useRef<HTMLInputElement | null>(null);
   const { range, set } = useRangeFilter(facetName);
   const [error, setError] = React.useState<string | null>(null);

   React.useEffect(() => {
      setError(null);
      if (minRef.current) {
         minRef.current.value = range.min != null ? String(range.min) : '';
      }
      if (maxRef.current) {
         maxRef.current.value = range.max != null ? String(range.max) : '';
      }
   }, [range]);

   const updateRange = useDebouncedCallback(
      (name: 'min' | 'max', text: string) => {
         let value: number | null = parseFloat(text);
         if (Number.isNaN(value)) {
            value = null;
         }
         const newRange = { ...range };
         newRange[name] = value;
         const facetToBeCleared = getFacetNames().filter(
            (name) => name !== facetName
         );
         set(newRange, { clearFacets: facetToBeCleared });
      },
      500
   );

   const showError = useDebouncedCallback(() => {
      const min = parseFloat(minRef.current?.value || '');
      const max = parseFloat(maxRef.current?.value || '');
      if (!Number.isNaN(min) && !Number.isNaN(max) && min > max) {
         setError('max should be higher than min');
      } else {
         setError(null);
      }
   }, 1000);

   const handleChange = React.useCallback<
      React.ChangeEventHandler<HTMLInputElement>
   >(
      (event) => {
         const text = event.currentTarget.value;
         const name = event.currentTarget.name as any;
         updateRange(name, text);
         showError();
      },
      [updateRange, showError]
   );

   return {
      minRef,
      maxRef,
      handleChange,
      error,
   };
}
