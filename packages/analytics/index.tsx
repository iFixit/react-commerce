import { gaSendEvent } from './google';
import { TrackEventMatomo, trackInMatomo } from './matomo/track-event';

export * from './google';
export * from './matomo';

/**
 * @param trackData trackData.eventName will default to the page path if not provided
 */
export const trackInMatomoAndGA = (trackData: TrackEventMatomo) => {
   const eventName =
      trackData.eventName ||
      `${window.location.origin}${window.location.pathname}`;
   trackInMatomo({
      ...trackData,
      eventName,
   });
   gaSendEvent({
      category: trackData.eventCategory,
      action: trackData.eventAction,
      name: eventName,
   });
};
