import { VERCEL_ENV, VERCEL_GIT_COMMIT_SHA } from '@config/env';

export async function isCurrentProductionDeployment() {
   if (!VERCEL_GIT_COMMIT_SHA || VERCEL_ENV !== 'production') {
      return false;
   }
   const errorMsg = 'Failed to fetch GitHub branch info';

   let res;
   try {
      res = await fetch(
         'https://api.github.com/repos/iFixit/react-commerce/branches/main'
      );
   } catch (e) {
      console.error(errorMsg, e);
      return false;
   }
   if (!res.ok) {
      console.error(errorMsg, res.status, res.statusText);
      return false;
   }

   let json;
   try {
      json = await res.json();
   } catch (e) {
      console.error(errorMsg, e);
      return false;
   }

   const currentSha = json.commit.sha;
   return currentSha === VERCEL_GIT_COMMIT_SHA;
}
