import { Box, Icon, Link, Text, VStack } from '@chakra-ui/react';
import {
   NavigationActionType,
   PressSection as SectionData,
} from '@models/page';
import Head from 'next/head';
import Image from 'next/image';
import NextLink from 'next/link';
import { HiChevronRight } from 'react-icons/hi';
import Slider, { Settings } from 'react-slick';
import { SectionDescription } from './SectionDescription';
import { SectionHeading } from './SectionHeading';

export interface PressSectionProps {
   data: SectionData;
}

export function PressSection({
   data: { title, description, callToAction, quotes },
}: PressSectionProps) {
   const settings: Settings = {
      dots: false,
      centerMode: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: false,
      focusOnSelect: true,
   };
   return (
      <>
         <Head>
            <link
               rel="stylesheet"
               type="text/css"
               charSet="UTF-8"
               href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
            />
            <link
               rel="stylesheet"
               type="text/css"
               href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
            />
         </Head>
         <Box as="section" position="relative" w="full" bg="gray.200">
            <VStack align="center" py="16" spacing="5">
               {title && <SectionHeading>{title}</SectionHeading>}
               {description && (
                  <SectionDescription color="gray.600" richText={description} />
               )}
               <Box
                  w="full"
                  py="12"
                  sx={{
                     '.slick-slider': {
                        '.slick-slide': {
                           cursor: 'pointer',
                           opacity: 0.4,
                           transition: 'opacity 500ms ease-in-out',
                        },
                        '.slick-slide.slick-current': {
                           cursor: 'default',
                           opacity: 1,
                        },
                     },
                  }}
               >
                  <Slider {...settings}>
                     {quotes.map((quote, index) => (
                        <VStack
                           key={index}
                           justify="center"
                           textAlign="center"
                           px="6"
                           spacing="0"
                        >
                           {quote.logo && (
                              <Image
                                 src={quote.logo?.url}
                                 alt="store hero image"
                                 width={200}
                                 height={100}
                              />
                           )}
                           {quote.text && (
                              <Text
                                 color="gray.600"
                                 dangerouslySetInnerHTML={{
                                    __html: quote.text,
                                 }}
                              />
                           )}
                        </VStack>
                     ))}
                  </Slider>
               </Box>
               {callToAction && (
                  <NextLink href={callToAction.url} passHref>
                     <Link
                        color="brand.500"
                        fontWeight="bold"
                        isExternal={
                           callToAction.type ===
                           NavigationActionType.ExternalLink
                        }
                        display="flex"
                     >
                        {callToAction.title}
                        <Icon as={HiChevronRight} boxSize="6" />
                     </Link>
                  </NextLink>
               )}
            </VStack>
         </Box>
      </>
   );
}
