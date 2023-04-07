import {
   Accordion,
   AccordionButton,
   AccordionItem,
   AccordionItemProps,
   AccordionPanel,
   Box,
   forwardRef,
} from '@chakra-ui/react';
import { faMinusCircle, faPlusCircle } from '@fortawesome/pro-solid-svg-icons';
import { isPresent } from '@ifixit/helpers';
import { FaIcon } from '@ifixit/icons';
import { Wrapper } from '@ifixit/ui';
import type { FAQ } from '@models/components/faq';
import { SectionDescription } from './SectionDescription';
import { SectionHeading } from './SectionHeading';

export type FAQsSectionProps = {
   id: string;
   title?: string | null;
   description?: string | null;
   faqs: FAQ[];
};

const FALLBACK_SECTION_TITLE = 'FAQs';

export function FAQsSection({
   id,
   title,
   description,
   faqs,
}: FAQsSectionProps) {
   const sectionTitle = isPresent(title) ? title : FALLBACK_SECTION_TITLE;
   const sectionDescription = isPresent(description) ? description : null;

   if (faqs.length === 0) {
      return null;
   }

   return (
      <Box id={id} as="section" bg="white" py="16">
         <Wrapper>
            <Box maxW="container.md" mx="auto">
               <Box mb="12">
                  <SectionHeading textAlign="center" mb="4">
                     {sectionTitle}
                  </SectionHeading>
                  {sectionDescription && (
                     <SectionDescription
                        richText={sectionDescription}
                        textAlign="center"
                     />
                  )}
               </Box>
               <Accordion defaultIndex={[0]} allowMultiple>
                  {faqs.map((faq, index) => {
                     return (
                        <FAQAccordionItem key={index}>
                           {({ isExpanded }) => {
                              return (
                                 <>
                                    <h3>
                                       <AccordionButton p="4">
                                          <Box
                                             flex="1"
                                             textAlign="left"
                                             fontWeight="medium"
                                             color={
                                                isExpanded
                                                   ? 'brand.500'
                                                   : 'gray.900'
                                             }
                                          >
                                             {faq.question}
                                          </Box>
                                          <FaIcon
                                             icon={
                                                isExpanded
                                                   ? faMinusCircle
                                                   : faPlusCircle
                                             }
                                             color="gray.400"
                                          />
                                       </AccordionButton>
                                    </h3>
                                    <AccordionPanel
                                       pb="5"
                                       color="gray.700"
                                       bg="white"
                                    >
                                       {faq.answer}
                                    </AccordionPanel>
                                 </>
                              );
                           }}
                        </FAQAccordionItem>
                     );
                  })}
               </Accordion>
            </Box>
         </Wrapper>
      </Box>
   );
}

const FAQAccordionItem = forwardRef<AccordionItemProps, 'div'>((props, ref) => {
   return (
      <AccordionItem
         ref={ref}
         borderWidth="1px"
         borderColor="gray.300"
         bg="gray.100"
         rounded="md"
         my="4"
         overflow="hidden"
         {...props}
      />
   );
});