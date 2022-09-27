import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { PROD_HOSTNAME } from '@config/constants';
import { isNonNullable } from '@ifixit/helpers';

type Header = [string, string] | null;

export function middleware(request: NextRequest) {
   const robotTag: Header =
      request.nextUrl.hostname === PROD_HOSTNAME
         ? ['X-Robots-Tag', 'noindex, nofollow']
         : null;

   const headers = [robotTag].filter(isNonNullable);
   return NextResponse.next({ headers });
}
