import * as React from 'react';
import { forwardRef, Heading, HeadingProps, Link } from '@chakra-ui/react';
import { FaIcon } from '@ifixit/icons';
import { faLink } from '@fortawesome/pro-solid-svg-icons';
import { solutionHeadingToId } from '../utils/solutionHeadingToId';

export interface HeadingSelfLinkProps {
   children: string;
   selfLinked?: boolean;
}

export const HeadingSelfLink = forwardRef<
   HeadingProps & HeadingSelfLinkProps,
   'h2'
>(({ children, selfLinked, ...props }, ref) => {
   const solutionHeading = children as string;

   return (
      <Heading
         display="flex"
         sx={{ _hover: { '& .heading_link-icon': { opacity: '1' } } }}
         {...(selfLinked === true && {
            id: solutionHeadingToId(solutionHeading),
         })}
         {...props}
         {...ref}
      >
         {children}
         <Link
            href={`#${solutionHeadingToId(solutionHeading)}`}
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
