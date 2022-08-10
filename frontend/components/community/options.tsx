import Image from 'next/image';
import { Button, Flex, Stack, Link } from '@chakra-ui/react';
import { Box, Heading, Text } from '@chakra-ui/layout';
import { getImage } from '../../lib/images';
import links from '../../lib/links';

interface Option {
   title: string;
   description: string;
   button: string;
   link: string;
   image: string;
   icon: string;
}

const optionSolve: Option = {
   title: 'Solve Problems',
   description:
      'Get help from friendly fixers and share a helping \
  hand with others around the world.',
   button: 'Answers Forum',
   link: links.ANSWERS,
   image: getImage('Community/solve'),
   icon: getImage('Community/solve-icon'),
};

const optionImprove: Option = {
   title: 'Improve iFixit',
   description:
      'Help us improve how-to guides that others have \
    started and become a guardian of good quality.',
   button: 'Improve Guides',
   link: links.CONTRIBUTE,
   image: getImage('Community/improve'),
   icon: getImage('Community/improve-icon'),
};

const optionTeach: Option = {
   title: 'Teach a Repair',
   description: 'No one knows how to fix everything, but\
    everyone knows how to fix something.',
   button: 'Create a Guide',
   link: links.GUIDE_NEW,
   image: getImage('Community/teach'),
   icon: getImage('Community/teach-icon'),
};

const optionTranslate: Option = {
   title: 'Help Translate',
   description:
      'Translate iFixit into your mother tongue and \
    make repair information available to everyone!',
   button: 'Start Translating',
   link: links.TRANSLATE,
   image: getImage('Community/help'),
   icon: getImage('Community/help-icon'),
};

function OptionCard({ option }: { option: Option }) {
   return (
      <Flex
         align="center"
         overflow="hidden"
         minHeight="100%"
         borderRadius="var(--border-radius-lg)"
         direction={{ base: 'row', md: 'column' }}
         boxShadow={{ base: 'var(--shadow-2)', md: 'var(--shadow-3)' }}
         padding={{ base: 'var(--space-4)', md: '0 0 var(--space-6)' }}
         width={{ base: '100%', md: '350px' }}
      >
         <Flex
            position="relative"
            overflow="hidden"
            minHeight="160px"
            width="100%"
            direction="column"
            justify="center"
            align="center"
            objectFit="cover"
            display={{ base: 'none', md: 'unset' }}
         >
            <Image src={option.image} alt="" layout="fill" objectFit="cover" />
         </Flex>
         <Box
            position="relative"
            overflow="hidden"
            width="80px"
            height="80px"
            flex="0 0 auto"
            borderRadius="50px"
            backgroundColor="var(--color-blue)"
            boxShadow="var(--shadow-2)"
            objectFit="scale-down"
            margin={{
               base: '0',
               md: 'calc(-1 * var(--space-7)) auto var(--space-5)',
            }}
         >
            <Image src={option.icon} alt="" layout="fill" />
         </Box>
         <Flex direction="column" align="center" padding="0 var(--space-5)" flexGrow={1}>
            <Heading as="h3" marginTop="0" fontSize="18px">
               {option.title}
            </Heading>
            <Text
               textAlign="center"
               fontSize="14px"
               flexGrow={1}
               padding="var(--space-2) 0"
               color="var(--color-gray-6)"
               margin={{ base: 0, md: '0 0 var(--space-5)' }}
            >
               {option.description}
            </Text>
            <Link
               _hover={{ textDecoration: 'none' }}
               display={{ base: 'none', md: 'unset' }}
               href={option.link}
            >
               <Button
                  variant="outline"
                  padding="9px 16px 10px"
                  fontSize="14px"
                  backgroundColor="transparent"
               >
                  {option.button}
               </Button>
            </Link>
         </Flex>
      </Flex>
   );
}

export default function OptionsDisplay({ userLang }: { userLang: string }) {
   return (
      <Stack
         direction={{ base: 'column', md: 'row' }}
         marginTop={{ base: 'var(--space-2)', md: 'var(--space-7)' }}
         justify="space-between"
         spacing="20px"
      >
         <OptionCard option={optionSolve} />
         <OptionCard option={optionImprove} />
         {userLang === 'en' ? (
            <OptionCard option={optionTeach} />
         ) : (
            <OptionCard option={optionTranslate} />
         )}
      </Stack>
   );
}
