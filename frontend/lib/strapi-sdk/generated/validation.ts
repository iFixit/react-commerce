import { z } from 'zod';
import {
   BannerFiltersInput,
   BannerInput,
   BooleanFilterInput,
   CompanyFiltersInput,
   CompanyInput,
   ComponentGlobalNewsletterFormInput,
   ComponentGlobalPersonFiltersInput,
   ComponentPageCallToActionFiltersInput,
   ComponentPageCallToActionInput,
   ComponentPageCategoryFiltersInput,
   ComponentPagePressQuoteFiltersInput,
   ComponentPageStatItemFiltersInput,
   ComponentSectionQuoteCardFiltersInput,
   ComponentStoreFooterFiltersInput,
   ComponentStoreFooterInput,
   ComponentStoreHeaderFiltersInput,
   ComponentStoreHeaderInput,
   ComponentStoreShopifySettingsFiltersInput,
   ComponentStoreShopifySettingsInput,
   ComponentStoreSocialMediaAccountsFiltersInput,
   ComponentStoreSocialMediaAccountsInput,
   DateTimeFilterInput,
   Enum_Componentpagesplitwithimage_Imageposition,
   Enum_Componentsectionfeaturedproducts_Background,
   Enum_Productlist_Type,
   Enum_Store_Currency,
   FaqFiltersInput,
   FaqInput,
   FileInfoInput,
   FloatFilterInput,
   GlobalInput,
   I18NLocaleFiltersInput,
   IdFilterInput,
   IntFilterInput,
   JsonFilterInput,
   MenuFiltersInput,
   MenuInput,
   PageFiltersInput,
   PageInput,
   PaginationArg,
   ProductFiltersInput,
   ProductInput,
   ProductListFiltersInput,
   ProductListInput,
   PublicationState,
   SocialPostFiltersInput,
   SocialPostInput,
   StoreFiltersInput,
   StoreInput,
   StringFilterInput,
   UploadFileFiltersInput,
   UploadFileInput,
   UploadFolderFiltersInput,
   UploadFolderInput,
   UsersPermissionsLoginInput,
   UsersPermissionsPermissionFiltersInput,
   UsersPermissionsRegisterInput,
   UsersPermissionsRoleFiltersInput,
   UsersPermissionsRoleInput,
   UsersPermissionsUserFiltersInput,
   UsersPermissionsUserInput,
} from './sdk';

type Properties<T> = Required<{
   [K in keyof T]: z.ZodType<T[K], any, T[K]>;
}>;

type definedNonNullAny = {};

export const isDefinedNonNullAny = (v: any): v is definedNonNullAny =>
   v !== undefined && v !== null;

export const definedNonNullAnySchema = z
   .any()
   .refine((v) => isDefinedNonNullAny(v));

export function BannerFiltersInputSchema(): z.ZodObject<
   Properties<BannerFiltersInput>
> {
   return z.object<Properties<BannerFiltersInput>>({
      and: z.array(z.lazy(() => definedNonNullAnySchema.nullable())).nullish(),
      callToAction: z.lazy(() => definedNonNullAnySchema.nullish()),
      createdAt: z.lazy(() => definedNonNullAnySchema.nullish()),
      description: z.lazy(() => definedNonNullAnySchema.nullish()),
      id: z.lazy(() => definedNonNullAnySchema.nullish()),
      label: z.lazy(() => definedNonNullAnySchema.nullish()),
      locale: z.lazy(() => definedNonNullAnySchema.nullish()),
      localizations: z.lazy(() => definedNonNullAnySchema.nullish()),
      not: z.lazy(() => definedNonNullAnySchema.nullish()),
      or: z.array(z.lazy(() => definedNonNullAnySchema.nullable())).nullish(),
      publishedAt: z.lazy(() => definedNonNullAnySchema.nullish()),
      title: z.lazy(() => definedNonNullAnySchema.nullish()),
      updatedAt: z.lazy(() => definedNonNullAnySchema.nullish()),
   });
}

export function BannerInputSchema(): z.ZodObject<Properties<BannerInput>> {
   return z.object<Properties<BannerInput>>({
      callToAction: z.lazy(() => definedNonNullAnySchema.nullish()),
      description: z.string().nullish(),
      image: z.string().nullish(),
      label: z.string().nullish(),
      publishedAt: definedNonNullAnySchema.nullish(),
      title: z.string().nullish(),
   });
}

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
      not: z.lazy(() => definedNonNullAnySchema.nullish()),
      notContains: z.boolean().nullish(),
      notContainsi: z.boolean().nullish(),
      notIn: z.array(z.boolean().nullable()).nullish(),
      notNull: z.boolean().nullish(),
      null: z.boolean().nullish(),
      or: z.array(z.boolean().nullable()).nullish(),
      startsWith: z.boolean().nullish(),
   });
}

export function CompanyFiltersInputSchema(): z.ZodObject<
   Properties<CompanyFiltersInput>
> {
   return z.object<Properties<CompanyFiltersInput>>({
      and: z.array(z.lazy(() => definedNonNullAnySchema.nullable())).nullish(),
      createdAt: z.lazy(() => definedNonNullAnySchema.nullish()),
      id: z.lazy(() => definedNonNullAnySchema.nullish()),
      name: z.lazy(() => definedNonNullAnySchema.nullish()),
      not: z.lazy(() => definedNonNullAnySchema.nullish()),
      or: z.array(z.lazy(() => definedNonNullAnySchema.nullable())).nullish(),
      publishedAt: z.lazy(() => definedNonNullAnySchema.nullish()),
      updatedAt: z.lazy(() => definedNonNullAnySchema.nullish()),
   });
}

