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
import { AppliedFilters } from './AppliedFilters';
import { FilterList } from './FilterList';

type FiltersModalProps = {
   isOpen: boolean;
   onClose: () => void;
};

export function FiltersModal({ isOpen, onClose }: FiltersModalProps) {
   const [canRenderList, setCanRenderList] = React.useState(false);
   const handleAnimationComplete = React.useCallback(() => {
      setCanRenderList((current) => !current);
   }, []);

   return (
      <Modal size="lg" isOpen={isOpen} onClose={onClose}>
         <ModalOverlay />
         <ModalContent onAnimationComplete={handleAnimationComplete}>
            <ModalBody pt={6}>
               <AppliedFilters pb="2" />
               <Box h="320px" mx="-6" overflow="hidden">
                  {canRenderList && <FilterList />}
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
