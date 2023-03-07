declare global {
   interface Window {
       _paq: any;
   }
}

export function usePaq(): any[] | undefined {
   if (typeof window === 'undefined') {
      return undefined;
   }

   var _paq = window._paq = window._paq || [];
   return _paq;
}
