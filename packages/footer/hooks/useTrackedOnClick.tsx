import * as React from 'react';
import { TrackingContext } from './TrackingContext';

type UseFooterLinkTrackingProps<T> = {
   href?: string;
   onClick?: React.MouseEventHandler<T>;
   clickName?: string;
};

export function useTrackedOnClick<T>({
   href,
   onClick,
   clickName,
}: UseFooterLinkTrackingProps<T>) {
   const { trackClick } = React.useContext(TrackingContext);
   const trackedOnClick: React.MouseEventHandler<T> = React.useCallback(
      (e) => {
         trackClick({
            eventCategory: 'Footer',
            eventAction: `Footer Link - ${clickName || href || 'undefined'} - Click`,
         });
         onClick?.(e);
      },
      [href, onClick]
   );
   return trackedOnClick;
}
