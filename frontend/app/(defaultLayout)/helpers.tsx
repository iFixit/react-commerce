import { ifixitOriginFromHost } from '@helpers/path-helpers';
import { GetServerSidePropsContext } from 'next';
import { headers } from 'next/headers';

export function iterableToObj(
   iterator: IterableIterator<[string, string]>
): Record<string, string> {
   const result: Record<string, string> = {};
   let item = iterator.next();
   while (!item.done) {
      const [key, value] = item.value;
      result[key] = value;
      item = iterator.next();
   }
   return result;
}

export function ifixitOriginFromHostWrapper(): string {
   const readonlyHeaders = headers();
   const headersObj = iterableToObj(readonlyHeaders.entries());
   return ifixitOriginFromHost({
      req: { headers: headersObj },
   } as GetServerSidePropsContext);
}
