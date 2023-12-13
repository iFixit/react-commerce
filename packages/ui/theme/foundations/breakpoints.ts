import type { ThemeOverride } from '@chakra-ui/react';
import { breakpoint as primitiveBreakpoint } from '@core-ds/primitives';

export const breakpoints: ThemeOverride['breakpoints'] = {
   sm: primitiveBreakpoint.sm,
   md: primitiveBreakpoint.md,
   mdPlus: `769px`, // chakra uses min-width @media queries, so we need 'md' + 1px
   lg: primitiveBreakpoint.lg,
   xl: primitiveBreakpoint.xl,
   '2xl': primitiveBreakpoint['2xl'],
};
