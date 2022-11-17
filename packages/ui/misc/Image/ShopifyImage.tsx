import React from 'react';
import type { PartialDeep, SetRequired, Simplify } from 'type-fest';
import { HtmlImageProps } from '.';
import type { Image as ImageType } from '../../../../frontend/lib/shopify-storefront-sdk/generated/sdk';
import {
   addImageSizeParametersToUrl,
   getShopifyImageDimensions,
   IMG_SRC_SET_SIZES,
   shopifyImageLoader,
} from './shopifyUtils';

export type ShopifyLoaderOptions = {
   crop?: 'top' | 'bottom' | 'left' | 'right' | 'center';
   scale?: 2 | 3;
   width?: HtmlImageProps['width'] | ImageType['width'];
   height?: HtmlImageProps['height'] | ImageType['height'];
};
export type ShopifyLoaderParams = Simplify<
   ShopifyLoaderOptions & {
      src: ImageType['url'];
   }
>;
export type ShopifyImageProps = Omit<HtmlImageProps, 'src'> & {
   /** An object with fields that correspond to the Storefront API's
    * [Image object](https://shopify.dev/api/storefront/reference/common-objects/image).
    * The `data` prop is required if `src` isn't used, but both props shouldn't be used
    * at the same time. If both `src` and `data` are passed, then `data` takes priority.
    */
   data: SetRequired<PartialDeep<ImageType>, 'url'>;
   /** A custom function that generates the image URL. Parameters passed in
    * are either `ShopifyLoaderParams` if using the `data` prop, or the
    * `LoaderOptions` object that you pass to `loaderOptions`.
    */
   loader?: (params: ShopifyLoaderParams) => string;
   /** An object of `loader` function options. For example, if the `loader` function
    * requires a `scale` option, then the value can be a property of the
    * `loaderOptions` object (for example, `{scale: 2}`). When the `data` prop
    * is used, the object shape will be `ShopifyLoaderOptions`. When the `src`
    * prop is used, the data shape is whatever you define it to be, and this shape
    * will be passed to `loader`.
    */
   loaderOptions?: ShopifyLoaderOptions;
   /**
    * 'src' shouldn't be passed when 'data' is used.
    */
   src?: never;
   /**
    * An array of pixel widths to overwrite the default generated srcset. For example, `[300, 600, 800]`.
    */
   widths?: (HtmlImageProps['width'] | ImageType['width'])[];
   /**
    * A function that renders allow rendering preloading headers according to the context we live in
    */
   preloader?: (
      params: Pick<HtmlImageProps, 'src' | 'srcSet'>
   ) => React.ReactElement | null;
};

export const ShopifyImage = React.forwardRef<
   HTMLImageElement,
   ShopifyImageProps
>(
   (
      {
         data,
         width,
         height,
         loading,
         loader = shopifyImageLoader,
         loaderOptions,
         widths,
         decoding = 'async',
         preloader,
         ...rest
      },
      ref
   ) => {
      if (!data.url) {
         throw new Error(
            `<Image/>: the 'data' prop requires the 'url' property`
         );
      }

      if (process.env.NODE_ENV !== 'production' && !data.altText && !rest.alt) {
         console.warn(
            `<Image/>: the 'data' prop should have the 'altText' property, or the 'alt' prop, and one of them should not be empty. ${`Image: ${
               data.id ?? data.url
            }`}`
         );
      }

      const { width: imgElementWidth, height: imgElementHeight } =
         getShopifyImageDimensions({
            data,
            loaderOptions,
            elementProps: {
               width,
               height,
            },
         });

      if (
         process.env.NODE_ENV !== 'production' &&
         (!imgElementWidth || !imgElementHeight)
      ) {
         console.warn(
            `<Image/>: the 'data' prop requires either 'width' or 'data.width', and 'height' or 'data.height' properties. ${`Image: ${
               data.id ?? data.url
            }`}`
         );
      }

      let finalSrc = data.url;

      if (loader) {
         finalSrc = loader({
            ...loaderOptions,
            src: data.url,
            width: imgElementWidth,
            height: imgElementHeight,
         });
         if (typeof finalSrc !== 'string' || !finalSrc) {
            throw new Error(
               `<Image/>: 'loader' did not return a valid string. ${`Image: ${
                  data.id ?? data.url
               }`}`
            );
         }
      }

      // determining what the intended width of the image is. For example, if the width is specified and lower than the image width, then that is the maximum image width
      // to prevent generating a srcset with widths bigger than needed or to generate images that would distort because of being larger than original
      const maxWidth =
         width && imgElementWidth && width < imgElementWidth
            ? width
            : imgElementWidth;
      const finalSrcset =
         rest.srcSet ??
         internalImageSrcSet({
            ...loaderOptions,
            widths,
            src: data.url,
            width: maxWidth,
            height: imgElementHeight,
            loader,
         });

      return (
         <>
            {preloader?.({ src: finalSrc, srcSet: finalSrcset })}
            <img
               id={data.id ?? ''}
               alt={data.altText ?? rest.alt ?? ''}
               loading={loading ?? 'lazy'}
               {...rest}
               ref={ref}
               src={finalSrc}
               width={imgElementWidth ?? undefined}
               height={imgElementHeight ?? undefined}
               srcSet={finalSrcset}
               decoding={decoding}
            />
         </>
      );
   }
);

type InternalShopifySrcSetGeneratorsParams = Simplify<
   ShopifyLoaderOptions & {
      src: ImageType['url'];
      widths?: (HtmlImageProps['width'] | ImageType['width'])[];
      loader?: (params: ShopifyLoaderParams) => string;
   }
>;
function internalImageSrcSet({
   src,
   width,
   crop,
   scale,
   widths,
   loader,
   height,
}: InternalShopifySrcSetGeneratorsParams) {
   const hasCustomWidths = widths && Array.isArray(widths);
   if (hasCustomWidths && widths.some((size) => isNaN(size as number))) {
      throw new Error(`<Image/>: the 'widths' must be an array of numbers`);
   }

   let aspectRatio = 1;
   if (width && height) {
      aspectRatio = Number(height) / Number(width);
   }

   let setSizes = hasCustomWidths ? widths : IMG_SRC_SET_SIZES;
   if (
      !hasCustomWidths &&
      width &&
      width < IMG_SRC_SET_SIZES[IMG_SRC_SET_SIZES.length - 1]
   ) {
      setSizes = IMG_SRC_SET_SIZES.filter((size) => size <= width);
   }
   const srcGenerator = loader ? loader : addImageSizeParametersToUrl;
   return setSizes
      .map(
         (size) =>
            `${srcGenerator({
               src,
               width: size,
               // height is not applied if there is no crop
               // if there is crop, then height is applied as a ratio of the original width + height aspect ratio * size
               height: crop ? Number(size) * aspectRatio : undefined,
               crop,
               scale,
            })} ${size}w`
      )
      .join(', ');
}
