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
   const [mainSwiper, setMainSwiper] = React.useState<Swiper | null>(null);
   const [thumbsSwiper, setThumbsSwiper] = React.useState<Swiper | null>(null);
   const slideChangeCallbackRef = React.useRef<(swiper: Swiper) => void>();
   const slideNextTransitionStartCallbackRef =
      React.useRef<(swiper: Swiper) => void>();
   const slidePrevTransitionStartCallbackRef =
      React.useRef<(swiper: Swiper) => void>();
   const snapIndexChangeCallbackRef = React.useRef<(swiper: Swiper) => void>();

   const [{ realIndex, snapIndex, isBeginning, isEnd }, setNavigationConfig] =
      React.useState({
         realIndex: slideIndex ?? 0,
         snapIndex: 0,
         isBeginning: true,
         isEnd: false,
      });

   React.useEffect(() => {
      if (!showThumbnails) {
         setThumbsSwiper(null);
      }
   }, [showThumbnails]);

   React.useEffect(() => {
      if (mainSwiper && !mainSwiper.destroyed && slideIndex != null) {
         mainSwiper.slideTo(slideIndex);
         setNavigationConfig((navigationConfig) => ({
            ...navigationConfig,
            realIndex: slideIndex ?? 0,
            isBeginning: (slideIndex ?? 0) === 0,
            isEnd: (slideIndex ?? 0) === lastSlideIndex,
         }));
      }
   }, [slideIndex, lastSlideIndex, mainSwiper]);

   React.useEffect(() => {
      const slideChangeCallback = (swiper: Swiper) => {
         const { realIndex, isBeginning, isEnd } = swiper;
         setNavigationConfig((navigationConfig) => ({
            ...navigationConfig,
            realIndex,
            snapIndex: realIndex - 1 > 0 ? realIndex - 1 : 0,
            isBeginning,
            isEnd,
         }));
         onSlideChange?.(swiper.realIndex);
      };
      const slideNextTransitionStartCallback = (swiper: Swiper) => {
         const { realIndex } = swiper;
         if (thumbsSwiper && realIndex > thumbsSwiper.realIndex + 1) {
            thumbsSwiper?.slideTo(realIndex - 1);
         }
      };
      const slidePrevTransitionStartCallback = (swiper: Swiper) => {
         const { realIndex } = swiper;
         if (thumbsSwiper && realIndex < thumbsSwiper.realIndex + 1) {
            thumbsSwiper?.slideTo(realIndex - 1);
         }
      };
      const snapIndexChangeCallback = (swiper: Swiper) => {
         setNavigationConfig((navigationConfig) => ({
            ...navigationConfig,
            snapIndex: swiper.snapIndex,
         }));
      };

      if (slideChangeCallbackRef.current) {
         mainSwiper?.off('slideChange', slideChangeCallbackRef.current);
      }
      if (slideNextTransitionStartCallbackRef.current) {
         mainSwiper?.off(
            'slideNextTransitionStart',
            slideNextTransitionStartCallbackRef.current
         );
      }
      if (slidePrevTransitionStartCallbackRef.current) {
         mainSwiper?.off(
            'slidePrevTransitionStart',
            slidePrevTransitionStartCallbackRef.current
         );
      }
      if (snapIndexChangeCallbackRef.current) {
         thumbsSwiper?.off(
            'snapIndexChange',
            snapIndexChangeCallbackRef.current
         );
      }

      mainSwiper?.on('slideChange', slideChangeCallback);
      slideChangeCallbackRef.current = slideChangeCallback;
      mainSwiper?.on(
         'slideNextTransitionStart',
         slideNextTransitionStartCallback
      );
      slideNextTransitionStartCallbackRef.current =
         slideNextTransitionStartCallback;
      mainSwiper?.on(
         'slidePrevTransitionStart',
         slidePrevTransitionStartCallback
      );
      slidePrevTransitionStartCallbackRef.current =
         slideNextTransitionStartCallback;
      thumbsSwiper?.on('snapIndexChange', snapIndexChangeCallback);
      snapIndexChangeCallbackRef.current = snapIndexChangeCallback;
   }, [mainSwiper, thumbsSwiper, onSlideChange]);

   return {
      mainSwiper,
      setMainSwiper,
      thumbsSwiper,
      setThumbsSwiper,
      realIndex,
      snapIndex,
      isBeginning,
      isEnd,
   };
}
