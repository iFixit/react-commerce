import { chakra, Img } from '@chakra-ui/react';
import * as React from 'react';

export interface ProductCardImageProps {
   className?: string;
   src: string;
   alt?: string;
}

export const ProductCardImage = chakra(
   ({ className, src, alt }: ProductCardImageProps) => {
      return (
         <Img
            className={className}
            boxSize="160px"
            flexShrink={0}
            objectFit="cover"
            src={src}
            alt={alt}
         />
      );
   }
);
