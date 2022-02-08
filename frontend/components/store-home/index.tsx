import { Box } from '@chakra-ui/react';
import { assertNever } from '@helpers/application-helpers';
import { Page, PageSectionType } from '@models/page';
import { BrowseSection } from './BrowseSection';
import { FeaturedProductListSection } from './FeaturedProductListSection';
import { HeroSection } from './HeroSection';
import { PressSection } from './PressSection';
import { SocialGallerySection } from './SocialGallerySection';
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
                  return <BrowseSection key={section.id} data={section} />;
               }
               case PageSectionType.Hero: {
                  return <HeroSection key={section.id} data={section} />;
               }
               case PageSectionType.Workbench: {
                  return <WorkbenchSection key={section.id} />;
               }
               case PageSectionType.Stats: {
                  return <StatsSection key={section.id} data={section} />;
               }
               case PageSectionType.SplitWithImageContent: {
                  return (
                     <SplitWithImageContentSection
                        key={section.id}
                        data={section}
                     />
                  );
               }
               case PageSectionType.Press: {
                  return <PressSection key={section.id} data={section} />;
               }
               case PageSectionType.FeaturedProductList: {
                  return (
                     <FeaturedProductListSection
                        key={section.id}
                        data={section}
                     />
                  );
               }
               case PageSectionType.SocialGallery: {
                  return (
                     <SocialGallerySection key={section.id} data={section} />
                  );
               }
               default:
                  return assertNever(section);
            }
         })}
      </Box>
   );
}
