import { productListPath } from '@helpers/path-helpers';
import { ProductList } from '@models/product-list';

type Collection = keyof typeof usHreflangsPaths;
type Hreflangs = {
   en: string;
   'x-default': string;
   'en-au': string;
   'en-nz': string;
   'en-ca': string;
   'de-at': string;
   'de-be': string;
   'de-ch': string;
   'de-de': string;
   'de-nl': string;
   'fr-be': string;
   'fr-ch': string;
   'fr-fr': string;
   'en-gb': string;
   'en-at': string;
   'en-ax': string;
   'en-be': string;
   'en-bg': string;
   'en-ch': string;
   'en-cz': string;
   'en-de': string;
   'en-dk': string;
   'en-ee': string;
   'en-es': string;
   'en-fi': string;
   'en-fr': string;
   'en-gr': string;
   'en-hr': string;
   'en-hu': string;
   'en-ie': string;
   'en-it': string;
   'en-lt': string;
   'en-lu': string;
   'en-lv': string;
   'en-mt': string;
   'en-nl': string;
   'en-no': string;
   'en-pl': string;
   'en-pt': string;
   'en-ro': string;
   'en-se': string;
   'en-si': string;
   'en-sk': string;
};

const usHreflangsPaths = {
   toolkits: 'Tools/Toolkits',
   'apple-iphone-parts': 'Parts/iPhone',
   'steam-deck-parts': 'Parts/Steam_Deck',
   'samsung-galaxy-parts': 'Parts/Samsung_Android_Phone',
   'macbook-pro': 'Parts/MacBook_Pro',
   'nintendo-switch-parts': 'Parts/Nintendo_Switch',
   'android-parts': 'Parts/Android_Phone',
   'macbook-air': 'Parts/MacBook_Air',
   'mac-parts': 'Parts/Mac',
   'iphone-11': 'Parts/iPhone_11',
   'google-phone': 'Parts/Google_Phone',
   'apple-ipad-parts': 'Parts/iPad',
   'iphone-12-parts': 'Parts/iPhone_12',
   'iphone-12-pro-max-parts': 'Parts/iPhone_12_Pro_Max',
   'iphone-xr': 'Parts/iPhone_XR',
   'game-console-parts': 'Parts/Game_Console',
   'iphone-x': 'Parts/iPhone_X',
   'google-pixel-parts': 'Parts/Google_Pixel',
   'iphone-12-mini-parts': 'Parts/iPhone_12_mini',
   'iphone-12-pro-parts': 'Parts/iPhone_12_Pro',
   'oneplus-parts': 'Parts/OnePlus_Phone',
   'iphone-xs': 'Parts/iPhone_XS',
   'iphone-8': 'Parts/iPhone_8',
   'iphone-xs-max': 'Parts/iPhone_XS_Max',
   'iphone-7': 'Parts/iPhone_7',
   'iphone-11-pro-max': 'Parts/iPhone_11_Pro_Max',
   'iphone-7-plus': 'Parts/iPhone_7_Plus',
   'apple-imac-parts': 'Parts/iMac',
   'samsung-galaxy-s9': 'Parts/Samsung_Galaxy_S9',
   'valve-index-parts': 'Parts/Valve_Index',
   'samsung-galaxy-s10-parts': 'Parts/Samsung_Galaxy_S10',
   'samsung-galaxy-s10-plus': 'Parts/Samsung_Galaxy_S10_Plus',
   'iphone-se': 'Parts/iPhone_SE',
   'iphone-11-pro': 'Parts/iPhone_11_Pro',
   'iphone-8-plus': 'Parts/iPhone_8_Plus',
   'samsung-galaxy-s8': 'Parts/Samsung_Galaxy_S8',
   'iphone-6s': 'Parts/iPhone_6s',
   'iphone-6': 'Parts/iPhone_6',
   'pc-laptop-parts': 'Parts/PC_Laptop',
   'iphone-se-2020': 'Parts/iPhone_SE_2020',
   'samsung-galaxy-s9-plus': 'Parts/Samsung_Galaxy_S9_Plus',
   'apple-mac-mini-parts': 'Parts/Mac_Mini',
   'ipad-4': 'Parts/iPad_4',
   'samsung-galaxy-s7': 'Parts/Samsung_Galaxy_S7',
   'ipad-mini-1': 'Parts/iPad_Mini',
   'iphone-5s': 'Parts/iPhone_5s',
   'iphone-6s-plus': 'Parts/iPhone_6s_Plus',
   'samsung-galaxy-s7-edge': 'Parts/Samsung_Galaxy_S7_Edge',
   'iphone-4': 'Parts/iPhone_4',
   'ipad-3': 'Parts/iPad_3',
   'samsung-galaxy-s8-plus': 'Parts/Samsung_Galaxy_S8_Plus',
   'ipad-air-2': 'Parts/iPad_Air_2',
   'ipad-6': 'Parts/iPad_6',
   'iphone-6-plus': 'Parts/iPhone_6_Plus',
   'ipad-air-1': 'Parts/iPad_Air',
   'ipad-5': 'Parts/iPad_5',
   'iphone-4s': 'Parts/iPhone_4S',
   'ipad-2': 'Parts/iPad_2',
   'iphone-5': 'Parts/iPhone_5',
   'ipad-mini-retina': 'Parts/iPad_Mini_2',
   'imac-upgrade-kits': 'Parts/iMac/Kits',
   'apple-watch': 'Parts/Apple_Watch',
   'iphone-5c': 'Parts/iPhone_5c',
   macbook: 'Parts/MacBook',
   'apple-macbook-parts': 'Parts/Mac_Laptop',
   parts: 'Parts',
   'black-friday-deals': 'Shop/Black_Friday',
};