export function CompanyInputSchema(): z.ZodObject<Properties<CompanyInput>> {
   return z.object<Properties<CompanyInput>>({
      logo: z.string().nullish(),
      name: z.string().nullish(),
      publishedAt: definedNonNullAnySchema.nullish(),
   });
}

export function ComponentGlobalNewsletterFormInputSchema(): z.ZodObject<
   Properties<ComponentGlobalNewsletterFormInput>
> {
   return z.object<Properties<ComponentGlobalNewsletterFormInput>>({
      callToActionButtonTitle: z.string().nullish(),
      id: z.string().nullish(),
      inputPlaceholder: z.string().nullish(),
      subtitle: z.string().nullish(),
      title: z.string().nullish(),
   });
}

export function ComponentGlobalPersonFiltersInputSchema(): z.ZodObject<
   Properties<ComponentGlobalPersonFiltersInput>
> {
   return z.object<Properties<ComponentGlobalPersonFiltersInput>>({
      and: z.array(z.lazy(() => definedNonNullAnySchema.nullable())).nullish(),
      name: z.lazy(() => definedNonNullAnySchema.nullish()),
      not: z.lazy(() => definedNonNullAnySchema.nullish()),
      or: z.array(z.lazy(() => definedNonNullAnySchema.nullable())).nullish(),
      role: z.lazy(() => definedNonNullAnySchema.nullish()),
   });
}

export function ComponentPageCallToActionFiltersInputSchema(): z.ZodObject<
   Properties<ComponentPageCallToActionFiltersInput>
> {
   return z.object<Properties<ComponentPageCallToActionFiltersInput>>({
      and: z.array(z.lazy(() => definedNonNullAnySchema.nullable())).nullish(),
      not: z.lazy(() => definedNonNullAnySchema.nullish()),
      or: z.array(z.lazy(() => definedNonNullAnySchema.nullable())).nullish(),
      title: z.lazy(() => definedNonNullAnySchema.nullish()),
      url: z.lazy(() => definedNonNullAnySchema.nullish()),
   });
}

export function ComponentPageCallToActionInputSchema(): z.ZodObject<
   Properties<ComponentPageCallToActionInput>
> {
   return z.object<Properties<ComponentPageCallToActionInput>>({
      id: z.string().nullish(),
      title: z.string().nullish(),
      url: z.string().nullish(),
   });
}

export function ComponentPageCategoryFiltersInputSchema(): z.ZodObject<
   Properties<ComponentPageCategoryFiltersInput>
> {
   return z.object<Properties<ComponentPageCategoryFiltersInput>>({
      and: z.array(z.lazy(() => definedNonNullAnySchema.nullable())).nullish(),
      description: z.lazy(() => definedNonNullAnySchema.nullish()),
      not: z.lazy(() => definedNonNullAnySchema.nullish()),
      or: z.array(z.lazy(() => definedNonNullAnySchema.nullable())).nullish(),
      productList: z.lazy(() => definedNonNullAnySchema.nullish()),
   });
}

export function ComponentPagePressQuoteFiltersInputSchema(): z.ZodObject<
   Properties<ComponentPagePressQuoteFiltersInput>
> {
   return z.object<Properties<ComponentPagePressQuoteFiltersInput>>({
      and: z.array(z.lazy(() => definedNonNullAnySchema.nullable())).nullish(),
      company: z.lazy(() => definedNonNullAnySchema.nullish()),
      not: z.lazy(() => definedNonNullAnySchema.nullish()),
      or: z.array(z.lazy(() => definedNonNullAnySchema.nullable())).nullish(),
      text: z.lazy(() => definedNonNullAnySchema.nullish()),
   });
}

export function ComponentPageStatItemFiltersInputSchema(): z.ZodObject<
   Properties<ComponentPageStatItemFiltersInput>
> {
   return z.object<Properties<ComponentPageStatItemFiltersInput>>({
      and: z.array(z.lazy(() => definedNonNullAnySchema.nullable())).nullish(),
      label: z.lazy(() => definedNonNullAnySchema.nullish()),
      not: z.lazy(() => definedNonNullAnySchema.nullish()),
      or: z.array(z.lazy(() => definedNonNullAnySchema.nullable())).nullish(),
      value: z.lazy(() => definedNonNullAnySchema.nullish()),
   });
}

export function ComponentSectionQuoteCardFiltersInputSchema(): z.ZodObject<
   Properties<ComponentSectionQuoteCardFiltersInput>
> {
   return z.object<Properties<ComponentSectionQuoteCardFiltersInput>>({
      and: z.array(z.lazy(() => definedNonNullAnySchema.nullable())).nullish(),
      author: z.lazy(() => definedNonNullAnySchema.nullish()),
      not: z.lazy(() => definedNonNullAnySchema.nullish()),
      or: z.array(z.lazy(() => definedNonNullAnySchema.nullable())).nullish(),
      text: z.lazy(() => definedNonNullAnySchema.nullish()),
   });
}

export function ComponentStoreFooterFiltersInputSchema(): z.ZodObject<
   Properties<ComponentStoreFooterFiltersInput>
