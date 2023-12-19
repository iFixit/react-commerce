import { Box, BoxProps, Flex, forwardRef } from '@chakra-ui/react';
import React from 'react';

type RenderSlideProps = {
   item: any;
   index: number;
   activeIndex: number;
   isActive: boolean;
   isLooping: boolean;
};

type NavigationButtonProps = {
   disabled?: boolean;
   onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

type RenderBulletsProps = {
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
   renderBullets?: boolean | ((props: RenderBulletsProps) => JSX.Element);
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
         renderBullets,
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
      const [isLooping, setLooping] = React.useState(false);

      const dragX = React.useRef<number | null>(null);
      const isDragging = React.useRef(false);
      const controlsEnabled = React.useRef(true);

      const items = React.useMemo(
         () =>
            loop
               ? createArrayWithPrefixAndTail({
                    items: inputItems,
                    tailLength: loopTailsLength,
                 })
               : inputItems,
         [inputItems, loopTailsLength, loop]
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
         document.addEventListener('mouseup', handleTouchEnd);
         return () => document.removeEventListener('mouseup', handleTouchEnd);
      }, [activeIndex, slideCount, visibleSlides, touchIndex]);

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
         if (!isDragging.current && Math.abs(currentX - touchX) >= 1) {
            isDragging.current = true;
            trackRef.current.style.transition = 'none';
         } else {
            const newDragX = currentX - touchX;
            dragX.current = newDragX;

            // Directly update the component's style
            trackRef.current.style.transform = computeTransform({
               activeIndex,
               slideCount,
               slidesPerView: visibleSlides,
               drag: newDragX,
               spaceBetween,
               slidesToKeepOnLeft,
            });
         }
      };

      const handleTouchEnd = React.useCallback(() => {
         if (!trackRef.current?.clientWidth) return;

         if (isDragging.current) {
            const movement =
               dragX.current! / (trackRef.current.clientWidth / visibleSlides);
            const roundMovement =
               Math.abs(movement) % 1 > 0.2
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
         dragX.current = null;
         trackRef.current.style.transform = '';
         trackRef.current.style.transition = 'transform ease-in-out 300ms';
         isDragging.current = false;
      }, [activeIndex, slideCount, visibleSlides, touchIndex]);

      const handleTransitionEnd = (e: React.TransitionEvent) => {
         if (loop && e.propertyName === 'transform') {
            const outOfBound =
               activeIndex < loopTailsLength ||
               activeIndex >= loopTailsLength + inputItems.length;
            if (outOfBound) {
               setLooping(true);
               trackRef.current!.style.transition = 'none';
               controlsEnabled.current = false;
               const inBoundIndex =
                  activeIndex < loopTailsLength
                     ? loopTailsLength +
                       inputItems.length -
                       ((loopTailsLength - activeIndex) % inputItems.length)
                     : loopTailsLength +
                       (activeIndex - (loopTailsLength + inputItems.length));
               setActiveIndex(inBoundIndex);
               setTimeout(() => {
                  setLooping(false);
                  controlsEnabled.current = true;
                  trackRef.current!.style.transition =
                     'transform ease-in-out 300ms';
               }, 300);
            } else {
               controlsEnabled.current = true;
            }
         }
      };

      return (
         <Box ref={ref} pos="relative" overflow="hidden" {...other}>
            <Flex
               ref={trackRef}
               sx={{ touchAction: 'pan-y' }}
               transition="transform ease-in-out 300ms"
               transform={computeTransform({
                  activeIndex: activeIndex,
                  slideCount,
                  slidesPerView: visibleSlides,
                  drag: dragX.current ?? 0,
                  spaceBetween,
                  slidesToKeepOnLeft,
               })}
               onMouseMoveCapture={handleTouchMove}
               onTouchMove={handleTouchMove}
               onTouchEnd={handleTouchEnd}
               onTransitionEnd={handleTransitionEnd}
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
                        activeIndex,
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
            {renderBullets && (
               <Flex position="absolute" bottom="5" w="full" justify="center">
                  {items.map((item, index) =>
                     typeof renderBullets === 'function' ? (
                        renderBullets({
                           isActive: index === activeIndex,
                           onClick: () => handleBulletClick(index),
                        })
                     ) : (
                        <Bullet
                           key={index}
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
   return `translate3d(calc((${slideWidth} + ${slideMargin}) * ${-slidesToScroll} + ${
      drag ?? 0
   }px), 0, 0)`;
}

type CreateArrayWithPrefixAndTailProps = {
   items: any[];
   tailLength: number;
};
function createArrayWithPrefixAndTail({
   items,
   tailLength,
}: CreateArrayWithPrefixAndTailProps) {
   if (tailLength <= 0) {
      return items;
   }

   const originalLength = items.length;
   const repetitions = Math.ceil(tailLength / originalLength) + 1;

   const repeatedItems = Array.from({ length: repetitions }).reduce(
      (acc: any[]) => acc.concat(items),
      []
   );
   const shiftedItems = repeatedItems.slice(-tailLength).concat(repeatedItems);

   return shiftedItems.slice(0, originalLength + 2 * tailLength);
}

function Bullet({ isActive, onClick }: RenderBulletsProps) {
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
         aria-label="active image"
      />
   );
}
