import { z } from 'zod';
import {
   BooleanFilterInput,
   DateTimeFilterInput,
   IdFilterInput,
   IntFilterInput,
   ProductListFiltersInput,
   StringFilterInput,
} from './generated/sdk';

type Properties<T> = Required<{
   [K in keyof T]: z.ZodType<T[K], any, T[K]>;
}>;

export function BooleanFilterInputSchema(): z.ZodObject<
   Properties<BooleanFilterInput>
> {
   return z.object<Properties<BooleanFilterInput>>({
      and: z.array(z.boolean().nullable()).nullish(),
      between: z.array(z.boolean().nullable()).nullish(),
      contains: z.boolean().nullish(),
      containsi: z.boolean().nullish(),
      endsWith: z.boolean().nullish(),
      eq: z.boolean().nullish(),
      eqi: z.boolean().nullish(),
      gt: z.boolean().nullish(),
      gte: z.boolean().nullish(),
      in: z.array(z.boolean().nullable()).nullish(),
      lt: z.boolean().nullish(),
      lte: z.boolean().nullish(),
      ne: z.boolean().nullish(),
      not: z.lazy(() => BooleanFilterInputSchema().nullish()),
      notContains: z.boolean().nullish(),
      notContainsi: z.boolean().nullish(),
      notIn: z.array(z.boolean().nullable()).nullish(),
      notNull: z.boolean().nullish(),
      null: z.boolean().nullish(),
      or: z.array(z.boolean().nullable()).nullish(),
      startsWith: z.boolean().nullish(),
   });
}

export function DateTimeFilterInputSchema(): z.ZodObject<
   Properties<DateTimeFilterInput>
> {
   return z.object<Properties<DateTimeFilterInput>>({
      and: z.array(z.date().nullable()).nullish(),
      between: z.array(z.date().nullable()).nullish(),
      contains: z.date().nullish(),
      containsi: z.date().nullish(),
      endsWith: z.date().nullish(),
      eq: z.date().nullish(),
      eqi: z.date().nullish(),
      gt: z.date().nullish(),
      gte: z.date().nullish(),
      in: z.array(z.date().nullable()).nullish(),
      lt: z.date().nullish(),
      lte: z.date().nullish(),
      ne: z.date().nullish(),
      not: z.lazy(() => DateTimeFilterInputSchema().nullish()),
      notContains: z.date().nullish(),
      notContainsi: z.date().nullish(),
      notIn: z.array(z.date().nullable()).nullish(),
      notNull: z.boolean().nullish(),
      null: z.boolean().nullish(),
      or: z.array(z.date().nullable()).nullish(),
      startsWith: z.date().nullish(),
   });
}

export function IdFilterInputSchema(): z.ZodObject<Properties<IdFilterInput>> {
   return z.object<Properties<IdFilterInput>>({
      and: z.array(z.string().nullable()).nullish(),
      between: z.array(z.string().nullable()).nullish(),
      contains: z.string().nullish(),
      containsi: z.string().nullish(),
      endsWith: z.string().nullish(),
      eq: z.string().nullish(),
      eqi: z.string().nullish(),
      gt: z.string().nullish(),
      gte: z.string().nullish(),
      in: z.array(z.string().nullable()).nullish(),
      lt: z.string().nullish(),
      lte: z.string().nullish(),
      ne: z.string().nullish(),
      not: z.lazy(() => IdFilterInputSchema().nullish()),
      notContains: z.string().nullish(),
      notContainsi: z.string().nullish(),
      notIn: z.array(z.string().nullable()).nullish(),
      notNull: z.boolean().nullish(),
      null: z.boolean().nullish(),
      or: z.array(z.string().nullable()).nullish(),
      startsWith: z.string().nullish(),
   });
}

export function IntFilterInputSchema(): z.ZodObject<
   Properties<IntFilterInput>
