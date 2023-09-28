import type { Strapi } from '@strapi/strapi';

export type UID = string;

export interface ContentTypeSchema {
   kind: 'singleType' | 'collectionType';
   /**
    * e.g. 'product-lists'
    */
   collectionName: string;
   info: {
      singularName: string;
      pluralName: string;
      displayName: string;
      description: string;
   };
   attributes: Record<string, ContentTypeAttribute>;
   uid: UID;
   apiName: string;
}

export type ContentTypeAttribute =
   | ImageAttribute
   | RelationAttribute
   | DynamicZoneAttribute
   | ComponentAttribute
   | DateTimeAttribute
   | RichTextAttribute
   | StringAttribute
   | IntegerAttribute
   | EnumerationAttribute
   | UidAttribute
   | BooleanAttribute;

export interface ImageAttribute {
   type: 'media';
   multiple: boolean;
   required: boolean;
   allowedTypes: string[];
}

export interface RelationAttribute {
   type: 'relation';
   relation: string;
   target: UID;
   inversedBy?: string;
   mappedBy?: string;
}

export interface DynamicZoneAttribute {
   type: 'dynamiczone';
   components: string[];
   required: boolean;
}

export interface ComponentAttribute {
   type: 'component';
   repeatable: boolean;
   component: string;
   required: boolean;
}

export interface DateTimeAttribute {
   type: 'datetime';
}

export interface RichTextAttribute {
   type: 'richtext';
}

export interface StringAttribute {
   type: 'string';
}

export interface IntegerAttribute {
   type: 'integer';
}

export interface EnumerationAttribute {
   type: 'enumeration';
   enum: string[];
}

export interface UidAttribute {
   type: 'uid';
}

export interface BooleanAttribute {
   type: 'boolean';
   default?: boolean;
}

export default ({ strapi }: { strapi: Strapi.Strapi }) => ({
   findManyContentTypes: getFindManyContentTypes(strapi),
   findOneContentType: getFindOneContentType(strapi),
});

export type FindManyContentTypesResult = Awaited<
   ReturnType<ReturnType<typeof getFindManyContentTypes>>
>;

const getFindManyContentTypes = (strapi: Strapi) => () => {
   const allTypeUIDs = Object.keys(strapi.contentTypes);
   const apiTypeUIDs = allTypeUIDs.filter((type) => type.startsWith('api::'));
   return apiTypeUIDs.map<ContentTypeSchema>((uid) => {
      return strapi.contentType(uid);
   });
};

const getFindOneContentType = (strapi: Strapi) => (uid: string) => {
   const findContentTypes = getFindManyContentTypes(strapi);
   return findContentTypes().find((schema) => schema.uid === uid);
};
