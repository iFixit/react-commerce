import { ContentTypeRepository, LoadArgs } from './content-type-repository';
import { ContentTypeItem } from './types';

type ConstructorArgs = {
   strapi: Strapi.Strapi;
   uid: string;
};

export class SingleTypeRepository extends ContentTypeRepository {
   private item: ContentTypeItem;

   constructor({ strapi, uid }: ConstructorArgs) {
      super();
      this.strapi = strapi;
      this.schema = strapi.contentType(uid);
   }

   async import({ strapiOrigin }: LoadArgs) {
      const response = await this.fetch<SingleTypeQueryResponse>({
         strapiOrigin,
      });
      this.item = response.data;
   }

   async saveAttributes() {
      const { id, attributes } = this.item;
      const simpleAttributes = this.keepSimpleAttributes(attributes);
      this.query.create({
         data: {
            id,
            ...simpleAttributes,
         },
      });
   }

   async saveNestedAttributes() {
      const { id, attributes } = this.item;
      const nestedAttributes = this.keepNestedAttributes(attributes);
      try {
         const entry = await this.strapi.entityService.update(
            this.schema.uid,
            id,
            {
               data: nestedAttributes,
            }
         );
         return entry;
      } catch (error) {
         console.log(
            'Ops! Something went wrong while adding nested fields to item!'
         );
         console.log('ITEM:\n', JSON.stringify(this.item, null, 2));
         console.log('INPUT:\n', JSON.stringify(nestedAttributes, null, 2));
         throw error;
      }
   }

   get mediaItems() {
      return this.extractMediaItems(this.item);
   }

   async isSeeded(): Promise<boolean> {
      const count = await this.query.count({});
      return count > 0;
   }

   get count() {
      return 1;
   }
}

type SingleTypeQueryResponse = {
   data: ContentTypeItem;
   meta: {};
};
