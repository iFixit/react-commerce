module.exports = ({ env }) => {
   const exports = {
      seed: {
         enabled: true,
         resolve: './src/plugins/seed',
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
               upload: {},
               uploadStream: {},
               delete: {},
            },
         },
      };
   }

   return exports;
};
