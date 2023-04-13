import {
   Avatar,
   Box,
   chakra,
   Flex,
   HStack,
   IconButton,
   IconButtonProps,
   Text,
   useBreakpointValue,
} from '@chakra-ui/react';
import { faArrowLeft, faArrowRight } from '@fortawesome/pro-solid-svg-icons';
import { FaIcon } from '@ifixit/icons';
import { Wrapper } from '@ifixit/ui';
import type { QuoteCard } from '@models/components/quote-card';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import 'swiper/css';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { SectionDescription } from './SectionDescription';
import { SectionHeading } from './SectionHeading';

export interface QuoteGallerySectionProps {
   id: string;
   title?: string | null;
   description?: string | null;
   quotes: QuoteCard[];
}

export function QuoteGallerySection({
   id,
   title,
   description,
   quotes,
}: QuoteGallerySectionProps) {
   const controlsContainerRef = useRef<HTMLDivElement>(null);

   if (quotes.length === 0) return null;

   return (
      <Box
         as="section"
         id={id}
         position="relative"
         w="full"
         py="16"
         bg="brand.100"
         overflow="hidden"
      >
         <Wrapper>
            <Flex
               direction={{
                  base: 'column',
                  md: 'row',
               }}
               justify="space-between"
               align={{
                  base: 'flex-start',
                  md: 'flex-start',
               }}
               mb={{
                  base: 8,
                  sm: 12,
               }}
            >
               <Box>
                  {title && <SectionHeading mb="6">{title}</SectionHeading>}
                  {description && (
                     <SectionDescription richText={description} maxW="750px" />
                  )}
               </Box>
               <Box
                  ref={controlsContainerRef}
                  ml={{
                     base: 0,
                     md: 10,
                  }}
                  mt={{
                     base: '5',
                     md: '0',
                  }}
               />
            </Flex>
         </Wrapper>
         <Box>
            <Wrapper>
               <QuoteGallery
                  quotes={quotes}
                  controlsContainerRef={controlsContainerRef}
               />
            </Wrapper>
         </Box>
      </Box>
   );
}

interface QuoteGalleryProps {
   quotes: QuoteCard[];
   controlsContainerRef?: React.RefObject<HTMLDivElement>;
}

function QuoteGallery({ quotes, controlsContainerRef }: QuoteGalleryProps) {
   const spaceBetween = useBreakpointValue<number>(
      {
         base: 16,
         sm: 36,
      },
      {
         fallback: 'md',
      }
   );

   return (
      <Slider
         spaceBetween={spaceBetween}
         slidesPerView={1}
         slideToClickedSlide
         w={{
            base: '90%',
            md: '60%',
         }}
         mx="0"
         overflow="visible"
         sx={{
            '& .swiper-slide': {
               cursor: 'pointer',
               opacity: 0.5,
               '&.swiper-slide-active': {
                  opacity: 1,
               },
            },
         }}
      >
         {quotes.map((quote) => {
            return (
               <SwiperSlide key={quote.id}>
                  <QuoteCard quote={quote} />
               </SwiperSlide>
            );
         })}
         {controlsContainerRef && (
            <NavigationControls containerRef={controlsContainerRef} />
         )}
      </Slider>
   );
}

interface QuoteCardProps {
   quote: QuoteCard;
}

function QuoteCard({ quote }: QuoteCardProps) {
   const author = quote.author;
   return (
      <Box p={{ base: 6, md: 9 }} bg="white" borderRadius="base">
         <Box dangerouslySetInnerHTML={{ __html: quote.text }}></Box>
         {author && (
            <HStack
               mt={{
                  base: 3,
                  sm: 6,
               }}
            >
               <Avatar
                  name={author.name}
                  src={author.avatar?.thumbnailUrl ?? author.avatar?.url}
                  borderColor="brand.500"
                  borderWidth="2px"
               />
               <Box>
                  <Text color="brand.500" fontWeight="medium" fontSize="sm">
                     {author.name}
                  </Text>
                  <Text color="gray.600" fontSize="sm">
                     {author.role}
                  </Text>
               </Box>
            </HStack>
         )}
      </Box>
   );
}

interface NavigationControlsProps {
   containerRef: React.RefObject<HTMLDivElement>;
}

function NavigationControls({ containerRef }: NavigationControlsProps) {
   const { isBeginning, isEnd, slideNext, slidePrev } = useSwiperNavigation();

   if (!containerRef.current) return null;

   return createPortal(
      <HStack>
         <SlideControlButton
            aria-label="view previous quote"
            disabled={isBeginning}
            icon={<FaIcon icon={faArrowLeft} />}
            onClick={slidePrev}
         />
         <SlideControlButton
            aria-label="view next quote"
            disabled={isEnd}
            icon={<FaIcon icon={faArrowRight} />}
            onClick={slideNext}
         />
      </HStack>,
      containerRef.current
   );
}

function SlideControlButton({ disabled, ...others }: IconButtonProps) {
   return (
      <IconButton
         disabled={disabled}
         variant={disabled ? 'outline' : 'solid'}
         colorScheme="brand"
         borderRadius="full"
         borderWidth={disabled ? '2px' : '0'}
         {...others}
      />
   );
}

function useSwiperNavigation() {
   const swiper = useSwiper();
   const [isBeginning, setIsBeginning] = useState(swiper.isBeginning);
   const [isEnd, setIsEnd] = useState(swiper.isEnd);

   useEffect(() => {
      swiper.on('slideChange', () => {
         setIsBeginning(swiper.isBeginning);
         setIsEnd(swiper.isEnd);
      });
   }, [swiper]);

   return {
      isBeginning,
      isEnd,
      slidePrev: () => swiper.slidePrev(),
      slideNext: () => swiper.slideNext(),
   };
}

const Slider = chakra(Swiper);
