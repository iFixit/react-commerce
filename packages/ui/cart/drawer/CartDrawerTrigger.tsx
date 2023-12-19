import { Box, Circle, IconButton } from '@chakra-ui/react';
import { faShoppingCart } from '@fortawesome/pro-solid-svg-icons';
import { FaIcon } from '@ifixit/icons';
import { BlueDot } from '../../misc';

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
            border="0"
         />
         {hasItemsInCart && (
            <BlueDot position="absolute" top="-2px" right="3px" />
         )}
      </Box>
   );
}
