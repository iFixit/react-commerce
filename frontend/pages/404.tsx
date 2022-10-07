import { Box, Center, Text, Divider } from '@chakra-ui/react';
import {
   DefaultLayout,
   DefaultLayoutProps,
   getLayoutServerSideProps,
} from '@layouts/default';

export default function Custom404(layoutProps: DefaultLayoutProps) {
   return (
      <DefaultLayout {...layoutProps}>
         {
            <Box>
               <Center h="60vh" flexDirection="column">
                  <Text fontSize={36} fontWeight="bold" fontFamily="Lato">
                     404
                  </Text>
                  <Text
                     fontSize={24}
                     fontWeight="semibold"
                     fontFamily="Lato"
                     paddingBottom="24px"
                  >
                     Page not Found
                  </Text>
                  <Divider
                     borderWidth="1px"
                     borderColor="#ef4444"
                     width="50px"
                  />
                  <Text
                     fontSize={20}
                     fontFamily="Lato"
                     paddingTop="24px"
                     overflowWrap="break-word"
                     align="center"
                     maxW="360px"
                  >
                     We can't find the page you're looking for. Whoops.
                  </Text>
               </Center>
            </Box>
         }
      </DefaultLayout>
   );
}

export async function getStaticProps() {
   return {
      props: await getLayoutServerSideProps(),
   };
}
