const oneYear = 86400 * 365;
const SENTRY_DSN = process.env.SENTRY_DSN;

module.exports = ({ env }) => {
   const exports = {
      seed: {
         enabled: true,
         resolve: './src/plugins/seed',
      },
      sentry: {
         enabled: true,
         config: {
            dsn: SENTRY_DSN,
            init: {
               sampleRate: 1.0,
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
