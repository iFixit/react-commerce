import { ALGOLIA_DEFAULT_INDEX_NAME } from '@config/constants';
import { ALGOLIA_API_KEY, ALGOLIA_APP_ID } from '@config/env';
import { Awaited, filterNullableItems } from '@helpers/application-helpers';
import { getImageFromStrapiImage } from '@helpers/strapi-helpers';
import {
   DeviceWiki,
   fetchDeviceWiki,
   fetchMultipleDeviceImages,
   getDeviceHandle,
} from '@lib/ifixit-api/devices';
import {
   Enum_Productlist_Type,
   ProductList as StrapiProductList,
   ProductListFiltersInput,
   strapi,
} from '@lib/strapi-sdk';
import algoliasearch from 'algoliasearch';
import {
   ProductList,
   ProductListAncestor,
   ProductListChild,
   ProductListImage,
   ProductListSection,
   ProductListSectionType,
} from './types';

export { ProductListSectionType } from './types';
export type {
   FeaturedProductList,
   ProductList,
   ProductListPreview,
   ProductListSection,
   ProductSearchHit,
} from './types';

/**
 * Get the product list data from the API
 */
export async function findProductList(
   filters: ProductListFiltersInput
): Promise<ProductList | null> {
   const result = await strapi.getProductList({
      filters,
   });
   const productList = result.productLists?.data?.[0]?.attributes;
   if (productList == null) {
      return null;
   }
   const productListImageAttributes = productList.image?.data?.attributes;

   const deviceWiki = productList.deviceTitle
      ? await fetchDeviceWiki(productList.deviceTitle)
      : null;

   const algoliaApiKey = createPublicAlgoliaKey(
      ALGOLIA_APP_ID,
      ALGOLIA_API_KEY
   );

   return {
      title: productList.title,
      handle: productList.handle,
      path: getProductListPath(productList),
      deviceTitle: productList.deviceTitle ?? null,
      tagline: productList.tagline ?? null,
      description: productList.description,
      metaDescription: productList.metaDescription ?? null,
      filters: productList.filters ?? null,
      image:
         productListImageAttributes != null
            ? getImageFromStrapiImage(productListImageAttributes, 'large')
            : deviceWiki
            ? getDeviceImage(deviceWiki)
            : null,
      ancestors: createProductListAncestors(productList.parent),
      // Strapi sort order is case sensitive, so we need to improve on it in memory
      children: await fillMissingImagesFromApi(
         sortProductListChildren(
            filterNullableItems(
               productList.children?.data.map(
                  createProductListChild(deviceWiki)
               )
            )
         )
      ),
      childrenHeading: productList.childrenHeading ?? null,
      sections: filterNullableItems(
         productList.sections.map(createProductListSection)
      ),
      algolia: {
         apiKey: algoliaApiKey,
      },
      wikiInfo: deviceWiki?.info || [],
   };
}

function getDeviceImage(deviceWiki: DeviceWiki): ProductListImage | null {
   return deviceWiki.image?.original == null
      ? null
      : {
           url: deviceWiki.image.original,
           alternativeText: null,
        };
}

async function fillMissingImagesFromApi(
   productListChildren: ProductListChild[]
): Promise<ProductListChild[]> {
   const childrenWithoutImages = productListChildren.filter(
      (child) => child.image == null && child.deviceTitle
   );
   if (childrenWithoutImages.length === 0) {
      return productListChildren;
   }
   const deviceTitlesWithoutImages = childrenWithoutImages.map(
      (child) => child.deviceTitle
   ) as string[]; // cast is safe cause we filter nulls above,
   // typescript just doesn't understand
   const imagesResponse = await fetchMultipleDeviceImages(
      deviceTitlesWithoutImages,
      'thumbnail'
   );
   childrenWithoutImages.forEach((child) => {
      const imageFromDevice =
         imagesResponse.images[child.deviceTitle as string];
      if (imageFromDevice != null) {
         child.image = {
            url: imageFromDevice,
            alternativeText: child.deviceTitle,
         };
      }
   });
   return productListChildren;
}

function getChildDeviceImage(
   deviceWiki: DeviceWiki,
   childDeviceTitle: string
): ProductListImage | null {
   const child = deviceWiki.children?.find(
      (c: any) => c.title === childDeviceTitle
   );
   if (child?.image?.original) {
      return {
         url: child.image.original,
         alternativeText: null,
      };
   }
   return null;
}

/**
 * Convert URL slug to product list device title
 */
export function getDeviceTitle(handle: string): string {
   return handle.replace(/_+/g, ' ');
}

/**
 * Get product list path
 * @param productList - Product list attributes
 * @returns The product list absolute path
 */
