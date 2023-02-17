import { filterNullableItems, Awaited } from '@helpers/application-helpers';
import { cache } from '@lib/cache';
import { FindStoreQuery, strapi } from '@lib/strapi-sdk';
import type {
   ImageLinkMenuItem,
   LinkMenuItem,
   Menu,
   MenuItem,
   MenuItemType,
   ProductListLinkMenuItem,
   SubmenuMenuItem,
} from '@ifixit/ui/menu';

export type Store = Awaited<ReturnType<typeof findStoreByCode>>;

export type SocialMediaAccounts = Store['socialMediaAccounts'];

export type ShopifySettings = Store['shopify'];

/**
 * Get the store data (header menus, footer menus, etc) from the API.
 * @param {string} code The code of the store
 * @returns The store data.
 */
export function findStoreByCode(code: string) {
   return cache(
      `store-${code}`,
      () => findStoreByCodeFromStrapi(code),
      60 * 60
   );
}

async function findStoreByCodeFromStrapi(code: string) {
   const result = await strapi.findStore({
      filters: { code: { eq: code } },
   });
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
         menu1: createMenu(store.footer.menu1),
         menu2: createMenu(store.footer.menu2),
         partners: createMenu(store.footer.partners),
         bottomMenu: createMenu(store.footer.bottomMenu),
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
   supportUrl?: string;
}

/**
 * Get the list of stores from the API.
 * @returns A list of store items.
 */
export function getStoreList(): Promise<StoreListItem[]> {
   return cache('storeList', getStoreListFromStrapi, 60 * 10);
}

async function getStoreListFromStrapi(): Promise<StoreListItem[]> {
   const result = await strapi.getStoreList();
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
            supportUrl: getSupportUrlFromStoreCode(attributes.code),
         };
      })
   );
}

export function getSupportUrlFromStoreCode(code: string): string {
   switch (code.toLowerCase()) {
      case 'eu_pro':
      case 'eu_pro_test':
      case 'eu_test':
      case 'it':
      case 'eu':
      case 'uk':
         return 'https://ifixit-eu-en.helpscoutdocs.com/';
      case 'de':
         return 'https://ifixit-eu-de.helpscoutdocs.com/';
      case 'fr':
         return 'https://ifixit-eu-fr.helpscoutdocs.com/';
      case 'au':
         return 'https://au-ifixit-support.helpscoutdocs.com/';
      case 'ca':
         return 'https://ca-ifixit-support.helpscoutdocs.com/';
      default:
         return 'https://help.ifixit.com/';
   }
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
