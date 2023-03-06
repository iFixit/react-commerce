import { Heading, HeadingProps } from '@chakra-ui/react';

export function SectionHeading(props: HeadingProps) {
   return (
      <Heading as="h2" color="black" size="lg" fontWeight="medium" {...props} />
   );
}
