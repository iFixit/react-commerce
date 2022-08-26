import { Flex, HStack, Img, Text } from '@chakra-ui/react';
import { Product } from '@models/product';
import * as React from 'react';

export type ProductGalleryProps = {
   product: Product;
   selectedVariantId: string;
   selectedImageId?: string | null;
   onChange?: (imageId: string) => void;
};

export function ProductGallery({
   product,
   selectedVariantId,
   selectedImageId,
   onChange,
}: ProductGalleryProps) {
   const selectedVariant = React.useMemo(() => {
      return product.variants.find(
         (variant) => variant.id === selectedVariantId
      )!;
   }, [product.variants, selectedVariantId]);

   const variantImages = React.useMemo(() => {
      return product.images.filter((image) => {
         if (image.altText == null) {
            return true;
         }
         const variant = findVariant(product.variants, image.altText);
         return variant == null || variant.id === selectedVariant.id;
      });
   }, [product.images, product.variants, selectedVariant.id]);

   const selectedImageWithFallbackId = React.useMemo(() => {
      return selectedImageId ?? variantImages[0]?.id;
   }, [selectedImageId, variantImages]);

   const selectedImage = React.useMemo(() => {
      return product.images.find(
         (image) => image.id === selectedImageWithFallbackId
      )!;
   }, [product.images, selectedImageWithFallbackId]);

   return (
      <Flex
         w={{
            base: 'full',
            md: '350px',
         }}
         flexGrow={1}
         position="sticky"
         top="10"
         pr="10"
         direction="column"
      >
         {selectedImage ? (
            <Flex
               borderColor="gray.200"
               borderWidth={1}
               borderRadius="lg"
               overflow="hidden"
               w="full"
               justify="center"
               bg="white"
            >
               <Img
                  w="full"
                  src={selectedImage.url}
                  alt={selectedImage.altText ?? ''}
                  objectFit="contain"
               />
            </Flex>
         ) : (
            <ImagePlaceholder />
         )}
         {variantImages.length > 1 && (
            <HStack mt="2.5" spacing="2.5">
               {variantImages.map((image) => {
                  return (
                     <ImageThumbnail
                        key={image.id}
                        image={image}
                        isActive={image.id === selectedImageId}
                        onClick={() => {
                           if (image.id && onChange) {
                              onChange(image.id);
                           }
                        }}
                     />
                  );
               })}
            </HStack>
         )}
      </Flex>
   );
}

function findVariant(variants: Product['variants'], sku: string) {
   return variants.find((variant) => variant.sku === sku);
}

function ImagePlaceholder() {
   return (
      <Flex
         borderColor="gray.300"
         borderWidth={1}
         borderRadius="lg"
         overflow="hidden"
         w="full"
         justify="center"
         bg="white"
      >
         <Text>No photos available for this product</Text>
      </Flex>
   );
}

type ImageThumbnailProps = {
   image: Image;
   isActive?: boolean;
   onClick?: () => void;
};

type Image = {
   id?: string | null;
   url: string;
   altText?: string | null;
};

function ImageThumbnail({ image, isActive, onClick }: ImageThumbnailProps) {
   return (
      <Flex
         borderColor={isActive ? 'gray.400' : 'gray.200'}
         borderWidth={1}
         borderRadius="lg"
         overflow="hidden"
         w="full"
         justify="center"
         bg="white"
         boxSize="28"
         cursor="pointer"
         onClick={onClick}
      >
         <Img
            w="full"
            src={image.url}
            alt={image.altText ?? ''}
            objectFit="contain"
         />
      </Flex>
   );
}
