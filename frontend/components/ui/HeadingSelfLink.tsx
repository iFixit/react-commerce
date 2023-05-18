import * as React from 'react';
import { Heading, HeadingProps, Link } from '@chakra-ui/react';
import { FaIcon } from '@ifixit/icons';
import { faLink } from '@fortawesome/pro-solid-svg-icons';

export function HeadingSelfLink({
   children,
   ...props
}: {
   children: any;
   props: HeadingProps;
}) {
   const id = children.toLowerCase().replace(/ /g, '-');
   const sharedStyles = {
      display: 'inline-flex',
      alignItems: 'stretch',
   };

   return (
      <Heading
         id={id}
         sx={{ _hover: { '& svg': { visibility: 'visible' } } }}
         {...sharedStyles}
         {...props}
      >
         {children}
         <Link href={`#${id}`} paddingLeft={2} minWidth={6} {...sharedStyles}>
            <FaIcon
               icon={faLink}
               height="50%"
               maxHeight="4"
               color="gray.500"
               marginY="auto"
               visibility="hidden"
            />
         </Link>
      </Heading>
   );
}
