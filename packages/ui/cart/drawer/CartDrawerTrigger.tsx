import { Box, Circle, IconButton } from '@chakra-ui/react';
import { faShoppingCart } from '@fortawesome/pro-solid-svg-icons';
import { FaIcon } from '@ifixit/icons';

export interface CartDrawerTriggerProps {
   onClick?: () => void;
   hasItemsInCart?: boolean;
}

export function CartDrawerTrigger({
   onClick,
   hasItemsInCart,
}: CartDrawerTriggerProps) {
   return (
      <Box position="relative">
         <IconButton
            aria-label="Open cart"
            variant="ghost"
            transition="0.3s"
            _hover={{ opacity: 0.7 }}
            display="flex"
            w={8}
            h={8}
            icon={<FaIcon icon={faShoppingCart} h="22px" color="white" />}
            onClick={onClick}
            _active={{
               bg: 'gray.900',
            }}
            data-testid="cart-drawer-open"
         />
         {hasItemsInCart && (
            <Circle
               position="absolute"
               top="0.5"
               right="2px"
               size={3}
               bg="blue.500"
               borderRadius="full"
               borderWidth={2}
               borderColor="gray.900"
            />
         )}
      </Box>
   );
}
