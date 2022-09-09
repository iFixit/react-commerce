import { PRODUCT_LIST_PAGE_PARAM } from '@config/constants';
import {
   getProductListTitle,
   encodeDeviceItemTypeSpaces,
} from '@helpers/product-list-helpers';
import { useAppContext } from '@ifixit/app';
import { ProductList } from '@models/product-list';
import Head from 'next/head';
import {
   useCurrentRefinements,
   usePagination,
} from 'react-instantsearch-hooks-web';
import { useDevicePartsItemType } from './sections/FilterableProductsSection/useDevicePartsItemType';

export interface MetaTagsProps {
   productList: ProductList;
}

export function MetaTags({ productList }: MetaTagsProps) {
   const appContext = useAppContext();
   const currentRefinements = useCurrentRefinements();
   const pagination = usePagination();
   const page = pagination.currentRefinement + 1;
   const refinementAttributes = currentRefinements.items.map(
      (item) => item.attribute
   );
   const isItemTypeFilter =
      refinementAttributes.length === 1 &&
      refinementAttributes[0] === 'facet_tags.Item Type';
   const isFiltered = currentRefinements.items.length > 0 && !isItemTypeFilter;
   const itemType = useDevicePartsItemType(productList);
   let title =
      productList.metaTitle || getProductListTitle(productList, itemType);
   if (!isFiltered && page > 1) {
      title += ` - Page ${page}`;
   }
   title += ' | iFixit';
   const itemTypeHandle = itemType
      ? `/${encodeDeviceItemTypeSpaces(itemType)}`
      : '';
   const canonicalUrl = `${appContext.ifixitOrigin}${
      productList.path
   }${itemTypeHandle}${page > 1 ? `?${PRODUCT_LIST_PAGE_PARAM}=${page}` : ''}`;
   const imageUrl = productList.image?.url;
   const productListExemptions =
      noIndexExemptions[productList.deviceTitle ?? ''];
   const isNoIndexExempt = itemType
      ? productListExemptions?.itemTypes?.includes(
           encodeDeviceItemTypeSpaces(itemType)
        )
      : productListExemptions?.root;
   const hasResults = pagination.nbHits >= (isNoIndexExempt ? 1 : 2);
   const shouldNoIndex = isFiltered || !hasResults || productList.forceNoIndex;
   return (
      <Head>
         {shouldNoIndex ? (
            <meta name="robots" content="noindex,nofollow" />
         ) : (
            <>
               <link rel="canonical" href={canonicalUrl} />
               <meta
                  name="description"
                  content={
                     productList.metaDescription || productList.description
                  }
               />
            </>
         )}
         <title>{title}</title>
         <meta property="og:title" content={title} />
         <meta
            name="og:description"
            content={productList.metaDescription || productList.description}
         />
         <meta property="og:type" content="website" />
         <meta property="og:url" content={canonicalUrl} />
         {imageUrl && <meta property="og:image" content={imageUrl} />}
      </Head>
   );
}

type NoIndexExemptionsType = {
   [handle: string]: {
      root?: boolean;
      itemTypes?: string[];
   };
};

