import {
   forEach,
   isPlainObject,
   mapValues,
   omit,
   omitBy,
   pickBy,
} from 'lodash';
// @ts-ignore
import fetch from 'node-fetch';
import qs from 'qs';
import type { ContentTypeSchema } from '../content-types';
import { ContentTypeNotFoundError } from './errors/ContentTypeNotFoundError';
import {
   ContentTypeItem,
   MediaItem,
   PopulateInput,
   StrapiApiParams,
} from './types';

export type LoadArgs = {
   strapiOrigin: string;
};

type FetchArgs = {
   strapiOrigin: string;
   params?: StrapiApiParams;
};

export abstract class ContentTypeRepository {
   protected strapi!: Strapi.Strapi;
   protected schema!: ContentTypeSchema;

   abstract import(args: LoadArgs): Promise<void>;

   abstract saveAttributes(): Promise<void>;

   abstract saveNestedAttributes(): Promise<void>;

   abstract get mediaItems(): MediaItem[];

   abstract isSeeded(): Promise<boolean>;

   abstract get count(): number;

   /**
    * WARNING: This method deletes all items in the collection type.
    * It's useful during development to quickly reset the collection type.
    */
   async dangerouslyReset() {
      await this.query.deleteMany({});
   }

   get displayName() {
      return this.schema.info.displayName;
   }

   get uid() {
      return this.schema.uid;
   }

   protected get query() {
      return this.strapi.db.query(this.schema.uid);
   }

   protected async fetch<T = any>({
      strapiOrigin,
      params,
   }: FetchArgs): Promise<T> {
      const apiId =
         this.schema.kind === 'singleType'
            ? this.schema.info.singularName
            : this.schema.info.pluralName;
      let endpoint = `${strapiOrigin}/api/${apiId}`;
      const populate = this.populateInput;
      if (params != null || populate != null) {
         const query = qs.stringify(
            {
               populate,
               ...params,
            },
            {
               encodeValuesOnly: true,
            }
         );
         endpoint += `?${query}`;
      }
      const response = await fetch(endpoint);
      if (response.ok) {
         const json = await response.json();
         return json;
      }
      if (response.status === 404) {
         throw new ContentTypeNotFoundError(apiId);
      }
      throw new Error(`Couldn't fetch "${apiId}" data from "${endpoint}"`);
   }

   protected keepSimpleAttributes(attributes: Record<string, any>) {
      return omitNestedAttributes(omitUnnecessaryAttributes(attributes));
   }

   protected keepNestedAttributes(attributes: Record<string, any>) {
      const nestedAttributes = pickBy(attributes, (value, key) => {
         return (
            isRelation(value) ||
            isComponent(value) ||
            isDynamicZone(value) ||
            isMedia(value)
         );
      });
      const input = mapValues(nestedAttributes, (value, key) => {
         if (isRelation(value)) {
            return getRelationInput(value);
         }
         if (isComponent(value)) {
            return getComponentInput(value);
         }
         if (isDynamicZone(value)) {
            return getDynamicZoneInput(value);
         }
         if (isMedia(value)) {
            return getMediaInput(value);
         }
      });
      return input;
   }

   protected extractMediaItems(item: ContentTypeItem) {
      let mediaItems: MediaItem[] = [];
      forEach(item.attributes, (value, key) => {
         if (isMedia(value)) {
            mediaItems.push(value.data);
         } else if (isComponent(value)) {
            mediaItems = mediaItems.concat(
               this.extractMediaItemsFromComponent(value)
            );
         } else if (isDynamicZone(value)) {
            mediaItems = mediaItems.concat(
               this.extractMediaItemsFromDynamicZone(value)
            );
         }
      });
      return mediaItems;
   }

   private extractMediaItemsFromDynamicZone(
      dynamicZone: Record<string, any>[]
   ) {
      let mediaItems: MediaItem[] = [];
      for (const component of dynamicZone) {
         mediaItems = mediaItems.concat(
            this.extractMediaItemsFromComponent(component)
         );
      }
      return mediaItems;
   }

   private extractMediaItemsFromComponent(component: Record<string, any>) {
      let mediaItems: MediaItem[] = [];
      forEach(component, (value, key) => {
         if (isMedia(value)) {
            mediaItems.push(value.data);
         } else if (isComponent(value)) {
            mediaItems = mediaItems.concat(
               this.extractMediaItemsFromComponent(value)
            );
         } else if (isDynamicZone(value)) {
            mediaItems = mediaItems.concat(
               this.extractMediaItemsFromDynamicZone(value)
            );
         }
      });
      return mediaItems;
   }

   private get populateInput(): PopulateInput {
      const attributesToBePopulated = pickBy(
         this.schema.attributes,
         (value) => {
            if (value.type === 'relation') {
               // We only need one side of the relation to be populated.
               return value.inversedBy != null;
            }
            return (
               value.type === 'dynamiczone' ||
               value.type === 'component' ||
               value.type === 'media'
            );
         }
      );
      const input = mapValues(attributesToBePopulated, (value) => {
         switch (value.type) {
            case 'relation': {
               return {
                  fields: '*',
               };
            }
            case 'dynamiczone': {
               return {
                  populate: '*',
               };
            }
            case 'component': {
               return {
                  populate: '*',
               };
            }
            case 'media': {
               return {
                  fields: '*',
               };
            }
         }
      });
      return input;
   }
}

function omitNestedAttributes(attributes: Record<string, any>) {
   return omitBy(attributes, (value) => {
      return (
         isRelation(value) ||
         isComponent(value) ||
         isDynamicZone(value) ||
         isMedia(value)
      );
   });
}

function isDynamicZone(value: any) {
   return Array.isArray(value);
}

function isComponent(value: any) {
   return isPlainObject(value) && !isMedia(value) && !isRelation(value);
}

function isRelation(value: any) {
   return value?.data !== undefined && !isMedia(value);
}

function isMedia(value: any) {
   const attributes = value?.data?.attributes;
   // @TODO: Find a better way to check if it's a media
   return attributes != null && typeof attributes.mime === 'string';
}

function omitUnnecessaryAttributes(attributes: Record<string, any>) {
   const cleaned = { ...attributes };
   delete cleaned.createdAt;
   delete cleaned.updatedAt;
   return cleaned;
}

type DynamicZone = Component[];

type Component = {
   id: number;
   __component: string;
   [attributes: string]: any;
};

function getDynamicZoneInput(dynamicZone?: DynamicZone) {
   const input = dynamicZone?.map(getComponentInput) ?? [];
   return input;
}

type RelationValue = {
   data: Record<string, any> | Record<string, any>[];
};

function getRelationInput(value: RelationValue) {
   if (Array.isArray(value.data)) {
      return value.data.map((item) => item.id);
   }
   return value.data?.id;
}

type MediaValue = {
   data: MediaItem;
};

function getMediaInput(value: MediaValue) {
   return value.data?.id;
}

function getComponentInput(component: Component) {
   let componentInput = omit(component, ['id']);
   componentInput = mapValues(componentInput, (value) => {
      if (isRelation(value)) {
         return getRelationInput(value);
      }
      if (isComponent(value)) {
         return getComponentInput(value);
      }
      if (isMedia(value)) {
         return getMediaInput(value);
      }
      return value;
   });
   return componentInput;
}
