import { HStack, useBreakpointValue } from '@chakra-ui/react';
import {
   Pagination as BasePagination,
   PaginationItem,
   PaginationLink,
   useIsMounted,
} from '@ifixit/ui';
import {
   HiChevronDoubleLeft,
   HiChevronDoubleRight,
   HiChevronLeft,
   HiChevronRight,
} from 'react-icons/hi';
import {
   usePagination,
   UsePaginationProps,
} from 'react-instantsearch-hooks-web';

type PaginationProps = UsePaginationProps;

export function Pagination(props: PaginationProps) {
   const { currentRefinement, refine, createURL, nbPages } =
      usePagination(props);
   const responsiveVisibleNumberOfPages = useBreakpointValue({
      base: 3,
      sm: 5,
      lg: 7,
   });
   const isMounted = useIsMounted();
   const visibleNumberOfPages = isMounted ? responsiveVisibleNumberOfPages : 3;

   const createPageUrl = (page: number) => {
      const fullUrl = createURL(page - 1);
      const url = new URL(fullUrl);
      return url.pathname + url.search;
   };

   if (nbPages <= 1) {
      return null;
   }

   return (
      <HStack justify="center">
         <BasePagination
            numberOfPages={nbPages}
            page={currentRefinement + 1}
            onChange={(page) => refine(page - 1)}
            pt="10"
            pb="8"
            visibleNumberOfPages={visibleNumberOfPages}
         >
            {(pagination) => (
               <>
                  <PaginationItem>
                     <PaginationLink
                        as="a"
                        aria-label="Go to first page"
                        href={createPageUrl(1)}
                        page="first"
                        icon={HiChevronDoubleLeft}
                        onClick={(event) => {
                           event.preventDefault();
                           pagination.first();
                        }}
                     />
                  </PaginationItem>
                  <PaginationItem>
                     <PaginationLink
                        as="a"
                        aria-label="Go to previous page"
                        href={
                           pagination.hasPrevious
                              ? createPageUrl(pagination.currentPage - 1)
                              : '#'
                        }
                        page="previous"
                        icon={HiChevronLeft}
                        onClick={(event) => {
                           event.preventDefault();
                           pagination.previous();
                        }}
                     />
                  </PaginationItem>
                  {pagination.pages.map((page) => (
                     <PaginationItem key={page}>
                        <PaginationLink
                           aria-label={
                              pagination.currentPage === page
                                 ? 'current page'
                                 : `go to page ${page}`
                           }
                           page={page}
                           href={createPageUrl(page)}
                           onClick={(event) => {
                              event.preventDefault();
                              pagination.goto(page);
                           }}
                        />
                     </PaginationItem>
                  ))}
                  <PaginationItem>
                     <PaginationLink
                        as="a"
                        aria-label="Go to next page"
                        data-testid="next-page"
                        page="next"
                        href={
                           pagination.hasNext
                              ? createPageUrl(pagination.currentPage + 1)
                              : '#'
                        }
                        icon={HiChevronRight}
                        onClick={(event) => {
                           event.preventDefault();
                           pagination.next();
                        }}
                     />
                  </PaginationItem>
                  <PaginationItem>
                     <PaginationLink
                        as="a"
                        aria-label="Go to last page"
                        page="last"
                        href={createPageUrl(pagination.numberOfPages)}
                        icon={HiChevronDoubleRight}
                        onClick={(event) => {
                           event.preventDefault();
                           pagination.last();
                        }}
                     />
                  </PaginationItem>
               </>
            )}
         </BasePagination>
      </HStack>
   );
}
