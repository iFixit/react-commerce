import { Schema, Strapi, UID } from '@strapi/strapi';
import { ContentRecord } from './content-record';
import {
   Attribute,
   ComponentAttribute,
   DynamicZoneAttribute,
   ManyRelationAttribute,
   MediaAttribute,
   OneRelationAttribute,
   RelationAttribute,
   RepeatableComponentAttribute,
   ScalarAttribute,
} from './content-record';

interface RecordJSON {
   id: number;
   attributes: Record<string, any>;
}

export class ContentRecordParser {
   private parser: AttributeParser;

   constructor(
      private strapi: Strapi,
      private contentTypeUID: UID.ContentType
   ) {
      this.parser = new AttributeParser(strapi);
   }

   parse(jsonRecord: RecordJSON): ContentRecord {
      const attributes: Record<string, Attribute | null> = {};
      for (const key in jsonRecord.attributes) {
         attributes[key] = this.parser.parse(
            key,
            jsonRecord.attributes[key],
            this.strapi.contentType(this.contentTypeUID)
         );
      }
      return new ContentRecord(jsonRecord.id, attributes);
   }
}

interface ComponentJSON {
   id: number;
   __component: UID.Component;
   [key: string]: any; // Additional attributes with dynamic keys
}

interface RepeatableComponentJSON {
   id: number;
   [key: string]: any; // Additional attributes with dynamic keys
}

type DynamicZoneJSON = ComponentJSON[];

interface RelationJSON {
   data: RecordJSON | RecordJSON[];
}

interface MediaJSON {
   data: {
      id: number;
      attributes: {
         alternativeText: string | null;
         url: string;
         [key: string]: any;
      };
   } | null;
}

class AttributeParser {
   constructor(private strapi: Strapi) {}

   parse(key: string, value: any, schema: Schema.Schema): Attribute | null {
      const attributeSchema = schema.attributes[key];

      if (value == null) return null;

      if (!attributeSchema) {
         throw new Error(`Schema not found for key ${key}`);
      }

      switch (attributeSchema.type) {
         case 'relation':
            return this.createRelationAttribute(value);
         case 'component': {
            if (attributeSchema.repeatable) {
               return this.createRepeatableComponentAttribute(
                  attributeSchema.component,
                  value
               );
            }

            return this.createComponentAttribute(
               attributeSchema.component,
               value
            );
         }
         case 'dynamiczone':
            return this.createDynamicZoneAttribute(value);
         case 'media':
            return this.createMediaAttribute(value);
         default:
            return new ScalarAttribute(value);
      }
   }

   private createRepeatableComponentAttribute(
      componentUID: UID.Component,
      componentValue: RepeatableComponentJSON[]
   ): RepeatableComponentAttribute {
      return new RepeatableComponentAttribute(
         componentValue.map((json) =>
            this.createComponentAttribute(componentUID, {
               ...json,
               __component: componentUID,
            })
         )
      );
   }

   private createComponentAttribute(
      componentUID: UID.Component,
      componentValue: ComponentJSON
   ): ComponentAttribute {
      const componentSchema = this.getComponentSchema(componentUID);
      if (!componentSchema) {
         throw new Error(`Schema not found for component ${componentUID}`);
      }

      const attributes: Record<string, Attribute | null> = {};
      for (const key in componentValue) {
         if (key !== 'id' && key !== '__component') {
            attributes[key] = this.parse(
               key,
               componentValue[key],
               componentSchema
            );
         }
      }
      return new ComponentAttribute(
         componentValue.id,
         attributes,
         componentUID
      );
   }

   private createDynamicZoneAttribute(
      dynamicZoneValue: DynamicZoneJSON
   ): DynamicZoneAttribute | null {
      const components: ComponentAttribute[] = [];
      for (const componentJson of dynamicZoneValue) {
         const componentSchema = this.getComponentSchema(
            componentJson.__component
         );
         if (!componentSchema) {
            throw new Error(
               `Schema not found for component ${componentJson.__component}`
            );
         }
         components.push(
            this.createComponentAttribute(
               componentJson.__component,
               componentJson
            )
         );
      }
      return new DynamicZoneAttribute(components);
   }

   private createRelationAttribute(
      relationValue: RelationJSON
   ): RelationAttribute | null {
      if (relationValue.data == null) return null;

      if (Array.isArray(relationValue.data)) {
         return new ManyRelationAttribute(
            relationValue.data.map((record) => record.id)
         );
      } else {
         return new OneRelationAttribute(relationValue.data.id);
      }
   }

   private createMediaAttribute(mediaValue: MediaJSON): MediaAttribute | null {
      if (mediaValue.data == null) return null;

      return new MediaAttribute(
         mediaValue.data.id,
         mediaValue.data.attributes.alternativeText,
         mediaValue.data.attributes.url,
         mediaValue.data.attributes
      );
   }

   private getComponentSchema(componentUID: UID.Component) {
      return this.strapi.components[componentUID];
   }
}
