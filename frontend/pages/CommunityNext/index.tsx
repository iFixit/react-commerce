import React, { useEffect, useState } from 'react';
import ActivityDisplay, { Activity } from '../../components/community/activity';
import InfoDisplay from '../../components/community/info';
import NavigationDisplay from '../../components/community/navigation';
import GuidePage from '../../components/page/guidePage';
import { getLocale } from '../../lib/site';

export const siteTitle = 'Community';

export default function LandingPage({
   activities,
   patrolEnabled,
}: {
   activities: Activity[];
   patrolEnabled: boolean;
}) {
   const [user, _setUser] = useState({});
   const [privileges, setPrivileges] = useState({
      isLoggedIn: false,
      isMod: false,
   });
   const lang = (user as any).userLang;

   useEffect(() => {
      async function updatePrivileges(id?: number) {
         await fetch(
            'https://www.ifixit.com/api/2.0/community/getUserPrivileges/',
            {
               method: 'GET',
               headers: {
                  Authorization: 'api ' + (user as any).authToken,
               },
            }
         )
            .then((res) => res.json())
            .then((data) =>
               setPrivileges({
                  isLoggedIn: id != undefined,
                  isMod: data.isMod,
               })
            );
      }
      const id = (user as any).userid;
      if (id) {
         updatePrivileges(id);
      }
   }, [user]);

   return (
      <GuidePage title={siteTitle}>
         <NavigationDisplay
            title={siteTitle}
            privileges={privileges}
            patrolEnabled={patrolEnabled}
         />
         <InfoDisplay userLang={lang ? lang : getLocale()} />
         <ActivityDisplay data={activities} />
      </GuidePage>
   );
}

export async function getStaticProps() {
   const activities = await fetch('https://www.ifixit.com/api/2.0/community')
      .then((res) => res.json())
      .then((obj) => obj.activity);
   const patrolEnabled = await fetch(
      'https://www.ifixit.com/api/2.0/community/isPatrolEnabled'
   )
      .then((res) => res.json())
      .then((obj) => obj.patrolEnabled);
   return {
      props: {
         activities,
         patrolEnabled,
      },
   };
}
