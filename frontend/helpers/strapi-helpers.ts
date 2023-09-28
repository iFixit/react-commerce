export function createSectionId<T extends { __typename: string; id: string }>(
   section: T
): string;
export function createSectionId<
   T extends { __typename?: string | null; id?: string | null }
>(section: T | null | undefined): string | null;
export function createSectionId<
   T extends { __typename?: string | null; id: string }
>(section: T | null | undefined): string | null {
   if (section == null) return null;
   if (section.__typename == null || section.id == null) return null;

   return `${section.__typename}-${section.id}`;
}
