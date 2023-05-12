const URL_REGEX = /^https?:\/\//i;

export function parseValidUrl(value: unknown): URL | null {
   if (typeof value !== 'string' || value.trim().length === 0) {
      return null;
   }

   const domain = value.trim();
   const urlString = URL_REGEX.test(domain) ? domain : `https://${domain}`;

   return new URL(urlString);
}
