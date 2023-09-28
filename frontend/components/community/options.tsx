import Image from 'next/image';
import { useRouter } from 'next/dist/client/router';
import { Button, Flex, Stack, Link } from '@chakra-ui/react';
import { Box, Heading, Text } from '@chakra-ui/layout';
import { getImage } from '../../lib/images';
import links from '../../lib/links';
import {
   space,
   fontSize,
   fontWeight,
   borderRadius,
   shadow,
   color,
} from '@core-ds/primitives';

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
   description:
      'No one knows how to fix everything, but\
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
   const router = useRouter();
   const openOption = () => {
      const isMobile = window.matchMedia('(max-width: 767px)').matches;
      if (isMobile) {
         router.push(option.link);
      }
   };

   return (
      <Flex
         align="center"
         overflow="hidden"
         minHeight="100%"
         borderRadius={`${borderRadius.lg}`}
         direction={{ base: 'row', md: 'column' }}
         boxShadow={{ base: `${shadow[2]}`, md: `${shadow[3]}` }}
         padding={{ base: `${space[4]}`, md: `0 0 ${space[6]}` }}
         width={{ base: '100%', md: '350px' }}
         onClick={openOption}
         cursor={{ base: 'pointer', md: 'auto' }}
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
            <Image
               src={option.image}
               alt=""
               fill
               style={{
                  objectFit: 'cover',
               }}
            />
         </Flex>
         <Box
            position="relative"
            overflow="hidden"
            width="80px"
            height="80px"
            flex="0 0 auto"
            borderRadius="50px"
            backgroundColor={`${color.blue['ifixit']}`}
            boxShadow={`${shadow[2]}`}
            objectFit="scale-down"
            margin={{
               base: `0 0 0`,
               md: `calc(-1 * ${space[7]}) auto ${space[2]}`,
            }}
         >
            <Image src={option.icon} alt="" fill />
         </Box>
         <Flex
            direction="column"
            align="center"
            padding={`0 ${space[4]}`}
            flexGrow={1}
         >
            <Heading
               as="h3"
               marginTop={{ base: `${space[1]}`, md: `${space[3]}` }}
               fontSize={`${fontSize.xl}`}
            >
               {option.title}
            </Heading>
            <Text
               textAlign="center"
               fontSize={`${fontSize.md}`}
               flexGrow={1}
               padding={{
                  base: `${space[0]} 0 ${space[0]}`,
                  md: `${space[2]} 0 ${space[2]}`,
               }}
               color={`${color.gray[600]}`}
               margin={{ base: 0, md: `0 0 ${space[5]}` }}
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
                  fontSize={`${fontSize.md}`}
                  fontWeight={`${fontWeight.normal}`}
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
         marginTop={{ base: `${space[2]}`, md: `${space[6]}` }}
         justify="space-between"
         spacing={{ base: '8px', md: '20px' }}
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
