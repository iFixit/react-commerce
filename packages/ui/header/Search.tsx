import {
   Flex,
   FlexProps,
   forwardRef,
   Input,
   InputGroup,
   InputGroupProps,
   InputLeftElement,
   useTheme,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppContext } from '@ifixit/app';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

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
      const theme = useTheme();
      return (
         <InputGroup {...props}>
            <InputLeftElement pointerEvents="none">
               <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  color={theme.colors.gray[400]}
                  style={{
                     height: '16px',
                     marginRight: '-8px',
                     marginBottom: '-1px',
                  }}
               />
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
