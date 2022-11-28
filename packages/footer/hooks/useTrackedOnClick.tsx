import * as React from 'react';
import { TrackingContext } from './TrackingContext';

type UseFooterLinkTrackingProps<T> = {
   href?: string;
   onClick?: React.MouseEventHandler<T>;
   clickName?: string;
   isStoreLink?: boolean;
};

export function useTrackedOnClick<T>({
   href,
   onClick,
   clickName,
   isStoreLink,
}: UseFooterLinkTrackingProps<T>) {
   const LinkType = isStoreLink ? 'Stores' : 'iFixit';
   const { trackClick } = React.useContext(TrackingContext);
   const trackedOnClick: React.MouseEventHandler<T> = React.useCallback(
      (e) => {
         trackClick({
            eventCategory: 'Footer',
            eventAction: `Footer ${LinkType} Link - \"${clickName || href || 'undefined'}\" - Click`,
         });
         onClick?.(e);
      },
      [href, onClick]
   );
   return trackedOnClick;
}
