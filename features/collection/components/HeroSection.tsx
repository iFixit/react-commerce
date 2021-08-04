import {
   AspectRatio,
   Box,
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbItemProps,
   BreadcrumbLink,
   Button,
   chakra,
   Collapse,
   Flex,
   Heading,
   HStack,
   Icon,
   Text,
} from '@chakra-ui/react';
import { ShopifyImage } from '@components/ShopifyImage';
import NextLink from 'next/link';
import * as React from 'react';
import { HiChevronRight } from 'react-icons/hi';

export const HeroSection = chakra(
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
            {state.isOpen ? 'Show less' : 'Show more'}
         </Button>
      </Box>
   );
}

export interface HeroImageProps {
   className?: string;
   src: string;
   alt?: string;
}
export const HeroImage = chakra(({ className, src, alt }: HeroImageProps) => {
   return (
      <AspectRatio
         className={className}
         flex={1}
         maxW="450px"
         ratio={4 / 3}
         display={{
            base: 'none',
            md: 'block',
         }}
         borderRadius="lg"
         overflow="hidden"
         boxShadow="base"
      >
         <ShopifyImage src={src} alt={alt} sizes="400px" />
      </AspectRatio>
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

export type HeroBreadcrumbProps = React.PropsWithChildren<unknown>;

export const HeroBreadcrumb = ({ children }: HeroBreadcrumbProps) => {
   return (
      <Breadcrumb
         spacing={2}
         px={{ base: 6, sm: 0 }}
         separator={<Icon as={HiChevronRight} color="gray.300" />}
      >
         {children}
      </Breadcrumb>
   );
};

export type HeroBreadcrumbLinkProps = React.PropsWithChildren<
   BreadcrumbItemProps & {
      href: string;
   }
>;

export const HeroBreadcrumbLink = ({
   href,
   children,
   ...otherProps
}: HeroBreadcrumbLinkProps) => {
   return (
      <BreadcrumbItem {...otherProps}>
         <NextLink href={href} passHref>
            <BreadcrumbLink color="gray">{children}</BreadcrumbLink>
         </NextLink>
      </BreadcrumbItem>
   );
};

export type HeroBreadcrumbItemProps = React.PropsWithChildren<unknown>;

export const HeroBreadcrumbItem = ({ children }: HeroBreadcrumbItemProps) => {
   return (
      <BreadcrumbItem isCurrentPage>
         <Text color="black">{children}</Text>
      </BreadcrumbItem>
   );
};
