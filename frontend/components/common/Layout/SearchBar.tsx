import {
   Flex,
   FlexProps,
   forwardRef,
   Icon,
   Input,
   InputGroup,
   InputGroupProps,
   InputLeftElement,
} from '@chakra-ui/react';
import { IFIXIT_ORIGIN } from '@config/env';
import * as React from 'react';
import { RiSearchLine } from 'react-icons/ri';

export const SearchForm = forwardRef<FlexProps, 'form'>((props, ref) => {
   return (
      <Flex
         ref={ref}
         as="form"
         method="GET"
         action={`${IFIXIT_ORIGIN}/Search`}
         {...props}
      />
   );
});

export const SearchInput = forwardRef<InputGroupProps, 'input'>(
   (props, ref) => {
      return (
         <InputGroup {...props}>
            <InputLeftElement pointerEvents="none">
               <Icon as={RiSearchLine} color="white" mr="-2" mb="-1px" />
            </InputLeftElement>
            <Input
               ref={ref}
               name="query"
               placeholder="Search"
               tabIndex={0}
               variant="filled"
               bg="trueGray.800"
               fontSize="sm"
               borderRadius="full"
               _hover={{
                  bg: 'trueGray.700',
               }}
               _focus={{
                  bg: 'trueGray.700',
               }}
            />
         </InputGroup>
      );
   }
);
