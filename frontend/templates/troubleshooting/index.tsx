import { DefaultLayout } from '@layouts/default';
import { DefaultLayoutProps } from '@layouts/default/server';
import Head from 'next/head';
import React from 'react';
import {
   Text,
   Avatar,
   Box,
   BoxProps,
   Button,
   Flex,
   Heading,
   IconButton,
   Link,
   LinkProps,
   Menu,
   MenuButton,
   MenuItem,
   MenuList,
} from '@chakra-ui/react';
import Prerendered from './prerendered';
import {
   Author,
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
         />
         <Flex
            padding="0px 32px 32px"
            gap="16px"
            maxW="1280px"
            direction="column"
            id="main"
         >
            <Head>
               <meta name="robots" content="noindex" />
               <link rel="canonical" href={wikiData.canonicalUrl} />
            </Head>
            <Heading as="h1">{wikiData.title}</Heading>
            <AuthorInformation
               lastUpdatedDate={lastUpdatedDate}
               authors={wikiData.authors}
               historyUrl={wikiData.historyUrl}
            />
            {wikiData.introduction.map((intro) => (
               <IntroductionSection key={intro.heading} intro={intro} />
            ))}
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
         </Flex>
      </Flex>
   );
};

function NavBar({
   editUrl,
   historyUrl,
   deviceGuideUrl,
   devicePartsUrl,
}: {
   editUrl: string;
   historyUrl: string;
} & NavTabsProps) {
   return (
      <Flex
         w="100%"
         h="48px"
         backgroundColor="white"
         borderBottomColor="gray.200"
         borderBottomWidth="1px"
         justify="center"
      >
         <Flex maxW="1280px" flexGrow="1">
            <Breadcrumbs />
            <NavTabs
               deviceGuideUrl={deviceGuideUrl}
               devicePartsUrl={devicePartsUrl}
            />
            <EditButton editUrl={editUrl} />
            <ActionsMenu historyUrl={historyUrl} />
         </Flex>
      </Flex>
   );
}

function Breadcrumbs() {
   return <Box flexGrow="1"></Box>;
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

function NavTabs({ devicePartsUrl, deviceGuideUrl }: NavTabsProps) {
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
      <>
         <Flex paddingInline="12px" gap="6px" height="100%">
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
   return (
      <Flex paddingTop="8px" paddingBottom="16px" align="center" gap="6px">
         <AuthorAvatar />
         <Flex justify="center" direction="column">
            <AuthorListing authors={authors} />
            <LastUpdatedDate
               lastUpdatedDate={lastUpdatedDate}
               historyUrl={historyUrl}
            />
         </Flex>
      </Flex>
   );
}

function AuthorAvatar() {
   return <> </>;
   return <Avatar size="40x40" showBorder={true} />;
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

function AuthorListing({ authors }: { authors: Author[] }) {
   const primaryAuthor = authors[0];
   if (!primaryAuthor) {
      return null;
   }
   const primaryAuthorName = primaryAuthor.username;
   const otherAuthors = authors.slice(1);
   return (
      <Text fontWeight="medium" fontSize="14px" color="brand.500">
         <span>{primaryAuthorName}</span>
         {otherAuthors.length > 0 && (
            <>
               <Box as="span" fontWeight="regular" color="gray.900">
                  {' and '}
               </Box>
               <Box as="span">{`${otherAuthors.length} contributors`}</Box>
            </>
         )}
      </Text>
   );
}

function IntroductionSection({ intro }: { intro: Section }) {
   return (
      <Box>
         <Heading>{intro.heading}</Heading>
         <Prerendered html={intro.body} />
      </Box>
   );
}

function ConclusionSection({ conclusion }: { conclusion: Section }) {
   return (
      <Box>
         <Heading>{conclusion.heading}</Heading>
         <Prerendered html={conclusion.body} />
      </Box>
   );
}

Wiki.getLayout = function getLayout(page, pageProps) {
   return <DefaultLayout {...pageProps.layoutProps}>{page}</DefaultLayout>;
};

export default Wiki;
