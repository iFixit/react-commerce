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

export interface RangeInputProps {
   name: string;
}

export function RangeInput(props: RangeInputProps) {
   const { minRef, maxRef, error, handleChange } = useRangeInput(props);
   return (
      <FormControl isInvalid={error != null}>
         <HStack>
            <InputGroup size="sm">
               <InputLeftElement>$</InputLeftElement>
               <Input
                  ref={minRef}
                  type="number"
                  name="min"
                  placeholder="Min"
                  borderRadius="md"
                  onChange={handleChange}
               />
            </InputGroup>
            <InputGroup size="sm">
               <InputLeftElement>$</InputLeftElement>
               <Input
                  ref={maxRef}
                  type="number"
                  name="max"
                  placeholder="Max"
                  borderRadius="md"
                  onChange={handleChange}
               />
            </InputGroup>
         </HStack>
         <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
   );
}

function useRangeInput({ name }: RangeInputProps) {
   const minRef = React.useRef<HTMLInputElement | null>(null);
   const maxRef = React.useRef<HTMLInputElement | null>(null);

   const [range, setRange] = useRangeFilter(name);
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

   const updateRange = useDebouncedCallback((name: string, text: string) => {
      let value: number | null = parseFloat(text);
      if (Number.isNaN(value)) {
         value = null;
      }
      setRange((current) => {
         const newRange = {
            ...current,
            [name]: value,
         };
         return newRange;
      });
   }, 500);

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
         const name = event.currentTarget.name;
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
