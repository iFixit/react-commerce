import {
   AspectRatio,
   Box,
   Flex,
   Heading,
   Icon,
   Link,
   SimpleGrid,
} from '@chakra-ui/react';
import {
   Banner as BannerData,
   MultipleBannersSection as SectionData,
   SectionActionType,
} from '@models/page';
import Image from 'next/image';
import NextLink from 'next/link';
import { HiChevronRight } from 'react-icons/hi';

export interface MultipleBannersSectionProps {
   data: SectionData;
}

export function MultipleBannersSection({
   data: { title, banners },
}: MultipleBannersSectionProps) {
   return (
      <Box as="section" position="relative" w="full">
         <SimpleGrid
            columns={{
               base: 1,
               md: banners.length,
            }}
            pb="10"
         >
            {banners.map((banner) => {
               return <Banner key={banner.id} banner={banner} />;
            })}
         </SimpleGrid>
      </Box>
   );
}

interface BannerProps {
   banner: BannerData;
}

function Banner({ banner }: BannerProps) {
   return (
      <Flex direction="column">
         {banner.image && (
            <AspectRatio ratio={4 / 3}>
               <Image
                  src={banner.image.url}
                  alt="store hero image"
                  priority
                  layout="fill"
                  objectFit="cover"
               />
            </AspectRatio>
         )}
         <Flex direction="column" align="flex-start" p="5">
            {banner.title && (
               <Heading
                  fontFamily="Archivo Black"
                  fontWeight="normal"
                  fontSize="24px"
                  lineHeight="38px"
                  as="h3"
                  mb="1"
               >
                  {banner.title}
               </Heading>
            )}
            {banner.description && (
               <Box
                  color="gray.600"
                  dangerouslySetInnerHTML={{
                     __html: banner.description,
                  }}
               />
            )}
            {banner.callToAction && (
               <NextLink href={banner.callToAction.url} passHref>
                  <Link
                     color="brand.500"
                     fontWeight="bold"
                     isExternal={
                        banner.callToAction.type === SectionActionType.Link
                     }
                     display="flex"
                     mt="2.5"
                  >
                     {banner.callToAction.title}
                     <Icon as={HiChevronRight} boxSize="6" />
                  </Link>
               </NextLink>
            )}
         </Flex>
      </Flex>
   );
}
