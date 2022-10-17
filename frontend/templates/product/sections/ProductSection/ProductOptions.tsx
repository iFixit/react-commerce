import {
   Box,
   Circle,
   Flex,
   HStack,
   Image,
   Img,
   Select,
   SimpleGrid,
   Text,
   VStack,
} from '@chakra-ui/react';
import { faImageSlash } from '@fortawesome/pro-duotone-svg-icons';
import type { Product } from '@models/product';
import * as React from 'react';
import { FaIcon } from '@ifixit/icons';
import { invariant } from '@ifixit/helpers';

export type ProductOptionsProps = {
   product: Product;
   selected: string;
   onChange: (variantId: string) => void;
};

export function ProductOptions({
   product,
   selected,
   onChange,
}: ProductOptionsProps) {
   const selectedVariant = React.useMemo(() => {
      return product.variants.find((variant) => variant.id === selected)!;
   }, [product.variants, selected]);

   const selectedOptions = React.useMemo(() => {
      return selectedVariant.selectedOptions.reduce((acc, option) => {
         acc[option.name] = option.value;
         return acc;
      }, {} as Record<string, string>);
   }, [selectedVariant]);

   return (
      <VStack align="stretch" mt="6">
         {product.options.map((option) => {
            const selectorType = getSelectorType(option);
            return (
               <VStack align="stretch" key={option.id}>
                  <HStack>
                     <Text fontWeight="bold" color="gray.800">
                        {option.name}
                        {selectorType === SelectorType.SINGLE &&
                           `: ${option.values[0]}`}
                     </Text>
                  </HStack>
                  {selectorType === SelectorType.SELECT && (
                     <Select
                        bg="white"
                        value={selected}
                        onChange={(event) => {
                           onChange(event.target.value);
                        }}
                     >
                        {option.values.map((value) => {
                           const variant = findVariant(
                              product,
                              selectedOptions,
                              { [option.name]: value }
                           );
                           return (
                              <option value={variant?.id} key={value}>
                                 {value}
                              </option>
                           );
                        })}
                     </Select>
                  )}
                  {selectorType === SelectorType.IMAGE_RADIO && (
                     <SimpleGrid columns={2} spacing="2">
                        {option.values.map((value) => {
                           const variant = findVariant(
                              product,
                              selectedOptions,
                              { [option.name]: value }
                           );
                           return (
                              <ProductOptionValue
                                 key={value}
                                 isActive={variant?.id === selected}
                                 label={value}
                                 image={variant?.image}
                                 onClick={() => {
                                    if (variant) {
                                       onChange(variant.id);
                                    }
                                 }}
                              />
                           );
                        })}
                     </SimpleGrid>
                  )}
               </VStack>
            );
         })}
      </VStack>
   );
}

enum SelectorType {
   SINGLE,
   SELECT,
   RADIO,
   IMAGE_RADIO,
}

type Option = Product['options'][0];

function findVariant(
   product: Product,
   previousOptions: Record<string, string>,
   optionsUpdate: Record<string, string>
) {
   const { variants, options } = product;
   const newOptions = { ...previousOptions, ...optionsUpdate };

   const exactMatch = variants.find((variant) => {
      return variant.selectedOptions.every((option) => {
         return newOptions[option.name] === option.value;
      });
   });

   if (exactMatch) {
      return exactMatch;
   }

   const productOptionsNames = options.map((option) => option.name);
   const optionsUpdateNames = Object.keys(optionsUpdate);

   const variantsMatchingUpdate = variants.filter((variant) => {
      return optionsUpdateNames.every((name) => {
         const correspondingVariantOption = variant.selectedOptions.find(
            (option) => option.name === name
         );
         return correspondingVariantOption?.value === optionsUpdate[name];
      });
   });

   const scoredVariantsMatchingUpdate = variantsMatchingUpdate
      .map((variant) => {
         let distance = 0;
         for (let i = 0; i < productOptionsNames.length; i++) {
            const name = productOptionsNames[i];
            const variantOption = variant.selectedOptions.find(
               (option) => option.name === name
            );
            if (
               !optionsUpdateNames.includes(name) &&
               previousOptions[name] !== variantOption?.value
            ) {
               distance += 3 - i;
            }
         }
         return { variant, distance };
      })
      .sort((a, b) => a.distance - b.distance)
      .map((update) => update.variant);

   const bestMatch = scoredVariantsMatchingUpdate.shift();
   return bestMatch;
}

function getSelectorType(option: Option): SelectorType {
   if (option.values.length === 1) {
      return SelectorType.SINGLE;
   }
   // @TODO: The array should be filled with the options that require this kind of selector.
   if ([''].includes(option.name)) {
      return SelectorType.RADIO;
   }
   if (['Part or Kit'].includes(option.name)) {
      return SelectorType.IMAGE_RADIO;
   }
   return SelectorType.SELECT;
}

type ProductOptionProps = {
   label: string;
   image?: Image | null;
   isActive?: boolean;
   onClick?: () => void;
};

type Image = {
   id?: string | null;
   url: string;
   altText?: string | null;
   width?: number | null;
   height?: number | null;
};

function ProductOptionValue({
   label,
   image,
   isActive,
   onClick,
}: ProductOptionProps) {
   return (
      <Box
         bg="white"
         borderWidth={isActive ? 2 : 1}
         borderColor={isActive ? 'brand.500' : 'gray.200'}
         borderRadius="md"
         px={2.5}
         py={2.5}
         cursor="pointer"
         textAlign="center"
         onClick={onClick}
      >
         <ProductOptionImage image={image} />
         <Text fontSize="13px" color="gray.800">
            {label}
         </Text>
      </Box>
   );
}

type ProductOptionImageProps = {
   image?: Image | null;
};

function ProductOptionImage({ image }: ProductOptionImageProps) {
   if (!image) {
      return (
         <Flex h="16" alignItems="center" justifyContent="center" mb="1">
            <Circle bgColor="gray.200" size="14">
               <FaIcon
                  icon={faImageSlash}
                  h="6"
                  color="gray.400"
                  transition="color 300ms"
               />
            </Circle>
         </Flex>
      );
   }
   const ratio =
      image.width != null && image.height != null
         ? image.width / image.height
         : null;

   if (ratio == null) {
      return (
         <Img
            h="16"
            src={image.url}
            alt={image.altText ?? ''}
            objectFit="contain"
         />
      );
   }
   return (
      <Box h="16" position="relative" overflow="hidden" mb="1">
         <Img
            w="auto"
            maxH="full"
            maxW="full"
            mx="auto"
            src={image.url}
            alt={image.altText ?? ''}
            objectFit="contain"
         />
      </Box>
   );
}
