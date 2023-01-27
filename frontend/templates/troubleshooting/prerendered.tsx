import { Box, chakra, SystemStyleObject } from '@chakra-ui/react';

const Prerendered = chakra(function Prerendered({
   html,
   className,
}: {
   html: string;
   className?: string;
}) {
   const renderStyles: SystemStyleObject = {
      '.headerContainer': {
         display: 'flex',
         alignItems: 'baseline',
         marginBottom: 2,
      },

      '.selfLink': {
         display: 'none',
      },

      h3: {
         fontSize: 'xl',
         lineHeight: '1.2',
      },

      'h3,h4': {
         fontWeight: 590,
      },

      'h4,h5': {
         fontSize: 'md',
         lineHeight: '1.25',
      },

      p: {
         lineHeight: '1.38',
         fontWeight: 'regular',
         fontSize: '16px',
         color: 'gray.700',
         alignSelf: 'stretch',
      },

      'ul,ol': {
         paddingLeft: 4,
      },

      a: {
         color: 'brand.500',
      },
   };

   return (
      <Box
         className={className}
         sx={renderStyles}
         dangerouslySetInnerHTML={{ __html: html }}
      />
   );
});

export default Prerendered;
