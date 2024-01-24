import { flags } from '@config/flags';
import { notFound } from 'next/navigation';

export interface PartsPageProps {}

export default async function PartsPage() {
   if (!flags.APP_ROUTER_PARTS_PAGE_ENABLED) notFound();

   return <div>Parts page</div>;
}
