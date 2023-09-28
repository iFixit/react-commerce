import {
   Box,
   ContentLayout,
   HeaderLayout,
   Layout,
   Tab,
   TabGroup,
   TabPanel,
   TabPanels,
   Tabs,
} from '@strapi/design-system';
import React from 'react';
import { ExportSection } from '../../components/bulk-operations/ExportSection';
import { ImportSection } from '../../components/bulk-operations/ImportSection';

export default function BulkOperationsPage() {
   return (
      <Box background="neutral100">
         <Layout>
            <>
               <HeaderLayout
                  title="Bulk Operations"
                  subtitle="With this you can bulk update content on Strapi."
                  as="h2"
               />
               <ContentLayout>
                  <TabGroup id="tabs" variant="simple">
                     <Tabs>
                        <Tab>Export</Tab>
                        <Tab>Import</Tab>
                     </Tabs>
                     <TabPanels>
                        <TabPanel>
                           <Box
                              color="neutral800"
                              padding={4}
                              background="neutral0"
                           >
                              <ExportSection />
                           </Box>
                        </TabPanel>
                        <TabPanel>
                           <Box
                              color="neutral800"
                              padding={4}
                              background="neutral0"
                           >
                              <ImportSection />
                           </Box>
                        </TabPanel>
                     </TabPanels>
                  </TabGroup>
               </ContentLayout>
            </>
         </Layout>
      </Box>
   );
}
