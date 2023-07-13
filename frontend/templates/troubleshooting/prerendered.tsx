import { Box, chakra, SystemStyleObject } from '@chakra-ui/react';

import 'lite-youtube-embed/src/lite-yt-embed.css';
import { useEffect } from 'react';

const renderStyles: SystemStyleObject = {
   '&': {
      marginTop: 6,
   },

   '.clearer': {
      clear: 'both',
      height: '0',
      padding: '0',
      margin: '0',
      lineHeight: '0',
      fontSize: '0',
   },

   '.headerContainer': {
      display: 'flex',
      alignItems: 'baseline',
      marginBottom: 2,

      '&:not(:first-of-type)': {
         marginTop: 6,
      },

      '&:hover .selfLink': {
         opacity: '1',
      },
   },

   '.selfLink': {
      color: 'gray.500',
      order: '2', // swap the legacy order with flexbox
      opacity: '0',
      paddingLeft: 2,
      transition: 'opacity var(--chakra-transition-duration-fast) ease-in-out',
   },

   h3: {
      fontSize: 'xl',
      lineHeight: '1.2',
   },

   'h3, h4': {
      fontWeight: 600,
   },

   'h4, h5': {
      fontSize: 'md',
      lineHeight: '1.25',
   },

   p: {
      lineHeight: '1.38',
      alignSelf: 'stretch',

      '&:not(:first-of-type)': {
         marginTop: '1em',
      },
   },

   'ul, ol': {
      marginTop: 6,
      marginInlineStart: '1em',
      paddingLeft: 4,
   },

   'ul ul, ol ol': {
      marginTop: 0, // override nested list margin
   },

   a: {
      color: 'brand.500',

      '&:hover': {
         textDecoration: 'underline',
      },
   },

   'code, pre': {
      backgroundColor: 'gray.200',
      borderRadius: 'md',
      color: 'coolGray.600',
      borderStyle: 'none',
   },

   pre: {
      paddingBlock: 0.5,
      paddingInline: 1,
      maxWidth: '100%',
      overflow: 'auto',
   },

   blockquote: {
      marginBlock: 5,
      borderLeftColor: 'gray.200',
      borderLeftWidth: 1,
      borderLeftStyle: 'solid',
      paddingTop: 2,
      paddingBlock: 0.5,
      paddingBottom: 3,

      '&.featured': {
         borderColor: '#fe6f15',
         borderTopWidth: '1px',
         borderBottomWidth: '1px',
      },

      '& > p': {
         marginBlock: 2,
      },
   },

   '.table-container': {
      position: 'relative',
      width: 'fit-content',
      marginTop: 4,
   },

   '.table-overflow': {
      overflowX: 'auto',
   },

   tr: {
      display: 'flex',
   },

   'tr:not(:first-of-type) > td': {
      paddingTop: 3,
   },

   'td:not(:last-child)': {
      paddingRight: 3,
   },

   'lite-youtube': {
      marginBlock: 2,
      borderColor: 'gray.500',
      borderWidth: '1px',
      borderStyle: 'solid',
      maxWidth: '100%',
      height: 'auto',

      '&.mx-auto': {
         marginInline: 'auto',
      },
   },

   '.videoFrame': {
      maxWidth: '100%',
      marginBlock: 2,
      height: 'auto',

      '@media only screen and (max-width: 575px)': {
         width: 'auto',
      },

      '&.videoBox_center': {
         marginInline: 'auto',
      },
   },

   '.videoBox': {
      position: 'relative',
      overflow: 'hidden',
      maxWidth: '100%',
      aspectRatio: '16 / 9',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

      '&.videoBox_center': {
         marginInline: 'auto',
      },

      video: {
         position: 'absolute',
         inset: 0,
      },
   },

   '.imageBox': {
      borderRadius: 'md',
      marginTop: 6,
      outline: '1px solid',
      outlineColor: 'gray.300',
      overflow: 'hidden',
      position: 'relative',
      width: 'fit-content',

      '&.imageBox_left': {
         float: 'left',
         marginRight: '30px',
      },

      '&.imageBox_center': {
         marginInline: 'auto',
      },

      '&.imageBox_right': {
         float: 'right',
         marginLeft: '30px',
      },
   },

   'table .imageBox': {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      marginTop: 0,
      maxWidth: '282px', // cap at child image inline width
   },

   '.imageBox p': {
      bgColor: 'gray.100',
      borderTop: '1px solid',
      borderColor: 'gray.300',
      flex: 1,
      paddingBlock: 4,
      paddingInline: 3,
      width: 'unset !important', // override inline width
   },

   'table .imageBox img': {
      width: '100%',
   },

   '.blurbListWide .grid': {
      display: 'grid',
      gap: 4,
      gridTemplateColumns: 'repeat(auto-fill, minmax(282px, 1fr) )',

      '& .cell': {
         bgColor: 'gray.100',
         border: '1px solid',
         borderColor: 'gray.300',
         borderRadius: 'md',
         display: 'flex',
         maxWidth: '282px',
         overflow: 'hidden',
         _hover: {
            borderColor: 'brand.500',
            transition: 'border-color var(--chakra-transition-duration-normal)',
         },
      },

      '& a, & a:hover': {
         color: 'inherit',
         textDecoration: 'none',
      },

      '.title-text': {
         borderTop: '1px solid',
         borderColor: 'gray.300',
         paddingBlock: 2,
         paddingInline: 3,
      },
   },

   '.fa-svg-icon': {
      svg: {
         width: '1em',
         height: '1em',
         display: 'inline-block',

         path: {
            fill: 'currentColor',
         },
      },

      '&.xs svg': {
         width: '0.5em',
         height: '0.5em',
      },

      '&.sm svg': {
         width: '0.75em',
         height: '0.75em',
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
         className={`prerendered ${className}`}
         sx={renderStyles}
         dangerouslySetInnerHTML={{ __html: html }}
      />
   );
});

export default Prerendered;
