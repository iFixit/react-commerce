import { Heading, HeadingProps } from '@chakra-ui/react';

export function SectionHeading(props: HeadingProps) {
   return <Heading as="h2" color="gray.700" size="lg" {...props} />;
}
