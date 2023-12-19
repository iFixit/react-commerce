import type { Strapi } from '@strapi/strapi';
import { downloadBackup } from './backup/download';
import { exportBackup } from './backup/export';
import { importBackup } from './backup/import';
import { importContentTypes } from './custom';

export default ({ strapi }: { strapi: Strapi }) => ({
   exportBackup,
   downloadBackup,
   importBackup,
   importContentTypes,
   async createAdminUser() {
      const data: Record<string, any> = {
         username: process.env.ADMIN_USER || 'admin',
         password: process.env.ADMIN_PASS || 'Password1',
         firstname: process.env.ADMIN_USER || 'Admin',
         lastname: process.env.ADMIN_USER || 'Admin',
         email: process.env.ADMIN_EMAIL || 'strapi@ifixit.com',
         blocked: false,
         isActive: true,
      };
      //Check if any account exists.
      const admins = await strapi.db!.query('admin::user').findMany({});

      if (admins.length > 0) {
         strapi.log.info('👤 Admin user already exists');
      } else {
         try {
            let tempPass = data.password;
            let superAdminRole = await strapi.db!.query('admin::role').findOne({
               where: {
                  code: 'strapi-super-admin',
               },
            });
            if (!superAdminRole) {
               superAdminRole = await strapi.db!.query('admin::role').create({
                  data: {
                     name: 'Super Admin',
                     code: 'strapi-super-admin',
                     description:
                        'Super Admins can access and manage all features and settings.',
                  },
               });
            }
            data.roles = [superAdminRole.id];
            // @ts-ignore
            data.password = await strapi.admin.services.auth.hashPassword(
               data.password
            );
            await strapi.query('admin::user').create({
               data: data,
            });
            strapi.log.info('👤 Admin account was successfully created.');
            strapi.log.info(`    📧 Email:    ${data.email}`);
            strapi.log.info(`    🔑 Password: ${tempPass}`);
         } catch (error) {
            strapi.log.error(
               `Couldn't create Admin account during bootstrap: `,
               error
            );
         }
      }
   },
});
