#!/usr/bin/env npx ts-node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { commands } from './commands';
import chalk from 'chalk';
import { clearNpmScriptLogs } from './utils/misc';

clearNpmScriptLogs();

yargs(hideBin(process.argv))
   .scriptName(chalk.blue('bot'))
   .usage('$0 <module> <command> [options]')
   .updateStrings({
      'Commands:': chalk.underline('Commands:'),
      'Options:': chalk.underline('Options:'),
      // @ts-ignore
      'Not enough non-option arguments: got %s, need at least %s': {
         one: chalk.red(
            'Please provide a command\nInserted %s, need at least %s\n'
         ),
         other: chalk.red(
            'Please provide another command\nInserted %s, need at least %s\n'
         ),
      },
   })
   .command(commands as any)
   .demandCommand(1, chalk.red('Please provide a command\n'))
   .help('h').argv;
