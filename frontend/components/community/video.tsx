import { AspectRatio, Button, Flex, Heading, Text } from '@chakra-ui/react';
import links from '../../lib/links';
import {
   color,
   space,
   borderRadius,
   fontSize,
   fontWeight,
} from '@core-ds/primitives';

export default function VideoDisplay() {
   const videoLink = 'https://www.youtube-nocookie.com/embed/O7CSWHVTUT8?rel=0';

   return (
      <Flex
         overflow="hidden"
         borderRadius={`${borderRadius.lg}`}
         bgColor={`${color.gray[900]}`}
         direction={{ base: 'column', md: 'row' }}
         marginTop={{ base: `${space[7]}`, md: `${space[10]}` }}
      >
         <Flex
            direction="column"
            justify="space-between"
            align="flex-start"
            width={{ base: '100%', md: '50%' }}
            height={{ base: '50%', md: 'unset' }}
            margin={`${space[5]} ${space[0]}`}
            padding={{
               base: `${space[6]} ${space[8]}`,
               md: `${space[8]} ${space[10]}`,
            }}
         >
            <Heading
               margin="0"
               fontSize={`${fontSize['3xl']}`}
               color={`${color.white}`}
            >
               {'Contribute to iFixit'}
            </Heading>
            <Text
               fontSize={`${fontSize.lg}`}
               color={`${color.gray[300]}`}
               margin={`${space[4]} 0`}
            >
               {
                  'No one knows how to fix everything,\
          but everyone knows how to fix something.\
          Teach us what you know and make sure\
          things work longer! The easier it is to\
          fix something, the more people will do it.'
               }
            </Text>
            <Button
               fontSize={`${fontSize.md}`}
               fontWeight={`${fontWeight.normal}`}
               borderColor={`${color.gray[700]}`}
               onClick={() => (window.location.href = links.NEW)}
               _hover={{
                  color: `${color.black}`,
                  bgColor: `${color.white}`,
               }}
            >
               {'Start a New Page'}
            </Button>
         </Flex>
         <AspectRatio
            position="relative"
            width={{ base: '100%', md: '50%' }}
            height={{ base: '300px', md: 'unset' }}
         >
            <iframe
               title="How to Write a Repair Guide on iFixit.com!"
               src={videoLink}
               frameBorder="0"
               allowFullScreen
            />
         </AspectRatio>
      </Flex>
   );
}
