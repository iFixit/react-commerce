import { Flex, Text } from '@chakra-ui/react';
import { faCircleExclamation } from '@fortawesome/pro-solid-svg-icons';
import { FaIcon } from '@ifixit/icons';

interface InventoryMessageProps {
   quantityAvailable?: number | null;
   quantityAddedToCart?: number;
}

export function InventoryMessage({
   quantityAvailable,
   quantityAddedToCart = 0,
}: InventoryMessageProps) {
   if (quantityAvailable == null || quantityAvailable >= 10) {
      return null;
   }
   const remaining = Math.max(0, quantityAvailable - quantityAddedToCart);

   return (
      <Flex
         color="red.600"
         mt="2.5"
         fontSize="sm"
         align="center"
         justify="center"
         data-testid="product-inventory-message"
      >
         <FaIcon
            icon={faCircleExclamation}
            display="block"
            h="4"
            mr="1.5"
            color="red.500"
         />
         {remaining > 0 ? (
            <>
               Only{' '}
               <Text fontWeight="bold" mx="1">
                  {remaining}
               </Text>{' '}
               left
            </>
         ) : (
            <>No more items available</>
         )}
      </Flex>
   );
}
