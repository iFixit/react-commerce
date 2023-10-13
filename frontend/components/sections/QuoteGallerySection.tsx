import {
   Avatar,
   Box,
   Flex,
   HStack,
   IconButton,
   IconButtonProps,
   Text,
   useBreakpointValue,
} from '@chakra-ui/react';
import { faArrowLeft, faArrowRight } from '@fortawesome/pro-solid-svg-icons';
import { FaIcon } from '@ifixit/icons';
import { Slider, Wrapper } from '@ifixit/ui';
import type { QuoteCard } from '@models/components/quote-card';
import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { SectionDescription } from './SectionDescription';
import { SectionHeading } from './SectionHeading';
import { PrerenderedHTML } from '@components/common';

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
   const navigationBackButtonContainerRef = useRef<HTMLDivElement>(null);
   const navigationNextButtonContainerRef = useRef<HTMLDivElement>(null);

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
               <HStack
                  ml={{
                     base: 0,
                     md: 10,
                  }}
                  mt={{
                     base: '5',
                     md: '0',
                  }}
               >
                  <Box ref={navigationBackButtonContainerRef} />
                  <Box ref={navigationNextButtonContainerRef} />
               </HStack>
            </Flex>
         </Wrapper>
         <Box>
            <Wrapper>
               <QuoteGallery
                  quotes={quotes}
                  navigationBackButtonContainerRef={
                     navigationBackButtonContainerRef
                  }
                  navigationNextButtonContainerRef={
                     navigationNextButtonContainerRef
                  }
               />
            </Wrapper>
         </Box>
      </Box>
   );
}

interface QuoteGalleryProps {
   quotes: QuoteCard[];
   navigationBackButtonContainerRef?: React.RefObject<HTMLDivElement>;
   navigationNextButtonContainerRef?: React.RefObject<HTMLDivElement>;
}

function QuoteGallery({
   quotes,
   navigationBackButtonContainerRef,
   navigationNextButtonContainerRef,
}: QuoteGalleryProps) {
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
         w={{
            base: '90%',
            md: '60%',
         }}
         mx="0"
         overflow="visible"
         items={quotes}
         spaceBetween={spaceBetween}
         renderSlide={({ item, isActive }) => (
            <QuoteCard key={item.id} quote={item} isActive={isActive} />
         )}
         renderPreviousButton={(props) => (
            <NavigationBackButton
               containerRef={navigationBackButtonContainerRef}
               {...props}
            />
         )}
         renderNextButton={(props) => (
            <NavigationNextButton
               containerRef={navigationNextButtonContainerRef}
               {...props}
            />
         )}
      />
   );
}

interface QuoteCardProps {
   quote: QuoteCard;
   isActive: boolean;
}

function QuoteCard({ quote, isActive }: QuoteCardProps) {
   const author = quote.author;
   return (
      <Box
         p={{ base: 6, md: 9 }}
         bg="white"
         borderRadius="base"
         transition="opacity 300ms"
         opacity={isActive ? 1 : 0.5}
      >
         <PrerenderedHTML html={quote.text} template="commerce" />
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

interface NavigationButtonProps {
   containerRef?: React.RefObject<HTMLDivElement>;
   disabled?: boolean;
   onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function NavigationBackButton({
   containerRef,
   disabled,
   onClick,
}: NavigationButtonProps) {
   if (!containerRef?.current) return null;

   return createPortal(
      <SlideControlButton
         aria-label="view previous quote"
         disabled={disabled}
         icon={<FaIcon icon={faArrowLeft} />}
         onClick={onClick}
      />,
      containerRef.current
   );
}

function NavigationNextButton({
   containerRef,
   disabled,
   onClick,
}: NavigationButtonProps) {
   if (!containerRef?.current) return null;

   return createPortal(
      <SlideControlButton
         aria-label="view next quote"
         disabled={disabled}
         icon={<FaIcon icon={faArrowRight} />}
         onClick={onClick}
      />,
      containerRef.current
   );
}

function SlideControlButton({ disabled, ...others }: IconButtonProps) {
   return (
      <IconButton
         isDisabled={disabled}
         variant={disabled ? 'outline' : 'solid'}
         colorScheme="brand"
         borderRadius="full"
         borderWidth={disabled ? '2px' : '0'}
         {...others}
      />
   );
}
