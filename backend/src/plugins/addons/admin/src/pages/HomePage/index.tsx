import {
   Box,
   Button,
   ContentLayout,
   HeaderLayout,
   Layout,
   Typography,
} from '@strapi/design-system';
import React from 'react';
import { useRequest } from '../../api/request';

function HomePage() {
   const [seedRequest, startSeedRequest] = useRequest({
      url: '/addons/seed',
      method: 'POST',
   });
   const handleRequestSeed = async () => {
      await startSeedRequest();
   };
   return (
      <Box background="neutral100">
         <Layout>
            <>
               <HeaderLayout
                  title="iFixit Addons"
                  subtitle="Toolkits for managing Strapi content types"
                  as="h2"
               />
               <ContentLayout>
                  <Typography variant="omega">
                     Welcome to iFixit addons. This plugin is a work in
                     progress. The purpose of the plugin is to provide
                     additional tooling to manage content on Strapi.
                  </Typography>
                  <Button
                     loading={seedRequest.isLoading}
                     disabled={seedRequest.isLoading}
                     onClick={handleRequestSeed}
                  >
                     Seed data
                  </Button>
               </ContentLayout>
            </>
         </Layout>
      </Box>
   );
}

export default HomePage;
