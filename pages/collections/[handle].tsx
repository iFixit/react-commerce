import {
   Collection,
   DefaultCollectionView,
   loadCollection,
   PartsCollectionView,
} from '@features/collection';
import { GetServerSideProps } from 'next';
import React from 'react';

type CollectionPageProps = {
   type: 'default' | 'parts';
   collection: Collection;
};

export const getServerSideProps: GetServerSideProps<CollectionPageProps> = async (
   context
) => {
   const { handle } = context.params || {};
   if (typeof handle !== 'string') {
      return {
         notFound: true,
      };
   }
   const collection = await loadCollection(handle);
   if (collection == null) {
      return {
         notFound: true,
      };
   }
   return {
      props: {
         collection,
         type: handle === 'parts' ? 'parts' : 'default',
      },
   };
};

export default function CollectionPage({
   collection,
   type,
}: CollectionPageProps) {
   switch (type) {
      case 'parts': {
         return <PartsCollectionView collection={collection} />;
      }
      default: {
         return <DefaultCollectionView collection={collection} />;
      }
   }
}
