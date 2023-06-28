import { CodegenConfig } from '@graphql-codegen/cli';

const schemaConfig: CodegenConfig = {
   overwrite: true,
   generates: {
      'lib/strapi-sdk/generated/schema.graphql': {
         schema: 'http://localhost:1337/graphql',
         plugins: ['schema-ast'],
      },
   },
};

export default schemaConfig;
