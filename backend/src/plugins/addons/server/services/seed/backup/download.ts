import fs from 'fs';
import http from 'http';
import https from 'https';
import path from 'path';
import { getBackupPath } from './export';

export interface DownloadBackup {
   strapiOrigin: string;
}

export async function downloadBackup({
   strapiOrigin,
}: DownloadBackup): Promise<void> {
   const exportURL = new URL(
      getBackupPath({ isEncrypted: false }),
      strapiOrigin
   );
   try {
      const backupFilePath = getBackupFilePath({ isEncrypted: false });
      ensureDirectoryExistence(backupFilePath);
      strapi.log.info(`🌱 Downloading backup from: ${exportURL.href}`);
      await downloadFile(exportURL, backupFilePath);
   } catch (err) {
      strapi.log.error(
         `🌱💥 Failed to download backup from: ${exportURL.href}`
      );
      console.error(err);
      throw new Error(`Failed to download backup from: ${exportURL.href}`);
   }
}

interface GetImportPathInput {
   isEncrypted: boolean;
}

export function getBackupFilePath({ isEncrypted }: GetImportPathInput) {
   const directory = process.cwd() + '/.tmp';
   const fileName = 'import.tar.gz';
   let importPath = path.join(directory, fileName);
   if (isEncrypted) {
      importPath += '.enc';
   }
   return importPath;
}
function downloadFile(url: URL, dest: string) {
   return new Promise((resolve, reject) => {
      const file = fs.createWriteStream(dest);
      const protocol = url.protocol === 'https:' ? https : http;
      protocol
         .get(url, (response) => {
            response.pipe(file);
            file.on('finish', () => {
               file.close();
               resolve(true);
            });
         })
         .on('error', (error) => {
            fs.unlink(dest, (err) => {
               console.log("Couldn't delete file: ", err);
            });
            reject(error);
         });
   });
}

function ensureDirectoryExistence(filePath: string) {
   const directory = path.dirname(filePath);
   if (fs.existsSync(directory)) {
      return;
   }
   fs.mkdirSync(directory, { recursive: true });
}
