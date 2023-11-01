import type { GetServerSidePropsContext } from 'next';

export function urlFromContext(context: GetServerSidePropsContext): string {
   const protocol = context.req.headers.referer?.split('://')[0] || 'https';
   return `${protocol}://${context.req.headers.host}${context.resolvedUrl}`;
}
