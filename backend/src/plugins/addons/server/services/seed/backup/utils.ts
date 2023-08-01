import path from 'path';

interface GetDefaultBackupFilePathInput {
   isEncrypted: boolean;
}

export function getDefaultBackupFilePath({
   isEncrypted,
}: GetDefaultBackupFilePathInput) {
   const directory = process.cwd() + '/.tmp';
   const fileName = 'import.tar.gz';
   let importPath = path.join(directory, fileName);
   if (isEncrypted) {
      importPath += '.enc';
   }
   return importPath;
}