> {
   return z.object<Properties<ComponentStoreFooterFiltersInput>>({
      and: z.array(z.lazy(() => definedNonNullAnySchema.nullable())).nullish(),
      bottomMenu: z.lazy(() => definedNonNullAnySchema.nullish()),
      menu1: z.lazy(() => definedNonNullAnySchema.nullish()),
      menu2: z.lazy(() => definedNonNullAnySchema.nullish()),
      menu3: z.lazy(() => definedNonNullAnySchema.nullish()),
      not: z.lazy(() => definedNonNullAnySchema.nullish()),
      or: z.array(z.lazy(() => definedNonNullAnySchema.nullable())).nullish(),
      partners: z.lazy(() => definedNonNullAnySchema.nullish()),
   });
}

export function ComponentStoreFooterInputSchema(): z.ZodObject<
   Properties<ComponentStoreFooterInput>
> {
   return z.object<Properties<ComponentStoreFooterInput>>({
      bottomMenu: z.string().nullish(),
      id: z.string().nullish(),
      menu1: z.string().nullish(),
      menu2: z.string().nullish(),
      menu3: z.string().nullish(),
      partners: z.string().nullish(),
   });
}

export function ComponentStoreHeaderFiltersInputSchema(): z.ZodObject<
   Properties<ComponentStoreHeaderFiltersInput>
> {
   return z.object<Properties<ComponentStoreHeaderFiltersInput>>({
      and: z.array(z.lazy(() => definedNonNullAnySchema.nullable())).nullish(),
      menu: z.lazy(() => definedNonNullAnySchema.nullish()),
      not: z.lazy(() => definedNonNullAnySchema.nullish()),
      or: z.array(z.lazy(() => definedNonNullAnySchema.nullable())).nullish(),
   });
}

export function ComponentStoreHeaderInputSchema(): z.ZodObject<
   Properties<ComponentStoreHeaderInput>
> {
   return z.object<Properties<ComponentStoreHeaderInput>>({
      id: z.string().nullish(),
      menu: z.string().nullish(),
   });
}

export function ComponentStoreShopifySettingsFiltersInputSchema(): z.ZodObject<
   Properties<ComponentStoreShopifySettingsFiltersInput>
> {
   return z.object<Properties<ComponentStoreShopifySettingsFiltersInput>>({
      and: z.array(z.lazy(() => definedNonNullAnySchema.nullable())).nullish(),
      delegateAccessToken: z.lazy(() => definedNonNullAnySchema.nullish()),
      not: z.lazy(() => definedNonNullAnySchema.nullish()),
      or: z.array(z.lazy(() => definedNonNullAnySchema.nullable())).nullish(),
      storefrontAccessToken: z.lazy(() => definedNonNullAnySchema.nullish()),
      storefrontDomain: z.lazy(() => definedNonNullAnySchema.nullish()),
   });
}

export function ComponentStoreShopifySettingsInputSchema(): z.ZodObject<
   Properties<ComponentStoreShopifySettingsInput>
> {
   return z.object<Properties<ComponentStoreShopifySettingsInput>>({
      delegateAccessToken: z.string().nullish(),
      id: z.string().nullish(),
      storefrontAccessToken: z.string().nullish(),
      storefrontDomain: z.string().nullish(),
   });
}

export function ComponentStoreSocialMediaAccountsFiltersInputSchema(): z.ZodObject<
   Properties<ComponentStoreSocialMediaAccountsFiltersInput>
> {
   return z.object<Properties<ComponentStoreSocialMediaAccountsFiltersInput>>({
      and: z.array(z.lazy(() => definedNonNullAnySchema.nullable())).nullish(),
      facebook: z.lazy(() => definedNonNullAnySchema.nullish()),
      instagram: z.lazy(() => definedNonNullAnySchema.nullish()),
      not: z.lazy(() => definedNonNullAnySchema.nullish()),
      or: z.array(z.lazy(() => definedNonNullAnySchema.nullable())).nullish(),
      repairOrg: z.lazy(() => definedNonNullAnySchema.nullish()),
      tiktok: z.lazy(() => definedNonNullAnySchema.nullish()),
      twitter: z.lazy(() => definedNonNullAnySchema.nullish()),
      youtube: z.lazy(() => definedNonNullAnySchema.nullish()),
   });
}

export function ComponentStoreSocialMediaAccountsInputSchema(): z.ZodObject<
   Properties<ComponentStoreSocialMediaAccountsInput>
> {
   return z.object<Properties<ComponentStoreSocialMediaAccountsInput>>({
      facebook: z.string().nullish(),
      id: z.string().nullish(),
      instagram: z.string().nullish(),
      repairOrg: z.string().nullish(),
      tiktok: z.string().nullish(),
      twitter: z.string().nullish(),
      youtube: z.string().nullish(),
   });
}

export function DateTimeFilterInputSchema(): z.ZodObject<
   Properties<DateTimeFilterInput>
> {
   return z.object<Properties<DateTimeFilterInput>>({
      and: z.array(definedNonNullAnySchema.nullable()).nullish(),
      between: z.array(definedNonNullAnySchema.nullable()).nullish(),
      contains: definedNonNullAnySchema.nullish(),
      containsi: definedNonNullAnySchema.nullish(),
      endsWith: definedNonNullAnySchema.nullish(),
      eq: definedNonNullAnySchema.nullish(),
      eqi: definedNonNullAnySchema.nullish(),
      gt: definedNonNullAnySchema.nullish(),
      gte: definedNonNullAnySchema.nullish(),
      in: z.array(definedNonNullAnySchema.nullable()).nullish(),
      lt: definedNonNullAnySchema.nullish(),
      lte: definedNonNullAnySchema.nullish(),
      ne: definedNonNullAnySchema.nullish(),
      not: z.lazy(() => definedNonNullAnySchema.nullish()),
      notContains: definedNonNullAnySchema.nullish(),
      notContainsi: definedNonNullAnySchema.nullish(),
      notIn: z.array(definedNonNullAnySchema.nullable()).nullish(),
      notNull: z.boolean().nullish(),
      null: z.boolean().nullish(),
      or: z.array(definedNonNullAnySchema.nullable()).nullish(),
      startsWith: definedNonNullAnySchema.nullish(),
   });
}

