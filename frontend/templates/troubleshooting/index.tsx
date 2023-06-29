import { DefaultLayout } from '@layouts/default';
import { DefaultLayoutProps } from '@layouts/default/server';
import Head from 'next/head';
import React from 'react';
import {
   Avatar,
   Alert,
   AlertIcon,
   Box,
   BoxProps,
   Button,
   Flex,
   FlexProps,
   IconButton,
   Image,
   Link,
   LinkProps,
   Menu,
   MenuButton,
   MenuItem,
   MenuList,
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalBody,
   ModalCloseButton,
   Spacer,
   useDisclosure,
   VisuallyHidden,
   VStack,
   chakra,
   HStack,
   SimpleGrid,
} from '@chakra-ui/react';
import Prerendered from './prerendered';
import type {
   Author,
   BreadcrumbEntry,
   Problem,
   Section,
   TroubleshootingData,
} from './hooks/useTroubleshootingProps';
import SectionCard from './solution';
import { FaIcon } from '@ifixit/icons';
import {
   faAngleDown,
   faClockRotateLeft,
   faPenToSquare,
} from '@fortawesome/pro-solid-svg-icons';
import { BreadCrumbs } from '@ifixit/breadcrumbs';
import { HeadingSelfLink } from './components/HeadingSelfLink';
import ProblemCard from './Problem';
import { PixelPing } from '@components/analytics/PixelPing';

const Wiki: NextPageWithLayout<{
   wikiData: TroubleshootingData;
   layoutProps: DefaultLayoutProps;
}> = ({ wikiData }) => {
   const lastUpdatedDate = new Date(wikiData.lastUpdatedDate * 1000);
   const {
      metaDescription,
      title,
      metaKeywords,
      canonicalUrl,
      mainImageUrl,
      mainImageUrlLarge,
      id,
   } = wikiData;
   const { isOpen, onOpen, onClose } = useDisclosure();
   const metadata = (
      <>
         <meta name="description" content={metaDescription} />
         <meta name="title" content={title} />
         <meta name="keywords" content={metaKeywords} />
         <meta name="robots" content="noindex" />,
         <link rel="canonical" href={canonicalUrl} />
      </>
   );

   return (
      <Flex direction="column" alignItems="center" width="100%" fontSize="16px">
         <NavBar
            editUrl={wikiData.editUrl}
            historyUrl={wikiData.historyUrl}
            deviceGuideUrl={wikiData.deviceGuideUrl}
            devicePartsUrl={wikiData.devicePartsUrl}
            breadcrumbs={wikiData.breadcrumbs}
         />
         <Flex
            padding={{ base: '16px 16px 32px', sm: '32px 32px 32px' }}
            gap="16px"
            maxW="1280px"
            w="100%"
            flexShrink="1"
            direction="column"
            id="main"
         >
            <Head>
               {metadata}
               <HreflangUrls urls={wikiData.hreflangUrls} />
            </Head>
            <HStack spacing={0}>
               <Image
                  src={mainImageUrl}
                  onClick={onOpen}
                  cursor="pointer"
                  alt={title}
                  htmlWidth={120}
                  htmlHeight={90}
                  objectFit="contain"
                  borderRadius="4px"
                  outline="1px solid"
                  outlineColor="gray.300"
                  marginRight="12px"
                  display={{ base: 'none', sm: 'block' }}
               />
               <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent
                     width="auto"
                     maxWidth="calc(100% - 64px)"
                     background="none"
                  >
                     <VisuallyHidden>
                        <ModalHeader>{title}</ModalHeader>
                     </VisuallyHidden>
                     <ModalCloseButton />
                     <VisuallyHidden></VisuallyHidden>
                     <ModalBody padding={0}>
                        <Image
                           src={mainImageUrlLarge}
                           width="100%"
                           height="auto"
                           alt={title}
                        />
                     </ModalBody>
                  </ModalContent>
               </Modal>
               <VStack alignItems="flex-start" spacing="0px">
                  <HeadingSelfLink
                     as="h1"
                     fontSize="3xl"
                     fontWeight="500"
                     selfLinked
                     id="top"
                  >
                     {wikiData.title}
                  </HeadingSelfLink>
                  <AuthorInformation
                     lastUpdatedDate={lastUpdatedDate}
                     authors={wikiData.authors}
                     historyUrl={wikiData.historyUrl}
                  />
               </VStack>
            </HStack>
            <Spacer borderBottom="1px" borderColor="gray.300" marginTop="2px" />
            {wikiData.introduction.map((intro) => (
               <IntroductionSection key={intro.heading} intro={intro} />
            ))}
            {wikiData.introduction.length > 0 && (
               <Spacer borderBottom="1px" borderColor="gray.300" />
            )}
            {wikiData.solutions.length > 0 && (
               <>
                  <HeadingSelfLink
                     as="h2"
                     fontSize="20px"
                     fontWeight="600"
                     selfLinked
                     id="causes"
                  >
                     {'Causes'}
                  </HeadingSelfLink>
                  <TableOfContents solutions={wikiData.solutions} />
               </>
            )}
            {wikiData.solutions.map((solution, index) => (
               <SectionCard
                  key={solution.heading}
                  index={index + 1}
                  solution={solution}
               />
            ))}
            <Conclusion conclusion={wikiData.conclusion} />
            <AnswersCTA answersUrl={wikiData.answersUrl} />
            {wikiData.linkedProblems.length > 0 && (
               <RelatedProblems problems={wikiData.linkedProblems} />
            )}
            <PixelPing id={`ifixit/troubleshooting/${id}/en`} />
         </Flex>
      </Flex>
   );
};

