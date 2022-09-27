import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { PROD_HOSTNAME } from '@config/constants';

type Header = [string, string];

export function middleware(request: NextRequest) {
   const robotTag: Header = [
      'X-Robots-Tag',
      request.nextUrl.hostname === PROD_HOSTNAME ? '' : 'noindex, nofollow',
   ];
   return NextResponse.next({
      headers: [robotTag].filter((header) => header[1]),
   });
}
