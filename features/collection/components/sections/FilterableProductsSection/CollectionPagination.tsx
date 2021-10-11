import NextLink from 'next/link';
import { useBreakpointValue } from '@chakra-ui/react';
import {
   Pagination,
   PaginationButton,
   PaginationItem,
   PaginationLink,
} from '@ifixit/react-components';
import { usePagination } from '@lib/algolia';
import * as React from 'react';
import {
   HiChevronDoubleLeft,
   HiChevronDoubleRight,
   HiChevronLeft,
   HiChevronRight,
} from 'react-icons/hi';

export function CollectionPagination() {
   const visibleNumberOfPages = useBreakpointValue({ base: 3, sm: 5, lg: 7 });
   const { page, setPage, numberOfPages = 0 } = usePagination();
   if (numberOfPages <= 1) {
      return null;
   }
   return (
      <Pagination
         numberOfPages={numberOfPages}
         page={page}
         onChange={(page) => {
            console.log('navigate to', page);
         }}
         pt={12}
         pb={8}
         visibleNumberOfPages={visibleNumberOfPages}
      >
         {(pagination) => (
            <>
               <PaginationItem>
                  <NextLink href="?page=1" passHref shallow>
                     <PaginationLink
                        aria-label="Go to first page"
                        page="first"
                        icon={HiChevronDoubleLeft}
                        // onClick={(event) => {
                        //    event.preventDefault();
                        // }}
                     />
                  </NextLink>
               </PaginationItem>
               <PaginationItem>
                  <PaginationButton
                     aria-label="Go to previous page"
                     page="previous"
                     icon={HiChevronLeft}
                  />
               </PaginationItem>
               {pagination.pages.map((page) => (
                  <PaginationItem key={page}>
                     <PaginationButton
                        aria-label={
                           pagination.currentPage === page
                              ? 'current page'
                              : `go to page ${page}`
                        }
                        page={page}
                     />
                  </PaginationItem>
               ))}
               <PaginationItem>
                  <PaginationButton
                     aria-label="Go to next page"
                     page="next"
                     icon={HiChevronRight}
                  />
               </PaginationItem>
               <PaginationItem>
                  <PaginationButton
                     aria-label="Go to last page"
                     page="last"
                     icon={HiChevronDoubleRight}
                  />
               </PaginationItem>
            </>
         )}
      </Pagination>
   );
}
