import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { PROD_HOSTNAME } from '@config/constants';

export function middleware(request: NextRequest) {
   const init =
      request.nextUrl.hostname === PROD_HOSTNAME
         ? { headers: [['X-Robots-Tag', 'noindex, nofollow']] }
         : undefined;
   return NextResponse.next(init);
}
