export const BACKUP_FILE_NAME = 'export';

export const IMPORT_FILE_NAME = 'import.tar.gz';

const BACKUP_FOLDER_NAME = 'backup';

export const BACKUP_FOLDER_PATH = `public/${BACKUP_FOLDER_NAME}` as const;

export const EXPORT_FILE_PATH =
   `${BACKUP_FOLDER_PATH}/${BACKUP_FILE_NAME}` as const;

const IMPORT_FILE_PATH = `${BACKUP_FOLDER_PATH}/${IMPORT_FILE_NAME}` as const;

interface GetDefaultBackupFilePathInput {
   isEncrypted: boolean;
}

export function getDefaultBackupDownloadFilePath({
   isEncrypted,
}: GetDefaultBackupFilePathInput) {
   if (isEncrypted) {
      return `${IMPORT_FILE_PATH}.enc`;
   }
   return IMPORT_FILE_PATH;
}

interface GetBackupPathInput {
   isEncrypted: boolean;
}

export function getBackupURLPath({ isEncrypted }: GetBackupPathInput) {
   const exportFilePath = `${BACKUP_FOLDER_NAME}/${BACKUP_FILE_NAME}.tar.gz`;
   return isEncrypted ? `${exportFilePath}.enc` : exportFilePath;
}
