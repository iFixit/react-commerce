import {
   Box,
   ContentLayout,
   HeaderLayout,
   Layout,
   Typography,
} from '@strapi/design-system';
import React from 'react';

function HomePage() {
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
               </ContentLayout>
            </>
         </Layout>
      </Box>
   );
}

export default HomePage;
