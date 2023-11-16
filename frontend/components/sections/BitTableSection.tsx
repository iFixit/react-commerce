import { Box, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import { ResponsiveImage, Wrapper } from '@ifixit/ui';
import type { ScrewdriverBit } from '@models/components/screwdriver-bit';
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
   totalBitCount: number;
}

export function BitTableSection({
   id,
   title,
   description,
   bits,
}: BitTableSectionProps) {
   const { groupedBits, driverSizeColors } = groupScrewdriverBits(bits);

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
   const { type, sizes, totalBitCount } = groupedBit;
   return (
      <Flex
         display="inline-flex"
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
               {totalBitCount > 0 && (
                  <>
                     <Text flexGrow={1}>{totalBitCount}</Text>
                     <Text color="gray.400">×</Text>
                  </>
               )}
               <Text>{type.name}</Text>
            </Flex>

            <Flex flexGrow="1" flexDirection="column" gap={1}>
               {Object.keys(sizes).map((driverSize) => {
                  const sizesForDriver = sizes[driverSize];
                  return (
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
                  );
               })}
            </Flex>
         </Flex>
      </Flex>
   );
}

const groupScrewdriverBits = (
   bits: ScrewdriverBit[]
): {
   groupedBits: GroupedBit[];
   driverSizeColors: Record<string, string>;
} => {
   let colorIndex = 0;
   const driverSizeColors: Record<string, string> = {};
   const predefinedColors = ['amber', 'violet', 'green'];
   const grouped: Record<string, GroupedBit> = {};

   bits.forEach((bit) => {
      const { type, size } = bit;

      if (!driverSizeColors[type.driverSize]) {
         driverSizeColors[type.driverSize] =
            colorIndex < predefinedColors.length
               ? predefinedColors[colorIndex++]
               : 'brand';
      }

      let groupItem = grouped[type.name];

      if (!groupItem) {
         groupItem = {
            type: {
               id: type.id,
               icon: type.icon,
               name: type.name,
            },
            sizes: {},
            totalBitCount: 0,
         };

         grouped[type.name] = groupItem;
      }

      if (!groupItem.sizes[type.driverSize]) {
         groupItem.sizes[type.driverSize] = size ? [size] : [];
         groupItem.totalBitCount = size ? 1 : 0;
      } else if (size != null) {
         groupItem.sizes[type.driverSize].push(size);
         groupItem.totalBitCount++;
      }
   });

   return {
      groupedBits: Object.values(grouped).sort((a, b) => {
         const aBitCount = Object.keys(a.sizes).reduce(
            (acc, driverSize) => acc + a.sizes[driverSize].length,
            0
         );
         const bBitCount = Object.keys(b.sizes).reduce(
            (acc, driverSize) => acc + b.sizes[driverSize].length,
            0
         );
         return aBitCount === 0 ? 1 : bBitCount === 0 ? -1 : 0;
      }),
      driverSizeColors,
   };
};
