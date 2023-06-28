import fs from 'fs/promises';
import type { Strapi, ContentTypeSchema } from '@strapi/strapi';

export function isStderrAnError(stderr: string) {
   const errorKeywords = ['error', 'failed', 'cannot', 'unable to'];
   return errorKeywords.some((keyword) =>
      stderr.toLowerCase().includes(keyword)
   );
}

export async function ensureDirectoryExists(filePath: string): Promise<void> {
   await fs.mkdir(filePath, { recursive: true });
}

export function findSchemaById(strapi: Strapi, contentTypeUID: string) {
   const allTypeUIDs = Object.keys(strapi.contentTypes);
   const apiTypeUIDs = allTypeUIDs.filter((type) => type.startsWith('api::'));
   return apiTypeUIDs
      .map((uid) => {
         return strapi.contentType(uid);
      })
      .find((schema) => schema.uid === contentTypeUID);
}

export function findAllContentTypeSchemas(strapi: Strapi) {
   const allTypeUIDs = Object.keys(strapi.contentTypes);
   const apiTypeUIDs = allTypeUIDs.filter((type) => type.startsWith('api::'));
   return apiTypeUIDs.map((uid): ContentTypeSchema => {
      return strapi.contentType(uid);
   });
}

export function isBlank(value: unknown): boolean {
   return value == null || (typeof value === 'string' && value.trim() === '');
}
