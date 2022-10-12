export class ContentTypeNotFoundError extends Error {
   code: string;

   constructor(contentType: string) {
      super(`Content type "${contentType}" not found`);
      this.code = 'CONTENT_TYPE_NOT_FOUND';
   }
   get [Symbol.toStringTag]() {
      return 'ContentTypeNotFoundError';
   }
}
