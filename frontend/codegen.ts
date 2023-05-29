import { CodegenConfig, generate } from '@graphql-codegen/cli';

const schemaConfig: CodegenConfig = {
   overwrite: true,
   generates: {
      'lib/strapi-sdk/generated/schema.graphql': {
         schema: 'http://localhost:1337/graphql',
         plugins: ['schema-ast'],
      },
   },
};

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

export default generate(schemaConfig, true).then(() => config);
