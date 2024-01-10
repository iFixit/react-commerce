import { flags } from '@config/flags';
import { notFound } from 'next/navigation';

interface ProductPageProps {
   params: {
      handle: string;
   };
   searchParams: {
      disableCacheGets?: string | string[] | undefined;
      variant?: string;
   };
}

export default function ProductPage({ params }: ProductPageProps) {
   if (!flags.APP_ROUTER_PRODUCT_PAGE_ENABLED) notFound();

   return <div>Product: {params.handle}</div>;
}
