import {
   Button,
   Modal,
   ModalBody,
   ModalContent,
   ModalFooter,
   ModalOverlay,
   Text,
} from '@chakra-ui/react';
import * as React from 'react';
import { CollectionFilters } from './CollectionFilters';
import { SearchInput } from './SearchInput';

type FiltersModalProps = {
   isOpen: boolean;
   onClose: () => void;
};

export function FiltersModal({ isOpen, onClose }: FiltersModalProps) {
   return (
      <Modal size="lg" isOpen={isOpen} onClose={onClose}>
         <ModalOverlay />
         <ModalContent>
            <ModalBody pt={6}>
               <SearchInput w="full" />
               <Text fontSize="2xl" my={4}>
                  Filters
               </Text>
               <CollectionFilters />
            </ModalBody>
            <ModalFooter flexDirection="column" alignItems="stretch">
               <Button colorScheme="blue" onClick={onClose}>
                  Apply filters
               </Button>
               <Button variant="outline" mt={4} onClick={onClose}>
                  Close
               </Button>
            </ModalFooter>
         </ModalContent>
      </Modal>
   );
}
