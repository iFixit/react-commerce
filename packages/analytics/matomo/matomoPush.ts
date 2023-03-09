declare global {
   interface Window {
      _paq?: { push: (args: any[]) => void };
   }
}

export function matomoPush(data: any[]) {
   if (typeof window === 'undefined') {
      return;
   }

   const _paq = (window._paq = window._paq || new Array());
   _paq.push(data);
}
