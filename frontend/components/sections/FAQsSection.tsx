import {
   Accordion,
   AccordionButton,
   AccordionItem,
   AccordionPanel,
   Box,
} from '@chakra-ui/react';
import { faMinusCircle, faPlusCircle } from '@fortawesome/pro-solid-svg-icons';
import { markdownToHTML } from '@helpers/ui-helpers';
import { isPresent } from '@ifixit/helpers';
import { FaIcon } from '@ifixit/icons';
import { Wrapper } from '@ifixit/ui';
import type { FAQ } from '@models/components/faq';
import { useMemo } from 'react';
import { SectionDescription } from './SectionDescription';
import { SectionHeading } from './SectionHeading';
import { PrerenderedHTML } from '@components/common';

export interface FAQsSectionProps {
   id: string;
   title?: string | null;
   description?: string | null;
   faqs: FAQ[];
   relevantItemTypes?: string[];
}

const FALLBACK_SECTION_TITLE = 'FAQs';

export function FAQsSection({
   id,
   title,
   description,
   faqs,
   relevantItemTypes = [],
}: FAQsSectionProps) {
   const sectionTitle = isPresent(title) ? title : FALLBACK_SECTION_TITLE;
   const sectionDescription = isPresent(description) ? description : null;

   const relevantFaqs = useRelevantFaqs({
      faqs,
      relevantItemTypes,
   });

   if (relevantFaqs.length === 0) {
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
                  {relevantFaqs.map((faq, index) => (
                     <FAQAccordionItem key={index} faq={faq} />
                  ))}
               </Accordion>
            </Box>
         </Wrapper>
      </Box>
   );
}

function FAQAccordionItem({ faq }: { faq: FAQ }) {
   const answerHtml = useMemo(() => markdownToHTML(faq.answer), [faq.answer]);
   return (
      <AccordionItem
         borderWidth="1px"
         borderColor="gray.300"
         bg="gray.100"
         rounded="md"
         my="4"
         overflow="hidden"
      >
         {({ isExpanded }) => (
            <>
               <h3>
                  <AccordionButton p="4">
                     <Box
                        flex="1"
                        textAlign="left"
                        fontWeight="medium"
                        color={isExpanded ? 'brand.500' : 'gray.900'}
                     >
                        {faq.question}
                     </Box>
                     <FaIcon
                        icon={isExpanded ? faMinusCircle : faPlusCircle}
                        color="gray.400"
                     />
                  </AccordionButton>
               </h3>
               <AccordionPanel pb="5" color="gray.700" bg="white">
                  <PrerenderedHTML html={answerHtml} template="commerce" />
               </AccordionPanel>
            </>
         )}
      </AccordionItem>
   );
}

interface UseRelevantFaqsProps {
   faqs: FAQ[];
   relevantItemTypes: string[];
}

function useRelevantFaqs({ faqs, relevantItemTypes }: UseRelevantFaqsProps) {
   return faqs.filter(
      (faq) => faq.itemType == null || relevantItemTypes.includes(faq.itemType)
   );
}
