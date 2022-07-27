import setDefaultPermissions from './permissions';

export default async function bootstrap({ strapi }) {
   try {
      await setDefaultPermissions(strapi);
   } catch (err) {
      strapi.log.error('💥 Error during bootstrap:', err);
   }
}
