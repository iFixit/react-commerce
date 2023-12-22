import type { ToolsSectionFieldsFragment } from '@lib/strapi-sdk';
import { z } from 'zod';

export type ToolsSection = z.infer<typeof ToolsSectionSchema>;

export const ToolsSectionSchema = z.object({
   type: z.literal('Tools'),
   id: z.string(),
});

export function toolsSectionFromStrapi(
   fragment: ToolsSectionFieldsFragment | null | undefined,
   sectionId: string
): ToolsSection | null {
   if (fragment == null) return null;

   return {
      type: 'Tools',
      id: sectionId,
   };
}
