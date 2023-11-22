import { Strapi, UID } from '@strapi/strapi';
import { omit } from 'lodash';

const IGNORED_FIELDS = ['createdBy', 'updatedBy', 'localizations'];
export class PopulateParamBuilder {
   private populate: string[] = [];

   constructor(
      private strapi: Strapi,
      private uid: UID.ContentType,
      private maxDepth = 2
   ) {}

   public build() {
      this.populate = [];
      const schema = this.strapi.contentType(this.uid);
      const fields = omit(schema.attributes, IGNORED_FIELDS);
      this.addNestedFields(fields);
      return this.populate;
   }

   private addNestedFields(
      fields: Record<string, any>,
      prefix = '',
      depth = 0
   ) {
      for (const key in fields) {
         const field = fields[key];
         const path = prefix ? `${prefix}.${key}` : key;

         switch (field.type) {
            case 'component':
               this.populate.push(path);
               if (depth < this.maxDepth) {
                  const nestedFields =
                     this.strapi.components[field.component].attributes;
                  this.addNestedFields(nestedFields, path, depth + 1);
               }
               break;

            case 'dynamiczone':
               this.populate.push(path);
               if (depth < this.maxDepth) {
                  field.components.forEach((componentName: UID.Component) => {
                     const componentFields =
                        this.strapi.components[componentName].attributes;
                     this.addNestedFields(componentFields, path, depth + 1);
                  });
               }
               break;

            case 'relation':
            case 'media':
               this.populate.push(path);
               break;
         }
      }
   }
}
