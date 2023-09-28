import {
   Box,
   Button,
   Dialog,
   DialogBody,
   DialogFooter,
   Field,
   FieldInput,
   FieldLabel,
   Flex,
   Stack,
   Status,
   Typography,
} from '@strapi/design-system';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import type { ImportCSVResult } from '../../../../server/services/bulk-operations/import-csv';
import { addonsAPI } from '../../utils/addons-api';
import {
   SelectCollectionType,
   useCollectionType,
} from '../SelectCollectionType';

export function ImportSection() {
   const [selectedCollectionTypeUid, setSelectedCollectionTypeUid] =
      React.useState<string | null>(null);
   const [csvString, setCsvString] = React.useState<string | null>(null);
   const [confirmDialogOpen, setConfirmDialogOpen] = React.useState(false);

   const mutation = useMutation({
      mutationFn: (): Promise<ImportCSVResult> =>
         addonsAPI.post('/import-csv', {
            body: {
               collectionTypeUid: selectedCollectionTypeUid,
               csvString,
            },
         }),
      onSuccess: () => {
         setSelectedCollectionTypeUid(null);
         setCsvString(null);
      },
   });

   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files ? event.target.files[0] : null;
      if (file) {
         const reader = new FileReader();
         reader.readAsText(file, 'UTF-8');
         reader.onload = (evt) => {
            if (evt.target) {
               setCsvString(evt.target.result as string);
            }
         };
      }
   };

   const resetForm = () => {
      mutation.reset();
   };

   if (mutation.isSuccess) {
      return (
         <Flex marginTop={2} direction="column" gap="2" alignItems="start">
            <Button
               type="button"
               variant="default"
               marginBottom={4}
               size="L"
               onClick={resetForm}
            >
               Start a new import
            </Button>
            {mutation.data.created > 0 && (
               <Typography variant="omega">
                  Created {mutation.data.created} new{' '}
                  {pluralize(
                     mutation.data.created,
                     mutation.data.collection.singularName,
                     mutation.data.collection.pluralName
                  )}
               </Typography>
            )}
            {mutation.data.updated > 0 && (
               <Typography variant="omega">
                  Updated {mutation.data.updated}{' '}
                  {pluralize(
                     mutation.data.updated,
                     mutation.data.collection.singularName,
                     mutation.data.collection.pluralName
                  )}
               </Typography>
            )}
            {mutation.data.errors.length > 0 && (
               <Box marginTop={2} width="100%">
                  <Typography variant="delta" textColor="danger500">
                     Errors
                  </Typography>
                  <Flex direction="column" gap="2" marginTop="2" width="100%">
                     {mutation.data.errors.map((error, index) => {
                        return (
                           <Box
                              key={index}
                              background="neutral100"
                              padding="2"
                              borderRadius="4px"
                              width="100%"
                           >
                              <Typography
                                 variant="omega"
                                 marginTop="2"
                                 textColor="danger500"
                              >
                                 <pre style={{ whiteSpace: 'break-spaces' }}>
                                    {error}
                                 </pre>
                              </Typography>
                           </Box>
                        );
                     })}
                  </Flex>
               </Box>
            )}
         </Flex>
      );
   }

   return (
      <>
         {csvString && selectedCollectionTypeUid && (
            <ConfirmImportDialog
               isOpen={confirmDialogOpen}
               csvString={csvString}
               collectionTypeUid={selectedCollectionTypeUid}
               onCancel={() => setConfirmDialogOpen(false)}
               onConfirm={() => {
                  setConfirmDialogOpen(false);
                  mutation.mutate();
               }}
            />
         )}

         <Flex direction="column" alignItems="flex-start">
            <Box marginBottom={4}>
               <Typography variant="omega">
                  Create/update collection type entries from a CSV file.
               </Typography>
               <Box marginTop={2}>
                  <Typography variant="omega">
                     To proceed, select a collection type from the list below
                     and upload a corresponding CSV file. If you don't have a
                     CSV file template, you can export one from the Export tab.
                  </Typography>
               </Box>

               <Status
                  variant="warning"
                  size="S"
                  showBullet={false}
                  marginTop={4}
               >
                  <Typography>
                     <strong>⚠️</strong> Import operations will overwrite
                     existing data.
                  </Typography>
               </Status>
               <Status
                  variant="secondary"
                  size="S"
                  showBullet={false}
                  marginTop={2}
               >
                  <Typography>
                     To create new entries, leave the <strong>id</strong> column
                     in the CSV file empty.
                  </Typography>
               </Status>
            </Box>
            <Box marginBottom={4}>
               <SelectCollectionType
                  selected={selectedCollectionTypeUid}
                  onChange={setSelectedCollectionTypeUid}
               />
            </Box>
            {selectedCollectionTypeUid && (
               <Box marginBottom={4}>
                  <Field name="import" required={false}>
                     <Flex direction="column" alignItems="flex-start" gap={1}>
                        <FieldLabel>CSV file</FieldLabel>
                        <FieldInput
                           type="file"
                           placeholder="select file"
                           required
                           accept=".csv"
                           onChange={handleFileChange}
                        />
                     </Flex>
                  </Field>
               </Box>
            )}
            <Button
               type="button"
               variant="default"
               size="L"
               disabled={!csvString}
               loading={mutation.isLoading}
               onClick={() => setConfirmDialogOpen(true)}
            >
               Import
            </Button>
         </Flex>
      </>
   );
}

