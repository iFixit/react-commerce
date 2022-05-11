import { useBreakpointValue } from '@chakra-ui/react';
import {
   Pagination,
   PaginationItem,
   PaginationLink,
   useIsMounted,
} from '@ifixit/ui';
import { usePagination } from '@lib/algolia';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import * as React from 'react';
import {
   HiChevronDoubleLeft,
   HiChevronDoubleRight,
   HiChevronLeft,
   HiChevronRight,
} from 'react-icons/hi';

export function ProductListPagination() {
   const getProductListResultsPageUrl = useGetProductListResultsPageUrl();
   const responsiveVisibleNumberOfPages = useBreakpointValue({
      base: 3,
      sm: 5,
      lg: 7,
   });
   const isMounted = useIsMounted();
   const visibleNumberOfPages = isMounted ? responsiveVisibleNumberOfPages : 3;

   const { page, setPage, numberOfPages = 0 } = usePagination();

   if (numberOfPages <= 1) {
      return null;
   }

   return (
      <Pagination
         numberOfPages={numberOfPages}
         page={page}
         onChange={setPage}
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
                     href={getProductListResultsPageUrl(1)}
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
                           ? getProductListResultsPageUrl(
                                pagination.currentPage - 1
                             )
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
                        href={getProductListResultsPageUrl(page)}
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
                     page="next"
                     href={
                        pagination.hasNext
                           ? getProductListResultsPageUrl(
                                pagination.currentPage + 1
                             )
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
                     href={getProductListResultsPageUrl(
                        pagination.numberOfPages
                     )}
                     icon={HiChevronDoubleRight}
                     onClick={(event) => {
                        event.preventDefault();
                        pagination.last();
                     }}
                  />
               </PaginationItem>
            </>
         )}
      </Pagination>
   );
}

function useGetProductListResultsPageUrl() {
   const router = useRouter();
   const { p, ...other } = router.query;
   return (page: number) => {
      let query;
      if (page > 1) {
         query = queryString.stringify({ ...other, p: page });
      } else {
         query = queryString.stringify({ ...other });
      }
      return `${router.pathname}${query.length > 0 ? `?${query}` : ''}`;
   };
}
