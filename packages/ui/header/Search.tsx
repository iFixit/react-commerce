import {
   Flex,
   FlexProps,
   forwardRef,
   Input,
   InputGroup,
   InputGroupProps,
   InputLeftElement,
} from '@chakra-ui/react';
import { faMagnifyingGlass } from '@fortawesome/pro-solid-svg-icons';
import { useAppContext } from '@ifixit/app';
import { FaIcon } from '@ifixit/icons';

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
               <FaIcon
                  icon={faMagnifyingGlass}
                  h="4"
                  mr="-2"
                  mb="-1px"
                  color="gray.600"
               />
            </InputLeftElement>
            <Input
               ref={ref}
               name="query"
               placeholder="Search"
               _placeholder={{
                  color: 'gray.500',
               }}
               tabIndex={0}
               variant="filled"
               bg="gray.200"
               color="gray.700"
               fontSize="sm"
               borderRadius="full"
               _focus={{
                  bg: 'gray.100',
               }}
            />
         </InputGroup>
      );
   }
);
