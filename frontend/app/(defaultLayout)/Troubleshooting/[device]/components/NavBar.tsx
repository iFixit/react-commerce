import { Box, Flex } from '@chakra-ui/react';
import { BreadCrumbs } from '@ifixit/breadcrumbs';
import type {
   BreadcrumbEntry,
   DeviceUrls,
} from '../hooks/useTroubleshootingProblemsProps';
import { NavTabs } from '@components/common/NavTabs';

export function NavBar({
   deviceUrls,
   breadcrumbs,
}: {
   editUrl: string;
   historyUrl: string;
   deviceUrls: DeviceUrls;
   breadcrumbs: BreadcrumbEntry[];
}) {
   const bc = breadcrumbs.map((breadcrumb) => ({
      label: breadcrumb.title,
      url: breadcrumb.url,
   }));
   const padding = { base: 4, sm: 8 };
   const breadcrumbMinHeight = '48px';
   const { devicePartsUrl, deviceGuideUrl } = deviceUrls;

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
            maxWidth="1280px"
            mx="auto"
            px={{ sm: 4, md: 8 }}
            width="100%"
            flexDirection={{ base: 'column-reverse', sm: 'row' }}
            justify="stretch"
         >
            <BreadCrumbs
               breadCrumbs={bc}
               paddingInlineStart={{ base: 4, sm: 0 }}
               paddingInlineEnd={padding}
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
                     tabs={[
                        {
                           name: 'Parts',
                           url: devicePartsUrl,
                        },
                        {
                           name: 'Guides',
                           url: deviceGuideUrl,
                        },
                        {
                           name: 'Troubleshooting',
                           isCurrentPage: true,
                        },
                     ]}
                  />
               </Box>
            </Flex>
         </Flex>
      </Flex>
   );
}
