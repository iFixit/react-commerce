import { Strapi, UID } from '@strapi/strapi';
import fetch from 'node-fetch';
import qs from 'qs';
import { ContentTypeNotFoundError } from '../errors/ContentTypeNotFoundError';
import { PopulateParamBuilder } from './populate-param-builder'; // assuming this is the file where your builder is

const PAGE_SIZE = 100;
const MAX_ITEMS_COUNT = 50000;

interface FetchParams {
   sort?: string | string[];
   filters?: Record<string, any>;
   fields?: string[];
   pagination?: PaginationParams;
   populate?: string[];
   publicationState?: 'live' | 'preview';
   locale?: string | string[];
}

interface PaginationParams {
   page: number;
   pageSize: number;
}

export class ContentFetcher<Content = any> {
   private readonly builder: PopulateParamBuilder;

   constructor(
      private readonly strapi: Strapi,
      private readonly uid: UID.ContentType,
      private readonly strapiOrigin: string,
      maxDepth = 2
   ) {
      this.builder = new PopulateParamBuilder(strapi, uid, maxDepth);
   }

   public async fetch(): Promise<Content> {
      if (this.schema.kind === 'singleType') {
         return this.fetchSingleType();
      } else {
         return this.fetchCollectionType();
      }
   }

   private async fetchSingleType(): Promise<Content> {
      strapi.log.info(`🌱 [${this.schema.info.displayName}] Fetching record`);
      const populate = this.builder.build();
      const result = await this.strapiFetch({ populate });
      return result.data;
   }

   private async fetchCollectionType(): Promise<Content> {
      const populate = this.builder.build();
      let records: any = [];
      let page = 1;
      let pageCount = 1;
      let isWithinLimits = true;

      try {
         do {
            strapi.log.info(
               `🌱 [${this.schema.info.displayName}] Fetching page ${page}..`
            );
            const result = await this.strapiFetch({
               populate,
               pagination: {
                  page: page,
                  pageSize: PAGE_SIZE,
               },
            });
            pageCount = result.meta.pagination.pageCount;
            records = records.concat(result.data);
            isWithinLimits = page * PAGE_SIZE < MAX_ITEMS_COUNT;
            page++;
         } while (page <= pageCount && isWithinLimits);
      } catch (error) {
         if (error instanceof ContentTypeNotFoundError) {
            strapi.log.warn(
               `🌱 [${this.schema.info.displayName}] Content type not found`
            );
         } else {
            throw error;
         }
      }

      return records;
   }

   async strapiFetch(params: FetchParams): Promise<any> {
      const query = this.computeQuery(params);
      const endpoint = `${this.endpoint}?${query}`;
      const response = await fetch(endpoint);
      if (response.status === 404) {
         throw new ContentTypeNotFoundError(this.apiId);
      }
      if (!response.ok) {
         throw new Error(`Failed to fetch from ${endpoint}`);
      }
      return response.json();
   }

   private computeQuery(params: FetchParams) {
      return qs.stringify(params, { encodeValuesOnly: true });
   }

   private get schema() {
      return this.strapi.contentType(this.uid);
   }

   private get endpoint() {
      return `${this.strapiOrigin}/api/${this.apiId}`;
   }

   private get apiId() {
      const schema = this.schema;
      return schema.kind === 'singleType'
         ? schema.info.singularName
         : schema.info.pluralName;
   }
}
