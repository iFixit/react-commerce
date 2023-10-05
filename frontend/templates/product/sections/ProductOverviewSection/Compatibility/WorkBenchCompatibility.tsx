import { Flex, HStack, Text, TextProps, chakra } from '@chakra-ui/react';
import { SVGProps } from 'react';

export type WorkbenchCompatibilityProps = {
   status: 'unknown' | 'compatible' | 'incompatible' | 'mightFit';
};

export function WorkbenchCompatibility({
   status,
}: WorkbenchCompatibilityProps) {
   return (
      <Flex
         padding={4}
         border="1px solid"
         borderRadius="md"
         borderColor="gray.300"
         alignItems="center"
      >
         <CompatibilityMessage status={status} />
      </Flex>
   );
}

function CompatibilityMessage({
   status,
}: {
   status: WorkbenchCompatibilityProps['status'];
}) {
   const color = getColor(status);
   return (
      <HStack align="center">
         <WorkbenchIcon color={color} />
         <CompatibilityText
            status={status}
            textProps={{
               color: color,
               fontSize: 'md',
            }}
            subTextProps={{
               color: 'brand.500',
               fontSize: 'md',
            }}
         />
      </HStack>
   );
}

function getColor(status: WorkbenchCompatibilityProps['status']) {
   switch (true) {
      case status === 'compatible':
         return 'green.500';
      case status === 'incompatible':
         return 'red.500';
      case status === 'mightFit':
         return 'orange.500';
      default:
      case status === 'unknown':
         return 'gray.900';
   }
}

function CompatibilityText({
   status,
   textProps,
   subTextProps,
}: {
   status: WorkbenchCompatibilityProps['status'];
   textProps: TextProps;
   subTextProps: TextProps;
}) {
   switch (true) {
      case status === 'compatible':
         return <Text {...textProps}>This part fits your device</Text>;
      case status === 'incompatible':
         return <Text {...textProps}>This part does not fit your device</Text>;
      case status === 'mightFit':
         return <Text {...textProps}>This part might fit your device</Text>;
      default:
      case status === 'unknown':
         return (
            <Flex flexDirection="column">
               <Text {...textProps}>Does it compatible with your device?</Text>
               <Text {...subTextProps}>Add device to your workbench</Text>
            </Flex>
         );
   }
}

export const WorkbenchIcon = chakra(WorkbenchSVG);

function WorkbenchSVG(props: SVGProps<SVGSVGElement>) {
   return (
      <svg
         width="22"
         height="22"
         viewBox="0 0 22 22"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
         {...props}
      >
         <rect x="1" y="1" width="8" height="8" rx="2" fill="currentColor" />
         <rect x="12" y="1" width="8" height="8" rx="2" fill="currentColor" />
         <rect x="1" y="12" width="8" height="8" rx="2" fill="currentColor" />
         <rect x="12" y="12" width="8" height="8" rx="2" fill="currentColor" />
      </svg>
   );
}
