import { RequestHandler } from 'msw';

export type RequestInfo = {
   endpoint: string;
   method: string;
};

export default class Handler {
   static create(request: RequestInfo): RequestHandler {
      const { endpoint, method } = request;
   }
}
