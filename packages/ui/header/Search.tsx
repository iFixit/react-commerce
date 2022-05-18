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
import { useAppContext } from '@ifixit/app';
import * as React from 'react';
import { RiSearchLine } from 'react-icons/ri';

export const DesktopHeaderSearchForm = forwardRef<FlexProps, 'form'>(
   (props, ref) => {
      const appContext = useAppContext();
      return (
         <Flex
            ref={ref}
            as="form"
            method="GET"
            action={`${appContext.ifixitOrigin}/Search`}
            flexGrow={1}
            mx="8"
            display={{
               base: 'none',
               md: 'block',
            }}
            {...props}
         />
      );
   }
);

export const MobileHeaderSearchForm = forwardRef<FlexProps, 'form'>(
   (props, ref) => {
      const appContext = useAppContext();
      return (
         <Flex
            ref={ref}
            as="form"
            method="GET"
            action={`${appContext.ifixitOrigin}/Search`}
            flexGrow={1}
            mr="1"
            {...props}
         />
      );
   }
);

export const HeaderSearchForm = {
   Desktop: DesktopHeaderSearchForm,
   Mobile: MobileHeaderSearchForm,
};

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
               bg="gray.800"
               fontSize="sm"
               borderRadius="full"
               _hover={{
                  bg: 'gray.700',
               }}
               _focus={{
                  bg: 'gray.700',
               }}
            />
         </InputGroup>
      );
   }
);
