import { Center, Divider, Heading, Text, VStack, Link } from '@chakra-ui/react';
import { DEFAULT_STORE_CODE } from '@config/env';
import { DefaultLayout } from '@layouts/default';
import type { WithLayoutProps } from '@layouts/default/server';
import { getLayoutServerSideProps } from '@layouts/default/server';
import { GetStaticProps } from 'next';
import i18n from 'i18next';
import { useTranslation, initReactI18next, Trans } from 'react-i18next';

import { esTranslation, frTranslation } from '@ifixit/translations';

type Custom404Props = WithLayoutProps<{}>;

export const Custom404: NextPageWithLayout<Custom404Props> = () => {
   i18n
      .use(initReactI18next) // passes i18n down to react-i18next
      .init({
         resources: {
            es: {
               translation: esTranslation,
            },
            fr: {
               translation: frTranslation,
            },
         },
         lng: 'es', // defines the current view langauge, can also be "fr" with this code example
         fallbackLng: 'en',
         interpolation: {
            escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
         },
      });

   const { t } = useTranslation();

   const userName = 'Alex';
   const count = 6;
   const text = 'Hello!';

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
            {/* t() uses: */}
            <div>
               <Text>{t('Hello!')}</Text> {/* ¡Hola! */}
               <Text>{t('welcome {{ userName }}', { userName })}</Text>{' '}
               {/* Bienvenido Alex */}
               <Text>
                  {t('There are {{ count }} items', { count: 0 })}
               </Text>{' '}
               {/* There are 0 items */}
               <Text>
                  {t('There are {{ count }} items', { count: 1 })}
               </Text>{' '}
               {/* There is 1 item */}
               <Text>
                  {t('There are {{ count }} items', { count: 3 })}
               </Text>{' '}
               {/* There are 3 items */}
               <Text>{t('Not a key')}</Text>{' '}
               {/* No matching key -> Not a key */}
            </div>

            <br />
            {/* <Trans> uses: */}
            <div>
               <Text>
                  <Trans i18nKey="Hello!">¡Hola!</Trans>
               </Text>
               <Trans i18nKey={text}>{t(text)}</Trans>
               <Text>
                  <Trans
                     i18nKey="welcome {{ userName }}"
                     values={{ userName }}
                  />
               </Text>
               <Text>
                  <Trans
                     i18nKey="There are {{ count }} items"
                     values={{ count: 0 }}
                  />
               </Text>
               <Text>
                  <Trans
                     i18nKey="There are {{ count }} items"
                     values={{ count: 1 }}
                  />
               </Text>
               <Text>
                  <Trans
                     i18nKey="There are {{ count }} items"
                     values={{ count: 3 }}
                  />
               </Text>
               <Text>
                  <Trans i18nKey="super <strong>strong</strong>"></Trans>
               </Text>{' '}
               {/* mucho <strong>strong</strong> */}
               <Text>
                  <Trans i18nKey="super <strong>strong</strong>">
                     super <strong>strong</strong>
                  </Trans>
               </Text>{' '}
               {/* mucho <strong>strong</strong> */}
               <Trans i18nKey="messagesCount" count={1}>
                  Hello <strong title={t('nameTitle')}>{{ userName }}</strong>,
                  you have {{ count }} unread message.{' '}
                  <Link
                     color="blue"
                     href="https://youtu.be/dQw4w9WgXcQ"
                     isExternal
                  >
                     Go to messages
                  </Link>
                  .
               </Trans>
               <br />
               <Trans i18nKey="messagesCount" count={count}>
                  Hello <strong title={t('nameTitle')}>{{ userName }}</strong>,
                  you have {{ count }} unread message.{' '}
                  <Link
                     color="blue"
                     href="https://youtu.be/dQw4w9WgXcQ"
                     isExternal
                  >
                     Go to messages
                  </Link>
                  .
               </Trans>
            </div>

            <Text fontWeight="medium" pb="3" textTransform="uppercase">
               Page not found
            </Text>
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

export const getStaticProps: GetStaticProps<Custom404Props> = async () => {
   return {
      props: {
         layoutProps: await getLayoutServerSideProps({
            storeCode: DEFAULT_STORE_CODE,
         }),
      },
   };
};

export default Custom404;
