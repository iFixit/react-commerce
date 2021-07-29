export function capitalize(text: string): string {
   return text.slice(0, 1).toUpperCase() + text.slice(1);
}

export function assertNever(x: never): never {
   throw new Error('Unexpected object: ' + x);
}

export interface GetResizedImageInput {
   src: string;
   width: number;
}

export function getResizedImage({ src, width }: GetResizedImageInput) {
   const match = src.match(/(.+)\.(jpg|png)\?(.+)/);
   if (match == null) {
      return '';
   }
   const [fullSrc, baseSrc, extension, query] = match;
   return `${baseSrc}_${width}x.${extension}?${query}`;
}
