export type UID = string;

export type ContentTypeSchema = {
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
};

export type ContentTypeAttribute =
   | ImageAttribute
   | RelationAttribute
   | DynamicZoneAttribute
   | ComponentAttribute;

type ImageAttribute = {
   type: 'media';
   multiple: boolean;
   required: boolean;
   allowedTypes: string[];
};

type RelationAttribute = {
   type: 'relation';
   relation: string;
   target: UID;
   inversedBy?: string;
   mappedBy?: string;
};

type DynamicZoneAttribute = {
   type: 'dynamiczone';
   components: string[];
   required: boolean;
};

type ComponentAttribute = {
   type: 'component';
   repeatable: boolean;
   component: string;
   required: boolean;
};

export type CollectionQueryResponse = {
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

export type ContentTypeItem = {
   id: number;
   attributes: Record<string, any>;
};

export type StrapiApiParams = {
   sort?: string | string[];
   filters?: Record<string, any>;
   fields?: string[];
   pagination?: ApiPaginationParam;
   publicationState?: 'live' | 'preview';
   locale?: string | string[];
};

type ApiPaginationParam = {
   page: number;
   pageSize: number;
};

export type PopulateInput =
   | string
   | string[]
   | Record<string, { populate: string | string[] }>
   | any;

export type MediaItem = {
   id: number;
   attributes: Record<string, any>;
};
