import { trackInMatomoAndGA } from '@ifixit/analytics';
import * as React from 'react';

type UseFooterLinkTrackingProps<T> = {
   href?: string;
   onClick?: React.MouseEventHandler<T>;
};

export function useTrackedOnClick<T>({
   href,
   onClick,
}: UseFooterLinkTrackingProps<T>) {
   const trackedOnClick: React.MouseEventHandler<T> = React.useCallback(
      (e) => {
         trackInMatomoAndGA({
            eventCategory: 'Footer',
            eventAction: `Link Click - ${href}`,
         });
         onClick?.(e);
      },
      [href, onClick]
   );
   return trackedOnClick;
}