export const Enum_Componentpagesplitwithimage_ImagepositionSchema =
   z.nativeEnum(Enum_Componentpagesplitwithimage_Imageposition);

export const Enum_Componentsectionfeaturedproducts_BackgroundSchema =
   z.nativeEnum(Enum_Componentsectionfeaturedproducts_Background);

export const Enum_Productlist_TypeSchema = z.nativeEnum(Enum_Productlist_Type);

export const Enum_Store_CurrencySchema = z.nativeEnum(Enum_Store_Currency);

export function FaqFiltersInputSchema(): z.ZodObject<
   Properties<FaqFiltersInput>
> {
   return z.object<Properties<FaqFiltersInput>>({
      and: z.array(z.lazy(() => definedNonNullAnySchema.nullable())).nullish(),
      answer: z.lazy(() => definedNonNullAnySchema.nullish()),
      createdAt: z.lazy(() => definedNonNullAnySchema.nullish()),
      id: z.lazy(() => definedNonNullAnySchema.nullish()),
      not: z.lazy(() => definedNonNullAnySchema.nullish()),
      or: z.array(z.lazy(() => definedNonNullAnySchema.nullable())).nullish(),
      publishedAt: z.lazy(() => definedNonNullAnySchema.nullish()),
      question: z.lazy(() => definedNonNullAnySchema.nullish()),
      updatedAt: z.lazy(() => definedNonNullAnySchema.nullish()),
   });
}

export function FaqInputSchema(): z.ZodObject<Properties<FaqInput>> {
   return z.object<Properties<FaqInput>>({
      answer: z.string().nullish(),
      publishedAt: definedNonNullAnySchema.nullish(),
      question: z.string().nullish(),
   });
}

export function FileInfoInputSchema(): z.ZodObject<Properties<FileInfoInput>> {
   return z.object<Properties<FileInfoInput>>({
      alternativeText: z.string().nullish(),
      caption: z.string().nullish(),
      name: z.string().nullish(),
   });
}

export function FloatFilterInputSchema(): z.ZodObject<
   Properties<FloatFilterInput>
> {
   return z.object<Properties<FloatFilterInput>>({
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
      not: z.lazy(() => definedNonNullAnySchema.nullish()),
      notContains: z.number().nullish(),
      notContainsi: z.number().nullish(),
      notIn: z.array(z.number().nullable()).nullish(),
      notNull: z.boolean().nullish(),
      null: z.boolean().nullish(),
      or: z.array(z.number().nullable()).nullish(),
      startsWith: z.number().nullish(),
   });
}

export function GlobalInputSchema(): z.ZodObject<Properties<GlobalInput>> {
   return z.object<Properties<GlobalInput>>({
      newsletterForm: z.lazy(() => definedNonNullAnySchema.nullish()),
      publishedAt: definedNonNullAnySchema.nullish(),
   });
}

export function I18NLocaleFiltersInputSchema(): z.ZodObject<
   Properties<I18NLocaleFiltersInput>
> {
   return z.object<Properties<I18NLocaleFiltersInput>>({
      and: z.array(z.lazy(() => definedNonNullAnySchema.nullable())).nullish(),
      code: z.lazy(() => definedNonNullAnySchema.nullish()),
      createdAt: z.lazy(() => definedNonNullAnySchema.nullish()),
      id: z.lazy(() => definedNonNullAnySchema.nullish()),
      name: z.lazy(() => definedNonNullAnySchema.nullish()),
      not: z.lazy(() => definedNonNullAnySchema.nullish()),
      or: z.array(z.lazy(() => definedNonNullAnySchema.nullable())).nullish(),
      updatedAt: z.lazy(() => definedNonNullAnySchema.nullish()),
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
      not: z.lazy(() => definedNonNullAnySchema.nullish()),
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
      not: z.lazy(() => definedNonNullAnySchema.nullish()),
      notContains: z.number().nullish(),
      notContainsi: z.number().nullish(),
      notIn: z.array(z.number().nullable()).nullish(),
      notNull: z.boolean().nullish(),
      null: z.boolean().nullish(),
      or: z.array(z.number().nullable()).nullish(),
      startsWith: z.number().nullish(),
   });
}

export function JsonFilterInputSchema(): z.ZodObject<
   Properties<JsonFilterInput>
