import { Box } from '@chakra-ui/react';
import { MultipleBannersSection as SectionData } from '@models/page';

export interface MultipleBannersSectionProps {
   data: SectionData;
}

export function MultipleBannersSection({
   data: { title, banners, type },
}: MultipleBannersSectionProps) {
   return (
      <Box as="section" position="relative" w="full">
         <p>Multiple banners</p>
      </Box>
   );
}
