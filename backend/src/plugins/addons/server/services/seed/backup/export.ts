import { exec } from 'child_process';
import {
   ensureDirectoryExists,
   isStderrAnError,
} from '../../../helpers/server-helpers';

export const BACKUP_FILE_NAME = 'export';

const BACKUP_FOLDER_NAME = 'backup';

const BACKUP_FOLDER_PATH = `public/${BACKUP_FOLDER_NAME}`;

const EXPORT_FILE_PATH = `${BACKUP_FOLDER_PATH}/${BACKUP_FILE_NAME}`;

interface GetBackupPathInput {
   isEncrypted: boolean;
}

export function getBackupPath({ isEncrypted }: GetBackupPathInput) {
   const exportFilePath = `${BACKUP_FOLDER_NAME}/${BACKUP_FILE_NAME}.tar.gz`;
   return isEncrypted ? `${exportFilePath}.enc` : exportFilePath;
}

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
