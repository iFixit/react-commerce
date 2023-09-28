import { SingleSelect, SingleSelectOption } from '@strapi/design-system';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import type { FindManyContentTypesResult } from '../../../server/services/content-types';

export interface SelectCollectionTypeProps {
   selected: string | null;
   onChange: (value: string | null) => void;
}

export function SelectCollectionType({
   selected,
   onChange,
}: SelectCollectionTypeProps) {
   const collectionTypesQuery = useQuery<FindManyContentTypesResult>({
      queryKey: ['content-types?kind=collectionType'],
   });
   return (
      <SingleSelect
         label="Collection type"
         name="collectionType"
         required
         placeholder="Select collection type"
         disabled={collectionTypesQuery.isLoading}
         value={selected}
         onChange={onChange}
      >
         {collectionTypesQuery.data?.map((collectionType) => {
            return (
               <SingleSelectOption
                  key={collectionType.uid}
                  value={collectionType.uid}
               >
                  {collectionType.info.displayName}
               </SingleSelectOption>
            );
         })}
      </SingleSelect>
   );
}

export function useCollectionType(uid: string) {
   const collectionTypesQuery = useQuery<FindManyContentTypesResult>({
      queryKey: ['content-types?kind=collectionType'],
   });

   return collectionTypesQuery.data?.find(
      (collectionType) => collectionType.uid === uid
   );
}
