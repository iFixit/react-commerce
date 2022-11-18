import chalk from 'chalk';
import type { BuilderCallback } from 'yargs';
import * as create from './shop/create';

const commands = [create];

export const command = 'shopify <command>';

export const aliases = ['shop'];

export const description = chalk.dim('Shopify related commands');

export const builder: BuilderCallback<any, any> = function (yargs) {
   return yargs.command(commands as any);
};
