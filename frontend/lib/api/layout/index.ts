import { assertNever, Awaited, filterNullableItems } from '@lib/utils';
import snarkdown from 'snarkdown';
import { LayoutPropsFragment } from '../strapi/generated/sdk';
import { getImageFromStrapiImage, Image } from '../utils';

type StoreSettings = NonNullable<
   NonNullable<LayoutPropsFragment['currentStore']>['data'][0]['attributes']
>;

type Footer = NonNullable<StoreSettings['footer']>;

type RawMenu = NonNullable<Footer['menu1']>;

export type LayoutData = NonNullable<
   Awaited<ReturnType<typeof getLayoutProps>>
>['layout'];

export interface Menu {
   items: MenuItem[];
}

export type MenuItem =
   | {
        type: 'link';
        name: string;
        url: string;
        descriptionHtml?: string | null;
     }
   | {
        type: 'linkWithImage';
        name: string;
        url: string;
        image?: Image | null;
     }
   | {
        type: 'productListLink';
        name: string;
        url: string;
     }
   | {
        type: 'submenu';
        name: string;
        submenu: Menu;
     };

export function getLayoutProps(data: LayoutPropsFragment) {
   const currentStore = data.currentStore?.data[0];
   const footer = currentStore?.attributes?.footer;
   const header = currentStore?.attributes?.header;
   const socialMediaAccounts =
      currentStore?.attributes?.socialMediaAccounts || {};
   const stores = filterNullableItems(
      data.stores?.data?.map((store) => {
         if (store.attributes == null) {
            return null;
         }
         return store.attributes;
      })
   );
   return {
      layout: {
         header: {
            menu: header?.menu ? getMenu(header.menu) : null,
         },
         footer: {
            menu1: footer?.menu1 ? getMenu(footer.menu1) : null,
            menu2: footer?.menu2 ? getMenu(footer.menu2) : null,
            partners: footer?.partners ? getMenu(footer.partners) : null,
            bottomMenu: footer?.bottomMenu ? getMenu(footer.bottomMenu) : null,
            socialMediaAccounts,
            stores,
         },
      },
   };
}

function getMenu(rawMenu: RawMenu): Menu | null {
   const menuAttributes = rawMenu.data?.attributes;
   if (menuAttributes == null) {
      return null;
   }
   return {
      items: filterNullableItems(
         menuAttributes.items.map((item): MenuItem | null => {
            if (item == null) {
               return null;
            }
            switch (item.__typename) {
               case 'ComponentMenuLink': {
                  return {
                     type: 'link',
                     name: item.name,
                     url: item.url,
                     descriptionHtml: item.description
                        ? snarkdown(item.description)
                        : null,
                  };
               }
               case 'ComponentMenuLinkWithImage': {
                  const imageAttributes = item.image?.data?.attributes;
                  return {
                     type: 'linkWithImage',
                     name: item.name,
                     url: item.url,
                     image:
                        imageAttributes == null
                           ? null
                           : getImageFromStrapiImage(imageAttributes, 'small'),
                  };
               }
               case 'ComponentMenuProductListLink': {
                  return {
                     type: 'productListLink',
                     name: item.name,
                     url: item.productList?.data?.attributes
                        ? `/collections/${item.productList.data?.attributes?.handle}`
                        : '#',
                  };
               }
               case 'ComponentMenuSubmenu': {
                  if (item.submenu == null) {
                     return null;
                  }
                  const submenu = getMenu(item.submenu);
                  if (submenu == null) {
                     return null;
                  }
                  return {
                     type: 'submenu',
                     name: item.name,
                     submenu,
                  };
               }
               case 'Error': {
                  return null;
               }
               default:
                  return assertNever(item);
            }
         })
      ),
   };
}
