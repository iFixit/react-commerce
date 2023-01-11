import { Box } from '@chakra-ui/react';
import { assertNever } from '@ifixit/helpers';
import { DefaultLayout } from '@layouts/default';
import {
   PageTemplateProps,
   usePageTemplateProps,
} from './hooks/usePageTemplateProps';
import { BrowseSection } from './sections/BrowseSection';
import { HeroSection } from './sections/HeroSection';
import { StatsSection } from './sections/StatsSection';

const PageTemplate: NextPageWithLayout<PageTemplateProps> = () => {
   const { page } = usePageTemplateProps();
   return (
      <Box>
         {page.sections.map((section) => {
            switch (section.__typename) {
               case 'ComponentPageHero': {
                  return <HeroSection key={section.id} data={section} />;
               }
               case 'ComponentPageBrowse': {
                  return <BrowseSection key={section.id} data={section} />;
               }
               case 'ComponentPageStats': {
                  return <StatsSection key={section.id} data={section} />;
               }
               default:
                  return assertNever(section);
            }
         })}
      </Box>
   );
};

PageTemplate.getLayout = function getLayout(page, pageProps) {
   return <DefaultLayout {...pageProps.layoutProps}>{page}</DefaultLayout>;
};

export default PageTemplate;
