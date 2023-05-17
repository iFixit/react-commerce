import {
   Box,
   BoxProps,
   Button,
   chakra,
   Flex,
   forwardRef,
   Heading,
   Text,
   useDisclosure,
} from '@chakra-ui/react';
import { DEFAULT_ANIMATION_DURATION_MS } from '@config/constants';
import { useIsMounted } from '@ifixit/ui';
import { ProductList } from '@models/product-list';
import * as React from 'react';
import { usePagination } from 'react-instantsearch-hooks-web';
import snarkdown from 'snarkdown';

export interface HeroSectionProps {
   productList: ProductList;
}

export function HeroSection({ productList }: HeroSectionProps) {
   const pagination = usePagination();
   const page = pagination.currentRefinement + 1;

   return (
      <Flex direction="column">
         <HeroTitle>
            {productList.overrides?.title}
            {page > 1 ? ` - Page ${page}` : ''}
         </HeroTitle>
         {productList.overrides?.tagline && (
            <Text as="h2" fontWeight="medium" data-testid="hero-tagline">
               {productList.overrides?.tagline}
            </Text>
         )}
         {productList.overrides?.description && (
            <HeroDescription>
               {productList.overrides?.description}
            </HeroDescription>
         )}
      </Flex>
   );
}

const HeroTitle = chakra(
   ({
      children,
      className,
   }: React.PropsWithChildren<{ className?: string }>) => {
      return (
         <Heading
            as="h1"
            className={className}
            size="xl"
            fontSize={{ base: '2xl', md: '3xl' }}
            fontWeight="medium"
            data-testid="hero-title"
         >
            {children}
         </Heading>
      );
   }
);

const NUMBER_OF_LINES = 5;
const LINE_HEIGHT = 25;
const VISIBLE_HEIGHT = NUMBER_OF_LINES * LINE_HEIGHT;

type HeroDescriptionProps = {
   children: string;
};

function HeroDescription({ children }: HeroDescriptionProps) {
   const { isOpen, onToggle } = useDisclosure();
   const isMounted = useIsMounted();
   const textRef = React.useRef<HTMLParagraphElement | null>(null);
   const textHeight = React.useMemo(() => {
      if (isMounted && textRef.current) {
         return textRef.current.clientHeight;
      }
      return 0;
   }, [isMounted, textRef]);
   const isShowMoreVisible = textHeight > VISIBLE_HEIGHT;

   return (
      <Box mt="4" data-testid="hero-description">
         <Box
            maxH={isOpen ? textHeight : VISIBLE_HEIGHT}
            overflow="hidden"
            transition={`all ${DEFAULT_ANIMATION_DURATION_MS}ms`}
         >
            <DescriptionRichText ref={textRef}>{children}</DescriptionRichText>
         </Box>
         {isShowMoreVisible && (
            <Button
               variant="link"
               color="gray.800"
               size="sm"
               onClick={onToggle}
               mt="1"
               pl="2"
               pr="2"
               py="1"
               ml="-8px"
               display="block"
            >
               {isOpen ? 'Show less' : 'Show more'}
            </Button>
         )}
      </Box>
   );
}

type DescriptionRichTextProps = Omit<BoxProps, 'children'> & {
   children: string;
};

const DescriptionRichText = forwardRef<DescriptionRichTextProps, 'div'>(
   ({ children, ...other }, ref) => {
      const html = React.useMemo(() => {
         const preserveNewlines = children.trim().replace(/\n/g, '<br />');
         return snarkdown(preserveNewlines);
      }, [children]);

      return (
         <Box
            sx={{
               a: {
                  color: 'brand.500',
                  transition: 'color 300ms',
                  '&:hover': {
                     color: 'brand.600',
                  },
               },
            }}
            ref={ref}
            dangerouslySetInnerHTML={{ __html: html }}
            {...other}
         />
      );
   }
);
