import * as Sentry from '@sentry/nextjs';

type VisitorAPIResponse = {
   id: string;
   location: string;
   referrer: string | null;
   ref: string;
};

const RefCodeCookieName = 'gap_ref_code';
const VisitorIdCookieName = 'gap_vid';

const CookieDuration = 7 * 24 * 60 * 60;
const CookieDomainsStr = [
   '.ifixit.com',
   'store.ifixit.de',
   'store.ifixit.fr',
   'store.ifixit.it',
   'store.ifixit.co.uk',
   'ifixit-eu-pro.myshopify.com',
].join(',');

const PossibleUrlParams = ['ref', 'click_id', 'sub_id', 'wpam_id', 'aff'];

const PublicAPIToken =
   '45574e7055bd43ae4d79dee013c6fa14a4635144d876557ee23fd1de53d82491';

export class GoAffPro {
   private goAffProPublicToken: string | null;

   constructor() {
      this.goAffProPublicToken = PublicAPIToken;
      if (!this.goAffProPublicToken) {
         return;
      }
      setRefCodeIfRequired();
   }

   static trackVisitIfRequired() {
      return new GoAffPro().trackVisitIfRequired();
   }

   getRefCode() {
      return getCookieValue(RefCodeCookieName);
   }

   getVisitorID() {
      return getCookieValue(VisitorIdCookieName);
   }

   async trackVisitIfRequired() {
      if (!this.goAffProPublicToken) {
         return Promise.resolve();
      }

      const ref_code = this.getRefCode();

      if (!ref_code) {
         return Promise.resolve();
      }

      const visitor_id = this.getVisitorID();

      if (visitor_id) {
         return Promise.resolve();
      }

      const sentryData = {
         tags: {
            ref_code,
         },
         contexts: {
            Affiliate: {
               ref_code,
            },
         },
      };

      const init = {
         method: 'POST',
         body: JSON.stringify({
            id: visitor_id,
            location: window.location.href,
            referrer: document.referrer || null,
            ref: ref_code,
         }),
         headers: {
            'x-goaffpro-public-token': this.goAffProPublicToken,
            'Content-Type': 'application/json',
         },
      };

      // if this is a new visitor, we need to get the visitor id from the response
      // and set it as a cookie
      const data: VisitorAPIResponse = await fetchAndLogErrors(
         'https://api.goaffpro.com/v1/sdk/track/visit',
         init,
         sentryData
      ).then((resp) => resp.json());

      if (data.id) {
         setCookie(VisitorIdCookieName, data.id);
      }
   }
}

function makeCookieString(name: string, maxAge: number, value: string) {
   return `${name}=${value}; max-age=${maxAge}; domain=${CookieDomainsStr}; path=/`;
}

function getCookieValue(name: string) {
   const regex = new RegExp(`(^| )${name}=([^;]+)`);
   const match = document.cookie.match(regex);
   const value = match ? match[2] : null;
   return value || null;
}

function setCookie(name: string, value: string) {
   document.cookie = makeCookieString(name, CookieDuration, value);
}

function fetchAndLogErrors(
   input: RequestInfo,
   init: RequestInit | undefined,
   sentryData: Parameters<typeof Sentry.captureException>[1]
) {
   return fetch(input, init).catch((err) => {
      // not much we can do if request fails
      // other than log it to sentry
      Sentry.captureException(err, sentryData);
      return new Response(null, { status: 500 });
   });
}

function getRefCodeFromUrl() {
   const urlParams = new URLSearchParams(window.location.search);

   for (const param of PossibleUrlParams) {
      const value = urlParams.get(param);
      if (value) {
         return value;
      }
   }

   return null;
}

function setRefCodeIfRequired() {
   const ref_code = getRefCodeFromUrl();

   if (!ref_code) {
      return;
   }

   setCookie(RefCodeCookieName, ref_code);
}
