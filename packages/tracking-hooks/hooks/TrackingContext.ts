import { createContext } from 'react';

/**
 * @see https://matomo.org/docs/event-tracking/
 * @see https://developer.matomo.org/api-reference/tracking-javascript
 */
export type TrackEventMatomo = {
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

type Track = (trackData: TrackEventMatomo) => void;
type TrackContext = {
   trackClick: Track;
};

const defaultTracker: TrackContext = {
   trackClick: (_trackData: TrackEventMatomo) => {},
};

export const TrackingContext = createContext(defaultTracker);
export const EventTracker = TrackingContext.Provider;
