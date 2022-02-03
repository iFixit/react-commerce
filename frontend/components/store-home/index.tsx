import { Box } from '@chakra-ui/react';
import { assertNever } from '@helpers/application-helpers';
import { Page, PageSectionType } from '@models/page';
import { BrowseSection } from './BrowseSection';
import { HeroSection } from './HeroSection';
import { SplitWithImageContentSection } from './SplitWithImageContentSection';
import { StatsSection } from './StatsSection';
import { WorkbenchSection } from './WorkbenchSection';

export interface StoreHomeViewProps {
   page: Page;
}

export function StoreHomeView({ page }: StoreHomeViewProps) {
   return (
      <Box>
         {page.sections.map((section) => {
            switch (section.type) {
               case PageSectionType.Browse: {
                  return <BrowseSection key={section.id} />;
               }
               case PageSectionType.Hero: {
                  return <HeroSection key={section.id} />;
               }
               case PageSectionType.Workbench: {
                  return <WorkbenchSection key={section.id} />;
               }
               case PageSectionType.Stats: {
                  return <StatsSection key={section.id} />;
               }
               case PageSectionType.SplitWithImageContent: {
                  return (
                     <SplitWithImageContentSection
                        key={section.id}
                        data={section}
                     />
                  );
               }
               default:
                  return assertNever(section);
            }
         })}
      </Box>
   );
}
