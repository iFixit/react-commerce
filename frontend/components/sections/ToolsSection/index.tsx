import { Box, Flex, keyframes } from '@chakra-ui/react';
import { SectionDescription } from '../SectionDescription';
import { SectionHeaderWrapper } from '../SectionHeaderWrapper';
import { SectionHeading } from '../SectionHeading';

import React from 'react';
import { toolsData } from './toolsData';
import { ResponsiveImage } from '@ifixit/ui/misc';

export interface ToolsSectionProps {
   id: string;
}

export function ToolsSection({ id }: ToolsSectionProps) {
   const selectedToolIndexRef = React.useRef(6);
   const containerRef = React.useRef<HTMLDivElement>(null);
   const trackRef = React.useRef<HTMLDivElement>(null);
   const toolRefs = React.useRef<(HTMLDivElement | null)[]>([]);

   const [selectedTool, setSelectedTool] = React.useState(
      toolsData[selectedToolIndexRef.current]
   );

   // to control the scroll selection while a programmatic scroll is in flight
   const [isScrolling, setScrolling] = React.useState(false);

   const centerTool = React.useCallback(
      (item: HTMLDivElement | null) => {
         const track = trackRef.current;
         if (item && track) {
            const imageRect = item.getBoundingClientRect();
            const trackRect = track.getBoundingClientRect();
            const scrollLeftOffset =
               imageRect.left - trackRect.left + imageRect.width / 2;
            containerRef.current?.scroll({
               left: scrollLeftOffset,
               behavior: 'smooth',
            });
         }
      },
      [containerRef]
   );

   React.useEffect(() => {
      const sectionElement = containerRef.current;
      if (!sectionElement) {
         return;
      }

      const onResize = () => {
         centerTool(toolRefs.current[selectedToolIndexRef.current]);
      };
      const observer = new ResizeObserver(onResize);
      observer.observe(sectionElement);
      return () => {
         observer?.unobserve(sectionElement);
      };
   }, [containerRef, centerTool]);

   React.useEffect(() => {
      if (isScrolling) {
         setTimeout(() => setScrolling(false), 500);
      }
   }, [isScrolling]);

   const handleScroll = React.useCallback(() => {
      if (!isScrolling) {
         let nearestToolIndex = 0;
         let nearestToolOffset = Infinity;
         const screenCenter = containerRef.current!.offsetWidth / 2;

         const items = toolRefs.current;
         for (let i = 0; i < items.length; i++) {
            const rect = items[i]!.getBoundingClientRect();
            const offset = Math.abs(rect.x - screenCenter);
            if (offset < nearestToolOffset) {
               nearestToolOffset = offset;
               nearestToolIndex = i;
            }
         }
         if (selectedToolIndexRef.current !== nearestToolIndex) {
            selectedToolIndexRef.current = nearestToolIndex;
            setSelectedTool(toolsData[selectedToolIndexRef.current]);
         }
      }
   }, [containerRef, isScrolling]);

   const handleClick = (index: number) => {
      selectedToolIndexRef.current = index;
      setScrolling(true);
      setSelectedTool(toolsData[selectedToolIndexRef.current]);
      centerTool(toolRefs.current[selectedToolIndexRef.current]);
   };

   return (
      <Box id={id} as="section" py="16" fontSize="sm" bg="blueGray.50">
         <Flex
            w="full"
            overflow="hidden"
            overflowX="scroll"
            ref={containerRef}
            onScroll={handleScroll}
            sx={{
               '&::-webkit-scrollbar': { display: 'none' },
               '&::-moz-scrollbar': { display: 'none' },
               '&::-ms-Scrollbar': { display: 'none' },
               msOverflowStyle: 'none',
               scrollbarWidth: 'none',
            }}
         >
            <Box w="calc(100%/2)" flex="none" />
            <Flex
               ref={trackRef}
               alignItems="flex-end"
               overflow="visible"
               gap="16"
               pt="2"
            >
               {toolsData.map(({ type, ...tool }, index) => {
                  const { width, height } = tool.imageSize;
                  return (
                     <Flex
                        key={type}
                        ref={(el) => (toolRefs.current[index] = el)}
                        position="relative"
                        alignItems="flex-end"
                     >
                        <tool.shape
                           onClick={() => handleClick(index)}
                           sx={{
                              strokeDasharray: 1000,
                              animation:
                                 selectedToolIndexRef.current === index
                                    ? `${dashDissolve} .7s linear forwards`
                                    : 'none',
                           }}
                        />
                        <ResponsiveImage
                           alt={tool.title}
                           src={tool.imageUrl}
                           width={width}
                           height={height}
                           style={{
                              opacity:
                                 selectedToolIndexRef.current === index ? 1 : 0,
                              position: 'absolute',
                              maxWidth: 'unset',
                              transition: 'opacity 300ms ease-in',
                              transitionDelay: '500ms',
                              pointerEvents: 'none',
                              ...tool.imageStyle,
                           }}
                        />
                     </Flex>
                  );
               })}
            </Flex>
            <Box w="calc(100%/2)" flex="none" />
         </Flex>
         <SectionHeaderWrapper
            textAlign="center"
            mt={{
               base: 6,
               md: 12,
            }}
         >
            <SectionHeading>{selectedTool.title}</SectionHeading>
            {selectedTool.description && (
               <SectionDescription mt="4" richText={selectedTool.description} />
            )}
         </SectionHeaderWrapper>
      </Box>
   );
}

const dashDissolve = keyframes`
   0% {
      stroke-dashoffset: 0;
   }
   75% {
      opacity: 1;
   }
   100% {
      stroke-dashoffset: 1000;
      opacity: 0;
   }
`;
