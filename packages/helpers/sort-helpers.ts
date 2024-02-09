export function compareAlphabetically(a: string, b: string) {
   const enCollator = new Intl.Collator('en');
   return enCollator.compare(a, b);
}

export function compareCapacity(a: string, b: string) {
   return capacityToBytes(b) - capacityToBytes(a);
}

export function comparePriceRangeFn(a: string, b: string) {
   const aAvg = avg(a);
   const bAvg = avg(b);

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
}

function avg(range: string): number | null {
   const nums = range.match(/\d+/g);
   if (nums == null) {
      return null;
   }
   return nums.reduce((x, y) => x + parseFloat(y), 0) / nums.length;
}

const unitToBytes = {
   B: 1,
   KB: 1024,
   MB: 1024 ** 2,
   GB: 1024 ** 3,
   TB: 1024 ** 4,
   PB: 1024 ** 5,
};

function capacityToBytes(text: string): number {
   const size = parseFloat(text);
   if (isNaN(size)) return 0;

   const unit = (text.match(/[KMGTP]?B/)?.[0] ??
      'B') as keyof typeof unitToBytes;
   return size * (unitToBytes[unit] ?? 1);
}
