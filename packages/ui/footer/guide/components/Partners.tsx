import { Box, BoxProps, forwardRef, SimpleGrid } from '@chakra-ui/react';
import { IfixitImage } from '@components/ifixit-image';
import noImageFixie from '@assets/images/no-image-fixie.jpeg';
import { Menu, MenuItem, ImageLinkMenuItem, MenuItemType } from '@models/menu';
import { Store } from '@models/store';
import React from 'react';

type FooterPartnersSectionProps = BoxProps & {
   partners: Menu;
};

export const FooterPartnersSection = React.memo(
   forwardRef<FooterPartnersSectionProps, 'div'>(
      ({ partners, ...otherProps }, ref) => {
         if (!partners || partners.items.length === 0) {
            // if we have no partners to display, don't render the box or grid
            return null;
         }
         return (
            <Box ref={ref} mt={2} p={5} align="center" {...otherProps}>
               <SimpleGrid
                  minChildWidth="92px"
                  spacing="4"
                  // limit to three columns until large breakpoint
                  maxW={{ base: '375px', lg: '1024px' }}
               >
                  <FooterPartners partners={partners} />
               </SimpleGrid>
            </Box>
         );
      }
   )
);

const FooterPartners = ({ partners }: { partners: Menu }) => {
   if (!partners) {
      return null;
   }
   const partnerIcons = partners.items.map((partner: MenuItem) => {
      if (partner.type === MenuItemType.ImageLink) {
         return <FooterPartner partner={partner} />;
      }
   });
   // the type checker complains that this isn't a component if we don't wrap it in a fragment
   return <>{partnerIcons}</>;
};

const FooterPartner = ({ partner }: { partner: ImageLinkMenuItem }) => {
   return (
      <FooterPartnerLink
         key={partner.name}
         href={partner.url}
         position="relative"
         p="0"
      >
         <PartnerImage partner={partner} />
      </FooterPartnerLink>
   );
};

const PartnerImage = ({ partner }: { partner: ImageLinkMenuItem }) => {
   if (partner.image) {
      const altText = partner.image?.alternativeText || `${partner.name} logo`;
      return (
         <IfixitImage
            layout="fill"
            objectFit="contain"
            src={partner.image.url}
            alt={altText}
         />
      );
   } else {
      return (
         <IfixitImage layout="fill" objectFit="contain" src={noImageFixie} />
      );
   }
};

export const FooterPartnerLink = forwardRef<BoxProps, 'a'>(
   ({ children, ...otherProps }, ref) => {
      return (
         <Box
            ref={ref}
            as="a"
            bg="gray.800"
            opacity="0.5"
            h="62px"
            p="4"
            borderRadius="md"
            cursor="pointer"
            transition="all 400ms"
            _hover={{
               opacity: '0.7',
            }}
            {...otherProps}
         >
            {children}
         </Box>
      );
   }
);
