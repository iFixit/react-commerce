const oneYear = 86400 * 365;
const SENTRY_DEV_DSN =
   'https://95ab6917c0234f80b99bb0be8e720355@o186239.ingest.sentry.io/6475315';
const SENTRY_PROD_DSN =
   'https://003ddade86504df5aa49247ba36031e7@o186239.ingest.sentry.io/6469069';
const isProd = process.env.NODE_ENV === 'production';

module.exports = ({ env }) => {
   const exports = {
      seed: {
         enabled: true,
         resolve: './src/plugins/seed',
      },
      sentry: {
         enabled: true,
         config: {
            dsn: isProd ? SENTRY_PROD_DSN : SENTRY_DEV_DSN,
            init: {
               sampleRate: isProd ? 1.0 : 0.0,
               initialScope: {
                  tags: {
                     'next.runtime': 'strapi',
                  },
               },
            },
         },
      },
   };

   if (env('S3_BUCKET')) {
      exports.upload = {
         config: {
            provider: 'aws-s3',
            providerOptions: {
               // accessKeyId: access provided by machine IAM role
               // secretAccessKey: access provided by machine IAM role
               region: env('AWS_REGION'),
               params: {
                  Bucket: env('S3_BUCKET'),
               },
            },
            actionOptions: {
               upload: {
                  CacheControl: `max-age=${oneYear}`,
               },
               uploadStream: {
                  CacheControl: `max-age=${oneYear}`,
               },
               delete: {},
            },
         },
      };
   }

   return exports;
};
