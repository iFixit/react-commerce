import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { PROD_USER_AGENT } from '@config/constants';

export function middleware(request: NextRequest) {
   const init =
      request.headers.get('user-agent') === PROD_USER_AGENT
         ? undefined
         : { headers: { 'X-Robots-Tag': 'noindex, nofollow' } };
   return NextResponse.next(init);
}
