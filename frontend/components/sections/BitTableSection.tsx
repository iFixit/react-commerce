import { Box, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import { ResponsiveImage, Wrapper } from '@ifixit/ui';
import type { ScrewdriverBit } from '@models/components/screwdriver-bit';
import { groupBy, mapValues, uniq } from 'lodash';
import { SectionDescription } from './SectionDescription';
import { SectionHeaderWrapper } from './SectionHeaderWrapper';
import { SectionHeading } from './SectionHeading';

export interface BitTableSectionProps {
   id: string;
   title?: string | null;
   description?: string | null;
   bits: ScrewdriverBit[];
}

interface GroupedBit {
   type: Omit<ScrewdriverBit['type'], 'driverSize'>;
   sizes: Record<ScrewdriverBit['type']['driverSize'], string[]>;
   bitCount: number;
}

export function BitTableSection({
   id,
   title,
   description,
   bits,
}: BitTableSectionProps) {
   const groupedBits = groupScrewdriverBits(bits);
   const driverSizeColors = getDriverSizeColors(bits);

   return (
      <Box id={id} as="section" py="16" fontSize="sm">
         <Wrapper>
            {title && (
               <SectionHeaderWrapper
                  textAlign="center"
                  mb={{
                     base: 6,
                     md: 12,
                  }}
               >
                  <SectionHeading>{title}</SectionHeading>
                  {description && (
                     <SectionDescription mt="4" richText={description} />
                  )}
               </SectionHeaderWrapper>
            )}
            <Grid
               templateColumns={{
                  base: 'repeat(1, 1fr)',
                  md: 'repeat(2, 1fr)',
               }}
               gap={3}
            >
               {groupedBits.map((groupedBit: GroupedBit) => (
                  <GridItem key={groupedBit.type.id}>
                     <Bit
                        groupedBit={groupedBit}
                        driverSizeColors={driverSizeColors}
                     />
                  </GridItem>
               ))}
            </Grid>
         </Wrapper>
      </Box>
   );
}

function Bit({
   groupedBit,
   driverSizeColors,
}: {
   groupedBit: GroupedBit;
   driverSizeColors: Record<string, string>;
}) {
   const { type, sizes, bitCount } = groupedBit;
   return (
      <Flex
         borderColor="gray.200"
         borderWidth={1}
         borderRadius="base"
         bg="white"
         w="full"
         h="full"
         minH="12"
      >
         <Flex
            minW="12"
            p="3"
            gap="2.5"
            flexShrink={0}
            borderRightColor="gray.200"
            borderRightWidth={1}
            alignItems="center"
            justifyContent="center"
         >
            <ResponsiveImage
               src={type.icon?.url ?? ''}
               alt={type.icon?.altText ?? ''}
               style={{ objectFit: 'contain' }}
               width={20}
               height={20}
            />
            <Flex flexDirection="column" gap="1">
               {Object.keys(sizes).map((driverSize) => (
                  <Flex
                     key={driverSize}
                     px="1"
                     h="4"
                     bg={`${driverSizeColors[driverSize]}.100`}
                     borderRadius="full"
                     borderColor={`${driverSizeColors[driverSize]}.200`}
                     borderWidth={1}
                     alignItems="center"
                     justify="center"
                     minW="10"
                  >
                     <Text
                        as="span"
                        color={`${driverSizeColors[driverSize]}.700`}
                        fontSize="xs"
                        fontFamily="mono"
                     >
                        {driverSize}
                     </Text>
                  </Flex>
               ))}
            </Flex>
         </Flex>
         <Flex flexGrow={1} alignItems="center" gap="3" p="3">
            <Flex gap="1">
               {bitCount && (
                  <>
                     <Text flexGrow={1}>{bitCount}</Text>
                     <Text color="gray.400">×</Text>
                  </>
               )}
               <Text>{type.name}</Text>
            </Flex>

            <Flex flexGrow="1" flexDirection="column" gap={1}>
               {Object.entries(sizes).map(([driverSize, sizesForDriver]) => {
                  return sizesForDriver.length > 0 ? (
                     <Flex
                        key={driverSize}
                        flexWrap="wrap"
                        gap={1}
                        justifyContent="flex-end"
                     >
                        {sizesForDriver.map((size) => (
                           <Flex
                              key={size}
                              px="1.5"
                              h="4"
                              gap="1"
                              bg="gray.100"
                              borderRadius="full"
                              borderColor="gray.200"
                              borderWidth={1}
                              alignItems="center"
                              justify="center"
                              minW="9"
                           >
                              <Text
                                 as="span"
                                 color="gray.800"
                                 fontSize="xs"
                                 fontFamily="mono"
                              >
                                 {size}
                              </Text>
                              <Box
                                 w="1.5"
                                 h="1.5"
                                 bg={`${driverSizeColors[driverSize]}.500`}
                                 borderRadius="full"
                              ></Box>
                           </Flex>
                        ))}
                     </Flex>
                  ) : null;
               })}
            </Flex>
         </Flex>
      </Flex>
   );
}

const groupScrewdriverBits = (bits: ScrewdriverBit[]): GroupedBit[] => {
   const groups = Object.values(groupBy(bits, (bit) => bit.type.name));
   return groups.map((group) => {
      const sizes: Record<string, string[]> = mapValues(
         groupBy(group, (bit) => bit.type.driverSize),
         (bits) => bits.map((bit) => bit.size).filter(isNotNull)
      );
      return {
         type: {
            id: group[0].type.id,
            name: group[0].type.name,
            icon: group[0].type.icon,
         },
         sizes: sizes,
         bitCount: group.length,
      };
   });
};

const predefinedColors = ['amber', 'violet', 'green'] as const;

const getDriverSizeColors = (
   bits: ScrewdriverBit[]
): Record<string, typeof predefinedColors[number] | 'brand'> => {
   const driverSizes = uniq(bits.map((bit) => bit.type.driverSize));
   return Object.fromEntries(
      driverSizes.map((size, i) => [size, predefinedColors[i] ?? 'brand'])
   );
};

function isNotNull<T>(value: T | null): value is T {
   return value !== null;
}
