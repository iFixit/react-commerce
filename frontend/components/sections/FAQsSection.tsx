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

export interface FAQsSectionProps {
   id: string;
   title?: string | null;
   description?: string | null;
   faqs: FAQ[];
   itemType?: string | null;
}

const FALLBACK_SECTION_TITLE = 'FAQs';

export function FAQsSection({
   id,
   title,
   description,
   faqs,
   itemType,
}: FAQsSectionProps) {
   const sectionTitle = isPresent(title) ? title : FALLBACK_SECTION_TITLE;
   const sectionDescription = isPresent(description) ? description : null;

   const filteredFaqs = faqs.filter(
      (faq) => faq.itemType == null || isSameItemType(faq.itemType, itemType)
   );

   if (filteredFaqs.length === 0) {
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
                  {filteredFaqs.map((faq, index) => (
                     <FAQAccordionItem key={index} faq={faq} />
                  ))}
               </Accordion>
            </Box>
         </Wrapper>
      </Box>
   );
}

const isSameItemType = (
   a: string | null | undefined,
   b: string | null | undefined
) => {
   if (a == null || b == null) {
      return a == b;
   }
   return a.toLowerCase() === b.toLowerCase();
};

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
               <AccordionPanel
                  pb="5"
                  color="gray.700"
                  bg="white"
                  dangerouslySetInnerHTML={{ __html: answerHtml }}
               />
            </>
         )}
      </AccordionItem>
   );
}
