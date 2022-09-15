import React from 'react';
import Swiper from 'swiper';

// Swiper react API is not entirely reactive. Often only the main swiper props is updated
// This wrapper uses the event based api and exposes reactive props
// It allows to make swiper controllable via slideIndex and onSlideChange

type UseSwiperProps = {
   slideIndex?: number;
   totalSlides: number;
   showThumbnails?: boolean;
   onSlideChange?: (slideIndex: number) => void;
};

export function useSwiper({
   slideIndex,
   totalSlides,
   showThumbnails,
   onSlideChange,
}: UseSwiperProps) {
   const lastSlideIndex = totalSlides > 0 ? totalSlides - 1 : 0;
   const onSlideChangeRef = React.useRef<(swiper: Swiper) => void>();
   const [mainSwiper, setMainSwiper] = React.useState<Swiper | null>(null);
   const [thumbsSwiper, setThumbsSwiper] = React.useState<Swiper | null>(null);

   const [{ realIndex, isBeginning, isEnd }, setNavigationConfig] =
      React.useState({
         realIndex: slideIndex ?? 0,
         isBeginning: true,
         // We are showing always at least two slides
         isEnd: false,
      });

   React.useEffect(() => {
      const slideChangeCallback = (swiper: Swiper) => {
         const { realIndex, isBeginning, isEnd } = swiper;
         setNavigationConfig({ realIndex, isBeginning, isEnd });
         onSlideChange?.(swiper.realIndex);
      };
      if (onSlideChangeRef.current) {
         mainSwiper?.off('slideChange', onSlideChangeRef.current);
      }
      mainSwiper?.on('slideChange', slideChangeCallback);
      onSlideChangeRef.current = slideChangeCallback;
   }, [mainSwiper, onSlideChange]);

   React.useEffect(() => {
      if (slideIndex != null) {
         if (mainSwiper && !mainSwiper.destroyed && slideIndex != null) {
            mainSwiper.slideTo(slideIndex);
         }
      }
      setNavigationConfig({
         realIndex: slideIndex ?? 0,
         isBeginning: (slideIndex ?? 0) === 0,
         isEnd: (slideIndex ?? 0) === lastSlideIndex,
      });
   }, [slideIndex, totalSlides, lastSlideIndex, mainSwiper]);

   React.useEffect(() => {
      if (!showThumbnails) {
         setThumbsSwiper(null);
      }
   }, [showThumbnails]);

   return {
      mainSwiper,
      setMainSwiper,
      thumbsSwiper,
      setThumbsSwiper,
      realIndex,
      isBeginning,
      isEnd,
   };
}
