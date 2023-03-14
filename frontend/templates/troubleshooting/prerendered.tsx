import { Box, chakra, SystemStyleObject } from '@chakra-ui/react';

import 'lite-youtube-embed/src/lite-yt-embed.css';
import { useEffect } from 'react';

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
      paddingBottom: 6,
   },

   'ul,ol': {
      paddingLeft: 4,
   },

   a: {
      color: 'brand.500',
   },

   'a:hover': {
      textDecoration: 'underline',
   },

   'code, pre': {
      backgroundColor: 'gray.200',
      borderRadius: '4px',
      color: 'coolGray.600',
      borderStyle: 'none',
   },

   pre: {
      padding: '2px 4px',
      maxWidth: '100%',
      overflow: 'auto',
   },

   blockquote: {
      margin: '20px 0px',
      borderLeftColor: 'gray.200',
      borderLeftWidth: '5px',
      borderLeftStyle: 'solid',
      padding: '2px 8px 2px 12px',
   },

   td: {
      border: '1px solid',
      borderColor: 'gray.300',
      padding: '4px',
   },

   'lite-youtube': {
      marginTop: '8px',
      marginBottom: '8px',
      clear: 'both',
      borderColor: 'gray.500',
      borderWidth: '1px',
      borderStyle: 'solid',
      padding: '1px',
      maxWidth: '100%',

      '&.float-left': {
         float: 'left',
      },
      '&.float-right': {
         float: 'right',
      },
      '&.mx-auto': {
         marginLeft: 'auto',
         marginRight: 'auto',
      },
   },

   '.imageBox_left': {
      clear: 'left',
      float: 'left',
      marginBottom: '8px',
      marginTop: '8px',
      marginRight: '30px',
      '> img': {
         clear: 'left',
      },
   },

   'table .imageBox_left': {
      // Special-case default image alignment for tables
      marginRight: '0px',
   },

   '.imageBox_right': {
      clear: 'right',
      float: 'right',
      marginBottom: '8px',
      marginTop: '8px',
      marginLeft: '30px',
      '>img': {
         clear: 'right',
      },
   },

   '.imageBox_center': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      clear: 'both',
      marginBottom: '8px',
      marginTop: '8px',
      '>img': {
         clear: 'both',
      },
   },
};

const Prerendered = chakra(function Prerendered({
   html,
   className,
}: {
   html: string;
   className?: string;
}) {
   useEffect(() => {
      import('lite-youtube-embed');
   }, []);
   return (
      <Box
         className={className}
         sx={renderStyles}
         dangerouslySetInnerHTML={{ __html: html }}
      />
   );
});

export default Prerendered;
