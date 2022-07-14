import {
   Accordion,
   AccordionButton,
   AccordionItem,
   AccordionItemProps,
   AccordionPanel,
   Box,
   forwardRef,
   Heading,
   Icon,
} from '@chakra-ui/react';
import { PageContentWrapper } from '@ifixit/ui';
import type { Product } from '@models/product';
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa';

export type FAQSectionProps = {
   product: Product;
};

export function FAQSection({ product }: FAQSectionProps) {
   if (product.faqs.length === 0) {
      return null;
   }

   return (
      <Box bg="white" py="16">
         <PageContentWrapper>
            <Heading
               as="h2"
               fontFamily="Archivo Black"
               color="gray.700"
               textAlign="center"
               mb="16"
            >
               FAQs
            </Heading>
            <Accordion defaultIndex={[0]} allowMultiple>
               {product.faqs.map((faq, index) => {
                  return (
                     <FAQAccordionItem key={index}>
                        {({ isExpanded }) => {
                           return (
                              <>
                                 <h3>
                                    <AccordionButton p="5">
                                       <Box
                                          flex="1"
                                          textAlign="left"
                                          fontSize="lg"
                                          fontWeight="bold"
                                          color={
                                             isExpanded
                                                ? 'brand.500'
                                                : 'gray.900'
                                          }
                                       >
                                          {faq.question}
                                       </Box>
                                       {isExpanded ? (
                                          <Icon
                                             as={FaMinusCircle}
                                             color="brand.500"
                                          />
                                       ) : (
                                          <Icon
                                             as={FaPlusCircle}
                                             color="gray.500"
                                          />
                                       )}
                                    </AccordionButton>
                                 </h3>
                                 <AccordionPanel pb="5" color="gray.600">
                                    {faq.answer}
                                 </AccordionPanel>
                              </>
                           );
                        }}
                     </FAQAccordionItem>
                  );
               })}
            </Accordion>
         </PageContentWrapper>
      </Box>
   );
}

const FAQAccordionItem = forwardRef<AccordionItemProps, 'div'>((props, ref) => {
   return (
      <AccordionItem
         ref={ref}
         borderWidth="1px"
         borderColor="gray.200"
         bg="gray.50"
         rounded="md"
         my="4"
         {...props}
      />
   );
});
