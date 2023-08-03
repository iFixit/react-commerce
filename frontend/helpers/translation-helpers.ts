export function mapLangidToLocale(locale: string): string {
   switch (locale) {
      case 'de':
      case 'de-DE':
         return 'de-DE';
      default:
         return 'en';
   }
}
