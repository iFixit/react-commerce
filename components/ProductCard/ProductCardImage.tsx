import placeholderImageUrl from '@assets/images/product-item-placeholder.png';
import { AspectRatio } from '@chakra-ui/react';
import Image from 'next/image';
import * as React from 'react';

export interface ProductCardImageProps {
   src: string;
   alt?: string;
}

export const ProductCardImage = ({ src, alt }: ProductCardImageProps) => {
   if (src == null) {
      return (
         <AspectRatio ratio={1} flexGrow={0} flexShrink={0} position="relative">
            <Image
               sizes="30vw"
               layout="fill"
               src={placeholderImageUrl}
               alt={alt}
            />
         </AspectRatio>
      );
   }
   return (
      <AspectRatio ratio={1} flexGrow={0} flexShrink={0} position="relative">
         <Image sizes="30vw" layout="fill" src={src} alt={alt} />
      </AspectRatio>
   );
};