> {
   return z.object<Properties<JsonFilterInput>>({
      and: z.array(definedNonNullAnySchema.nullable()).nullish(),
      between: z.array(definedNonNullAnySchema.nullable()).nullish(),
      contains: definedNonNullAnySchema.nullish(),
      containsi: definedNonNullAnySchema.nullish(),
      endsWith: definedNonNullAnySchema.nullish(),
      eq: definedNonNullAnySchema.nullish(),
      eqi: definedNonNullAnySchema.nullish(),
      gt: definedNonNullAnySchema.nullish(),
      gte: definedNonNullAnySchema.nullish(),
      in: z.array(definedNonNullAnySchema.nullable()).nullish(),
      lt: definedNonNullAnySchema.nullish(),
      lte: definedNonNullAnySchema.nullish(),
      ne: definedNonNullAnySchema.nullish(),
      not: z.lazy(() => definedNonNullAnySchema.nullish()),
      notContains: definedNonNullAnySchema.nullish(),
      notContainsi: definedNonNullAnySchema.nullish(),
      notIn: z.array(definedNonNullAnySchema.nullable()).nullish(),
      notNull: z.boolean().nullish(),
      null: z.boolean().nullish(),
      or: z.array(definedNonNullAnySchema.nullable()).nullish(),
      startsWith: definedNonNullAnySchema.nullish(),
   });
}

export function MenuFiltersInputSchema(): z.ZodObject<
   Properties<MenuFiltersInput>
> {
   return z.object<Properties<MenuFiltersInput>>({
      and: z.array(z.lazy(() => definedNonNullAnySchema.nullable())).nullish(),
      createdAt: z.lazy(() => definedNonNullAnySchema.nullish()),
      id: z.lazy(() => definedNonNullAnySchema.nullish()),
      locale: z.lazy(() => definedNonNullAnySchema.nullish()),
      localizations: z.lazy(() => definedNonNullAnySchema.nullish()),
      not: z.lazy(() => definedNonNullAnySchema.nullish()),
      or: z.array(z.lazy(() => definedNonNullAnySchema.nullable())).nullish(),
      publishedAt: z.lazy(() => definedNonNullAnySchema.nullish()),
      title: z.lazy(() => definedNonNullAnySchema.nullish()),
      updatedAt: z.lazy(() => definedNonNullAnySchema.nullish()),
   });
}

export function MenuInputSchema(): z.ZodObject<Properties<MenuInput>> {
   return z.object<Properties<MenuInput>>({
      items: z.array(z.lazy(() => definedNonNullAnySchema)).nullish(),
      publishedAt: definedNonNullAnySchema.nullish(),
      title: z.string().nullish(),
   });
}

export function PageFiltersInputSchema(): z.ZodObject<
   Properties<PageFiltersInput>
> {
   return z.object<Properties<PageFiltersInput>>({
      and: z.array(z.lazy(() => definedNonNullAnySchema.nullable())).nullish(),
      createdAt: z.lazy(() => definedNonNullAnySchema.nullish()),
      id: z.lazy(() => definedNonNullAnySchema.nullish()),
      locale: z.lazy(() => definedNonNullAnySchema.nullish()),
      localizations: z.lazy(() => definedNonNullAnySchema.nullish()),
      not: z.lazy(() => definedNonNullAnySchema.nullish()),
      or: z.array(z.lazy(() => definedNonNullAnySchema.nullable())).nullish(),
      path: z.lazy(() => definedNonNullAnySchema.nullish()),
      publishedAt: z.lazy(() => definedNonNullAnySchema.nullish()),
      title: z.lazy(() => definedNonNullAnySchema.nullish()),
      updatedAt: z.lazy(() => definedNonNullAnySchema.nullish()),
   });
}

export function PageInputSchema(): z.ZodObject<Properties<PageInput>> {
   return z.object<Properties<PageInput>>({
      path: z.string().nullish(),
      publishedAt: definedNonNullAnySchema.nullish(),
      sections: z.array(z.lazy(() => definedNonNullAnySchema)).nullish(),
      title: z.string().nullish(),
   });
}

export function PaginationArgSchema(): z.ZodObject<Properties<PaginationArg>> {
   return z.object<Properties<PaginationArg>>({
      limit: z.number().nullish(),
      page: z.number().nullish(),
      pageSize: z.number().nullish(),
      start: z.number().nullish(),
   });
}

export function ProductFiltersInputSchema(): z.ZodObject<
   Properties<ProductFiltersInput>
> {
   return z.object<Properties<ProductFiltersInput>>({
      and: z.array(z.lazy(() => definedNonNullAnySchema.nullable())).nullish(),
      createdAt: z.lazy(() => definedNonNullAnySchema.nullish()),
      handle: z.lazy(() => definedNonNullAnySchema.nullish()),
      id: z.lazy(() => definedNonNullAnySchema.nullish()),
      not: z.lazy(() => definedNonNullAnySchema.nullish()),
      or: z.array(z.lazy(() => definedNonNullAnySchema.nullable())).nullish(),
      publishedAt: z.lazy(() => definedNonNullAnySchema.nullish()),
      updatedAt: z.lazy(() => definedNonNullAnySchema.nullish()),
   });
}

export function ProductInputSchema(): z.ZodObject<Properties<ProductInput>> {
   return z.object<Properties<ProductInput>>({
      handle: z.string().nullish(),
      publishedAt: definedNonNullAnySchema.nullish(),
      sections: z.array(z.lazy(() => definedNonNullAnySchema)).nullish(),
   });
}

export function ProductListFiltersInputSchema(): z.ZodObject<
   Properties<ProductListFiltersInput>
