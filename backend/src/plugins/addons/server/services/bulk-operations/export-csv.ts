import type { Strapi } from '@strapi/strapi';
import * as csv from 'fast-csv';
import fs from 'fs';
import { omit } from 'lodash';
import z from 'zod';
import { getAddonsService } from '..';
import { ensureDirectoryExists } from '../../helpers/server-helpers';

const EXPORT_FOLDER_NAME = 'bulk-operations';

const EXPORT_FOLDER_PATH = `public/${EXPORT_FOLDER_NAME}`;

export type ExportCSVArgs = z.infer<typeof ExportCSVArgsSchema>;

export const ExportCSVArgsSchema = z.object({
   collectionTypeUid: z.string(),
});

export interface ExportCSVResult {
   url: string;
   count: number;
   collection: {
      singularName: string;
      pluralName: string;
   };
}

export const getExportCSV =
   (strapi: Strapi) =>
   async ({ collectionTypeUid }: ExportCSVArgs): Promise<ExportCSVResult> => {
      await ensureDirectoryExists(EXPORT_FOLDER_PATH);

      const contentTypeService = getAddonsService(strapi, 'contentTypes');
      const schema = contentTypeService.findOneContentType(collectionTypeUid);

      if (!schema)
         throw new Error(`Collection type "${collectionTypeUid}" not found`);

      const records = await findRecords(strapi, collectionTypeUid);

      const filename = `export-${schema.collectionName}-${Date.now()}.csv`;

      const writeStream = fs.createWriteStream(
         `${EXPORT_FOLDER_PATH}/${filename}`
      );
      const csvStream = csv.write(records, { headers: true }).pipe(writeStream);

      return new Promise((resolve, reject) => {
         csvStream.on('finish', function () {
            resolve({
               url: `/${EXPORT_FOLDER_NAME}/${filename}`,
               count: records.length,
               collection: {
                  singularName: schema.info.singularName,
                  pluralName: schema.info.pluralName,
               },
            });
         });

         csvStream.on('error', function (err) {
            reject(err);
         });
      });
   };

async function findRecords<T = any>(
   strapi: Strapi,
   uid: string
): Promise<Array<T>> {
   let records = await strapi.entityService!.findMany(uid as any);
   return Array.isArray(records) ? records.map(processRecord) : [];
}

function processRecord(record: any) {
   let exportedRecord = omit(record, ['createdAt', 'updatedAt', 'publishedAt']);
   exportedRecord.published = record.publishedAt ? 'true' : 'false';
   return exportedRecord;
}
