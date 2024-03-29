/**
 * This component renders a localized date in a way that is compatible with React hydration.
 * The first render will not render the date to avoid FOUC.
 * The second render (which happens in the client) will use the localized format.
 *
 * There are other ways to do this, for example by taking advantage of the Accept-Language header
 * to know the user's locale in the server. However this approach is the one that is more cache friendly.
 */
import { useEffect, useState } from 'react';

interface IntlDateProps {
   value: Date;
   locales?: Intl.LocalesArgument;
   options?: Intl.DateTimeFormatOptions;
   className?: string;
}

export function IntlDate({
   value,
   locales,
   options,
   className,
}: IntlDateProps) {
   const [stableFormattedDate, setStableFormattedDate] = useState<
      string | null
   >(null);
   const isoString = value.toISOString();
   const formattedDate = value.toLocaleDateString(locales, options);

   useEffect(() => {
      setStableFormattedDate(formattedDate);
   }, [formattedDate]);

   return (
      <time className={className} dateTime={isoString}>
         {stableFormattedDate}
      </time>
   );
}
