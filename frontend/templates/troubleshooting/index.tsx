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
   chakra,
   HStack,
   SimpleGrid,
   useToken,
   HeadingProps,
   useBreakpointValue,
} from '@chakra-ui/react';
import { PrerenderedHTML } from '@components/common';
import type {
   Author,
   BreadcrumbEntry,
   Problem,
   Section,
   TroubleshootingData,
} from './hooks/useTroubleshootingProps';
import SolutionCard from './solution';
import { FaIcon } from '@ifixit/icons';
import {
   faAngleDown,
   faCircleNodes,
   faClockRotateLeft,
   faList,
   faPenToSquare,
} from '@fortawesome/pro-solid-svg-icons';
import { BreadCrumbs } from '@ifixit/breadcrumbs';
import { HeadingSelfLink } from './components/HeadingSelfLink';
import ProblemCard from './Problem';
import { PixelPing } from '@components/analytics/PixelPing';
import { TagManager, GoogleNoScript } from './components/TagManager';
import {
   LinkToTOC,
   TOCContextProvider,
   useTOCBufferPxScrollOnClick,
} from './tocContext';
import { TOC } from './toc';
import { ViewStats } from '@components/common/ViewStats';
import { IntlDate } from '@components/ui/IntlDate';

const RelatedProblemsRecord = {
   title: 'Related Problems',
   uniqueId: 'related-problems',
};

const Wiki: NextPageWithLayout<{
   wikiData: TroubleshootingData;
   layoutProps: DefaultLayoutProps;
}> = ({ wikiData }) => {
   const { metaDescription, title, metaKeywords, canonicalUrl, id, viewStats } =
      wikiData;

   const filteredConclusions = wikiData.conclusion.filter(
      (conclusion) => conclusion.heading !== 'Related Pages'
   );

   const hasRelatedPages = wikiData.linkedProblems.length > 0;

   const firstIntroSection = wikiData.introduction[0] || {};
   const otherIntroSections = wikiData.introduction.slice(1);
   const cleanFirstIntroSection = {
      ...firstIntroSection,
      heading: firstIntroSection.heading || 'Introduction',
      id: firstIntroSection.id || 'introduction',
   };
   const introSections = firstIntroSection.body
      ? [cleanFirstIntroSection, ...otherIntroSections]
      : wikiData.introduction;

   const sections = introSections
      .concat(wikiData.solutions)
      .concat(filteredConclusions);

   const tocItems = sections
      .map((section) => ({ title: section.heading, uniqueId: section.id }))
      .concat(hasRelatedPages ? RelatedProblemsRecord : [])
      .filter((tocItem) => tocItem.title);

   const contentContainerRef = useRef<HTMLDivElement>(null);

   return (
      <>
         <GoogleNoScript />
         <TagManager />
         <Metadata
            metaDescription={metaDescription}
            metaKeywords={metaKeywords}
            canonicalUrl={canonicalUrl}
            title={title}
         />
         <HreflangUrls urls={wikiData.hreflangUrls} />

         <NavBar
            editUrl={wikiData.editUrl}
            historyUrl={wikiData.historyUrl}
            deviceGuideUrl={wikiData.deviceGuideUrl}
            devicePartsUrl={wikiData.devicePartsUrl}
            breadcrumbs={wikiData.breadcrumbs}
         />

         <TOCContextProvider defaultItems={tocItems}>
            <Box
               className="layout-grid"
               display="grid"
               sx={{
                  gridTemplateColumns: {
                     base: '[toc] 0 [wrapper] 1fr',
                     lg: '[toc] 220px [wrapper] 1fr',
                  },
               }}
               ref={contentContainerRef}
            >
               <TOC
                  className="summary"
                  contentRef={contentContainerRef}
                  borderRight={{ lg: '1px solid' }}
                  borderColor={{ lg: 'gray.300' }}
                  maxWidth={{ base: 'calc(100% + 2 * var(--chakra-space-4))' }}
                  listItemProps={{ paddingLeft: { lg: 4 } }}
                  gridArea="toc"
               />
               <Stack
                  className="wrapper"
                  direction={{ base: 'column', xl: 'row' }}
                  fontSize="md"
                  maxW="1280px"
                  paddingTop={{ base: 0, sm: 8 }}
                  paddingX={{ base: 4, sm: 8 }}
                  paddingBottom={8}
                  minW={0}
                  marginInline="auto"
                  spacing={{ base: 4, lg: 12 }}
                  flexWrap={{ base: 'wrap', xl: 'nowrap' }}
                  gridArea="wrapper"
               >
                  <Stack id="main" spacing={4}>
                     <Heading wikiData={wikiData} />
                     <Causes
                        introduction={introSections}
                        solutions={wikiData.solutions}
                        problems={wikiData.linkedProblems}
                     />
                     <Stack className="intro" spacing={6} pt={3}>
                        <IntroductionSections introduction={introSections} />
                     </Stack>
                     {wikiData.solutions.length > 0 && (
                        <Stack spacing={6}>
                           {wikiData.solutions.map((solution, index) => (
                              <SolutionCard
                                 key={solution.heading}
                                 index={index + 1}
                                 solution={solution}
                              />
                           ))}
                        </Stack>
                     )}
                     <Conclusion conclusion={filteredConclusions} />
                     <AnswersCTA answersUrl={wikiData.answersUrl} />
                     {wikiData.linkedProblems.length > 0 && (
                        <RelatedProblems problems={wikiData.linkedProblems} />
                     )}
                  </Stack>
               </Stack>
            </Box>
         </TOCContextProvider>
         {viewStats && <ViewStats {...viewStats} />}
         <PixelPing id={id} type="wiki" />
      </>
   );
};

