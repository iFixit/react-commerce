import { Box, Flex, HStack, Text, chakra } from '@chakra-ui/react';
import { WorkbenchCompatibilityProvider } from '@templates/product/hooks/useWorkbenchCompatibility';
import { SVGProps } from 'react';

export type WorkbenchCompatibilityProps = {
   status: 'unknown' | 'compatible' | 'incompatible' | 'mightFit';
};

export function WorkbenchCompatibilityAll({
   productid,
}: {
   productid: string;
}) {
   return (
      <WorkbenchCompatibilityProvider productid={productid}>
         <Flex flexDirection="column" gap={4}>
            <WorkbenchCompatibility status="unknown" />
            <WorkbenchCompatibility status="compatible" />
            <WorkbenchCompatibility status="incompatible" />
            <WorkbenchCompatibility status="mightFit" />
         </Flex>
      </WorkbenchCompatibilityProvider>
   );
}

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
         <Compatibility status={status} />
      </Flex>
   );
}

function CompatibleText({ device }: Device) {
   return (
      <HStack align="center">
         <WorkbenchIcon color="green.500" />
         <Text color="green.500" fontSize="md">
            This part fits your device
         </Text>
      </HStack>
   );
}

function IncompatibleText() {
   return (
      <HStack align="center">
         <WorkbenchIcon color="red.500" />
         <Text color="red.500" fontSize="md">
            This part does not fit your device
         </Text>
      </HStack>
   );
}

function MightFitText() {
   return (
      <HStack align="center">
         <WorkbenchIcon color="orange.500" />
         <Flex flexDirection="column">
            <Text color="orange.500" fontSize="md">
               This part might fit your device
            </Text>
            <Text color="orange.500" fontSize="md">
               We need a little more information on{' '}
               <Text as="span" fontWeight="bold">
                  1
               </Text>{' '}
               of your devices
            </Text>
         </Flex>
      </HStack>
   );
}

function UnknownText() {
   return (
      <HStack align="center">
         <WorkbenchIcon color="gray.900" />
         <Flex flexDirection="column">
            <Text color="gray.900" fontSize="md">
               Does it compatible with your device?
            </Text>
            <Text color="brand.500" fontSize="md">
               Add device to your workbench
            </Text>
         </Flex>
      </HStack>
   );
}

function Compatibility({
   status,
}: {
   status: WorkbenchCompatibilityProps['status'];
}) {
   switch (true) {
      case status === 'compatible':
         return <CompatibleText />;
      case status === 'incompatible':
         return <IncompatibleText />;
      case status === 'mightFit':
         return <MightFitText />;
      default:
      case status === 'unknown':
         return <UnknownText />;
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
