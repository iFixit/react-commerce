import { PRODUCT_LIST_PAGE_PARAM } from '@config/constants';
import { ensureIFixitSuffix } from '@helpers/metadata-helpers';
import { productListPath } from '@helpers/path-helpers';
import { useAppContext } from '@ifixit/app';
import type { ProductList } from '@models/product-list';
import { noIndexExemptions, useHreflangs } from '@seo/product-list';
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
   const itemType = useDevicePartsItemType(productList) ?? null;
   const canonicalUrl = useCanonicalUrl(productList, itemType);
   const hreflangs = useHreflangs(productList, itemType);
   const shouldNoIndex = useShouldNoIndex(productList, itemType);
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
         {hreflangs &&
            Object.entries(hreflangs).map(([lang, url]) => (
               <link
                  rel="alternate"
                  key={`hreflang-${lang}`}
                  hrefLang={lang}
                  href={url}
               />
            ))}
         <script {...structuredData} />
      </Head>
   );
}

function useMetaTitle(productList: ProductList): string {
   const pagination = usePagination();

   const page = pagination.currentRefinement + 1;

   const isFiltered = useIsFilteredProductList();

   let metaTitle = productList.metaTitle ?? productList.title;

   metaTitle = ensureIFixitSuffix(metaTitle);

   if (metaTitle && !isFiltered && page > 1) {
      metaTitle += ` - Page ${page}`;
   }
   return metaTitle;
}

function useIsFilteredProductList(): boolean {
   const ignoredFilters = ['facet_tags.Item Type', 'worksin'];

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

export function useVariant(): string | undefined {
   const variantRefinements = useFilters()['worksin'];
   const variant = variantRefinements
      ? variantRefinements[0]?.toString()
      : undefined;
   return variant;
}

function useCanonicalUrl(
   productList: ProductList,
   itemType: string | null
): string {
   const appContext = useAppContext();
   const pagination = usePagination();
   const variant = useVariant();
   const page = pagination.currentRefinement + 1;

   return `${appContext.ifixitOrigin}${productListPath({
      productList,
      itemType: itemType ?? undefined,
      variant: productList.indexVariantsInsteadOfDevice ? variant : undefined,
   })}${page > 1 ? `?${PRODUCT_LIST_PAGE_PARAM}=${page}` : ''}`;
}

function useShouldNoIndex(
   productList: ProductList,
   itemType: string | null
): boolean {
   const pagination = usePagination();
   const isFiltered = useIsFilteredProductList();

   const productListExemptions =
      noIndexExemptions[productList.deviceTitle ?? ''];

   const isNoIndexExempt = itemType
      ? productListExemptions?.itemTypes?.includes(itemType)
      : productListExemptions?.root;

   const hasResults = pagination.nbHits >= (isNoIndexExempt ? 1 : 2);
   const variant = useVariant();
   const isMissingVariant = !variant;
   const indexVariantsInsteadOfDevice =
      productList.indexVariantsInsteadOfDevice && isMissingVariant;

   return (
      isFiltered ||
      !hasResults ||
      productList.forceNoindex ||
      indexVariantsInsteadOfDevice ||
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
