import type { Attribute, Schema, Strapi } from '@strapi/strapi';
import * as csv from 'fast-csv';
import z from 'zod';
import { getAddonsService } from '..';
import { isBlank } from '../../helpers/server-helpers';

export type ImportCSVArgs = z.infer<typeof ImportCSVArgsSchema>;

export const ImportCSVArgsSchema = z.object({
   collectionTypeUid: z.string(),
   csvString: z.string(),
});

export interface ImportCSVResult {
   updated: number;
   created: number;
   collection: {
      singularName: string;
      pluralName: string;
   };
   errors: string[];
}

export const getImportCSV =
   (strapi: Strapi) =>
   async ({
      collectionTypeUid,
      csvString,
   }: ImportCSVArgs): Promise<ImportCSVResult> => {
      const contentTypeService = getAddonsService(strapi, 'contentTypes');
      const schema = contentTypeService.findOneContentType(collectionTypeUid);

      if (!schema)
         throw new Error(`Collection type "${collectionTypeUid}" not found`);

      const { records, errors } = await parseCSV(csvString);

      if (errors.length > 0) {
         return {
            created: 0,
            updated: 0,
            collection: {
               singularName: schema.info.singularName,
               pluralName: schema.info.pluralName,
            },
            errors,
         };
      }

      if (records.length > 0) {
         let createdCount = 0;
         let updatedCount = 0;
         for (const record of records) {
            const isNewRecord = isBlank(record.id);
            try {
               await saveRecord(record, { schema, strapi });
               isNewRecord ? createdCount++ : updatedCount++;
            } catch (error: any) {
               let errorMessage: string;
               if (isNewRecord) {
                  errorMessage = `Can't create record:\n${JSON.stringify(
                     record,
                     null,
                     2
                  )}\nREASON:\n${getHumanReadableErrorMessage(error)}`;
               } else {
                  errorMessage = `Can't update record with id ${
                     record.id
                  }\nREASON:\n${getHumanReadableErrorMessage(error)}`;
               }
               errors.push(errorMessage);
            }
         }

         return {
            created: createdCount,
            updated: updatedCount,
            collection: {
               singularName: schema.info.singularName,
               pluralName: schema.info.pluralName,
            },
            errors,
         };
      }
      return {
         created: 0,
         updated: 0,
         collection: {
            singularName: schema.info.singularName,
            pluralName: schema.info.pluralName,
         },
         errors,
      };
   };

interface ParseCSVResult {
   records: Record<string, string>[];
   errors: string[];
}

function parseCSV(csvString: string): Promise<ParseCSVResult> {
   return new Promise((resolve) => {
      const errors: string[] = [];
      const records: Record<string, string>[] = [];
      csv.parseString(csvString, { headers: true })
         .on('error', (error) => {
            if (error.message.includes('column header mismatch')) {
               errors.push(
                  `Error while reading the input file: column header mismatch, check that the file is correctly formatted. Usually this happens when you have a comma in a field value, and the value is not wrapped in quotes.`
               );
            } else {
               errors.push(
                  `Error while reading the input file: ${error.message}`
               );
            }
            resolve({
               records: [],
               errors,
            });
         })
         .on('data', async (record) => {
            records.push(record);
         })
         .on('end', () => {
            resolve({
               records,
               errors,
            });
         });
   });
}

interface SaveRecordContext {
   schema: Schema.ContentType;
   strapi: Strapi;
}

async function saveRecord(
   record: Record<string, string>,
   context: SaveRecordContext
) {
   const input = prepareRecordInput(record, context.schema);
   const isNewRecord = isBlank(record.id);
   if (isNewRecord) {
      await strapi.entityService.create(context.schema.uid as any, {
         data: input,
      });
   } else {
      await strapi.entityService.update(
         context.schema.uid as any,
         record.id as any,
         {
            data: input,
         }
      );
   }
}

function prepareRecordInput(
   record: Record<string, string>,
   schema: Schema.ContentType
) {
   const scalarAttributesNames = getScalarAttributes(schema);
   const requiredComponentAttributesNames =
      getRequiredComponentAttributes(schema);
   const requiredDynamicZoneAttributesNames =
      getRequiredDynamicZoneAttributes(schema);
   const isNewRecord = isBlank(record.id);
   const input: Record<string, unknown> = {};
   for (const [name, value] of Object.entries(record)) {
      if (scalarAttributesNames.includes(name)) {
         input[name] = csvValueToAttributeValue(value, schema.attributes[name]);
      }
   }
   if (isNewRecord) {
      for (const name of requiredComponentAttributesNames) {
         input[name] = {};
      }
      for (const name of requiredDynamicZoneAttributesNames) {
         input[name] = [];
      }
   }
   if (typeof record.published === 'string') {
      if (isTrue(record.published)) {
         input.publishedAt = new Date().toISOString();
      } else if (isFalse(record.published)) {
         input.publishedAt = null;
      }
   }
   return input;
}

function getScalarAttributes(schema: Schema.ContentType) {
   return Object.entries(schema.attributes)
      .filter(
         ([, attribute]) =>
            attribute.type !== 'component' &&
            attribute.type !== 'dynamiczone' &&
            attribute.type !== 'relation'
      )
      .map(([name]) => name);
}

function getRequiredComponentAttributes(schema: Schema.ContentType): string[] {
   return Object.entries(schema.attributes)
      .filter(
         ([, attribute]) =>
            attribute.type === 'component' && attribute.required === true
      )
      .map(([name]) => name);
}

function getRequiredDynamicZoneAttributes(
   schema: Schema.ContentType
): string[] {
   return Object.entries(schema.attributes)
      .filter(
         ([, attribute]) =>
            attribute.type === 'dynamiczone' && attribute.required === true
      )
      .map(([name]) => name);
}

function csvValueToAttributeValue(value: string, attribute: Attribute.Any) {
   switch (attribute.type) {
      case 'enumeration': {
         if (isBlank(value)) {
            return undefined;
         }
         if (!attribute.enum.includes(value)) {
            throw new Error(`"${value}" doesn't match enumeration`);
         }
         return value;
      }
      case 'integer': {
         const intValue = parseInt(value, 10);
         return Number.isFinite(intValue) ? intValue : undefined;
      }
      case 'boolean': {
         if (isTrue(value)) {
            return true;
         }
         if (isFalse(value)) {
            return false;
         }
         return undefined;
      }
      default:
         return value;
   }
}

function getHumanReadableErrorMessage(error: any) {
   if (error.details && Array.isArray(error.details.errors)) {
      return error.details.errors
         .map((detail: any) => {
            if (detail.path) {
               return `* ${detail.path.join('.')}: ${detail.message}`;
            }
            return detail.message;
         })
         .join('\n');
   }
   return error.message;
}

function isTrue(value: string) {
   return ['true', '1', 'yes'].includes(value.toLowerCase());
}

function isFalse(value: string) {
   return ['false', '0', 'no'].includes(value.toLowerCase());
}
