import '@strapi/strapi';
import type { ContentTypeSchema } from '../content-types';
import { downloadBackup } from './backup/download';
import { exportBackup } from './backup/export';
import { importBackup } from './backup/import';
import { CollectionTypeRepository } from './collection-type-repository';
import { MediaRepository } from './media-repository';
import { SingleTypeRepository } from './single-type-repository';

export type SeedResult = {
   contentTypes: Record<
      string,
      {
         count: number;
      }
   >;
   media: {
      count: number;
   };
};

const FALLBACK_STRAPI_ORIGIN = 'https://main.govinor.com';

type ImportContentTypesOptions = {
   strapiOrigin?: string;
   canDeleteExistingContent?: boolean;
};

export default ({ strapi }: { strapi: Strapi.Strapi }) => ({
   exportBackup,
   downloadBackup,
   importBackup,
   async importContentTypes({
      strapiOrigin = FALLBACK_STRAPI_ORIGIN,
      canDeleteExistingContent = false,
   }: ImportContentTypesOptions): Promise<SeedResult> {
      const mediaRepo = new MediaRepository({ strapi });
      const allTypeUIDs = Object.keys(strapi.contentTypes);
      const apiTypeUIDs = allTypeUIDs.filter((type) =>
         type.startsWith('api::')
      );
      const repos = apiTypeUIDs.map((uid) => {
         const schema: ContentTypeSchema = strapi.contentType(uid);
         switch (schema.kind) {
            case 'collectionType': {
               return new CollectionTypeRepository({
                  strapi,
                  uid,
               });
            }
            case 'singleType': {
               return new SingleTypeRepository({
                  strapi,
                  uid,
               });
            }
         }
      });

      let shouldSeed = false;
      if (canDeleteExistingContent) {
         shouldSeed = true;
      } else {
         for (const repo of repos) {
            const isRepoSeeded = await repo.isSeeded();
            if (!isRepoSeeded) {
               shouldSeed = true;
               break;
            }
         }
      }

      if (repos.length === 0 || !shouldSeed) {
         strapi.log.info('🌱 Nothing to seed. Skipping..');
         return { contentTypes: {}, media: { count: 0 } };
      }

      await mediaRepo.dangerouslyReset();

      for (const repo of repos) {
         await repo.dangerouslyReset();
         await repo.import({
            strapiOrigin,
         });
         mediaRepo.addMedia(repo.mediaItems);
         await repo.saveAttributes();
      }

      await mediaRepo.save();

      let seedByCollection: SeedResult['contentTypes'] = {};

      for (const repo of repos) {
         await repo.saveNestedAttributes();
         seedByCollection[repo.uid] = {
            count: repo.count,
         };
         strapi.log.info(`🌱 ${repo.displayName} seeded.`);
      }

      return {
         contentTypes: seedByCollection,
         media: { count: mediaRepo.count },
      };
   },
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
      const admins = await strapi.db.query('admin::user').findMany({});

      if (admins.length > 0) {
         strapi.log.info('👤 Admin user already exists');
      } else {
         try {
            let tempPass = data.password;
            let superAdminRole = await strapi.db.query('admin::role').findOne({
               where: {
                  code: 'strapi-super-admin',
               },
            });
            if (!superAdminRole) {
               superAdminRole = await strapi.db.query('admin::role').create({
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
