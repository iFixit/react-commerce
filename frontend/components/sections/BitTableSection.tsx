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
   type: ScrewdriverBit['type'];
   driverSizeColor: string;
   sizes: string[];
}

export function BitTableSection({
   id,
   title,
   description,
   bits,
}: BitTableSectionProps) {
   let currentColorIndex = 0;
   const driverSizeColors: Record<string, string> = {};
   const predefinedColors = ['amber', 'violet', 'green'];

   const groupedBits = bits
      .reduce((acc, bit) => {
         const existElem = acc.find((elem) => elem.type.id === bit.type.id);

         if (existElem && bit.size) {
            existElem.sizes.push(bit.size);
         } else if (bit.size) {
            if (!driverSizeColors[bit.type.driverSize]) {
               driverSizeColors[bit.type.driverSize] =
                  predefinedColors[currentColorIndex++] ?? 'brand';
            }

            acc.push({
               type: bit.type,
               sizes: [bit.size],
               driverSizeColor: driverSizeColors[bit.type.driverSize],
            });
         }
         return acc;
      }, [] as GroupedBit[])
      .sort((a, b) => a.type.driverSize.localeCompare(b.type.driverSize));

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
               {groupedBits.map((bit: GroupedBit) => (
                  <GridItem key={bit.type.id}>
                     <Bit {...bit} />
                  </GridItem>
               ))}
            </Grid>
         </Wrapper>
      </Box>
   );
}

function Bit({ type, driverSizeColor, sizes }: GroupedBit) {
   return (
      <Flex
         borderColor="gray.200"
         borderWidth={1}
         borderRadius="base"
         bg="white"
         minH="12"
      >
         <Flex
            minW="12"
            px="3"
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
            <Flex
               px="1"
               h="4"
               bg={`${driverSizeColor}.100`}
               borderRadius="full"
               borderColor={`${driverSizeColor}.200`}
               borderWidth={1}
               alignItems="center"
               justify="center"
               minW="10"
            >
               <Text
                  as="span"
                  color={`${driverSizeColor}.700`}
                  fontSize="xs"
                  fontFamily="mono"
               >
                  {type.driverSize}
               </Text>
            </Flex>
         </Flex>
         <Flex flexGrow={1} alignItems="center" gap="2.5" m="2.5">
            <Text flexGrow={1}>{type.name}</Text>
            <Flex flexWrap="wrap" gap={1} justifyContent="flex-end">
               {sizes.map((size) => (
                  <Flex
                     key={size}
                     px="1.5"
                     h="4"
                     bg="brand.100"
                     borderRadius="full"
                     borderColor="brand.200"
                     borderWidth={1}
                     alignItems="center"
                     justify="center"
                     minW="9"
                  >
                     <Text
                        as="span"
                        color="brand.700"
                        fontSize="xs"
                        fontFamily="mono"
                     >
                        {size}
                     </Text>
                  </Flex>
               ))}
            </Flex>
         </Flex>
      </Flex>
   );
}
