import { keyframes } from '@chakra-ui/react';

export const slideIn = keyframes`
   from {
      height: 0;
   }
   to {
      height: var(--slide-height);
   }
`;

export const slideOut = keyframes`
   from {
      height: var(--slide-height);
   }
   to {
      height: 0;
   }
`;

export const fadeIn = keyframes`
   from {
      opacity: 0;
   }
   to {
      opacity: 1;
   }
`;

export const fadeOut = keyframes`
   from {
      opacity: 1;
   }
   to {
      opacity: 0;
   }
`;

export const slideFadeIn = keyframes`
   from {
      height: 0;
      opacity: 0;
   }
   to {
      height: var(--slide-height);
      opacity: 1;
   }
`;

export const slideFadeOut = keyframes`
   from {
      height: var(--slide-height);
      opacity: 1;
   }
   to {
      height: 0;
      opacity: 0;
   }
`;
