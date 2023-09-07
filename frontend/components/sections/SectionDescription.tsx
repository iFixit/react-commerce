import { BoxProps } from '@chakra-ui/react';
import { PrerenderedHTML } from '@components/common';

export type SectionDescriptionProps = Omit<BoxProps, 'children'> & {
   richText: string;
};
export function SectionDescription({
   richText,
   ...otherProps
}: SectionDescriptionProps) {
   return (
      <PrerenderedHTML
         html={richText}
         template="commerce"
         color="gray.700"
         {...otherProps}
      />
   );
}