const noIndexExemptions: NoIndexExemptionsType = {
   "Amazon Kindle Oasis (1st Gen)": {
      "itemTypes": [
         "Screens"
      ]
   },
   "Apple Smartwatch": {
      "itemTypes": [
         "Buttons"
      ]
   },
   "Asus Laptop": {
      "itemTypes": [
         "SD_Card_Slots"
      ]
   },
   "Dell Latitude E5270": {
      "itemTypes": [
         "Batteries"
      ]
   },
   "Dell Latitude E5570": {
      "itemTypes": [
         "Batteries"
      ]
   },
   "DJI Spark": {
      "itemTypes": [
         "Batteries",
         "Motherboards"
      ]
   },
   "Dyson DC34": {
      "itemTypes": [
         "Batteries"
      ]
   },
   "Dyson DC35": {
      "itemTypes": [
         "Batteries"
      ]
   },
   "Dyson DC59": {
      "itemTypes": [
         "Batteries"
      ]
   },
   "Fitbit Charge 5": {
      "itemTypes": [
         "Screens"
      ]
   },
   "Fitbit Sense": {
      "itemTypes": [
         "Screens"
      ]
   },
   "Fitbit Smartwatch": {
      "itemTypes": [
         "Batteries"
      ]
   },
   "Fitbit Versa 3": {
      "itemTypes": [
         "Screens"
      ]
   },
   "Garmin Edge Explore 820": {
      "itemTypes": [
         "Batteries"
      ]
   },
   "Google Phone": {
      "itemTypes": [
         "Buttons",
         "Microphones",
         "SIM"
      ]
   },
   "Google Pixel 3a": {
      "itemTypes": [
         "Buttons"
      ]
   },
   "Google Pixel 5a": {
      "itemTypes": [
         "Screens"
      ]
   },
   "Google Pixel 6": {
      "itemTypes": [
         "Screens"
      ]
   },
   "HP EliteBook 745 G5": {
      "itemTypes": [
         "Batteries"
      ]
   },
   "HP EliteBook 830 G5": {
      "itemTypes": [
         "Batteries"
      ]
   },
   "HP EliteBook 840 G5": {
      "itemTypes": [
         "Batteries"
      ]
   },
   "HP EliteBook 850 G1": {
      "itemTypes": [
         "Batteries"
      ]
   },
   "HP EliteBook 850 G6": {
      "itemTypes": [
         "Batteries"
      ]
   },
   "HP Laptop": {
      "itemTypes": [
         "Case_Components"
      ]
   },
   "HP ZBook 15U G5": {
      "itemTypes": [
         "Batteries"
      ]
   },
   "HTC U11 Life": {
      "itemTypes": [
         "Batteries"
      ]
   },
   "iMac": {
      "itemTypes": [
         "Graphics_Cards",
         "Logic_Boards",
         "Power_Supplies",
         "SSD_Upgrade_Kits",
         "Motherboards",
         "Hard_Drives"
      ]
   },
   "iMac Intel 21.5\" EMC 2805": {
      "itemTypes": [
         "SSD_Upgrade_Kits",
         "Hard_Drives"
      ]
   },
   "iMac Intel 24\"": {
      "itemTypes": [
         "Power_Supplies"
      ]
   },
   "iMac Intel 27\"": {
      "itemTypes": [
         "Logic_Boards",
         "Motherboards"
      ]
   },
   "iPad": {
      "itemTypes": [
         "Logic_Boards",
         "Motherboards"
      ]
   },
   "iPad Air": {
      "itemTypes": [
         "Batteries",
         "Logic_Boards",
         "Motherboards"
      ]
   },
   "iPad Air 2": {
      "itemTypes": [
         "Logic_Boards",
         "Motherboards"
      ]
   },
   "iPad Air 3": {
      "itemTypes": [
         "Batteries",
         "Screens"
      ]
   },
   "iPad Air 4": {
      "itemTypes": [
         "Batteries",
         "Screens"
      ]
   },
   "iPad Mini 5": {
      "itemTypes": [
         "Screens"
      ]
   },
   "iPad Pro": {
      "itemTypes": [
         "Lightning_Connector",
         "Logic_Boards",
         "Cables",
         "Motherboards"
      ]
   },
   "iPad Pro 10.5\"": {
      "itemTypes": [
         "Batteries"
      ]
   },
   "iPad Pro 12.9\"": {
      "itemTypes": [
         "Batteries",
         "Lightning_Connector",
         "Logic_Boards",
         "Screens",
         "Cables",
         "Motherboards"
      ]
   },
   "iPad Pro 12.9\" 4th Gen": {
      "itemTypes": [
         "Screens"
      ]
   },
   "iPad Pro 9.7\"": {
      "itemTypes": [
         "Batteries"
      ]
   },
   "iPhone": {
      "itemTypes": [
         "Logic_Boards",
         "Motherboards"
      ]
   },
   "iPhone 11": {
      "itemTypes": [
         "Adhesive_Strips",
         "Buttons",
         "Lightning_Connector",
         "Adhesives",
         "Cables"
      ]
   },
   "iPhone 11 Pro": {
      "itemTypes": [
         "Antennas"
      ]
   },
   "iPhone 11 Pro Max": {
      "itemTypes": [
         "Antennas"
      ]
   },
   "iPhone 12 Pro Max": {
      "itemTypes": [
         "Batteries",
         "Lightning_Connector",
         "Cables"
      ]
   },
   "iPhone 6": {
      "itemTypes": [
         "Microphones"
      ]
   },
   "iPhone 6s": {
      "itemTypes": [
         "Logic_Boards",
         "Motherboards"
      ]
   },
   "iPhone 7": {
      "itemTypes": [
         "Batteries",
         "Logic_Boards",
         "Motherboards"
      ]
   },
   "iPhone 7 Plus": {
      "itemTypes": [
         "Logic_Boards",
         "Motherboards"
      ]
   },
   "iPhone SE": {
      "itemTypes": [
         "Batteries"
      ]
   },
   "iPhone X": {
      "itemTypes": [
         "Lightning_Connector",
         "Cables"
      ]
   },
   "iPhone XR": {
      "itemTypes": [
         "Antennas"
      ]
   },
   "iPhone XS": {
      "itemTypes": [
         "Lightning_Connector",
         "Logic_Boards",
         "Cables",
         "Motherboards"
      ]
   },
   "iPhone XS Max": {
      "itemTypes": [
         "Lightning_Connector",
         "Logic_Boards",
         "Microphones",
         "Cables",
         "Motherboards"
      ]
   },
   "JBL XTREME": {
      "itemTypes": [
         "Batteries"
      ]
   },
   "Lenovo Laptop": {
      "itemTypes": [
         "Case_Components"
      ]
   },
   "Lenovo Legion Y540-17IRH": {
      "itemTypes": [
         "Batteries"
      ]
   },
   "Lenovo ThinkPad T470": {
      "itemTypes": [
         "Batteries"
      ]
   },
   "Lenovo ThinkPad T480": {
      "itemTypes": [
         "Batteries"
      ]
   },
   "Lenovo ThinkPad X1 Carbon (2nd Gen)": {
      "itemTypes": [
         "Batteries"
      ]
   },
   "Lenovo ThinkPad X380 Yoga": {
      "itemTypes": [
         "Batteries"
      ]
   },
   "Lenovo Yoga 720": {
      "itemTypes": [
         "Batteries"
      ]
   },
   "Lenovo Yoga 910-13IKB": {
      "itemTypes": [
         "Motherboards"
      ]
   },
   "Logitech UE MegaBoom": {
      "root": true
   },
   "Mac Mini": {
      "itemTypes": [
         "Case_Components",
         "Logic_Boards",
         "Power_Supplies",
         "Motherboards"
      ]
   },
   "Mac Mini Unibody": {
      "itemTypes": [
         "Hard_Drives_(SATA)",
         "Logic_Boards",
         "Power_Supplies",
         "SSD_Upgrade_Kits",
         "Motherboards",
         "Hard_Drives"
      ]
   },
   "MacBook Air": {
      "itemTypes": [
         "Hard_Drives",
         "Logic_Boards",
         "SSD_Enclosures",
         "Motherboards"
      ]
   },
   "MacBook Air 11\"": {
      "itemTypes": [
         "Logic_Boards",
         "Motherboards"
      ]
   },
   "MacBook Air 13\"": {
      "itemTypes": [
         "Hard_Drives",
         "Logic_Boards",
         "SSD_Enclosures",
         "Motherboards"
      ]
   },
   "MacBook Air 13\" Early 2015": {
      "itemTypes": [
         "SSD_Enclosures"
      ]
   },
   "MacBook Air 13\" Early 2017": {
      "itemTypes": [
         "SSD_Enclosures"
      ]
   },
   "MacBook Air 13\" Retina Display 2020": {
      "itemTypes": [
         "Logic_Boards",
         "Screens",
         "Motherboards"
      ]
   },
   "MacBook Air 13” Retina Display Late 2018": {
      "itemTypes": [
         "Logic_Boards",
         "Motherboards"
      ]
   },
   "MacBook Pro": {
      "itemTypes": [
         "Case_Components",
         "Hard_Drives",
         "Heat_Sinks",
         "Logic_Boards",
         "Rubber_Feet",
         "SSD_Enclosures",
         "SSD_Upgrade_Kits",
         "Motherboards"
      ]
   },
   "MacBook Pro 13\" Retina Display": {
      "itemTypes": [
         "Logic_Boards",
         "Motherboards"
      ]
   },
   "MacBook Pro 13\" Retina Display Early 2015": {
      "itemTypes": [
         "Logic_Boards",
         "SSD_Enclosures",
         "Motherboards"
      ]
   },
   "MacBook Pro 13\" Retina Display Late 2013": {
      "itemTypes": [
         "Logic_Boards",
         "Motherboards"
      ]
   },
   "MacBook Pro 13\" Retina Display Mid 2014": {
      "itemTypes": [
         "Logic_Boards",
         "Motherboards"
      ]
   },
   "MacBook Pro 13\" Touch Bar 2017": {
      "itemTypes": [
         "Logic_Boards",
         "Motherboards"
      ]
   },
   "MacBook Pro 13\" Touch Bar Late 2016": {
      "itemTypes": [
         "Logic_Boards",
         "Motherboards"
      ]
   },
   "MacBook Pro 15\" Retina Display Mid 2014": {
      "itemTypes": [
         "Screens"
      ]
   },
   "MacBook Pro 15\" Touch Bar 2017": {
      "itemTypes": [
         "Logic_Boards",
         "Motherboards"
      ]
   },
   "MacBook Pro 15\" Touch Bar 2018": {
      "itemTypes": [
         "Logic_Boards",
         "Motherboards"
      ]
   },
   "MacBook Pro 15\" Touch Bar 2019": {
      "itemTypes": [
         "Logic_Boards",
         "Motherboards"
      ]
   },
   "MacBook Pro 15\" Touch Bar Late 2016": {
      "itemTypes": [
         "Logic_Boards",
         "Motherboards"
      ]
   },
   "MacBook Pro 16\" 2019": {
      "itemTypes": [
         "Logic_Boards",
         "Motherboards"
      ]
   },
   "MacBook Unibody Model A1278": {
      "itemTypes": [
         "SSD_Upgrade_Kits",
         "Hard_Drives"
      ]
   },
   "Microsoft Surface Laptop": {
      "itemTypes": [
         "Batteries"
      ]
   },
   "Microsoft Surface Pro 6": {
      "itemTypes": [
         "Screens"
      ]
   },
   "Motorola Moto G Play (2021)": {
      "itemTypes": [
         "Batteries"
      ]
   },
   "Motorola Moto G Power (2021)": {
      "itemTypes": [
         "Batteries"
      ]
   },
   "Motorola Moto G Stylus (2020)": {
      "itemTypes": [
         "Screens"
      ]
   },
   "OnePlus 7 Pro": {
      "itemTypes": [
         "Batteries"
      ]
   },
   "OnePlus Phone": {
      "itemTypes": [
         "Motherboards"
      ]
   },
   "PC Laptop": {
      "itemTypes": [
         "Case_Components"
      ]
   },
   "PlayStation 3": {
      "itemTypes": [
         "Thermal_Pads"
      ]
   },
   "PlayStation 3 Super Slim": {
      "itemTypes": [
         "Motherboards"
      ]
   },
   "PlayStation 4": {
      "itemTypes": [
         "Screws"
      ]
   },
   "PlayStation 4 Pro": {
      "itemTypes": [
         "Screws"
      ]
   },
   "PlayStation 5": {
      "itemTypes": [
         "Motherboards",
         "Optical_Drives"
      ]
   },
   "Retina MacBook 2015": {
      "itemTypes": [
         "Keyboards"
      ]
   },
   "Samsung Galaxy S21 Ultra": {
      "itemTypes": [
         "Batteries"
      ]
   },
   "Samsung Galaxy S7 Edge": {
      "itemTypes": [
         "Motherboards"
      ]
   },
   "Samsung Gear Fit2": {
      "itemTypes": [
         "Batteries"
      ]
   },
   "Steam Deck": {
      "itemTypes": [
         "Fans",
         "Power_Supplies"
      ]
   },
   "ThinkPad X1 Carbon (3rd Gen)": {
      "itemTypes": [
         "Batteries"
      ]
   },
   "ThinkPad X1 Carbon (5th Gen)": {
      "itemTypes": [
         "Batteries"
      ]
   },
   "Valve Index": {
      "itemTypes": [
         "Cables"
      ]
   },
   "Xbox One": {
      "itemTypes": [
         "Screws"
      ]
   },
   "Xbox One S": {
      "itemTypes": [
         "Motherboards"
      ]
   },
   "Xbox One X": {
      "itemTypes": [
         "Motherboards"
      ]
   },
   "Xbox Series S": {
      "itemTypes": [
         "Power_Supplies"
      ]
   },
   "Xbox Series X": {
      "itemTypes": [
         "Case_Components"
      ]
   }
};
