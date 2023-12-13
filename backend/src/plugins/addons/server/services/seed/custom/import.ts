import type { Strapi, UID } from '@strapi/strapi';
import { CollectionStore, ContentStore, SingleStore } from './content-store';
import { MediaStore } from './media-store';

interface ImportOptions {
   maxDepth?: number;
   overrideExistingContent?: boolean;
}

export class DataImporter {
   private readonly stores: ContentStore[];
   private readonly mediaStore: MediaStore;

   constructor(private readonly strapi: Strapi) {
      this.stores = this.createStores();
      this.mediaStore = new MediaStore(this.strapi);
   }

   async import(
      strapiOrigin: string,
      { maxDepth = 2, overrideExistingContent = false }: ImportOptions = {}
   ) {
      if (!overrideExistingContent && !(await this.canImport())) {
         this.strapi.log.info('🌱 Nothing to seed. Skipping..');
         return { contentTypes: {}, media: { count: 0 } };
      }
      await this.loadStores(strapiOrigin, maxDepth);

      await this.createBaseRecords();

      /**
       * @TODO: Find a way to correctly import media
       * This will need some more thinking, but it's worth to skip it for now
       * in order to ship a working version of the seed
       */
      // await this.importMedia(strapiOrigin);

      await this.populateNestedAttributes();
   }

   get mediaCount() {
      return this.mediaStore.count;
   }

   get countsByContentType(): Record<string, { count: number }> {
      const contentTypes: Record<string, { count: number }> = {};
      for (const store of this.stores) {
         contentTypes[store.uid] = { count: store.count };
      }
      return contentTypes;
   }

   private async loadStores(strapiOrigin: string, maxDepth: number) {
      for (const store of this.stores) {
         await store.dangerouslyReset();
         await store.loadFrom(strapiOrigin, maxDepth);
      }
   }

   private async createBaseRecords() {
      for (const store of this.stores) {
         await store.createBase();
      }
   }

   private async populateNestedAttributes() {
      for (const store of this.stores) {
         await store.addPopulatableAttributes();
      }
   }

   private async importMedia(strapiOrigin: string) {
      for (const store of this.stores) {
         this.mediaStore.addMedia(store.mediaAttributes);
      }
      await this.mediaStore.dangerouslyReset();
      await this.mediaStore.save(strapiOrigin);
   }

   private async canImport() {
      const storesEmpty = await Promise.all(
         this.stores.map((store) => store.isEmpty())
      );
      return storesEmpty.some((isEmpty) => isEmpty);
   }

   private createStores() {
      return this.contentTypesUIDs.map(this.getContentStore.bind(this));
   }

   private get contentTypesUIDs(): UID.ContentType[] {
      const allTypeUIDs: UID.ContentType[] = Object.keys(
         this.strapi.contentTypes
      ) as any;
      return allTypeUIDs.filter((type) => type.startsWith('api::'));
   }

   private getContentStore(contentTypeUID: UID.ContentType): ContentStore {
      const schema = this.strapi.contentType(contentTypeUID);
      if (schema.kind === 'collectionType') {
         return new CollectionStore(this.strapi, contentTypeUID);
      } else {
         return new SingleStore(this.strapi, contentTypeUID);
      }
   }
}
