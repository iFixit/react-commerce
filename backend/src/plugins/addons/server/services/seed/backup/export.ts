import { exec } from 'child_process';
import {
   ensureDirectoryExists,
   isStderrAnError,
} from '../../../helpers/server-helpers';
import { BACKUP_FOLDER_PATH, EXPORT_FILE_PATH } from './utils';

export async function exportBackup(): Promise<string> {
   await ensureDirectoryExists(BACKUP_FOLDER_PATH);
   return new Promise((resolve, reject) => {
      exec(
         `strapi export --no-encrypt -f ${EXPORT_FILE_PATH}`,
         (error, stdout, stderr) => {
            if (error) {
               console.log(`export error: ${error.message}`);
               reject(error);
            } else if (isStderrAnError(stderr)) {
               console.log('stderr error');
               reject(stderr);
            } else {
               resolve(stdout.length > 0 ? stdout : stderr);
            }
         }
      );
   });
}
