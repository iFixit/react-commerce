import { HStack } from '@chakra-ui/react';
import {
   FacebookLogo,
   InstagramLogo,
   RepairOrgLogo,
   TwitterLogo,
   TiktokLogo,
   YoutubeLogo,
} from '@ifixit/icons';
import { memo } from 'react';
import { FooterLink } from './Shared';

export interface SocialMediaAccounts {
   twitter: string | null;
   tiktok: string | null;
   facebook: string | null;
   instagram: string | null;
   youtube: string | null;
   repairOrg: string | null;
}

export const SocialMediaSection = memo(function SocialMediaSection({
   accounts,
}: {
   accounts: SocialMediaAccounts;
}) {
   if (!accounts) {
      return null;
   }
   return (
      <HStack spacing={4} justify={{ base: 'space-between', sm: 'center' }}>
         {accounts.tiktok && (
            <FooterLink
               aria-label="TikTok"
               href={accounts.tiktok}
               icon={TiktokLogo}
            />
         )}
         {accounts.facebook && (
            <FooterLink
               aria-label="Facebook"
               href={accounts.facebook}
               icon={FacebookLogo}
            />
         )}
         {accounts.twitter && (
            <FooterLink
               aria-label="Twitter"
               href={accounts.twitter}
               icon={TwitterLogo}
            />
         )}
         {accounts.instagram && (
            <FooterLink
               aria-label="Instagram"
               href={accounts.instagram}
               icon={InstagramLogo}
            />
         )}
         {accounts.youtube && (
            <FooterLink
               aria-label="YouTube"
               href={accounts.youtube}
               icon={YoutubeLogo}
            />
         )}
         {accounts.repairOrg && (
            <FooterLink
               aria-label="The Repair Association"
               href={accounts.repairOrg}
               icon={RepairOrgLogo}
            />
         )}
      </HStack>
   );
});
