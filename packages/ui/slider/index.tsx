import { Box, Flex } from '@chakra-ui/react';
import React, { useEffect, useState, useRef, ComponentType } from 'react';

type NavigationButtonProps = {
   disabled?: boolean;
   onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

type SliderProps = {
   slides: JSX.Element[];
   visibleSlides?: number;
   slideSpacing?: number;
   showNavigation?: boolean;
   PreviousButton?: ComponentType<NavigationButtonProps>;
   NextButton?: ComponentType<NavigationButtonProps>;
   currentIndex?: number;
   onIndexChange?: (index: number) => void;
};

export const Slider: React.FC<SliderProps> = ({
   slides,
   visibleSlides = 1,
   slideSpacing = 0,
   showNavigation = true,
   PreviousButton,
   NextButton,
   currentIndex = 0,
   onIndexChange,
}) => {
   const trackRef = useRef<HTMLDivElement>(null);
   const [isDragging, setIsDragging] = useState(false);
   const [startIndex, setStartIndex] = useState<number | null>(null);
   const [startX, setStartX] = useState<number | null>(null);
   const [dragX, setDragX] = useState<number | null>(null);
   const [activeIndex, setActiveIndex] = useState(currentIndex);

   const slideCount = slides.length;
   const canMove = slideCount > visibleSlides;

   useEffect(() => {
      setActiveIndex(currentIndex);
   }, [currentIndex]);

   useEffect(() => {
      onIndexChange?.(activeIndex);
   }, [activeIndex, onIndexChange]);

   useEffect(() => {
      document.addEventListener('mouseup', handleTouchEnd);
      return () => document.removeEventListener('mouseup', handleTouchEnd);
   }, [isDragging, dragX, activeIndex, slideCount, visibleSlides, startIndex]);

   const handlePrevious = () => {
      setActiveIndex((activeIndex) => Math.max(activeIndex - 1, 0));
   };

   const handleNext = () => {
      setActiveIndex((activeIndex) =>
         Math.min(activeIndex + 1, slideCount - 1)
      );
   };

   const handleTouchStart = (
      e: React.MouseEvent | React.TouchEvent,
      index: number | null
   ) => {
      setStartIndex(index);
      setStartX('touches' in e ? e.touches[0].clientX : e.clientX);
   };

   const handleTouchMove = (e: React.MouseEvent | React.TouchEvent) => {
      if (!startX || !canMove) {
         return;
      }

      e.stopPropagation();
      const currentX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      if (!isDragging && Math.abs(currentX - startX) >= 1) {
         setIsDragging(true);
      } else {
         setDragX(currentX - startX);
      }
   };

   const handleTouchEnd = React.useCallback(() => {
      if (!trackRef.current?.clientWidth) return;

      if (isDragging) {
         const movement =
            dragX! / (trackRef.current.clientWidth / visibleSlides);
         const roundMovement =
            Math.abs(movement) % 1 > 0.4
               ? movement > 0
                  ? Math.ceil(movement)
                  : Math.floor(movement)
               : movement > 0
               ? Math.floor(movement)
               : Math.ceil(movement);
         const newIndex = Math.min(
            Math.max(activeIndex - roundMovement, 0),
            slideCount - visibleSlides
         );
         setActiveIndex(newIndex);
      } else if (startIndex !== null) {
         setActiveIndex(startIndex);
      }

      setStartIndex(null);
      setStartX(null);
      setDragX(null);
      setIsDragging(false);
   }, [isDragging, dragX, activeIndex, slideCount, visibleSlides, startIndex]);

   return (
      <Box pos="relative" overflow="hidden">
         <Flex
            ref={trackRef}
            sx={{
               'touch-action': 'pan-x',
            }}
            transition={!isDragging ? 'ease-in-out 300ms' : 'none'}
            transform={`translateX(calc(${
               -(
                  Math.min(
                     activeIndex,
                     Math.max(slideCount - visibleSlides, 0)
                  ) / visibleSlides
               ) * 100
            }% + ${dragX ?? 0}px - ${
               slideSpacing *
               4 *
               ((activeIndex < Math.max(slideCount - visibleSlides, 0)
                  ? activeIndex
                  : Math.max(slideCount - visibleSlides, 0)) /
                  visibleSlides)
            }px))`}
            onMouseMoveCapture={handleTouchMove}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
         >
            {slides.map((slide, i) => (
               <Box
                  key={i}
                  minW={`calc((100% - ${
                     (visibleSlides - 1) * slideSpacing * 4
                  }px) / ${visibleSlides})`}
                  _notFirst={{ ml: slideSpacing }}
                  onMouseDownCapture={(e) => handleTouchStart(e, i)}
                  onTouchStart={(e) => handleTouchStart(e, i)}
                  onDragStart={(e) => e.preventDefault()}
                  cursor="pointer"
               >
                  <Box>{slide}</Box>
               </Box>
            ))}
         </Flex>

         {showNavigation && (
            <>
               {PreviousButton && (
                  <PreviousButton
                     disabled={activeIndex === 0}
                     onClick={handlePrevious}
                  />
               )}
               {NextButton && (
                  <NextButton
                     disabled={activeIndex === slideCount - 1}
                     onClick={handleNext}
                  />
               )}
            </>
         )}
      </Box>
   );
};
