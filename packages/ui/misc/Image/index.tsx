import Head from 'next/head';
import React, { useCallback } from 'react';
import { HydrogenImage, ImageProps } from './HydrogenImage';

export const Image = React.forwardRef(ImageInner);

function ImageInner<GenericLoaderOpts>(
   props: ImageProps<GenericLoaderOpts> & {
      preload?: boolean;
      preloadKey?: string;
   },
   ref: React.ForwardedRef<HTMLImageElement>
) {
   const { preload = false, preloadKey, ...otherProps } = props;
   const preloader = useCallback(
      ({ src, srcSet }) => {
         return preload ? (
            <Head>
               <link
                  key={preloadKey}
                  rel="preload"
                  as="image"
                  href={src}
                  // @ts-ignore - otherwise tsc raise error
                  imageSrcSet={srcSet}
               />
            </Head>
         ) : null;
      },
      [preload]
   );

   return <HydrogenImage ref={ref} preloader={preloader} {...otherProps} />;
}
