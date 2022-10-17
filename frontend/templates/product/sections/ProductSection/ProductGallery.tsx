import { Box, Button, Circle, Flex, Img, Text, VStack } from '@chakra-ui/react';
import { faImage } from '@fortawesome/pro-duotone-svg-icons';
import { faArrowLeft, faArrowRight } from '@fortawesome/pro-solid-svg-icons';
import { FaIcon } from '@ifixit/icons';
import { Product, ProductImage, ProductVariant } from '@models/product';
import { useSwiper } from '@templates/product/hooks/useSwiper';
import * as React from 'react';
import ReactDOM from 'react-dom';
import Swiper, { Navigation, Pagination, Thumbs } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import { Swiper as ReactSwiper, SwiperSlide } from 'swiper/react';

export type ProductGalleryProps = {
   product: Product;
   selectedVariant: ProductVariant;
   selectedImageId?: string | null;
   showThumbnails?: boolean;
   enableZoom?: boolean;
   onChangeImage?: (imageId: string) => void;
};

export function ProductGallery({
   product,
   selectedVariant,
   selectedImageId,
   showThumbnails,
   enableZoom,
   onChangeImage,
}: ProductGalleryProps) {
   const variantImages = useVariantImages(product, selectedVariant.id);
   const selectedImageIndex = useCurrentImageIndex(
      variantImages,
      selectedImageId
   );

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
                     <ImageWithZoom
                        image={variantImage}
                        enableZoom={enableZoom}
                     />
                  </SwiperSlide>
               ))}
            </ReactSwiper>
         ) : variantImages.length === 1 ? (
            <ImageWithZoom image={variantImages[0]} enableZoom={enableZoom} />
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
                     <SwiperSlide
                        key={variantImage.id}
                        style={{
                           maxWidth: 'calc((100% - 60px) / 6)',
                           marginRight: '12px',
                        }}
                     >
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

function useVariantImages(product: Product, variantId: string) {
   return React.useMemo(() => {
      return product.images.filter((image) => {
         const linkedVariant = product.variants.find(
            (variant) => variant.id === image.variantId
         );
         return linkedVariant == null || linkedVariant.id === variantId;
      });
   }, [product, variantId]);
}

function useCurrentImageIndex(
   variantImages: ProductImage[],
   selectedImageId?: string | null
) {
   const currentImageId = React.useMemo(() => {
      return selectedImageId ?? variantImages[0]?.id;
   }, [selectedImageId, variantImages]);

   const currentImageIndex = React.useMemo(() => {
      return variantImages.findIndex((image) => image.id === currentImageId)!;
   }, [variantImages, currentImageId]);

   return currentImageIndex;
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
               <FaIcon icon={faArrowLeft} color="white" />
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
               <FaIcon icon={faArrowRight} color="white" />
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
   enableZoom?: boolean;
};

function ImageWithZoom({ image, enableZoom }: ImageProps) {
   const ZOOM_FACTOR = 3;
   const CONTAINER_PADDING = 24;
   const [show, setShow] = React.useState(false);
   const [position, setPosition] = React.useState<Position>({
      left: 0,
      top: 0,
      pointerLeft: 0,
      pointerTop: 0,
      pointerLeftPercentage: 0,
      pointerTopPercentage: 0,
   });

   const galleryRef = React.useRef<HTMLImageElement | null>(null);
   const zoomMaskRef = React.useRef<HTMLDivElement | null>(null);
   const pointerRef = React.useRef<HTMLDivElement | null>(null);
   const zoomPortalRef = React.useRef<HTMLElement | null>(null);

   const zoomAspectRatio =
      (zoomMaskRef.current?.clientWidth ?? 0) /
      (zoomMaskRef.current?.clientHeight ?? 1);
   const pointerWidth =
      (zoomAspectRatio * (galleryRef.current?.clientHeight || 0)) / ZOOM_FACTOR;
   const pointerHeight = (galleryRef.current?.clientHeight || 0) / ZOOM_FACTOR;

   React.useEffect(() => {
      zoomPortalRef.current = document.getElementById('zoom-container');
   }, []);

   const eventHandlers = enableZoom
      ? {
           onMouseOver: () => setShow(true),
           onMouseOut: () => setShow(false),
           onMouseMove: (event: React.MouseEvent<HTMLElement>) =>
              setPosition(
                 computePointerCenter({ event, pointerWidth, pointerHeight })
              ),
        }
      : {};

   return (
      <Flex
         borderColor="gray.200"
         borderWidth={1}
         borderRadius="md"
         overflow="hidden"
         justify="center"
         bg="white"
         p={`${CONTAINER_PADDING}px`}
      >
         <Img
            ref={galleryRef}
            src={image.url}
            alt={image.altText ?? ''}
            htmlWidth={image.width ?? undefined}
            htmlHeight={image.height ?? undefined}
            objectFit="contain"
            {...eventHandlers}
         />
         {enableZoom && show && (
            <Box
               ref={pointerRef}
               position="absolute"
               left="0"
               top="0"
               display="flex"
               alignItems="center"
               justifyContent="center"
               pointerEvents="none"
               transform={`translate(${
                  position?.pointerLeft + CONTAINER_PADDING
               }px, ${position?.pointerTop + CONTAINER_PADDING}px)`}
               width={pointerWidth}
               height={pointerHeight}
               color="brand.500"
            >
               <Box
                  w="full"
                  h="full"
                  bgColor="brand.100"
                  pos="absolute"
                  opacity={0.1}
               />
               <svg width="100%" height="100%">
                  <pattern
                     id="pattern-circles"
                     x="0"
                     y="0"
                     width="3"
                     height="3"
                     patternUnits="userSpaceOnUse"
                     patternContentUnits="userSpaceOnUse"
                  >
                     <circle
                        id="pattern-circle"
                        cx="1.5"
                        cy="1.5"
                        r="0.5"
                        fill="currentColor"
                     ></circle>
                  </pattern>

                  <rect
                     id="rect"
                     x="0"
                     y="0"
                     width="100%"
                     height="100%"
                     fill="url(#pattern-circles)"
                  ></rect>
               </svg>
            </Box>
         )}
         {enableZoom &&
            zoomPortalRef.current &&
            ReactDOM.createPortal(
               <>
                  {show && (
                     <Box
                        ref={zoomMaskRef}
                        h="75vh"
                        position="relative"
                        overflow="hidden"
                        display={{ base: 'none', md: 'block' }}
                        borderColor="gray.200"
                        borderWidth={1}
                        borderRadius="md"
                     >
                        <Img
                           src={image.url}
                           pos="absolute"
                           left="0"
                           top="0"
                           transform={`translate(-${position?.pointerLeftPercentage}%, -${position?.pointerTopPercentage}%)`}
                           height={`${ZOOM_FACTOR * 100}%`}
                           margin="auto"
                           maxW="none"
                        />
                     </Box>
                  )}
               </>,
               zoomPortalRef.current
            )}
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
            <FaIcon icon={faImage} h="8" color="gray.500" />
         </Circle>
         <Text px="4" align="center">
            No photos available for this product
         </Text>
      </VStack>
   );
}

type Position = {
   left: number;
   top: number;
   pointerLeft: number;
   pointerTop: number;
   pointerLeftPercentage: number;
   pointerTopPercentage: number;
};

type ComputePointerCenterParams = {
   event: React.MouseEvent<HTMLElement>;
   pointerWidth: number;
   pointerHeight: number;
};

const computePointerCenter = ({
   event,
   pointerWidth,
   pointerHeight,
}: ComputePointerCenterParams): Position => {
   const { width, height } = event.currentTarget.getBoundingClientRect();
   const left = event.nativeEvent.offsetX;
   const top = event.nativeEvent.offsetY;
   const pointerCenterLeft = Math.max(
      pointerWidth / 2,
      Math.min(width - pointerWidth / 2, left)
   );
   const pointerCenterTop = Math.max(
      pointerHeight / 2,
      Math.min(height - pointerHeight / 2, top)
   );
   const pointerLeft = pointerCenterLeft - pointerWidth / 2;
   const pointerTop = pointerCenterTop - pointerHeight / 2;
   const pointerLeftPercentage = (pointerLeft / width) * 100;
   const pointerTopPercentage = (pointerTop / height) * 100;

   return {
      left,
      top,
      pointerLeft,
      pointerTop,
      pointerLeftPercentage,
      pointerTopPercentage,
   };
};
