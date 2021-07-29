import { AspectRatio, Img } from '@chakra-ui/react';
import { ShopifyImage } from '@components/ShopifyImage';
import * as React from 'react';

export interface ProductCardImageProps {
   src: string;
   alt?: string;
}

const placeholderImageUrl =
   'https://via.placeholder.com/180x135?text=not+available';

export const ProductCardImage = ({ src, alt }: ProductCardImageProps) => {
   return (
      <AspectRatio flexGrow={0} flexShrink={0} w="full" ratio={4 / 3}>
         {src == null ? (
            <Img sizes="180px" src={placeholderImageUrl} alt={alt} />
         ) : (
            <ShopifyImage sizes="180px" src={src} alt={alt} />
         )}
      </AspectRatio>
   );
};
