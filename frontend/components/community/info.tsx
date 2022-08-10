import * as React from 'react';
import OptionsDisplay from './options';
import VideoDisplay from './video';

export default function InfoDisplay({ userLang }: { userLang: string }) {
   return (
      <React.Fragment>
         <OptionsDisplay userLang={userLang} />
         <VideoDisplay />
      </React.Fragment>
   );
}
