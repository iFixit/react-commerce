export class ContentRecord {
   constructor(
      public readonly id: number,
      public readonly attributes: Record<string, Attribute | null> = {}
   ) {}

   toInput() {
      const input: Record<string, any> = {};
      for (const key in this.attributes) {
         const attribute = this.attributes[key];
         if (attribute) {
            input[key] = attribute.toInput();
         }
      }
      return input;
   }

   get mediaAttributes() {
      const media: MediaAttribute[] = [];
      for (const key in this.attributes) {
         const attribute = this.attributes[key];
         if (attribute instanceof MediaAttribute) {
            media.push(attribute);
         } else if (attribute instanceof ComponentAttribute) {
            media.push(...attribute.mediaAttributes);
         } else if (attribute instanceof RepeatableComponentAttribute) {
            media.push(...attribute.mediaAttributes);
         } else if (attribute instanceof DynamicZoneAttribute) {
            media.push(...attribute.mediaAttributes);
         }
      }
      return media;
   }

   static onlyScalarAttributes(record: ContentRecord) {
      const scalarAttrs: Record<string, Attribute | null> = {};
      for (const key in record.attributes) {
         const attribute = record.attributes[key];
         if (attribute instanceof ScalarAttribute) {
            scalarAttrs[key] = attribute;
         }
      }
      return new ContentRecord(record.id, scalarAttrs);
   }

   static onlyPopulatableAttributes(record: ContentRecord) {
      const populatableAttrs: Record<string, Attribute | null> = {};
      for (const key in record.attributes) {
         const attribute = record.attributes[key];
         if (!(attribute instanceof ScalarAttribute)) {
            populatableAttrs[key] = attribute;
         }
      }
      return new ContentRecord(record.id, populatableAttrs);
   }
}

export abstract class Attribute {
   abstract toInput(): any;
}

export class ScalarAttribute extends Attribute {
   constructor(public readonly value: any) {
      super();
   }

   toInput() {
      return this.value;
   }
}

export class ComponentAttribute extends Attribute {
   constructor(
      public readonly id: number,
      public readonly attributes: Record<string, Attribute | null>,
      public readonly componentType: string
   ) {
      super();
   }

   toInput() {
      const input: Record<string, any> = {};
      for (const key in this.attributes) {
         const attribute = this.attributes[key];
         if (attribute) {
            input[key] = attribute.toInput();
         }
      }
      return input;
   }

   get mediaAttributes() {
      const media: MediaAttribute[] = [];
      for (const key in this.attributes) {
         const attribute = this.attributes[key];
         if (attribute instanceof MediaAttribute) {
            media.push(attribute);
         } else if (attribute instanceof ComponentAttribute) {
            media.push(...attribute.mediaAttributes);
         } else if (attribute instanceof RepeatableComponentAttribute) {
            media.push(...attribute.mediaAttributes);
         } else if (attribute instanceof DynamicZoneAttribute) {
            media.push(...attribute.mediaAttributes);
         }
      }
      return media;
   }
}

export class RepeatableComponentAttribute extends Attribute {
   constructor(public readonly components: ComponentAttribute[]) {
      super();
   }

   toInput() {
      return this.components.map((component) => component.toInput());
   }

   get mediaAttributes() {
      const media: MediaAttribute[] = [];
      for (const component of this.components) {
         media.push(...component.mediaAttributes);
      }
      return media;
   }
}

export abstract class RelationAttribute extends Attribute {}

export class OneRelationAttribute extends RelationAttribute {
   constructor(public readonly id: number) {
      super();
   }

   toInput() {
      return this.id;
   }
}

export class ManyRelationAttribute extends RelationAttribute {
   constructor(public readonly ids: number[]) {
      super();
   }

   toInput() {
      return this.ids.length > 0
         ? {
              connect: this.ids,
           }
         : undefined;
   }
}

export class DynamicZoneAttribute extends Attribute {
   constructor(public readonly components: ComponentAttribute[]) {
      super();
   }

   toInput() {
      return this.components.map((component) => {
         return {
            __component: component.componentType,
            ...component.toInput(),
         };
      });
   }

   get mediaAttributes() {
      const media: MediaAttribute[] = [];
      for (const component of this.components) {
         media.push(...component.mediaAttributes);
      }
      return media;
   }
}

export class MediaAttribute extends Attribute {
   constructor(
      public readonly id: number,
      public readonly alternativeText: string | null,
      private url: string,
      public readonly attributes: Record<string, any>
   ) {
      super();
   }

   toInput() {
      /**
       * @TODO: While we figure out how to correctly import media, we'll just
       * skip saving it for now
       */
      // return this.id;
      return null;
   }
}
