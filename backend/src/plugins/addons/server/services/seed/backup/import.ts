import { exec } from 'child_process';
import path from 'path';
import { isStderrAnError } from './utils';

export function importBackup(): Promise<string> {
   strapi.log.info(`🌱 Importing data..`);
   const filePath = getBackupFilePath({ isEncrypted: false });
   return importFromFile({ filePath });
}

interface GetImportPathInput {
   isEncrypted: boolean;
}

function getBackupFilePath({ isEncrypted }: GetImportPathInput) {
   const directory = process.cwd() + '/.tmp';
   const fileName = 'import.tar.gz';
   let importPath = path.join(directory, fileName);
   if (isEncrypted) {
      importPath += '.enc';
   }
   return importPath;
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
