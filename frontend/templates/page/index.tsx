import { Box } from '@chakra-ui/react';
import { IFixitStatsSection } from '@components/sections/IFixitStatsSection';
import { SplitWithImageContentSection } from '@components/sections/SplitWithImageSection';
import { assertNever } from '@ifixit/helpers';
import { DefaultLayout } from '@layouts/default';
import {
   PageTemplateProps,
   usePageTemplateProps,
} from './hooks/usePageTemplateProps';
import { BrowseSection } from './sections/BrowseSection';
import { HeroSection } from './sections/HeroSection';
import { PressQuotesSection } from './sections/PressQuotesSection';

const PageTemplate: NextPageWithLayout<PageTemplateProps> = () => {
   const { page } = usePageTemplateProps();
   return (
      <Box>
         {page.sections.map((section) => {
            switch (section.type) {
               case 'Hero': {
                  return <HeroSection key={section.id} data={section} />;
               }
               case 'Browse': {
                  return <BrowseSection key={section.id} data={section} />;
               }
               case 'IFixitStats': {
                  return <IFixitStatsSection key={section.id} data={section} />;
               }
               case 'SplitWithImage': {
                  return (
                     <SplitWithImageContentSection
                        key={section.id}
                        data={section}
                     />
                  );
               }
               case 'PressQuotes': {
                  return <PressQuotesSection key={section.id} data={section} />;
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