function TableOfContents({ solutions }: { solutions: Section[] }) {
   return (
      <VStack
         as="nav"
         align="flex-start"
         color="brand.500"
         marginBottom={6}
         spacing={2}
      >
         {solutions.map((solution, index) => (
            <Link
               key={solution.heading}
               href={`#${solution.id}`}
               fontWeight="medium"
               display="flex"
            >
               <Box as="span" minWidth="3ch" textAlign="right">
                  {`${index + 1}.`}&nbsp;
               </Box>
               <Box as="span">{solution.heading}</Box>
            </Link>
         ))}
      </VStack>
   );
}

function NavBar({
   editUrl,
   historyUrl,
   deviceGuideUrl,
   devicePartsUrl,
   breadcrumbs,
}: {
   editUrl: string;
   historyUrl: string;
   breadcrumbs: BreadcrumbEntry[];
} & NavTabsProps) {
   const bc = breadcrumbs.map((breadcrumb) => ({
      label: breadcrumb.title,
      url: breadcrumb.url,
   }));
   const padding = { base: '16px', sm: '32px' };
   const breadcrumbMinHeight = '48px';
   return (
      <Flex
         w="100%"
         backgroundColor="white"
         borderBottomColor="gray.200"
         borderBottomWidth={{ base: '0', sm: '1px' }}
         justify="center"
         minHeight={breadcrumbMinHeight}
      >
         <Flex
            maxW="1280px"
            width="100%"
            flexDirection={{ base: 'column-reverse', sm: 'row' }}
            justify="stretch"
         >
            <BreadCrumbs
               breadCrumbs={bc.slice(0, -1)}
               paddingInline={padding}
               minHeight={breadcrumbMinHeight}
               borderTop={{ base: '1px', sm: '0' }}
               borderTopColor="gray.200"
               bgColor={{ base: 'blueGray.50', sm: 'transparent' }}
            />
            <Flex flexShrink="1">
               <Box
                  sx={{
                     '::before, ::after': {
                        minWidth: padding,
                        display: { base: 'default', sm: 'none' },
                        position: 'absolute',
                        top: '0',
                        content: '""',
                        height: '100%',
                        zIndex: '1',
                        isolation: 'isolate',
                     },
                     '::before': {
                        left: '0',
                        background:
                           'linear-gradient(to right, #fff 60%, rgba(255, 255, 255, 0))',
                     },
                     '::after': {
                        right: '0',
                        background:
                           'linear-gradient(to left, #fff 60%, rgba(255, 255, 255, 0))',
                     },
                  }}
                  position="relative"
                  flex="1 2"
                  overflowX="auto"
               >
                  <NavTabs
                     overflowX="auto"
                     flexGrow="1"
                     paddingInline={{ base: '16px', sm: '8px' }}
                     deviceGuideUrl={deviceGuideUrl}
                     devicePartsUrl={devicePartsUrl}
                  />
               </Box>
               <EditButton editUrl={editUrl} />
               <ActionsMenu historyUrl={historyUrl} />
            </Flex>
         </Flex>
      </Flex>
   );
}

