import { capitalize } from '@helpers/application-helpers';

const FACETS_NAME_OVERRIDES: { [rawName: string]: string } = {
   price_range: 'Price Range',
};

export function formatFacetName(algoliaName: string): string {
   if (FACETS_NAME_OVERRIDES[algoliaName] == null) {
      let name = algoliaName.replace(/(options\.|facet_tags\.)/gi, '');
      name = name.replace(/_/g, ' ');
      name = capitalize(name);
      return name;
   }
   return FACETS_NAME_OVERRIDES[algoliaName];
}
