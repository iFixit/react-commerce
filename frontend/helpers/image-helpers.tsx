import Head from 'next/head';
import { HtmlImageProps } from '@ifixit/ui/misc/Image';

export const defaultPreloader =
   ({ preloadKey }: { preloadKey: string }) =>
   ({
      src,
      srcSet,
   }: Pick<HtmlImageProps, 'src' | 'srcSet'>): React.ReactElement => {
      return (
         <Head>
            <link
               key={preloadKey}
               rel="preload"
               as="image"
               href={src}
               // @ts-ignore
               imageSrcSet={srcSet}
            />
         </Head>
      );
   };
