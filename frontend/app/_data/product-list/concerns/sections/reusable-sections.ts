import { filterFalsyItems } from '@/helpers/application-helpers';
import type { ComponentMiscPlacementFiltersInput } from '@/lib/strapi-sdk';
import { ProductListFieldsFragment } from '@/lib/strapi-sdk';
import {
   compareFAQs,
   FAQ,
   faqFromStrapi,
} from '@/models/concerns/components/faq';
import type { ReusableSection } from '@/models/reusable-section';
import { findReusableSections } from '@/models/reusable-section/find';
import type { Dictionary } from 'lodash';
import keyBy from 'lodash/keyBy';
import uniqBy from 'lodash/uniqBy';

interface FindProductListReusableSectionsArgs {
   strapiProductList: ProductListFieldsFragment | null | undefined;
   ancestorHandles: string[];
}

export async function findProductListReusableSections({
   strapiProductList,
   ancestorHandles,
}: FindProductListReusableSectionsArgs): Promise<ReusableSection[]> {
   const reusableSections = await findReusableSections({
      filters: {
         placement: {
            or: getPlacementConditions({
               strapiProductList,
               ancestorHandles,
            }),
         },
      },
   });

   return reusableSections.map((reusableSection) => {
      switch (reusableSection.section.type) {
         case 'FAQs': {
            const ancestryFaqsByCategory =
               getAncestryFAQsByCategory(strapiProductList);
            const ancestryFaqsWithoutCategory =
               getAncestryFAQsWithoutCategory(strapiProductList);

            const sectionFaqsByCategory = keyBy(
               reusableSection.section.faqs.filter(
                  (faq) => faq.category != null
               ),
               'category'
            );
            const sectionFaqsWithoutCategory =
               reusableSection.section.faqs.filter(
                  (faq) => faq.category == null
               );

            const allFaqsByCategory = {
               ...ancestryFaqsByCategory,
               ...sectionFaqsByCategory,
            };

            reusableSection.section.faqs = uniqBy(
               [
                  ...ancestryFaqsWithoutCategory,
                  ...sectionFaqsWithoutCategory,
                  ...Object.values(allFaqsByCategory),
               ],
               'id'
            ).sort(compareFAQs);

            return reusableSection;
         }
         default:
            return reusableSection;
      }
   });
}

function getPlacementConditions({
   strapiProductList,
   ancestorHandles,
}: FindProductListReusableSectionsArgs): ComponentMiscPlacementFiltersInput[] {
   const conditions: ComponentMiscPlacementFiltersInput[] = [
      {
         showInProductListPages: {
            eq: 'only descendants',
         },
         productLists: {
            handle: {
               in: ancestorHandles,
            },
         },
      },
   ];
   if (strapiProductList) {
      conditions.push({
         showInProductListPages: {
            eq: 'only selected',
         },
         productLists: {
            handle: {
               eq: strapiProductList.handle,
            },
         },
      });

      conditions.push({
         showInProductListPages: {
            eq: 'selected and descendants',
         },
         productLists: {
            handle: {
               in: ancestorHandles.concat(strapiProductList.handle),
            },
         },
      });
   }
   return conditions;
}

type ProductListWithFAQs = Pick<ProductListFieldsFragment, 'faqs'> & {
   parent?: ProductListFieldsFragment['parent'] | null | undefined;
};

function getAncestryFAQsByCategory(
   productList: ProductListWithFAQs | null | undefined
): Dictionary<FAQ> {
   if (productList == null) {
      return {};
   }
   const ancestryFaqByCategory = getAncestryFAQsByCategory(
      productList.parent?.data?.attributes
   );

   const faqs = filterFalsyItems(productList.faqs?.data?.map(faqFromStrapi));
   const faqsWithCategory = faqs.filter((faq) => faq.category != null);

   return {
      ...ancestryFaqByCategory,
      ...keyBy(faqsWithCategory, 'category'),
   };
}

function getAncestryFAQsWithoutCategory(
   productList: ProductListWithFAQs | null | undefined
): FAQ[] {
   if (productList == null) {
      return [];
   }
   const ancestryFaqsWithoutCategory = getAncestryFAQsWithoutCategory(
      productList.parent?.data?.attributes
   );

   const faqs = filterFalsyItems(productList.faqs?.data?.map(faqFromStrapi));
   const faqsWithoutCategory = faqs.filter((faq) => faq.category == null);

   return ancestryFaqsWithoutCategory.concat(faqsWithoutCategory);
}
