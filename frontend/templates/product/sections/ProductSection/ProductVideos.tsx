import { Box } from '@chakra-ui/react';
import type { Product } from '@pages/api/nextjs/cache/product';
import { LiteYoutubeEmbed } from 'react-lite-yt-embed';

export function ProductVideos({ product }: { product: Product }) {
   const video = product.productVideosJson;
   if (video?.service === 'youtube') {
      return (
         <Box width="100%" height="315">
            <LiteYoutubeEmbed
               id={video.id}
               mute={false}
               lazyImage={true}
               mobileResolution="sddefault"
               desktopResolution="sddefault"
               iframeTitle="YouTube video player"
            />
         </Box>
      );
   }
   return product.productVideos ? (
      <Box
         as="iframe"
         width="100%"
         height="315"
         src={product.productVideos}
         title="YouTube video player"
         frameBorder="0"
         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
         allowFullScreen
      />
   ) : null;
}
