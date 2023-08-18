import { DefaultLayout } from '@layouts/default';
import {
   FeatureProvider,
   Features,
   getAllFeatures,
   useFeatureContext,
} from '@components/common/Feature';
import {
   Container,
   FormControl,
   FormLabel,
   SimpleGrid,
   Switch,
} from '@chakra-ui/react';
import { FeaturesSSRProps } from '@pages/dev/features';

const FeatureTemplate: NextPageWithLayout<FeaturesSSRProps> = ({ cookies }) => {
   const features = getAllFeatures();
   return (
      <FeatureProvider cookies={cookies}>
         <Container maxW="container.lg">
            <FormControl as={SimpleGrid} columns={{ base: 2, lg: 4 }}>
               {features.map((feature) => (
                  <FeatureSwitch key={feature} feature={feature} />
               ))}
            </FormControl>
         </Container>
      </FeatureProvider>
   );
};

function FeatureSwitch({ feature }: { feature: Features }) {
   const { isEnabled, toggleFeature } = useFeatureContext();
   return (
      <>
         <FormLabel htmlFor={feature}>{feature}:</FormLabel>
         <Switch
            isChecked={isEnabled(feature)}
            onChange={() => toggleFeature(feature)}
         />
      </>
   );
}

FeatureTemplate.getLayout = function getLayout(page, pageProps) {
   return <DefaultLayout {...pageProps.layoutProps}>{page}</DefaultLayout>;
};

export default FeatureTemplate;
