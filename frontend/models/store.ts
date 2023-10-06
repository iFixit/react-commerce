import { filterNullableItems } from '@helpers/application-helpers';
import type { Awaited } from '@helpers/application-helpers';
import { cache } from '@lib/cache';
import type { FindStoreQuery } from '@lib/strapi-sdk';
import { strapi } from '@lib/strapi-sdk';
import { timeAsync } from '@ifixit/helpers';
import type {
   ImageLinkMenuItem,
   LinkMenuItem,
   Menu,
   MenuItem,
   ProductListLinkMenuItem,
   SubmenuMenuItem,
} from '@ifixit/menu';
import { MenuItemType } from '@ifixit/menu';

export type Store = Awaited<ReturnType<typeof findStoreByCode>>;

export type SocialMediaAccounts = Store['socialMediaAccounts'];

export type ShopifySettings = Store['shopify'];

type FindStoreByCodeOptions = {
   forceMiss?: boolean;
};

/**
 * Get the store data (header menus, footer menus, etc) from the API.
 * @param {string} code The code of the store
 * @returns The store data.
 */
export function findStoreByCode(
   code: string,
   { forceMiss }: FindStoreByCodeOptions = {}
) {
   return cache(`store-${code}`, () => findStoreByCodeFromStrapi(code), {
      ttl: 60 * 60,
      forceMiss,
   });
}

async function findStoreByCodeFromStrapi(code: string) {
   console.log('FIND STORE BY CODE', code);
   const result = await timeAsync('strapi.findStore', () =>
      strapi.findStore({
         filters: { code: { eq: code } },
      })
   );
   console.log('FIND STORE RESULT:\n', JSON.stringify(result, null, 2));
   const store = result.store?.data?.[0]?.attributes;
   if (store == null) {
      throw new Error('Store not found');
   }
   if (store.shopifySettings == null) {
      throw new Error('Shopify settings not found');
   }
   return {
      header: {
         menu: createMenu(store.header.menu),
      },
      footer: {
         partners: createMenu(store.footer.partners),
         bottomMenu: createMenu(store.footer.bottomMenu),
         menu1: createMenu(store.footer.menu1),
         menu2: createMenu(store.footer.menu2),
         menu3: createMenu(store.footer.menu3),
      },
      socialMediaAccounts: {
         twitter: store.socialMediaAccounts.twitter || null,
         tiktok: store.socialMediaAccounts.tiktok || null,
         facebook: store.socialMediaAccounts.facebook || null,
         instagram: store.socialMediaAccounts.instagram || null,
         youtube: store.socialMediaAccounts.youtube || null,
         repairOrg: store.socialMediaAccounts.repairOrg || null,
      },
      shopify: {
         storefrontDomain: store.shopifySettings.storefrontDomain,
         storefrontAccessToken: store.shopifySettings.storefrontAccessToken,
         storefrontDelegateAccessToken:
            store.shopifySettings.delegateAccessToken ?? null,
      },
   };
}

export interface StoreListItem {
   code: string;
   name: string;
   url: string;
   currency: string;
}

type GetStoreListOptions = {
   forceMiss?: boolean;
};

/**
 * Get the list of stores from the API.
 * @returns A list of store items.
 */
export function getStoreList({ forceMiss }: GetStoreListOptions = {}): Promise<
   StoreListItem[]
> {
   return cache('storeList', getStoreListFromStrapi, {
      ttl: 60 * 10,
      forceMiss,
   });
}

async function getStoreListFromStrapi(): Promise<StoreListItem[]> {
   const result = await timeAsync('strapi.getStoreList', strapi.getStoreList);
   const stores = result.stores?.data || [];
   return filterNullableItems(
      stores.map((store) => {
         const attributes = store.attributes;
         if (attributes == null) {
            return null;
         }
         return {
            code: attributes.code,
            name: attributes.name,
            url: attributes.url,
            currency: attributes.currency,
         };
      })
   );
}

type ApiStore = NonNullable<
   NonNullable<FindStoreQuery['store']>['data'][0]['attributes']
>;

type ApiMenu = ApiStore['header']['menu'];

type ApiMenuItem = NonNullable<
   NonNullable<NonNullable<NonNullable<ApiMenu>['data']>['attributes']>['items']
>[0];

function createMenu(apiMenu: ApiMenu): Menu | null {
   const attributes = apiMenu?.data?.attributes;
   if (attributes == null) {
      return null;
   }
   const items = attributes.items || [];
   return {
      title: attributes.title,
      items: filterNullableItems(items.map<MenuItem | null>(createMenuItem)),
   };
}

function createMenuItem(item: ApiMenuItem): MenuItem | null {
   if (item == null) {
      return null;
   }
   switch (item.__typename) {
      case 'ComponentMenuLink': {
         const menuLink: LinkMenuItem = {
            type: MenuItemType.Link,
            name: item.name,
            url: item.url,
            description: item.description || null,
         };
         return menuLink;
      }
      case 'ComponentMenuLinkWithImage': {
         const image = item.image?.data?.attributes;

         const imageLink: ImageLinkMenuItem = {
            type: MenuItemType.ImageLink,
            name: item.name,
            url: item.url,
            image:
               image == null
                  ? null
                  : {
                       alternativeText: image.alternativeText || null,
                       url: image.url,
                       formats: image.formats,
                    },
         };
         return imageLink;
      }
      case 'ComponentMenuProductListLink': {
         const productList = item.productList?.data?.attributes;
         const productListLink: ProductListLinkMenuItem = {
            type: MenuItemType.ProductListLink,
            name: item.name,
            productList:
               productList == null ? null : { handle: productList.handle },
         };
         return productListLink;
      }
      case 'ComponentMenuSubmenu': {
         const submenu = item.submenu;
         const submenuMenuItem: SubmenuMenuItem = {
            type: MenuItemType.Submenu,
            name: item.name,
            submenu: submenu == null ? null : createMenu(submenu),
         };
         return submenuMenuItem;
      }
      default: {
         console.warn(`Unknown menu item type: ${item.__typename}`);
         return null;
      }
   }
}
