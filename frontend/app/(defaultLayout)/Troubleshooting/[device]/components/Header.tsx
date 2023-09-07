'use client';

import { Heading } from '@chakra-ui/react';

export type HeaderProps = {
   device: string;
};

export default function Header({ device }: HeaderProps) {
   return <Heading>Device: {device}</Heading>;
}
