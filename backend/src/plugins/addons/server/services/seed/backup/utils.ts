export function isStderrAnError(stderr: string) {
   const errorKeywords = ['error', 'failed', 'cannot', 'unable to'];
   return errorKeywords.some((keyword) =>
      stderr.toLowerCase().includes(keyword)
   );
}
