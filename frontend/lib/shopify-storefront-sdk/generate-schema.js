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

(async () => {
   try {
      await spawn(
         `gq https://${shopName}.myshopify.com/api/${version}/graphql.json --introspect -H 'X-Shopify-Storefront-Access-Token: ${apiKey}' -H 'Content-Type: application/json' > ${__dirname}/schema.graphql`
      );
   } catch (error) {
      console.log('ERROR:', error);
   }
})();

function spawn(command) {
   return new Promise((resolve, reject) => {
      const commandProcess = child.spawn(command, undefined, {
         shell: true,
      });
      commandProcess.on('close', (code) => {
         if (code === 0) {
            resolve();
         } else {
            reject(code);
         }
      });
      commandProcess.on('error', (err) => {
         reject(err);
      });
   });
}
