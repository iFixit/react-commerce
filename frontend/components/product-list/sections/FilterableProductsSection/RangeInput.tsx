import {
   Box,
   FormControl,
   FormErrorMessage,
   FormLabel,
   HStack,
   Input,
   InputGroup,
   InputLeftElement,
   Text,
} from '@chakra-ui/react';
import { formatFacetName } from '@helpers/algolia-helpers';
import { useDebounce } from '@ifixit/ui';
import * as React from 'react';
import { useRange, UseRangeProps } from 'react-instantsearch-hooks-web';
import { useSearchCache } from './useSearchCache';

export type RangeInputProps = UseRangeProps;

const DEBOUNCE_INTERVAL_MILLIS = 300;

export function RangeInput(props: RangeInputProps) {
   const { refresh } = useSearchCache();
   // This is a quick hack to get `useRange` to work. Without this, `useRange`
   // would behave like price is not refinable. Eventually we should figure out
   // how to make `useRange` work without this hack.
   React.useEffect(() => {
      refresh();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const range = useRange(props);
   const appliedRangeMin = range.start[0];
   const appliedRangeMax = range.start[1];

   const refineMinValue = React.useCallback(
      (value: number | undefined) => {
         const maxAllowedValue = range.range.max
            ? range.range.max - 1
            : Infinity;
         const clampedValue = clamp(value, 0, maxAllowedValue);

         const isValidRange =
            clampedValue == null ||
            appliedRangeMax == null ||
            clampedValue < appliedRangeMax;

         if (isValidRange) {
            range.refine([
               clampedValue,
               Number.isFinite(appliedRangeMax) ? appliedRangeMax : undefined,
            ]);
         }
      },
      [appliedRangeMax, range]
   );

   const refineMaxValue = React.useCallback(
      (value: number | undefined) => {
         const minAllowedValue = range.range.min ? range.range.min + 1 : 0;
         const maxAllowedValue = range.range.max
            ? range.range.max - 1
            : Infinity;
         const clampedValue = clamp(value, undefined, maxAllowedValue);
         const isValidRange =
            clampedValue == null ||
            appliedRangeMin == null ||
            (clampedValue > minAllowedValue && clampedValue > appliedRangeMin);

         if (isValidRange) {
            range.refine([
               Number.isFinite(appliedRangeMin) ? appliedRangeMin : undefined,
               value == null
                  ? undefined
                  : Math.min(
                       value,
                       range.range.max ? range.range.max - 1 : Infinity
                    ),
            ]);
         }
      },
      [appliedRangeMin, range]
   );

   const min = useDebouncedValue({
      currentAlgoliaValue: appliedRangeMin,
      refine: refineMinValue,
   });

   const max = useDebouncedValue({
      currentAlgoliaValue: appliedRangeMax,
      refine: refineMaxValue,
   });

   const isValidRange =
      min.valueAsNumber == null ||
      max.valueAsNumber == null ||
      min.valueAsNumber < max.valueAsNumber;

   const minInputId = `${props.attribute}-input-min`;
   const maxInputId = `${props.attribute}-input-max`;
   const formattedAttribute = formatFacetName(props.attribute).toLowerCase();

   return (
      <FormControl isInvalid={!isValidRange}>
         <HStack>
            <Box>
               <FormLabel htmlFor={minInputId} srOnly>
                  Set min {formattedAttribute}
               </FormLabel>
               <InputGroup size="sm">
                  <InputLeftElement pointerEvents="none" color="gray.500">
                     $
                  </InputLeftElement>
                  <Input
                     type="number"
                     id={minInputId}
                     placeholder={String(range.range.min)}
                     value={min.valueAsText}
                     onChange={(event) => {
                        const value = event.target.value;
                        min.setValueText(value);
                     }}
                     borderRadius="md"
                  />
               </InputGroup>
            </Box>
            <Text>to</Text>
            <Box>
               <FormLabel htmlFor={maxInputId} srOnly>
                  Set max {formattedAttribute}
               </FormLabel>
               <InputGroup size="sm">
                  <InputLeftElement pointerEvents="none" color="gray.500">
                     $
                  </InputLeftElement>
                  <Input
                     type="number"
                     id={maxInputId}
                     placeholder={String(range.range.max)}
                     value={max.valueAsText}
                     onChange={(event) => {
                        const value = event.target.value;
                        max.setValueText(value);
                     }}
                     borderRadius="md"
                  />
               </InputGroup>
            </Box>
         </HStack>
         {!isValidRange && (
            <FormErrorMessage data-testid="input-error">
               max should be higher than min
            </FormErrorMessage>
         )}
      </FormControl>
   );
}

function parseNumber(text: string) {
   const number = parseFloat(text);
   return Number.isFinite(number) ? number : undefined;
}

function clamp(
   value: number | undefined,
   min: number | undefined,
   max: number | undefined
) {
   return value == null
      ? value
      : Math.min(Math.max(value, min ?? -Infinity), max ?? Infinity);
}

type UseDebouncedValueProps = {
   refine: (value: number | undefined) => void;
   currentAlgoliaValue: number | undefined;
};

/**
 * This hook manages the state of a number input. The goal is to decouple the
 * input from the Algolia context, so that the input field feels more responsive.
 */
function useDebouncedValue({
   currentAlgoliaValue,
   refine,
}: UseDebouncedValueProps) {
   const currentValue = Number.isFinite(currentAlgoliaValue)
      ? currentAlgoliaValue
      : undefined;

   const [valueAsText, setValueText] = React.useState<string>(
      currentValue == null ? '' : String(currentValue)
   );
   const debouncedValueText = useDebounce(
      valueAsText,
      DEBOUNCE_INTERVAL_MILLIS
   );
   const lastDeboucedValueTextRef = React.useRef<string | undefined>(undefined);

   React.useEffect(() => {
      const debouncedValue = parseNumber(debouncedValueText);
      if (debouncedValue !== currentValue) {
         if (lastDeboucedValueTextRef.current === debouncedValueText) {
            setValueText(String(currentValue));
         } else {
            refine(debouncedValue);
         }
      }
      lastDeboucedValueTextRef.current = debouncedValueText;
   }, [debouncedValueText, refine, currentValue]);

   return {
      valueAsText,
      valueAsNumber: parseNumber(valueAsText),
      setValueText,
      currentValue,
   };
}
