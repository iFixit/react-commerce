import { Button, Flex, useToast, Text } from '@chakra-ui/react';
import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import {
   ComponentType,
   PropsWithChildren,
   ReactNode,
   createContext,
   useCallback,
   useContext,
   useEffect,
} from 'react';
import {
   Cookies as ReactCookies,
   CookiesProvider,
   useCookies,
} from 'react-cookie';

export enum Features {
   ShowFeatureToasts = 'show-feature-toasts',
}

export function getAllFeatures(): Features[] {
   return Object.values(Features);
}

type Cookies = {
   [key: string]: string;
};

export type WithSSRFeatureCookies<T> = T & { cookies: Cookies };

export type FeatureContext = {
   features: Features[];
   isEnabled: (feature: Features) => boolean;
   setEnabled: (feature: Features, enabled: boolean) => void;
   toggleFeature: (feature: Features) => void;
};

const FeatureContext = createContext<FeatureContext | null>(null);

export function useFeatureContext(): FeatureContext {
   const context = useContext(FeatureContext);
   if (!context) {
      throw new Error('useFeatureContext must be used within a FeatureContext');
   }
   return context;
}

function warn(message: string, color = 'orange') {
   console.log('%c' + message, 'color:' + color);
}

export function withSSRFeatureCookies<P>(
   getServerSideProps: (
      context: GetServerSidePropsContext
   ) => Promise<{ props: P }>
): (
   context: GetServerSidePropsContext
) => Promise<{ props: WithSSRFeatureCookies<P> }> {
   return async (context: GetServerSidePropsContext) => {
      const props = await getServerSideProps(context);

      const cookies = Object.fromEntries(
         Object.entries(context.req.cookies || {}).filter(
            ([_key, value]) => value !== undefined
         )
      ) as Cookies;

      const enabledViaQueryParams = getAllFeatures().filter((feature) =>
         getQueryBoolean(context.query[feature.toString()])
      );

      enabledViaQueryParams.forEach((feature) => {
         warn(`Feature '${feature}' is was ENABLED via query param`);
         cookies[feature.toString()] = 'true';
         context.res.setHeader(
            'Set-Cookie',
            `${feature.toString()}=true; Path=/`
         );
      });

      return {
         props: {
            ...props.props,
            cookies: cookies,
         },
      };
   };
}

export function WithFeatureContextProvider<
   P extends WithSSRFeatureCookies<{ children?: ReactNode }>
>(Component: ComponentType<P>) {
   return function (props: P) {
      return (
         <FeatureProvider cookies={props.cookies}>
            <Component {...props} />
         </FeatureProvider>
      );
   };
}

export function WithFeature({
   enabled,
   disabled,
   children,
}: {
   enabled?: Features;
   disabled?: Features;
   children?: ReactNode;
}) {
   if (enabled && disabled) {
      throw new Error('WithFeature: only pass enable or disable, not both');
   }
   const { isEnabled } = useFeatureContext();

   const featureToCheck = enabled || disabled;

   if (!featureToCheck) {
      return <>{children}</>;
   }

   const wantsFeature = isEnabled(featureToCheck);

   if (enabled && !wantsFeature) {
      return null;
   }
   if (disabled && wantsFeature) {
      return null;
   }

   return <>{children}</>;
}

type FeatureProviderProps = WithSSRFeatureCookies<{
   children?: ReactNode;
}>;

export const FeatureProvider = withCookieProvider<FeatureProviderProps>(
   function FeatureContextProvider({
      children,
   }: {
      children?: React.ReactNode;
   }) {
      const [cookies, setCookie, removeCookie] = useCookies();
      const features = getAllFeatures();

      const isEnabled = useCallback(
         (feature: Features) => {
            return cookies[feature.toString()] === 'true';
         },
         [cookies]
      );

      const setEnabled = useCallback(
         (feature: Features, enabled: boolean) => {
            if (!enabled) {
               removeCookie(feature.toString(), {
                  path: '/',
               });
               return;
            }

            setCookie(feature.toString(), enabled.toString(), {
               path: '/',
            });
         },
         [setCookie, removeCookie]
      );

      const toggleFeature = useCallback(
         (feature: Features) => {
            setEnabled(feature, !isEnabled(feature));
         },
         [setEnabled, isEnabled]
      );

      features.forEach((feature) => {
         const enabled = isEnabled(feature);
         warn(`Feature '${feature}' is ${enabled ? 'ENABLED' : 'DISABLED'}`);
      });

      const toast = useToast();

      useEffect(() => {
         if (!isEnabled(Features.ShowFeatureToasts)) {
            return;
         }

         const enabledFeatures = features.filter((feature) =>
            isEnabled(feature)
         );

         const disabledFeatures = features.filter(
            (feature) => !isEnabled(feature)
         );

         if (enabledFeatures.length || disabledFeatures.length) {
            toast.closeAll();
         }

         if (enabledFeatures.length) {
            toast({
               title: 'Enabled Features',
               description: (
                  <FeatureToastContent
                     features={enabledFeatures}
                     colorScheme="green"
                  />
               ),
               status: 'success',
               duration: 5000,
               isClosable: true,
            });
         }

         if (disabledFeatures.length) {
            toast({
               title: 'Disabled Features',
               description: (
                  <FeatureToastContent
                     features={disabledFeatures}
                     colorScheme="orange"
                  />
               ),
               status: 'warning',
               duration: 5000,
               isClosable: true,
            });
         }
      }, [features, isEnabled, toast]);
      const context = {
         features,
         isEnabled,
         setEnabled,
         toggleFeature,
      };

      return (
         <FeatureContext.Provider value={context}>
            {children}
         </FeatureContext.Provider>
      );
   }
);

function FeatureToastContent({
   features,
   colorScheme,
}: {
   features: Features[];
   colorScheme: string;
}) {
   return (
      <Flex flexDirection="column">
         {features.map((feature) => (
            <Text key={feature}>{feature}</Text>
         ))}
         <Button
            as={Link}
            size="sm"
            href="/dev/features"
            variant="solid"
            colorScheme={colorScheme}
         >
            See Features Page
         </Button>
      </Flex>
   );
}

function withCookieProvider<
   P extends {
      children?: ReactNode;
      cookies: {
         [key: string]: string;
      };
   }
>(Component: ComponentType<PropsWithChildren<P>>) {
   const isBrowser = typeof window !== 'undefined';
   return function (props: P) {
      return (
         <CookiesProvider
            cookies={isBrowser ? undefined : new ReactCookies(props.cookies)}
         >
            <Component {...props} />
         </CookiesProvider>
      );
   };
}

function getQueryBoolean(
   query: string | string[] | undefined | null,
   options: { considerEmptyAsTrue?: boolean } = { considerEmptyAsTrue: true }
): boolean {
   if (query === undefined || query === null) {
      return false;
   }

   if (Array.isArray(query)) {
      return query.some((q) => getQueryBoolean(q, options));
   }

   const boolValue = /true|0/i.test(query);

   return options.considerEmptyAsTrue ? query === '' : boolValue;
}
