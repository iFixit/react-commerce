import { placeholderImageUrl } from '@lib/utils';
import Image from 'next/image';
import * as React from 'react';

export interface ProductCardImageProps {
   src: string;
   alt?: string;
}

export const ProductCardImage = ({ src, alt }: ProductCardImageProps) => {
   return (
      <Image
         width={300}
         height={225}
         src={src || placeholderImageUrl}
         alt={alt}
      />
   );
};
