import '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi.Strapi }) => ({
   async importContentTypes(ctx) {
      const result = await strapi
         .plugin('addons')
         .service('seed')
         .importContentTypes();
      ctx.body = result;
   },
});
