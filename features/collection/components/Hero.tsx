import {
   Box,
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   Button,
   chakra,
   Collapse,
   Flex,
   Heading,
   HStack,
   Icon,
   Image,
   ImageProps,
   Text,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import * as React from 'react';
import { HiChevronRight } from 'react-icons/hi';
import { Collection } from '../types';

export const Hero = chakra(
   ({
      children,
      className,
   }: React.PropsWithChildren<{ className?: string }>) => {
      return (
         <HStack className={className} align="flex-start" spacing="10">
            {children}
         </HStack>
      );
   }
);

export const HeroTitle = chakra(
   ({
      children,
      className,
   }: React.PropsWithChildren<{ className?: string }>) => {
      return (
         <Heading
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

export function HeroDescription({
   children,
}: React.PropsWithChildren<unknown>) {
   const [state, setState] = React.useState({
      isOpen: false,
      shouldTruncate: true,
   });

   const onToggle = React.useCallback(() => {
      setState((current) => {
         if (!current.isOpen) {
            return { isOpen: true, shouldTruncate: false };
         }
         return {
            ...current,
            isOpen: false,
         };
      });
   }, []);

   const onAnimationComplete = React.useCallback(() => {
      setState((current) => {
         if (!current.isOpen && !current.shouldTruncate) {
            return { ...current, shouldTruncate: true };
         }
         return current;
      });
   }, []);

   return (
      <Box px={{ base: 6, sm: 0 }}>
         <Collapse
            startingHeight={100}
            in={state.isOpen}
            onAnimationComplete={onAnimationComplete}
         >
            <Text noOfLines={state.shouldTruncate ? 4 : undefined}>
               {children}
            </Text>
         </Collapse>
         <Button
            variant="link"
            size="sm"
            onClick={onToggle}
            mt="1"
            pl="2"
            pr="2"
            py="1"
            ml="-8px"
            display="block"
         >
            {state.isOpen ? 'Show less' : 'Show more'}
         </Button>
      </Box>
   );
}

export const HeroImage = chakra((props: ImageProps) => {
   return (
      <Image
         flex={1}
         boxSize="274px"
         objectFit="cover"
         borderRadius="lg"
         display={{
            base: 'none',
            md: 'block',
         }}
         {...props}
      />
   );
});

export type HeroBackgroundImageProps = React.PropsWithChildren<{
   src: string;
}>;

export const HeroBackgroundImage = chakra(
   ({ children, src }: HeroBackgroundImageProps) => {
      return (
         <Box
            w="full"
            backgroundImage={`url("${src}")`}
            backgroundSize="cover"
            m={{
               base: 0,
               sm: 4,
            }}
            borderRadius={{
               base: 0,
               sm: 'xl',
            }}
            overflow="hidden"
         >
            <Flex
               grow={1}
               bgColor="blackAlpha.800"
               align="center"
               justify="center"
               py={20}
            >
               {children}
            </Flex>
         </Box>
      );
   }
);

export type HeroBreadcrumbProps = {
   className?: string;
   collection: Collection;
};

export const HeroBreadcrumb = chakra(
   ({ className, collection }: HeroBreadcrumbProps) => {
      return (
         <Breadcrumb
            className={className}
            spacing={2}
            px={{ base: 6, sm: 0 }}
            separator={<Icon as={HiChevronRight} color="gray.300" />}
         >
            {collection.ancestors.map((ancestor, index) => {
               return (
                  <BreadcrumbItem key={index}>
                     <NextLink href={`/collections/${ancestor.handle}`}>
                        <BreadcrumbLink color="gray">
                           {ancestor.title}
                        </BreadcrumbLink>
                     </NextLink>
                  </BreadcrumbItem>
               );
            })}
            <BreadcrumbItem isCurrentPage>
               <Text color="black">{collection.title}</Text>
            </BreadcrumbItem>
         </Breadcrumb>
      );
   }
);
