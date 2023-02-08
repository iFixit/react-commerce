import {
   ALGOLIA_API_KEY,
   ALGOLIA_APP_ID,
   ALGOLIA_PRODUCT_INDEX_NAME,
} from '@config/env';
import { Awaited, filterNullableItems } from '@helpers/application-helpers';
import { getProductListTitle } from '@helpers/product-list-helpers';
import { getImageFromStrapiImage } from '@helpers/strapi-helpers';
import { timeAsync } from '@ifixit/helpers';
import { IFixitAPIClient } from '@ifixit/ifixit-api-client';
import {
   DeviceWiki,
   fetchDeviceWiki,
   fetchMultipleDeviceImages,
} from '@lib/ifixit-api/devices';
import {
   Enum_Productlist_Type,
   ProductListFiltersInput,
   strapi,
} from '@lib/strapi-sdk';
import algoliasearch from 'algoliasearch';
import {
   BaseProductList,
   iFixitPageType,
   ProductList,
   ProductListAncestor,
   ProductListChild,
   ProductListImage,
   ProductListSection,
   ProductListSectionType,
   ProductListType,
} from './types';
import { CLIENT_OPTIONS, escapeFilterValue } from '@helpers/algolia-helpers';

/**
 * Get the product list data from the API
 */
export async function findProductList(
   filters: ProductListFiltersInput,
   ifixitOrigin: string,
   deviceItemType: string | null = null
): Promise<ProductList | null> {
   const filterDeviceTitle = filters.deviceTitle?.eqi ?? '';

   const [result, deviceWiki] = await Promise.all([
      timeAsync('strapi.getProductList', () =>
         strapi.getProductList({ filters })
      ),
      fetchDeviceWiki(
         new IFixitAPIClient({ origin: ifixitOrigin }),
         filterDeviceTitle
      ),
   ]);

   const productList = result.productLists?.data?.[0]?.attributes;
   if (productList == null && deviceWiki == null) {
      return null;
   }

   const deviceTitle =
      deviceWiki?.deviceTitle ?? productList?.deviceTitle ?? null;
   const handle = productList?.handle ?? '';
   const parents =
      productList?.parent ??
      (deviceWiki?.ancestors
         ? convertAncestorsToStrapiFormat(deviceWiki.ancestors)
         : null);
   const title =
      productList?.title ??
      (deviceWiki?.deviceTitle ? deviceWiki?.deviceTitle + ' Parts' : '');
   const description =
      productList?.description ?? deviceWiki?.description ?? '';

   const algoliaApiKey = createPublicAlgoliaKey(
      ALGOLIA_APP_ID,
      ALGOLIA_API_KEY
   );
   const productListType = getProductListType(productList?.type);

   const ancestors = createProductListAncestors(parents);
   const isPartsList =
      productListType === ProductListType.AllParts ||
      productListType === ProductListType.DeviceParts;

   const baseProductList: BaseProductList = {
      title,
      handle,
      deviceTitle,
      deviceItemType,
      tagline: productList?.tagline ?? null,
      description: description,
      metaDescription: productList?.metaDescription ?? null,
      metaTitle: productList?.metaTitle ?? null,
      defaultShowAllChildrenOnLgSizes:
         productList?.defaultShowAllChildrenOnLgSizes ?? null,
      filters: productList?.filters ?? null,
      forceNoindex: productList?.forceNoindex ?? null,
      heroImage: productList?.heroImage?.data?.attributes
         ? getImageFromStrapiImage(
              productList.heroImage.data.attributes,
              'large'
           )
         : null,
      image: null,
      brandLogo: productList?.brandLogo?.data?.attributes
         ? getImageFromStrapiImage(
              productList.brandLogo.data.attributes,
              'large'
           )
         : null,
      ancestors,
      children: await getProductListChildren({
         apiChildren: productList?.children?.data,
         deviceWiki,
         ifixitOrigin,
         isPartsList,
      }),
      childrenHeading: productList?.childrenHeading ?? null,
      sections: filterNullableItems(
         productList?.sections.map(createProductListSection)
      ),
      algolia: {
         apiKey: algoliaApiKey,
      },
      wikiInfo: deviceWiki?.info || [],
      isOnStrapi: !!productList,
   };

   return {
      ...baseProductList,
      type: productListType,
   };
}

export function getProductListType(
   type?: Enum_Productlist_Type | null
): ProductListType {
   switch (type) {
      case Enum_Productlist_Type.AllParts:
         return ProductListType.AllParts;
      case Enum_Productlist_Type.AllTools:
         return ProductListType.AllTools;
      case Enum_Productlist_Type.Tools:
         return ProductListType.ToolsCategory;
      case Enum_Productlist_Type.Marketing:
         return ProductListType.Marketing;
      default:
         return ProductListType.DeviceParts;
   }
}

type GetProductListChildrenProps = {
   apiChildren: ApiProductListChild[] | undefined;
   deviceWiki: DeviceWiki | null;
   ifixitOrigin: string;
   isPartsList: boolean;
};

async function getProductListChildren({
   apiChildren,
   deviceWiki,
   ifixitOrigin,
   isPartsList,
}: GetProductListChildrenProps) {
   const presentChildren = filterNullableItems(
      apiChildren?.map(createProductListChild({ deviceWiki }))
   );

   const [fillerImages, childrenWithProducts] = await Promise.all([
      fetchMissingImages(presentChildren, ifixitOrigin),
      filterDevicesWithNoProducts(presentChildren, isPartsList),
   ]);

   // Strapi sort order is case sensitive, so we need to improve on it in memory
   return sortProductListChildren(
      fillMissingImages(childrenWithProducts, fillerImages)
   );
}