const euHreflangPaths: Partial<Record<Collection, string>> = {
   'nintendo-switch-parts': 'nintendo-switch',
   'google-phone': 'google-pixel-parts',
};

const auCaHreflangPaths: Partial<Record<Collection, string>> = {
   'apple-iphone-parts': 'iphone',
   'samsung-galaxy-parts': 'samsung-phone',
   'nintendo-switch-parts': 'nintendo-switch',
   'apple-macbook-parts': 'mac-parts',
};

const deOrigin = 'https://store.ifixit.de';
const auOrigin = 'https://australia.ifixit.com';
const caOrigin = 'https://canada.ifixit.com';
const euOrigin = 'https://eustore.ifixit.com';
const ukOrigin = 'https://store.ifixit.co.uk';
const usOrigin = 'https://www.ifixit.com';
const frOrigin = 'https://store.ifixit.fr';

const collections = Object.keys(
   usHreflangsPaths
) as unknown as Array<Collection>;

type CollectionHreflangs = Record<Collection, Hreflangs>;
const hreflangs: CollectionHreflangs = collections.reduce(
   (hreflangs, collection) => {
      const auCaCollection = auCaHreflangPaths[collection] ?? collection;
      const euCollection = euHreflangPaths[collection] ?? collection;
      const auCaPath = `collections/${auCaCollection}`;
      const euPath = `collections/${euCollection}`;
      const usPath = usHreflangsPaths[collection];
      const usUrl = new URL(usPath, usOrigin).toString();
      const auUrl = new URL(auCaPath, auOrigin).toString();
      const caUrl = new URL(auCaPath, caOrigin).toString();
      const deUrl = new URL(euPath, deOrigin).toString();
      const frUrl = new URL(euPath, frOrigin).toString();
      const ukUrl = new URL(euPath, ukOrigin).toString();
      const euUrl = new URL(euPath, euOrigin).toString();
      hreflangs[collection] = {
         // us
         en: usUrl,
         'x-default': usUrl,
         // au
         'en-au': auUrl,
         'en-nz': auUrl,
         // ca
         'en-ca': caUrl,
         // de
         'de-at': deUrl,
         'de-be': deUrl,
         'de-ch': deUrl,
         'de-de': deUrl,
         'de-nl': deUrl,
         // fr
         'fr-be': frUrl,
         'fr-ch': frUrl,
         'fr-fr': frUrl,
         // uk
         'en-gb': ukUrl,
         // eu
         'en-at': euUrl,
         'en-ax': euUrl,
         'en-be': euUrl,
         'en-bg': euUrl,
         'en-ch': euUrl,
         'en-cz': euUrl,
         'en-de': euUrl,
         'en-dk': euUrl,
         'en-ee': euUrl,
         'en-es': euUrl,
         'en-fi': euUrl,
         'en-fr': euUrl,
         'en-gr': euUrl,
         'en-hr': euUrl,
         'en-hu': euUrl,
         'en-ie': euUrl,
         'en-it': euUrl,
         'en-lt': euUrl,
         'en-lu': euUrl,
         'en-lv': euUrl,
         'en-mt': euUrl,
         'en-nl': euUrl,
         'en-no': euUrl,
         'en-pl': euUrl,
         'en-pt': euUrl,
         'en-ro': euUrl,
         'en-se': euUrl,
         'en-si': euUrl,
         'en-sk': euUrl,
      };
      return hreflangs;
   },
   {} as CollectionHreflangs
);

const pathToCollection: Record<string, Collection> = Object.fromEntries(
   Object.entries(usHreflangsPaths).map((a) => a.reverse())
);

export function useHreflangs(
   productList: ProductList,
   itemType: string | null
): Hreflangs | null {
   const path = productListPath({
      productList,
      itemType: itemType ?? undefined,
   }).replace(/^\//, '');
   const collection = pathToCollection[path] ?? null;
   return collection ? hreflangs[collection] : null;
}
