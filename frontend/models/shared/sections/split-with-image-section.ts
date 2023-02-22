import { assertNever } from '@ifixit/helpers';
import { Enum_Componentpagesplitwithimage_Imageposition } from '@lib/strapi-sdk';
import { z } from 'zod';
import { CallToActionSchema } from '../components/call-to-action';
import { ImageSchema } from '../components/image';

export type SplitWithImageSection = z.infer<typeof SplitWithImageSectionSchema>;

export const SplitWithImageSectionSchema = z.object({
   type: z.literal('SplitWithImage'),
   id: z.string(),
   title: z.string().nullable(),
   description: z.string().nullable(),
   image: ImageSchema.nullable(),
   imagePosition: z.enum(['left', 'right']),
   callToAction: CallToActionSchema.nullable(),
});

export function imagePositionFromStrapi(
   position: Enum_Componentpagesplitwithimage_Imageposition | null | undefined
): SplitWithImageSection['imagePosition'] | null {
   if (position == null) return null;

   switch (position) {
      case Enum_Componentpagesplitwithimage_Imageposition.Left:
         return 'left';
      case Enum_Componentpagesplitwithimage_Imageposition.Right:
         return 'right';
      default:
         return assertNever(position);
   }
}
