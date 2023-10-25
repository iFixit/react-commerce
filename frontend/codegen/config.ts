import { CodegenConfig } from '@graphql-codegen/cli';

require('dotenv').config({
   path: '.env',
});

const STOREFRONT_API_VERSION =
   process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_VERSION;

console.log('🛒 STOREFRONT_API_VERSION:', STOREFRONT_API_VERSION);

const config: CodegenConfig = {
   overwrite: true,
   generates: {
      'lib/strapi-sdk/generated/sdk.ts': {
         schema: 'http://localhost:1337/graphql',
         documents: 'lib/strapi-sdk/operations/**/*.graphql',
         plugins: [
            'typescript',
            'typescript-operations',
            'typescript-generic-sdk',
         ],
         hooks: {
            afterOneFileWrite: ['prettier --write'],
         },
         config: {
            documentMode: 'string',
            dedupeFragments: true,
         },
      },
      'lib/strapi-sdk/generated/validation.ts': {
         schema: 'lib/strapi-sdk/generated/schema.graphql',
         plugins: ['typescript-validation-schema'],
         hooks: {
            afterOneFileWrite: ['prettier --write'],
         },
         config: {
            importFrom: './sdk',
            schema: 'zod',
            scalarSchemas: {
               JSON: 'z.unknown()',
               DateTime: 'z.unknown()',
               MenuItemsDynamicZoneInput: 'z.unknown()',
               PageSectionsDynamicZoneInput: 'z.unknown()',
               ProductSectionsDynamicZoneInput: 'z.unknown()',
               ProductListItemOverridesDynamicZoneInput: 'z.unknown()',
               ProductListSectionsDynamicZoneInput: 'z.unknown()',
            },
         },
      },
      'lib/shopify-storefront-sdk/generated/sdk.ts': {
         schema: `https://mock.shop/api/${STOREFRONT_API_VERSION}/graphql.json`,
         documents: 'lib/shopify-storefront-sdk/operations/**/*.graphql',
         plugins: [
            'typescript',
            'typescript-operations',
            'typescript-generic-sdk',
         ],
         hooks: {
            afterOneFileWrite: ['prettier --write'],
         },
         config: {
            documentMode: 'string',
            dedupeFragments: true,
            scalars: {
               HTML: 'string',
               URL: 'string',
               Decimal: 'string',
               Color: 'string',
               DateTime: 'string',
               UnsignedInt64: 'string',
            },
         },
      },
   },
};

export default config;
