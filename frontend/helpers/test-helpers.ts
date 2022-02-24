/**
 * Merges the value in the window object if Cypress is detected.
 * @param value The value to merge in the window object.
 */
export function cypressWindowLog(value: { [key: string]: any }) {
   if (typeof window !== 'undefined') {
      if ((window as any).Cypress) {
         for (const key in value) {
            (window as any)[key] = value[key];
         }
      }
   }
}
