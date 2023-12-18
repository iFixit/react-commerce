'use client';

import * as React from 'react';
import {
   Box,
   Flex,
   Heading,
   HStack,
   Image,
   SimpleGrid,
   Stack,
   Text,
} from '@chakra-ui/react';
import { faVolumeXmark } from '@fortawesome/pro-duotone-svg-icons';
import { FaIcon, FaIconProps } from '@ifixit/icons';

const mockProblems = [
   {
      imageSrcLg:
         'https://guide-images.cdn.ifixit.com/igi/GEQaIapMrXAqEjAS.large',
      imageSrcThumb:
         'https://guide-images.cdn.ifixit.com/igi/GEQaIapMrXAqEjAS.thumbnail',
      problemTitle: 'GE Refrigerator Temperature Inconsistencies',
      deviceTitle: 'GE Refrigerator',
      description:
         'Fluctuating temperatures in the refrigerator or freezer compartments, often due to a faulty thermostat or temperature sensor.',
      altText: 'GE Refrigerator image',
   },
   {
      imageSrcLg:
         'https://guide-images.cdn.ifixit.com/igi/GEQaIapMrXAqEjAS.large',
      imageSrcThumb:
         'https://guide-images.cdn.ifixit.com/igi/GEQaIapMrXAqEjAS.thumbnail',
      problemTitle: 'GE Refrigerator Water Dispenser Malfunctions',
      deviceTitle: 'GE Refrigerator',
      description:
         'Water dispenser not functioning or dripping water, resulting from a faulty water valve or blocked filter.',
      altText: 'GE Refrigerator image',
   },
   {
      imageSrcLg:
         'https://guide-images.cdn.ifixit.com/igi/GEQaIapMrXAqEjAS.large',
      imageSrcThumb:
         'https://guide-images.cdn.ifixit.com/igi/GEQaIapMrXAqEjAS.thumbnail',
      problemTitle: 'GE Refrigerator Ice Maker Issues',
      deviceTitle: 'GE Refrigerator',
      description:
         'The ice maker is not producing ice or is dispensing ice irregularly, due to clogged water lines or malfunctioning components.',
      altText: 'GE Refrigerator image',
   },
   {
      imageSrcLg: undefined,
      imageSrcThumb:
         'https://guide-images.cdn.ifixit.com/igi/GEQaIapMrXAqEjAS.thumbnail',
      problemTypeIcon: faVolumeXmark,
      problemTitle:
         'GE Refrigerator Model Number GSS25WSTASS (2008) Temperature Inconsistencies Involving the Fresh Food Compartment',
      deviceTitle:
         'GE Refrigerator Model Number GSS25WSTASS (2008) Sub-Model Number GSS25W',
      description:
         'Fluctuating temperatures in the refrigerator or freezer compartments, often due to a faulty thermostat or temperature sensor. The following text is for testing purposes only. Lets see how well this long text wraps with a cap on 4 lines.',
      altText: 'GE Refrigerator image',
   },
   {
      imageSrcLg:
         'https://guide-images.cdn.ifixit.com/igi/GEQaIapMrXAqEjAS.large',
      imageSrcThumb:
         'https://guide-images.cdn.ifixit.com/igi/GEQaIapMrXAqEjAS.thumbnail',
      problemTitle: 'GE Refrigerator Door Seal Problems',
      deviceTitle: 'GE Refrigerator',
      description:
         'The refrigerator doors are not closing correctly or are allowing warm air inside, typically related to worn or damaged door seals.',
      altText: 'GE Refrigerator image',
   },
   {
      imageSrcLg:
         'https://guide-images.cdn.ifixit.com/igi/GEQaIapMrXAqEjAS.large',
      imageSrcThumb:
         'https://guide-images.cdn.ifixit.com/igi/GEQaIapMrXAqEjAS.thumbnail',
      problemTitle: 'GE Refrigerator Not Cooling Properly',
      deviceTitle: 'GE Refrigerator',
      description:
         'The refrigerator is not maintaining the correct temperature, which could be the result of a damaged condenser, evaporator, or compressor.',
      altText: 'GE Refrigerator image',
   },
];

export default function TroubleshootingProblems({
   title,
}: TroubleshootingProblemsProps) {
   return (
      <Box className="wrapper" maxWidth="1280px" mt="32px" mx="auto" px="32px">
         <Stack as="main" spacing="12px">
            <Box className="header">
               <Heading color="gray.800" fontSize="30px" fontWeight="medium">
                  Most Common {title} Troubleshooting Problems
               </Heading>
               <Text mt="8px">
                  When your {title} runs into issues, it can be a source of
                  frustration and inconvenience. Never fear &mdash; we&apos;ve
                  compiled a comprehensive guide to diagnose and fix the most
                  common problems that can plague your refrigerator.{' '}
               </Text>
            </Box>
            <SimpleGrid
               className="list"
               columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
               spacing="24px"
               py="12px"
            >
               {mockProblems.map((problem: ProblemProps, index: number) => (
                  <Problem
                     key={index}
                     imageSrcLg={problem.imageSrcLg}
                     imageSrcThumb={problem.imageSrcThumb}
                     problemTypeIcon={problem.problemTypeIcon}
                     problemTitle={problem.problemTitle}
                     deviceTitle={problem.deviceTitle}
                     description={problem.description}
                     altText={problem.altText}
                  />
               ))}
            </SimpleGrid>
         </Stack>
      </Box>
   );
}

function Problem({
   problemTitle,
   deviceTitle,
   description,
   imageSrcLg,
   imageSrcThumb,
   problemTypeIcon,
   altText,
   badges,
}: ProblemProps) {
   return (
      <Flex
         flexDirection="column"
         alignSelf="stretch"
         bgColor="white"
         border="1px solid"
         borderColor="gray.300"
         borderRadius="md"
         overflow="hidden"
      >
         {imageSrcLg ? (
            <Image src={imageSrcLg} alt={altText} {...lgImageStyles} />
         ) : (
            <Flex {...imagePlaceholderStyles}>
               <FaIcon
                  icon={problemTypeIcon}
                  size="3x"
                  color="brand.400"
                  m="auto"
               />
            </Flex>
         )}
         <Stack className="content" spacing="12px" p="16px" flex="auto">
            <Stack className="title" spacing="4px" flex="1">
               <Text color="brand.500" fontWeight="semibold" noOfLines={4}>
                  {problemTitle}
               </Text>
               <Text fontSize="sm" noOfLines={4}>
                  {description}
               </Text>
            </Stack>
            {badges && <HStack className="badges" spacing="6px"></HStack>}
            <HStack className="device" spacing="6px" alignItems="center">
               <Image src={imageSrcThumb} alt={altText} {...thumbImageStyles} />
               <Box fontSize="sm" fontWeight="semibold" noOfLines={2}>
                  {deviceTitle}
               </Box>
            </HStack>
         </Stack>
      </Flex>
   );
}

export type TroubleshootingProblemsProps = {
   title: string;
};

export type ProblemProps = {
   problemTitle: string;
   deviceTitle: string;
   description: string;
   altText: string;
   imageSrcLg?: string;
   imageSrcThumb?: string;
   problemTypeIcon?: FaIconProps;
   badges?: string[];
};

const lgImageStyles = {
   borderBottom: '1px solid',
   borderColor: 'gray.300',
   aspectRatio: '4 / 3',
};

const imagePlaceholderStyles = {
   ...lgImageStyles,
   width: '100%',
   bgColor: 'brand.100',
};

const thumbImageStyles = {
   border: '1px solid',
   borderColor: 'gray.300',
   borderRadius: 'md',
   width: '32px',
   height: '32px',
};
