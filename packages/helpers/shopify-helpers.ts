export function getShopifyStoreDomainFromCurrentURL(): string | null {
   if (typeof window === 'undefined') return null;
   const host = window.location.hostname;
   switch (host) {
      case 'www.ifixit.com':
         return 'ifixit-us';
      case 'australia.ifixit.com':
         return 'ifixit-australia';
      case 'canada.ifixit.com':
         return 'ifixit-canada';
      case 'store.ifixit.de':
         return 'ifixit-de';
      case 'store.ifixit.fr':
         return 'ifixit-fr';
      case 'store.ifixit.it':
         return 'ifixit-it';
      case 'store.ifixit.co.uk':
         return 'ifixit-uk';
      case 'eustore.ifixit.com':
         return 'ifixit-eu';
      case 'eustore.ifixit.pro':
         return 'ifixit-eu-pro';
      case 'ifixit-dev.myshopify.com':
         return 'ifixit-dev';
      case 'store.cominor.com':
         return 'ifixit-test';
      case 'ifixit-eu-test.myshopify.com':
         return 'ifixit-eu-test';
      case 'ifixit-eu-pro-test.myshopify.com':
         return 'ifixit-eu-pro-test';
      default:
         break;
   }
   if (
      host.endsWith('.cominor.com') ||
      host.endsWith('ifixit.vercel.app') ||
      host === 'localhost'
   ) {
      return 'ifixit-test';
   }
   return null;
}

export function getShopifyLanguageFromCurrentURL(): string | null {
   if (typeof window === 'undefined') return null;
   const host = window.location.hostname;
   switch (host) {
      case 'www.ifixit.com':
         return 'EN';
      case 'store.cominor.com':
         return 'EN';
      default:
         break;
   }
   if (
      host.endsWith('.cominor.com') ||
      host.endsWith('ifixit.vercel.app') ||
      host === 'localhost'
   ) {
      return 'EN';
   }
   return null;
}
