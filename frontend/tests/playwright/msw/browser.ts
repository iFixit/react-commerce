import { setupWorker } from 'msw';

import { handlers } from './handlers';

export const mswBrowser = setupWorker(...handlers);
