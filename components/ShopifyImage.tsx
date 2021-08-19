/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Img, ImgProps } from '@chakra-ui/react';
import { getResizedImage } from '@lib/utils';
import * as React from 'react';

const defaultImageSizes = [
   50,
   100,
   200,
   300,
   400,
   500,
   600,
   700,
   800,
   900,
   1000,
   1200,
   1400,
   1600,
   2000,
   2400,
];

export type ShopifyImageProps = ImgProps;

export const ShopifyImage = ({ src, width, ...otherProps }: ImgProps) => {
   const srcSet = React.useMemo(() => {
      return getSrcSet(src, defaultImageSizes);
   }, [src]);
   return (
      <Img
         src={src}
         srcSet={srcSet}
         // @ts-ignore
         objectFit="contain !important"
         {...otherProps}
      />
   );
};

function getSrcSet(
   src: string | undefined,
   imageSizes: number[]
): string | undefined {
   if (src == null) {
      return undefined;
   }
   return imageSizes
      .map((size) => `${getResizedImage({ src, width: size })} ${size}w`)
      .join(', ');
}
