import {
   ALGOLIA_API_KEY,
   ALGOLIA_APP_ID,
   ALGOLIA_PRODUCT_INDEX_NAME,
} from '@config/env';
import { escapeFilterValue, getClientOptions } from '@helpers/algolia-helpers';
import { filterNullableItems } from '@helpers/application-helpers';
import { getProductListTitle } from '@helpers/product-list-helpers';
import { presence, timeAsync } from '@ifixit/helpers';
import { IFixitAPIClient } from '@ifixit/ifixit-api-client';
import {
   DeviceWiki,
   fetchDeviceWiki,
   fetchMultipleDeviceImages,
} from '@lib/ifixit-api/devices';
import {
   ProductListFieldsFragment,
   ProductListFiltersInput,
   strapi,
} from '@lib/strapi-sdk';
import {
   childImageFromDeviceWiki,
   imageFromStrapi,
} from '@models/components/image';
import algoliasearch from 'algoliasearch';
import { createProductListAncestorsFromStrapiOrDeviceWiki } from './component/product-list-ancestor';
import type { ProductListChild } from './component/product-list-child';
import { ProductListType } from './component/product-list-type';
import { productListRedirectToTypeFromStrapi } from './component/product-list-redirect-to-type.server';
import { productListTypeFromStrapi } from './component/product-list-type.server';
import { productListSections } from './sections';
import { findProductListReusableSections } from './sections/reusable-sections';
import {
   BaseProductList,
   ProductList,
   ProductListItemTypeOverride,
   ProductListItemTypeOverrideIndexed,
} from './types';

/**
 * Get the product list data from the API
 */
export async function findProductList(
   filters: ProductListFiltersInput,
   ifixitOrigin: string
): Promise<ProductList | null> {
   const filterDeviceTitle = filters.deviceTitle?.eqi ?? '';

   const [result, deviceWiki] = await Promise.all([
      timeAsync('strapi.getProductList', () =>
         strapi.findProductList({ filters })
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

   const id = result.productLists?.data?.[0]?.id ?? null;
   const deviceTitle =
      deviceWiki?.deviceTitle ?? productList?.deviceTitle ?? null;
   const handle = productList?.handle ?? '';
   const title =
      productList?.title ??
      (deviceWiki?.deviceTitle ? deviceWiki?.deviceTitle + ' Parts' : '');
   const description =
      productList?.description ??
      (deviceWiki?.description as string | null) ??
      null;

   const algoliaApiKey = createPublicAlgoliaKey(
      ALGOLIA_APP_ID,
      ALGOLIA_API_KEY
   );
   const productListType = productListTypeFromStrapi(productList?.type);

   const ancestors = createProductListAncestorsFromStrapiOrDeviceWiki(
      productList,
      deviceWiki
   );
   const isPartsList =
      productListType === ProductListType.AllParts ||
      productListType === ProductListType.DeviceParts;
   const redirectTo = productList?.redirectTo?.data?.attributes
      ? {
           deviceTitle:
              productList.redirectTo.data.attributes.deviceTitle ?? null,
           handle: productList.redirectTo.data.attributes.handle,
           type: productListTypeFromStrapi(
              productList.redirectTo.data.attributes.type
           ),
        }
      : null;
   const redirectToType = productListRedirectToTypeFromStrapi(
      productList?.redirectToType
   );

   const [reusableSections, children] = await Promise.all([
      findProductListReusableSections({
         strapiProductList: productList,
         ancestorHandles: ancestors.map((a) => a.handle),
      }),
      getProductListChildren({
         apiChildren: productList?.children?.data,
         deviceWiki,
         ifixitOrigin,
         isPartsList,
      }),
   ]);

   const baseProductList: BaseProductList = {
      id,
      title,
      h1: presence(productList?.h1),
      handle,
      deviceTitle,
      tagline: presence(productList?.tagline),
      description,
      metaDescription: presence(productList?.metaDescription),
      metaTitle: presence(productList?.metaTitle),
      defaultShowAllChildrenOnLgSizes:
         productList?.defaultShowAllChildrenOnLgSizes ?? null,
      filters: productList?.filters ?? null,
      optionalFilters: productList?.optionalFilters ?? null,
      forceNoindex: productList?.forceNoindex ?? null,
      indexVariantsInsteadOfDevice:
         productList?.indexVariantsInsteadOfDevice ?? null,
      heroImage: imageFromStrapi(productList?.heroImage),
      brandLogo: imageFromStrapi(productList?.brandLogo, {
         format: 'large',
         width: productList?.brandLogoWidth,
      }),
      ancestors,
      children,
      sections: productListSections({
         strapiProductList: productList,
         reusableSections,
      }),
      algolia: {
         apiKey: algoliaApiKey,
      },
      wikiInfo: deviceWiki?.info || [],
      isOnStrapi: !!productList,
      itemOverrides: formatItemTypeOverrides(productList?.itemOverrides),
      redirectTo,
      redirectToType,
   };

   return {
      ...baseProductList,
      type: productListType,
   };
}

type ApiProductListChild = NonNullable<
   ProductListFieldsFragment['children']
>['data'][0];

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

type CreateProductListChildOptions = {
   deviceWiki: DeviceWiki | null;
};

function createProductListChild({ deviceWiki }: CreateProductListChildOptions) {
   return (apiChild: ApiProductListChild): ProductListChild | null => {
      const { attributes } = apiChild;
      if (attributes == null || attributes.hideFromParent) {
         return null;
      }
      const strapiImage = imageFromStrapi(attributes.image, {
         format: 'medium',
      });
      const type = productListTypeFromStrapi(attributes.type);
      return {
         title: getProductListTitle({
            title: attributes.title,
            type,
         }),
         type,
         deviceTitle: attributes.deviceTitle || null,
         handle: attributes.handle,
         image:
            strapiImage ??
            (deviceWiki && attributes.deviceTitle
               ? childImageFromDeviceWiki(deviceWiki, attributes.deviceTitle)
               : null),
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

type ApiProductListItemOverrides = NonNullable<
   ProductListFieldsFragment['itemOverrides']
>[0];

function formatItemTypeOverrides(
   itemOverrides: ApiProductListItemOverrides[] | undefined
): ProductListItemTypeOverrideIndexed {
   if (!itemOverrides) return {};
   const convertedOverrides =
      convertToProductListItemTypeOverrides(itemOverrides);
   return convertedOverrides.reduce((result, item) => {
      result[item.itemType || '*'] = item;
      return result;
   }, {} as ProductListItemTypeOverrideIndexed);
}

function convertToProductListItemTypeOverrides(
   itemOverrides: ApiProductListItemOverrides[]
): ProductListItemTypeOverride[] {
   const formattedOverrides = itemOverrides.map(
      (itemOverride): ProductListItemTypeOverride | null => {
         if (
            itemOverride == null ||
            itemOverride.__typename !== 'ComponentProductListItemTypeOverride'
         ) {
            return null;
         } else {
            return {
               itemType: itemOverride.itemType,
               title: itemOverride.title,
               metaTitle: itemOverride.metaTitle,
               metaDescription: itemOverride.metaDescription,
               description: itemOverride.description,
               tagline: itemOverride.tagline,
            };
         }
      }
   );
   return filterNullableItems(formattedOverrides);
}

function createPublicAlgoliaKey(appId: string, apiKey: string): string {
   const client = algoliasearch(appId, apiKey, getClientOptions());
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
         getClientOptions(null)
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
         facetingAfterDistinct: true,
         hitsPerPage: 0,
      });
      return facets?.device ? facets?.device : {};
   });
}
