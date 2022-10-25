import {
   filterFalsyItems,
   filterNullableItems,
} from '@helpers/application-helpers';
import { assertNever } from '@ifixit/helpers';
import {
   ImageFieldsFragment,
   ProductListFieldsFragment,
   strapi,
} from '@lib/strapi-sdk';
import { z } from 'zod';
import { getProductListType } from './product-list';

export type FindPageArgs = {
   path: string;
};

export type Page = NonNullable<Awaited<ReturnType<typeof findPage>>>;

export type Section = Page['sections'][0];

export type GetSection<T extends Section['__typename']> = Extract<
   Section,
   { __typename: T }
>;

export async function findPage({ path }: FindPageArgs) {
   const response = await strapi.findPage({
      filters: {
         path: {
            eq: path,
         },
      },
   });
   const page = response.pages?.data[0]?.attributes;
   if (page == null) {
      return null;
   }

   const sections = filterNullableItems(
      page.sections?.map((section, index) => {
         if (section == null) {
            return null;
         }
         switch (section?.__typename) {
            case 'ComponentPageHero': {
               return {
                  __typename: section.__typename,
                  id: `${section.__typename}-${index}`,
                  title: section.title ?? null,
                  description: section.description ?? null,
                  callToAction: section.callToAction ?? null,
                  image: processStrapiImage(section.image),
               };
            }
            case 'ComponentPageBrowse': {
               const categories = filterFalsyItems(
                  section.categories?.map(
                     (category) =>
                        category?.productList?.data &&
                        processStrapiProductList(category.productList.data)
                  )
               );
               return {
                  __typename: section.__typename,
                  id: `${section.__typename}-${index}`,
                  title: section.title ?? null,
                  description: section.description ?? null,
                  image: processStrapiImage(section.image),
                  categories,
               };
            }
            case 'ComponentPageStats': {
               const stats = filterFalsyItems(section.stats).map(
                  ({ id, label, value }) => {
                     return { id, label, value };
                  }
               );
               return {
                  __typename: section.__typename,
                  id: `${section.__typename}-${index}`,
                  stats,
               };
            }
            case 'Error': {
               console.error('Failed to parse page section:', section);
               return null;
            }
            default: {
               return assertNever(section);
            }
         }
      }) ?? []
   );

   return {
      path: page.path,
      title: page.title,
      sections,
   };
}

function processStrapiProductList(
   productListFragment: ProductListFieldsFragment | null | undefined
) {
   const attributes = productListFragment?.attributes;
   if (attributes == null) {
      return null;
   }
   return {
      type: getProductListType(attributes.type),
      handle: attributes.handle,
      title: attributes.title,
      deviceTitle: attributes.deviceTitle ?? null,
      metaDescription: attributes.metaDescription ?? null,
      image: processStrapiImage(attributes.image),
   };
}

function processStrapiImage(
   imageFragment: ImageFieldsFragment | null | undefined
) {
   const attributes = imageFragment?.data?.attributes;
   if (attributes == null) {
      return null;
   }
   return {
      url: attributes.url,
      alternativeText: attributes.alternativeText,
      formats: parseImageFormats(attributes.formats),
   };
}

const ImageFormatsSchema = z.record(
   z.object({
      name: z.string(),
      url: z.string(),
      width: z.number(),
      height: z.number(),
   })
);

function parseImageFormats(formats: unknown) {
   if (formats == null) {
      return null;
   }
   const result = ImageFormatsSchema.safeParse(formats);
   if (result.success) {
      return result.data;
   }
   const errors = result.error.flatten();
   console.error(
      `Failed to parse image formats:\n ${JSON.stringify(
         errors.fieldErrors,
         null,
         2
      )}`
   );
   return null;
}
