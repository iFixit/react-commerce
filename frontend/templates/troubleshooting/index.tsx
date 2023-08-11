import { DefaultLayout } from '@layouts/default';
import { DefaultLayoutProps } from '@layouts/default/server';
import Head from 'next/head';
import React, { useRef } from 'react';
import {
   Avatar,
   Alert,
   AlertIcon,
   Box,
   BoxProps,
   Button,
   Container,
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
   Stack,
   Square,
   useDisclosure,
   VisuallyHidden,
   VStack,
   chakra,
   HStack,
   SimpleGrid,
   useToken,
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
   faCircleNodes,
   faClockRotateLeft,
   faPenToSquare,
} from '@fortawesome/pro-solid-svg-icons';
import { BreadCrumbs } from '@ifixit/breadcrumbs';
import { HeadingSelfLink } from './components/HeadingSelfLink';
import ProblemCard from './Problem';
import { PixelPing } from '@components/analytics/PixelPing';
import { TagManager, GoogleNoScript } from './components/TagManager';
import { ScrollPercent } from './scrollPercent';

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
   const smBreakpoint = useToken('breakpoints', 'sm');

   const imageSx: any = {
      display: 'none',
   };
   imageSx[`@media (min-width: ${smBreakpoint})`] = {
      display: 'block',
   };

   const scrollContainerRef = useRef(null);

   return (
      <>
         <GoogleNoScript />
         <ScrollPercent
            scrollContainerRef={scrollContainerRef}
            hideOnZero={true}
            hideOnScrollPast={true}
         />
         <NavBar
            editUrl={wikiData.editUrl}
            historyUrl={wikiData.historyUrl}
            deviceGuideUrl={wikiData.deviceGuideUrl}
            devicePartsUrl={wikiData.devicePartsUrl}
            breadcrumbs={wikiData.breadcrumbs}
         />
         <Container fontSize="md" maxW="1280px" ref={scrollContainerRef}>
            <Flex
               direction="column"
               paddingInline={{ base: 0, sm: 4 }}
               paddingBottom={8}
               flexShrink="1"
               id="main"
            >
               <TagManager />
               <Metadata
                  metaDescription={metaDescription}
                  metaKeywords={metaKeywords}
                  canonicalUrl={canonicalUrl}
                  title={title}
               />
               <HreflangUrls urls={wikiData.hreflangUrls} />
               <HStack
                  spacing={0}
                  mt={{ base: 3, sm: 8 }}
                  align="start"
                  pb={{ base: 4, sm: 6 }}
                  borderBottom="1px"
                  borderColor="gray.300"
               >
                  <Image
                     sx={imageSx}
                     src={mainImageUrl}
                     onClick={onOpen}
                     cursor="pointer"
                     alt={title}
                     htmlWidth={120}
                     htmlHeight={90}
                     objectFit="contain"
                     borderRadius="md"
                     outline="1px solid"
                     outlineColor="gray.300"
                     marginRight={3}
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
                  <VStack alignItems="flex-start" spacing={2}>
                     <HeadingSelfLink
                        as="h1"
                        fontSize="3xl"
                        fontWeight="medium"
                        selfLinked
                        id="top"
                        mt={0}
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
               {wikiData.introduction.map((intro) => (
                  <IntroductionSection key={intro.heading} intro={intro} />
               ))}
               {wikiData.solutions.length > 0 && (
                  <Box
                     borderTop="1px"
                     borderColor="gray.300"
                     mt={{ base: 4, sm: 6 }}
                  >
                     <HeadingSelfLink
                        as="h2"
                        fontSize="20px"
                        fontWeight="semibold"
                        selfLinked
                        id="causes"
                     >
                        {'Causes'}
                     </HeadingSelfLink>
                     <TableOfContents
                        solutions={wikiData.solutions}
                        problems={wikiData.linkedProblems}
                     />
                     <Stack spacing={3} mt={{ base: 7, sm: 10 }}>
                        {wikiData.solutions.map((solution, index) => (
                           <SectionCard
                              key={solution.heading}
                              index={index + 1}
                              solution={solution}
                           />
                        ))}
                     </Stack>
                  </Box>
               )}
               <Conclusion conclusion={wikiData.conclusion} />
               <AnswersCTA answersUrl={wikiData.answersUrl} />
               {wikiData.linkedProblems.length > 0 && (
                  <RelatedProblems problems={wikiData.linkedProblems} />
               )}
               <PixelPing id={id} type="wiki" />
            </Flex>
         </Container>
      </>
   );
};

