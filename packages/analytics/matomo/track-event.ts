import { piwikPush } from './matomoPush';

/**
 * @see https://matomo.org/docs/event-tracking/
 * @see https://developer.matomo.org/api-reference/tracking-javascript
 */
export type TrackEventPiwik = {
   /**
    * Describes the type of events you want to track.
    * For example, Link Clicks, Videos, Outbound Links, and Form Events.
    */
   eventCategory: string;
   /**
    * The specific action that is taken.
    * For example, with a Video category, you might have a Play, Pause and Complete action.
    */
   eventAction: string;
   /**
    * Usually the title of the element that is being interacted with, to aid with analysis.
    * For example, it could be the name of a Video that was played or the specific
    * form that is being submitted.
    */
   eventName?: string;
   /**
    * A numeric value and is often added dynamically. It could be the cost of a
    * product that is added to a cart, or the completion percentage of a video.
    */
   eventValue?: number;
};

/**
 * @see https://matomo.org/docs/event-tracking/
 * @see https://developer.matomo.org/api-reference/tracking-javascript
 * @example
 * const TrackingBrochureDownloads = {
 *   EventCategory: 'Downloads',
 *   EventAction: 'PDF Brochure Download',
 *   EventName: 'MyBrochure'
 * }
 * @example
 * const TrackingUserReviews = {
 *   EventCategory: 'Reviews'
 *   EventAction: 'Published Matomo Review'
 *   EventValue: 10
 * }
 */
export const trackInPiwik = (trackData: TrackEventPiwik) => {
   const dataWithEventName = {
      ...trackData,
      eventName:
         trackData.eventName ||
         `${window.location.origin}${window.location.pathname}`,
   };
   piwikPush([
      'trackEvent',
      dataWithEventName.eventCategory,
      dataWithEventName.eventAction,
      dataWithEventName.eventName,
      dataWithEventName.eventValue,
   ]);
};
