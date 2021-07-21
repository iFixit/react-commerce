import {
   Box,
   Button,
   Modal,
   ModalBody,
   ModalContent,
   ModalFooter,
   ModalOverlay,
} from '@chakra-ui/react';
import * as React from 'react';
import { CollectionFilters } from './CollectionFilters';

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
               <Box h="320px" mx="-6">
                  <CollectionFilters />
               </Box>
            </ModalBody>
            <ModalFooter flexDirection="column" alignItems="stretch">
               <Button colorScheme="blue" onClick={onClose}>
                  Apply filters
               </Button>
            </ModalFooter>
         </ModalContent>
      </Modal>
   );
}