function Heading({ wikiData }: { wikiData: TroubleshootingData }) {
   const { title, mainImageUrl, mainImageUrlLarge } = wikiData;
   const { isOpen, onOpen, onClose } = useDisclosure();
   const lastUpdatedDate = new Date(wikiData.lastUpdatedDate * 1000);
   const smBreakpoint = useToken('breakpoints', 'sm');
   const imageSx: any = {
      display: 'none',
      [`@media (min-width: ${smBreakpoint})`]: {
         display: 'block',
      },
   };

   return (
      <HStack
         spacing={0}
         align="start"
         pb="12px"
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
         <Stack alignItems="flex-start" spacing={2}>
            <HeadingSelfLink
               as="h1"
               id="top"
               selfLinked
               fontSize={{ base: '24px', md: '30px' }}
            >
               {wikiData.title}
            </HeadingSelfLink>
            <AuthorInformation
               lastUpdatedDate={lastUpdatedDate}
               authors={wikiData.authors}
               historyUrl={wikiData.historyUrl}
            />
         </Stack>
      </HStack>
   );
}

function Causes({
   introduction,
   solutions,
   problems,
}: {
   introduction: Section[];
   solutions: Section[];
   problems: Problem[];
}) {
   const lgBreakpoint = useToken('breakpoints', 'lg');

   const sx = {
      display: 'block',
      [`@media (min-width: ${lgBreakpoint})`]: {
         display: 'none',
      },
   };

   return (
      <Box
         mb={{ base: 4, md: 7 }}
         pb={4}
         borderBottom="1px"
         borderColor="gray.300"
         sx={sx}
      >
         <HeadingSelfLink as="h2" fontWeight="semibold" selfLinked id="causes">
            {'Causes'}
         </HeadingSelfLink>
         <Stack
            as="nav"
            align="flex-start"
            color="brand.500"
            mt={4}
            spacing={2}
         >
            {introduction.map((intro) => (
               <CausesIntro key={intro.heading} {...intro} />
            ))}
            {solutions.map((solution, index) => (
               <CausesSolution
                  key={solution.heading}
                  {...solution}
                  index={index}
               />
            ))}
            {problems.length > 0 && <CausesRelatedProblem />}
         </Stack>
      </Box>
   );
}

function CausesIntro({ heading, id }: Section) {
   const { onClick } = useTOCBufferPxScrollOnClick(id);

   return (
      <Stack>
         <Link
            href={`#${id}`}
            fontWeight="semibold"
            display="flex"
            onClick={onClick}
         >
            <Square
               size={6}
               border="1px solid"
               borderColor="brand.700"
               borderRadius="md"
               mr={2}
            >
               <FaIcon icon={faList} color="brand.500" />
            </Square>
            <Box as="span">{heading}</Box>
         </Link>
      </Stack>
   );
}

