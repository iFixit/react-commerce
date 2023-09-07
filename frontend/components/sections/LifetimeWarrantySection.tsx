import { QualityGuarantee } from '@assets/svg/files';
import { Box, Button, Flex, Heading, Icon } from '@chakra-ui/react';
import { PrerenderedHTML } from '@components/common';
import { useAppContext } from '@ifixit/app';
import { isPresent } from '@ifixit/helpers';
import { Wrapper } from '@ifixit/ui';
import type { CallToAction } from '@models/components/call-to-action';
import backgroundImage from '@public/images/lifetime-guarantee-background.jpg';
import Image from 'next/image';

export interface LifetimeWarrantySectionProps {
   title?: string | null;
   description?: string | null;
   callToAction?: CallToAction | null;
   variant?: 'banner' | 'full-width';
}

const SECTION_ID = 'lifetime-warranty';

export function LifetimeWarrantySection({
   title,
   description,
   callToAction,
   variant = 'full-width',
}: LifetimeWarrantySectionProps) {
   switch (variant) {
      case 'banner': {
         return (
            <Box as="section" id={SECTION_ID} my={{ base: 4, md: 6 }}>
               <Wrapper>
                  <Box
                     py="16"
                     position="relative"
                     borderRadius="base"
                     overflow="hidden"
                  >
                     <BackgroundImage />
                     <Box
                        position="relative"
                        px={{
                           base: 4,
                           md: 6,
                           lg: 8,
                        }}
                     >
                        <Content
                           title={title}
                           description={description}
                           callToAction={callToAction}
                        />
                     </Box>
                  </Box>
               </Wrapper>
            </Box>
         );
      }
      default: {
         return (
            <Box as="section" id={SECTION_ID} py="16" position="relative">
               <BackgroundImage />
               <Box position="relative">
                  <Wrapper>
                     <Content
                        title={title}
                        description={description}
                        callToAction={callToAction}
                     />
                  </Wrapper>
               </Box>
            </Box>
         );
      }
   }
}

function BackgroundImage() {
   return (
      <>
         <Box position="absolute" inset="0">
            <Image
               alt=""
               src={backgroundImage}
               fill
               style={{
                  objectFit: 'cover',
               }}
            />
         </Box>
         <Box
            position="absolute"
            inset="0"
            bgGradient="linear(to-r, blackAlpha.600, blackAlpha.400)"
         />
      </>
   );
}

type ContentProps = Pick<
   LifetimeWarrantySectionProps,
   'title' | 'description' | 'callToAction'
>;

function Content({ title, description, callToAction }: ContentProps) {
   const appContext = useAppContext();

   const sectionTitle = isPresent(title) ? title : 'Lifetime Guarantee';
   const sectionDescription = isPresent(description)
      ? description
      : "We stand behind our tools. If something breaks, we'll replace it—for as long as you own the iFixit tool.";
   const callToActionText = isPresent(callToAction?.title)
      ? callToAction?.title
      : 'Learn more';
   const callToActionUrl = isPresent(callToAction?.url)
      ? callToAction?.url
      : `${appContext.ifixitOrigin}/Info/Warranty`;
   return (
      <Flex
         justify="space-between"
         direction={{ base: 'column-reverse', md: 'row' }}
         px={{
            base: 6,
            sm: 0,
         }}
      >
         <Box>
            <Heading
               as="h2"
               color="white"
               mb="3"
               fontSize={{ base: '2xl', md: '3xl' }}
               fontWeight="medium"
            >
               {sectionTitle}
            </Heading>
            <PrerenderedHTML
               html={sectionDescription}
               template="commerce"
               color="white"
            />
            <Button as="a" mt="8" minW="200px" href={callToActionUrl}>
               {callToActionText}
            </Button>
         </Box>
         <Icon
            as={QualityGuarantee}
            boxSize={{ base: '130px', md: '160px' }}
            color="white"
            ml={{
               base: 0,
               md: 8,
            }}
            mb={{
               base: 8,
               md: 0,
            }}
         />
      </Flex>
   );
}
