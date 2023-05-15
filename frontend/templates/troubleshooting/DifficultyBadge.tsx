import { BadgeProps, ColorProps } from '@chakra-ui/react';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
   faGaugeMin,
   faGaugeLow,
   faGaugeMed,
   faGaugeHigh,
   faGaugeMax,
} from '@fortawesome/pro-solid-svg-icons';
import { color } from '@core-ds/primitives';

export enum GuideDifficultyNames {
   VeryEasy = 'Very easy',
   Easy = 'Easy',
   Moderate = 'Moderate',
   Difficult = 'Difficult',
   VeryDifficult = 'Very difficult',
}

export const DifficultyThemeLookup: {
   [_key in GuideDifficultyNames]: {
      icon: IconDefinition;
      themeColor: keyof typeof color;
      iconColor?: ColorProps['color'];
   } & BadgeProps;
} = {
   [GuideDifficultyNames.VeryDifficult]: {
      icon: faGaugeMax,
      themeColor: 'red',
      background: 'red.200',
      borderColor: 'red.300',
      color: 'red.800',
      iconColor: 'red.700',
   },
   [GuideDifficultyNames.Difficult]: {
      icon: faGaugeHigh,
      themeColor: 'red',
      background: 'red.100',
      borderColor: 'red.300',
      color: 'red.700',
      iconColor: 'red.500',
   },
   [GuideDifficultyNames.Moderate]: {
      icon: faGaugeMed,
      themeColor: 'amber',
      background: 'amber.100',
   },
   [GuideDifficultyNames.Easy]: {
      icon: faGaugeLow,
      themeColor: 'green',
      background: 'green.100',
      borderColor: 'green.400',
      color: 'green.700',
      iconColor: 'green.500',
   },
   [GuideDifficultyNames.VeryEasy]: {
      icon: faGaugeMin,
      themeColor: 'green',
      background: 'green.200',
      borderColor: 'green.400',
      color: 'green.800',
      iconColor: 'green.700',
   },
};
