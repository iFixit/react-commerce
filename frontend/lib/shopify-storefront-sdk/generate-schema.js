require('dotenv').config({
   path: '.env.development',
});
const child = require('child_process');

const apiKey = process.env.CODEGEN_STOREFRONT_API_KEY;
const shopName = process.env.CODEGEN_STOREFRONT_SHOP_NAME;
const version = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_VERSION;

if (apiKey == null || apiKey.length === 0) {
   throw new Error('CODEGEN_STOREFRONT_API_KEY is not set');
}
if (shopName == null || shopName.length === 0) {
   throw new Error('CODEGEN_STOREFRONT_SHOP_NAME is not set');
}

child.exec(
   `gq https://${shopName}.myshopify.com/api/${version}/graphql.json --introspect -H 'X-Shopify-Storefront-Access-Token: ${apiKey}' -H 'Content-Type: application/json' > ${__dirname}/schema.graphql`,
   {},
   (error) => {
      if (error) {
         console.error('ERROR:', error);
         process.quit(1);
      }
   }
);
