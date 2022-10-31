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
   showThumbnails?: boolean;
   enableZoom?: boolean;
   onChangeImage?: (imageId: string) => void;
};

const THUMBNAILS_COUNT = 6;
const THUMBNAILS_SPACE_BETWEEN = 12;

export function ProductGallery({
   product,
   selectedVariant,
   showThumbnails,
   enableZoom,
   onChangeImage,
}: ProductGalleryProps) {
   const variantImages = useVariantImages(product, selectedVariant.id);
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
            <Box position="relative">
               <ReactSwiper
                  onSwiper={setThumbsSwiper}
                  modules={[Navigation, Thumbs]}
                  watchSlidesProgress
                  threshold={5}
                  slidesPerView={THUMBNAILS_COUNT}
                  spaceBetween={THUMBNAILS_SPACE_BETWEEN}
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
                              maxWidth: `calc((100% - ${
                                 THUMBNAILS_SPACE_BETWEEN *
                                 (THUMBNAILS_COUNT - 1)
                              }px) / ${THUMBNAILS_COUNT})`,
                              marginRight: `${THUMBNAILS_SPACE_BETWEEN}px`,
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
               <Box
                  position="absolute"
                  bgGradient="linear(to-l, transparent, blueGray.50)"
                  w="25%"
                  h="full"
                  top="0"
                  bottom="0"
                  left="0"
                  zIndex="10"
                  pointerEvents="none"
                  opacity={realIndex > 0 ? 1 : 0}
                  transition="all 300ms"
               ></Box>
               <Box
                  position="absolute"
                  bgGradient="linear(to-r, transparent, blueGray.50)"
                  w="25%"
                  h="full"
                  top="0"
                  bottom="0"
                  right="0"
                  zIndex="10"
                  pointerEvents="none"
                  opacity={
                     variantImages.length - realIndex > THUMBNAILS_COUNT ? 1 : 0
                  }
                  transition="all 300ms"
               ></Box>
            </Box>
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

const ZOOM_FACTOR = 3;
const CONTAINER_PADDING = 24;

function ImageWithZoom({ image, enableZoom }: ImageProps) {
   const [show, setShow] = React.useState(false);
   const [dimensionData, setDimensionData] = React.useState<DimensionData>({
      zoomMaskAspectRatio: 1,
      galleryAspectRatio: 1,
      galleryWidth: 0,
      galleryHeight: 0,
      galleryRealWidth: 0,
      galleryRealHeight: 0,
      pointerWidth: 0,
      pointerHeight: 0,
   });
   const [pointerData, setPointerData] = React.useState<PointerData>({
      left: 0,
      top: 0,
      pointerLeft: 0,
      pointerTop: 0,
      zoomTranslationLeftPercentage: 0,
      zoomTranslationTopPercentage: 0,
   });

   const galleryRef = React.useRef<HTMLImageElement | null>(null);
   const pointerRef = React.useRef<HTMLDivElement | null>(null);
   const zoomPortalRef = React.useRef<HTMLElement | null>(null);
   const zoomMaskRef = React.useRef<HTMLDivElement | null>(null);

   React.useEffect(() => {
      zoomPortalRef.current = document.getElementById('zoom-container');
   }, []);

   const eventHandlers = enableZoom
      ? {
           onMouseOver: () => setShow(true),
           onMouseOut: () => setShow(false),
           onMouseMove: (event: React.MouseEvent<HTMLImageElement>) => {
              setDimensionData(
                 computeDimensionData({ zoomMaskRef, galleryRef })
              );
              const {
                 galleryWidth,
                 galleryHeight,
                 galleryRealWidth,
                 galleryRealHeight,
                 pointerWidth,
                 pointerHeight,
              } = dimensionData;
              setPointerData(
                 computePointerData({
                    event,
                    galleryWidth,
                    galleryHeight,
                    galleryRealWidth,
                    galleryRealHeight,
                    pointerWidth,
                    pointerHeight,
                 })
              );
           },
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
         position="relative"
         h="0"
         pb="100%"
      >
         <Flex
            position="absolute"
            alignItems="center"
            justifyContent="center"
            width="100%"
            height="100%"
            p={`${CONTAINER_PADDING}px`}
         >
            <Img
               ref={galleryRef}
               src={image.url}
               alt={image.altText ?? ''}
               htmlWidth={image.width ?? undefined}
               htmlHeight={image.height ?? undefined}
               objectFit="contain"
               width="100%"
               height="100%"
               {...eventHandlers}
            />
         </Flex>

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
                  pointerData?.pointerLeft + CONTAINER_PADDING
               }px, ${pointerData?.pointerTop + CONTAINER_PADDING}px)`}
               width={`${dimensionData.pointerWidth}px`}
               height={`${dimensionData.pointerHeight}px`}
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
                        bg="white"
                     >
                        <Img
                           src={image.url}
                           pos="absolute"
                           left="0"
                           top="0"
                           transform={`translate(${-pointerData?.zoomTranslationLeftPercentage}%, ${-pointerData?.zoomTranslationTopPercentage}%)`}
                           height={`${
                              100 *
                              ZOOM_FACTOR *
                              (dimensionData.galleryRealHeight /
                                 dimensionData.galleryHeight)
                           }%`}
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
         bg="white"
         w="100%"
         pb="100%"
         position="relative"
         h="0"
      >
         <Flex
            position="absolute"
            width="100%"
            height="100%"
            alignItems="center"
            justifyContent="center"
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

type DimensionData = {
   zoomMaskAspectRatio: number;
   galleryAspectRatio: number;
   galleryWidth: number;
   galleryHeight: number;
   galleryRealWidth: number;
   galleryRealHeight: number;
   pointerWidth: number;
   pointerHeight: number;
};

type ComputeDimensionDataParams = {
   zoomMaskRef: React.MutableRefObject<HTMLDivElement | null>;
   galleryRef: React.MutableRefObject<HTMLImageElement | null>;
};

const computeDimensionData = ({
   zoomMaskRef,
   galleryRef,
}: ComputeDimensionDataParams): DimensionData => {
   let zoomMaskAspectRatio = 1,
      galleryAspectRatio = 1,
      galleryWidth = 0,
      galleryHeight = 0,
      galleryRealWidth = 0,
      galleryRealHeight = 0,
      pointerWidth = 0,
      pointerHeight = 0;

   if (zoomMaskRef.current && galleryRef.current) {
      const { clientWidth: zoomWidth, clientHeight: zoomHeight } =
         zoomMaskRef.current;
      const {
         clientWidth,
         clientHeight,
         naturalWidth: galleryNaturalWidth,
         naturalHeight: galleryNaturalHeight,
      } = galleryRef.current;

      galleryWidth = clientWidth;
      galleryHeight = clientHeight;

      zoomMaskAspectRatio = zoomHeight / zoomWidth;
      galleryAspectRatio = galleryNaturalHeight / galleryNaturalWidth;

      galleryRealWidth =
         galleryAspectRatio > 1
            ? galleryHeight / galleryAspectRatio
            : galleryWidth;
      galleryRealHeight =
         galleryAspectRatio > 1
            ? galleryHeight
            : galleryWidth * galleryAspectRatio;
      pointerWidth = galleryHeight / (zoomMaskAspectRatio * ZOOM_FACTOR || 1);
      pointerHeight = galleryHeight / ZOOM_FACTOR;
   }

   return {
      zoomMaskAspectRatio,
      galleryAspectRatio,
      galleryWidth,
      galleryHeight,
      galleryRealWidth,
      galleryRealHeight,
      pointerWidth,
      pointerHeight,
   };
};

type PointerData = {
   left: number;
   top: number;
   pointerLeft: number;
   pointerTop: number;
   zoomTranslationLeftPercentage: number;
   zoomTranslationTopPercentage: number;
};

type ComputePointerDataParams = {
   event: React.MouseEvent<HTMLImageElement>;
   galleryWidth: number;
   galleryHeight: number;
   galleryRealWidth: number;
   galleryRealHeight: number;
   pointerWidth: number;
   pointerHeight: number;
};

const computePointerData = ({
   event,
   galleryWidth,
   galleryHeight,
   galleryRealWidth,
   galleryRealHeight,
   pointerWidth,
   pointerHeight,
}: ComputePointerDataParams): PointerData => {
   const left = event.nativeEvent.offsetX;
   const top = event.nativeEvent.offsetY;
   const pointerCenterLeft = Math.max(
      pointerWidth / 2,
      Math.min(galleryWidth - pointerWidth / 2, left)
   );
   const pointerCenterTop = Math.max(
      pointerHeight / 2,
      Math.min(galleryHeight - pointerHeight / 2, top)
   );
   const pointerLeft = pointerCenterLeft - pointerWidth / 2;
   const pointerTop = pointerCenterTop - pointerHeight / 2;

   const horizontalGap = (galleryWidth - galleryRealWidth) / 2;
   const verticalGap = (galleryHeight - galleryRealHeight) / 2;
   const zoomTranslationLeftPercentage =
      ((pointerLeft - horizontalGap) / galleryRealWidth) * 100;
   const zoomTranslationTopPercentage =
      ((pointerTop - verticalGap) / galleryRealHeight) * 100;

   return {
      left,
      top,
      pointerLeft,
      pointerTop,
      zoomTranslationLeftPercentage,
      zoomTranslationTopPercentage,
   };
};