function CausesSolution({ heading, id, index }: Section & { index: number }) {
   const { onClick } = useTOCBufferPxScrollOnClick(id);

   return (
      <Stack>
         <Link
            href={`#${id}`}
            fontWeight="semibold"
            display="flex"
            onClick={onClick}
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
            <Box as="span">{heading}</Box>
         </Link>
      </Stack>
   );
}

function CausesRelatedProblem() {
   const { onClick } = useTOCBufferPxScrollOnClick(
      RelatedProblemsRecord.uniqueId
   );

   return (
      <Stack>
         <Link
            href={`#${RelatedProblemsRecord.uniqueId}`}
            fontWeight="semibold"
            display="flex"
            onClick={onClick}
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
            className="NavBar"
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
               fontSize={{ base: '13px', md: '14px' }}
            />
            <Flex flexShrink="1" fontSize="14px">
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
         Last updated on{' '}
         <IntlDate
            value={lastUpdatedDate}
            options={{
               year: 'numeric',
               month: 'long',
               day: 'numeric',
            }}
         />
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

function IntroductionSections({ introduction }: { introduction: Section[] }) {
   if (!introduction.length) {
      return null;
   }

   return (
      <Stack spacing={6}>
         {introduction.map((intro) => (
            <IntroductionSection key={intro.heading} intro={intro} mt={0} />
         ))}
      </Stack>
   );
}

function IntroductionSection({
   intro,
   ...headingProps
}: { intro: Section } & HeadingProps) {
   const bufferPx = useBreakpointValue({ base: -46, lg: -6 });
   const { ref } = LinkToTOC<HTMLHeadingElement>(intro.id, bufferPx);
   const { onClick } = useTOCBufferPxScrollOnClick(intro.id);

   return (
      <Box ref={ref} id={intro.id}>
         {intro.heading && (
            <HeadingSelfLink
               fontWeight="semibold"
               aria-label={intro.heading}
               selfLinked
               id={intro.id}
               onClick={onClick}
               {...headingProps}
            >
               {intro.heading}
            </HeadingSelfLink>
         )}
         <PrerenderedHTML html={intro.body} template="troubleshooting" />
      </Box>
   );
}

const ConclusionSection = function ConclusionSectionInner({
   conclusion,
}: {
   conclusion: Section;
}) {
   const bufferPx = useBreakpointValue({ base: -40, lg: 0 });
   const { ref } = LinkToTOC<HTMLHeadingElement>(conclusion.id, bufferPx);
   const { onClick } = useTOCBufferPxScrollOnClick(conclusion.id);

   return (
      <Box id={conclusion.id} ref={ref}>
         <HeadingSelfLink pt={4} id={conclusion.id} onClick={onClick}>
            {conclusion.heading}
         </HeadingSelfLink>
         <PrerenderedHTML html={conclusion.body} template="troubleshooting" />
      </Box>
   );
};

function Conclusion({ conclusion: conclusions }: { conclusion: Section[] }) {
   return (
      <>
         {conclusions.map((conclusion) => (
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
   const bufferPx = useBreakpointValue({ base: -40, lg: 0 });
   const { ref } = LinkToTOC<HTMLHeadingElement>(
      RelatedProblemsRecord.uniqueId,
      bufferPx
   );
   const { onClick } = useTOCBufferPxScrollOnClick(
      RelatedProblemsRecord.uniqueId
   );

   return (
      <Box id={RelatedProblemsRecord.uniqueId} ref={ref}>
         <HeadingSelfLink
            as="h3"
            id={RelatedProblemsRecord.uniqueId}
            pt={4}
            onClick={onClick}
         >
            {RelatedProblemsRecord.title}
         </HeadingSelfLink>
         <SimpleGrid columns={{ base: 1, sm: 2 }} gap={3} mt={4}>
            {problems.map((problem) => (
               <ProblemCard problem={problem} key={problem.title} />
            ))}
         </SimpleGrid>
      </Box>
   );
}

Wiki.getLayout = function getLayout(page, pageProps) {
   return <DefaultLayout {...pageProps.layoutProps}>{page}</DefaultLayout>;
};

export default Wiki;
