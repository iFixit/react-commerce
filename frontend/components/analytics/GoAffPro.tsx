import { GO_AFF_PRO_STORE } from '@config/env';
import * as React from 'react';
import Script from 'next/script';

export function GoAffPro() {
   if (!GO_AFF_PRO_STORE) {
      return null;
   }

   return (
      <Script id="go-aff-pro" strategy="afterInteractive">
         {`
            <!-- Go Aff Pro Script -->
            <script type="text/javascript" src="https://api.goaffpro.com/loader.js?shop=${GO_AFF_PRO_STORE}"></script>
            <!-- Go Aff Pro Script -->
         `}
      </Script>
   );
}
