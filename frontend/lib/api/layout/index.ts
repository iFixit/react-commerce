import { assertNever, Awaited, filterNullableItems } from '@lib/utils';
import { LayoutPropsFragment } from '../strapi/generated/sdk';
import { getImageFromStrapiImage, Image } from '../utils';
import snarkdown from 'snarkdown';

type StoreSettings = NonNullable<
   NonNullable<LayoutPropsFragment['currentStore']>[0]
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
   const currentStore = data.currentStore?.[0];
   const footer = currentStore?.footer;
   const header = currentStore?.header;
   const socialMediaAccounts = currentStore?.socialMediaAccounts || {};
   const stores = filterNullableItems(data.stores);
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

function getMenu(rawMenu: RawMenu): Menu {
   return {
      items: filterNullableItems(
         rawMenu.items.map((item): MenuItem | null => {
            if (item == null) {
               return null;
            }
            switch (item.__typename) {
               case 'ComponentMenuLink': {
                  if (item.name === 'Repair Guides') {
                     console.log('has description?', item);
                  }
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
                  return {
                     type: 'linkWithImage',
                     name: item.name,
                     url: item.url,
                     image:
                        getImageFromStrapiImage(item.image, 'small') ||
                        undefined,
                  };
               }
               case 'ComponentMenuProductListLink': {
                  return {
                     type: 'productListLink',
                     name: item.name,
                     url: item.productList
                        ? `/collections/${item.productList.handle}`
                        : '#',
                  };
               }
               case 'ComponentMenuSubmenu': {
                  if (item.submenu == null) {
                     return null;
                  }
                  return {
                     type: 'submenu',
                     name: item.name,
                     submenu: getMenu(item.submenu),
                  };
               }
               default:
                  return assertNever(item);
            }
         })
      ),
   };
}
