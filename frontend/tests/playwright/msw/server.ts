import { setupServer } from 'msw/node';

import { handlers } from './handlers';

function bootstrapMockServer() {
   return setupServer(...handlers);
}

export default bootstrapMockServer;
