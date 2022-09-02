import { HStack } from '@chakra-ui/react';
import {
   FacebookLogo,
   InstagramLogo,
   RepairOrgLogo,
   TwitterLogo,
   YoutubeLogo,
} from '@ifixit/icons';
import { SocialMediaAccounts } from '@models/store';
import { FooterLink } from './Shared';

export const FooterSocialMediaSection = ({ accounts }: SocialMediaAccounts) => {
   return (
      <HStack spacing={4} justify={{ base: 'space-between', sm: 'center' }}>
         {accounts.facebook && (
            <FooterLink href={accounts.facebook} icon={FacebookLogo} />
         )}
         {accounts.twitter && (
            <FooterLink href={accounts.twitter} icon={TwitterLogo} />
         )}
         {accounts.instagram && (
            <FooterLink href={accounts.instagram} icon={InstagramLogo} />
         )}
         {accounts.youtube && (
            <FooterLink href={accounts.youtube} icon={YoutubeLogo} />
         )}
         {accounts.repairOrg && (
            <FooterLink href={accounts.repairOrg} icon={RepairOrgLogo} />
         )}
      </HStack>
   );
};
