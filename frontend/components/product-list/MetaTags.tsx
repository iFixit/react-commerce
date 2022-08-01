import { PRODUCT_LIST_PAGE_PARAM } from '@config/constants';
import {
   getProductListTitle,
   encodeDeviceItemType,
   encodeDeviceTitle,
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
   // Use the original device item type on the server.
   const algoliaDeviceItemType = useDevicePartsItemType(productList);
   const itemType =
      typeof window === 'undefined' && productList.deviceItemType
         ? encodeDeviceItemType(productList.deviceItemType)
         : encodeDeviceItemType(algoliaDeviceItemType ?? '');
   let title = getProductListTitle(productList, itemType);
   if (!isFiltered && page > 1) {
      title += ` - Page ${page}`;
   }
   title += ' | iFixit';
   const itemTypeHandle = itemType ? `/${itemType}` : '';
   const canonicalUrl = `${appContext.ifixitOrigin}${
      productList.path
   }${itemTypeHandle}${page > 1 ? `?${PRODUCT_LIST_PAGE_PARAM}=${page}` : ''}`;
   const imageUrl = productList.image?.url;
   const productListExemptions =
      noIndexExemptions[encodeDeviceTitle(productList.deviceTitle ?? '')];
   const isNoIndexExempt = itemType
      ? productListExemptions?.itemTypes?.includes(
           encodeDeviceItemType(itemType)
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
   'Amazon_Kindle_Oasis_(1st_Gen)': {
      itemTypes: ['Screens'],
   },
   Apple_Smartwatch: {
      itemTypes: ['Buttons'],
   },
   Asus_Laptop: {
      itemTypes: ['SD_Card_Slots'],
   },
   Dell_Latitude_E5270: {
      itemTypes: ['Batteries'],
   },
   Dell_Latitude_E5570: {
      itemTypes: ['Batteries'],
   },
   DJI_Spark: {
      itemTypes: ['Batteries', 'Motherboards'],
   },
   Dyson_DC34: {
      itemTypes: ['Batteries'],
   },
   Dyson_DC35: {
      itemTypes: ['Batteries'],
   },
   Dyson_DC59: {
      itemTypes: ['Batteries'],
   },
   Fitbit_Charge_5: {
      itemTypes: ['Screens'],
   },
   Fitbit_Sense: {
      itemTypes: ['Screens'],
   },
   Fitbit_Smartwatch: {
      itemTypes: ['Batteries'],
   },
   Fitbit_Versa_3: {
      itemTypes: ['Screens'],
   },
   Garmin_Edge_Explore_820: {
      itemTypes: ['Batteries'],
   },
   Google_Phone: {
      itemTypes: ['Buttons', 'Microphones', 'SIM'],
   },
   Google_Pixel_3a: {
      itemTypes: ['Buttons'],
   },
   Google_Pixel_5a: {
      itemTypes: ['Screens'],
   },
   Google_Pixel_6: {
      itemTypes: ['Screens'],
   },
   HP_EliteBook_745_G5: {
      itemTypes: ['Batteries'],
   },
   HP_EliteBook_830_G5: {
      itemTypes: ['Batteries'],
   },
   HP_EliteBook_840_G5: {
      itemTypes: ['Batteries'],
   },
   HP_EliteBook_850_G1: {
      itemTypes: ['Batteries'],
   },
   HP_EliteBook_850_G6: {
      itemTypes: ['Batteries'],
   },
   HP_Laptop: {
      itemTypes: ['Case_Components'],
   },
   HP_ZBook_15U_G5: {
      itemTypes: ['Batteries'],
   },
   HTC_U11_Life: {
      itemTypes: ['Batteries'],
   },
   iMac: {
      itemTypes: [
         'Graphics_Cards',
         'Logic_Boards',
         'Power_Supplies',
         'SSD_Upgrade_Kits',
         'Motherboards',
         'Hard_Drives',
      ],
   },
   'iMac_Intel_21.5"_EMC_2805': {
      itemTypes: ['SSD_Upgrade_Kits', 'Hard_Drives'],
   },
   'iMac_Intel_24"': {
      itemTypes: ['Power_Supplies'],
   },
   'iMac_Intel_27"': {
      itemTypes: ['Logic_Boards', 'Motherboards'],
   },
   iPad: {
      itemTypes: ['Logic_Boards', 'Motherboards'],
   },
   iPad_Air: {
      itemTypes: ['Batteries', 'Logic_Boards', 'Motherboards'],
   },
   iPad_Air_2: {
      itemTypes: ['Logic_Boards', 'Motherboards'],
   },
   iPad_Air_3: {
      itemTypes: ['Batteries', 'Screens'],
   },
   iPad_Air_4: {
      itemTypes: ['Batteries', 'Screens'],
   },
   iPad_Mini_5: {
      itemTypes: ['Screens'],
   },
   iPad_Pro: {
      itemTypes: [
         'Lightning_Connector',
         'Logic_Boards',
         'Cables',
         'Motherboards',
      ],
   },
   'iPad_Pro_10.5"': {
      itemTypes: ['Batteries'],
   },
   'iPad_Pro_12.9"': {
      itemTypes: [
         'Batteries',
         'Lightning_Connector',
         'Logic_Boards',
         'Screens',
         'Cables',
         'Motherboards',
      ],
   },
   'iPad_Pro_12.9"_4th_Gen': {
      itemTypes: ['Screens'],
   },
   'iPad_Pro_9.7"': {
      itemTypes: ['Batteries'],
   },
   iPhone: {
      itemTypes: ['Logic_Boards', 'Motherboards'],
   },
   iPhone_11: {
      itemTypes: [
         'Adhesive_Strips',
         'Buttons',
         'Lightning_Connector',
         'Adhesives',
         'Cables',
      ],
   },
   iPhone_11_Pro: {
      itemTypes: ['Antennas'],
   },
   iPhone_11_Pro_Max: {
      itemTypes: ['Antennas'],
   },
   iPhone_12_Pro_Max: {
      itemTypes: ['Batteries', 'Lightning_Connector', 'Cables'],
   },
   iPhone_6: {
      itemTypes: ['Microphones'],
   },
   iPhone_6s: {
      itemTypes: ['Logic_Boards', 'Motherboards'],
   },
   iPhone_7: {
      itemTypes: ['Batteries', 'Logic_Boards', 'Motherboards'],
   },
   iPhone_7_Plus: {
      itemTypes: ['Logic_Boards', 'Motherboards'],
   },
   iPhone_SE: {
      itemTypes: ['Batteries'],
   },
   iPhone_X: {
      itemTypes: ['Lightning_Connector', 'Cables'],
   },
   iPhone_XR: {
      itemTypes: ['Antennas'],
   },
   iPhone_XS: {
      itemTypes: [
         'Lightning_Connector',
         'Logic_Boards',
         'Cables',
         'Motherboards',
      ],
   },
   iPhone_XS_Max: {
      itemTypes: [
         'Lightning_Connector',
         'Logic_Boards',
         'Microphones',
         'Cables',
         'Motherboards',
      ],
   },
   JBL_XTREME: {
      itemTypes: ['Batteries'],
   },
   Lenovo_Laptop: {
      itemTypes: ['Case_Components'],
   },
   'Lenovo_Legion_Y540-17IRH': {
      itemTypes: ['Batteries'],
   },
   Lenovo_ThinkPad_T470: {
      itemTypes: ['Batteries'],
   },
   Lenovo_ThinkPad_T480: {
      itemTypes: ['Batteries'],
   },
   'Lenovo_ThinkPad_X1_Carbon_(2nd_Gen)': {
      itemTypes: ['Batteries'],
   },
   Lenovo_ThinkPad_X380_Yoga: {
      itemTypes: ['Batteries'],
   },
   Lenovo_Yoga_720: {
      itemTypes: ['Batteries'],
   },
   'Lenovo_Yoga_910-13IKB': {
      itemTypes: ['Motherboards'],
   },
   Logitech_UE_MegaBoom: {
      root: true,
   },
   Mac_Mini: {
      itemTypes: [
         'Case_Components',
         'Logic_Boards',
         'Power_Supplies',
         'Motherboards',
      ],
   },
   Mac_Mini_Unibody: {
      itemTypes: [
         'Hard_Drives_(SATA)',
         'Logic_Boards',
         'Power_Supplies',
         'SSD_Upgrade_Kits',
         'Motherboards',
         'Hard_Drives',
      ],
   },
   MacBook_Air: {
      itemTypes: [
         'Hard_Drives',
         'Logic_Boards',
         'SSD_Enclosures',
         'Motherboards',
      ],
   },
   'MacBook_Air_11"': {
      itemTypes: ['Logic_Boards', 'Motherboards'],
   },
   'MacBook_Air_13"': {
      itemTypes: [
         'Hard_Drives',
         'Logic_Boards',
         'SSD_Enclosures',
         'Motherboards',
      ],
   },
   'MacBook_Air_13"_Early_2015': {
      itemTypes: ['SSD_Enclosures'],
   },
   'MacBook_Air_13"_Early_2017': {
      itemTypes: ['SSD_Enclosures'],
   },
   'MacBook_Air_13"_Retina_Display_2020': {
      itemTypes: ['Logic_Boards', 'Screens', 'Motherboards'],
   },
   'MacBook_Air_13”_Retina_Display_Late_2018': {
      itemTypes: ['Logic_Boards', 'Motherboards'],
   },
   MacBook_Pro: {
      itemTypes: [
         'Case_Components',
         'Hard_Drives',
         'Heat_Sinks',
         'Logic_Boards',
         'Rubber_Feet',
         'SSD_Enclosures',
         'SSD_Upgrade_Kits',
         'Motherboards',
      ],
   },
   'MacBook_Pro_13"_Retina_Display': {
      itemTypes: ['Logic_Boards', 'Motherboards'],
   },
   'MacBook_Pro_13"_Retina_Display_Early_2015': {
      itemTypes: ['Logic_Boards', 'SSD_Enclosures', 'Motherboards'],
   },
   'MacBook_Pro_13"_Retina_Display_Late_2013': {
      itemTypes: ['Logic_Boards', 'Motherboards'],
   },
   'MacBook_Pro_13"_Retina_Display_Mid_2014': {
      itemTypes: ['Logic_Boards', 'Motherboards'],
   },
   'MacBook_Pro_13"_Touch_Bar_2017': {
      itemTypes: ['Logic_Boards', 'Motherboards'],
   },
   'MacBook_Pro_13"_Touch_Bar_Late_2016': {
      itemTypes: ['Logic_Boards', 'Motherboards'],
   },
   'MacBook_Pro_15"_Retina_Display_Mid_2014': {
      itemTypes: ['Screens'],
   },
   'MacBook_Pro_15"_Touch_Bar_2017': {
      itemTypes: ['Logic_Boards', 'Motherboards'],
   },
   'MacBook_Pro_15"_Touch_Bar_2018': {
      itemTypes: ['Logic_Boards', 'Motherboards'],
   },
   'MacBook_Pro_15"_Touch_Bar_2019': {
      itemTypes: ['Logic_Boards', 'Motherboards'],
   },
   'MacBook_Pro_15"_Touch_Bar_Late_2016': {
      itemTypes: ['Logic_Boards', 'Motherboards'],
   },
   'MacBook_Pro_16"_2019': {
      itemTypes: ['Logic_Boards', 'Motherboards'],
   },
   MacBook_Unibody_Model_A1278: {
      itemTypes: ['SSD_Upgrade_Kits', 'Hard_Drives'],
   },
   Microsoft_Surface_Laptop: {
      itemTypes: ['Batteries'],
   },
   Microsoft_Surface_Pro_6: {
      itemTypes: ['Screens'],
   },
   'Motorola_Moto_G_Play_(2021)': {
      itemTypes: ['Batteries'],
   },
   'Motorola_Moto_G_Power_(2021)': {
      itemTypes: ['Batteries'],
   },
   'Motorola_Moto_G_Stylus_(2020)': {
      itemTypes: ['Screens'],
   },
   OnePlus_7_Pro: {
      itemTypes: ['Batteries'],
   },
   OnePlus_Phone: {
      itemTypes: ['Motherboards'],
   },
   PC_Laptop: {
      itemTypes: ['Case_Components'],
   },
   PlayStation_3: {
      itemTypes: ['Thermal_Pads'],
   },
   PlayStation_3_Super_Slim: {
      itemTypes: ['Motherboards'],
   },
   PlayStation_4: {
      itemTypes: ['Screws'],
   },
   PlayStation_4_Pro: {
      itemTypes: ['Screws'],
   },
   PlayStation_5: {
      itemTypes: ['Motherboards', 'Optical_Drives'],
   },
   Retina_MacBook_2015: {
      itemTypes: ['Keyboards'],
   },
   Samsung_Galaxy_S21_Ultra: {
      itemTypes: ['Batteries'],
   },
   Samsung_Galaxy_S7_Edge: {
      itemTypes: ['Motherboards'],
   },
   Samsung_Gear_Fit2: {
      itemTypes: ['Batteries'],
   },
   Steam_Deck: {
      itemTypes: ['Fans', 'Power_Supplies'],
   },
   'ThinkPad_X1_Carbon_(3rd_Gen)': {
      itemTypes: ['Batteries'],
   },
   'ThinkPad_X1_Carbon_(5th_Gen)': {
      itemTypes: ['Batteries'],
   },
   Valve_Index: {
      itemTypes: ['Cables'],
   },
   Xbox_One: {
      itemTypes: ['Screws'],
   },
   Xbox_One_S: {
      itemTypes: ['Motherboards'],
   },
   Xbox_One_X: {
      itemTypes: ['Motherboards'],
   },
   Xbox_Series_S: {
      itemTypes: ['Power_Supplies'],
   },
   Xbox_Series_X: {
      itemTypes: ['Case_Components'],
   },
};
