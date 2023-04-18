import { DefaultLayout } from '@layouts/default';
import { DefaultLayoutProps } from '@layouts/default/server';
import Head from 'next/head';
import React from 'react';
import {
   Text,
   Avatar,
   Alert,
   AlertIcon,
   Box,
   BoxProps,
   Button,
   Flex,
   FlexProps,
   Heading,
   IconButton,
   Link,
   LinkProps,
   Menu,
   MenuButton,
   MenuItem,
   MenuList,
   chakra,
   OrderedList,
   ListItem,
   Spacer,
} from '@chakra-ui/react';
import Prerendered from './prerendered';
import {
   Author,
   BreadcrumbEntry,
   Section,
   TroubleshootingData,
} from './hooks/useTroubleshootingProps';
import SolutionCard from './solution';
import { FaIcon } from '@ifixit/icons';
import {
   faAngleDown,
   faClockRotateLeft,
   faPenToSquare,
} from '@fortawesome/pro-solid-svg-icons';
import { BreadCrumbs } from '@ifixit/breadcrumbs';

const Wiki: NextPageWithLayout<{
   wikiData: TroubleshootingData;
   layoutProps: DefaultLayoutProps;
}> = ({ wikiData }) => {
   const lastUpdatedDate = new Date(wikiData.lastUpdatedDate * 1000);
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
            padding={{ base: '0px 16px 32px', sm: '0px 32px 32px' }}
            gap="16px"
            maxW="1280px"
            w="100%"
            flexShrink="1"
            direction="column"
            id="main"
         >
            <Head>
               <meta name="description" content={wikiData.metaDescription} />
               <meta name="title" content={wikiData.title} />
               <meta name="keywords" content={wikiData.metaKeywords} />
               <meta name="robots" content="noindex" />
               <link rel="canonical" href={wikiData.canonicalUrl} />
               <HreflangUrls urls={wikiData.hreflangUrls} />
            </Head>
            <Heading as="h1" marginTop={6}>
               {wikiData.title}
            </Heading>
            <AuthorInformation
               lastUpdatedDate={lastUpdatedDate}
               authors={wikiData.authors}
               historyUrl={wikiData.historyUrl}
            />
            {wikiData.introduction.map((intro) => (
               <IntroductionSection key={intro.heading} intro={intro} />
            ))}
            <Spacer borderBottom="1px" borderColor="gray.300" />
            {wikiData.solutions.length > 0 && (
               <>
                  <Heading as="h2" fontSize="20px">
                     {'Causes'}
                  </Heading>
                  <OrderedList marginBottom="24px" spacing="8px">
                     {wikiData.solutions.map((solution, index) => (
                        <ListItem key={solution.heading}>
                           <Link
                              href={`#solution-${index + 1}`}
                              color="brand.500"
                              fontWeight="bold"
                           >
                              {solution.heading}
                           </Link>
                        </ListItem>
                     ))}
                  </OrderedList>
               </>
            )}
            {wikiData.solutions.map((solution, index) => (
               <SolutionCard
                  key={solution.heading}
                  index={index + 1}
                  solution={solution}
               />
            ))}
            {wikiData.conclusion.map((conclusion) => (
               <ConclusionSection
                  key={conclusion.heading}
                  conclusion={conclusion}
               />
            ))}
            <AnswersCTA />
         </Flex>
      </Flex>
   );
};

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
   return (
      <Flex
         w="100%"
         minH="48px"
         backgroundColor="white"
         borderBottomColor="gray.200"
         borderBottomWidth="1px"
         justify="center"
      >
         <Flex
            maxW="1280px"
            width="100%"
            flexDirection={{ base: 'column-reverse', sm: 'row' }}
         >
            <BreadCrumbs
               minW="0"
               height="48px"
               breadCrumbs={bc.slice(0, -1)}
               paddingInline={padding}
            />
            <Flex minW="0">
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
                  flexShrink="1"
                  flexGrow="1"
                  minW="0"
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
            Guide
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
      <Flex paddingTop="8px" paddingBottom="16px" align="center" gap="6px">
         {primaryAuthor && <AuthorAvatar author={primaryAuthor} />}
         <Flex justify="center" direction="column">
            {primaryAuthor && (
               <AuthorListing
                  primaryAuthor={primaryAuthor}
                  authorCount={otherAuthors.length}
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
         fontWeight="regular"
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
}: {
   primaryAuthor: Author;
   authorCount: number;
   historyUrl: string;
}) {
   const primaryAuthorName = primaryAuthor.username;
   const contributorDescription =
      authorCount > 1 ? 'contributors' : 'contributor';
   return (
      <Link
         href={historyUrl}
         fontWeight="medium"
         fontSize="14px"
         color="brand.500"
      >
         <span>{primaryAuthorName}</span>
         {authorCount > 0 && (
            <>
               <chakra.span as="span" fontWeight="regular" color="gray.900">
                  {' and '}
               </chakra.span>
               <chakra.span>{`${authorCount} ${contributorDescription}`}</chakra.span>
            </>
         )}
      </Link>
   );
}

function IntroductionSection({ intro }: { intro: Section }) {
   return (
      <Box>
         <Heading marginBottom={6}>{intro.heading}</Heading>
         <Prerendered html={intro.body} />
      </Box>
   );
}

function ConclusionSection({ conclusion }: { conclusion: Section }) {
   return (
      <Box>
         <Heading marginBottom={6}>{conclusion.heading}</Heading>
         <Prerendered html={conclusion.body} />
      </Box>
   );
}

function AnswersCTA() {
   return (
      <Alert status="info">
         <AlertIcon />
         <chakra.span>Haven't found the solution to your problem?</chakra.span>
         <chakra.span flexGrow="1"></chakra.span>
         <Button href="/Answers" as="link">
            Ask a question
         </Button>
      </Alert>
   );
}

Wiki.getLayout = function getLayout(page, pageProps) {
   return <DefaultLayout {...pageProps.layoutProps}>{page}</DefaultLayout>;
};

export default Wiki;
