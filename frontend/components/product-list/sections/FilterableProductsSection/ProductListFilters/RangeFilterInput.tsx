import {
   Box,
   FormControl,
   FormErrorMessage,
   HStack,
   Input,
   InputGroup,
   InputLeftElement,
   useBreakpointValue,
} from '@chakra-ui/react';
import { ScreenOnlyLabel } from '@components/ui';
import { Facet, useRangeFilter } from '@lib/algolia';
import { useDebouncedCallback } from '@lib/hooks';
import * as React from 'react';

export interface RangeFilterInputProps {
   facet: Facet;
   minFieldPrefix?: React.ReactNode;
   minFieldPlaceholder?: string;
   maxFieldPrefix?: React.ReactNode;
   maxFieldPlaceholder?: string;
   dependentFacets?: string[];
   onError?: (error: string) => void;
   onDismissError?: () => void;
}

export function RangeFilterInput(props: RangeFilterInputProps) {
   const { minRef, maxRef, error, handleChange } = useRangeFilterInput(props);
   const minInputId = `${props.facet.handle}-input-min`;
   const maxInputId = `${props.facet.handle}-input-max`;
   const inputSize = useBreakpointValue({ base: 'md', md: 'sm' }, 'md');
   return (
      <FormControl isInvalid={error != null} pt="2">
         <HStack>
            <Box>
               <ScreenOnlyLabel htmlFor={minInputId}>
                  Set min {props.facet.name}
               </ScreenOnlyLabel>
               <InputGroup size={inputSize}>
                  {props.minFieldPrefix && (
                     <InputLeftElement zIndex="0">
                        {props.minFieldPrefix}
                     </InputLeftElement>
                  )}
                  <Input
                     ref={minRef}
                     id={minInputId}
                     type="number"
                     name="min"
                     placeholder={props.minFieldPlaceholder}
                     borderRadius="md"
                     onChange={handleChange}
                  />
               </InputGroup>
            </Box>
            <Box>
               <ScreenOnlyLabel htmlFor={maxInputId}>
                  Set max {props.facet.name}
               </ScreenOnlyLabel>
               <InputGroup size={inputSize}>
                  {props.maxFieldPrefix && (
                     <InputLeftElement zIndex="0">
                        {props.maxFieldPrefix}
                     </InputLeftElement>
                  )}
                  <Input
                     ref={maxRef}
                     id={maxInputId}
                     type="number"
                     name="max"
                     placeholder={props.maxFieldPlaceholder}
                     borderRadius="md"
                     onChange={handleChange}
                  />
               </InputGroup>
            </Box>
         </HStack>
         <FormErrorMessage data-test="input-error">{error}</FormErrorMessage>
      </FormControl>
   );
}

function useRangeFilterInput({
   facet,
   dependentFacets,
   onError,
   onDismissError,
}: RangeFilterInputProps) {
   const minRef = React.useRef<HTMLInputElement | null>(null);
   const maxRef = React.useRef<HTMLInputElement | null>(null);
   const { filter, set } = useRangeFilter(facet.handle);
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

         set(min, max, { clearFacets: dependentFacets });
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
