import type { Strapi } from '@strapi/strapi';
import { chunk } from 'lodash';
import { MediaItem } from './types';

type ConstructorArgs = {
   strapi: Strapi;
};

const FILES_TABLE_NAME = 'files';

export class MediaRepository {
   private strapi: Strapi;
   private mediaById: Record<string, MediaItem> = {};

   constructor({ strapi }: ConstructorArgs) {
      this.strapi = strapi;
   }

   async addMedia(media: MediaItem | MediaItem[]) {
      const list = Array.isArray(media) ? media : [media];
      list.forEach((item) => {
         this.mediaById[item.id] = item;
      });
   }

   get count() {
      return this.items.length;
   }

   get items() {
      return Object.values(this.mediaById);
   }

   /**
    * WARNING: This method truncates the files table! This method is useful during development.
    */
   async dangerouslyReset() {
      // @ts-ignore
      const knex = this.strapi.db.connection;
      await knex(FILES_TABLE_NAME).del();
   }

   async save() {
      const batches = chunk(this.items, 20);
      // @ts-ignore
      const knex = this.strapi.db.connection;

      for (const batch of batches) {
         await knex
            .insert(
               batch.map((item) => {
                  return {
                     id: item.id,
                     name: item.attributes.name,
                     alternative_text: item.attributes.alternativeText,
                     caption: item.attributes.caption,
                     width: item.attributes.width,
                     height: item.attributes.height,
                     formats: JSON.stringify(item.attributes.formats),
                     hash: item.attributes.hash,
                     ext: item.attributes.ext,
                     mime: item.attributes.mime,
                     size: item.attributes.size,
                     url: item.attributes.url,
                     preview_url: item.attributes.previewUrl,
                     provider: item.attributes.provider,
                     provider_metadata: item.attributes.provider_metadata,
                  };
               }),
               ['id']
            )
            .into(FILES_TABLE_NAME);
      }
   }
}
