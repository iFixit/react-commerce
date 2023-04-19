import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import { Wrapper } from '@ifixit/ui';
import type { Product } from '@pages/api/nextjs/cache/product';

export type CompatibilityNotesSectionProps = {
   compatibilityNotes?: Product['compatibilityNotes'] | null;
};

const MAX_DEFAULT_VISIBLE_DEVICES = 10;

export function SplitCompatibilityNotes({
   compatibilityNotes,
}: CompatibilityNotesSectionProps) {
   const devices = compatibilityNotes?.split(/\r?\n/) ?? [];
   const visibleDevices = devices
      .slice(0, MAX_DEFAULT_VISIBLE_DEVICES)
      .join(', ');
   const hiddenDevices = devices.slice(MAX_DEFAULT_VISIBLE_DEVICES).join(', ');
   return [visibleDevices, hiddenDevices];
}

export function CompatibilityNotesSection({
   compatibilityNotes,
}: CompatibilityNotesSectionProps) {
   const [visibleDevices, hiddenDevices] = SplitCompatibilityNotes({
      compatibilityNotes,
   });
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
               {'Compatible with: ' + visibleDevices}
               {hiddenDevices && (
                  <Box p={2}>
                     <details>
                        <summary>
                           {'Show ' + hiddenDevices.length + ' more'}
                        </summary>
                        <Box>{hiddenDevices}</Box>
                     </details>
                  </Box>
               )}
            </Box>
         </Wrapper>
      </Box>
   ) : null;
}
