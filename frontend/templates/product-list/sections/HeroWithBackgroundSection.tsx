import {
   Box,
   BoxProps,
   chakra,
   Flex,
   forwardRef,
   Heading,
   Text,
   Image,
} from '@chakra-ui/react';
import { getProductListTitle } from '@helpers/product-list-helpers';
import { ResponsiveImage } from '@ifixit/ui';
import { ProductList } from '@models/product-list';
import React from 'react';
import { usePagination } from 'react-instantsearch-hooks-web';
import snarkdown from 'snarkdown';
import { useDevicePartsItemType } from '../hooks/useDevicePartsItemType';

export interface HeroSectionProps {
   productList: ProductList;
}

export function HeroWithBackgroundSection({ productList }: HeroSectionProps) {
   const pagination = usePagination();
   const page = pagination.currentRefinement + 1;
   const itemType = useDevicePartsItemType(productList);
   const hasBrandImage =
      productList.brandLogo &&
      productList.brandLogoWidth &&
      productList.brandLogoWidth > 0;
   const hasDescription =
      productList.description != null &&
      productList.description.length > 0 &&
      page === 1 &&
      !itemType;
   const hasTagline =
      productList.tagline != null &&
      productList.tagline.length > 0 &&
      page === 1 &&
      !itemType;

   const title = getProductListTitle(productList, itemType);
   return (
      <Flex
         pos="relative"
         mx={{ base: 6, sm: 0 }}
         minH="96"
         borderRadius="base"
         overflow="hidden"
      >
         <ResponsiveImage
            priority
            layout="fill"
            objectFit="cover"
            src={productList.heroImage!.url}
            alt={productList.heroImage!.alternativeText ?? ''}
            style={{ zIndex: -1 }}
         />

         <Box
            zIndex={-1}
            position="absolute"
            top="0"
            left="0"
            w="full"
            h="full"
            bgGradient="linear-gradient(90deg, rgba(0, 0, 0, 0.6) 28.7%, rgba(0, 0, 0, 0.1) 86.8%);"
         />

         <Flex
            alignSelf="flex-end"
            direction="column"
            color="white"
            maxW={{ base: 'full', md: '50%', lg: '40%' }}
            pt="24"
            m={{ base: 4, md: 8 }}
         >
            {hasBrandImage && (
               <Image
                  src={productList.brandLogo!.url}
                  alt={productList.brandLogo!.alternativeText ?? ''}
                  width={productList.brandLogoWidth!}
                  mb="4"
               />
            )}
            <HeroTitle>
               {title}
               {page > 1 ? ` - Page ${page}` : ''}
            </HeroTitle>
            {hasTagline && (
               <Text as="h2" fontWeight="medium">
                  {productList.tagline}
               </Text>
            )}
            {hasDescription && (
               <HeroDescription mt="4">
                  {productList.description}
               </HeroDescription>
            )}
         </Flex>
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
         >
            {children}
         </Heading>
      );
   }
);

type HeroDescriptionProps = Omit<BoxProps, 'children'> & {
   children: string;
};

const HeroDescription = forwardRef<HeroDescriptionProps, 'div'>(
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