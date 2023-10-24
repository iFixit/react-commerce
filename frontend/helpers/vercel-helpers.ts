import { SentryError } from '@ifixit/sentry';
import { VERCEL_ENV, VERCEL_GIT_COMMIT_SHA } from '@config/env';
import { cache } from '@lib/cache';

export async function isCurrentProductionDeployment() {
   if (!VERCEL_GIT_COMMIT_SHA || VERCEL_ENV !== 'production') {
      return false;
   }
   const sha = await cache('get-main-commit-sha', getMainCommitSha, {
      ttl: 300,
   });
   return sha === VERCEL_GIT_COMMIT_SHA;
}

async function getMainCommitSha(): Promise<string> {
   const res = await fetch(
      'https://api.github.com/repos/iFixit/react-commerce/branches/main'
   );
   if (!res.ok) {
      throw new SentryError(
         `Failed to fetch main branch data: ${res.status} ${res.statusText}`
      );
   }
   const json = await res.json();
   return json.commit.sha;
}
