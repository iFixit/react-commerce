/**
 * @see https://developer.matomo.org/api-reference/tracking-javascript
 */

declare const _paq: string[][] | undefined;

export function trackPageView(url: string) {
   if (typeof window !== 'undefined' && _paq) {
      _paq.push(['setCustomUrl', url]);
      _paq.push(['setDocumentTitle', document.title]);
      _paq.push(['trackPageView']);
   }
}
