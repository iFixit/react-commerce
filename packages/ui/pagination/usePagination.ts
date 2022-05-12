import { useControllableState } from '@chakra-ui/react';
import * as React from 'react';

const DEFAULT_VISIBLE_PAGES_COUNT = 7;

export type UsePaginationProps = {
   defaultPage?: number;
   page?: number;
   numberOfPages: number;
   visibleNumberOfPages?: number;
   onChange?: (page: number) => void;
};

export type UsePagination = {
   currentPage: number;
   numberOfPages: number;
   pages: number[];
   hasPrevious: boolean;
   hasNext: boolean;
   goto: (page: number) => void;
   next: () => void;
   previous: () => void;
   first: () => void;
   last: () => void;
};

export function usePagination({
   defaultPage = 1,
   page,
   numberOfPages,
   visibleNumberOfPages = DEFAULT_VISIBLE_PAGES_COUNT,
   onChange,
}: UsePaginationProps): UsePagination {
   const [currentPage, setCurrentPage] = useControllableState({
      defaultValue: page == null ? defaultPage : undefined,
      value: page,
      onChange,
   });

   const padding = Math.floor(visibleNumberOfPages / 2);
   const firstVisiblePage = Math.min(
      Math.max(1, currentPage - padding),
      Math.max(1, numberOfPages - visibleNumberOfPages + 1)
   );
   const lastVisiblePage = Math.min(
      numberOfPages,
      firstVisiblePage + visibleNumberOfPages - 1
   );
   const hasPrevious = currentPage > 1;
   const hasNext = currentPage < numberOfPages;

   const previous = React.useCallback(() => {
      setCurrentPage((current) => (current > 1 ? current - 1 : current));
   }, [setCurrentPage]);

   const next = React.useCallback(() => {
      setCurrentPage((current) =>
         current < numberOfPages ? current + 1 : current
      );
   }, [setCurrentPage, numberOfPages]);

   const first = React.useCallback(() => {
      setCurrentPage(1);
   }, [setCurrentPage]);

   const last = React.useCallback(() => {
      setCurrentPage(numberOfPages);
   }, [setCurrentPage, numberOfPages]);

   const goto = React.useCallback(
      (page: number) => {
         if (page > numberOfPages) {
            setCurrentPage(numberOfPages);
         } else if (page < 1) {
            setCurrentPage(1);
         } else {
            setCurrentPage(page);
         }
      },
      [numberOfPages, setCurrentPage]
   );

   const pages = React.useMemo(() => {
      const size = lastVisiblePage - firstVisiblePage + 1;
      return generatePages(size, firstVisiblePage);
   }, [firstVisiblePage, lastVisiblePage]);

   return {
      currentPage,
      numberOfPages,
      pages,
      hasPrevious,
      hasNext,
      previous,
      next,
      first,
      last,
      goto,
   };
}

function generatePages(size: number, firstPage: number) {
   return new Array(size).fill(1).map((_, index) => firstPage + index);
}
