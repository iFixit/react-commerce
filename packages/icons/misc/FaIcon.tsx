import { chakra, forwardRef } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FactoryFaIcon = chakra(FontAwesomeIcon);
export type FaIconProps = React.ComponentProps<typeof FactoryFaIcon>;

export const FaIcon = forwardRef<FaIconProps, 'svg'>((props, ref) => {
   return <FactoryFaIcon {...props} forwardedRef={ref} />;
});
