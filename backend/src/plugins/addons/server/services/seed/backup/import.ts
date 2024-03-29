import { exec } from 'child_process';
import type { Backup } from './types';
import { isStderrAnError } from '../../../helpers/server-helpers';

export function importBackup(backup: Backup): Promise<string> {
   strapi.log.info(`🌱 Importing data from ${backup.filePath} ...`);
   return importFromFile({ filePath: backup.filePath });
}
interface ImportFromFileArgs {
   filePath: string;
}

async function importFromFile({
   filePath,
}: ImportFromFileArgs): Promise<string> {
   return new Promise((resolve, reject) => {
      exec(`strapi import -f ${filePath} --force`, (error, stdout, stderr) => {
         if (error) {
            console.log('execution error');
            console.log(error);
            reject(error);
         } else if (isStderrAnError(stderr)) {
            console.log('stderr error');
            reject(stderr);
         } else {
            resolve(stdout.length > 0 ? stdout : stderr);
         }
      });
   });
}
