import { CodegenConfig } from '@graphql-codegen/cli';

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
         schema: 'lib/shopify-storefront-sdk/schema.graphql',
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
            },
         },
      },
   },
};

export default config;