function EditButton({ editUrl }: { editUrl: string }) {
   return (
      <Button
         leftIcon={<FaIcon icon={faPenToSquare} />}
         variant="link"
         as={Link}
         bgColor="transparent"
         textColor="brand"
         borderLeftColor="gray.200"
         borderLeftWidth="1px"
         borderRightColor="gray.200"
         borderRightWidth="1px"
         borderRadius="0px"
         padding="9px, 16px, 9px, 16px"
         fontFamily="heading"
         lineHeight="1.29"
         fontWeight="semibold"
         fontSize="14px"
         color="brand.500"
         textAlign="center"
         href={editUrl}
         minW="fit-content"
      >
         Edit
      </Button>
   );
}

function ActionsMenu({ historyUrl }: { historyUrl: string }) {
   return (
      <Menu>
         {({ isOpen }) => {
            return (
               <>
                  <MenuButton
                     as={IconButton}
                     aria-label="Options"
                     icon={
                        <FaIcon
                           color={isOpen ? 'brand.500' : 'gray.500'}
                           icon={faAngleDown}
                        />
                     }
                     variant="link"
                     borderRightColor="gray.200"
                     borderRightWidth={1}
                     borderRightRadius={0}
                  />
                  <MenuList>
                     <MenuItem
                        as={Link}
                        _hover={{ textDecoration: 'none' }}
                        href={historyUrl}
                        icon={<FaIcon icon={faClockRotateLeft} />}
                     >
                        History
                     </MenuItem>
                  </MenuList>
               </>
            );
         }}
      </Menu>
   );
}

type NavTabsProps = {
   deviceGuideUrl?: string;
   devicePartsUrl?: string;
};

function NavTabs({
   devicePartsUrl,
   deviceGuideUrl,
   ...props
}: NavTabsProps & FlexProps) {
   // The type here works because all the styles we want to use are available on
   // both Box and Link
   const baseStyleProps: BoxProps & LinkProps = {
      outline: '2px solid transparent',
      outlineOffset: '2px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 'md',
      paddingTop: 2,
      paddingBottom: 2,
      paddingInlineStart: 4,
      paddingInlineEnd: 4,
      position: 'relative',
   };

   const bottomFeedbackStyleProps = {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '3px',
      borderRadius: '2px 2px 0px 0px',
   };

   const selectedStyleProps = {
      ...baseStyleProps,
      borderColor: 'blue.500',
      color: 'gray.900',
      fontWeight: 500,
      sx: {
         '&:visited': {
            color: 'gray.900',
         },
         '&:hover': {
            textDecoration: 'none',
            background: 'gray.100',
            '::after': {
               background: 'blue.700',
            },
         },
         '::after': {
            ...bottomFeedbackStyleProps,
            background: 'blue.500',
         },
      },
   };

   const notSelectedStyleProps = {
      ...baseStyleProps,
      borderColor: 'transparent',
      color: 'gray.500',
      fontWeight: 400,
      sx: {
         '&:visited': {
            color: 'gray.500',
         },
         '&:hover': {
            textDecoration: 'none',
         },
         '&:hover:not(.isDisabled)': {
            textDecoration: 'none',
            color: 'gray.700',
            background: 'gray.100',
         },
         '&.isDisabled': {
            opacity: 0.4,
            cursor: 'not-allowed',
            color: 'gray.700',
            background: 'gray.100',
         },
      },
   };

   return (
      <Flex {...props} gap="6px" height="100%">
         <Link
            className={devicePartsUrl ? '' : 'isDisabled'}
            {...notSelectedStyleProps}
            href={devicePartsUrl}
         >
            Parts
         </Link>
         <Link
            className={deviceGuideUrl ? '' : 'isDisabled'}
            {...notSelectedStyleProps}
            href={deviceGuideUrl}
         >
            Guides
         </Link>
         <Box {...selectedStyleProps}>Answers</Box>
      </Flex>
   );
}

function HreflangUrls({ urls }: { urls: Record<string, string> }) {
   const hreflangs = Object.entries(urls);
   return (
      <>
         {hreflangs.map(([lang, url]) => (
            <link rel="alternate" key={lang} hrefLang={lang} href={url} />
         ))}
      </>
   );
}

