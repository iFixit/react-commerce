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
   VStack,
} from '@chakra-ui/react';
import { useSearchParams } from '@lib/algolia';
import { CollectionData } from '@lib/api';
import Image from 'next/image';
import NextLink from 'next/link';
import * as React from 'react';
import { HiChevronRight } from 'react-icons/hi';

export interface HeroSectionProps {
   collection: CollectionData;
}

export function HeroSection({ collection }: HeroSectionProps) {
   const searchParams = useSearchParams();
   const hasDescription =
      collection.description != null &&
      collection.description.length > 0 &&
      searchParams.page === 1;
   return (
      <HStack align="flex-start" spacing="10">
         <VStack flex={1} align="flex-start">
            {collection.ancestors.length > 0 && (
               <HeroBreadcrumb>
                  {collection.ancestors.map((ancestor) => (
                     <HeroBreadcrumbLink
                        key={ancestor.handle}
                        href={`/collections/${ancestor.handle}`}
                     >
                        {ancestor.title}
                     </HeroBreadcrumbLink>
                  ))}
                  <HeroBreadcrumbItem>{collection.title}</HeroBreadcrumbItem>
               </HeroBreadcrumb>
            )}
            {!hasDescription && collection.image != null ? (
               <HeroBackgroundImage src={collection.image.url}>
                  <HeroTitle color="white">
                     {collection.title}
                     {searchParams.page > 1
                        ? ` - Page ${searchParams.page}`
                        : ''}
                  </HeroTitle>
               </HeroBackgroundImage>
            ) : (
               <HeroTitle>
                  {collection.title}
                  {searchParams.page > 1 ? ` - Page ${searchParams.page}` : ''}
               </HeroTitle>
            )}
            {hasDescription && (
               <HeroDescription>{collection.description}</HeroDescription>
            )}
         </VStack>
         {collection.image && hasDescription && (
            <HeroImage src={collection.image.url} alt={collection.image.alt} />
         )}
      </HStack>
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

const NUMBER_OF_LINES = 4;
const LINE_HEIGHT = 25;
const VISIBLE_HEIGHT = NUMBER_OF_LINES * LINE_HEIGHT;

function HeroDescription({ children }: React.PropsWithChildren<unknown>) {
   const [state, setState] = React.useState({
      isOpen: false,
      shouldDisplayShowMore: false,
   });

   const onToggle = React.useCallback(() => {
      setState((current) => {
         return {
            ...current,
            isOpen: !current.isOpen,
         };
      });
   }, []);

   const textRef = React.useRef<HTMLParagraphElement | null>(null);

   React.useEffect(() => {
      if (textRef.current) {
         const height = textRef.current.getBoundingClientRect().height;
         if (height > VISIBLE_HEIGHT) {
            setState((current) => ({
               ...current,
               shouldDisplayShowMore: true,
            }));
         }
      }
   }, []);

   return (
      <Box px={{ base: 6, sm: 0 }}>
         <Collapse startingHeight={VISIBLE_HEIGHT} in={state.isOpen}>
            <Text ref={textRef}>{children}</Text>
         </Collapse>
         {state.shouldDisplayShowMore && (
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
         )}
      </Box>
   );
}

interface HeroImageProps {
   className?: string;
   src: string;
   alt?: string;
}

const HeroImage = chakra(({ className, src, alt }: HeroImageProps) => {
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
         <Image src={src} alt={alt} layout="fill" priority sizes="50vw" />
      </AspectRatio>
   );
});

type HeroBackgroundImageProps = React.PropsWithChildren<{
   src: string;
}>;

const HeroBackgroundImage = chakra(
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

type HeroBreadcrumbProps = React.PropsWithChildren<unknown>;

const HeroBreadcrumb = ({ children }: HeroBreadcrumbProps) => {
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

type HeroBreadcrumbLinkProps = React.PropsWithChildren<
   BreadcrumbItemProps & {
      href: string;
   }
>;

const HeroBreadcrumbLink = ({
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

type HeroBreadcrumbItemProps = React.PropsWithChildren<unknown>;

const HeroBreadcrumbItem = ({ children }: HeroBreadcrumbItemProps) => {
   return (
      <BreadcrumbItem isCurrentPage>
         <Text color="black">{children}</Text>
      </BreadcrumbItem>
   );
};
