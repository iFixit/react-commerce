'use client';

import { GTAG_ID, PIWIK_ID } from '@config/env';
import { Suspense } from 'react';
import { GoogleTagManager } from './google-tag-manager';
import { PiwikPro } from './piwik-pro';

export function AnalyticsScripts() {
   return (
      <Suspense>
         {GTAG_ID && <GoogleTagManager gtmId={GTAG_ID} />}
         {PIWIK_ID && <PiwikPro piwikId={PIWIK_ID} />}
      </Suspense>
   );
}
