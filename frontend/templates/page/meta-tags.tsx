import { IFIXIT_ORIGIN } from '@config/env';
import { metaTitleWithSuffix } from '@helpers/metadata-helpers';
import { joinPaths } from '@helpers/path-helpers';
import type { Page } from '@models/page';
import Head from 'next/head';

interface MetaTagsProps {
   page: Page;
}

export function MetaTags({ page }: MetaTagsProps) {
   const ogImage = findOgImage(page);
   return (
      <>
         <Head>
            {page.metaTitle && (
               <>
                  <title key="title">
                     {metaTitleWithSuffix(page.metaTitle)}
                  </title>
                  <meta
                     key="og:title"
                     name="og:title"
                     content={page.metaTitle}
                  />
               </>
            )}
            {page.metaDescription && (
               <meta
                  key="description"
                  name="description"
                  content={page.metaDescription}
               />
            )}
            <meta key="og:type" name="og:type" content="website" />
            <meta
               key="og:url"
               name="og:url"
               content={joinPaths(IFIXIT_ORIGIN, page.path)}
            />
            {ogImage && (
               <meta key="og:image" name="og:image" content={ogImage} />
            )}
         </Head>
      </>
   );
}

function findOgImage(page: Page) {
   for (const section of page.sections) {
      switch (section.type) {
         case 'Hero': {
            if (section.image?.url) return section.image.url;
            break;
         }
         case 'Browse': {
            if (section.image?.url) return section.image.url;
            break;
         }
      }
   }
   return null;
}
