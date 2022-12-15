import {
   Box,
   Button,
   Flex,
   HStack,
   List,
   ListIcon,
   ListItem,
   Text,
} from '@chakra-ui/react';
import { Money } from '@ifixit/helpers';
import { FaIcon } from '@ifixit/icons';
import { CartLineItemImage } from './CartLineItemImage';
import { faCircleCheck } from '@fortawesome/pro-solid-svg-icons';
import { ProductVariantPrice } from '../../commerce';

export interface UpsellProps {
   item?: UpsellItem;
}

interface UpsellItem {
   id: string; // variant id
   title: string;
   subtitle: string;
   imageUrl?: string | null; // url to image
   variantTitle: string;
   valuePropositions: string[];
   price: Money;
   compareAtPrice?: Money | null;
   proPricesByTier?: Record<string, Money> | null;
}

const mockItem: UpsellItem = {
   id: '123',
   title: 'Anti-clamp is the safest way to open glued devices',
   subtitle: 'Add the product below to your order',
   imageUrl: null,
   variantTitle: 'Anti-clamp',
   valuePropositions: [
      'Precision tool for separating screens',
      'Opposed suction cups help open any screen',
   ],
   price: {
      amount: 100,
      currencyCode: 'USD',
   },
   compareAtPrice: null,
   proPricesByTier: null,
};

export function Upsell({ item = mockItem }: UpsellProps) {
   return (
      <Box p="3">
         <Box
            bgColor="brand.100"
            py="4"
            px="3"
            rounded="md"
            borderWidth="1px"
            borderColor="brand.200"
            borderStyle="solid"
         >
            <Text color="brand.500" fontWeight="semibold">
               {item.title}
            </Text>
            <Text color="brand.500">{item.subtitle}</Text>
            <HStack mt="3" align="flex-start" spacing="3">
               <CartLineItemImage src={item.imageUrl} alt={item.variantTitle} />
               <Box py="1">
                  <Text fontWeight="semibold">{item.variantTitle}</Text>
                  <List spacing="2.5" fontSize="sm" mt="1.5" lineHeight="short">
                     {item.valuePropositions.map((valueProposition, index) => {
                        return (
                           <ListItem
                              key={index}
                              display="flex"
                              alignItems="center"
                           >
                              <ListIcon
                                 as={FaIcon}
                                 h="4"
                                 w="5"
                                 mr="1.5"
                                 color="brand.500"
                                 icon={faCircleCheck}
                              />
                              {valueProposition}
                           </ListItem>
                        );
                     })}
                  </List>
               </Box>
            </HStack>
            <Flex mt="2" justify="flex-end">
               <ProductVariantPrice price={item.price} size="small" />
            </Flex>
            <Button
               w="full"
               colorScheme="brand"
               mt="3"
               data-testid="upsell-add-to-cart-button"
            >
               Add to cart
            </Button>
         </Box>
      </Box>
   );
}
