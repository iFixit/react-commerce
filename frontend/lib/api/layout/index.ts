import { assertNever, Awaited, filterNullableItems } from '@lib/utils';
import { LayoutPropsFragment } from '../strapi/generated/sdk';
import { getImageFromStrapiImage } from '../utils';

type StoreSettings = NonNullable<
   NonNullable<LayoutPropsFragment['currentStore']>[0]
>;

type Footer = NonNullable<StoreSettings['footer']>;

type Menu = NonNullable<Footer['menu1']>;

export type LayoutData = NonNullable<
   Awaited<ReturnType<typeof getLayoutProps>>
>['layout'];

export function getLayoutProps(data: LayoutPropsFragment) {
   const currentStore = data.currentStore?.[0];
   const footer = currentStore?.footer;
   const socialMediaAccounts = currentStore?.socialMediaAccounts || {};
   const stores = filterNullableItems(data.stores);
   return {
      layout: {
         footer: {
            menu1: footer?.menu1 ? getMenu(footer.menu1) : undefined,
            menu2: footer?.menu2 ? getMenu(footer.menu2) : undefined,
            partners: footer?.partners ? getMenu(footer.partners) : undefined,
            bottomMenu: footer?.bottomMenu
               ? getMenu(footer.bottomMenu)
               : undefined,
            socialMediaAccounts,
            stores,
         },
      },
   };
}

function getMenu(rawMenu: Menu) {
   return {
      items: filterNullableItems(rawMenu.items).map((item) => {
         switch (item.__typename) {
            case 'ComponentMenuLink': {
               return {
                  name: item.name,
                  url: item.url,
               };
            }
            case 'ComponentMenuLinkWithImage': {
               return {
                  name: item.name,
                  url: item.url,
                  image:
                     getImageFromStrapiImage(item.image, 'small') || undefined,
               };
            }
            case 'ComponentMenuProductListLink': {
               return {
                  name: item.name,
                  url: item.productList
                     ? `/collections/${item.productList.handle}`
                     : '#',
               };
            }
            default:
               return assertNever(item);
         }
      }),
   };
}
