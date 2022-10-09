const _paq: any[] | undefined =
   typeof window === 'undefined' ? undefined : (window as any)._paq;

/**
 * @see https://developer.matomo.org/api-reference/tracking-javascript
 */
export function trackPageView(url: string) {
   if (!_paq) {
      return;
   }
   _paq.push(['setCustomUrl', url]);
   _paq.push(['setDocumentTitle', document.title]);
   _paq.push(['trackPageView']);
}
