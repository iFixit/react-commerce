import { PRODUCT_LIST_PAGE_PARAM } from '@config/constants';
import { metaTitleWithSuffix } from '@helpers/metadata-helpers';
import { productListPath } from '@helpers/path-helpers';
import { stylizeDeviceItemType } from '@helpers/product-list-helpers';
import { useAppContext } from '@ifixit/app';
import type { ProductList } from '@models/product-list';
import { noIndexExemptions } from '@seo/product-list';
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
   const currentRefinements = useCurrentRefinements();

   const refinementAttributes = currentRefinements.items.map(
      (item) => item.attribute
   );
   const isItemTypeFilter =
      refinementAttributes.length === 1 &&
      refinementAttributes[0] === 'facet_tags.Item Type';

   return currentRefinements.items.length > 0 && !isItemTypeFilter;
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
