import { Box, Button, Flex, Link, Typography } from '@strapi/design-system';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import type { ExportCSVResult } from '../../../../server/services/bulk-operations/export-csv';
import { addonsAPI } from '../../utils/addons-api';
import { SelectCollectionType } from '../SelectCollectionType';

export function ExportSection() {
   const [selectedCollectionTypeUid, setSelectedCollectionTypeUid] =
      React.useState<string | null>(null);

   const mutation = useMutation({
      async mutationFn() {
         const result: ExportCSVResult = await addonsAPI.post('/export-csv', {
            body: {
               collectionTypeUid: selectedCollectionTypeUid,
            },
         });
         return result;
      },
   });
   return (
      <Flex direction="column" alignItems="flex-start">
         <Box marginBottom={4}>
            <Typography variant="omega">
               Export a collection type to a CSV file. This is useful also for
               importing data as you can use the exported CSV as a template.
            </Typography>
         </Box>

         <Box marginBottom={4}>
            <SelectCollectionType
               selected={selectedCollectionTypeUid}
               onChange={setSelectedCollectionTypeUid}
            />
         </Box>

         <Button
            type="button"
            variant="default"
            size="L"
            disabled={!selectedCollectionTypeUid}
            loading={mutation.isLoading}
            onClick={mutation.mutate}
         >
            Export
         </Button>
         {mutation.isSuccess && (
            <>
               <Box marginTop={2}>
                  <Typography variant="omega" marginTop="2">
                     {mutation.data.count}{' '}
                     {mutation.data.count === 1
                        ? mutation.data.collection.singularName
                        : mutation.data.collection.pluralName}{' '}
                     exported. You export is ready to{' '}
                     <Link isExternal href={mutation.data.url}>
                        Download
                     </Link>
                  </Typography>
               </Box>
            </>
         )}
      </Flex>
   );
}
