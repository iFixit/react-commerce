import React from 'react';
import { ExternalImage, ExternalImageProps } from './ExternalImage';
import { iFixitImageLoader, IMG_SRC_SET_SIZES } from './iFixitUtils';
import { ShopifyImage, ShopifyImageProps } from './ShopifyImage';

export type HtmlImageProps = React.ImgHTMLAttributes<HTMLImageElement>;
export type ImageProps<GenericLoaderOpts> =
   | ShopifyImageProps
   | ExternalImageProps<GenericLoaderOpts>;

export const Image = React.forwardRef(ImageInner);

function ImageInner<GenericLoaderOpts>(
   props: ImageProps<GenericLoaderOpts> & {
      preloader?: (
         params: Pick<HtmlImageProps, 'src' | 'srcSet'>
      ) => React.ReactElement | null;
   },
   ref: React.ForwardedRef<HTMLImageElement>
) {
   const { preloader } = props;

   if (!props.data && !props.src) {
      throw new Error(`<Image/>: requires either a 'data' or 'src' prop.`);
   }

   if (process.env.NODE_ENV !== 'production' && props.data && props.src) {
      console.warn(
         `<Image/>: using both 'data' and 'src' props is not supported; using the 'data' prop by default`
      );
   }

   if (props.data) {
      return (
         <ShopifyImage
            ref={ref}
            preloader={preloader}
            style={{
               maxInlineSize: '100%',
               blockSize: 'auto',
               objectFit: 'cover',
            }}
            {...props}
         />
      );
   } else {
      const { src, width, height, alt } = props;
      const loader = iFixitImageLoader({
         src,
         width,
         height,
         alt,
         widths: IMG_SRC_SET_SIZES,
      });

      return (
         <ExternalImage
            ref={ref}
            preloader={preloader}
            loader={loader}
            style={{
               maxInlineSize: '100%',
               blockSize: 'auto',
               objectFit: 'cover',
            }}
            {...props}
         />
      );
   }
}
