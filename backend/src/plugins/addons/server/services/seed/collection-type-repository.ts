import { chunk } from 'lodash';
import { ContentTypeRepository, LoadArgs } from './content-type-repository';
import { ContentTypeNotFoundError } from './errors/ContentTypeNotFoundError';
import { ContentTypeItem, MediaItem } from './types';

const PAGE_SIZE = 100;
const MAX_ITEMS_COUNT = 10000;

type ConstructorArgs = {
   strapi: Strapi.Strapi;
   uid: string;
};

export class CollectionTypeRepository extends ContentTypeRepository {
   private items: ContentTypeItem[] = [];

   constructor({ strapi, uid }: ConstructorArgs) {
      super();
      this.strapi = strapi;
      this.schema = strapi.contentType(uid);
   }

   async import({ strapiOrigin }: LoadArgs) {
      let page = 1;
      let pageCount = 1;
      this.items = [];
      try {
         do {
            strapi.log.info(
               `🌱 [${this.schema.info.displayName}] Fetching page ${page}..`
            );
            const response = await this.fetch<CollectionTypeQueryResponse>({
               strapiOrigin,
               params: {
                  pagination: {
                     page,
                     pageSize: PAGE_SIZE,
                  },
               },
            });
            pageCount = response.meta.pagination.pageCount;
            this.items = this.items.concat(response.data);
            page++;
         } while (page <= pageCount && page * PAGE_SIZE <= MAX_ITEMS_COUNT);
      } catch (error) {
         if (error instanceof ContentTypeNotFoundError) {
            strapi.log.warn(
               `🌱 [${this.schema.info.displayName}] Content type not found`
            );
         } else {
            throw error;
         }
      }
   }

   async saveAttributes() {
      const batches = chunk(this.items, 50);
      for (const batch of batches) {
         this.query.createMany({
            data: batch.map((item) => {
               const { id, attributes } = item;
               const simpleAttributes = this.keepSimpleAttributes(attributes);
               return {
                  id,
                  ...simpleAttributes,
               };
            }),
         });
      }
   }

   async saveNestedAttributes() {
      for (const item of this.items) {
         const { id, attributes } = item;
         const nestedAttributes = this.keepNestedAttributes(attributes);

         try {
            await this.strapi.entityService.update(this.schema.uid as any, id, {
               data: nestedAttributes,
            });
         } catch (error) {
            strapi.log.error(
               'Ops! Something went wrong while adding nested fields to item!'
            );
            strapi.log.error(`Item:\n${JSON.stringify(item, null, 2)}`);
            strapi.log.error(
               `Input:\n${JSON.stringify(nestedAttributes, null, 2)}`
            );
            throw error;
         }
      }
   }

   async isSeeded() {
      const count = await this.query.count({});
      return count > 0;
   }

   get mediaItems() {
      let mediaItems: MediaItem[] = [];
      for (const item of this.items) {
         mediaItems = mediaItems.concat(this.extractMediaItems(item));
      }
      return mediaItems;
   }

   get count() {
      return this.items.length;
   }
}

type CollectionTypeQueryResponse = {
   data: ContentTypeItem[];
   meta: {
      pagination: {
         page: number;
         pageCount: number;
         pageSize: number;
         total: number;
      };
   };
};
