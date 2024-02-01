import 'server-only';

import { findPage } from '@models/page/server';
import { cache } from 'react';

export const findPageByPath = cache(async (path: string) => {
   return findPage({ path });
});
