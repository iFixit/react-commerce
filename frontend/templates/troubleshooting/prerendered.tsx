import { Box, chakra } from '@chakra-ui/react';
import 'lite-youtube-embed/src/lite-yt-embed.css';
import { useEffect } from 'react';
import { styles } from './styles/prerenderedStyles';

const Prerendered = chakra(function Prerendered({
   html,
   className,
}: {
   html: string;
   className?: string;
}) {
   useEffect(() => {
      import('lite-youtube-embed');
   }, []);
   return (
      <Box
         className={`prerendered ${className}`}
         sx={styles}
         dangerouslySetInnerHTML={{ __html: html }}
      />
   );
});

export default Prerendered;