async function filterDevicesWithNoProducts(
   productListChildren: ProductListChild[],
   isPartsList: boolean
) {
   if (!isPartsList) {
      return productListChildren;
   }
   const childDevices = productListChildren
      .filter((child) => child.deviceTitle)
      .map((child) => child.deviceTitle as string);
   const devicesWithProducts = await findDevicesWithProducts(childDevices);
   return productListChildren.filter(
      (child) => child.deviceTitle && devicesWithProducts[child.deviceTitle] > 0
   );
}

function fillMissingImages(
   productListChildren: ProductListChild[],
   fillerImages: Record<string, string>
) {
   return productListChildren.map((child) => {
      const fillerImage = fillerImages[child.deviceTitle as string];
      return fillerImage == null
         ? child
         : {
              ...child,
              image: {
                 url: fillerImage,
                 alternativeText: child.deviceTitle,
              },
           };
   });
}

/**
 * Returns a map of device title to image url.
 */
async function fetchMissingImages(
   productListChildren: ProductListChild[],
   ifixitOrigin: string
) {
   const childrenWithoutImages = productListChildren.filter(
      (child) => child.image == null && child.deviceTitle
   );
   if (childrenWithoutImages.length === 0) {
      return {};
   }
   const deviceTitlesWithoutImages = childrenWithoutImages.map(
      (child) => child.deviceTitle
   ) as string[]; // cast is safe cause we filter nulls above,
   // typescript just doesn't understand
   const { images } = await fetchMultipleDeviceImages(
      new IFixitAPIClient({ origin: ifixitOrigin }),
      deviceTitlesWithoutImages,
      'thumbnail'
   );
   return images;
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

type StrapiProductListPageData = NonNullable<
   NonNullable<Awaited<ReturnType<typeof strapi['getProductList']>>>
>;

type ApiProductList = NonNullable<
   NonNullable<
      NonNullable<StrapiProductListPageData['productLists']>['data']
   >[0]['attributes']
>;

function convertAncestorsToStrapiFormat(
   ancestors: any
): ApiProductList['parent'] | null {
   const ancestor: DeviceWiki = { title: ancestors.shift() };
   if (ancestor['title'] == null) {
      return null;
   } else if (ancestor['title'] === 'Root') {
      ancestor['type'] = 'all_parts';
      ancestor['title'] = 'All';
      ancestor['handle'] = 'Parts';
   }

   return {
      data: {
         attributes: {
            type: ancestor.type,
            title: ancestor.title + ' Parts',
            handle: ancestor.handle ?? '',
            deviceTitle: ancestor.title,
            parent: convertAncestorsToStrapiFormat(ancestors),
         },
      },
   };
}

function createProductListAncestors(
   parent: ApiProductList['parent']
): ProductListAncestor[] {
   const attributes = parent?.data?.attributes;
   if (attributes == null) {
      return [
         {
            deviceTitle: '',
            title: 'Store',
            type: iFixitPageType.Store,
            handle: 'Store',
         },
      ];
   }
   const ancestors = createProductListAncestors(attributes.parent);

   const type = getProductListType(attributes.type);

   return ancestors.concat({
      deviceTitle: attributes.deviceTitle ?? null,
      title: getProductListTitle({
         title: attributes.title,
         type,
      }),
      type: getProductListType(attributes.type),
      handle: attributes.handle,
   });
}

type ApiProductListChild = NonNullable<ApiProductList['children']>['data'][0];

type CreateProductListChildOptions = {
   deviceWiki: DeviceWiki | null;
};

function createProductListChild({ deviceWiki }: CreateProductListChildOptions) {
   return (apiChild: ApiProductListChild): ProductListChild | null => {
      const { attributes } = apiChild;
      if (attributes == null) {
         return null;
      }
      const imageAttributes = attributes.image?.data?.attributes;
      const type = getProductListType(attributes.type);
      return {
         title: getProductListTitle({
            title: attributes.title,
            type,
         }),
         type,
         deviceTitle: attributes.deviceTitle || null,
         handle: attributes.handle,
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
               type: getProductListType(productList.type),
               deviceTitle: productList.deviceTitle ?? null,
               description: productList.description,
               image:
                  image == null
                     ? null
                     : getImageFromStrapiImage(image, 'thumbnail'),
               filters: productList.filters ?? null,
               algolia: {
                  indexName: ALGOLIA_PRODUCT_INDEX_NAME,
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
                     type: getProductListType(productList.type),
                     deviceTitle: productList.deviceTitle ?? null,
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
   const client = algoliasearch(appId, apiKey, CLIENT_OPTIONS);
   const publicKey = client.generateSecuredApiKey(apiKey, {
      filters: 'public=1 AND is_pro!=1',
   });
   return publicKey;
}

async function findDevicesWithProducts(devices: string[]) {
   return timeAsync('algolia.findDescendantDevicesWithProducts', async () => {
      const client = algoliasearch(
         ALGOLIA_APP_ID,
         ALGOLIA_API_KEY,
         CLIENT_OPTIONS
      );
      const index = client.initIndex(ALGOLIA_PRODUCT_INDEX_NAME);
      const deviceDisjunctiveFilters = devices
         .map((device) => `device:"${escapeFilterValue(device)}"`)
         .join(' OR ');
      const deviceFilterSuffix = deviceDisjunctiveFilters
         ? ` AND (${deviceDisjunctiveFilters})`
         : '';
      const { facets } = await index.search('', {
         facets: ['device'],
         filters: `public = 1${deviceFilterSuffix}`,
         maxValuesPerFacet: 1000,
         hitsPerPage: 0,
      });
      return facets?.device ? facets?.device : {};
   });
}
