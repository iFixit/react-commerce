import chalk from 'chalk';
import type { BuilderCallback } from 'yargs';
import * as delegateToken from './create/delegate-token';

const commands = [delegateToken];

export const command = 'create <command>';

export const describe = chalk.dim('Shopify create commands');

export const builder: BuilderCallback<any, any> = (yargs) => {
   return yargs.command(commands as any);
};
