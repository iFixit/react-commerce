import { VERCEL_ENV, VERCEL_GIT_COMMIT_SHA } from '@config/env';

export async function isCurrentProductionDeployment() {
   if (!VERCEL_GIT_COMMIT_SHA || VERCEL_ENV !== 'production') {
      return false;
   }
   const res = await fetch(
      'https://api.github.com/repos/iFixit/react-commerce/branches/main'
   );
   if (!res.ok) {
      throw new Error(`Failed to fetch main branch data: ${res.statusText}`);
   }
   const json = await res.json();
   const currentSha = json.commit.sha;
   return currentSha === VERCEL_GIT_COMMIT_SHA;
}
