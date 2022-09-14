import { HStack, StackProps, useTheme } from '@chakra-ui/react';
import { faStar } from '@fortawesome/pro-solid-svg-icons';
import { faStarHalf } from '@fortawesome/pro-duotone-svg-icons';

import {
   FontAwesomeIcon,
   FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';

export interface RatingProps extends StackProps {
   value?: number;
}

const stars = new Array(5).fill(null).map((_, index) => index + 1);

export const Rating = (props: RatingProps) => {
   const { value = 5, ...rest } = props;

   const halfStarsValue = Math.round(value * 2);

   return (
      <HStack spacing="1" {...rest}>
         {stars.map((i) => {
            let appearance = RatingStarAppearance.Empty;
            if (halfStarsValue >= i * 2) {
               appearance = RatingStarAppearance.Full;
            } else if (halfStarsValue >= i * 2 - 1) {
               appearance = RatingStarAppearance.Half;
            }
            return <RatingStar key={i} appearence={appearance} />;
         })}
      </HStack>
   );
};

type RatingStarProps = Omit<FontAwesomeIconProps, 'icon'> & {
   appearence: RatingStarAppearance;
};

export enum RatingStarAppearance {
   Full = 'full',
   Half = 'half',
   Empty = 'empty',
}

export const RatingStar = ({
   appearence = RatingStarAppearance.Empty,
   ...otherProps
}: RatingStarProps) => {
   const theme = useTheme();
   switch (appearence) {
      case RatingStarAppearance.Empty: {
         return (
            <FontAwesomeIcon
               icon={faStar}
               color={theme.colors.gray[300]}
               style={{ height: '16px' }}
               {...otherProps}
            />
         );
      }
      case RatingStarAppearance.Full: {
         return (
            <FontAwesomeIcon
               icon={faStar}
               color={theme.colors.brand[500]}
               style={{ height: '16px' }}
               {...otherProps}
            />
         );
      }
      case RatingStarAppearance.Half: {
         return (
            <FontAwesomeIcon
               icon={faStarHalf}
               color={theme.colors.brand[500]}
               style={{ height: '16px' }}
               {...otherProps}
            />
         );
      }
   }
};
