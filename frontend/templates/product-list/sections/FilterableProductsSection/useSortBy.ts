import { UseRefinementListProps } from 'react-instantsearch-hooks-web';

const sortByPriceRange: UseRefinementListProps['sortBy'] = (a, b) => {
   const aAvg = avg(a.escapedValue);
   const bAvg = avg(b.escapedValue);

   if (aAvg == null && bAvg == null) {
      return 0;
   }
   if (aAvg == null) {
      return 1;
   }
   if (bAvg == null) {
      return -1;
   }
   return aAvg - bAvg;
};

function avg(x: string): number | null {
   const nums = x.match(/\d+/g);
   if (nums == null) {
      return null;
   }
   return nums.reduce((x, y) => x + parseFloat(y), 0) / nums.length;
}

const sortByCapacityHighToLow: UseRefinementListProps['sortBy'] = (a, b) => {
   return capacityToBytes(b.escapedValue) - capacityToBytes(a.escapedValue);
};

const unitToBytes = {
   B: 1,
   KB: 1024,
   MB: 1024 ** 2,
   GB: 1024 ** 3,
   TB: 1024 ** 4,
   PB: 1024 ** 5,
};

function capacityToBytes(x: string): number {
   const size = parseFloat(x);
   if (isNaN(size)) {
      return 0;
   }
   const unit = (x.match(/[KMGTP]?B/)?.[0] ?? 'B') as keyof typeof unitToBytes;
   return size * (unitToBytes[unit] ?? 1);
}

const enCollator = new Intl.Collator('en');

const sortAlphabetically: UseRefinementListProps['sortBy'] = (a, b) => {
   return enCollator.compare(a.escapedValue, b.escapedValue);
};

export function useSortBy(
   props: Omit<UseRefinementListProps, 'sortBy'>
): UseRefinementListProps['sortBy'] {
   switch (props.attribute) {
      case 'price_range':
         return sortByPriceRange;
      case 'facet_tags.Capacity':
         return sortByCapacityHighToLow;
      case 'facet_tags.Item Type':
         return sortAlphabetically;
      default:
         return ['count:desc', 'name:asc'];
   }
}
