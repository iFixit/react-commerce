import { flags } from '@config/flags';
import { ensureIFixitSuffix } from '@helpers/metadata-helpers';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { findPageByPath } from './data';
import { joinPaths } from '@helpers/path-helpers';
import { IFIXIT_ORIGIN } from '@config/env';
import { invariant } from '@ifixit/helpers';

export interface StorePageProps {
   params: {
      slug?: string[];
   };
}

export default async function StorePage({ params }: StorePageProps) {
   if (!flags.STORE_PAGES_APP_ROUTER_ENABLED) notFound();

   const page = await findPageByPath(pathFor(params.slug));

   if (page == null) notFound();

   return (
      <div>
         <h1>Store Page: {page.title}</h1>
      </div>
   );
}

export async function generateMetadata({
   params,
}: StorePageProps): Promise<Metadata> {
   const page = await findPageByPath(pathFor(params.slug));

   if (page == null) return {};

   return {
      title: page.metaTitle ? ensureIFixitSuffix(page.metaTitle) : undefined,
      description: page.metaDescription,
      openGraph: {
         title: page.metaTitle ?? undefined,
         description: page.metaDescription ?? undefined,
         type: 'website',
         url: joinPaths(IFIXIT_ORIGIN, page.path),
         images: ogImage(),
      },
   };

   function ogImage() {
      invariant(page);
      for (const section of page.sections) {
         switch (section.type) {
            case 'Hero': {
               if (section.image?.url) return { url: section.image.url };
               break;
            }
            case 'Browse': {
               if (section.image?.url) return { url: section.image.url };
               break;
            }
         }
      }
      return undefined;
   }
}

function pathFor(slug: string[] | undefined) {
   const pathSegments = slug ?? [];
   pathSegments.unshift('Store');
   return `/${pathSegments.join('/')}`;
}