function getProductListPath(
   productList: Pick<StrapiProductList, 'type' | 'handle' | 'deviceTitle'>
): string {
   switch (productList.type) {
      case Enum_Productlist_Type.Tools: {
         return `/Tools/${productList.handle}`;
      }
      case Enum_Productlist_Type.Marketing: {
         return productList.handle === 'Tools' || productList.handle === 'Parts'
            ? `/${productList.handle}`
            : `/Store/${productList.handle}`;
      }
      default: {
         if (
            productList.deviceTitle != null &&
            productList.deviceTitle.length > 0
         ) {
            const deviceHandle = getDeviceHandle(productList.deviceTitle);
            return `/Parts/${deviceHandle}`;
         }
         return `/Store/${productList.handle}`;
      }
   }
}

type StrapiProductListPageData = NonNullable<
   NonNullable<Awaited<ReturnType<typeof strapi['getProductList']>>>
>;

type ApiProductList = NonNullable<
   NonNullable<
      NonNullable<StrapiProductListPageData['productLists']>['data']
   >[0]['attributes']
>;

function createProductListAncestors(
   parent: ApiProductList['parent']
): ProductListAncestor[] {
   const attributes = parent?.data?.attributes;
   if (attributes == null) {
      return [];
   }
   const ancestors = createProductListAncestors(attributes.parent);

   return ancestors.concat({
      title: attributes.title,
      handle: attributes.handle,
      path: getProductListPath(attributes),
   });
}

type ApiProductListChild = NonNullable<ApiProductList['children']>['data'][0];

function createProductListChild(deviceWiki: DeviceWiki | null) {
   return (apiChild: ApiProductListChild): ProductListChild | null => {
      const { attributes } = apiChild;
      if (attributes == null) {
         return null;
      }
      const imageAttributes = attributes.image?.data?.attributes;
      return {
         title: attributes.title,
         deviceTitle: attributes.deviceTitle || null,
         handle: attributes.handle,
         path: getProductListPath(attributes),
         image:
            imageAttributes == null
               ? deviceWiki && attributes.deviceTitle
                  ? getChildDeviceImage(deviceWiki, attributes.deviceTitle)
                  : null
               : getImageFromStrapiImage(imageAttributes, 'medium'),
         sortPriority: attributes.sortPriority || null,
      };
   };
}

function sortProductListChildren(
   children: ProductListChild[]
): ProductListChild[] {
   return children.slice().sort((a, b) => {
      const aPriority = a.sortPriority || 0;
      const bPriority = b.sortPriority || 0;

      if (aPriority === bPriority) {
         return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
      }
      return bPriority - aPriority;
   });
}

type ApiProductListSection = NonNullable<ApiProductList['sections']>[0];

function createProductListSection(
   section: ApiProductListSection
): ProductListSection | null {
   if (section == null) {
      return null;
   }
   switch (section.__typename) {
      case 'ComponentProductListBanner': {
         return {
            type: ProductListSectionType.Banner,
            id: section.id,
            title: section.title,
            description: section.description,
            callToActionLabel: section.callToActionLabel,
            url: section.url,
         };
      }
      case 'ComponentProductListRelatedPosts': {
         return {
            type: ProductListSectionType.RelatedPosts,
            id: section.id,
            tags: section.tags || null,
         };
      }
      case 'ComponentProductListFeaturedProductList': {
         const productList = section.productList?.data?.attributes;
         if (productList == null) {
            return null;
         }
         const image = productList.image?.data?.attributes;

         const algoliaApiKey = createPublicAlgoliaKey(
            ALGOLIA_APP_ID,
            ALGOLIA_API_KEY
         );

         return {
            type: ProductListSectionType.FeaturedProductList,
            id: section.id,
            productList: {
               handle: productList.handle,
               title: productList.title,
               deviceTitle: productList.deviceTitle ?? null,
               path: getProductListPath(productList),
               description: productList.description,
               image:
                  image == null
                     ? null
                     : getImageFromStrapiImage(image, 'thumbnail'),
               filters: productList.filters ?? null,
               algolia: {
                  indexName: ALGOLIA_DEFAULT_INDEX_NAME,
                  apiKey: algoliaApiKey,
               },
            },
         };
      }
      case 'ComponentProductListLinkedProductListSet': {
         return {
            type: ProductListSectionType.ProductListSet,
            id: section.id,
            title: section.title,
            productLists: filterNullableItems(
               section.productLists?.data?.map((item) => {
                  const productList = item.attributes;
                  if (productList == null) {
                     return null;
                  }
                  const image = productList.image?.data?.attributes;
                  return {
                     handle: productList.handle,
                     title: productList.title,
                     deviceTitle: productList.deviceTitle ?? null,
                     path: getProductListPath(productList),
                     description: productList.description,
                     image:
                        image == null
                           ? null
                           : getImageFromStrapiImage(image, 'thumbnail'),
                     filters: productList.filters ?? null,
                  };
               })
            ),
         };
      }
      default: {
         console.warn(
            `Unknown product list section type: ${section.__typename}`
         );
         return null;
      }
   }
}

function createPublicAlgoliaKey(appId: string, apiKey: string): string {
   const client = algoliasearch(appId, apiKey);
   const publicKey = client.generateSecuredApiKey(apiKey, {
      filters: 'public=1 AND is_pro!=1',
   });
   return publicKey;
}
