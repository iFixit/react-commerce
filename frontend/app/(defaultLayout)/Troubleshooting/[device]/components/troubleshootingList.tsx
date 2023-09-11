'use client';

import { Flex, Heading } from '@chakra-ui/react';
import { BreadCrumbs } from '@ifixit/breadcrumbs';

type BreadcrumbEntry = {
   title: string;
   url: string;
};

export type TroubleshootingListProps = {
   title: string;
   id: number;
   breadcrumbs: BreadcrumbEntry[];
};

export default function TroubleshootingList({
   title,
   id,
   breadcrumbs,
}: TroubleshootingListProps) {
   return (
      <>
         <NavBar breadcrumbs={breadcrumbs} />
         <Heading>
            {title} - {id}
         </Heading>
      </>
   );
}

function NavBar({ breadcrumbs }: { breadcrumbs: BreadcrumbEntry[] }) {
   const bc = breadcrumbs.map((breadcrumb) => ({
      label: breadcrumb.title,
      url: breadcrumb.url,
   }));
   const padding = { base: '16px', sm: '32px' };
   const breadcrumbMinHeight = '48px';
   return (
      <Flex
         w="100%"
         backgroundColor="white"
         borderBottomColor="gray.200"
         borderBottomWidth={{ base: '0', sm: '1px' }}
         justify="center"
         minHeight={breadcrumbMinHeight}
      >
         <Flex
            maxW="1280px"
            width="100%"
            flexDirection={{ base: 'column-reverse', sm: 'row' }}
            justify="stretch"
         >
            <BreadCrumbs
               breadCrumbs={bc}
               paddingInline={padding}
               minHeight={breadcrumbMinHeight}
               borderTop={{ base: '1px', sm: '0' }}
               borderTopColor="gray.200"
               bgColor={{ base: 'blueGray.50', sm: 'transparent' }}
            />
         </Flex>
      </Flex>
   );
}
