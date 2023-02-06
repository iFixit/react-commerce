import { setupWorker } from 'msw';

import { handlers } from './handlers';

function bootstrapMockWorker() {
   return setupWorker(...handlers);
}

export default bootstrapMockWorker;
