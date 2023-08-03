import {
   Center,
   Divider,
   Heading,
   Text,
   VStack,
   Flex,
   UnorderedList,
   ListItem,
   Link,
} from '@chakra-ui/react';
import { DEFAULT_STORE_CODE } from '@config/env';
import { DefaultLayout } from '@layouts/default';
import type { WithLayoutProps } from '@layouts/default/server';
import { getLayoutServerSideProps } from '@layouts/default/server';
import { GetStaticProps } from 'next';
import { useTranslations } from 'next-intl';

type Messages = Record<string, any>;
type Custom404Props = WithLayoutProps<{ messages: Messages }>;

export const Custom404: NextPageWithLayout<Custom404Props> = () => {
   const t = useTranslations();

   return (
      <Center
         flexGrow={1}
         paddingTop="16px"
         paddingBottom="60px"
         paddingLeft="20px"
         paddingRight="20px"
      >
         <VStack>
            <Heading
               as="h2"
               fontSize={{ base: '4xl', md: '5xl' }}
               fontWeight="medium"
            >
               404
            </Heading>
            <Text fontWeight="medium" pb="3" textTransform="uppercase">
               Page not found
            </Text>
            <Flex
               bg="blue.500"
               flexDirection="column"
               textColor="white"
               padding={4}
               width="100%"
               borderRadius={4}
            >
               <UnorderedList spacing={2}>
                  <ListItem>
                     Translation inside a p tag:
                     <p style={{ color: '#4ade80' }}>{t('description')}</p>
                  </ListItem>
                  <ListItem>
                     Translation inside a chakra Text tag:
                     <Text textColor="green.400">{t('description')}</Text>
                  </ListItem>
                  <ListItem>
                     String with no matching translation:
                     <Text textColor="green.400">
                        {t('This defaults to the key/string passed in')}
                     </Text>
                  </ListItem>
                  <ListItem>
                     English string as key:
                     <Text textColor="green.400">
                        {t('This is an english string')}
                     </Text>
                  </ListItem>
                  <ListItem>
                     English string w/ period as key:
                     <Text textColor="green.400">
                        {t('Periods are not allowed in keys.')}
                     </Text>
                  </ListItem>
                  <ListItem>
                     Interpolation:
                     <Text textColor="green.400">
                        {t('Car interpolation', { color: 'red' })}
                     </Text>
                  </ListItem>
                  <ListItem>
                     Interpolation (english string as key):{' '}
                     <Text textColor="green.400">
                        {t('I have a {color} car', { color: 'red' })}
                     </Text>
                  </ListItem>
                  <ListItem>
                     Plurals (0):
                     <Text textColor="green.400">
                        {t('plural', { numMessages: '0' })}
                     </Text>
                  </ListItem>
                  <ListItem>
                     Plurals (1):
                     <Text textColor="green.400">
                        {t('plural', { numMessages: '1' })}
                     </Text>
                  </ListItem>
                  <ListItem>
                     Plurals (6):
                     <Text textColor="green.400">
                        {t('plural', { numMessages: '6' })}
                     </Text>
                  </ListItem>
                  <ListItem>
                     Plurals (0) (english key):
                     <Text textColor="red.900">
                        {t(
                           'You have {numMessages, plural, =0 {no messages} =1 {one message} other {# messages}}.',
                           { numMessages: '0' }
                        )}
                     </Text>
                  </ListItem>
                  <ListItem>
                     Plurals (0) (english key w/o period):
                     <Text textColor="green.400">
                        {t(
                           'You have {numMessages, plural, =0 {no messages} =1 {one message} other {# messages}}',
                           { numMessages: '0' }
                        )}
                     </Text>
                  </ListItem>
                  <ListItem>
                     Plurals (0) (english key w/o plural def):
                     <Text textColor="red.900">
                        {t('You have {numMessages}.', { numMessages: '0' })}
                     </Text>
                  </ListItem>
                  <ListItem>
                     Plurals (0) (english key w/o plural def + escaped):
                     <Text textColor="red.900">
                        {t("You have '{numMessages'}.", { numMessages: '0' })}
                     </Text>
                  </ListItem>
                  <ListItem>
                     Plurals (0) (english key + escaped):
                     <Text textColor="red.900">
                        {t(
                           "You have '{numMessages, plural, =0 {no messages} =1 {one message} other {# messages}'}.",
                           { numMessages: '0' }
                        )}
                     </Text>
                  </ListItem>
                  <ListItem>
                     Select (female):
                     <Text textColor="green.400">
                        {t('select', { gender: 'female' })}
                     </Text>
                  </ListItem>
                  <ListItem>
                     Select (male):
                     <Text textColor="green.400">
                        {t('select', { gender: 'male' })}
                     </Text>
                  </ListItem>
                  <ListItem>
                     Select (other):
                     <Text textColor="green.400">
                        {t('select', { gender: 'other' })}
                     </Text>
                  </ListItem>
                  <ListItem>
                     Select (female) (english key):
                     <Text textColor="red.900">
                        {t(
                           '{gender, select, female {She is} male {He is} other {They are}} online.',
                           { gender: 'female' }
                        )}
                     </Text>
                  </ListItem>
                  <ListItem>
                     Select (female) (english key w/o period):
                     <Text textColor="green.400">
                        {t(
                           '{gender, select, female {She is} male {He is} other {They are}} online',
                           { gender: 'female' }
                        )}
                     </Text>
                  </ListItem>
                  <ListItem>
                     Select (female) (english key w/o def):
                     <Text textColor="red.900">
                        {t('{gender, select} online.', { gender: 'female' })}
                     </Text>
                  </ListItem>
                  <ListItem>
                     Select (female) (english key w/o def 2):
                     <Text textColor="red.900">
                        {t('{gender} online.', { gender: 'female' })}
                     </Text>
                  </ListItem>
                  <ListItem>
                     Select Ordinal (0):
                     <Text textColor="green.400">
                        {t('selectordinal', { year: 0 })}
                     </Text>
                  </ListItem>
                  <ListItem>
                     Select Ordinal (1):
                     <Text textColor="green.400">
                        {t('selectordinal', { year: 1 })}
                     </Text>
                  </ListItem>
                  <ListItem>
                     Select Ordinal (2):
                     <Text textColor="green.400">
                        {t('selectordinal', { year: 2 })}
                     </Text>
                  </ListItem>
                  <ListItem>
                     Select Ordinal (6):
                     <Text textColor="green.400">
                        {t('selectordinal', { year: 6 })}
                     </Text>
                  </ListItem>
                  <ListItem>
                     Select Ordinal (6):
                     <Text textColor="green.400">
                        {t('selectordinal', { year: 6 })}
                     </Text>
                  </ListItem>
                  <ListItem>
                     Select Ordinal (english key):
                     <Text textColor="red.900">
                        {t(
                           "It's your {year, selectordinal, =0 {0th} =1 {1st} one {#th} other {#th}} year.",
                           { year: 6 }
                        )}
                     </Text>
                  </ListItem>
                  <ListItem>
                     Escape ( {'}'} ):
                     <Text textColor="green.400">{t('escaped')}</Text>
                  </ListItem>
                  <ListItem>
                     Escape ( {'"'} ):
                     <Text textColor="green.400">{t('escapeQuote')}</Text>
                  </ListItem>
                  <ListItem>
                     Escape ( {'"'} ):
                     <Text textColor="green.400">{t('escapeApostrophe')}</Text>
                  </ListItem>
                  <ListItem>
                     Escape ( {'}'} ) (english key escaped):
                     <Text textColor="green.400">
                        {t(
                           "Escape curly braces with single quotes (eg: '{name'})"
                        )}
                     </Text>
                  </ListItem>
                  <ListItem>
                     Escape ( {'}'} ) (english key):
                     <Text textColor="green.400">
                        {t(
                           'Escape curly braces with single quotes (eg: {name})'
                        )}
                     </Text>
                  </ListItem>
                  <ListItem>
                     Escape ( {'.'} ):
                     <Text textColor="green.400">{t('escapePeriod')}</Text>
                  </ListItem>
                  <ListItem>
                     Escape ( {'.'} ) (english key escaped):
                     <Text textColor="red.900">
                        {t('This period -> &period; is escaped')}
                     </Text>
                  </ListItem>
                  <ListItem>
                     Escape ( {'.'} ) (english key escaped):
                     <Text textColor="green.400">
                        {t('This translation has a normal &period; in it')}
                     </Text>
                  </ListItem>
                  <ListItem>
                     Rich text:
                     <Text textColor="green.400">
                        {t.rich('richText', {
                           important: (chunks) => <b>{chunks}</b>,
                           very: (chunks) => <i>{chunks}</i>,
                        })}
                     </Text>
                  </ListItem>
                  <ListItem>
                     Rich text Link:
                     <Text textColor="green.400">
                        {t.rich('richTextLink', {
                           link: (chunks) => (
                              <a
                                 href="https://youtu.be/dQw4w9WgXcQ"
                                 style={{ textDecoration: 'underline' }}
                              >
                                 {chunks}
                              </a>
                           ),
                        })}
                     </Text>
                  </ListItem>
                  <ListItem>
                     Chakra rich text Link:
                     <Text textColor="green.400">
                        {t.rich('richTextLink', {
                           link: (chunks) => (
                              <Link
                                 href="https://youtu.be/dQw4w9WgXcQ"
                                 textDecoration="underline"
                              >
                                 {chunks}
                              </Link>
                           ),
                        })}
                     </Text>
                  </ListItem>
                  <ListItem>
                     Rich text link (english key):
                     <Text textColor="green.400">
                        {t.rich('This is a <link>link</link>', {
                           link: (chunks) => (
                              <Link
                                 href="https://youtu.be/dQw4w9WgXcQ"
                                 textDecoration="underline"
                              >
                                 {chunks}
                              </Link>
                           ),
                        })}
                     </Text>
                  </ListItem>
                  <ListItem>
                     Chakra rich text + plural (0):
                     <Text textColor="green.400">
                        {t.rich('pluralRichText', {
                           numMessages: 0,
                           b: (chunks) => <b>{chunks}</b>,
                           italic: (chunks) => <i>{chunks}</i>,
                        })}
                     </Text>
                  </ListItem>
                  <ListItem>
                     Chakra rich text + plural (1):
                     <Text textColor="green.400">
                        {t.rich('pluralRichText', {
                           numMessages: 1,
                           b: (chunks) => <b>{chunks}</b>,
                           italic: (chunks) => <i>{chunks}</i>,
                        })}
                     </Text>
                  </ListItem>
                  <ListItem>
                     Chakra rich text + plural (6):
                     <Text textColor="green.400">
                        {t.rich('pluralRichText', {
                           numMessages: 6,
                           b: (chunks) => <b>{chunks}</b>,
                           italic: (chunks) => <i>{chunks}</i>,
                        })}
                     </Text>
                  </ListItem>
                  <ListItem>
                     Repeated tags Rich text:
                     <Text textColor="green.400">
                        {t.rich('repeatedRichText', {
                           bold: (chunks) => <b>{chunks}</b>,
                        })}
                     </Text>
                  </ListItem>
                  <ListItem>
                     Repeated tags Rich text (english key):
                     <Text textColor="red.900">
                        {t.rich(
                           'This is <bold>bold</bold> and <bold>bold</bold>.',
                           {
                              bold: (chunks) => <b>{chunks}</b>,
                           }
                        )}
                     </Text>
                  </ListItem>
                  <ListItem>
                     Repeated tags Rich text (english key w/o period):
                     <Text textColor="green.400">
                        {t.rich(
                           'This is <bold>bold</bold> and <bold>bold</bold>',
                           {
                              bold: (chunks) => <b>{chunks}</b>,
                           }
                        )}
                     </Text>
                  </ListItem>
                  <ListItem>
                     Bold tags Rich text (english key):
                     <Text textColor="green.400">
                        {t.rich('This is <bold>bold</bold>', {
                           bold: (chunks) => <b>{chunks}</b>,
                        })}
                     </Text>
                  </ListItem>
               </UnorderedList>
            </Flex>

            <Divider borderWidth="1px" borderColor="red.500" width="50px" />
            <Text pt="3" overflowWrap="break-word" align="center" maxW="360px">
               We can&apos;t find the page you&apos;re looking for. Whoops.
            </Text>
         </VStack>
      </Center>
   );
};

Custom404.getLayout = function getLayout(page, pageProps) {
   return <DefaultLayout {...pageProps.layoutProps}>{page}</DefaultLayout>;
};

export const getStaticProps: GetStaticProps<Custom404Props> = async (
   context
) => {
   const messages = (await import(`../messages/${context.locale}.json`))
      .default;

   return {
      props: {
         layoutProps: await getLayoutServerSideProps({
            storeCode: DEFAULT_STORE_CODE,
         }),
         // You can get the messages from anywhere you like. The recommended
         // pattern is to put them in JSON files separated by locale and read
         // the desired one based on the `locale` received from Next.js.
         messages: messages,
      },
   };
};

export default Custom404;
