import { createContext } from 'react';

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

type Track = (trackData: TrackEventPiwik) => void;
type TrackContext = {
   trackClick: Track;
};

const defaultTracker: TrackContext = {
   trackClick: (_trackData: TrackEventPiwik) => {},
};

export const TrackingContext = createContext(defaultTracker);
export const EventTracker = TrackingContext.Provider;
