import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { PROD_HOSTNAME } from '@config/constants';

export function middleware(request: NextRequest) {
   const robotTag =
      request.nextUrl.hostname === PROD_HOSTNAME ? '' : 'noindex, nofollow';
   return NextResponse.next({
      headers: {
         'X-Robots-Tag': robotTag,
      },
   });
}
