import {
   Box,
   Button,
   ContentLayout,
   Flex,
   HeaderLayout,
   Layout,
   Stack,
   TextInput,
   Typography,
} from '@strapi/design-system';
import React from 'react';
import { parseValidUrl } from '../../../../helpers/generic-helpers';
import { useImportBackup, useRequestBackup } from '../../api/seed';

function BackupPage() {
   const showDangerousActions =
      process.env.STRAPI_ADMIN_ENABLE_ADDONS_DANGEROUS_ACTIONS === 'true';

   return (
      <Box background="neutral100">
         <Layout>
            <>
               <HeaderLayout
                  title="Backup"
                  subtitle="Backup the Strapi instance or transfer data from another Strapi instance."
                  as="h2"
               />
               <ContentLayout>
                  <Stack spacing={8}>
                     <BackupSection />
                     {showDangerousActions && <ImportSection />}
                  </Stack>
               </ContentLayout>
            </>
         </Layout>
      </Box>
   );
}

function BackupSection() {
   const [state, backup] = useRequestBackup();
   return (
      <Flex direction="column" alignItems="flex-start">
         <Box marginBottom={4}>
            <Typography variant="beta">Update backup</Typography>
         </Box>
         <Box marginBottom={4}>
            <Typography variant="omega">
               This creates a new backup that can be used as a seed by other
               Strapi instances. You should update the backup if you want it to
               contain the latest data from this Strapi instance.
            </Typography>
         </Box>
         <Button
            type="button"
            variant="default"
            size="L"
            loading={state.isLoading}
            onClick={() => backup()}
         >
            Update backup
         </Button>
         {state.error && (
            <Box marginTop={2}>
               <Typography variant="omega" textColor="danger500">
                  {state.error}
               </Typography>
            </Box>
         )}
      </Flex>
   );
}

function ImportSection() {
   const [validationError, setValidationError] = React.useState<string | null>(
      null
   );
   const [state, importData] = useImportBackup();
   const resetValidationErrors = () => {
      setValidationError(null);
   };
   const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
      event
   ) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      let strapiUrl = parseValidUrl(formData.get('strapi-domain'));
      if (strapiUrl === null) {
         setValidationError('invalid url');
         return;
      }
      const isConfirmed = window.confirm(
         `Do you want to reset the data, and seed with data from "${strapiUrl.hostname}"?`
      );

      if (isConfirmed) {
         await importData({
            strapiOrigin: strapiUrl.origin,
         });
      }
   };
   return (
      <Flex direction="column" alignItems="flex-start">
         <Box marginBottom={4}>
            <Typography variant="beta">Import from backup</Typography>
         </Box>
         <Box marginBottom={4}>
            <Typography variant="omega">
               This imports data from another Strapi instance.
            </Typography>
         </Box>
         <form onSubmit={handleSubmit} onChange={resetValidationErrors}>
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
                  variant="default"
                  size="L"
                  style={{ marginLeft: '12px' }}
                  loading={state.isLoading}
               >
                  Import data
               </Button>
            </Flex>
         </form>
         {state.error && (
            <Box marginTop={2}>
               <Typography variant="omega" textColor="danger500">
                  {state.error}
               </Typography>
            </Box>
         )}
      </Flex>
   );
}

export default BackupPage;
