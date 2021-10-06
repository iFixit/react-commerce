import * as React from 'react';

interface RangeFilterContext {
   getFacetHandles(): string[];
   registerFacet(handle: string): void;
   unregisterFacet(handle: string): void;
}

const RangeFilterContext = React.createContext<RangeFilterContext | null>(null);

export interface RangeFilterProps {}

export function RangeFilter({
   children,
}: React.PropsWithChildren<RangeFilterProps>) {
   const value = useRangeFilter();
   return (
      <RangeFilterContext.Provider value={value}>
         {children}
      </RangeFilterContext.Provider>
   );
}

function useRangeFilter(): RangeFilterContext {
   const facetNamesRef = React.useRef<string[]>([]);

   const getFacetNames = React.useCallback(() => {
      return facetNamesRef.current;
   }, []);

   const registerFacet = React.useCallback((name: string) => {
      if (!facetNamesRef.current.includes(name)) {
         facetNamesRef.current.push(name);
      }
   }, []);

   const unregisterFacet = React.useCallback((name: string) => {
      if (facetNamesRef.current.includes(name)) {
         return facetNamesRef.current.filter((facetName) => facetName !== name);
      }
   }, []);

   return {
      getFacetHandles: getFacetNames,
      registerFacet,
      unregisterFacet,
   };
}

export function useRangeFilterContext(): RangeFilterContext {
   const context = React.useContext(RangeFilterContext);
   if (context == null) {
      throw new Error(
         'RangeFilter components must be used within RangeFilter provider'
      );
   }
   return context;
}

export function useRegisterFacet(name: string) {
   const { registerFacet, unregisterFacet } = useRangeFilterContext();

   React.useEffect(() => {
      registerFacet(name);
      return () => unregisterFacet(name);
   }, [name, registerFacet, unregisterFacet]);
}
