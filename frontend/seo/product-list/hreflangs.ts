import { productListPath } from '@helpers/path-helpers';
import { ProductList } from '@models/product-list';

type Collection = keyof typeof usHreflangsPaths;
type Hreflangs = {
   de: URL;
   'en-au': URL;
   'en-ca': URL;
   'en-eu': URL;
   'en-gb': URL;
   'en-us': URL;
   fr: URL;
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
   'pc-laptop-parts': 'Tools/PC',
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
      hreflangs[collection] = {
         de: new URL(euPath, 'https://store.ifixit.de'),
         'en-au': new URL(auCaPath, 'https://australia.ifixit.com'),
         'en-ca': new URL(auCaPath, 'https://canada.ifixit.com'),
         'en-eu': new URL(euPath, 'https://eustore.ifixit.com'),
         'en-gb': new URL(euPath, 'https://store.ifixit.co.uk'),
         'en-us': new URL(usPath, 'https://www.ifixit.com'),
         fr: new URL(euPath, 'https://store.ifixit.fr'),
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
   const path = productListPath(productList, itemType ?? undefined).replace(
      /^\//,
      ''
   );
   const collection = pathToCollection[path] ?? null;
   return collection ? hreflangs[collection] : null;
}
