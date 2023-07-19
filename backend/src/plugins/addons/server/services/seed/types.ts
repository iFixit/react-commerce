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