> {
   return z.object<Properties<ProductListFiltersInput>>({
      and: z.array(z.lazy(() => definedNonNullAnySchema.nullable())).nullish(),
      brandLogoWidth: z.lazy(() => definedNonNullAnySchema.nullish()),
      children: z.lazy(() => definedNonNullAnySchema.nullish()),
      createdAt: z.lazy(() => definedNonNullAnySchema.nullish()),
      defaultShowAllChildrenOnLgSizes: z.lazy(() =>
         definedNonNullAnySchema.nullish()
      ),
      description: z.lazy(() => definedNonNullAnySchema.nullish()),
      deviceTitle: z.lazy(() => definedNonNullAnySchema.nullish()),
      filters: z.lazy(() => definedNonNullAnySchema.nullish()),
      forceNoindex: z.lazy(() => definedNonNullAnySchema.nullish()),
      h1: z.lazy(() => definedNonNullAnySchema.nullish()),
      handle: z.lazy(() => definedNonNullAnySchema.nullish()),
      hideFromParent: z.lazy(() => definedNonNullAnySchema.nullish()),
      id: z.lazy(() => definedNonNullAnySchema.nullish()),
      legacyDescription: z.lazy(() => definedNonNullAnySchema.nullish()),
      legacyPageId: z.lazy(() => definedNonNullAnySchema.nullish()),
      locale: z.lazy(() => definedNonNullAnySchema.nullish()),
      localizations: z.lazy(() => definedNonNullAnySchema.nullish()),
      metaDescription: z.lazy(() => definedNonNullAnySchema.nullish()),
      metaTitle: z.lazy(() => definedNonNullAnySchema.nullish()),
      not: z.lazy(() => definedNonNullAnySchema.nullish()),
      or: z.array(z.lazy(() => definedNonNullAnySchema.nullable())).nullish(),
      parent: z.lazy(() => definedNonNullAnySchema.nullish()),
      publishedAt: z.lazy(() => definedNonNullAnySchema.nullish()),
      sortPriority: z.lazy(() => definedNonNullAnySchema.nullish()),
      tagline: z.lazy(() => definedNonNullAnySchema.nullish()),
      title: z.lazy(() => definedNonNullAnySchema.nullish()),
      type: z.lazy(() => definedNonNullAnySchema.nullish()),
      updatedAt: z.lazy(() => definedNonNullAnySchema.nullish()),
   });
}

export function ProductListInputSchema(): z.ZodObject<
   Properties<ProductListInput>
> {
   return z.object<Properties<ProductListInput>>({
      brandLogo: z.string().nullish(),
      brandLogoWidth: z.number().nullish(),
      children: z.array(z.string().nullable()).nullish(),
      defaultShowAllChildrenOnLgSizes: z.boolean().nullish(),
      description: z.string().nullish(),
      deviceTitle: z.string().nullish(),
      filters: z.string().nullish(),
      forceNoindex: z.boolean().nullish(),
      h1: z.string().nullish(),
      handle: z.string().nullish(),
      heroImage: z.string().nullish(),
      hideFromParent: z.boolean().nullish(),
      image: z.string().nullish(),
      itemOverrides: z.array(z.lazy(() => definedNonNullAnySchema)).nullish(),
      legacyDescription: z.string().nullish(),
      legacyPageId: z.number().nullish(),
      metaDescription: z.string().nullish(),
      metaTitle: z.string().nullish(),
      parent: z.string().nullish(),
      publishedAt: definedNonNullAnySchema.nullish(),
      sections: z.array(z.lazy(() => definedNonNullAnySchema)).nullish(),
      sortPriority: z.number().nullish(),
      tagline: z.string().nullish(),
      title: z.string().nullish(),
      type: definedNonNullAnySchema.nullish(),
   });
}

export const PublicationStateSchema = z.nativeEnum(PublicationState);

export function SocialPostFiltersInputSchema(): z.ZodObject<
   Properties<SocialPostFiltersInput>
> {
   return z.object<Properties<SocialPostFiltersInput>>({
      and: z.array(z.lazy(() => definedNonNullAnySchema.nullable())).nullish(),
      author: z.lazy(() => definedNonNullAnySchema.nullish()),
      createdAt: z.lazy(() => definedNonNullAnySchema.nullish()),
      id: z.lazy(() => definedNonNullAnySchema.nullish()),
      not: z.lazy(() => definedNonNullAnySchema.nullish()),
      or: z.array(z.lazy(() => definedNonNullAnySchema.nullable())).nullish(),
      publishedAt: z.lazy(() => definedNonNullAnySchema.nullish()),
      title: z.lazy(() => definedNonNullAnySchema.nullish()),
      updatedAt: z.lazy(() => definedNonNullAnySchema.nullish()),
      url: z.lazy(() => definedNonNullAnySchema.nullish()),
   });
}

export function SocialPostInputSchema(): z.ZodObject<
   Properties<SocialPostInput>
> {
   return z.object<Properties<SocialPostInput>>({
      author: z.string().nullish(),
      image: z.string().nullish(),
      publishedAt: definedNonNullAnySchema.nullish(),
      title: z.string().nullish(),
      url: z.string().nullish(),
   });
}

export function StoreFiltersInputSchema(): z.ZodObject<
   Properties<StoreFiltersInput>
> {
   return z.object<Properties<StoreFiltersInput>>({
      and: z.array(z.lazy(() => definedNonNullAnySchema.nullable())).nullish(),
      code: z.lazy(() => definedNonNullAnySchema.nullish()),
      createdAt: z.lazy(() => definedNonNullAnySchema.nullish()),
      currency: z.lazy(() => definedNonNullAnySchema.nullish()),
      footer: z.lazy(() => definedNonNullAnySchema.nullish()),
      header: z.lazy(() => definedNonNullAnySchema.nullish()),
      id: z.lazy(() => definedNonNullAnySchema.nullish()),
      name: z.lazy(() => definedNonNullAnySchema.nullish()),
      not: z.lazy(() => definedNonNullAnySchema.nullish()),
      or: z.array(z.lazy(() => definedNonNullAnySchema.nullable())).nullish(),
      publishedAt: z.lazy(() => definedNonNullAnySchema.nullish()),
      shopifySettings: z.lazy(() => definedNonNullAnySchema.nullish()),
      socialMediaAccounts: z.lazy(() => definedNonNullAnySchema.nullish()),
      updatedAt: z.lazy(() => definedNonNullAnySchema.nullish()),
      url: z.lazy(() => definedNonNullAnySchema.nullish()),
   });
}

