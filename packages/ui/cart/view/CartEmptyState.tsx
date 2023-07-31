import { Button, Circle, Text, VStack } from '@chakra-ui/react';
import { faCartCircleExclamation } from '@fortawesome/pro-duotone-svg-icons';
import { FaIcon } from '@ifixit/icons';

export interface CartEmptyStateProps {
   onClose: () => void;
}

export function CartEmptyState({ onClose }: CartEmptyStateProps) {
   return (
      <VStack spacing="5" p="5">
         <Circle size="72px" bg="brand.100">
            <FaIcon icon={faCartCircleExclamation} h="8" color="blue.ifixit" />
         </Circle>
         <Text>Your cart is empty</Text>
         <Button
            colorScheme="blue"
            onClick={onClose}
            data-testid="back-to-shopping"
         >
            Back to shopping
         </Button>
      </VStack>
   );
}
