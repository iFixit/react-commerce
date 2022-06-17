import { filterNullableItems, Awaited } from '@helpers/application-helpers';
import { cache } from '@lib/cache';
import { strapi } from '@lib/strapi-sdk';
import {
   ImageLinkMenuItem,
   LinkMenuItem,
   Menu,
   MenuItem,
   MenuItemType,
   ProductListLinkMenuItem,
   SubmenuMenuItem,
} from './menu';

export interface Store {
   header: {
      menu: Menu | null;
   };
   footer: {
      menu1: Menu | null;
      menu2: Menu | null;
      partners: Menu | null;
      bottomMenu: Menu | null;
   };
   socialMediaAccounts: SocialMediaAccounts;
   shopify: ShopifySettings;
}

export interface SocialMediaAccounts {
   twitter: string | null;
   facebook: string | null;
   instagram: string | null;
   youtube: string | null;
   repairOrg: string | null;
}

export interface ShopifySettings {
   storefrontDomain: string;
   storefrontAccessToken: string;
}

export function getStoreByCode(code: string): Promise<Store> {
   return cache(`store-${code}`, () => getStoreByCodeFromStrapi(code), 60 * 60);
}

/**
 * Get the store data (header menus, footer menus, etc) from the API.
 * @param {string} code The code of the store
 * @returns The store data.
 */
async function getStoreByCodeFromStrapi(code: string): Promise<Store> {
   const result = await strapi.getStore({
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
         facebook: store.socialMediaAccounts.facebook || null,
         instagram: store.socialMediaAccounts.instagram || null,
         youtube: store.socialMediaAccounts.youtube || null,
         repairOrg: store.socialMediaAccounts.repairOrg || null,
      },
      shopify: {
         storefrontDomain: store.shopifySettings.storefrontDomain,
         storefrontAccessToken: store.shopifySettings.storefrontAccessToken,
      },
   };
}

export interface StoreListItem {
   code: string;
   name: string;
   url: string;
   currency: string;
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
         };
      })
   );
}

type ApiMenu = NonNullable<
   NonNullable<
      Awaited<ReturnType<typeof strapi.getStore>>['store']
   >['data'][0]['attributes']
>['header']['menu'];

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
