import { Box } from '@chakra-ui/react';
import type { QuoteCard } from '@models/components/quote-card';

export interface QuoteGallerySectionProps {
   id: string;
   title?: string | null;
   description?: string | null;
   quotes: QuoteCard[];
}

export function QuoteGallerySection({
   id,
   title,
   description,
   quotes,
}: QuoteGallerySectionProps) {
   if (quotes.length === 0) return null;

   return (
      <Box as="section" id={id} position="relative" w="full" py="16">
         Quote gallery section
      </Box>
   );
}
