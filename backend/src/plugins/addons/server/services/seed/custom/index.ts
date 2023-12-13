import { DataImporter } from './import';

export interface SeedResult {
   contentTypes: Record<string, { count: number }>;
   media: { count: number };
}

const FALLBACK_STRAPI_ORIGIN = 'https://main.govinor.com';

type ImportContentTypesOptions = {
   strapiOrigin?: string;
   overrideExistingContent?: boolean;
};

export async function importContentTypes({
   strapiOrigin = FALLBACK_STRAPI_ORIGIN,
   overrideExistingContent = false,
}: ImportContentTypesOptions): Promise<SeedResult> {
   const importer = new DataImporter(strapi);
   await importer.import(strapiOrigin, {
      maxDepth: 3,
      overrideExistingContent: overrideExistingContent,
   });

   return {
      contentTypes: importer.countsByContentType,
      media: { count: importer.mediaCount },
   };
}
