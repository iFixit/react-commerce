import { Center, Box, Text, Button, Container, Flex } from '@chakra-ui/react';
import { DEFAULT_STORE_CODE } from '@config/env';
import { DefaultLayout, DefaultLayoutProps } from '@layouts/default';
import { getGlobalSettings } from '@models/global-settings';
import { getStoreByCode, getStoreList } from '@models/store';

export default function Custom404({ currentStore, stores, globalSettings }: DefaultLayoutProps) {
   return <DefaultLayout {...{currentStore, stores, globalSettings}}> {
         <Center h='56.6vh'>
            <Text fontSize={20} fontWeight='bold' fontFamily='Lato' padding='16px'>Error 404: Page not Found</Text>
         </Center>
      }
   </DefaultLayout>
}

export async function getStaticProps() {
   const [globalSettings, stores, currentStore] = await Promise.all([
      getGlobalSettings(),
      getStoreList(),
      getStoreByCode(DEFAULT_STORE_CODE),
   ]);
   return {
      props: {
         globalSettings,
         currentStore,
         stores,
      }
   };
}