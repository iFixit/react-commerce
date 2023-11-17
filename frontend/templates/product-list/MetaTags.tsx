import { PRODUCT_LIST_PAGE_PARAM } from '@config/constants';
import { metaTitleWithSuffix } from '@helpers/metadata-helpers';
import { productListPath } from '@helpers/path-helpers';
import { stylizeDeviceItemType } from '@helpers/product-list-helpers';
import { useAppContext } from '@ifixit/app';
import type { ProductList } from '@models/product-list';
import Head from 'next/head';
import { useCurrentRefinements, usePagination } from 'react-instantsearch';
import { jsonLdScriptProps } from 'react-schemaorg';
import { BreadcrumbList as SchemaBreadcrumbList } from 'schema-dts';
import { useDevicePartsItemType } from './hooks/useDevicePartsItemType';
import { useProductListBreadcrumbs } from './hooks/useProductListBreadcrumbs';

export interface MetaTagsProps {
   productList: ProductList;
}

export function MetaTags({ productList }: MetaTagsProps) {
   const metaTitle = useMetaTitle(productList);
   const metaDescription =
      productList.metaDescription ?? productList.description;
   const canonicalUrl = useCanonicalUrl(productList);
   const shouldNoIndex = useShouldNoIndex(productList);
   const structuredData = useStructuredData(productList);

   return (
      <Head>
         {shouldNoIndex ? (
            <meta name="robots" content="noindex,nofollow" />
         ) : (
            <>
               <link rel="canonical" href={canonicalUrl} />
               {metaDescription && (
                  <meta name="description" content={metaDescription} />
               )}
            </>
         )}
         <title>{metaTitle}</title>
         <meta property="og:title" content={metaTitle} />
         {metaDescription && (
            <meta name="og:description" content={metaDescription} />
         )}
         <meta property="og:type" content="website" />
         <meta property="og:url" content={canonicalUrl} />
         {productList.heroImage?.url && (
            <meta property="og:image" content={productList.heroImage.url} />
         )}
         <script {...structuredData} />
      </Head>
   );
}

function useMetaTitle(productList: ProductList): string {
   const pagination = usePagination();

   const page = pagination.currentRefinement + 1;

   const isFiltered = useIsFilteredProductList();

   let metaTitle = productList.metaTitle ?? productList.title;

   metaTitle = metaTitleWithSuffix(metaTitle);

   if (metaTitle && !isFiltered && page > 1) {
      metaTitle += ` - Page ${page}`;
   }
   return metaTitle;
}

function useIsFilteredProductList(): boolean {
   const ignoredFilters = ['facet_tags.Item Type'];

   const filters = useFilters();
   const isFiltered = Object.keys(filters).some(
      (filter) => !ignoredFilters.includes(filter) && filters[filter].length > 0
   );
   return isFiltered;
}

function useFilters() {
   const currentRefinements = useCurrentRefinements();
   const filtersAndValues = currentRefinements.items.reduce((record, item) => {
      record[item.attribute] = item.refinements.map(
         (refinement) => refinement.value
      );
      return record;
   }, {} as Record<string, (string | number)[]>);

   return filtersAndValues;
}

function useCanonicalUrl(productList: ProductList): string {
   const appContext = useAppContext();
   const pagination = usePagination();

   const page = pagination.currentRefinement + 1;

   const itemType = useDevicePartsItemType(productList);

   const itemTypeHandle = itemType
      ? `/${encodeURIComponent(stylizeDeviceItemType(itemType))}`
      : '';

   return `${appContext.ifixitOrigin}${productListPath(
      productList
   )}${itemTypeHandle}${page > 1 ? `?${PRODUCT_LIST_PAGE_PARAM}=${page}` : ''}`;
}

function useShouldNoIndex(productList: ProductList): boolean {
   const pagination = usePagination();
   const isFiltered = useIsFilteredProductList();
   const itemType = useDevicePartsItemType(productList);

   const productListExemptions =
      noIndexExemptions[productList.deviceTitle ?? ''];

   const isNoIndexExempt = itemType
      ? productListExemptions?.itemTypes?.includes(itemType)
      : productListExemptions?.root;

   const hasResults = pagination.nbHits >= (isNoIndexExempt ? 1 : 2);

   return (
      isFiltered ||
      !hasResults ||
      productList.forceNoindex ||
      !productList.isOnStrapi
   );
}

