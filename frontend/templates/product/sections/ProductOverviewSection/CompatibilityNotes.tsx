import {
   AccordionButton,
   AccordionIcon,
   AccordionItem,
   AccordionPanel,
   Box,
} from '@chakra-ui/react';
import { MAX_VISIBLE_DEVICES } from '../CompatibilityNotesSection';

export type CompatibilityNotesProps = {
   compatibilityNotes: string[];
};

export function CompatibilityNotes({
   compatibilityNotes,
}: CompatibilityNotesProps) {
   const visibleDevices = compatibilityNotes.slice(0, MAX_VISIBLE_DEVICES);
   const hiddenDevices = compatibilityNotes.slice(MAX_VISIBLE_DEVICES);
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
