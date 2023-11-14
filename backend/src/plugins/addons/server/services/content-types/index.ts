import type { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
   findManyContentTypes: getFindManyContentTypes(strapi),
   findOneContentType: getFindOneContentType(strapi),
});

const getFindManyContentTypes = (strapi: Strapi) => () => {
   const allTypeUIDs = Object.keys(strapi.contentTypes);
   const apiTypeUIDs = allTypeUIDs.filter((type) => type.startsWith('api::'));
   return apiTypeUIDs.map((uid) => {
      // @ts-expect-error because the UID type definition is too silly
      return strapi.contentType(uid);
   });
};

const getFindOneContentType = (strapi: Strapi) => (uid: string) => {
   const findContentTypes = getFindManyContentTypes(strapi);
   return findContentTypes().find((schema) => schema.uid === uid);
};