export function StoreInputSchema(): z.ZodObject<Properties<StoreInput>> {
   return z.object<Properties<StoreInput>>({
      code: z.string().nullish(),
      currency: definedNonNullAnySchema.nullish(),
      footer: z.lazy(() => definedNonNullAnySchema.nullish()),
      header: z.lazy(() => definedNonNullAnySchema.nullish()),
      name: z.string().nullish(),
      publishedAt: definedNonNullAnySchema.nullish(),
      shopifySettings: z.lazy(() => definedNonNullAnySchema.nullish()),
      socialMediaAccounts: z.lazy(() => definedNonNullAnySchema.nullish()),
      url: z.string().nullish(),
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
      not: z.lazy(() => definedNonNullAnySchema.nullish()),
      notContains: z.string().nullish(),
      notContainsi: z.string().nullish(),
      notIn: z.array(z.string().nullable()).nullish(),
      notNull: z.boolean().nullish(),
      null: z.boolean().nullish(),
      or: z.array(z.string().nullable()).nullish(),
      startsWith: z.string().nullish(),
   });
}

export function UploadFileFiltersInputSchema(): z.ZodObject<
   Properties<UploadFileFiltersInput>
> {
   return z.object<Properties<UploadFileFiltersInput>>({
      alternativeText: z.lazy(() => definedNonNullAnySchema.nullish()),
      and: z.array(z.lazy(() => definedNonNullAnySchema.nullable())).nullish(),
      caption: z.lazy(() => definedNonNullAnySchema.nullish()),
      createdAt: z.lazy(() => definedNonNullAnySchema.nullish()),
      ext: z.lazy(() => definedNonNullAnySchema.nullish()),
      folder: z.lazy(() => definedNonNullAnySchema.nullish()),
      folderPath: z.lazy(() => definedNonNullAnySchema.nullish()),
      formats: z.lazy(() => definedNonNullAnySchema.nullish()),
      hash: z.lazy(() => definedNonNullAnySchema.nullish()),
      height: z.lazy(() => definedNonNullAnySchema.nullish()),
      id: z.lazy(() => definedNonNullAnySchema.nullish()),
      mime: z.lazy(() => definedNonNullAnySchema.nullish()),
      name: z.lazy(() => definedNonNullAnySchema.nullish()),
      not: z.lazy(() => definedNonNullAnySchema.nullish()),
      or: z.array(z.lazy(() => definedNonNullAnySchema.nullable())).nullish(),
      previewUrl: z.lazy(() => definedNonNullAnySchema.nullish()),
      provider: z.lazy(() => definedNonNullAnySchema.nullish()),
      provider_metadata: z.lazy(() => definedNonNullAnySchema.nullish()),
      size: z.lazy(() => definedNonNullAnySchema.nullish()),
      updatedAt: z.lazy(() => definedNonNullAnySchema.nullish()),
      url: z.lazy(() => definedNonNullAnySchema.nullish()),
      width: z.lazy(() => definedNonNullAnySchema.nullish()),
   });
}

export function UploadFileInputSchema(): z.ZodObject<
   Properties<UploadFileInput>
> {
   return z.object<Properties<UploadFileInput>>({
      alternativeText: z.string().nullish(),
      caption: z.string().nullish(),
      ext: z.string().nullish(),
      folder: z.string().nullish(),
      folderPath: z.string().nullish(),
      formats: definedNonNullAnySchema.nullish(),
      hash: z.string().nullish(),
      height: z.number().nullish(),
      mime: z.string().nullish(),
      name: z.string().nullish(),
      previewUrl: z.string().nullish(),
      provider: z.string().nullish(),
      provider_metadata: definedNonNullAnySchema.nullish(),
      size: z.number().nullish(),
      url: z.string().nullish(),
      width: z.number().nullish(),
   });
}

export function UploadFolderFiltersInputSchema(): z.ZodObject<
   Properties<UploadFolderFiltersInput>
> {
   return z.object<Properties<UploadFolderFiltersInput>>({
      and: z.array(z.lazy(() => definedNonNullAnySchema.nullable())).nullish(),
      children: z.lazy(() => definedNonNullAnySchema.nullish()),
      createdAt: z.lazy(() => definedNonNullAnySchema.nullish()),
      files: z.lazy(() => definedNonNullAnySchema.nullish()),
      id: z.lazy(() => definedNonNullAnySchema.nullish()),
      name: z.lazy(() => definedNonNullAnySchema.nullish()),
      not: z.lazy(() => definedNonNullAnySchema.nullish()),
      or: z.array(z.lazy(() => definedNonNullAnySchema.nullable())).nullish(),
      parent: z.lazy(() => definedNonNullAnySchema.nullish()),
      path: z.lazy(() => definedNonNullAnySchema.nullish()),
      pathId: z.lazy(() => definedNonNullAnySchema.nullish()),
      updatedAt: z.lazy(() => definedNonNullAnySchema.nullish()),
   });
}

