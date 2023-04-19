import {
   AccordionButton,
   AccordionIcon,
   AccordionItem,
   AccordionPanel,
   Box,
} from '@chakra-ui/react';
import type { Product } from '@pages/api/nextjs/cache/product';
import React from 'react';
export type CompatibilityNotesProps = {
   product: Product;
};

const MAX_DEFAULT_VISIBLE_DEVICES = 10;

export function CompatibilityNotes({ product }: CompatibilityNotesProps) {
   const devices = product.compatibilityNotes?.split(/\r?\n/) ?? [];
   const visibleDevices = devices
      .slice(0, MAX_DEFAULT_VISIBLE_DEVICES)
      .join(', ');
   const hiddenDevices = devices.slice(MAX_DEFAULT_VISIBLE_DEVICES).join(', ');
   return (
      <Box px={2}>
         <Box pb={5}>{visibleDevices}</Box>
         <AccordionItem>
            <AccordionButton py="5" px="1.5">
               <Box
                  flex="1"
                  textAlign="left"
                  color="gray.800"
                  fontWeight="semibold"
                  fontSize="sm"
               >
                  {'Show  More Models'}
               </Box>
               <AccordionIcon />
            </AccordionButton>
            <AccordionPanel p={2}>{hiddenDevices}</AccordionPanel>
         </AccordionItem>
      </Box>
   );
}
