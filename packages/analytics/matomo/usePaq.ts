export function usePaq(): any[] | undefined {
   if (typeof window === 'undefined') {
      return undefined;
   }
   return (window as any)._paq;
}
