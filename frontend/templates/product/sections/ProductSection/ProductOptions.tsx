import {
   Box,
   HStack,
   Image,
   Img,
   Select,
   SimpleGrid,
   Text,
   VStack,
} from '@chakra-ui/react';
import type { Product } from '@models/product';
import * as React from 'react';

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
                     </Text>
                  </HStack>
                  {selectorType === SelectorType.SINGLE && (
                     <Box
                        bg="white"
                        borderWidth={1}
                        borderColor="gray.200"
                        borderRadius="md"
                        px="4"
                        py="1.5"
                     >
                        {option.values[0]}
                     </Box>
                  )}
                  {selectorType === SelectorType.SELECT && (
                     <Select
                        bg="white"
                        value={selected}
                        onChange={(event) => {
                           onChange(event.target.value);
                        }}
                     >
                        {option.values.map((value) => {
                           const variant = findVariant(product.variants, {
                              ...selectedOptions,
                              [option.name]: value,
                           });
                           return (
                              <option
                                 value={variant?.id}
                                 key={value}
                                 disabled={variant == null}
                              >
                                 {value}
                              </option>
                           );
                        })}
                     </Select>
                  )}
                  {selectorType === SelectorType.IMAGE_RADIO && (
                     <SimpleGrid columns={2} spacing="2">
                        {option.values.map((value) => {
                           const variant = findVariant(product.variants, {
                              ...selectedOptions,
                              [option.name]: value,
                           });
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

type Variant = Product['variants'][0];

type Option = Product['options'][0];

function findVariant(
   variants: Variant[],
   selectedOptions: Record<string, string>
) {
   return variants.find((variant) => {
      return variant.selectedOptions.every((option) => {
         return selectedOptions[option.name] === option.value;
      });
   });
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
         px={image == null ? 2 : 2.5}
         py={image == null ? 1.5 : 2.5}
         cursor="pointer"
         textAlign="center"
         onClick={onClick}
      >
         {image && <ProductOptionImage image={image} />}
         <Text fontSize="13px" color="gray.800">
            {label}
         </Text>
      </Box>
   );
}

type ProductOptionImageProps = {
   image: Image;
};

function ProductOptionImage({ image }: ProductOptionImageProps) {
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
