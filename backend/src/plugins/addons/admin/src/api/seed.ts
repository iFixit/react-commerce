import { useRequest } from './request';
import type { SeedResult } from '../../../server/services/seed';

type Input = {
   strapiOrigin: string;
};

export function useSeed() {
   return useRequest<SeedResult, Input>({
      url: '/addons/seed',
      method: 'POST',
   });
}

type RequestBackupInput = void;

type RequestBackupResult = boolean;

export function useRequestBackup() {
   return useRequest<RequestBackupResult, RequestBackupInput>({
      url: '/addons/backup',
      method: 'POST',
   });
}

interface ImportBackupInput {
   strapiOrigin: string;
}

type ImportBackupResult = boolean;

export function useImportBackup() {
   return useRequest<ImportBackupResult, ImportBackupInput>({
      url: '/addons/import',
      method: 'POST',
   });
}
