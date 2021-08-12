import {
   Checkbox,
   CheckboxProps,
   Text,
   useBreakpointValue,
} from '@chakra-ui/react';
import * as React from 'react';

export type FilterCheckboxProps = React.PropsWithChildren<{
   name: string;
   isChecked: boolean;
   onChange(name: string): void;
}>;

export const FilterCheckbox = React.memo(
   ({ children, name, isChecked, onChange }: FilterCheckboxProps) => {
      const responsiveSize = useBreakpointValue<CheckboxProps['size']>({
         base: 'lg',
         sm: 'md',
      });
      return (
         <Checkbox
            name={name}
            isChecked={isChecked}
            onChange={(event) => onChange(event.target.name)}
            size={responsiveSize}
            sx={{
               touchAction: 'manipulation',
            }}
         >
            <Text fontSize="sm">{children}</Text>
         </Checkbox>
      );
   }
);
