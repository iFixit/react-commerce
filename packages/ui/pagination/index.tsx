import {
   Box,
   BoxProps,
   chakra,
   HStack,
   HTMLChakraProps,
   Icon,
   StylesProvider,
   ThemingProps,
   useMultiStyleConfig,
   useStyles,
} from '@chakra-ui/react';
import { MaybeRenderProp } from '@chakra-ui/react-utils';
import * as React from 'react';
import { usePagination, UsePagination } from './usePagination';

const PaginationContext = React.createContext<UsePagination | null>(null);

export interface PaginationProps
   extends Omit<HTMLChakraProps<'nav'>, 'onChange' | 'children'>,
      ThemingProps<'Pagination'> {
   numberOfPages: number;
   defaultPage?: number;
   page?: number;
   visibleNumberOfPages?: number;
   onChange?: (page: number) => void;
   children: MaybeRenderProp<UsePagination>;
}

export const Pagination = chakra(
   ({
      className,
      numberOfPages,
      defaultPage,
      page,
      visibleNumberOfPages,
      onChange,
      children,
      variant,
      size,
      colorScheme,
      ...rest
   }: PaginationProps) => {
      const styles = useMultiStyleConfig('Pagination', {
         size,
         variant,
         colorScheme,
      });

      const context = usePagination({
         numberOfPages,
         visibleNumberOfPages,
         defaultPage,
         page,
         onChange,
      });

      return (
         <StylesProvider value={styles}>
            <PaginationContext.Provider value={context}>
               <chakra.nav
                  __css={styles.container}
                  className={className}
                  {...rest}
               >
                  <HStack as="ul" listStyleType="none">
                     {typeof children === 'function'
                        ? children(context)
                        : children}
                  </HStack>
               </chakra.nav>
            </PaginationContext.Provider>
         </StylesProvider>
      );
   }
);

function usePaginationContext() {
   const context = React.useContext(PaginationContext);
   if (context == null) {
      throw new Error(
         `usePaginationContext: \`context\` is undefined. Seems you forgot to wrap the pagination parts in \`<Pagination />\``
      );
   }
   return context;
}

export type PaginationItemProps = BoxProps;

export function PaginationItem(props: PaginationItemProps) {
   return <Box as="li" {...props} />;
}

export interface PaginationButtonProps extends HTMLChakraProps<'button'> {
   page: number | 'first' | 'previous' | 'next' | 'last';
   icon?: React.ElementType;
}

export function PaginationButton({
   page,
   icon: ButtonIcon,
   children,
   ...rest
}: PaginationButtonProps) {
   const styles = useStyles();
   const {
      currentPage,
      numberOfPages,
      goto,
      hasPrevious,
      hasNext,
      previous,
      next,
      first,
      last,
   } = usePaginationContext();

   const handleClick = React.useCallback(() => {
      switch (page) {
         case 'first': {
            first();
            break;
         }
         case 'previous': {
            previous();
            break;
         }
         case 'next': {
            next();
            break;
         }
         case 'last': {
            last();
            break;
         }
         default: {
            if (currentPage !== page) {
               goto(page);
            }
         }
      }
   }, [currentPage, page, goto, first, previous, next, last]);

   const isDisabled =
      (page === 'previous' && !hasPrevious) ||
      (page === 'next' && !hasNext) ||
      (page === 'first' && currentPage === 1) ||
      (page === 'last' && currentPage === numberOfPages);
   const isCurrentPage = page === currentPage;
   const isPage = typeof page === 'number';

   if (isCurrentPage) {
      return (
         <chakra.span aria-current="page" {...rest} __css={styles.pageButton}>
            {children == null ? page : children}
         </chakra.span>
      );
   }
   let content: React.ReactNode;

   if (ButtonIcon != null) {
      content = <Icon as={ButtonIcon} color="currentColor" />;
   } else if (children == null) {
      content = page;
   } else {
      content = children;
   }

   return (
      <chakra.button
         disabled={isDisabled}
         onClick={handleClick}
         {...rest}
         __css={isPage ? styles.pageButton : styles.button}
      >
         {content}
      </chakra.button>
   );
}

export interface PaginationLinkProps extends HTMLChakraProps<'a'> {
   page: number | 'first' | 'previous' | 'next' | 'last';
   icon?: React.ElementType;
}

export function PaginationLink({
   page,
   icon: ButtonIcon,
   children,
   ...rest
}: PaginationLinkProps) {
   const styles = useStyles();
   const { currentPage, numberOfPages, hasPrevious, hasNext } =
      usePaginationContext();

   const isDisabled =
      (page === 'previous' && !hasPrevious) ||
      (page === 'next' && !hasNext) ||
      (page === 'first' && currentPage === 1) ||
      (page === 'last' && currentPage === numberOfPages);
   const isCurrentPage = page === currentPage;
   const isPage = typeof page === 'number';

   if (isCurrentPage) {
      return (
         <chakra.span aria-current="page" {...rest} __css={styles.pageLink}>
            {children == null ? page : children}
         </chakra.span>
      );
   }
   let content: React.ReactNode;

   if (ButtonIcon != null) {
      content = <Icon as={ButtonIcon} color="currentColor" />;
   } else if (children == null) {
      content = page;
   } else {
      content = children;
   }

   if (isDisabled) {
      return (
         <chakra.span
            disabled={isDisabled}
            {...rest}
            __css={isPage ? styles.pageLink : styles.link}
         >
            {content}
         </chakra.span>
      );
   }

   return (
      <chakra.a {...rest} __css={isPage ? styles.pageLink : styles.link}>
         {content}
      </chakra.a>
   );
}
