interface SafeStorage {
   getItem(key: string): string | null;
   setItem(key: string, value: string): void;
   removeItem(key: string): void;
   key(index: number): string | null;
   clear(): void;
}

export function useSafeLocalStorage(): SafeStorage {
   const safeLocalStorage = {
      setItem: function (key: string, value: string): void {
         try {
            localStorage.setItem(key, value);
         } catch (error) {}
      },

      getItem: function (key: string): string | null {
         try {
            const item = localStorage.getItem(key);
            if (item === null || item === 'null') {
               return null;
            }
            return item;
         } catch (error) {
            return null;
         }
      },

      removeItem: function (key: string): void {
         try {
            localStorage.removeItem(key);
         } catch (error) {}
      },

      key: function (index: number): string | null {
         try {
            return localStorage.key(index);
         } catch (error) {
            return null;
         }
      },

      clear: function (): void {
         try {
            localStorage.clear();
         } catch (error) {}
      },
   };
   return safeLocalStorage;
}
