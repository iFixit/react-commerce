import {
   Box,
   Flex,
   Button,
   ContentLayout,
   EmptyStateLayout,
   HeaderLayout,
   Layout,
   Typography,
   TextInput,
} from '@strapi/design-system';
import React from 'react';
import { useSeed } from '../../api/seed';
import { Illo } from '../../components/Illo';

function HomePage() {
   const [validationError, setValidationError] = React.useState<string | null>(
      null
   );
   const showDangerousActions =
      process.env.STRAPI_ADMIN_ENABLE_ADDONS_DANGEROUS_ACTIONS === 'true';

   const [seedState, requestSeed] = useSeed();

   const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
      event
   ) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      let strapiUrl: URL;
      try {
         strapiUrl = requireShopifyDomain(formData.get('strapi-domain'));
      } catch (error) {
         setValidationError(error.message);
         return;
      }
      const isConfirmed = window.confirm(
         `Do you want to reset the data, and seed with data from "${strapiUrl.hostname}"?`
      );

      if (isConfirmed) {
         await requestSeed({
            strapiOrigin: strapiUrl.origin,
         });
      }
   };

   const resetValidationErrors = () => {
      setValidationError(null);
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
                  {showDangerousActions ? (
                     <Box marginTop={8}>
                        <form
                           onSubmit={handleSubmit}
                           onChange={resetValidationErrors}
                        >
                           <Flex>
                              <TextInput
                                 placeholder="main.govinor.com"
                                 label="Strapi instance domain"
                                 required
                                 name="strapi-domain"
                                 hint="The domain of the strapi instance you want to import the data from"
                                 error={validationError}
                              />
                              <Button
                                 type="submit"
                                 marginLeft={2}
                                 variant="danger-light"
                                 size="L"
                                 style={{ marginLeft: '12px' }}
                                 loading={seedState.isLoading}
                              >
                                 Reset seed
                              </Button>
                           </Flex>
                        </form>
                     </Box>
                  ) : (
                     <Box marginTop={8} background="neutral100">
                        <EmptyStateLayout
                           icon={<Illo />}
                           content="No action available yet..."
                        />
                     </Box>
                  )}
               </ContentLayout>
            </>
         </Layout>
      </Box>
   );
}

function requireShopifyDomain(value: FormDataEntryValue | null) {
   let domain = typeof value === 'string' ? value.trim() : '';
   if (domain.length === 0) {
      throw new Error('domain is required');
   }
   const url = domain.startsWith('https://')
      ? new URL(domain)
      : new URL(`https://${domain}`);

   return url;
}

export default HomePage;
