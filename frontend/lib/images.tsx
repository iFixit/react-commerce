export function getImage(path: string): string {
   const siteName = 'https://www.ifixit.com/';
   const staticDir = 'static/images/';
   return siteName + staticDir + path;
}
