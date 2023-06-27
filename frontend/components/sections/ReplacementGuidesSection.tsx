import {
   Box,
   Divider,
   Flex,
   forwardRef,
   Heading,
   LinkBox,
   LinkOverlay,
   ListItem,
   SimpleGrid,
   Text,
   UnorderedList,
} from '@chakra-ui/react';
import {
   faClock,
   faGauge,
   faGaugeHigh,
   faGaugeLow,
   faGaugeMax,
   faGaugeMin,
} from '@fortawesome/pro-solid-svg-icons';
import {
   IconBadge,
   IconBadgeProps,
   ResponsiveImage,
   Wrapper,
} from '@ifixit/ui';
import type { ReplacementGuidePreview } from '@models/components/replacement-guide-preview';

export interface ReplacementGuidesSectionProps {
   id: string;
   title?: string | null;
   guides: ReplacementGuidePreview[];
}

export function ReplacementGuidesSection({
   id,
   title,
   guides,
}: ReplacementGuidesSectionProps) {
   if (guides.length === 0) {
      return null;
   }

   return (
      <Box as="section" id={id} my="16">
         <Wrapper>
            <Heading
               as="h2"
               id="guides"
               color="gray.700"
               textAlign="center"
               mb={{
                  base: 6,
                  md: 16,
               }}
               fontSize={{ base: '2xl', md: '3xl' }}
               fontWeight="medium"
            >
               {title ?? 'Replacement Guides'}
            </Heading>
            <SimpleGrid
               columns={{
                  base: 1,
                  lg: 2,
               }}
               spacing="3"
            >
               {guides.map((guide) => {
                  return <ReplacementGuideCard key={guide.id} guide={guide} />;
               })}
            </SimpleGrid>
         </Wrapper>
      </Box>
   );
}

type ReplacementGuideCardProps = {
   guide: ReplacementGuidePreview;
};

function ReplacementGuideCard({ guide }: ReplacementGuideCardProps) {
   const hasBadges =
      isPresent(guide.difficulty) || isPresent(guide.timeRequired);
   return (
      <LinkBox
         as="article"
         display="flex"
         overflow="hidden"
         minH={{
            base: 'auto',
            md: '150px',
         }}
         bg="white"
         borderColor="gray.300"
         borderWidth="1px"
         borderRadius="md"
         role="group"
      >
         {guide.imageUrl && (
            <>
               <Flex
                  align="center"
                  justify="center"
                  width={{
                     base: '96px',
                     md: '176px',
                  }}
                  height={{
                     base: '96px',
                     md: 'full',
                  }}
                  my={{
                     base: 3,
                     md: 0,
                  }}
                  ml={{
                     base: 3,
                     md: 0,
                  }}
                  borderColor="gray.300"
                  borderWidth={{
                     base: '1px',
                     md: '0',
                  }}
                  borderRadius={{
                     base: 'md',
                     md: 'none',
                  }}
                  overflow="hidden"
                  flexGrow={0}
                  flexShrink={0}
                  position="relative"
               >
                  <ResponsiveImage
                     src={guide.imageUrl}
                     alt=""
                     style={{
                        objectFit: 'cover',
                     }}
                     fill
                     sizes="20vw"
                     priority
                  />
               </Flex>
               <Divider
                  orientation="vertical"
                  display={{
                     base: 'none',
                     md: 'block',
                  }}
               />
            </>
         )}
         <Box px="3" py="3" overflow="hidden">
            <LinkOverlay
               href={guide.url}
               target="_blank"
               fontWeight="semibold"
               fontSize="sm"
               lineHeight="short"
               noOfLines={3}
               flexShrink={0}
               _groupHover={{
                  color: 'brand.500',
               }}
            >
               {guide.title}
            </LinkOverlay>
            {isPresent(guide.summary) && (
               <Text
                  fontSize="sm"
                  mt="1"
                  flexShrink={0}
                  flexGrow={0}
                  noOfLines={1}
                  display={{
                     base: 'none',
                     md: '-webkit-box',
                  }}
               >
                  {guide.summary}
               </Text>
            )}
            {hasBadges && (
               <UnorderedList
                  display="flex"
                  flexWrap="wrap"
                  listStyleType="none"
                  mx="0"
                  mt="1"
               >
                  {isPresent(guide.timeRequired) && (
                     <BadgeListItem>
                        <IconBadge icon={faClock} size="small">
                           {guide.timeRequired}
                        </IconBadge>
                     </BadgeListItem>
                  )}
                  {isPresent(guide.difficulty) && (
                     <BadgeListItem>
                        <DifficultyBadge
                           difficulty={guide.difficulty}
                           size="small"
                        />
                     </BadgeListItem>
                  )}
               </UnorderedList>
            )}
         </Box>
      </LinkBox>
   );
}

function BadgeListItem({ children }: React.PropsWithChildren<{}>) {
   return (
      <ListItem display="flex" mr="2" mt="1" maxW="full" overflow="hidden">
         {children}
      </ListItem>
   );
}

function isPresent(text: any): text is string {
   return typeof text === 'string' && text.length > 0;
}

type DifficultyBadgeProps = IconBadgeProps & {
   difficulty: string;
};

const DifficultyBadge = forwardRef<DifficultyBadgeProps, 'div'>(
   ({ difficulty, ...props }, ref) => {
      switch (difficulty.toLowerCase()) {
         case 'very easy': {
            return (
               <IconBadge
                  ref={ref}
                  {...props}
                  colorScheme="green"
                  icon={faGaugeMin}
               >
                  {difficulty}
               </IconBadge>
            );
         }
         case 'easy': {
            return (
               <IconBadge
                  ref={ref}
                  {...props}
                  colorScheme="green"
                  icon={faGaugeLow}
               >
                  {difficulty}
               </IconBadge>
            );
         }
         case 'moderate': {
            return (
               <IconBadge
                  ref={ref}
                  {...props}
                  colorScheme="amber"
                  icon={faGauge}
               >
                  {difficulty}
               </IconBadge>
            );
         }
         case 'difficult': {
            return (
               <IconBadge
                  ref={ref}
                  {...props}
                  colorScheme="red"
                  icon={faGaugeHigh}
               >
                  {difficulty}
               </IconBadge>
            );
         }
         case 'very difficult': {
            return (
               <IconBadge
                  ref={ref}
                  {...props}
                  colorScheme="red"
                  icon={faGaugeMax}
               >
                  {difficulty}
               </IconBadge>
            );
         }
         default: {
            return (
               <IconBadge ref={ref} {...props} icon={faGauge}>
                  {difficulty}
               </IconBadge>
            );
         }
      }
   }
);
