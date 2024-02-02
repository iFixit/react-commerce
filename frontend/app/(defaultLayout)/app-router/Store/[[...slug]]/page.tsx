import { flags } from '@config/flags';
import { ensureIFixitSuffix } from '@helpers/metadata-helpers';
import { notFound } from 'next/navigation';
import { findPageByPath } from './data';

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

export async function generateMetadata({ params }: StorePageProps) {
   const page = await findPageByPath(pathFor(params.slug));

   if (page == null) return {};

   return {
      title: page.metaTitle ? ensureIFixitSuffix(page.metaTitle) : undefined,
   };
}

function pathFor(slug: string[] | undefined) {
   const pathSegments = slug ?? [];
   pathSegments.unshift('Store');
   return `/${pathSegments.join('/')}`;
}
