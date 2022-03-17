module.exports = {
   async rewrites() {
      return [
         {
            source: '/uploads/:name',
            destination: `${process.env.NEXT_PUBLIC_STRAPI_ORIGIN}/uploads/:name`,
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
      ],
   },
   i18n: {
      locales: ['en-US'],
      defaultLocale: 'en-US',
   },
};
