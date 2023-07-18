export default ({ env }) => {
   return [
      'strapi::errors',
      env('S3_BUCKET') ? securitySectionWithS3() : 'strapi::security',
      'strapi::cors',
      'strapi::poweredBy',
      'strapi::logger',
      'strapi::query',
      {
         name: 'strapi::body',
         config: {
            jsonLimit: '50mb',
         },
      },
      // 'strapi::session',
      'strapi::favicon',
      'strapi::public',
   ];

   function securitySectionWithS3() {
      const awsRegion = env('AWS_REGION');
      const s3RegionDomain =
         awsRegion === 'us-east-1' ? 's3' : `s3.${awsRegion}`;
      return {
         name: 'strapi::security',
         config: {
            contentSecurityPolicy: {
               useDefaults: true,
               directives: {
                  'connect-src': ["'self'", 'https:'],
                  'img-src': [
                     "'self'",
                     'data:',
                     'blob:',
                     `${env('S3_BUCKET')}.${s3RegionDomain}.amazonaws.com`,
                  ],
                  'media-src': [
                     "'self'",
                     'data:',
                     'blob:',
                     `${env('S3_BUCKET')}.${s3RegionDomain}.amazonaws.com`,
                  ],
                  upgradeInsecureRequests: null,
               },
            },
         },
      };
   }
};
