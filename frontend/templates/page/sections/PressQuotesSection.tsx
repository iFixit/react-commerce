import { Box, chakra, Flex, Link } from '@chakra-ui/react';
import { SectionDescription } from '@components/sections/SectionDescription';
import { SectionHeaderWrapper } from '@components/sections/SectionHeaderWrapper';
import { SectionHeading } from '@components/sections/SectionHeading';
import { ResponsiveImage } from '@ifixit/ui';
import type { PressQuote } from '@models/page/components/press-quote';
import type { PressQuotesSection } from '@models/page/sections/press-quotes-section';
import NextLink from 'next/link';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

export interface PressQuotesSectionProps {
   data: PressQuotesSection;
}

export function PressQuotesSection({
   data: { title, description, callToAction, quotes },
}: PressQuotesSectionProps) {
   if (quotes.length === 0) return null;

   return (
      <Box as="section" position="relative" w="full" bg="gray.200">
         <Flex direction="column" py="16" alignItems="center">
            <SectionHeaderWrapper textAlign="center">
               {title && <SectionHeading mb="4">{title}</SectionHeading>}
               {description && <SectionDescription richText={description} />}
            </SectionHeaderWrapper>
            <Box
               w="full"
               my={{
                  base: '6',
                  md: '8',
               }}
            >
               <QuotesGallery quotes={quotes} />
            </Box>
            {callToAction && (
               <NextLink href={callToAction.url} passHref>
                  <Link
                     color="brand.500"
                     fontWeight="bold"
                     display="block"
                     py="2"
                     px="3"
                  >
                     {callToAction.title}
                  </Link>
               </NextLink>
            )}
         </Flex>
      </Box>
   );
}

interface QuotesGalleryProps {
   quotes: PressQuote[];
}

function QuotesGallery({ quotes }: QuotesGalleryProps) {
   return (
      <Slider
         loop
         spaceBetween={20}
         slidesPerView="auto"
         slideToClickedSlide
         centeredSlides
         breakpoints={{
            768: {
               spaceBetween: 48,
            },
         }}
         sx={{
            '& .swiper-slide': {
               cursor: 'pointer',
               maxW: {
                  base: '256px',
                  md: '320px',
               },
               opacity: 0.2,
               transition: 'opacity 300ms',
               '&.swiper-slide-prev, &.swiper-slide-next': {
                  opacity: 0.4,
               },
               '&.swiper-slide-active': {
                  opacity: 1,
               },
               '&:not(.swiper-slide-active):hover': {
                  opacity: 0.6,
               },
            },
         }}
      >
         {quotes.map((quote) => {
            return (
               <SwiperSlide key={quote.id}>
                  <Quote quote={quote} />
               </SwiperSlide>
            );
         })}
      </Slider>
   );
}

interface QuoteProps {
   quote: PressQuote;
}

function Quote({ quote }: QuoteProps) {
   return (
      <Flex direction="column" alignItems="center">
         <Box
            position="relative"
            w={{
               base: '120px',
               md: '200px',
            }}
            h={{
               base: '30px',
               md: '40px',
            }}
            my="30px"
         >
            <ResponsiveImage
               src={quote.company.logo.url}
               alt={quote.company.logo.altText ?? ''}
               objectFit="contain"
               layout="fill"
            />
         </Box>
         <Box
            color="gray.800"
            textAlign="center"
            dangerouslySetInnerHTML={{
               __html: quote.text,
            }}
         />
      </Flex>
   );
}

const Slider = chakra(Swiper);
