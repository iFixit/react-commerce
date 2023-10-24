import * as React from 'react';
import { TrackingContext } from './TrackingContext';

type UseFooterLinkTrackingProps<T> = {
   href?: string;
   onClick?: React.MouseEventHandler<T>;
   clickName?: string;
   isStoreLink?: boolean;
   eventCategory?: string;
   eventAction?: string;
};

export function useTrackedOnClick<T>({
   href,
   onClick,
   clickName,
   isStoreLink,
   eventCategory,
   eventAction,
}: UseFooterLinkTrackingProps<T>) {
   const linkType = isStoreLink ? 'Stores' : 'iFixit';
   const { trackClick } = React.useContext(TrackingContext);
   const trackedOnClick: React.MouseEventHandler<T> = React.useCallback(
      (e) => {
         trackClick({
            eventCategory: eventCategory || `Footer ${linkType} Link`,
            eventAction:
               eventAction ||
               `Footer ${linkType} Link - \"${
                  clickName || href || 'undefined'
               }\" - Click`,
            eventName: `${window.location.origin}${window.location.pathname}`,
         });
         onClick?.(e);
      },
      [href, onClick]
   );
   return trackedOnClick;
}
