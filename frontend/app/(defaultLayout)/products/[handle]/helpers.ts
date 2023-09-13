import { DEFAULT_STORE_CODE } from '@config/env';
import { hasDisableCacheGets } from '@helpers/cache-control-helpers';
import { getiFixitOrigin } from '@helpers/path-helpers';
import { invariant } from '@ifixit/helpers';
import { StoreListItem } from '@models/store';
import type { Product } from '@pages/api/nextjs/cache/product';
import {
   getDefaultVariantId,
   getSearchParamVariantId,
} from '@templates/product/hooks/useSelectedVariant';
import { GetServerSidePropsContext } from 'next';
import { headers } from 'next/headers';
import {
   ItemAvailability as SchemaItemAvailability,
   OfferItemCondition as SchemaOfferItemCondition,
} from 'schema-dts';
import { PageProps } from './page';

export function hasDisableCacheGetsWrapper(
   searchParams: Record<string, string>
): boolean {
   return hasDisableCacheGets({
      query: searchParams,
   } as GetServerSidePropsContext);
}

export function identifyStoresWithProduct(
   product: Product,
   stores: StoreListItem[]
) {
   const codeToDomain =
      product.enabledDomains?.reduce((acc, { code, domain }) => {
         acc[code] = domain;
         return acc;
      }, {} as Record<string, string>) ?? {};
   return stores.map((store) => {
      const domain =
         store.code === DEFAULT_STORE_CODE
            ? new URL(store.url).origin
            : codeToDomain[store.code];
      if (domain) {
         return { ...store, url: `${domain}/products/${product.handle}` };
      }
      return store;
   });
}

type CreateMetadataSupportProps = PageProps & {
   product: Product;
};

export function createMetadataSupport({
   params,
   searchParams,
   product,
}: CreateMetadataSupportProps) {
   type Image = typeof product.images[number];

   const { handle } = params;
   const { images, metaTitle, shortDescription } = product;

   const defaultVariantId = getDefaultVariantId(product);
   const searchParamVariantId = getSearchParamVariantId(searchParams.variant);
   let variant = product.variants.find((v) => v.id === searchParamVariantId);
   if (variant == null) {
      variant = product.variants.find((v) => v.id === defaultVariantId);
   }

   invariant(variant, `Something went wrong, variant not found`);

   const variantId = variant.id;

   const canonicalUrl = `/products/${handle}`;

   const filterByVariantId =
      (id: string | null) =>
      ({ variantId }: Image) =>
         variantId === id;
   const genericImages = images.filter(filterByVariantId(null));
   const selectedVariantImages = images.filter(filterByVariantId(variantId));

   const priceValidUntil = new Date();
   priceValidUntil.setFullYear(priceValidUntil.getFullYear() + 1);

   const shouldNoIndex = !product.isEnabled;
   const proOnly = product?.tags.find((tag: string) => tag === 'Pro Only');
   return {
      metaTitle,
      shortDescription,
      canonicalUrl,
      genericImages,
      selectedVariantImages,
      shouldNoIndex,
      proOnly,
   };
}

export function createLdJsonSupport(
   { params, searchParams }: PageProps,
   product: Product
) {
   const { metaTitle, shortDescription, genericImages, selectedVariantImages } =
      createMetadataSupport({ params, searchParams, product });

   const readonlyHeaders = headers();
   const ifixitOrigin = getiFixitOrigin(readonlyHeaders);

   const defaultVariantId = getDefaultVariantId(product);
   const searchParamVariantId = getSearchParamVariantId(searchParams.variant);
   let variant = product.variants.find((v) => v.id === searchParamVariantId);
   if (variant == null) {
      variant = product.variants.find((v) => v.id === defaultVariantId);
   }

   invariant(variant, `Something went wrong, variant not found`);

   const variantId = variant.id;

   const urlParams =
      variantId !== defaultVariantId ? `?variant=${variantId}` : '';
   const selectedVariantUrl = `${ifixitOrigin}/products/${product.handle}${urlParams}`;

   let itemCondition: SchemaOfferItemCondition | undefined;
   const conditionOption = variant.selectedOptions.find(
      (option) => option.name === 'Condition'
   );
   if (conditionOption?.value === 'New') {
      itemCondition = 'https://schema.org/NewCondition';
   } else if (conditionOption?.value === 'Refurbished') {
      itemCondition = 'https://schema.org/RefurbishedCondition';
   } else {
      // Group all the 'Used, A-Stock', 'As-is', etc, possible values under the UsedCondition umbrella
      itemCondition = 'https://schema.org/UsedCondition';
   }

   const availability: SchemaItemAvailability =
      variant.quantityAvailable && variant.quantityAvailable > 0
         ? 'https://schema.org/InStock'
         : 'https://schema.org/OutOfStock';

   const priceValidUntil = new Date();
   priceValidUntil.setFullYear(priceValidUntil.getFullYear() + 1);

   return {
      ifixitOrigin,
      metaTitle,
      shortDescription,
      genericImages,
      selectedVariantImages,
      variant,
      selectedVariantUrl,
      itemCondition,
      availability,
      priceValidUntil,
   };
}
