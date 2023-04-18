import { Box, BoxProps, Flex, forwardRef } from '@chakra-ui/react';
import React, { useEffect, useState, useRef } from 'react';

type RenderSlideProps = {
   item: any;
   isActive: boolean;
   index: number;
};

type NavigationButtonProps = {
   disabled?: boolean;
   onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

type RenderBulletProps = {
   isActive: boolean;
   onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

type SliderProps = BoxProps & {
   items: any[];
   currentIndex?: number;
   slidesPerView?: number;
   spaceBetween?: number;
   slidesToKeepOnLeft?: number;
   renderSlide: (props: RenderSlideProps) => JSX.Element;
   renderPreviousButton?: (props: NavigationButtonProps) => JSX.Element;
   renderNextButton?: (props: NavigationButtonProps) => JSX.Element;
   renderBullet?: (props: RenderBulletProps) => JSX.Element;
   onIndexChange?: (index: number) => void;
};

export const Slider = forwardRef<SliderProps, 'div'>(
   (
      {
         items,
         currentIndex: externalCurrentIndex = 0,
         slidesPerView = 1,
         spaceBetween = 0,
         slidesToKeepOnLeft = 0,
         renderSlide,
         renderPreviousButton,
         renderNextButton,
         renderBullet,
         onIndexChange,
         ...other
      },
      ref
   ) => {
      const trackRef = useRef<HTMLDivElement>(null);
      const [isDragging, setIsDragging] = useState(false);
      const [startIndex, setStartIndex] = useState<number | null>(null);
      const [dragStart, setDragStart] = useState<number | null>(null);
      const [drag, setDrag] = useState<number | null>(null);
      const [currentIndex, setCurrentIndex] = useState(externalCurrentIndex);

      const slideCount = items.length;
      const canMove = slideCount > slidesPerView;

      useEffect(() => {
         setCurrentIndex(externalCurrentIndex);
      }, [externalCurrentIndex]);

      useEffect(() => {
         onIndexChange?.(currentIndex);
      }, [currentIndex, onIndexChange]);

      useEffect(() => {
         document.addEventListener('mouseup', handleTouchEnd);
         return () => document.removeEventListener('mouseup', handleTouchEnd);
      }, [
         isDragging,
         drag,
         currentIndex,
         slideCount,
         slidesPerView,
         startIndex,
      ]);

      const handlePrevious = () => {
         setCurrentIndex((currentIndex) => Math.max(currentIndex - 1, 0));
      };

      const handleNext = () => {
         setCurrentIndex((currentIndex) =>
            Math.min(currentIndex + 1, slideCount - 1)
         );
      };

      const handleTouchStart = (
         e: React.MouseEvent | React.TouchEvent,
         index: number | null
      ) => {
         setStartIndex(index);
         setDragStart('touches' in e ? e.touches[0].clientX : e.clientX);
      };

      const handleTouchMove = (e: React.MouseEvent | React.TouchEvent) => {
         if (!dragStart || !canMove) {
            return;
         }

         e.stopPropagation();
         const currentX = 'touches' in e ? e.touches[0].clientX : e.clientX;
         if (!isDragging && Math.abs(currentX - dragStart) >= 1) {
            setIsDragging(true);
         } else {
            setDrag(currentX - dragStart);
         }
      };

      const handleTouchEnd = React.useCallback(() => {
         if (!trackRef.current?.clientWidth) return;

         if (isDragging) {
            const movement =
               drag! / (trackRef.current.clientWidth / slidesPerView);
            const roundMovement =
               Math.abs(movement) % 1 > 0.4
                  ? movement > 0
                     ? Math.ceil(movement)
                     : Math.floor(movement)
                  : movement > 0
                  ? Math.floor(movement)
                  : Math.ceil(movement);
            const newIndex = Math.min(
               Math.max(currentIndex - roundMovement, 0),
               slideCount - slidesPerView
            );
            setCurrentIndex(newIndex);
         } else if (startIndex !== null) {
            setCurrentIndex(startIndex);
         }

         setStartIndex(null);
         setDragStart(null);
         setDrag(null);
         setIsDragging(false);
      }, [
         isDragging,
         drag,
         currentIndex,
         slideCount,
         slidesPerView,
         startIndex,
      ]);

      return (
         <Box ref={ref} pos="relative" overflow="hidden" {...other}>
            <Flex
               ref={trackRef}
               sx={{ 'touch-action': 'pan-x' }}
               transition={!isDragging ? 'ease-in-out 300ms' : 'none'}
               transform={computeTransform({
                  currentIndex,
                  slideCount,
                  slidesPerView,
                  drag: drag ?? 0,
                  spaceBetween,
                  slidesToKeepOnLeft,
               })}
               onMouseMoveCapture={handleTouchMove}
               onTouchMove={handleTouchMove}
               onTouchEnd={handleTouchEnd}
            >
               {items.map((item, index) => (
                  <Box
                     key={index}
                     cursor="pointer"
                     minW={computeWidth({ slidesPerView, spaceBetween })}
                     _notFirst={{ ml: `${spaceBetween}px` }}
                     onMouseDownCapture={(e) => handleTouchStart(e, index)}
                     onTouchStart={(e) => handleTouchStart(e, index)}
                     onDragStart={(e) => e.preventDefault()}
                  >
                     {renderSlide({
                        item,
                        isActive: index === currentIndex,
                        index,
                     })}
                  </Box>
               ))}
            </Flex>

            {renderPreviousButton?.({
               disabled: currentIndex === 0,
               onClick: handlePrevious,
            })}
            {renderNextButton?.({
               disabled: currentIndex === slideCount - 1,
               onClick: handleNext,
            })}
            {renderBullet && (
               <Flex position="absolute" bottom="5" w="full" justify="center">
                  {items.map((_item, index) =>
                     renderBullet({
                        isActive: index === currentIndex,
                        onClick: () => setCurrentIndex(index),
                     })
                  )}
               </Flex>
            )}
         </Box>
      );
   }
);

type ComputeWidthProps = {
   slidesPerView: number;
   spaceBetween: number;
};
const computeWidth = ({ slidesPerView, spaceBetween }: ComputeWidthProps) => {
   return `calc((100% - ${
      (slidesPerView - 1) * spaceBetween
   }px) / ${slidesPerView})`;
};

type ComputeTranslationProps = {
   currentIndex: number;
   slideCount: number;
   slidesPerView: number;
   drag: number;
   spaceBetween: number;
   slidesToKeepOnLeft: number;
};
const computeTransform = ({
   currentIndex,
   slideCount,
   slidesPerView,
   drag,
   spaceBetween,
   slidesToKeepOnLeft,
}: ComputeTranslationProps) => {
   const slideWidth = `(100% - ${
      (slidesPerView - 1) * spaceBetween
   }px) / ${slidesPerView}`;
   const slideMargin = `${spaceBetween}px`;
   const slidesToScroll = Math.min(
      Math.max(currentIndex - slidesToKeepOnLeft, 0),
      Math.max(slideCount - slidesPerView, 0)
   );
   return `translateX(calc((${slideWidth} + ${slideMargin}) * ${-slidesToScroll} + ${
      drag ?? 0
   }px))`;
};
