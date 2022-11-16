import { DataType } from '@shopify/shopify-api';
import chalk from 'chalk';
import prompts from 'prompts';
import type { Arguments, BuilderCallback } from 'yargs';
import { getShopClient } from '../../../utils/shopify';

export const command = 'delegate-token';

export const aliases = ['dt'];

export const desc = chalk.dim('Create Storefront delegate access token');

type Input = {
   shopName: string;
   accessToken: string;
};

export const builder: BuilderCallback<Arguments<Input>, any> = (yargs) => {
   return yargs
      .option('shop', {
         alias: 's',
         describe: 'Shop name (e.g. ifixit-test)',
      })
      .option('token', {
         alias: ['t'],
         describe: 'Admin API password',
      });
};

type DelegateAccessTokenPayload = {
   access_token: string;
};

export const handler = async function (argv: Arguments<Input>) {
   prompts.override(argv);
   const input = await prompts(
      [
         {
            type: 'text',
            name: 'shop',
            message: 'Enter shop name',
            initial: 'ifixit-test',
            validate: (value) => {
               return typeof value === 'string' && value.length > 0
                  ? true
                  : 'Shop name is required';
            },
         },
         {
            type: 'password',
            name: 'token',
            message: 'Enter Admin API Password',
            validate: (value) => {
               return typeof value === 'string' && value.length > 0
                  ? true
                  : 'Admin API password is required';
            },
         },
      ],
      {
         onCancel: () => {
            process.exit(0);
         },
      }
   );
   const client = getShopClient(input.shop, input.token);
   try {
      const response = await client.post<DelegateAccessTokenPayload>({
         type: DataType.JSON,
         path: 'access_tokens/delegate',
         data: {
            delegate_access_scope: [
               'unauthenticated_read_product_listings',
               'unauthenticated_read_product_tags',
               'unauthenticated_read_product_inventory',
               'unauthenticated_read_product_pickup_locations',
               'unauthenticated_write_customers',
               'unauthenticated_read_customers',
               'unauthenticated_read_customer_tags',
               'unauthenticated_write_checkouts',
               'unauthenticated_read_checkouts',
               'unauthenticated_read_content',
               'unauthenticated_read_selling_plans',
            ],
         },
      });
      console.log(
         '\n',
         chalk.gray('storefront delegate access token:'),
         chalk.green(response.body.access_token)
      );
   } catch (error: any) {
      console.error('\n', chalk.red(error.message), '\n');
      process.exit(1);
   }
};
