import {
   AccordionButton,
   AccordionIcon,
   AccordionItem,
   AccordionPanel,
   Box,
} from '@chakra-ui/react';
import type { Product } from '@pages/api/nextjs/cache/product';
import React from 'react';
import { splitCompatibilityNotes } from '../CompatibilityNotesSection';

export type CompatibilityNotesProps = {
   product: Product;
};

export function CompatibilityNotes({ product }: CompatibilityNotesProps) {
   const compatibilityNotes = product.compatibilityNotes;
   const [visibleDevices, hiddenDevices] = splitCompatibilityNotes({
      compatibilityNotes,
   });
   return (
      <Box px={2}>
         <Box pb={5}>{visibleDevices.join(', ')}</Box>
         <AccordionItem hidden={!hiddenDevices.length}>
            <AccordionButton py="5" px="1.5">
               <Box
                  flex="1"
                  textAlign="left"
                  color="gray.800"
                  fontWeight="semibold"
                  fontSize="sm"
               >
                  {`Show ${hiddenDevices.length} more`}
               </Box>
               <AccordionIcon />
            </AccordionButton>
            <AccordionPanel p={2}>{hiddenDevices.join(', ')}</AccordionPanel>
         </AccordionItem>
      </Box>
   );
}
