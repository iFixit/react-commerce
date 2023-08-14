import { Button, Circle, Text, VStack } from '@chakra-ui/react';
import { faCartCircleExclamation } from '@fortawesome/pro-duotone-svg-icons';
import { FaIcon } from '@ifixit/icons';

export interface CartEmptyStateProps {}

export function CartEmptyState({}: CartEmptyStateProps) {
   return (
      <VStack spacing="5" p="5">
         <Circle size="72px" bg="brand.100">
            <FaIcon icon={faCartCircleExclamation} h="8" color="blue.ifixit" />
         </Circle>
         <Text>Your cart is empty</Text>
      </VStack>
   );
}