interface ConfirmImportDialogProps {
   isOpen: boolean;
   csvString: string;
   collectionTypeUid: string;
   onCancel: () => void;
   onConfirm: () => void;
}

function ConfirmImportDialog({
   isOpen,
   csvString,
   collectionTypeUid,
   onCancel,
   onConfirm,
}: ConfirmImportDialogProps) {
   const csvStats = getCSVStats(csvString);
   const collectionType = useCollectionType(collectionTypeUid);

   if (collectionType == null) return null;

   return (
      <Dialog onClose={onCancel} title="Confirm bulk operation" isOpen={isOpen}>
         <DialogBody>
            <Flex direction="column" alignItems="center" gap={4}>
               <Typography variant="omega">
                  You are about to perform a bulk operation on{' '}
                  <Typography fontWeight="bold" textColor="warning500">
                     {collectionType.info.pluralName}
                  </Typography>
                  . Make sure the CSV file you are importing is correct.
               </Typography>
               <Flex justifyContent="center">
                  <Box marginBottom={4}>
                     <Stack gap={2}>
                        <Typography variant="omega">
                           {csvStats.create} new{' '}
                           <Typography fontWeight="bold" textColor="warning500">
                              {pluralize(
                                 csvStats.create,
                                 collectionType.info.singularName,
                                 collectionType.info.pluralName
                              )}
                           </Typography>{' '}
                           will be created.
                        </Typography>
                        <Typography variant="omega">
                           {csvStats.update}{' '}
                           <Typography fontWeight="bold" textColor="warning500">
                              {pluralize(
                                 csvStats.update,
                                 collectionType.info.singularName,
                                 collectionType.info.pluralName
                              )}
                           </Typography>{' '}
                           will be updated.
                        </Typography>
                     </Stack>
                  </Box>
               </Flex>
            </Flex>
         </DialogBody>
         <DialogFooter
            startAction={
               <Button onClick={onCancel} variant="tertiary">
                  Cancel
               </Button>
            }
            endAction={<Button onClick={onConfirm}>Confirm</Button>}
         />
      </Dialog>
   );
}

function pluralize(count: number, singular: string, plural: string) {
   return count === 1 ? singular : plural;
}

interface CSVStats {
   create: number;
   update: number;
}

function getCSVStats(csvString: string): CSVStats {
   const lines = parseCSVLines(csvString);
   const headers = lines[0].split(',');
   const idIndex = headers.indexOf('id');
   const stats: CSVStats = {
      create: 0,
      update: 0,
   };
   for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      const values = line.split(',');
      if (values[idIndex].trim() === '') {
         stats.create++;
      } else {
         stats.update++;
      }
   }
   return stats;
}

function parseCSVLines(csvString: string) {
   const lines: string[] = [];

   let inQuote = false;
   let line = '';

   for (var i = 0; i < csvString.length; i++) {
      var char = csvString[i];

      if (char === '"') {
         inQuote = !inQuote;
      }

      if (isNewLine(char) && !inQuote) {
         lines.push(line);
         line = '';

         const isWindowsNewline = char === '\r' && csvString[i + 1] === '\n';
         if (isWindowsNewline) {
            i++;
         }
      } else {
         line += char;
      }
   }

   if (line !== '') {
      lines.push(line);
   }

   return lines;
}

function isNewLine(char: string) {
   return char === '\n' || char === '\r';
}
