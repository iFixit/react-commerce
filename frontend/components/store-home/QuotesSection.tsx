import {
   Box,
   BoxProps,
   Flex,
   HStack,
   IconButton,
   Text,
   VStack,
   StackProps,
} from '@chakra-ui/react';
import { QuotesSection as SectionData } from '@models/page';
import { motion, useDragControls, useMotionValue } from 'framer-motion';
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
   const [selectedQuote, setSelectedQuote] = React.useState(0);

   const position = React.useMemo(() => {
      return -selectedQuote * 490;
   }, [selectedQuote]);
   const motionX = useMotionValue(0);

   React.useEffect(() => {
      motionX.set(position);
   }, [position, motionX]);

   const goToNextQuote = React.useCallback<
      React.MouseEventHandler<HTMLButtonElement>
   >((event) => {
      setSelectedQuote((current) => (current + 1) % quotes.length);
   }, []);

   const goToPreviousQuote = React.useCallback<
      React.MouseEventHandler<HTMLButtonElement>
   >((event) => {
      setSelectedQuote((current) =>
         current > 0 ? current - 1 : quotes.length - 1
      );
   }, []);

   return (
      <Box as="section" w="full" py="24" bg="blue.50">
         <PageContentWrapper>
            <Flex justify="space-between" align="flex-start">
               <VStack
                  justify="flex-start"
                  align="flex-start"
                  spacing="2.5"
                  mb="10"
               >
                  {title && <SectionHeading>{title}</SectionHeading>}
                  {description && (
                     <SectionDescription richText={description} maxW="750px" />
                  )}
               </VStack>
               <HStack ml="10">
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
            <Text>{selectedQuote}</Text>
         </PageContentWrapper>
         <Box overflow="hidden">
            <PageContentWrapper>
               <MotionHStack
                  spacing="10"
                  align="flex-start"
                  animate={{ x: position }}
                  drag="x"
                  dragConstraints={{ left: position, right: 0 }}
                  dragElastic={1}
                  // dragSnapToOrigin
                  onDragEnd={(e, { offset, velocity }) => {
                     const pageOffset = -Math.round(offset.x / 490);

                     setSelectedQuote((current) => {
                        const newPage = Math.min(
                           Math.max(current + pageOffset, 0),
                           quotes.length - 1
                        );
                        console.log('CHANGE', newPage);
                        return newPage;
                     });
                  }}
               >
                  {quotes.map((quote, index) => {
                     return (
                        <MotionBox
                           key={index}
                           bg="white"
                           p="10"
                           width="450px"
                           flexShrink={0}
                        >
                           <Text color="gray.600" fontSize="4xl">
                              {index}
                           </Text>
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

const MotionHStack = motion<Omit<StackProps, 'onDragEnd'>>(HStack);

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
   return Math.abs(offset) * velocity;
};
