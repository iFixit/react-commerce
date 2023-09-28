export function parseJSONMetafield(value: string | null | undefined): unknown {
   if (value == null) {
      return null;
   }
   try {
      return JSON.parse(value);
   } catch (error) {
      return null;
   }
}
