'use client';

import { Heading } from '@chakra-ui/react';

export type TroubleshootingListProps = {
   device: string;
};

export default function TroubleshootingList({
   device,
}: TroubleshootingListProps) {
   return <Heading>Device: {device}</Heading>;
}
