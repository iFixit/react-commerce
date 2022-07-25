import { IncomingMessage } from "http";

export function getSubDomainRedirect(request: IncomingMessage, redirectPath: string) {
   const wantsRedirects = process.env.FORCE_SUBDOMAIN_REDIRECTS === "true"
   const isEN = !!request.headers.host?.match(/www\.ifixit\.com/g);

   if (isEN || !wantsRedirects) {
      return;
   }

   return {
      redirect: {
         destination: `${process.env.NEXT_PUBLIC_IFIXIT_ORIGIN}/${redirectPath}`,
         permanent: true,
      },
    }
}