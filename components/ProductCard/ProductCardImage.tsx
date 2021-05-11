import { chakra, Image } from '@chakra-ui/react';
import * as React from 'react';

export interface ProductCardImageProps {
   className?: string;
   src: string;
   alt?: string;
}

export const ProductCardImage = chakra(
   ({ className, src, alt }: ProductCardImageProps) => {
      return (
         <Image
            className={className}
            boxSize="150px"
            objectFit="cover"
            src={src}
            alt={alt}
         />
      );
   }
);