function TableOfContents({
   solutions,
   problems,
}: {
   solutions: Section[];
   problems: Problem[];
}) {
   return (
      <VStack as="nav" align="flex-start" color="brand.500" mt={4} spacing={2}>
         {solutions.map((solution, index) => (
            <Stack key={solution.heading}>
               <Link
                  href={`#${solution.id}`}
                  fontWeight="semibold"
                  display="flex"
               >
                  <Square
                     size={6}
                     bgColor="brand.500"
                     border="1px solid"
                     borderColor="brand.700"
                     borderRadius="md"
                     color="white"
                     mr={2}
                     fontSize="sm"
                  >
                     {index + 1}
                  </Square>
                  <Box as="span">{solution.heading}</Box>
               </Link>
            </Stack>
         ))}
         {problems.length > 0 && (
            <Stack>
               <Link
                  href="#related-problems"
                  fontWeight="semibold"
                  display="flex"
               >
                  <Square
                     size={6}
                     border="1px solid"
                     borderColor="brand.700"
                     borderRadius="md"
                     mr={2}
                  >
                     <FaIcon icon={faCircleNodes} color="brand.500" />
                  </Square>
                  <Box as="span">Related Problems</Box>
               </Link>
            </Stack>
         )}
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
                     paddingInline={{ base: 0, sm: 2 }}
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
         py="9px"
         px={4}
         fontFamily="heading"
         lineHeight="1.29"
         fontWeight="semibold"
         fontSize="sm"
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
      fontWeight: 'medium',
      _visited: {
         color: 'gray.900',
      },
      _hover: {
         textDecoration: 'none',
         background: 'gray.100',
         '::after': {
            background: 'blue.700',
         },
      },
      _after: {
         ...bottomFeedbackStyleProps,
         background: 'blue.500',
      },
   };

   const notSelectedStyleProps = {
      ...baseStyleProps,
      borderColor: 'transparent',
      color: 'gray.500',
      fontWeight: 'normal',
      _hover: {
         textDecoration: 'none',
      },
      _visited: {
         color: 'gray.500',
      },
      sx: {
         '&:hover:not(.isDisabled)': {
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
      <Flex {...props} gap={1.5} height="100%">
         {devicePartsUrl ? (
            <Link {...notSelectedStyleProps} href={devicePartsUrl}>
               Parts
            </Link>
         ) : (
            <Box className="isDisabled" {...notSelectedStyleProps}>
               Parts
            </Box>
         )}

         {deviceGuideUrl ? (
            <Link {...notSelectedStyleProps} href={deviceGuideUrl}>
               Guides
            </Link>
         ) : (
            <Box className="isDisabled" {...notSelectedStyleProps}>
               Guides
            </Box>
         )}

         <Box {...selectedStyleProps}>Answers</Box>
      </Flex>
   );
}

function HreflangUrls({ urls }: { urls: Record<string, string> }) {
   const hreflangs = Object.entries(urls);
   return (
      <Head>
         {hreflangs.map(([lang, url]) => (
            <link
               rel="alternate"
               key={`hreflang-${lang}`}
               hrefLang={lang}
               href={url}
            />
         ))}
      </Head>
   );
}

function Metadata({
   metaDescription,
   title,
   metaKeywords,
   canonicalUrl,
}: {
   metaDescription: string;
   title: string;
   metaKeywords: string;
   canonicalUrl: string;
}) {
   return (
      <Head>
         <meta
            key="meta-description"
            name="description"
            content={metaDescription}
         />
         <meta key="meta-title" name="title" content={title} />
         <meta key="meta-keywords" name="keywords" content={metaKeywords} />
         <meta key="meta-robots" name="robots" content="index, follow" />,
         <link key="canonical" rel="canonical" href={canonicalUrl} />
      </Head>
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
      <Flex align="center" gap={1.5}>
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
         boxSize={10}
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
         fontSize="sm"
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
      <Box fontSize="sm">
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
               fontSize="2xl"
               fontWeight="semibold"
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
         <HeadingSelfLink selfLinked id={conclusion.id} pt={4}>
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
      <Alert p={3} mt={4}>
         <AlertIcon color="gray.500" />
         <chakra.span pr={3} mr="auto">
            Haven&apos;t found the solution to your problem?
         </chakra.span>
         <Button href={answersUrl} as="a" colorScheme="brand">
            Browse our forum
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
            fontWeight="medium"
            id="related-problems"
            selfLinked
            pt={4}
         >
            Related Problems
         </HeadingSelfLink>
         <SimpleGrid columns={{ base: 1, sm: 2 }} gap={3} mt={4}>
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
