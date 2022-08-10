import { AspectRatio, Button, Flex, Heading, Link, Text } from '@chakra-ui/react';
import links from '../../lib/links';

export default function VideoDisplay() {
   const videoLink = 'https://www.youtube-nocookie.com/embed/O7CSWHVTUT8?rel=0';

   return (
      <Flex
         overflow="hidden"
         borderRadius="var(--border-radius-lg)"
         bgColor="var(--color-black)"
         direction={{ base: 'column', md: 'row' }}
         marginTop={{ base: 'var(--space-7)', md: 'var(--space-10)' }}
      >
         <Flex
            direction="column"
            justify="space-between"
            align="flex-start"
            width={{ base: '100%', md: '50%' }}
            height={{ base: '50%', md: 'unset' }}
            margin="var(--space-5) var(--space-0);"
            padding={{
               base: 'var(--space-6) var(--space-8)',
               md: 'var(--space-8) var(--space-10)',
            }}
         >
            <Heading marginTop="0" fontSize="24px" color="var(--color-white)">
               {'Contribute to iFixit'}
            </Heading>
            <Text fontSize="16px" color="var(--color-gray-3)" margin="var(--space-4) 0">
               {
                  'No one knows how to fix everything,\
          but everyone knows how to fix something.\
          Teach us what you know and make sure\
          things work longer! The easier it is to\
          fix something, the more people will do it.'
               }
            </Text>
            <Link _hover={{ textDecoration: 'none' }} href={links.NEW}>
               <Button variant="invertOnHover">{'Start a New Page'}</Button>
            </Link>
         </Flex>
         <AspectRatio position="relative" width={{ base: '100%', md: '50%' }}>
            <iframe
               title="How to Write a Repair Guide on iFixit.com!"
               src={videoLink}
               allowFullScreen
            />
         </AspectRatio>
      </Flex>
   );
}
