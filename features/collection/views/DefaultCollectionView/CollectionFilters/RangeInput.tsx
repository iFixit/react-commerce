import { HStack, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { useRangeInput } from '@lib/algolia';
import { useDebouncedCallback } from '@lib/hooks';
import * as React from 'react';

export interface RangeInputProps {
   name: string;
}

export function RangeInput({ name }: RangeInputProps) {
   const minRef = React.useRef<HTMLInputElement | null>(null);
   const maxRef = React.useRef<HTMLInputElement | null>(null);

   const [range, setRange] = useRangeInput(name);

   React.useEffect(() => {
      if (minRef.current) {
         minRef.current.value = range.min != null ? String(range.min) : '';
      }
      if (maxRef.current) {
         maxRef.current.value = range.max != null ? String(range.max) : '';
      }
   }, [range]);

   const updateRange = useDebouncedCallback((name: string, text: string) => {
      const value = parseFloat(text);
      setRange((current) => {
         return {
            ...current,
            [name]: Number.isNaN(value) ? null : value,
         };
      });
   }, 500);

   const handleChange = React.useCallback<
      React.ChangeEventHandler<HTMLInputElement>
   >(
      (event) => {
         const text = event.currentTarget.value;
         const name = event.currentTarget.name;
         updateRange(name, text);
      },
      [updateRange]
   );

   return (
      <HStack pt="2">
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
   );
}
