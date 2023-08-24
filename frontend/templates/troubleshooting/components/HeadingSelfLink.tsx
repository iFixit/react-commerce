import * as React from 'react';
import { forwardRef, Heading, HeadingProps, Link } from '@chakra-ui/react';
import { FaIcon } from '@ifixit/icons';
import { faLink } from '@fortawesome/pro-solid-svg-icons';

export interface HeadingSelfLinkProps {
   children: string;
   id: string;
   selfLinked?: boolean;
}

export const HeadingSelfLink = forwardRef<
   HeadingProps & HeadingSelfLinkProps,
   'h2'
>(({ children, id, selfLinked, ...props }, ref) => {
   return (
      <Heading
         className="HeadingSelfLink"
         display="flex"
         fontSize="24px"
         fontWeight="medium"
         lineHeight="normal"
         mt={{ base: 4, sm: 6 }}
         sx={{ _hover: { '& .heading_link-icon': { opacity: '1' } } }}
         {...(selfLinked === true && {
            id,
         })}
         {...props}
         ref={ref}
      >
         {children}
         <Link
            href={`#${id}`}
            display="inline-flex"
            placeItems="center start"
            paddingLeft={2}
            minWidth={7}
            aria-label={`${children} page link`}
         >
            <FaIcon
               className="heading_link-icon"
               icon={faLink}
               height="55%" // scale with smaller headings
               maxHeight={4} // cap size to 1em
               color="gray.500"
               opacity="0"
               transition="opacity 0.1s ease-in-out"
            />
         </Link>
      </Heading>
   );
});
