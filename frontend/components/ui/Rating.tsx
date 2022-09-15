import { HStack, StackProps } from '@chakra-ui/react';
import { faStarHalf } from '@fortawesome/pro-duotone-svg-icons';
import { faStar } from '@fortawesome/pro-solid-svg-icons';
import { FaIcon, FaIconProps } from '@ifixit/icons';

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

type RatingStarProps = Omit<FaIconProps, 'icon'> & {
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
   switch (appearence) {
      case RatingStarAppearance.Empty: {
         return <FaIcon icon={faStar} h="4" color="gray.300" {...otherProps} />;
      }
      case RatingStarAppearance.Full: {
         return (
            <FaIcon icon={faStar} h="4" color="brand.500" {...otherProps} />
         );
      }
      case RatingStarAppearance.Half: {
         return (
            <FaIcon
               icon={faStarHalf}
               h="4"
               sx={{
                  '--fa-primary-color': 'var(--chakra-colors-brand-500)',
                  '--fa-secondary-color': 'var(--chakra-colors-gray-300)',
                  '--fa-secondary-opacity': '1',
               }}
               {...otherProps}
            />
         );
      }
   }
};
