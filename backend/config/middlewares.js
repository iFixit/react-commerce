module.exports = ({ env }) => {
   return [
      'strapi::errors',
      env('S3_BUCKET') ? securitySectionWithS3() : 'strapi::security',
      'strapi::cors',
      'strapi::poweredBy',
      'strapi::logger',
      'strapi::query',
      'strapi::body',
      'strapi::favicon',
      'strapi::public',
   ];

   function securitySectionWithS3() {
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
                     `${env('S3_BUCKET')}.s3.${env(
                        'AWS_REGION'
                     )}.amazonaws.com`,
                  ],
                  'media-src': [
                     "'self'",
                     'data:',
                     'blob:',
                     `${env('S3_BUCKET')}.s3.${env(
                        'AWS_REGION'
                     )}.amazonaws.com`,
                  ],
                  upgradeInsecureRequests: null,
               },
            },
         },
      };
   }
};
