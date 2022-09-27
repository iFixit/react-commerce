import '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi.Strapi }) => ({
   async importContentTypes(ctx) {
      console.log('context', ctx.request.body);
      const strapiOrigin = ctx.request.body?.strapiOrigin;
      if (typeof strapiOrigin === 'string') {
         const result = await strapi
            .plugin('addons')
            .service('seed')
            .importContentTypes({
               strapiOrigin,
               canDeleteExistingContent: true,
            });
         ctx.body = result;
      } else {
         ctx.body = { error: 'invalid strapi origin' };
      }
   },
});
