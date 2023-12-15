import {
   Box,
   BoxProps,
   Circle,
   Flex,
   HStack,
   Image,
   Select,
   SimpleGrid,
   Text,
   useTheme,
   VStack,
} from '@chakra-ui/react';
import { faImageSlash } from '@fortawesome/pro-duotone-svg-icons';
import { FaIcon } from '@ifixit/icons';
import { ResponsiveImage } from '@ifixit/ui';
import type { Product } from '@pages/api/nextjs/cache/product';
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
   ...otherProps
}: ProductOptionsProps) {
   const theme = useTheme();
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
                     <Text fontWeight="medium" color="gray.800">
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
                        borderRadius="base"
                        {...otherProps}
                     >
                        {option.values.map((value) => {
                           const { exact, variant } = findVariant(
                              product,
                              selectedOptions,
                              { name: option.name, value }
                           );
                           return (
                              <option
                                 value={variant?.id}
                                 key={value}
                                 style={
                                    exact
                                       ? undefined
                                       : { color: theme.colors.gray[400] }
                                 }
                              >
                                 {value}
                              </option>
                           );
                        })}
                     </Select>
                  )}
                  {selectorType === SelectorType.IMAGE_RADIO && (
                     <SimpleGrid columns={2} spacing="2" {...otherProps}>
                        {option.values.map((value) => {
                           const { exact, variant } = findVariant(
                              product,
                              selectedOptions,
                              { name: option.name, value }
                           );
                           const variantSpecificImage =
                              variant?.image?.variantId === variant?.id
                                 ? variant?.image
                                 : undefined;
                           return (
                              <ProductOptionValue
                                 key={value}
                                 isActive={variant?.id === selected}
                                 label={value}
                                 aria-label={`Select ${value}`}
                                 role="radio"
                                 image={variantSpecificImage}
                                 exactMatch={exact}
                                 onClick={() => {
                                    if (variant) {
                                       onChange(variant.id);
                                    }
                                 }}
                                 data-testid={variant?.sku}
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
type OptionValue = { name: string; value: string };

function findVariant(
   product: Product,
   previousOptions: Record<string, string>,
   optionUpdate: OptionValue
) {
   const { variants, options } = product;
   const newOptions = {
      ...previousOptions,
      [optionUpdate.name]: optionUpdate.value,
   };

   const exactMatch = variants.find((variant) => {
      return variant.selectedOptions.every((option) => {
         return newOptions[option.name] === option.value;
      });
   });

   if (exactMatch) {
      return { exact: true, variant: exactMatch };
   }

   const productOptionsNames = options.map((option) => option.name);

   const variantsMatchingUpdate = variants.filter((variant) => {
      const matchingOption = variant.selectedOptions.find(
         (option) => option.name === optionUpdate.name
      );
      return optionUpdate.value === matchingOption?.value;
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
               optionUpdate.name !== name &&
               previousOptions[name] !== variantOption?.value
            ) {
               distance += productOptionsNames.length - i;
            }
         }
         return { variant, distance };
      })
      .sort((a, b) => a.distance - b.distance)
      .map((update) => update.variant);

   const bestMatch = scoredVariantsMatchingUpdate.shift();
   return { exact: false, variant: bestMatch };
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
   exactMatch?: boolean;
   onClick?: () => void;
} & BoxProps;

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
   exactMatch,
   onClick,
   ...otherProps
}: ProductOptionProps) {
   return (
      <Box
         bg="white"
         borderWidth={isActive ? 2 : 1}
         borderColor={isActive ? 'brand.500' : 'gray.200'}
         boxSizing="border-box"
         borderRadius="base"
         px={2.5}
         py={2.5}
         cursor="pointer"
         textAlign="center"
         onClick={onClick}
         aria-selected={isActive}
         {...otherProps}
      >
         <ProductOptionImage image={image} exactMatch={exactMatch} />
         <Text fontSize="13px" color={exactMatch ? 'gray.800' : 'gray.400'}>
            {label}
         </Text>
      </Box>
   );
}

type ProductOptionImageProps = {
   image?: Image | null;
   exactMatch?: boolean;
};

function ProductOptionImage({ image, exactMatch }: ProductOptionImageProps) {
   if (!image) {
      return (
         <Flex
            h="16"
            alignItems="center"
            justifyContent="center"
            mb="1"
            opacity={exactMatch ? 1 : 0.4}
         >
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

   return (
      <Flex
         justify="center"
         h="16"
         position="relative"
         mb="1"
         opacity={exactMatch ? 1 : 0.4}
      >
         <ResponsiveImage
            height={64 /* chakra theme sizes.16 = 4em == 70 */}
            width={64}
            src={image.url}
            alt=""
            style={{
               objectFit: 'contain',
            }}
         />
      </Flex>
   );
}
