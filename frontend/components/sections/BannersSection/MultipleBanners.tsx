import {
   AspectRatio,
   Box,
   Flex,
   Heading,
   Link,
   SimpleGrid,
} from '@chakra-ui/react';
import { PrerenderedHTML } from '@components/common';
import { faArrowRight } from '@fortawesome/pro-solid-svg-icons';
import { FaIcon } from '@ifixit/icons';
import { ResponsiveImage } from '@ifixit/ui';
import type { Banner } from '@models/components/banner';

export interface MultipleBannersProps {
   id: string;
   banners: Banner[];
}

export function MultipleBanners({ id, banners }: MultipleBannersProps) {
   return (
      <Box as="section" id={id} position="relative" w="full">
         <SimpleGrid
            columns={{
               base: 1,
               md: banners.length,
            }}
            pb="10"
         >
            {banners.map((banner) => {
               return <BannerGridItem key={banner.id} banner={banner} />;
            })}
         </SimpleGrid>
      </Box>
   );
}

interface BannerProps {
   banner: Banner;
}

function BannerGridItem({ banner }: BannerProps) {
   return (
      <Flex direction="column">
         {banner.image && (
            <AspectRatio ratio={4 / 3}>
               <ResponsiveImage
                  src={banner.image.url}
                  alt={banner.image.altText ?? ''}
                  fill
                  style={{
                     objectFit: 'cover',
                  }}
               />
            </AspectRatio>
         )}
         <Flex
            direction="column"
            align="flex-start"
            px="6"
            py={{
               base: 6,
               md: 8,
            }}
         >
            {banner.title && (
               <Heading
                  as="h3"
                  fontWeight="medium"
                  fontSize="24px"
                  lineHeight="38px"
                  color="gray.800"
                  mb="1"
               >
                  {banner.title}
               </Heading>
            )}
            {banner.description && (
               <PrerenderedHTML
                  html={banner.description}
                  template="commerce"
                  color="gray.700"
               />
            )}
            {banner.callToAction && (
               <Link
                  href={banner.callToAction.url}
                  color="brand.500"
                  fontWeight="bold"
                  display="flex"
                  alignItems="center"
                  mt="2.5"
               >
                  {banner.callToAction.title}
                  <FaIcon icon={faArrowRight} h="4" mt="0.5" ml="1" />
               </Link>
            )}
         </Flex>
      </Flex>
   );
}
