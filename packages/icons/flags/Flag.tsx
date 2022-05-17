import { forwardRef, Icon, IconProps } from '@chakra-ui/react';
import * as React from 'react';
import AuFlag from './AuFlag';
import CaFlag from './CaFlag';
import DeFlag from './DeFlag';
import EuFlag from './EuFlag';
import FrFlag from './FrFlag';
import GbFlag from './GbFlag';
import UsFlag from './UsFlag';

export enum FlagCountryCode {
   AU = 'AU',
   CA = 'CA',
   DE = 'DE',
   FR = 'FR',
   GB = 'GB',
   EU = 'EU',
   US = 'US',
}

export type FlagProps = IconProps & {
   code?: FlagCountryCode;
};

const Flag = forwardRef<FlagProps, 'svg'>(({ code, ...otherProps }, ref) => {
   switch (code) {
      case FlagCountryCode.AU:
         return (
            <Icon
               ref={ref}
               as={AuFlag}
               data-country-code={code}
               display="block"
               {...otherProps}
            />
         );
      case FlagCountryCode.CA:
         return (
            <Icon
               ref={ref}
               as={CaFlag}
               data-country-code={code}
               display="block"
               {...otherProps}
            />
         );
      case FlagCountryCode.DE:
         return (
            <Icon
               ref={ref}
               as={DeFlag}
               data-country-code={code}
               display="block"
               {...otherProps}
            />
         );
      case FlagCountryCode.FR:
         return (
            <Icon
               ref={ref}
               as={FrFlag}
               data-country-code={code}
               display="block"
               {...otherProps}
            />
         );
      case FlagCountryCode.GB:
         return (
            <Icon
               ref={ref}
               as={GbFlag}
               data-country-code={code}
               display="block"
               {...otherProps}
            />
         );
      case FlagCountryCode.EU:
         return (
            <Icon
               ref={ref}
               as={EuFlag}
               data-country-code={code}
               display="block"
               {...otherProps}
            />
         );
      case FlagCountryCode.US:
      default:
         return (
            <Icon
               ref={ref}
               as={UsFlag}
               data-country-code={code}
               display="block"
               {...otherProps}
            />
         );
   }
});

export default Flag;
