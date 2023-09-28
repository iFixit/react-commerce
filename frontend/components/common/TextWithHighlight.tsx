import React from 'react';
import { Text } from '@chakra-ui/react';

export type HighlighterProps = {
   text: string;
   query?: string;
};

const TextWithHighlight = ({ text, query }: HighlighterProps) => {
   if (!query || query.length === 0) {
      return <span>{text}</span>;
   }

   const regex = new RegExp(`(${query})`, 'gi');
   const splitText = text.split(regex);

   return (
      <div>
         {splitText.map((chunk, index) =>
            chunk.toLowerCase() === query.toLowerCase() ? (
               <Text
                  as="span"
                  key={index}
                  bg="brand.200"
                  color="brand.700"
                  borderRadius="sm"
               >
                  {chunk}
               </Text>
            ) : (
               <span key={index}>{chunk}</span>
            )
         )}
      </div>
   );
};

export default TextWithHighlight;
