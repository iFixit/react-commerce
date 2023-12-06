import type { Strapi, UID } from '@strapi/strapi';
import { ContentFetcher } from './content-fetcher';
import { ContentRecordParser } from './content-record-parser';
import { ContentRecord, MediaAttribute } from './content-record';
import { chunk } from 'lodash';

export abstract class ContentStore {
   protected readonly parser: ContentRecordParser;

   constructor(
      protected readonly strapi: Strapi,
      public readonly uid: UID.ContentType
   ) {
      this.parser = new ContentRecordParser(strapi, uid);
   }

   abstract loadFrom(strapiOrigin: string, maxDepth: number): Promise<void>;

   abstract createBase(): Promise<void>;

   abstract addPopulatableAttributes(): Promise<void>;

   abstract get mediaAttributes(): MediaAttribute[];

   abstract get count(): number;

   public async dangerouslyReset() {
      await this.query.deleteMany({});
   }

   public async isEmpty(): Promise<boolean> {
      return (await this.query.count({})) === 0;
   }

   protected get query() {
      return this.strapi.db!.query(this.uid);
   }

   protected get schema() {
      return this.strapi.contentType(this.uid);
   }

   protected get tableName() {
      return this.schema.collectionName;
   }

   protected async resetSequenceGenerator() {
      const clientType = strapi.config.get('database.connection.client');

      if (clientType === 'postgres') {
         const sequenceName = `${this.tableName}_id_seq`;

         try {
            await this.strapi.db!.connection.raw(
               `SELECT setval('${sequenceName}', (SELECT MAX(id) FROM "${this.tableName}"))`
            );

            this.strapi.log.info(
               `🌱 [${this.tableName}] Postgres sequence reset`
            );
         } catch (error) {
            this.strapi.log.error(
               `🌱 [${this.tableName}] Postgres sequence failed to reset!`
            );
         }
      }
   }
}

export class CollectionStore extends ContentStore {
   private records: ContentRecord[] = [];

   async loadFrom(strapiOrigin: string, maxDepth: number): Promise<void> {
      this.records = [];
      const fetcher = new ContentFetcher(
         this.strapi,
         this.uid,
         strapiOrigin,
         maxDepth
      );
      const records = await fetcher.fetch();

      for (const record of records) {
         this.records.push(this.parser.parse(record));
      }
   }

   async createBase(): Promise<void> {
      const batches = chunk(this.records, 50);
      for (const batch of batches) {
         await this.query.createMany({
            data: batch.map((record) => {
               const baseRecord = ContentRecord.onlyScalarAttributes(record);
               return {
                  id: baseRecord.id,
                  ...baseRecord.toInput(),
               };
            }),
         });
      }
      this.resetSequenceGenerator();
   }

   async addPopulatableAttributes(): Promise<void> {
      for (const record of this.records) {
         const populatedRecord =
            ContentRecord.onlyPopulatableAttributes(record);
         const input = populatedRecord.toInput();

         try {
            await this.strapi.entityService!.update(
               this.uid,
               populatedRecord.id,
               {
                  data: input,
               }
            );
         } catch (error) {
            strapi.log.error(
               'Ops! Something went wrong while adding nested fields to item!'
            );
            strapi.log.error(`Record:\n${JSON.stringify(record, null, 2)}`);
            strapi.log.error(`Input:\n${JSON.stringify(input, null, 2)}`);
            throw error;
         }
      }
   }

   get mediaAttributes(): MediaAttribute[] {
      const media: MediaAttribute[] = [];
      for (const record of this.records) {
         media.push(...record.mediaAttributes);
      }
      return media;
   }

   get count(): number {
      return this.records.length;
   }
}

export class SingleStore extends ContentStore {
   private record: ContentRecord | undefined;

   async loadFrom(strapiOrigin: string, maxDepth: number): Promise<void> {
      const fetcher = new ContentFetcher(
         this.strapi,
         this.uid,
         strapiOrigin,
         maxDepth
      );
      const record = await fetcher.fetch();
      this.record = this.parser.parse(record);
   }

   async createBase(): Promise<void> {
      if (!this.record) return;

      const baseRecord = ContentRecord.onlyScalarAttributes(this.record);

      const input = baseRecord.toInput();

      this.query.create({
         data: {
            id: baseRecord.id,
            ...input,
         },
      });
   }

   async addPopulatableAttributes(): Promise<void> {
      if (!this.record) return;

      const populatedRecord = ContentRecord.onlyPopulatableAttributes(
         this.record
      );

      const input = populatedRecord.toInput();

      await this.strapi.entityService!.update(this.uid, populatedRecord.id, {
         data: input,
      });
   }

   get mediaAttributes(): MediaAttribute[] {
      if (!this.record) return [];
      return this.record.mediaAttributes;
   }

   get count(): number {
      return this.record ? 1 : 0;
   }
}