export function UploadFolderInputSchema(): z.ZodObject<
   Properties<UploadFolderInput>
> {
   return z.object<Properties<UploadFolderInput>>({
      children: z.array(z.string().nullable()).nullish(),
      files: z.array(z.string().nullable()).nullish(),
      name: z.string().nullish(),
      parent: z.string().nullish(),
      path: z.string().nullish(),
      pathId: z.number().nullish(),
   });
}

export function UsersPermissionsLoginInputSchema(): z.ZodObject<
   Properties<UsersPermissionsLoginInput>
> {
   return z.object<Properties<UsersPermissionsLoginInput>>({
      identifier: z.string(),
      password: z.string(),
      provider: z.string(),
   });
}

export function UsersPermissionsPermissionFiltersInputSchema(): z.ZodObject<
   Properties<UsersPermissionsPermissionFiltersInput>
> {
   return z.object<Properties<UsersPermissionsPermissionFiltersInput>>({
      action: z.lazy(() => definedNonNullAnySchema.nullish()),
      and: z.array(z.lazy(() => definedNonNullAnySchema.nullable())).nullish(),
      createdAt: z.lazy(() => definedNonNullAnySchema.nullish()),
      id: z.lazy(() => definedNonNullAnySchema.nullish()),
      not: z.lazy(() => definedNonNullAnySchema.nullish()),
      or: z.array(z.lazy(() => definedNonNullAnySchema.nullable())).nullish(),
      role: z.lazy(() => definedNonNullAnySchema.nullish()),
      updatedAt: z.lazy(() => definedNonNullAnySchema.nullish()),
   });
}

export function UsersPermissionsRegisterInputSchema(): z.ZodObject<
   Properties<UsersPermissionsRegisterInput>
> {
   return z.object<Properties<UsersPermissionsRegisterInput>>({
      email: z.string(),
      password: z.string(),
      username: z.string(),
   });
}

export function UsersPermissionsRoleFiltersInputSchema(): z.ZodObject<
   Properties<UsersPermissionsRoleFiltersInput>
> {
   return z.object<Properties<UsersPermissionsRoleFiltersInput>>({
      and: z.array(z.lazy(() => definedNonNullAnySchema.nullable())).nullish(),
      createdAt: z.lazy(() => definedNonNullAnySchema.nullish()),
      description: z.lazy(() => definedNonNullAnySchema.nullish()),
      id: z.lazy(() => definedNonNullAnySchema.nullish()),
      name: z.lazy(() => definedNonNullAnySchema.nullish()),
      not: z.lazy(() => definedNonNullAnySchema.nullish()),
      or: z.array(z.lazy(() => definedNonNullAnySchema.nullable())).nullish(),
      permissions: z.lazy(() => definedNonNullAnySchema.nullish()),
      type: z.lazy(() => definedNonNullAnySchema.nullish()),
      updatedAt: z.lazy(() => definedNonNullAnySchema.nullish()),
      users: z.lazy(() => definedNonNullAnySchema.nullish()),
   });
}

export function UsersPermissionsRoleInputSchema(): z.ZodObject<
   Properties<UsersPermissionsRoleInput>
> {
   return z.object<Properties<UsersPermissionsRoleInput>>({
      description: z.string().nullish(),
      name: z.string().nullish(),
      permissions: z.array(z.string().nullable()).nullish(),
      type: z.string().nullish(),
      users: z.array(z.string().nullable()).nullish(),
   });
}

export function UsersPermissionsUserFiltersInputSchema(): z.ZodObject<
   Properties<UsersPermissionsUserFiltersInput>
> {
   return z.object<Properties<UsersPermissionsUserFiltersInput>>({
      and: z.array(z.lazy(() => definedNonNullAnySchema.nullable())).nullish(),
      blocked: z.lazy(() => definedNonNullAnySchema.nullish()),
      confirmationToken: z.lazy(() => definedNonNullAnySchema.nullish()),
      confirmed: z.lazy(() => definedNonNullAnySchema.nullish()),
      createdAt: z.lazy(() => definedNonNullAnySchema.nullish()),
      email: z.lazy(() => definedNonNullAnySchema.nullish()),
      id: z.lazy(() => definedNonNullAnySchema.nullish()),
      not: z.lazy(() => definedNonNullAnySchema.nullish()),
      or: z.array(z.lazy(() => definedNonNullAnySchema.nullable())).nullish(),
      password: z.lazy(() => definedNonNullAnySchema.nullish()),
      provider: z.lazy(() => definedNonNullAnySchema.nullish()),
      resetPasswordToken: z.lazy(() => definedNonNullAnySchema.nullish()),
      role: z.lazy(() => definedNonNullAnySchema.nullish()),
      updatedAt: z.lazy(() => definedNonNullAnySchema.nullish()),
      username: z.lazy(() => definedNonNullAnySchema.nullish()),
   });
}

export function UsersPermissionsUserInputSchema(): z.ZodObject<
   Properties<UsersPermissionsUserInput>
> {
   return z.object<Properties<UsersPermissionsUserInput>>({
      blocked: z.boolean().nullish(),
      confirmationToken: z.string().nullish(),
      confirmed: z.boolean().nullish(),
      email: z.string().nullish(),
      password: z.string().nullish(),
      provider: z.string().nullish(),
      resetPasswordToken: z.string().nullish(),
      role: z.string().nullish(),
      username: z.string().nullish(),
   });
}
