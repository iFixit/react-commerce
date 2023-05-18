import * as React from 'react';
import { Heading, HeadingProps, Link } from '@chakra-ui/react';
import { FaIcon } from '@ifixit/icons';
import { faLink } from '@fortawesome/pro-solid-svg-icons';

export function HeadingSelfLink(children: any, props: HeadingProps) {
   const id = children.toLowerCase().replace(/ /g, '-');

   return (
      <Heading
         id={id}
         display="flex"
         alignItems="stretch"
         sx={{ _hover: { '& .heading_link-icon': { visibility: 'visible' } } }}
         {...props}
      >
         {children}
         <Link
            href={`#${id}`}
            display="inline-flex"
            alignItems="stretch"
            paddingLeft={2}
            minWidth={6}
         >
            <FaIcon
               className="heading_link-icon"
               icon={faLink}
               height="55%"
               maxHeight="4"
               color="gray.500"
               marginY="auto"
               visibility="hidden"
            />
         </Link>
      </Heading>
   );
}
