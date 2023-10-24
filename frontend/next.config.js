/* eslint-disable @ifixit/no-new-error */
/** @type {import('next').NextConfig} */

const {
   getLegacyPartItemTypeRedirects,
} = require('./next-config/redirects/part-collections');
const {
   getLegacyToolRedirects,
} = require('./next-config/redirects/tool-collections');

const { withSentryConfig } = require('@sentry/nextjs');

const withBundleStats =
   process.env.ANALYZE === 'true'
      ? require('next-plugin-bundle-stats')()
      : (arg) => arg;

const withBundleAnalyzer =
   process.env.ANALYZE === 'true'
      ? require('@next/bundle-analyzer')()
      : (arg) => arg;
const sentryWebpackPluginOptions = {
   // Additional config options for the Sentry Webpack plugin. Keep in mind that
   // the following options are set automatically, and overriding them is not
   // recommended:
   //   release, url, org, project, authToken, configFile, stripPrefix,
   //   urlPrefix, include, ignore

   silent: true, // Suppresses all logs
   // For all available options, see:
   // https://github.com/getsentry/sentry-webpack-plugin#options.
};
const SENTRY_AUTH_TOKEN = process.env.SENTRY_AUTH_TOKEN;

const strapiOrigin = requireStrapiOrigin();

console.log('Strapi API: ' + strapiOrigin);
console.log('iFixit API: ' + process.env.NEXT_PUBLIC_IFIXIT_ORIGIN);

const moduleExports = {
   transpilePackages: [
      '@ifixit/analytics',
      '@ifixit/app',
      '@ifixit/auth-sdk',
      '@ifixit/breadcrumbs',
      '@ifixit/cart-sdk',
      '@ifixit/footer',
      '@ifixit/helpers',
      '@ifixit/icons',
      '@ifixit/ifixit-api-client',
      '@ifixit/local-storage',
      '@ifixit/newsletter-sdk',
      '@ifixit/sentry',
      '@ifixit/shopify-storefront-client',
      '@ifixit/ui',
      '@ifixit/menu',
      '@ifixit/tracking-hooks',
   ],
   distDir: process.env.NEXT_DIST_DIR ?? '.next',
   env: {
      NEXT_PUBLIC_STRAPI_ORIGIN: strapiOrigin,
   },
   async headers() {
      return [
         {
            // Nnoindex all responses. Requests to www.ifixit.com that go
            // through cloudfront will have this header stripped off by a
            // cloudfront function. This effectively noindexes all vercel urls
            // that our pages are served from.
            source: '/:path*',
            headers: [
               {
                  key: 'x-robots-tag',
                  value: 'noindex, nofollow, nosnippet, noarchive, noimageindex',
               },
            ],
         },
      ];
   },
   async rewrites() {
      return [
         {
            source: '/uploads/:name',
            destination: `${strapiOrigin}/uploads/:name`,
         },
      ];
   },
   async redirects() {
      return [
         ...getLegacyPartItemTypeRedirects(),
         ...getLegacyToolRedirects(),
         {
            source: '/Store/Guide/:guideid',
            destination: `${process.env.NEXT_PUBLIC_IFIXIT_ORIGIN}/Guide/_/:guideid`,
            permanent: true,
         },
         {
            source: '/products/sitemap.xml',
            destination: `${process.env.NEXT_PUBLIC_IFIXIT_ORIGIN}/sitemap/products.xml`,
            permanent: true,
         },
         {
            source: '/Parts/sitemap.xml',
            destination: `${process.env.NEXT_PUBLIC_IFIXIT_ORIGIN}/sitemap/parts.xml`,
            permanent: true,
         },
         {
            source: '/Tools/sitemap.xml',
            destination: `${process.env.NEXT_PUBLIC_IFIXIT_ORIGIN}/sitemap/tools.xml`,
            permanent: true,
         },
         {
            source: '/Shop/sitemap.xml',
            destination: `${process.env.NEXT_PUBLIC_IFIXIT_ORIGIN}/sitemap/marketing.xml`,
            permanent: true,
         },
         {
            source: '/Troubleshooting/sitemap.xml',
            destination: `${process.env.NEXT_PUBLIC_IFIXIT_ORIGIN}/sitemap/troubleshooting.xml`,
            permanent: true,
         },
         {
            source: '/Parts/Over-Ear_Headphone',
            destination: `${process.env.NEXT_PUBLIC_IFIXIT_ORIGIN}/Parts/Headphone`,
            permanent: true,
         },
         {
            source: '/Tools/Wii',
            destination: `${process.env.NEXT_PUBLIC_IFIXIT_ORIGIN}/Tools/Nintendo_Wii`,
            permanent: true,
         },
         {
            source: '/Tools/Computer',
            destination: `${process.env.NEXT_PUBLIC_IFIXIT_ORIGIN}/Tools/PC`,
            permanent: true,
         },
      ];
   },
   images: {
      domains: [
         'localhost',
         'cdn.shopify.com',
         'strapi.cominor.com',
         'www.cominor.com',
         'ifixit.com',
         'valkyrie.cdn.ifixit.com',
         'cart-products.cdn.ifixit.com',
         'assets.cdn.ifixit.com',
         'www.cominor.com',
         'guide-images.cdn.ifixit.com',
         process.env.STRAPI_IMAGE_DOMAIN,
      ].filter((domain) => domain),
      minimumCacheTTL: 3600,
   },
   i18n: {
      locales: ['en-US'],
      defaultLocale: 'en-US',
   },
   webpack(config) {
      config.module.rules.push({
         test: /\.svg$/i,
         issuer: /\.tsx?$/,
         use: ['@svgr/webpack'],
      });
      return config;
   },
   sentry: {
      // Upload artifacts in dist/framework as well; this includes sourcemaps
      // for react and other next.js code
      widenClientFileUpload: true,
      ...(!SENTRY_AUTH_TOKEN && {
         disableServerWebpackPlugin: true,
         disableClientWebpackPlugin: true,
      }),
   },
   swcMinify: false,
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(
   withBundleStats(withBundleAnalyzer(moduleExports)),
   SENTRY_AUTH_TOKEN ? sentryWebpackPluginOptions : undefined
);

function requireStrapiOrigin() {
   if (process.env.NEXT_PUBLIC_STRAPI_ORIGIN) {
      return process.env.NEXT_PUBLIC_STRAPI_ORIGIN;
   }
   const branch = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF;
   if (typeof branch !== 'string' || branch.trim().length === 0) {
      throw new Error(
         'NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF environment variable is not set'
      );
   }
   return `https://${getGovinorBranchHandle(branch)}.govinor.com`;
}

/**
 * This function takes a branch name and returns a handle that can be used to form the Strapi origin as
 * setup by Govinor. The handle is a handleized version of the branch name, with a hash appended to the end
 * if the handle is too long.
 * @param {String} branchName
 * @returns {String} handle for the branch
 */
function getGovinorBranchHandle(branchName) {
   const MAX_DOMAIN_LENGTH = 63;
   const BRANCH_HASH_LENGTH = 8;
   const handle = branchName.replace(/\//g, '-').replace(/_/g, '-');

   if (handle.length <= MAX_DOMAIN_LENGTH) {
      return handle;
   }

   const crypto = require('crypto');
   const hash = crypto
      .createHash('sha1')
      .update(branchName)
      .digest('hex')
      .substring(0, BRANCH_HASH_LENGTH);
   const truncatedHandle = handle.substring(
      0,
      MAX_DOMAIN_LENGTH - BRANCH_HASH_LENGTH
   );
   return `${truncatedHandle}${hash}`;
}
