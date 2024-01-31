import { flags } from '@config/flags';
import { notFound } from 'next/navigation';

export interface StorePageProps {
   params: {
      slug?: string[];
   };
   searchParams: {
      disableCacheGets?: string | string[] | undefined;
   };
}

export default async function StorePage({ params }: StorePageProps) {
   if (!flags.STORE_PAGES_APP_ROUTER_ENABLED) notFound();
   return (
      <div>
         <h1>Store Page: {JSON.stringify(params.slug ?? '/', null, 2)}</h1>
      </div>
   );
}
