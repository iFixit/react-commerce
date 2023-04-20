import { Box, Button, Flex, Link } from '@chakra-ui/react';
import { SectionDescription } from '@components/sections/SectionDescription';
import { SectionHeaderWrapper } from '@components/sections/SectionHeaderWrapper';
import { SectionHeading } from '@components/sections/SectionHeading';
import { ResponsiveImage, Slider } from '@ifixit/ui';
import type { PressQuote } from '@models/page/components/press-quote';
import type { PressQuotesSection } from '@models/page/sections/press-quotes-section';
import NextLink from 'next/link';

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
         renderSlide={({ item, ...rest }) => (
            <Quote key={item.id} quote={item} {...rest} />
         )}
      />
   );
}

interface QuoteProps {
   quote: PressQuote;
   isActive: boolean;
}

function Quote({ quote, isActive }: QuoteProps) {
   return (
      <Flex
         direction="column"
         alignItems="center"
         transition="opacity 300ms"
         opacity={isActive ? 1 : 0.4}
         _hover={{ opacity: isActive ? 1 : 0.6 }}
      >
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
