import type { Strapi } from '@strapi/strapi';
import { chunk, mapValues } from 'lodash';
import { MediaAttribute } from './content-record';

const FILES_TABLE_NAME = 'files';

export class MediaStore {
   private strapi: Strapi;
   private mediaById: Record<string, MediaAttribute> = {};

   constructor(strapi: Strapi) {
      this.strapi = strapi;
   }

   async addMedia(media: MediaAttribute | MediaAttribute[]) {
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

   async save(strapiOrigin: string) {
      const batches = chunk(this.items, 20);
      // @ts-ignore
      const knex = this.strapi.db.connection;

      for (const batch of batches) {
         await knex
            .insert(
               batch.map((item) => {
                  const formats = mapValues(
                     item.attributes.formats,
                     (value, key) => {
                        return { ...value, url: `${strapiOrigin}${value.url}` };
                     }
                  );
                  return {
                     id: item.id,
                     name: item.attributes.name,
                     alternative_text: item.attributes.alternativeText,
                     caption: item.attributes.caption,
                     width: item.attributes.width,
                     height: item.attributes.height,
                     // formats: JSON.stringify(item.attributes.formats),
                     formats: JSON.stringify(formats),
                     hash: item.attributes.hash,
                     ext: item.attributes.ext,
                     mime: item.attributes.mime,
                     size: item.attributes.size,
                     url: `${strapiOrigin}${item.attributes.url}`,
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
