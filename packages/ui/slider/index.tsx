import { Box, BoxProps, Flex, forwardRef } from '@chakra-ui/react';
import React from 'react';

type RenderSlideProps = {
   item: any;
   index: number;
   isActive: boolean;
   isLooping: boolean;
};

type NavigationButtonProps = {
   disabled?: boolean;
   onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

type RenderBulletProps = {
   isActive?: boolean;
   onClick?: React.MouseEventHandler<any>;
};

type SliderProps = BoxProps & {
   items: any[];
   activeIndex?: number;
   visibleSlides?: number;
   spaceBetween?: number;
   slidesToKeepOnLeft?: number;
   loop?: boolean;
   loopTailsLength?: number;
   renderSlide: (props: RenderSlideProps) => JSX.Element;
   renderPreviousButton?: (props: NavigationButtonProps) => JSX.Element;
   renderNextButton?: (props: NavigationButtonProps) => JSX.Element;
   renderBullet?: boolean | ((props: RenderBulletProps) => JSX.Element);
   onIndexChange?: (index: number) => void;
};

export const Slider = forwardRef<SliderProps, 'div'>(
   (
      {
         items: inputItems,
         activeIndex: inputActiveIndex = 0,
         visibleSlides = 1,
         spaceBetween = 0,
         slidesToKeepOnLeft = 0,
         loop = false,
         loopTailsLength = 1,
         renderSlide,
         renderPreviousButton,
         renderNextButton,
         renderBullet,
         onIndexChange,
         ...other
      },
      ref
   ) => {
      const trackRef = React.useRef<HTMLDivElement>(null);
      const [activeIndex, setActiveIndex] = React.useState(
         loop ? inputActiveIndex + loopTailsLength : inputActiveIndex
      );
      const [touchIndex, setTouchIndex] = React.useState<number | null>(null);
      const [touchX, setTouchX] = React.useState<number | null>(null);
      const [isDragging, setIsDragging] = React.useState(false);
      const [dragX, setDragX] = React.useState<number | null>(null);
      const [isLooping, setIsLooping] = React.useState(false);

      const controlsEnabled = React.useRef(false);

      const items = React.useMemo(
         () =>
            loop
               ? createArrayWithPrefixAndTail({
                    items: inputItems,
                    tailLength: loopTailsLength,
                 })
               : inputItems,
         [inputItems, loopTailsLength]
      );

      const slideCount = items.length + ((loop && loopTailsLength) || 0);
      const canMove = slideCount > visibleSlides;

      React.useEffect(() => {
         setActiveIndex(
            loop ? inputActiveIndex + loopTailsLength : inputActiveIndex
         );
      }, [inputActiveIndex]);

      React.useEffect(() => {
         onIndexChange?.(activeIndex);
      }, [activeIndex, onIndexChange]);

      React.useEffect(() => {
         if (isLooping === false) {
            controlsEnabled.current = true;
         }
      }, [isLooping]);

      React.useEffect(() => {
         document.addEventListener('mouseup', handleTouchEnd);
         return () => document.removeEventListener('mouseup', handleTouchEnd);
      }, [
         isDragging,
         dragX,
         activeIndex,
         slideCount,
         visibleSlides,
         touchIndex,
      ]);

      const handlePrevious = () => {
         if (controlsEnabled.current) {
            if (loop) {
               controlsEnabled.current = false;
            }
            setActiveIndex((activeIndex) => Math.max(activeIndex - 1, 0));
         }
      };

      const handleNext = () => {
         if (controlsEnabled.current) {
            if (loop) {
               controlsEnabled.current = false;
            }
            setActiveIndex((activeIndex) =>
               Math.min(activeIndex + 1, slideCount - 1)
            );
         }
      };

      const handleBulletClick = (index: number) => {
         if (controlsEnabled.current) {
            if (loop) {
               controlsEnabled.current = false;
            }
            setActiveIndex(index);
         }
      };

      const handleTouchStart = (
         e: React.MouseEvent | React.TouchEvent,
         index: number | null
      ) => {
         setTouchIndex(index);
         setTouchX('touches' in e ? e.touches[0].clientX : e.clientX);
      };

      const handleTouchMove = (e: React.MouseEvent | React.TouchEvent) => {
         if (!touchX || !canMove || !trackRef.current) return;

         e.stopPropagation();
         const currentX = 'touches' in e ? e.touches[0].clientX : e.clientX;
         if (!isDragging && Math.abs(currentX - touchX) >= 1) {
            setIsDragging(true);
         } else {
            setDragX(currentX - touchX);
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
         } else if (touchIndex !== null) {
            setActiveIndex(touchIndex);
         }

         setTouchIndex(null);
         setTouchX(null);
         setDragX(null);
         setIsDragging(false);
      }, [
         isDragging,
         dragX,
         activeIndex,
         slideCount,
         visibleSlides,
         touchIndex,
      ]);

      const handleTransitionEnd = () => {
         if (loop) {
            const outOfBound =
               activeIndex < loopTailsLength ||
               activeIndex >= loopTailsLength + inputItems.length;
            if (outOfBound) {
               setIsLooping(true);
               const inBoundIndex =
                  activeIndex < loopTailsLength
                     ? loopTailsLength + inputItems.length - 1
                     : loopTailsLength;
               setActiveIndex(inBoundIndex);
               setTimeout(() => setIsLooping(false));
            } else {
               controlsEnabled.current = true;
            }
         }
      };

      return (
         <Box ref={ref} pos="relative" overflow="hidden" {...other}>
            <Flex
               ref={trackRef}
               sx={{ 'touch-action': 'pan-x' }}
               transition={
                  isDragging || isLooping ? 'none' : 'ease-in-out 300ms'
               }
               transform={computeTransform({
                  activeIndex: activeIndex,
                  slideCount,
                  slidesPerView: visibleSlides,
                  drag: dragX ?? 0,
                  spaceBetween,
                  slidesToKeepOnLeft,
               })}
               onMouseMoveCapture={handleTouchMove}
               onTouchMove={handleTouchMove}
               onTouchEnd={handleTouchEnd}
               onTransitionEndCapture={handleTransitionEnd}
            >
               {items.map((item, index) => (
                  <Box
                     key={index}
                     cursor="pointer"
                     minW={computeWidth({
                        slidesPerView: visibleSlides,
                        spaceBetween,
                     })}
                     _notFirst={{ ml: `${spaceBetween}px` }}
                     onMouseDownCapture={(e) => handleTouchStart(e, index)}
                     onTouchStart={(e) => handleTouchStart(e, index)}
                     onDragStart={(e) => e.preventDefault()}
                  >
                     {renderSlide({
                        item,
                        index,
                        isActive: index === activeIndex,
                        isLooping,
                     })}
                  </Box>
               ))}
            </Flex>

            {renderPreviousButton?.({
               disabled: activeIndex === 0,
               onClick: handlePrevious,
            })}
            {renderNextButton?.({
               disabled: activeIndex === slideCount - 1,
               onClick: handleNext,
            })}
            {renderBullet && (
               <Flex position="absolute" bottom="5" w="full" justify="center">
                  {items.map((item, index) =>
                     typeof renderBullet === 'function' ? (
                        renderBullet({
                           isActive: index === activeIndex,
                           onClick: () => handleBulletClick(index),
                        })
                     ) : (
                        <Bullet
                           isActive={index === activeIndex}
                           onClick={() => handleBulletClick(index)}
                        />
                     )
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
function computeWidth({ slidesPerView, spaceBetween }: ComputeWidthProps) {
   return `calc((100% - ${
      (slidesPerView - 1) * spaceBetween
   }px) / ${slidesPerView})`;
}

type ComputeTranslationProps = {
   activeIndex: number;
   slideCount: number;
   slidesPerView: number;
   drag: number;
   spaceBetween: number;
   slidesToKeepOnLeft: number;
};
function computeTransform({
   activeIndex,
   slideCount,
   slidesPerView,
   drag,
   spaceBetween,
   slidesToKeepOnLeft,
}: ComputeTranslationProps) {
   const slideWidth = `(100% - ${
      (slidesPerView - 1) * spaceBetween
   }px) / ${slidesPerView}`;
   const slideMargin = `${spaceBetween}px`;
   const slidesToScroll = Math.min(
      Math.max(activeIndex - slidesToKeepOnLeft, 0),
      Math.max(slideCount - slidesPerView, 0)
   );
   return `translateX(calc((${slideWidth} + ${slideMargin}) * ${-slidesToScroll} + ${
      drag ?? 0
   }px))`;
}

type CreateArrayWithPrefixAndTailProps = {
   items: any[];
   tailLength: number;
};
function createArrayWithPrefixAndTail({
   items,
   tailLength,
}: CreateArrayWithPrefixAndTailProps) {
   const result = [];
   const originalLength = items.length;

   if (tailLength <= 0) {
      return items;
   }

   for (let i = tailLength; i > 0; i--) {
      result.push(
         items[(originalLength - i + originalLength) % originalLength]
      );
   }
   for (let i = 0; i < originalLength + tailLength; i++) {
      result.push(items[i % originalLength]);
   }

   return result.map((item) => item);
}

function Bullet({ isActive, onClick }: RenderBulletProps) {
   return (
      <Box
         w="2"
         h="2"
         as="button"
         borderRadius="full"
         bg={isActive ? 'gray.500' : 'gray.200'}
         _notFirst={{ ml: 1 }}
         transition="all 300ms"
         cursor="pointer"
         onClick={onClick}
      />
   );
}
