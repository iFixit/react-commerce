'use client';

import { Heading } from '@chakra-ui/react';

export type TemplateProps = {
   device: string;
};

export default function PageTemplate(props: TemplateProps) {
   const { device } = props;
   return <Heading>Device: {device}</Heading>;
}