function useStructuredData(productList: ProductList) {
   const appContext = useAppContext();
   const breadcrumbs = useProductListBreadcrumbs(productList);
   return jsonLdScriptProps<SchemaBreadcrumbList>({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((item, index) => ({
         '@type': 'ListItem',
         position: index + 1,
         name: item.label,
         item: item.url ? `${appContext.ifixitOrigin}${item.url}` : undefined,
      })),
   });
}

type NoIndexExemptionsType = {
   [handle: string]: {
      root?: boolean;
      itemTypes?: string[];
   };
};

const noIndexExemptions: NoIndexExemptionsType = {
   'Amazon Kindle Oasis (1st Gen)': {
      itemTypes: ['Screens'],
   },
   'Apple Smartwatch': {
      itemTypes: ['Buttons'],
   },
   'Asus Laptop': {
      itemTypes: ['SD Card Slots'],
   },
   'Dell Latitude E5270': {
      itemTypes: ['Batteries'],
   },
   'Dell Latitude E5570': {
      itemTypes: ['Batteries'],
   },
   'DJI Spark': {
      itemTypes: ['Batteries', 'Motherboards'],
   },
   'Dyson DC34': {
      itemTypes: ['Batteries'],
   },
   'Dyson DC35': {
      itemTypes: ['Batteries'],
   },
   'Dyson DC59': {
      itemTypes: ['Batteries'],
   },
   'Fitbit Charge 5': {
      itemTypes: ['Screens'],
   },
   'Fitbit Sense': {
      itemTypes: ['Screens'],
   },
   'Fitbit Smartwatch': {
      itemTypes: ['Batteries'],
   },
   'Fitbit Versa 3': {
      itemTypes: ['Screens'],
   },
   'Garmin Edge Explore 820': {
      itemTypes: ['Batteries'],
   },
   'Google Phone': {
      itemTypes: ['Buttons', 'Microphones', 'SIM'],
   },
   'Google Pixel 3a': {
      itemTypes: ['Buttons'],
   },
   'Google Pixel 5a': {
      itemTypes: ['Screens'],
   },
   'Google Pixel 6': {
      itemTypes: ['Screens'],
   },
   'HP EliteBook 745 G5': {
      itemTypes: ['Batteries'],
   },
   'HP EliteBook 830 G5': {
      itemTypes: ['Batteries'],
   },
   'HP EliteBook 840 G5': {
      itemTypes: ['Batteries'],
   },
   'HP EliteBook 850 G1': {
      itemTypes: ['Batteries'],
   },
   'HP EliteBook 850 G6': {
      itemTypes: ['Batteries'],
   },
   'HP Laptop': {
      itemTypes: ['Case Components'],
   },
   'HP ZBook 15U G5': {
      itemTypes: ['Batteries'],
   },
   'HTC U11 Life': {
      itemTypes: ['Batteries'],
   },
   iMac: {
      itemTypes: [
         'Graphics Cards',
         'Logic Boards',
         'Power Supplies',
         'SSD Upgrade Kits',
         'Motherboards',
         'Hard Drives',
      ],
   },
   'iMac Intel 21.5" EMC 2805': {
      itemTypes: ['SSD Upgrade Kits', 'Hard Drives'],
   },
   'iMac Intel 24"': {
      itemTypes: ['Power Supplies'],
   },
   'iMac Intel 27"': {
      itemTypes: ['Logic Boards', 'Motherboards'],
   },
   iPad: {
      itemTypes: ['Logic Boards', 'Motherboards'],
   },
   'iPad Air': {
      itemTypes: ['Batteries', 'Logic Boards', 'Motherboards'],
   },
   'iPad Air 2': {
      itemTypes: ['Logic Boards', 'Motherboards'],
   },
   'iPad Air 3': {
      itemTypes: ['Batteries', 'Screens'],
   },
   'iPad Air 4': {
      itemTypes: ['Batteries', 'Screens'],
   },
   'iPad Mini 5': {
      itemTypes: ['Screens'],
   },
   'iPad Pro': {
      itemTypes: [
         'Lightning Connector',
         'Logic Boards',
         'Cables',
         'Motherboards',
      ],
   },
   'iPad Pro 10.5"': {
      itemTypes: ['Batteries'],
   },
   'iPad Pro 12.9"': {
      itemTypes: [
         'Batteries',
         'Lightning Connector',
         'Logic Boards',
         'Screens',
         'Cables',
         'Motherboards',
      ],
   },
   'iPad Pro 12.9" 4th Gen': {
      itemTypes: ['Screens'],
   },
   'iPad Pro 9.7"': {
      itemTypes: ['Batteries'],
   },
   iPhone: {
      itemTypes: ['Logic Boards', 'Motherboards'],
   },
   'iPhone 11': {
      itemTypes: [
         'Adhesive Strips',
         'Buttons',
         'Lightning Connector',
         'Adhesives',
         'Cables',
      ],
   },
   'iPhone 11 Pro': {
      itemTypes: ['Antennas'],
   },
   'iPhone 11 Pro Max': {
      itemTypes: ['Antennas'],
   },
   'iPhone 12 Pro Max': {
      itemTypes: ['Batteries', 'Lightning Connector', 'Cables'],
   },
   'iPhone 6': {
      itemTypes: ['Microphones'],
   },
   'iPhone 6s': {
      itemTypes: ['Logic Boards', 'Motherboards'],
   },
   'iPhone 7': {
      itemTypes: ['Batteries', 'Logic Boards', 'Motherboards'],
   },
   'iPhone 7 Plus': {
      itemTypes: ['Logic Boards', 'Motherboards'],
   },
   'iPhone SE': {
      itemTypes: ['Batteries'],
   },
   'iPhone X': {
      itemTypes: ['Lightning Connector', 'Cables'],
   },
   'iPhone XR': {
      itemTypes: ['Antennas'],
   },
   'iPhone XS': {
      itemTypes: [
         'Lightning Connector',
         'Logic Boards',
         'Cables',
         'Motherboards',
      ],
   },
   'iPhone XS Max': {
      itemTypes: [
         'Lightning Connector',
         'Logic Boards',
         'Microphones',
         'Cables',
         'Motherboards',
      ],
   },
   'JBL XTREME': {
      itemTypes: ['Batteries'],
   },
   'Lenovo Laptop': {
      itemTypes: ['Case Components'],
   },
   'Lenovo Legion Y540-17IRH': {
      itemTypes: ['Batteries'],
   },
   'Lenovo ThinkPad T470': {
      itemTypes: ['Batteries'],
   },
   'Lenovo ThinkPad T480': {
      itemTypes: ['Batteries'],
   },
   'Lenovo ThinkPad X1 Carbon (2nd Gen)': {
      itemTypes: ['Batteries'],
   },
   'Lenovo ThinkPad X380 Yoga': {
      itemTypes: ['Batteries'],
   },
   'Lenovo Yoga 720': {
      itemTypes: ['Batteries'],
   },
   'Lenovo Yoga 910-13IKB': {
      itemTypes: ['Motherboards'],
   },
   'Logitech UE MegaBoom': {
      root: true,
   },
   'Mac Mini': {
      itemTypes: [
         'Case Components',
         'Logic Boards',
         'Power Supplies',
         'Motherboards',
      ],
   },
   'Mac Mini Unibody': {
      itemTypes: [
         'Hard Drives (SATA)',
         'Logic Boards',
         'Power Supplies',
         'SSD Upgrade Kits',
         'Motherboards',
         'Hard Drives',
      ],
   },
   'MacBook Air': {
      itemTypes: [
         'Hard Drives',
         'Logic Boards',
         'SSD Enclosures',
         'Motherboards',
      ],
   },
   'MacBook Air 11"': {
      itemTypes: ['Logic Boards', 'Motherboards'],
   },
   'MacBook Air 13"': {
      itemTypes: [
         'Hard Drives',
         'Logic Boards',
         'SSD Enclosures',
         'Motherboards',
      ],
   },
   'MacBook Air 13" Early 2015': {
      itemTypes: ['SSD Enclosures'],
   },
   'MacBook Air 13" Early 2017': {
      itemTypes: ['SSD Enclosures'],
   },
   'MacBook Air 13" Retina Display 2020': {
      itemTypes: ['Logic Boards', 'Screens', 'Motherboards'],
   },
   'MacBook Air 13” Retina Display Late 2018': {
      itemTypes: ['Logic Boards', 'Motherboards'],
   },
   'MacBook Pro': {
      itemTypes: [
         'Case Components',
         'Hard Drives',
         'Heat Sinks',
         'Logic Boards',
         'Rubber Feet',
         'SSD Enclosures',
         'SSD Upgrade Kits',
         'Motherboards',
      ],
   },
   'MacBook Pro 13" Retina Display': {
      itemTypes: ['Logic Boards', 'Motherboards'],
   },
   'MacBook Pro 13" Retina Display Early 2015': {
      itemTypes: ['Logic Boards', 'SSD Enclosures', 'Motherboards'],
   },
   'MacBook Pro 13" Retina Display Late 2013': {
      itemTypes: ['Logic Boards', 'Motherboards'],
   },
   'MacBook Pro 13" Retina Display Mid 2014': {
      itemTypes: ['Logic Boards', 'Motherboards'],
   },
   'MacBook Pro 13" Touch Bar 2017': {
      itemTypes: ['Logic Boards', 'Motherboards'],
   },
   'MacBook Pro 13" Touch Bar Late 2016': {
      itemTypes: ['Logic Boards', 'Motherboards'],
   },
   'MacBook Pro 15" Retina Display Mid 2014': {
      itemTypes: ['Screens'],
   },
   'MacBook Pro 15" Touch Bar 2017': {
      itemTypes: ['Logic Boards', 'Motherboards'],
   },
   'MacBook Pro 15" Touch Bar 2018': {
      itemTypes: ['Logic Boards', 'Motherboards'],
   },
   'MacBook Pro 15" Touch Bar 2019': {
      itemTypes: ['Logic Boards', 'Motherboards'],
   },
   'MacBook Pro 15" Touch Bar Late 2016': {
      itemTypes: ['Logic Boards', 'Motherboards'],
   },
   'MacBook Pro 16" 2019': {
      itemTypes: ['Logic Boards', 'Motherboards'],
   },
   'MacBook Unibody Model A1278': {
      itemTypes: ['SSD Upgrade Kits', 'Hard Drives'],
   },
   'Microsoft Surface Laptop': {
      itemTypes: ['Batteries'],
   },
   'Microsoft Surface Pro 6': {
      itemTypes: ['Screens'],
   },
   'Motorola Moto G Play (2021)': {
      itemTypes: ['Batteries'],
   },
   'Motorola Moto G Power (2021)': {
      itemTypes: ['Batteries'],
   },
   'Motorola Moto G Stylus (2020)': {
      itemTypes: ['Screens'],
   },
   'OnePlus 7 Pro': {
      itemTypes: ['Batteries'],
   },
   'OnePlus Phone': {
      itemTypes: ['Motherboards'],
   },
   'PC Laptop': {
      itemTypes: ['Case Components'],
   },
   'PlayStation 3': {
      itemTypes: ['Thermal Pads'],
   },
   'PlayStation 3 Super Slim': {
      itemTypes: ['Motherboards'],
   },
   'PlayStation 4': {
      itemTypes: ['Screws'],
   },
   'PlayStation 4 Pro': {
      itemTypes: ['Screws'],
   },
   'PlayStation 5': {
      itemTypes: ['Motherboards', 'Optical Drives'],
   },
   'Retina MacBook 2015': {
      itemTypes: ['Keyboards'],
   },
   'Samsung Galaxy S21 Ultra': {
      itemTypes: ['Batteries'],
   },
   'Samsung Galaxy S7 Edge': {
      itemTypes: ['Motherboards'],
   },
   'Samsung Gear Fit2': {
      itemTypes: ['Batteries'],
   },
   'Steam Deck': {
      itemTypes: ['Fans', 'Power Supplies'],
   },
   'ThinkPad X1 Carbon (3rd Gen)': {
      itemTypes: ['Batteries'],
   },
   'ThinkPad X1 Carbon (5th Gen)': {
      itemTypes: ['Batteries'],
   },
   'Valve Index': {
      itemTypes: ['Cables'],
   },
   'Xbox One': {
      itemTypes: ['Screws'],
   },
   'Xbox One S': {
      itemTypes: ['Motherboards'],
   },
   'Xbox One X': {
      itemTypes: ['Motherboards'],
   },
   'Xbox Series S': {
      itemTypes: ['Power Supplies'],
   },
   'Xbox Series X': {
      itemTypes: ['Case Components'],
   },
};