> {
   return z.object<Properties<IntFilterInput>>({
      and: z.array(z.number().nullable()).nullish(),
      between: z.array(z.number().nullable()).nullish(),
      contains: z.number().nullish(),
      containsi: z.number().nullish(),
      endsWith: z.number().nullish(),
      eq: z.number().nullish(),
      eqi: z.number().nullish(),
      gt: z.number().nullish(),
      gte: z.number().nullish(),
      in: z.array(z.number().nullable()).nullish(),
      lt: z.number().nullish(),
      lte: z.number().nullish(),
      ne: z.number().nullish(),
      not: z.lazy(() => IntFilterInputSchema().nullish()),
      notContains: z.number().nullish(),
      notContainsi: z.number().nullish(),
      notIn: z.array(z.number().nullable()).nullish(),
      notNull: z.boolean().nullish(),
      null: z.boolean().nullish(),
      or: z.array(z.number().nullable()).nullish(),
      startsWith: z.number().nullish(),
   });
}

export function StringFilterInputSchema(): z.ZodObject<
   Properties<StringFilterInput>
> {
   return z.object<Properties<StringFilterInput>>({
      and: z.array(z.string().nullable()).nullish(),
      between: z.array(z.string().nullable()).nullish(),
      contains: z.string().nullish(),
      containsi: z.string().nullish(),
      endsWith: z.string().nullish(),
      eq: z.string().nullish(),
      eqi: z.string().nullish(),
      gt: z.string().nullish(),
      gte: z.string().nullish(),
      in: z.array(z.string().nullable()).nullish(),
      lt: z.string().nullish(),
      lte: z.string().nullish(),
      ne: z.string().nullish(),
      not: z.lazy(() => StringFilterInputSchema().nullish()),
      notContains: z.string().nullish(),
      notContainsi: z.string().nullish(),
      notIn: z.array(z.string().nullable()).nullish(),
      notNull: z.boolean().nullish(),
      null: z.boolean().nullish(),
      or: z.array(z.string().nullable()).nullish(),
      startsWith: z.string().nullish(),
   });
}

export function ProductListFiltersInputSchema(): z.ZodObject<
   Properties<ProductListFiltersInput>
> {
   return z.object<Properties<ProductListFiltersInput>>({
      and: z
         .array(z.lazy(() => ProductListFiltersInputSchema().nullable()))
         .nullish(),
      brandLogoWidth: z.lazy(() => IntFilterInputSchema().nullish()),
      children: z.lazy(() => ProductListFiltersInputSchema().nullish()),
      createdAt: z.lazy(() => DateTimeFilterInputSchema().nullish()),
      defaultShowAllChildrenOnLgSizes: z.lazy(() =>
         BooleanFilterInputSchema().nullish()
      ),
      description: z.lazy(() => StringFilterInputSchema().nullish()),
      deviceTitle: z.lazy(() => StringFilterInputSchema().nullish()),
      filters: z.lazy(() => StringFilterInputSchema().nullish()),
      forceNoindex: z.lazy(() => BooleanFilterInputSchema().nullish()),
      h1: z.lazy(() => StringFilterInputSchema().nullish()),
      handle: z.lazy(() => StringFilterInputSchema().nullish()),
      hideFromParent: z.lazy(() => BooleanFilterInputSchema().nullish()),
      id: z.lazy(() => IdFilterInputSchema().nullish()),
      legacyDescription: z.lazy(() => StringFilterInputSchema().nullish()),
      legacyPageId: z.lazy(() => IntFilterInputSchema().nullish()),
      locale: z.lazy(() => StringFilterInputSchema().nullish()),
      localizations: z.lazy(() => ProductListFiltersInputSchema().nullish()),
      metaDescription: z.lazy(() => StringFilterInputSchema().nullish()),
      metaTitle: z.lazy(() => StringFilterInputSchema().nullish()),
      not: z.lazy(() => ProductListFiltersInputSchema().nullish()),
      or: z
         .array(z.lazy(() => ProductListFiltersInputSchema().nullable()))
         .nullish(),
      parent: z.lazy(() => ProductListFiltersInputSchema().nullish()),
      publishedAt: z.lazy(() => DateTimeFilterInputSchema().nullish()),
      sortPriority: z.lazy(() => IntFilterInputSchema().nullish()),
      tagline: z.lazy(() => StringFilterInputSchema().nullish()),
      title: z.lazy(() => StringFilterInputSchema().nullish()),
      type: z.lazy(() => StringFilterInputSchema().nullish()),
      updatedAt: z.lazy(() => DateTimeFilterInputSchema().nullish()),
   });
}
