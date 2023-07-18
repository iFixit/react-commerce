import fs from 'fs/promises';

export function isStderrAnError(stderr: string) {
   const errorKeywords = ['error', 'failed', 'cannot', 'unable to'];
   return errorKeywords.some((keyword) =>
      stderr.toLowerCase().includes(keyword)
   );
}

export async function ensureDirectoryExists(filePath: string): Promise<void> {
   await fs.mkdir(filePath, { recursive: true });
}

export function isBlank(value: unknown): boolean {
   return value == null || (typeof value === 'string' && value.trim() === '');
}
