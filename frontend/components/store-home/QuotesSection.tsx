import {
   Avatar,
   Box,
   BoxProps,
   Flex,
   HStack,
   IconButton,
   StackProps,
   Text,
   VStack,
} from '@chakra-ui/react';
import { QuotesSection as SectionData } from '@models/page';
import { motion, useAnimation } from 'framer-motion';
import * as React from 'react';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import { PageContentWrapper } from './PageContentWrapper';
import { SectionDescription } from './SectionDescription';
import { SectionHeading } from './SectionHeading';

export interface QuotesSectionProps {
   data: SectionData;
}

export function QuotesSection({
   data: { title, description, quotes },
}: QuotesSectionProps) {
   const [currentQuote, setCurrentQuote] = React.useState(0);
   const slidesRef = React.useRef<Array<HTMLElement>>([]);

   const controls = useAnimation();

   const offset = React.useMemo(() => {
      if (slidesRef.current[currentQuote]) {
         return -slidesRef.current[currentQuote].offsetLeft;
      }
      return 0;
   }, [currentQuote]);

   const isDragging = React.useRef(false);

   React.useEffect(() => {
      controls.start({
         x: offset,
      });
   }, [offset, controls]);

   const goToNextQuote = React.useCallback(() => {
      setCurrentQuote((current) => clamp(current + 1, 0, quotes.length - 1));
   }, []);

   const goToPreviousQuote = React.useCallback(() => {
      setCurrentQuote((current) => clamp(current - 1, 0, quotes.length - 1));
   }, []);

   return (
      <Box
         as="section"
         w="full"
         py={{
            base: '16',
            md: '24',
         }}
         bg="blue.50"
      >
         <PageContentWrapper>
            <Flex
               direction={{
                  base: 'column',
                  md: 'row',
               }}
               justify="space-between"
               align={{
                  base: 'flex-end',
                  md: 'flex-start',
               }}
               mb="10"
            >
               <VStack justify="flex-start" align="flex-start" spacing="2.5">
                  {title && <SectionHeading>{title}</SectionHeading>}
                  {description && (
                     <SectionDescription richText={description} maxW="750px" />
                  )}
               </VStack>
               <HStack
                  ml="10"
                  mt={{
                     base: '5',
                     md: '0',
                  }}
               >
                  <IconButton
                     aria-label="go to previous quote"
                     variant="outline"
                     colorScheme="brand"
                     borderRadius="full"
                     icon={<HiOutlineChevronLeft />}
                     onClick={goToPreviousQuote}
                  />
                  <IconButton
                     aria-label="go to next quote"
                     variant="solid"
                     colorScheme="brand"
                     borderRadius="full"
                     icon={<HiOutlineChevronRight />}
                     onClick={goToNextQuote}
                  />
               </HStack>
            </Flex>
         </PageContentWrapper>
         <Box overflowX="hidden">
            <PageContentWrapper>
               <MotionHStack
                  position="relative"
                  spacing={{
                     base: '5',
                     md: '10',
                  }}
                  align="flex-start"
                  animate={controls}
                  transition={{
                     type: 'spring',
                     stiffness: 200,
                     damping: 20,
                     mass: 0.5,
                  }}
                  drag="x"
                  dragDirectionLock
                  onDragEnd={(event, panInfo) => {
                     isDragging.current = true;

                     const distance = Math.abs(
                        Math.min(offset + panInfo.offset.x, 0)
                     );
                     let nextQuote = 0;
                     let slide = slidesRef.current[nextQuote];
                     let nextChangePoint =
                        slide.offsetLeft + slide.offsetWidth / 2;
                     while (
                        distance > nextChangePoint &&
                        nextQuote < slidesRef.current.length - 1
                     ) {
                        nextQuote++;
                        slide = slidesRef.current[nextQuote];
                        nextChangePoint =
                           slide.offsetLeft + slide.offsetWidth / 2;
                     }

                     const swipe = swipePower(
                        panInfo.offset.x,
                        panInfo.velocity.x
                     );
                     if (swipe < -swipeConfidenceThreshold) {
                        nextQuote = currentQuote + 1;
                     } else if (swipe > swipeConfidenceThreshold) {
                        nextQuote = currentQuote - 1;
                     }
                     nextQuote = clamp(nextQuote, 0, quotes.length - 1);

                     setTimeout(() => {
                        isDragging.current = false;
                     }, 50);

                     if (nextQuote === currentQuote) {
                        controls.start({
                           x: offset,
                        });
                     } else {
                        setCurrentQuote(clamp(nextQuote, 0, quotes.length - 1));
                     }
                  }}
               >
                  {quotes.map((quote, index) => {
                     const isCurrent = index === currentQuote;
                     return (
                        <MotionBox
                           ref={(el: any) => {
                              if (el) {
                                 slidesRef.current[index] = el;
                              }
                           }}
                           key={index}
                           bg="white"
                           p="10"
                           width={{ base: '85%', md: 'calc(50% - 40px)' }}
                           flexShrink={0}
                           animate={{
                              opacity: isCurrent
                                 ? 1
                                 : Math.abs(currentQuote - index) === 1
                                 ? 0.75
                                 : 0.5,
                           }}
                           whileHover={
                              isCurrent
                                 ? undefined
                                 : {
                                      opacity: 1,
                                      cursor: 'pointer',
                                   }
                           }
                           onClick={() => {
                              if (!isDragging.current) {
                                 setCurrentQuote(index);
                              }
                           }}
                        >
                           <Text
                              color="gray.600"
                              mb="5"
                              dangerouslySetInnerHTML={{
                                 __html: quote.richText,
                              }}
                           />
                           <HStack>
                              <Avatar
                                 name={quote.author}
                                 src={quote.avatar?.url}
                              />
                              <Box>
                                 <Text color="brand.500" fontWeight="bold">
                                    {quote.author}
                                 </Text>
                                 <Text color="gray.600" fontSize="sm">
                                    {quote.headline}
                                 </Text>
                              </Box>
                           </HStack>
                        </MotionBox>
                     );
                  })}
               </MotionHStack>
            </PageContentWrapper>
         </Box>
      </Box>
   );
}

const MotionBox = motion<BoxProps>(Box);

const MotionHStack = motion<
   Omit<StackProps, 'onDragStart' | 'onDragEnd' | 'transition'>
>(HStack);

const swipeConfidenceThreshold = 3000;
const swipePower = (offset: number, velocity: number) => {
   return Math.abs(offset) * velocity;
};

function clamp(value: number, min: number, max: number) {
   return Math.max(Math.min(value, max), min);
}
