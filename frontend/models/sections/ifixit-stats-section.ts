import { filterFalsyItems } from '@helpers/application-helpers';
import { createSectionId } from '@helpers/strapi-helpers';
import { StatsSectionFieldsFragment } from '@lib/strapi-sdk';
import { z } from 'zod';

export type IFixitStat = z.infer<typeof IFixitStatSchema>;

export const IFixitStatSchema = z.object({
   id: z.string(),
   label: z.string(),
   value: z.string(),
});

export type IFixitStatsSection = z.infer<typeof IFixitStatsSectionSchema>;

export const IFixitStatsSectionSchema = z.object({
   type: z.literal('IFixitStats'),
   id: z.string(),
   stats: z.array(IFixitStatSchema),
});

export function iFixitStatsSectionFromStrapi(
   fragment: StatsSectionFieldsFragment | null | undefined,
   _index: number
): IFixitStatsSection | null {
   const id = createSectionId(fragment);
   const stats = filterFalsyItems(fragment?.stats).map(
      ({ id, label, value }) => ({ id, label, value })
   );

   if (id == null || stats == null) return null;

   return {
      type: 'IFixitStats',
      id,
      stats,
   };
}
