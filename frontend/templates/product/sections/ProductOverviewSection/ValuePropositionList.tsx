import { Box, List, ListIcon, ListItem } from '@chakra-ui/react';
import { Tooltip } from '@components/ui/Tooltip';
import {
   faBadgeDollar,
   faCalendarCheck,
   faCircleInfo,
   faRocket,
   faShieldCheck,
} from '@fortawesome/pro-solid-svg-icons';
import { FaIcon } from '@ifixit/icons';

export function ValuePropositionList() {
   return (
      <div>
         <List spacing="2.5" fontSize="sm" mt="5" lineHeight="short">
            <ListItem display="flex" alignItems="center">
               <ListIcon
                  as={FaIcon}
                  h="4"
                  w="5"
                  mr="1.5"
                  color="brand.500"
                  icon={faBadgeDollar}
               />
               Purchase with purpose! Repair makes a global impact, reduces
               e-waste, and saves you money.
            </ListItem>
            <ListItem display="flex" alignItems="center">
               <ListIcon
                  as={FaIcon}
                  h="4"
                  w="5"
                  mr="1.5"
                  color="brand.500"
                  icon={faShieldCheck}
               />
               <div>
                  All our products meet rigorous quality standards and are
                  backed by industry-leading guarantees.
               </div>
            </ListItem>
            <ListItem display="flex" alignItems="center">
               <ListIcon
                  as={FaIcon}
                  h="4"
                  w="5"
                  mr="1.5"
                  color="brand.500"
                  icon={faRocket}
               />
               Same day shipping if ordered by 1PM Pacific.
            </ListItem>
            <ListItem display="flex" alignItems="center">
               <ListIcon
                  as={FaIcon}
                  h="4"
                  w="5"
                  mr="1.5"
                  color="brand.500"
                  icon={faCalendarCheck}
               />
               <div>30-day returns</div>
               <Tooltip
                  trigger={
                     <FaIcon
                        icon={faCircleInfo}
                        h="4"
                        mt="1px"
                        ml="1.5"
                        color="gray.400"
                     />
                  }
                  content={
                     <Box>
                        <p>
                           Your repairs are in good hands! We accept returns
                           within 30 days of receipt.
                        </p>
                        <Box mt="3">
                           <a href="https://help.ifixit.com/article/49-return-policy">
                              Initiate a return here
                           </a>
                        </Box>
                     </Box>
                  }
               />
            </ListItem>
         </List>
      </div>
   );
}
