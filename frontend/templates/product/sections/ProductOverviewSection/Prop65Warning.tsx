import {
   Flex,
   IconButton,
   Link,
   PlacementWithLogical,
   Popover,
   PopoverArrow,
   PopoverBody,
   PopoverCloseButton,
   PopoverContent,
   PopoverHeader,
   PopoverTrigger,
   Text,
   useBreakpointValue,
} from '@chakra-ui/react';
import {
   faExclamationTriangle,
   faInfoCircle,
} from '@fortawesome/pro-solid-svg-icons';
import { FaIcon } from '@ifixit/icons';

export type Prop65WarningProps = {
   type: string;
   chemicals: string;
};

export function Prop65Warning({ type, chemicals }: Prop65WarningProps) {
   const placement = useBreakpointValue<PlacementWithLogical>({
      base: 'auto-end',
      sm: 'bottom',
   });
   return (
      <Flex align="center" position="relative" gap="1">
         <Text>California Residents: Prop 65 WARNING</Text>
         <Popover placement={placement}>
            <PopoverTrigger>
               <IconButton
                  variant="ghost"
                  aria-label="read more about the warning"
                  size="sm"
                  icon={<FaIcon icon={faInfoCircle} h="4" color="brand.500" />}
               >
                  Trigger
               </IconButton>
            </PopoverTrigger>
            <PopoverContent
               maxW={{
                  base: '180px',
                  sm: '240px',
               }}
               mx={{
                  base: '5',
                  md: '6',
               }}
            >
               <PopoverArrow />
               <PopoverCloseButton mt="0.5" />
               <PopoverHeader textTransform="uppercase">
                  <Flex align="center">
                     <FaIcon
                        icon={faExclamationTriangle}
                        h="4"
                        mr="2"
                        color="yellow.500"
                     />
                     Warning
                  </Flex>
               </PopoverHeader>
               <PopoverBody>
                  <Text>
                     This product can expose you to chemicals including{' '}
                     {chemicals} which is known to the State of California to
                     cause {type}.
                  </Text>
                  <Text mt="2">
                     For more information, go to{' '}
                     <Link
                        href="https://www.p65warnings.ca.gov"
                        isExternal
                        color="brand.500"
                     >
                        www.P65warnings.ca.gov
                     </Link>
                  </Text>
               </PopoverBody>
            </PopoverContent>
         </Popover>
      </Flex>
   );
}
