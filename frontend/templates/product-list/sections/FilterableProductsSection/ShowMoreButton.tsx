import { Button } from '@chakra-ui/react';
import { faSort } from '@fortawesome/pro-solid-svg-icons';
import { FaIcon } from '@ifixit/icons';

type ShowMoreButtonProps = {
   isShowingMore: boolean;
   onClick?: () => void;
};

export function ShowMoreButton({
   isShowingMore,
   onClick,
}: ShowMoreButtonProps) {
   return (
      <Button
         variant="ghost"
         fontWeight="normal"
         leftIcon={<FaIcon icon={faSort} h="4" ml="1" color="gray.400" />}
         mt="3"
         p="0"
         w="full"
         justifyContent="flex-start"
         onClick={onClick}
      >
         {isShowingMore ? 'Show less' : 'Show more'}
      </Button>
   );
}
