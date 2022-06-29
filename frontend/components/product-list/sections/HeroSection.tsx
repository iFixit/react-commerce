import {
   Box,
   BoxProps,
   Button,
   chakra,
   forwardRef,
   Heading,
   Text,
   useDisclosure,
   VStack,
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
   const page = pagination.currentRefinement;
   const hasDescription =
      productList.description != null &&
      productList.description.length > 0 &&
      page === 1;
   return (
      <VStack flex={1} align="flex-start">
         <HeroTitle>
            {productList.title}
            {page > 1 ? ` - Page ${page}` : ''}
         </HeroTitle>
         {productList.tagline && productList.tagline.length > 0 && page === 1 && (
            <Text as="h2" fontWeight="bold" fontSize="xl" px={{ base: 6, sm: 0 }}>
               {productList.tagline}
            </Text>
         )}
         {hasDescription && (
            <HeroDescription>{productList.description}</HeroDescription>
         )}
      </VStack>
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
            fontFamily="Archivo Black"
            px={{ base: 6, sm: 0 }}
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
      <Box px={{ base: 6, sm: 0 }}>
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
         return snarkdown(children);
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
