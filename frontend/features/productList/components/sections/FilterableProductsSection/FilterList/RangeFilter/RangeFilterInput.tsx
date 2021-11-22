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
   facetHandle: string;
   minFieldPrefix?: React.ReactNode;
   minFieldPlaceholder?: string;
   maxFieldPrefix?: React.ReactNode;
   maxFieldPlaceholder?: string;
   onError?: (error: string) => void;
   onDismissError?: () => void;
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

function useRangeFilterInput({
   facetHandle,
   onError,
   onDismissError,
}: RangeFilterInputProps) {
   const { getFacetHandles } = useRangeFilterContext();
   useRegisterFacet(facetHandle);
   const minRef = React.useRef<HTMLInputElement | null>(null);
   const maxRef = React.useRef<HTMLInputElement | null>(null);
   const { filter, set } = useRangeFilter(facetHandle);
   const [error, setError] = React.useState<string | null>(null);

   React.useEffect(() => {
      setError(null);
      if (minRef.current) {
         minRef.current.value = filter?.min != null ? String(filter.min) : '';
      }
      if (maxRef.current) {
         maxRef.current.value = filter?.max != null ? String(filter.max) : '';
      }
   }, [filter]);

   React.useEffect(() => {
      if (error) {
         onError?.(error);
      } else {
         onDismissError?.();
      }
   }, [error, onError, onDismissError]);

   const updateRange = useDebouncedCallback(
      (name: 'min' | 'max', text: string) => {
         let value: number | null = parseFloat(text);
         if (Number.isNaN(value)) {
            value = null;
         }
         const min = name === 'min' ? value : filter?.min;
         const max = name === 'max' ? value : filter?.max;

         const facetToBeCleared = getFacetHandles().filter(
            (name) => name !== facetHandle
         );
         set(min, max, { clearFacets: facetToBeCleared });
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
