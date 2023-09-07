import { Box, Flex, Link } from '@chakra-ui/react';
import { PrerenderedHTML } from '@components/common';
import { SectionDescription } from '@components/sections/SectionDescription';
import { SectionHeaderWrapper } from '@components/sections/SectionHeaderWrapper';
import { SectionHeading } from '@components/sections/SectionHeading';
import { SmartLink } from '@components/ui/SmartLink';
import { ResponsiveImage, Slider } from '@ifixit/ui';
import type { CallToAction } from '@models/components/call-to-action';
import type { PressQuote } from '@models/components/press-quote';

export interface PressQuotesSectionProps {
   title: string | null;
   description: string | null;
   callToAction: CallToAction | null;
   quotes: PressQuote[];
}

export function PressQuotesSection({
   title,
   description,
   callToAction,
   quotes,
}: PressQuotesSectionProps) {
   if (quotes.length === 0) return null;

   return (
      <Box as="section" position="relative" w="full" bg="gray.200">
         <Flex direction="column" py="16" alignItems="center">
            <SectionHeaderWrapper textAlign="center">
               {title && <SectionHeading mb="4">{title}</SectionHeading>}
               {description && <SectionDescription richText={description} />}
            </SectionHeaderWrapper>
            <Flex
               justifyContent="center"
               w="full"
               overflow="hidden"
               my={{
                  base: '6',
                  md: '8',
               }}
            >
               <QuotesGallery quotes={quotes} />
            </Flex>
            {callToAction && (
               <SmartLink
                  as={Link}
                  href={callToAction.url}
                  color="brand.500"
                  fontWeight="semibold"
                  display="block"
                  py="2"
                  px="3"
               >
                  {callToAction.title}
               </SmartLink>
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
         maxW={{
            base: '64',
            md: '80',
         }}
         overflow="visible"
         items={quotes}
         activeIndex={Math.floor((quotes.length - 1) / 2)}
         spaceBetween={20}
         loop
         loopTailsLength={3}
         renderSlide={({ item, index, activeIndex, ...rest }) => (
            <Quote
               key={item.id}
               quote={item}
               isFarFromView={Math.abs(activeIndex - index) > 1}
               {...rest}
            />
         )}
      />
   );
}

interface QuoteProps {
   quote: PressQuote;
   isFarFromView: boolean;
   isActive: boolean;
   isLooping: boolean;
}

function Quote({ quote, isActive, isFarFromView, isLooping }: QuoteProps) {
   return (
      <Flex
         direction="column"
         alignItems="center"
         transition={isLooping ? 'none' : 'opacity 300ms'}
         opacity={isActive ? 1 : isFarFromView ? 0.2 : 0.4}
         _hover={{ opacity: isActive ? 1 : 0.6 }}
      >
         <Box position="relative" w={{ base: '200px' }} h={{ base: '100px' }}>
            <ResponsiveImage
               src={quote.company.logo.url}
               alt={quote.company.logo.altText ?? ''}
               style={{
                  objectFit: 'contain',
               }}
               fill
            />
         </Box>
         <PrerenderedHTML
            html={quote.text}
            template="commerce"
            color="gray.800"
            textAlign="center"
         />
      </Flex>
   );
}
