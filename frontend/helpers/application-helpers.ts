import { SentryError } from '@ifixit/sentry';
export type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;
export type ObjectLiteral = { [key: string]: any };

export function capitalize(text: string): string {
   return text.slice(0, 1).toUpperCase() + text.slice(1);
}

export function keyBy<T extends ObjectLiteral>(
   list: T[],
   keyField: keyof T
): Record<string, T> {
   return list.reduce((dict, item) => {
      dict[item[keyField]] = item;
      return dict;
   }, {} as Record<string, T>);
}

export interface GetResizedImageInput {
   src: string;
   width: number;
}

export function getResizedImage({ src, width }: GetResizedImageInput) {
   const match = src.match(/^(https:\/\/cdn.shopify.com.+)\.(jpg|png)\?(.+)/);
   if (match == null) {
      return src;
   }
   const [_fullSrc, baseSrc, extension, query] = match;
   return `${baseSrc}_${width}x.${extension}?${query}`;
}

export function filterNullableItems<I>(
   items?: I[] | undefined | null
): NonNullable<I>[] {
   return (items?.filter((item) => item != null) as any) || [];
}

/**
 * A helper function to remove [falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) items from an array.
 * @param items A list of items
 * @returns The list of non blank items
 */
export function filterFalsyItems<I>(
   items?: I[] | undefined | null
): NonNullable<I>[] {
   return (items?.filter((item) => Boolean(item)) as any) || [];
}

const isProduction = process.env.NODE_ENV === 'production';
const prefix = 'invariant failed';

export function invariant(
   condition: any,
   message?: string | (() => string)
): asserts condition {
   if (condition) {
      return;
   }

   if (isProduction) {
      throw new SentryError(prefix);
   }

   const provided: string | undefined =
      typeof message === 'function' ? message() : message;

   const value: string = provided ? `${prefix}: ${provided}` : prefix;
   throw new SentryError(value);
}
