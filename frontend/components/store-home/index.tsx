import { Flex } from '@chakra-ui/react';
import { BrowseSection } from './BrowseSection';
import { HeroSection } from './HeroSection';

export interface StoreHomeViewProps {}

export function StoreHomeView({}: StoreHomeViewProps) {
   return (
      <Flex direction="column">
         <HeroSection />
         <BrowseSection />
      </Flex>
   );
}
