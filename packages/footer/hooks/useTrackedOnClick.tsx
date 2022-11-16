import * as React from 'react';
import { TrackingContext } from './TrackingContext';

type UseFooterLinkTrackingProps<T> = {
   href?: string;
   onClick?: React.MouseEventHandler<T>;
};

export function useTrackedOnClick<T>({
   href,
   onClick,
}: UseFooterLinkTrackingProps<T>) {
   const { trackClick } = React.useContext(TrackingContext);
   const trackedOnClick: React.MouseEventHandler<T> = React.useCallback(
      (e) => {
         trackClick({
            eventCategory: 'Footer',
            eventAction: `Link Click - ${href}`,
         });
         onClick?.(e);
      },
      [href, onClick]
   );
   return trackedOnClick;
}
