const withTM = require('next-transpile-modules')([
   '@ifixit/ui',
   '@ifixit/icons',
   '@ifixit/auth-sdk',
   '@ifixit/newsletter-sdk',
   '@ifixit/helpers',
]);

module.exports = withTM({
   env: {
      ALGOLIA_API_KEY: process.env.ALGOLIA_API_KEY,
      NEXT_PUBLIC_ALGOLIA_APP_ID: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
      NEXT_PUBLIC_IFIXIT_ORIGIN: process.env.NEXT_PUBLIC_IFIXIT_ORIGIN,
      NEXT_PUBLIC_STRAPI_ORIGIN: process.env.NEXT_PUBLIC_STRAPI_ORIGIN,
   },
   async rewrites() {
      return [
         {
            source: '/uploads/:name',
            destination: `${process.env.NEXT_PUBLIC_STRAPI_ORIGIN}/uploads/:name`,
         },
      ];
   },
   async redirects() {
      return [
         {
            source: '/Store/Guide/:guideid',
            destination: `${process.env.NEXT_PUBLIC_IFIXIT_ORIGIN}/Guide/_/:guideid`,
            permanent: true,
         },
      ];
   },
   images: {
      domains: [
         'localhost',
         'cdn.shopify.com',
         'strapi.cominor.com',
         'valkyrie.cdn.ifixit.com',
         'cart-products.cdn.ifixit.com',
         'assets.cdn.ifixit.com',
         'www.cominor.com',
         'guide-images.cdn.ifixit.com',
      ],
   },
   i18n: {
      locales: ['en-US'],
      defaultLocale: 'en-US',
   },
});
