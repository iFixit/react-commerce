import { Box, BoxProps } from '@chakra-ui/react';

export type SectionDescriptionProps = Omit<BoxProps, 'children'> & {
   richText: string;
};
export function SectionDescription({
   richText,
   ...otherProps
}: SectionDescriptionProps) {
   return (
      <Box
         color="gray.600"
         {...otherProps}
         dangerouslySetInnerHTML={{
            __html: richText,
         }}
      />
   );
}
