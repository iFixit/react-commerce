import { IncomingMessage } from "http";

export function getSubDomainRedirect(request: IncomingMessage, redirectPath: string) {
   const regex = new RegExp(process.env.SUBDOMAIN_REDIRECT_UNLESS_REGEX || '^');
   const host = request.headers.host;
   const shouldRedirect =  host ? !host.match(regex) : false;

   if (shouldRedirect) {
      return {
         redirect: {
            destination: `${process.env.NEXT_PUBLIC_IFIXIT_ORIGIN}/${redirectPath}`,
            permanent: true,
         },
       }
   }
}