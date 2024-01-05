import { Box, Heading } from '@chakra-ui/react';
import { Wrapper } from '@ifixit/ui';

export type CompatibilityNotesSectionProps = {
   compatibilityNotes: string[];
};

export const MAX_VISIBLE_DEVICES = 10;

export function CompatibilityNotesSection({
   compatibilityNotes,
}: CompatibilityNotesSectionProps) {
   const visibleDevices = compatibilityNotes.slice(0, MAX_VISIBLE_DEVICES);
   const hiddenDevices = compatibilityNotes.slice(MAX_VISIBLE_DEVICES);
   return compatibilityNotes && visibleDevices.length > 0 ? (
      <Box as="section" id="compatibility" py="16" fontSize="sm">
         <Wrapper>
            <Heading
               as="h2"
               color="gray.900"
               textAlign="center"
               mb="12"
               fontSize={{ base: '2xl', md: '3xl' }}
               fontWeight="medium"
            >
               Compatibility Notes
            </Heading>
            <Box p={2}>
               {`Compatible with: ${visibleDevices.join(', ')}`}
               {hiddenDevices.length && (
                  <Box p={2}>
                     <details>
                        <summary>{`Show ${hiddenDevices.length} more`}</summary>
                        <Box>{hiddenDevices.join(', ')}</Box>
                     </details>
                  </Box>
               )}
            </Box>
         </Wrapper>
      </Box>
   ) : null;
}
