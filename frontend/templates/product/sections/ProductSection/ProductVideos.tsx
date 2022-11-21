import { Product } from '@models/product';
import { Box } from '@chakra-ui/react';
import { LiteYoutubeEmbed } from 'react-lite-yt-embed';

export function ProductVideos({ product }: { product: Product }) {
   const video = product.productVideosJson;
   if (video?.service === 'youtube') {
      return <LiteYoutubeEmbed id={video.id} />;
   }
   return (
      product.productVideos && (
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
      )
   );
}
