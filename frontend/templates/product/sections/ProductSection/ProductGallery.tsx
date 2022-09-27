/* eslint-disable jsx-a11y/alt-text */
import {
   Box,
   Button,
   Circle,
   Flex,
   Img,
   Text,
   useTheme,
   VStack,
} from '@chakra-ui/react';
import { faArrowLeft, faArrowRight } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Product } from '@models/product';
import { useSwiper } from '@templates/product/hooks/useSwiper';
import * as React from 'react';
import Swiper, { Navigation, Pagination, Thumbs } from 'swiper';
import { Swiper as ReactSwiper, SwiperSlide } from 'swiper/react';

import { faImage } from '@fortawesome/pro-duotone-svg-icons';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

export type ProductGalleryProps = {
   product: Product;
   selectedVariantId: string;
   selectedImageId?: string | null;
   showThumbnails?: boolean;
   onChangeImage?: (imageId: string) => void;
};

export function ProductGallery({
   product,
   selectedVariantId,
   selectedImageId,
   showThumbnails,
   onChangeImage,
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

   const selectedImageIndex = React.useMemo(() => {
      return variantImages.findIndex(
         (image) => image.id === selectedImageWithFallbackId
      )!;
   }, [variantImages, selectedImageWithFallbackId]);

   const onSlideChange = React.useCallback(
      (slideIndex) => onChangeImage?.(variantImages[slideIndex].id!),
      [onChangeImage, variantImages]
   );

   const {
      mainSwiper,
      setMainSwiper,
      thumbsSwiper,
      setThumbsSwiper,
      realIndex,
      isBeginning,
      isEnd,
   } = useSwiper({
      slideIndex: selectedImageIndex,
      totalSlides: variantImages.length,
      showThumbnails: variantImages.length > 1,
      onSlideChange,
   });

   return (
      <Box
         sx={{
            '.swiper-pagination-bullet': {
               background: 'gray.200',
               opacity: 1,
            },
            '.swiper-pagination-bullet-active': {
               background: 'gray.500',
            },
         }}
         w="full"
      >
         {variantImages.length > 1 ? (
            <ReactSwiper
               onSwiper={setMainSwiper}
               modules={[Navigation, Pagination, Thumbs]}
               thumbs={{ swiper: thumbsSwiper }}
               spaceBetween={12}
               style={{ width: '100%' }}
               pagination={{
                  clickable: true,
               }}
            >
               <CustomNavigation
                  swiper={mainSwiper}
                  isBeginning={isBeginning}
                  isEnd={isEnd}
               />
               {variantImages.map((variantImage) => (
                  <SwiperSlide key={variantImage.id}>
                     <Image image={variantImage} />
                  </SwiperSlide>
               ))}
            </ReactSwiper>
         ) : variantImages.length === 1 ? (
            <Image image={variantImages[0]} />
         ) : (
            <ImagePlaceholder />
         )}

         {showThumbnails && variantImages.length > 1 && (
            <ReactSwiper
               onSwiper={setThumbsSwiper}
               modules={[Navigation, Thumbs]}
               watchSlidesProgress
               slidesPerView={6}
               spaceBetween={12}
               style={{
                  width: '100%',
                  marginTop: '12px',
               }}
            >
               {variantImages.map((variantImage, index) => {
                  return (
                     <SwiperSlide key={variantImage.id}>
                        <ImageThumbnail
                           image={variantImage}
                           active={realIndex === index}
                        />
                     </SwiperSlide>
                  );
               })}
            </ReactSwiper>
         )}
      </Box>
   );
}

function findVariant(variants: Product['variants'], sku: string) {
   return variants.find((variant) => variant.sku === sku);
}

type CustomNavigationType = {
   swiper?: Swiper | null;
   isBeginning?: boolean;
   isEnd?: boolean;
};

const CustomNavigation = ({
   swiper,
   isBeginning,
   isEnd,
}: CustomNavigationType) => {
   const theme = useTheme();

   return (
      <>
         <Button
            pos="absolute"
            top="50%"
            left="2"
            transform="translateY(-50%)"
            zIndex="1"
            onClick={() => swiper?.slidePrev()}
            disabled={isBeginning}
            backgroundColor="transparent"
            h="48px"
            w="48px"
            borderRadius="full"
            role="group"
            _hover={{
               backgroundColor: 'transparent',
            }}
         >
            <Circle
               size="32px"
               bg="gray.600"
               _groupHover={!isBeginning ? { bg: 'gray.800' } : undefined}
               transition="300ms all"
            >
               <FontAwesomeIcon icon={faArrowLeft} color={theme.colors.white} />
            </Circle>
         </Button>
         <Button
            pos="absolute"
            top="50%"
            right="2"
            transform="translateY(-50%)"
            zIndex="1"
            onClick={() => swiper?.slideNext()}
            disabled={isEnd}
            backgroundColor="transparent"
            h="48px"
            w="48px"
            borderRadius="full"
            role="group"
            _hover={{
               backgroundColor: 'transparent',
            }}
         >
            <Circle
               size="32px"
               bg="gray.600"
               _groupHover={!isEnd ? { bg: 'gray.800' } : undefined}
               transition="300ms all"
            >
               <FontAwesomeIcon
                  icon={faArrowRight}
                  color={theme.colors.white}
               />
            </Circle>
         </Button>
      </>
   );
};

type Image = {
   id?: string | null;
   url: string;
   altText?: string | null;
   width?: number | null;
   height?: number | null;
};

type ImageProps = {
   image: Image;
};

function Image({ image }: ImageProps) {
   return (
      <Flex
         borderColor="gray.200"
         borderWidth={1}
         borderRadius="md"
         overflow="hidden"
         justify="center"
         bg="white"
         p="6"
      >
         <Img
            src={image.url}
            alt={image.altText ?? ''}
            htmlWidth={image.width ?? undefined}
            htmlHeight={image.height ?? undefined}
            objectFit="contain"
         />
      </Flex>
   );
}

type ImageThumbnailProps = {
   image: Image;
   active: boolean;
   onClick?: () => void;
};

function ImageThumbnail({ image, active, onClick }: ImageThumbnailProps) {
   return (
      <Flex
         borderColor={active ? 'gray.400' : 'gray.200'}
         borderWidth={1}
         borderRadius="md"
         overflow="hidden"
         justify="center"
         cursor="pointer"
         onClick={onClick}
      >
         <Flex
            bg="white"
            p="1"
            borderColor={active ? 'gray.400' : 'white'}
            borderWidth={1}
            overflow="hidden"
            borderRadius="5px"
         >
            <Img
               src={image.url}
               alt={image.altText ?? ''}
               htmlWidth={image.width ?? undefined}
               htmlHeight={image.height ?? undefined}
               objectFit="contain"
            />
         </Flex>
      </Flex>
   );
}

function ImagePlaceholder() {
   const theme = useTheme();
   return (
      <VStack
         borderColor="gray.200"
         borderWidth={1}
         borderRadius="lg"
         overflow="hidden"
         justify="center"
         alignItems="center"
         bg="white"
         w="full"
         h="0"
         pt="50%"
         pb="50%"
         spacing="4"
      >
         <Circle size="72px" bg="gray.100">
            <FontAwesomeIcon
               icon={faImage}
               size="2x"
               color={theme.colors.gray[500]}
            />
         </Circle>
         <Text px="4" align="center">
            No photos available for this product
         </Text>
      </VStack>
   );
}
