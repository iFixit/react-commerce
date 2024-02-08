import { flags } from '@config/flags';
import { notFound } from 'next/navigation';

interface WikiPageProps {
   params: {
      device: string;
      problem: string;
      wikiid: string;
   };
   searchParams: {
      disableCacheGets?: string | string[] | undefined;
      variant?: string;
   };
}

export default async function WikiPage({ params }: WikiPageProps) {
   if (!flags.APP_ROUTER_TROUBLESHOOTING_PAGE_ENABLED) notFound();

   return (
      <div>
         WikiPage: <code>{JSON.stringify(params, null, 2)}</code>
      </div>
   );
}
