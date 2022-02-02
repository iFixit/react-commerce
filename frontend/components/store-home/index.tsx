import { Box } from '@chakra-ui/react';
import { BrowseSection } from './BrowseSection';
import { HeroSection } from './HeroSection';
import { StatsSection } from './StatsSection';
import { WorkbenchSection } from './WorkbenchSection';

export interface StoreHomeViewProps {}

export function StoreHomeView({}: StoreHomeViewProps) {
   return (
      <Box>
         <HeroSection />
         <BrowseSection />
         <WorkbenchSection />
         <StatsSection />
      </Box>
   );
}
