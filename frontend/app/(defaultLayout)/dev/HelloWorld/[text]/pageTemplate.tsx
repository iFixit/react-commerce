'use client';

import { Heading } from '@chakra-ui/react';

export type TemplateProps = {
   text: string;
};

export default function PageTemplate(props: TemplateProps) {
   const { text } = props;
   return <Heading>{text}</Heading>;
}