function AuthorInformation({
   lastUpdatedDate,
   authors,
   historyUrl,
}: {
   lastUpdatedDate: Date;
   authors: Author[];
   historyUrl: string;
}) {
   const primaryAuthor: Author | undefined = authors[0];
   const otherAuthors = authors.slice(1);
   return (
      <Flex paddingTop="8px" align="center" gap="6px">
         {primaryAuthor && <AuthorAvatar author={primaryAuthor} />}
         <Flex justify="center" direction="column">
            {primaryAuthor && (
               <AuthorListing
                  primaryAuthor={primaryAuthor}
                  authorCount={otherAuthors.length}
                  authorProfileUrl={primaryAuthor.profileUrl}
                  historyUrl={historyUrl}
               />
            )}
            <LastUpdatedDate
               lastUpdatedDate={lastUpdatedDate}
               historyUrl={historyUrl}
            />
         </Flex>
      </Flex>
   );
}

function AuthorAvatar({ author }: { author: Author }) {
   return (
      <Avatar
         size="md"
         width="40px"
         height="40px"
         showBorder={true}
         borderColor="brand.500"
         name={author.username}
         src={author.avatar}
      />
   );
}

function LastUpdatedDate({
   lastUpdatedDate,
   historyUrl,
}: {
   lastUpdatedDate: Date;
   historyUrl: string;
}) {
   return (
      <Link
         href={historyUrl}
         fontWeight="normal"
         fontSize="14px"
         color="gray.500"
      >
         {'Last updated on ' +
            lastUpdatedDate.toLocaleDateString(undefined, {
               year: 'numeric',
               month: 'long',
               day: 'numeric',
            })}
      </Link>
   );
}

function AuthorListing({
   primaryAuthor,
   authorCount,
   historyUrl,
   authorProfileUrl,
}: {
   primaryAuthor: Author;
   authorCount: number;
   historyUrl: string;
   authorProfileUrl: string;
}) {
   const primaryAuthorName = primaryAuthor.username;
   const contributorDescription =
      authorCount > 1 ? 'contributors' : 'contributor';
   const linkStyle = {
      fontWeight: 'medium',
      color: 'brand.500',
   };
   return (
      <Box fontSize="14px">
         <Link href={authorProfileUrl} {...linkStyle}>
            {primaryAuthorName}
         </Link>
         {authorCount > 0 && (
            <>
               <chakra.span as="span" color="gray.900">
                  {' and '}
               </chakra.span>
               <Link {...linkStyle} href={historyUrl}>
                  {`${authorCount} ${contributorDescription}`}
               </Link>
            </>
         )}
      </Box>
   );
}

function IntroductionSection({ intro }: { intro: Section }) {
   return (
      <>
         {intro.heading && (
            <HeadingSelfLink
               marginBottom={6}
               fontSize="2xl"
               fontWeight="600"
               selfLinked
               id={intro.id}
            >
               {intro.heading}
            </HeadingSelfLink>
         )}
         <Prerendered html={intro.body} />
      </>
   );
}

function ConclusionSection({ conclusion }: { conclusion: Section }) {
   return (
      <>
         <HeadingSelfLink marginBottom={6} selfLinked id={conclusion.id}>
            {conclusion.heading}
         </HeadingSelfLink>
         <Prerendered html={conclusion.body} />
      </>
   );
}

function Conclusion({ conclusion: conclusions }: { conclusion: Section[] }) {
   const filteredConclusions = conclusions.filter(
      (conclusion) => conclusion.heading !== 'Related Pages'
   );
   return (
      <>
         {filteredConclusions.map((conclusion) => (
            <ConclusionSection
               key={conclusion.heading}
               conclusion={conclusion}
            />
         ))}
      </>
   );
}

function AnswersCTA({ answersUrl }: { answersUrl: string }) {
   return (
      <Alert>
         <AlertIcon color="gray.500" />
         <chakra.span pr={3} mr="auto">
            Haven&apos;t found the solution to your problem?
         </chakra.span>
         <Button href={answersUrl} as="a" colorScheme="brand">
            Ask a question
         </Button>
      </Alert>
   );
}

function RelatedProblems({ problems }: { problems: Problem[] }) {
   return (
      <>
         <HeadingSelfLink
            as="h3"
            fontSize="24px"
            fontWeight="500"
            marginTop={4}
            id="related-problems"
         >
            Related Problems
         </HeadingSelfLink>
         <SimpleGrid columns={{ base: 1, sm: 2 }} gap="12px">
            {problems.map((problem) => (
               <ProblemCard problem={problem} key={problem.title} />
            ))}
         </SimpleGrid>
      </>
   );
}

Wiki.getLayout = function getLayout(page, pageProps) {
   return <DefaultLayout {...pageProps.layoutProps}>{page}</DefaultLayout>;
};

export default Wiki;
