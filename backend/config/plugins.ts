const oneYear = 86400 * 365;
const SENTRY_DSN = process.env.SENTRY_DSN;

export default ({ env }) => {
   const exports: any = {
      sentry: {
         enabled: !!SENTRY_DSN,
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
      publisher: {
         enabled: true,
         // See: https://market.strapi.io/plugins/strapi-plugin-publisher
         config: {
            components: {
               dateTimePicker: {
                  step: 15,
               },
            },
            hooks: {
               beforePublish: async ({ strapi, uid, entity }) => {},
               afterPublish: async ({ strapi, uid, entity }) => {},
               beforeUnpublish: async ({ strapi, uid, entity }) => {},
               afterUnpublish: async ({ strapi, uid, entity }) => {},
            },
         },
      },
      addons: {
         enabled: true,
         resolve: './src/plugins/addons',
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
