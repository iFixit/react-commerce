import { filterFalsyItems } from '@helpers/application-helpers';
import type { ToolsSectionFieldsFragment } from '@lib/strapi-sdk';
import { ToolSchema, toolsFromStrapiFragment } from '@models/components/tool';
import { z } from 'zod';

export type ToolsSection = z.infer<typeof ToolsSectionSchema>;

export const ToolsSectionSchema = z.object({
   type: z.literal('Tools'),
   id: z.string(),
   tools: z.array(ToolSchema),
});

export function toolsSectionFromStrapi(
   fragment: ToolsSectionFieldsFragment | null | undefined,
   sectionId: string
): ToolsSection | null {
   const tools = fragment?.tools?.data;

   if (fragment == null || tools == null) return null;

   return {
      type: 'Tools',
      id: sectionId,
      tools: filterFalsyItems(
         tools.map((tool) => toolsFromStrapiFragment(tool))
      ),
   };
}
