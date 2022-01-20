import {
   Checkbox,
   CheckboxProps,
   Text,
   useBreakpointValue,
} from '@chakra-ui/react';
import * as React from 'react';

export type FilterCheckboxProps = Omit<CheckboxProps, 'onChange'> & {
   name: string;
   onChange(name: string): void;
};

export const FilterCheckbox = React.memo(
   ({ children, onChange, ...otherProps }: FilterCheckboxProps) => {
      const responsiveSize = useBreakpointValue<CheckboxProps['size']>({
         base: 'lg',
         sm: 'md',
      });
      return (
         <Checkbox
            onChange={(event) => onChange(event.target.name)}
            size={responsiveSize}
            sx={{
               touchAction: 'manipulation',
            }}
            {...otherProps}
         >
            <Text fontSize="sm">{children}</Text>
         </Checkbox>
      );
   }
);
