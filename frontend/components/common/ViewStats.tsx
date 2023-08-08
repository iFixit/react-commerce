import React from 'react';
import { Flex, PropsOf, Text, chakra, useToken } from '@chakra-ui/react';

export type ViewStatsProps = {
   today: number;
   week: number;
   month: number;
   all: number;
};

export function ViewStats({ today, week, month, all }: ViewStatsProps) {
   const spacing5 = useToken('space', 5);
   return (
      <Flex
         width="100%"
         justifyContent="center"
         alignItems={{ base: 'stretch', sm: 'center' }}
         alignSelf={{ base: 'center', sm: 'stretch' }}
         maxWidth={{ base: `calc(100% - ${spacing5})`, sm: 'initial' }}
         borderTop="1px solid"
         borderColor="coolGray.200"
         paddingTop={2}
         paddingBottom={2}
         flexDirection={{ base: 'column', sm: 'row' }}
         flexWrap={{ base: 'wrap' }}
      >
         <Flex
            marginRight={7}
            alignItems="center"
            flexBasis={{ base: '100%', lg: 'auto' }}
            justifyContent={{ base: 'center', lg: 'flex-start' }}
         >
            <StatsIcon
               width={5}
               height={5}
               color="coolGray.300"
               marginRight={1.5}
            />
            <Text color="coolGray.600" fontSize="sm" fontWeight="semibold">
               View statistics:
            </Text>
         </Flex>
         <ViewStatSection
            text="Past 24 Hours:"
            stat={localizeAndFormat(today)}
         />
         <ViewStatSection text="Past 7 Days:" stat={localizeAndFormat(week)} />
         <ViewStatSection
            text="Past 30 Days:"
            stat={localizeAndFormat(month)}
         />
         <ViewStatSection text="All Time:" stat={localizeAndFormat(all)} />
      </Flex>
   );
}

function localizeAndFormat(
   num: number,
   options: Intl.NumberFormatOptions = {}
): string {
   return Intl.NumberFormat(undefined, options).format(num);
}
const ChakraSVG = chakra('svg');

function StatsIcon(props: PropsOf<typeof ChakraSVG>) {
   return (
      <ChakraSVG
         width="20"
         height="20"
         viewBox="0 0 20 20"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
         {...props}
      >
         <path
            d="M16.625 2.78125C17.0312 2.4375 17.125 1.8125 16.7812 1.375C16.4375 0.96875 15.7812 0.875 15.375 1.21875L10.9688 4.75L7.59375 2.21875C7.21875 1.9375 6.71875 1.9375 6.375 2.21875L1.375 6.21875C0.9375 6.5625 0.875 7.21875 1.21875 7.625C1.5625 8.0625 2.1875 8.125 2.625 7.78125L7 4.28125L10.375 6.8125C10.75 7.09375 11.25 7.09375 11.625 6.78125L16.625 2.78125ZM6 8V14C6 14.5625 6.4375 15 7 15C7.53125 15 8 14.5625 8 14V8C8 7.46875 7.53125 7 7 7C6.4375 7 6 7.46875 6 8ZM2 11V14C2 14.5625 2.4375 15 3 15C3.53125 15 4 14.5625 4 14V11C4 10.4688 3.53125 10 3 10C2.4375 10 2 10.4688 2 11ZM11 9C10.4375 9 10 9.46875 10 10V14C10 14.5625 10.4375 15 11 15C11.5312 15 12 14.5625 12 14V10C12 9.46875 11.5312 9 11 9ZM14 8V14C14 14.5625 14.4375 15 15 15C15.5312 15 16 14.5625 16 14V8C16 7.46875 15.5312 7 15 7C14.4375 7 14 7.46875 14 8Z"
            fill="currentColor"
         />
      </ChakraSVG>
   );
}

function ViewStatSection({ text, stat }: { text: string; stat: string }) {
   return (
      <Flex
         direction={{ base: 'column', md: 'row' }}
         borderRight={{ base: 'none', sm: '1px solid' }}
         borderColor={{ base: 'initial', sm: 'coolGray.200' }}
         paddingTop={1.5}
         paddingBottom={1.5}
         paddingLeft={7}
         paddingRight={7}
         flexWrap={{ base: 'nowrap', sm: 'wrap', md: 'nowrap' }}
         _last={{ borderRight: 'none' }}
         alignItems="center"
         flexDirection={{ base: 'row', sm: 'column', md: 'row' }}
         flexShrink={0}
      >
         <Text
            color="coolGray.600"
            fontSize="xs"
            fontWeight="normal"
            marginRight={{ base: 3, sm: 0, md: 3 }}
            flexGrow={1}
            flexShrink={0}
         >
            {text}
         </Text>
         <Text
            color="coolGray.600"
            fontSize="sm"
            fontWeight="semibold"
            marginRight={3}
         >
            {stat}
         </Text>
      </Flex>
   );
}
