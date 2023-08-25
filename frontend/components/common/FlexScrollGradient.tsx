import {
   Flex,
   FlexProps,
   SystemStyleObject,
   useMergeRefs,
} from '@chakra-ui/react';
import { useRef, forwardRef, useState } from 'react';
import { useIsomorphicLayoutEffect } from '@ifixit/ui';

type InnerFlexStyling = {
   _after: SystemStyleObject;
   _before: SystemStyleObject;
   overflowX?: FlexProps['overflowX'];
   overflowY?: FlexProps['overflowY'];
};

const gradientSizes = { base: 50, sm: 75, md: 90, lg: 100 };

const sharedStyle: SystemStyleObject = {
   content: '""',
   position: 'absolute',
   height: '100%',
   pointerEvents: 'none',
   zIndex: 9999,
};

function easeInOutQuad(x: number): number {
   return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}

enum FlexScrollDirection {
   ROW,
   COLUMN,
}

function getScrollDirection(el: HTMLElement): FlexScrollDirection {
   const { flexDirection } = window.getComputedStyle(el);
   if (flexDirection === 'column') {
      return FlexScrollDirection.COLUMN;
   } else {
      return FlexScrollDirection.ROW;
   }
}

function getGradientsBaseStyle(
   scrollDirection: FlexScrollDirection,
   gradientSizePX: number,
   color = '#f9fafb'
) {
   const beforeStart =
      scrollDirection === FlexScrollDirection.ROW ? 'left' : 'top';
   const afterStart =
      scrollDirection === FlexScrollDirection.ROW ? 'right' : 'bottom';

   const beforeBackgroundDegrees =
      scrollDirection === FlexScrollDirection.ROW ? 270 : 0;
   const afterBackgroundDegrees =
      scrollDirection === FlexScrollDirection.ROW ? 90 : 180;

   const gradientSizeProp =
      scrollDirection === FlexScrollDirection.ROW ? 'width' : 'height';

   return {
      before: {
         ...sharedStyle,
         [gradientSizeProp]: `${gradientSizePX}px`,
         [beforeStart]: '0px',
         background: `linear-gradient(${beforeBackgroundDegrees}deg, rgba(249, 250, 251, 0) 0%, ${color} 106.41%)`,
      },
      after: {
         ...sharedStyle,
         [gradientSizeProp]: `${gradientSizePX}px`,
         [afterStart]: '0px',
         background: `linear-gradient(${afterBackgroundDegrees}deg, rgba(249, 250, 251, 0) 0%, ${color} 106.41%)`,
      },
   };
}

function getGradientStyleProps(el: HTMLElement): InnerFlexStyling {
   const flexScrollDirection = getScrollDirection(el);
   const {
      // Used for both calcs
      clientWidth,
      clientHeight,
      // Used for ROWs
      scrollWidth,
      scrollLeft,
      // Used for COLUMNs
      scrollHeight,
      scrollTop,
   } = el;

   const isScrollable =
      flexScrollDirection === FlexScrollDirection.ROW
         ? scrollWidth > clientWidth
         : scrollHeight > clientHeight;

   if (!isScrollable) {
      return {
         _before: { opacity: 0, height: 0 },
         _after: { opacity: 0, height: 0 },
      };
   }

   const start =
      flexScrollDirection === FlexScrollDirection.ROW ? scrollLeft : scrollTop;
   const windowSpace =
      flexScrollDirection === FlexScrollDirection.ROW
         ? clientWidth
         : clientHeight;
   const gradientSpace =
      flexScrollDirection === FlexScrollDirection.ROW
         ? clientHeight
         : clientWidth;
   const scrollSpace =
      flexScrollDirection === FlexScrollDirection.ROW
         ? scrollWidth
         : scrollHeight;
   const sizeProp =
      flexScrollDirection === FlexScrollDirection.ROW ? 'height' : 'width';

   const scrollPosition = start + windowSpace;
   const gradientSizePX = getGradientSize(windowSpace);
   const afterStart = scrollSpace - gradientSizePX;

   const size = `${gradientSpace}px`;

   const beforeGradientShownPercent =
      start < gradientSizePX ? start / gradientSizePX : 1;

   const afterGradientShownPercent =
      scrollPosition >= afterStart
         ? 1 - (scrollPosition - afterStart) / gradientSizePX
         : 1;

   const beforeGradientOpacity = easeInOutQuad(
      Math.max(0, beforeGradientShownPercent)
   );

   const afterGradientOpacity = easeInOutQuad(
      Math.max(0, afterGradientShownPercent)
   );

   const { before, after } = getGradientsBaseStyle(
      flexScrollDirection,
      gradientSizePX
   );

   const { borderRadius } = window.getComputedStyle(el);

   const overflowX =
      flexScrollDirection === FlexScrollDirection.ROW ? 'auto' : undefined;
   const overflowY =
      flexScrollDirection === FlexScrollDirection.ROW ? undefined : 'auto';

   return {
      _before: {
         ...before,
         opacity: beforeGradientOpacity,
         [sizeProp]: size,
         borderRadius,
      },
      _after: {
         ...after,
         opacity: afterGradientOpacity,
         [sizeProp]: size,
         borderRadius,
      },
      overflowX,
      overflowY,
   };
}

function getGradientSize(elSize: number): number {
   if (elSize < 576) {
      return gradientSizes.base;
   } else if (elSize < 768) {
      return gradientSizes.sm;
   } else if (elSize < 1028) {
      return gradientSizes.md;
   } else {
      return gradientSizes.lg;
   }
}

export const FlexScrollGradient = forwardRef(function FlexScrollGradient(
   {
      nestedFlexProps,
      ...props
   }: FlexProps & {
      nestedFlexProps?: FlexProps;
   },
   ref
) {
   const internalRef = useRef<HTMLDivElement>();
   const refs = useMergeRefs(internalRef, ref);

   const [flexScrollState, setFlexScrollState] = useState<InnerFlexStyling>({
      _before: { opacity: 0 },
      _after: { opacity: 0 },
   });

   useIsomorphicLayoutEffect(() => {
      const el = internalRef.current;
      if (!el) {
         return;
      }

      const doMeasure = (el: HTMLElement) => {
         const state = getGradientStyleProps(el);
         setFlexScrollState(() => state);
      };

      const measure = () => {
         doMeasure(el);
      };

      measure();

      el.addEventListener('transitionend', measure, { passive: true });
      el.addEventListener('scroll', measure, { passive: true });
      window.addEventListener('resize', measure, { passive: true });

      return () => {
         el.removeEventListener('transitionend', measure);
         el.removeEventListener('scroll', measure);
         window.removeEventListener('resize', measure);
      };
   }, [internalRef]);

   if (props.position) {
      throw new Error(
         'FlexScrollGradient: position prop is not allowed. To get the gradient working we must use position relative. Wrap your component in another layer to handle positioning.'
      );
   }

   return (
      <Flex {...props} position="relative" isolation="isolate">
         <Flex
            ref={refs}
            {...nestedFlexProps}
            overflowX={flexScrollState.overflowX}
            overflowY={flexScrollState.overflowY}
            _before={flexScrollState._before}
            _after={flexScrollState._after}
         >
            {props.children}
         </Flex>
      </Flex>
   );
});
