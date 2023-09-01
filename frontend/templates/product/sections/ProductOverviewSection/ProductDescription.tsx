import { Alert, ThemeTypings } from '@chakra-ui/react';
import {
   faCircleExclamation,
   faCircleInfo,
   faTriangleExclamation,
} from '@fortawesome/pro-solid-svg-icons';
import { FaIcon } from '@ifixit/icons';
import type { Product, ProductVariant } from '@pages/api/nextjs/cache/product';
import { PrerenderedHTML } from '@components/common';

export type ProductDescriptionProps = {
   product: Product;
   selectedVariant: ProductVariant;
};

export function ProductDescription({
   product,
   selectedVariant,
}: ProductDescriptionProps) {
   return (
      <>
         <VariantDescription>
            {selectedVariant.description ?? product.descriptionHtml}
         </VariantDescription>

         {selectedVariant.note && (
            <Alert
               status="info"
               borderWidth={1}
               borderColor="brand.300"
               borderRadius="md"
               alignItems="flex-start"
               data-testid="product-note"
            >
               <FaIcon
                  icon={faCircleInfo}
                  h="4"
                  mt="0.5"
                  mr="2.5"
                  color="brand.500"
               />
               <AlertText colorScheme="brand">{selectedVariant.note}</AlertText>
            </Alert>
         )}

         {selectedVariant.disclaimer && (
            <Alert
               status="warning"
               borderWidth={1}
               borderColor="orange.300"
               borderRadius="md"
               alignItems="flex-start"
               data-testid="product-disclaimer"
            >
               <FaIcon
                  icon={faCircleExclamation}
                  h="4"
                  mt="0.5"
                  mr="2.5"
                  color="orange.500"
               />
               <AlertText colorScheme="orange">
                  {selectedVariant.disclaimer}
               </AlertText>
            </Alert>
         )}

         {selectedVariant.warning && (
            <Alert
               status="error"
               borderWidth={1}
               borderColor="red.300"
               borderRadius="md"
               alignItems="flex-start"
               data-testid="product-warning"
            >
               <FaIcon
                  icon={faTriangleExclamation}
                  color="red.500"
                  h="4"
                  mt="0.5"
                  mr="2.5"
               />
               <AlertText colorScheme="red">
                  {selectedVariant.warning}
               </AlertText>
            </Alert>
         )}
      </>
   );
}

type VariantDescriptionProps = {
   children: string;
};

function VariantDescription({ children }: VariantDescriptionProps) {
   return (
      <PrerenderedHTML
         html={children}
         styles="commerce"
         fontSize="sm"
         sx={{
            ul: {
               my: 3,
               pl: 5,
            },
            p: {
               mb: 3,
               _last: {
                  mb: 0,
               },
            },
         }}
      />
   );
}

type AlertTextProps = {
   children: string;
   colorScheme: ThemeTypings['colorSchemes'];
};

function AlertText({ children, colorScheme }: AlertTextProps) {
   return (
      <PrerenderedHTML
         html={children}
         styles="commerce"
         fontSize="sm"
         sx={{
            a: {
               fontWeight: 'bold',
               textDecoration: 'underline',
               transition: 'all 300ms',
            },
            'a:hover': {
               color: `${colorScheme}.800`,
            },
            'p:not(:first-of-type)': {
               mt: 2,
            },
         }}
      />
   );
}
