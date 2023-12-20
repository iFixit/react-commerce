import { z } from 'zod';
import {
   BannerFiltersInput,
   BannerInput,
   BooleanFilterInput,
   CompanyFiltersInput,
   CompanyInput,
   ComponentGlobalNewsletterFormInput,
   ComponentGlobalPersonFiltersInput,
   ComponentMiscPlacementFiltersInput,
   ComponentMiscPlacementInput,
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
   Enum_Componentmiscplacement_Showinproductlistpages,
   Enum_Componentpagesplitwithimage_Imageposition,
   Enum_Componentsectionfeaturedproducts_Background,
   Enum_Productlist_Type,
   Enum_Reusablesection_Positioninproductlist,
   Enum_Store_Currency,
   FaqFiltersInput,
   FaqInput,
   FileInfoInput,
   FloatFilterInput,
   GlobalInput,
   I18NLocaleFiltersInput,
   IdFilterInput,
   IntFilterInput,
   ItemTypeFiltersInput,
   ItemTypeInput,
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
   PublisherActionFiltersInput,
   PublisherActionInput,
   ReusableSectionFiltersInput,
   ReusableSectionInput,
   ScrewdriverBitFiltersInput,
   ScrewdriverBitInput,
   ScrewdriverBitTypeFiltersInput,
   ScrewdriverBitTypeInput,
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
      and: z
         .array(z.lazy(() => BannerFiltersInputSchema().nullable()))
         .nullish(),
      callToAction: z.lazy(() =>
         ComponentPageCallToActionFiltersInputSchema().nullish()
      ),
      createdAt: z.lazy(() => DateTimeFilterInputSchema().nullish()),
      description: z.lazy(() => StringFilterInputSchema().nullish()),
      id: z.lazy(() => IdFilterInputSchema().nullish()),
      label: z.lazy(() => StringFilterInputSchema().nullish()),
      locale: z.lazy(() => StringFilterInputSchema().nullish()),
      localizations: z.lazy(() => BannerFiltersInputSchema().nullish()),
      not: z.lazy(() => BannerFiltersInputSchema().nullish()),
      or: z
         .array(z.lazy(() => BannerFiltersInputSchema().nullable()))
         .nullish(),
      publishedAt: z.lazy(() => DateTimeFilterInputSchema().nullish()),
      title: z.lazy(() => StringFilterInputSchema().nullish()),
      updatedAt: z.lazy(() => DateTimeFilterInputSchema().nullish()),
   });
}

export function BannerInputSchema(): z.ZodObject<Properties<BannerInput>> {
   return z.object<Properties<BannerInput>>({
      callToAction: z.lazy(() =>
         ComponentPageCallToActionInputSchema().nullish()
      ),
      description: z.string().nullish(),
      image: z.string().nullish(),
      label: z.string().nullish(),
      publishedAt: z.unknown().nullish(),
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
      nei: z.boolean().nullish(),
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

export function CompanyFiltersInputSchema(): z.ZodObject<
   Properties<CompanyFiltersInput>
> {
   return z.object<Properties<CompanyFiltersInput>>({
      and: z
         .array(z.lazy(() => CompanyFiltersInputSchema().nullable()))
         .nullish(),
      createdAt: z.lazy(() => DateTimeFilterInputSchema().nullish()),
      id: z.lazy(() => IdFilterInputSchema().nullish()),
      name: z.lazy(() => StringFilterInputSchema().nullish()),
      not: z.lazy(() => CompanyFiltersInputSchema().nullish()),
      or: z
         .array(z.lazy(() => CompanyFiltersInputSchema().nullable()))
         .nullish(),
      publishedAt: z.lazy(() => DateTimeFilterInputSchema().nullish()),
      updatedAt: z.lazy(() => DateTimeFilterInputSchema().nullish()),
   });
}

export function CompanyInputSchema(): z.ZodObject<Properties<CompanyInput>> {
   return z.object<Properties<CompanyInput>>({
      logo: z.string().nullish(),
      name: z.string().nullish(),
      publishedAt: z.unknown().nullish(),
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
      and: z
         .array(
            z.lazy(() => ComponentGlobalPersonFiltersInputSchema().nullable())
         )
         .nullish(),
      name: z.lazy(() => StringFilterInputSchema().nullish()),
      not: z.lazy(() => ComponentGlobalPersonFiltersInputSchema().nullish()),
      or: z
         .array(
            z.lazy(() => ComponentGlobalPersonFiltersInputSchema().nullable())
         )
         .nullish(),
      role: z.lazy(() => StringFilterInputSchema().nullish()),
   });
}

export function ComponentMiscPlacementFiltersInputSchema(): z.ZodObject<
   Properties<ComponentMiscPlacementFiltersInput>
> {
   return z.object<Properties<ComponentMiscPlacementFiltersInput>>({
      and: z
         .array(
            z.lazy(() => ComponentMiscPlacementFiltersInputSchema().nullable())
         )
         .nullish(),
      not: z.lazy(() => ComponentMiscPlacementFiltersInputSchema().nullish()),
      or: z
         .array(
            z.lazy(() => ComponentMiscPlacementFiltersInputSchema().nullable())
         )
         .nullish(),
      productLists: z.lazy(() => ProductListFiltersInputSchema().nullish()),
      showInProductListPages: z.lazy(() => StringFilterInputSchema().nullish()),
   });
}

export function ComponentMiscPlacementInputSchema(): z.ZodObject<
   Properties<ComponentMiscPlacementInput>
> {
   return z.object<Properties<ComponentMiscPlacementInput>>({
      id: z.string().nullish(),
      productLists: z.array(z.string().nullable()).nullish(),
      showInProductListPages:
         Enum_Componentmiscplacement_ShowinproductlistpagesSchema.nullish(),
   });
}

export function ComponentPageCallToActionFiltersInputSchema(): z.ZodObject<
   Properties<ComponentPageCallToActionFiltersInput>
> {
   return z.object<Properties<ComponentPageCallToActionFiltersInput>>({
      and: z
         .array(
            z.lazy(() =>
               ComponentPageCallToActionFiltersInputSchema().nullable()
            )
         )
         .nullish(),
      not: z.lazy(() =>
         ComponentPageCallToActionFiltersInputSchema().nullish()
      ),
      or: z
         .array(
            z.lazy(() =>
               ComponentPageCallToActionFiltersInputSchema().nullable()
            )
         )
         .nullish(),
      title: z.lazy(() => StringFilterInputSchema().nullish()),
      url: z.lazy(() => StringFilterInputSchema().nullish()),
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
      and: z
         .array(
            z.lazy(() => ComponentPageCategoryFiltersInputSchema().nullable())
         )
         .nullish(),
      description: z.lazy(() => StringFilterInputSchema().nullish()),
      not: z.lazy(() => ComponentPageCategoryFiltersInputSchema().nullish()),
      or: z
         .array(
            z.lazy(() => ComponentPageCategoryFiltersInputSchema().nullable())
         )
         .nullish(),
      productList: z.lazy(() => ProductListFiltersInputSchema().nullish()),
   });
}

export function ComponentPagePressQuoteFiltersInputSchema(): z.ZodObject<
   Properties<ComponentPagePressQuoteFiltersInput>
> {
   return z.object<Properties<ComponentPagePressQuoteFiltersInput>>({
      and: z
         .array(
            z.lazy(() => ComponentPagePressQuoteFiltersInputSchema().nullable())
         )
         .nullish(),
      company: z.lazy(() => CompanyFiltersInputSchema().nullish()),
      not: z.lazy(() => ComponentPagePressQuoteFiltersInputSchema().nullish()),
      or: z
         .array(
            z.lazy(() => ComponentPagePressQuoteFiltersInputSchema().nullable())
         )
         .nullish(),
      text: z.lazy(() => StringFilterInputSchema().nullish()),
   });
}

export function ComponentPageStatItemFiltersInputSchema(): z.ZodObject<
   Properties<ComponentPageStatItemFiltersInput>
> {
   return z.object<Properties<ComponentPageStatItemFiltersInput>>({
      and: z
         .array(
            z.lazy(() => ComponentPageStatItemFiltersInputSchema().nullable())
         )
         .nullish(),
      label: z.lazy(() => StringFilterInputSchema().nullish()),
      not: z.lazy(() => ComponentPageStatItemFiltersInputSchema().nullish()),
      or: z
         .array(
            z.lazy(() => ComponentPageStatItemFiltersInputSchema().nullable())
         )
         .nullish(),
      value: z.lazy(() => StringFilterInputSchema().nullish()),
   });
}

export function ComponentSectionQuoteCardFiltersInputSchema(): z.ZodObject<
   Properties<ComponentSectionQuoteCardFiltersInput>
> {
   return z.object<Properties<ComponentSectionQuoteCardFiltersInput>>({
      and: z
         .array(
            z.lazy(() =>
               ComponentSectionQuoteCardFiltersInputSchema().nullable()
            )
         )
         .nullish(),
      author: z.lazy(() => ComponentGlobalPersonFiltersInputSchema().nullish()),
      not: z.lazy(() =>
         ComponentSectionQuoteCardFiltersInputSchema().nullish()
      ),
      or: z
         .array(
            z.lazy(() =>
               ComponentSectionQuoteCardFiltersInputSchema().nullable()
            )
         )
         .nullish(),
      text: z.lazy(() => StringFilterInputSchema().nullish()),
   });
}

export function ComponentStoreFooterFiltersInputSchema(): z.ZodObject<
   Properties<ComponentStoreFooterFiltersInput>
> {
   return z.object<Properties<ComponentStoreFooterFiltersInput>>({
      and: z
         .array(
            z.lazy(() => ComponentStoreFooterFiltersInputSchema().nullable())
         )
         .nullish(),
      bottomMenu: z.lazy(() => MenuFiltersInputSchema().nullish()),
      menu1: z.lazy(() => MenuFiltersInputSchema().nullish()),
      menu2: z.lazy(() => MenuFiltersInputSchema().nullish()),
      menu3: z.lazy(() => MenuFiltersInputSchema().nullish()),
      not: z.lazy(() => ComponentStoreFooterFiltersInputSchema().nullish()),
      or: z
         .array(
            z.lazy(() => ComponentStoreFooterFiltersInputSchema().nullable())
         )
         .nullish(),
      partners: z.lazy(() => MenuFiltersInputSchema().nullish()),
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
      and: z
         .array(
            z.lazy(() => ComponentStoreHeaderFiltersInputSchema().nullable())
         )
         .nullish(),
      menu: z.lazy(() => MenuFiltersInputSchema().nullish()),
      not: z.lazy(() => ComponentStoreHeaderFiltersInputSchema().nullish()),
      or: z
         .array(
            z.lazy(() => ComponentStoreHeaderFiltersInputSchema().nullable())
         )
         .nullish(),
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
      and: z
         .array(
            z.lazy(() =>
               ComponentStoreShopifySettingsFiltersInputSchema().nullable()
            )
         )
         .nullish(),
      delegateAccessToken: z.lazy(() => StringFilterInputSchema().nullish()),
      not: z.lazy(() =>
         ComponentStoreShopifySettingsFiltersInputSchema().nullish()
      ),
      or: z
         .array(
            z.lazy(() =>
               ComponentStoreShopifySettingsFiltersInputSchema().nullable()
            )
         )
         .nullish(),
      storefrontAccessToken: z.lazy(() => StringFilterInputSchema().nullish()),
      storefrontDomain: z.lazy(() => StringFilterInputSchema().nullish()),
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
      and: z
         .array(
            z.lazy(() =>
               ComponentStoreSocialMediaAccountsFiltersInputSchema().nullable()
            )
         )
         .nullish(),
      facebook: z.lazy(() => StringFilterInputSchema().nullish()),
      instagram: z.lazy(() => StringFilterInputSchema().nullish()),
      not: z.lazy(() =>
         ComponentStoreSocialMediaAccountsFiltersInputSchema().nullish()
      ),
      or: z
         .array(
            z.lazy(() =>
               ComponentStoreSocialMediaAccountsFiltersInputSchema().nullable()
            )
         )
         .nullish(),
      repairOrg: z.lazy(() => StringFilterInputSchema().nullish()),
      tiktok: z.lazy(() => StringFilterInputSchema().nullish()),
      twitter: z.lazy(() => StringFilterInputSchema().nullish()),
      youtube: z.lazy(() => StringFilterInputSchema().nullish()),
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
      and: z.array(z.unknown().nullable()).nullish(),
      between: z.array(z.unknown().nullable()).nullish(),
      contains: z.unknown().nullish(),
      containsi: z.unknown().nullish(),
      endsWith: z.unknown().nullish(),
      eq: z.unknown().nullish(),
      eqi: z.unknown().nullish(),
      gt: z.unknown().nullish(),
      gte: z.unknown().nullish(),
      in: z.array(z.unknown().nullable()).nullish(),
      lt: z.unknown().nullish(),
      lte: z.unknown().nullish(),
      ne: z.unknown().nullish(),
      nei: z.unknown().nullish(),
      not: z.lazy(() => DateTimeFilterInputSchema().nullish()),
      notContains: z.unknown().nullish(),
      notContainsi: z.unknown().nullish(),
      notIn: z.array(z.unknown().nullable()).nullish(),
      notNull: z.boolean().nullish(),
      null: z.boolean().nullish(),
      or: z.array(z.unknown().nullable()).nullish(),
      startsWith: z.unknown().nullish(),
   });
}

export const Enum_Componentmiscplacement_ShowinproductlistpagesSchema =
   z.nativeEnum(Enum_Componentmiscplacement_Showinproductlistpages);

export const Enum_Componentpagesplitwithimage_ImagepositionSchema =
   z.nativeEnum(Enum_Componentpagesplitwithimage_Imageposition);

export const Enum_Componentsectionfeaturedproducts_BackgroundSchema =
   z.nativeEnum(Enum_Componentsectionfeaturedproducts_Background);

export const Enum_Productlist_TypeSchema = z.nativeEnum(Enum_Productlist_Type);

export const Enum_Reusablesection_PositioninproductlistSchema = z.nativeEnum(
   Enum_Reusablesection_Positioninproductlist
);

export const Enum_Store_CurrencySchema = z.nativeEnum(Enum_Store_Currency);

export function FaqFiltersInputSchema(): z.ZodObject<
   Properties<FaqFiltersInput>
> {
   return z.object<Properties<FaqFiltersInput>>({
      and: z.array(z.lazy(() => FaqFiltersInputSchema().nullable())).nullish(),
      answer: z.lazy(() => StringFilterInputSchema().nullish()),
      category: z.lazy(() => StringFilterInputSchema().nullish()),
      createdAt: z.lazy(() => DateTimeFilterInputSchema().nullish()),
      id: z.lazy(() => IdFilterInputSchema().nullish()),
      item_type: z.lazy(() => StringFilterInputSchema().nullish()),
      not: z.lazy(() => FaqFiltersInputSchema().nullish()),
      or: z.array(z.lazy(() => FaqFiltersInputSchema().nullable())).nullish(),
      priority: z.lazy(() => IntFilterInputSchema().nullish()),
      product_lists: z.lazy(() => ProductListFiltersInputSchema().nullish()),
      publishedAt: z.lazy(() => DateTimeFilterInputSchema().nullish()),
      question: z.lazy(() => StringFilterInputSchema().nullish()),
      updatedAt: z.lazy(() => DateTimeFilterInputSchema().nullish()),
   });
}

export function FaqInputSchema(): z.ZodObject<Properties<FaqInput>> {
   return z.object<Properties<FaqInput>>({
      answer: z.string().nullish(),
      category: z.string().nullish(),
      item_type: z.string().nullish(),
      priority: z.number().nullish(),
      product_lists: z.array(z.string().nullable()).nullish(),
      publishedAt: z.unknown().nullish(),
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
      nei: z.number().nullish(),
      not: z.lazy(() => FloatFilterInputSchema().nullish()),
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
      newsletterForm: z.lazy(() =>
         ComponentGlobalNewsletterFormInputSchema().nullish()
      ),
      publishedAt: z.unknown().nullish(),
   });
}

export function I18NLocaleFiltersInputSchema(): z.ZodObject<
   Properties<I18NLocaleFiltersInput>
> {
   return z.object<Properties<I18NLocaleFiltersInput>>({
      and: z
         .array(z.lazy(() => I18NLocaleFiltersInputSchema().nullable()))
         .nullish(),
      code: z.lazy(() => StringFilterInputSchema().nullish()),
      createdAt: z.lazy(() => DateTimeFilterInputSchema().nullish()),
      id: z.lazy(() => IdFilterInputSchema().nullish()),
      name: z.lazy(() => StringFilterInputSchema().nullish()),
      not: z.lazy(() => I18NLocaleFiltersInputSchema().nullish()),
      or: z
         .array(z.lazy(() => I18NLocaleFiltersInputSchema().nullable()))
         .nullish(),
      updatedAt: z.lazy(() => DateTimeFilterInputSchema().nullish()),
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
      nei: z.string().nullish(),
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
      nei: z.number().nullish(),
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

export function ItemTypeFiltersInputSchema(): z.ZodObject<
   Properties<ItemTypeFiltersInput>
> {
   return z.object<Properties<ItemTypeFiltersInput>>({
      akeneo_code: z.lazy(() => StringFilterInputSchema().nullish()),
      and: z
         .array(z.lazy(() => ItemTypeFiltersInputSchema().nullable()))
         .nullish(),
      createdAt: z.lazy(() => DateTimeFilterInputSchema().nullish()),
      id: z.lazy(() => IdFilterInputSchema().nullish()),
      not: z.lazy(() => ItemTypeFiltersInputSchema().nullish()),
      or: z
         .array(z.lazy(() => ItemTypeFiltersInputSchema().nullable()))
         .nullish(),
      publishedAt: z.lazy(() => DateTimeFilterInputSchema().nullish()),
      updatedAt: z.lazy(() => DateTimeFilterInputSchema().nullish()),
   });
}

export function ItemTypeInputSchema(): z.ZodObject<Properties<ItemTypeInput>> {
   return z.object<Properties<ItemTypeInput>>({
      akeneo_code: z.string().nullish(),
      fallback_image: z.string().nullish(),
      publishedAt: z.unknown().nullish(),
   });
}

export function JsonFilterInputSchema(): z.ZodObject<
   Properties<JsonFilterInput>
> {
   return z.object<Properties<JsonFilterInput>>({
      and: z.array(z.unknown().nullable()).nullish(),
      between: z.array(z.unknown().nullable()).nullish(),
      contains: z.unknown().nullish(),
      containsi: z.unknown().nullish(),
      endsWith: z.unknown().nullish(),
      eq: z.unknown().nullish(),
      eqi: z.unknown().nullish(),
      gt: z.unknown().nullish(),
      gte: z.unknown().nullish(),
      in: z.array(z.unknown().nullable()).nullish(),
      lt: z.unknown().nullish(),
      lte: z.unknown().nullish(),
      ne: z.unknown().nullish(),
      nei: z.unknown().nullish(),
      not: z.lazy(() => JsonFilterInputSchema().nullish()),
      notContains: z.unknown().nullish(),
      notContainsi: z.unknown().nullish(),
      notIn: z.array(z.unknown().nullable()).nullish(),
      notNull: z.boolean().nullish(),
      null: z.boolean().nullish(),
      or: z.array(z.unknown().nullable()).nullish(),
      startsWith: z.unknown().nullish(),
   });
}

export function MenuFiltersInputSchema(): z.ZodObject<
   Properties<MenuFiltersInput>
> {
   return z.object<Properties<MenuFiltersInput>>({
      and: z.array(z.lazy(() => MenuFiltersInputSchema().nullable())).nullish(),
      createdAt: z.lazy(() => DateTimeFilterInputSchema().nullish()),
      id: z.lazy(() => IdFilterInputSchema().nullish()),
      locale: z.lazy(() => StringFilterInputSchema().nullish()),
      localizations: z.lazy(() => MenuFiltersInputSchema().nullish()),
      not: z.lazy(() => MenuFiltersInputSchema().nullish()),
      or: z.array(z.lazy(() => MenuFiltersInputSchema().nullable())).nullish(),
      publishedAt: z.lazy(() => DateTimeFilterInputSchema().nullish()),
      title: z.lazy(() => StringFilterInputSchema().nullish()),
      updatedAt: z.lazy(() => DateTimeFilterInputSchema().nullish()),
   });
}

export function MenuInputSchema(): z.ZodObject<Properties<MenuInput>> {
   return z.object<Properties<MenuInput>>({
      items: z.array(z.lazy(() => z.unknown())).nullish(),
      publishedAt: z.unknown().nullish(),
      title: z.string().nullish(),
   });
}

export function PageFiltersInputSchema(): z.ZodObject<
   Properties<PageFiltersInput>
> {
   return z.object<Properties<PageFiltersInput>>({
      and: z.array(z.lazy(() => PageFiltersInputSchema().nullable())).nullish(),
      createdAt: z.lazy(() => DateTimeFilterInputSchema().nullish()),
      id: z.lazy(() => IdFilterInputSchema().nullish()),
      locale: z.lazy(() => StringFilterInputSchema().nullish()),
      localizations: z.lazy(() => PageFiltersInputSchema().nullish()),
      metaDescription: z.lazy(() => StringFilterInputSchema().nullish()),
      metaTitle: z.lazy(() => StringFilterInputSchema().nullish()),
      not: z.lazy(() => PageFiltersInputSchema().nullish()),
      or: z.array(z.lazy(() => PageFiltersInputSchema().nullable())).nullish(),
      path: z.lazy(() => StringFilterInputSchema().nullish()),
      publishedAt: z.lazy(() => DateTimeFilterInputSchema().nullish()),
      title: z.lazy(() => StringFilterInputSchema().nullish()),
      updatedAt: z.lazy(() => DateTimeFilterInputSchema().nullish()),
   });
}

export function PageInputSchema(): z.ZodObject<Properties<PageInput>> {
   return z.object<Properties<PageInput>>({
      metaDescription: z.string().nullish(),
      metaTitle: z.string().nullish(),
      path: z.string().nullish(),
      publishedAt: z.unknown().nullish(),
      sections: z.array(z.lazy(() => z.unknown())).nullish(),
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
      and: z
         .array(z.lazy(() => ProductFiltersInputSchema().nullable()))
         .nullish(),
      createdAt: z.lazy(() => DateTimeFilterInputSchema().nullish()),
      handle: z.lazy(() => StringFilterInputSchema().nullish()),
      id: z.lazy(() => IdFilterInputSchema().nullish()),
      not: z.lazy(() => ProductFiltersInputSchema().nullish()),
      or: z
         .array(z.lazy(() => ProductFiltersInputSchema().nullable()))
         .nullish(),
      publishedAt: z.lazy(() => DateTimeFilterInputSchema().nullish()),
      updatedAt: z.lazy(() => DateTimeFilterInputSchema().nullish()),
   });
}

export function ProductInputSchema(): z.ZodObject<Properties<ProductInput>> {
   return z.object<Properties<ProductInput>>({
      handle: z.string().nullish(),
      publishedAt: z.unknown().nullish(),
      sections: z.array(z.lazy(() => z.unknown())).nullish(),
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
      faqs: z.lazy(() => FaqFiltersInputSchema().nullish()),
      filters: z.lazy(() => StringFilterInputSchema().nullish()),
      forceNoindex: z.lazy(() => BooleanFilterInputSchema().nullish()),
      h1: z.lazy(() => StringFilterInputSchema().nullish()),
      handle: z.lazy(() => StringFilterInputSchema().nullish()),
      hideFromParent: z.lazy(() => BooleanFilterInputSchema().nullish()),
      id: z.lazy(() => IdFilterInputSchema().nullish()),
      indexVariantsInsteadOfDevice: z.lazy(() =>
         BooleanFilterInputSchema().nullish()
      ),
      legacyDescription: z.lazy(() => StringFilterInputSchema().nullish()),
      legacyPageId: z.lazy(() => IntFilterInputSchema().nullish()),
      locale: z.lazy(() => StringFilterInputSchema().nullish()),
      localizations: z.lazy(() => ProductListFiltersInputSchema().nullish()),
      metaDescription: z.lazy(() => StringFilterInputSchema().nullish()),
      metaTitle: z.lazy(() => StringFilterInputSchema().nullish()),
      not: z.lazy(() => ProductListFiltersInputSchema().nullish()),
      optionalFilters: z.lazy(() => StringFilterInputSchema().nullish()),
      or: z
         .array(z.lazy(() => ProductListFiltersInputSchema().nullable()))
         .nullish(),
      parent: z.lazy(() => ProductListFiltersInputSchema().nullish()),
      publishedAt: z.lazy(() => DateTimeFilterInputSchema().nullish()),
      redirectFrom: z.lazy(() => ProductListFiltersInputSchema().nullish()),
      redirectTo: z.lazy(() => ProductListFiltersInputSchema().nullish()),
      sortPriority: z.lazy(() => IntFilterInputSchema().nullish()),
      tagline: z.lazy(() => StringFilterInputSchema().nullish()),
      title: z.lazy(() => StringFilterInputSchema().nullish()),
      type: z.lazy(() => StringFilterInputSchema().nullish()),
      updatedAt: z.lazy(() => DateTimeFilterInputSchema().nullish()),
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
      faqs: z.array(z.string().nullable()).nullish(),
      filters: z.string().nullish(),
      forceNoindex: z.boolean().nullish(),
      h1: z.string().nullish(),
      handle: z.string().nullish(),
      heroImage: z.string().nullish(),
      hideFromParent: z.boolean().nullish(),
      image: z.string().nullish(),
      indexVariantsInsteadOfDevice: z.boolean().nullish(),
      itemOverrides: z.array(z.lazy(() => z.unknown())).nullish(),
      legacyDescription: z.string().nullish(),
      legacyPageId: z.number().nullish(),
      metaDescription: z.string().nullish(),
      metaTitle: z.string().nullish(),
      optionalFilters: z.string().nullish(),
      parent: z.string().nullish(),
      publishedAt: z.unknown().nullish(),
      redirectFrom: z.array(z.string().nullable()).nullish(),
      redirectTo: z.string().nullish(),
      sections: z.array(z.lazy(() => z.unknown())).nullish(),
      sortPriority: z.number().nullish(),
      tagline: z.string().nullish(),
      title: z.string().nullish(),
      type: Enum_Productlist_TypeSchema.nullish(),
   });
}

export const PublicationStateSchema = z.nativeEnum(PublicationState);

export function PublisherActionFiltersInputSchema(): z.ZodObject<
   Properties<PublisherActionFiltersInput>
> {
   return z.object<Properties<PublisherActionFiltersInput>>({
      and: z
         .array(z.lazy(() => PublisherActionFiltersInputSchema().nullable()))
         .nullish(),
      createdAt: z.lazy(() => DateTimeFilterInputSchema().nullish()),
      entityId: z.lazy(() => IntFilterInputSchema().nullish()),
      entitySlug: z.lazy(() => StringFilterInputSchema().nullish()),
      executeAt: z.lazy(() => DateTimeFilterInputSchema().nullish()),
      id: z.lazy(() => IdFilterInputSchema().nullish()),
      mode: z.lazy(() => StringFilterInputSchema().nullish()),
      not: z.lazy(() => PublisherActionFiltersInputSchema().nullish()),
      or: z
         .array(z.lazy(() => PublisherActionFiltersInputSchema().nullable()))
         .nullish(),
      updatedAt: z.lazy(() => DateTimeFilterInputSchema().nullish()),
   });
}

export function PublisherActionInputSchema(): z.ZodObject<
   Properties<PublisherActionInput>
> {
   return z.object<Properties<PublisherActionInput>>({
      entityId: z.number().nullish(),
      entitySlug: z.string().nullish(),
      executeAt: z.unknown().nullish(),
      mode: z.string().nullish(),
   });
}

export function ReusableSectionFiltersInputSchema(): z.ZodObject<
   Properties<ReusableSectionFiltersInput>
> {
   return z.object<Properties<ReusableSectionFiltersInput>>({
      and: z
         .array(z.lazy(() => ReusableSectionFiltersInputSchema().nullable()))
         .nullish(),
      createdAt: z.lazy(() => DateTimeFilterInputSchema().nullish()),
      id: z.lazy(() => IdFilterInputSchema().nullish()),
      not: z.lazy(() => ReusableSectionFiltersInputSchema().nullish()),
      or: z
         .array(z.lazy(() => ReusableSectionFiltersInputSchema().nullable()))
         .nullish(),
      placement: z.lazy(() =>
         ComponentMiscPlacementFiltersInputSchema().nullish()
      ),
      positionInProductList: z.lazy(() => StringFilterInputSchema().nullish()),
      priority: z.lazy(() => IntFilterInputSchema().nullish()),
      publishedAt: z.lazy(() => DateTimeFilterInputSchema().nullish()),
      title: z.lazy(() => StringFilterInputSchema().nullish()),
      updatedAt: z.lazy(() => DateTimeFilterInputSchema().nullish()),
   });
}

export function ReusableSectionInputSchema(): z.ZodObject<
   Properties<ReusableSectionInput>
> {
   return z.object<Properties<ReusableSectionInput>>({
      placement: z
         .array(z.lazy(() => ComponentMiscPlacementInputSchema().nullable()))
         .nullish(),
      positionInProductList:
         Enum_Reusablesection_PositioninproductlistSchema.nullish(),
      priority: z.number().nullish(),
      publishedAt: z.unknown().nullish(),
      section: z.array(z.lazy(() => definedNonNullAnySchema)).nullish(),
      title: z.string().nullish(),
   });
}

export function ScrewdriverBitFiltersInputSchema(): z.ZodObject<
   Properties<ScrewdriverBitFiltersInput>
> {
   return z.object<Properties<ScrewdriverBitFiltersInput>>({
      and: z
         .array(z.lazy(() => ScrewdriverBitFiltersInputSchema().nullable()))
         .nullish(),
      createdAt: z.lazy(() => DateTimeFilterInputSchema().nullish()),
      id: z.lazy(() => IdFilterInputSchema().nullish()),
      not: z.lazy(() => ScrewdriverBitFiltersInputSchema().nullish()),
      or: z
         .array(z.lazy(() => ScrewdriverBitFiltersInputSchema().nullable()))
         .nullish(),
      size: z.lazy(() => StringFilterInputSchema().nullish()),
      slug: z.lazy(() => StringFilterInputSchema().nullish()),
      type: z.lazy(() => ScrewdriverBitTypeFiltersInputSchema().nullish()),
      updatedAt: z.lazy(() => DateTimeFilterInputSchema().nullish()),
   });
}

export function ScrewdriverBitInputSchema(): z.ZodObject<
   Properties<ScrewdriverBitInput>
> {
   return z.object<Properties<ScrewdriverBitInput>>({
      size: z.string().nullish(),
      slug: z.string().nullish(),
      type: z.string().nullish(),
   });
}

export function ScrewdriverBitTypeFiltersInputSchema(): z.ZodObject<
   Properties<ScrewdriverBitTypeFiltersInput>
> {
   return z.object<Properties<ScrewdriverBitTypeFiltersInput>>({
      and: z
         .array(z.lazy(() => ScrewdriverBitTypeFiltersInputSchema().nullable()))
         .nullish(),
      createdAt: z.lazy(() => DateTimeFilterInputSchema().nullish()),
      driverSize: z.lazy(() => StringFilterInputSchema().nullish()),
      id: z.lazy(() => IdFilterInputSchema().nullish()),
      name: z.lazy(() => StringFilterInputSchema().nullish()),
      not: z.lazy(() => ScrewdriverBitTypeFiltersInputSchema().nullish()),
      or: z
         .array(z.lazy(() => ScrewdriverBitTypeFiltersInputSchema().nullable()))
         .nullish(),
      slug: z.lazy(() => StringFilterInputSchema().nullish()),
      updatedAt: z.lazy(() => DateTimeFilterInputSchema().nullish()),
   });
}

export function ScrewdriverBitTypeInputSchema(): z.ZodObject<
   Properties<ScrewdriverBitTypeInput>
> {
   return z.object<Properties<ScrewdriverBitTypeInput>>({
      driverSize: z.string().nullish(),
      icon: z.string().nullish(),
      name: z.string().nullish(),
      slug: z.string().nullish(),
   });
}

export function SocialPostFiltersInputSchema(): z.ZodObject<
   Properties<SocialPostFiltersInput>
> {
   return z.object<Properties<SocialPostFiltersInput>>({
      and: z
         .array(z.lazy(() => SocialPostFiltersInputSchema().nullable()))
         .nullish(),
      author: z.lazy(() => StringFilterInputSchema().nullish()),
      createdAt: z.lazy(() => DateTimeFilterInputSchema().nullish()),
      id: z.lazy(() => IdFilterInputSchema().nullish()),
      not: z.lazy(() => SocialPostFiltersInputSchema().nullish()),
      or: z
         .array(z.lazy(() => SocialPostFiltersInputSchema().nullable()))
         .nullish(),
      publishedAt: z.lazy(() => DateTimeFilterInputSchema().nullish()),
      title: z.lazy(() => StringFilterInputSchema().nullish()),
      updatedAt: z.lazy(() => DateTimeFilterInputSchema().nullish()),
      url: z.lazy(() => StringFilterInputSchema().nullish()),
   });
}

export function SocialPostInputSchema(): z.ZodObject<
   Properties<SocialPostInput>
> {
   return z.object<Properties<SocialPostInput>>({
      author: z.string().nullish(),
      image: z.string().nullish(),
      publishedAt: z.unknown().nullish(),
      title: z.string().nullish(),
      url: z.string().nullish(),
   });
}

export function StoreFiltersInputSchema(): z.ZodObject<
   Properties<StoreFiltersInput>
> {
   return z.object<Properties<StoreFiltersInput>>({
      and: z
         .array(z.lazy(() => StoreFiltersInputSchema().nullable()))
         .nullish(),
      code: z.lazy(() => StringFilterInputSchema().nullish()),
      createdAt: z.lazy(() => DateTimeFilterInputSchema().nullish()),
      currency: z.lazy(() => StringFilterInputSchema().nullish()),
      footer: z.lazy(() => ComponentStoreFooterFiltersInputSchema().nullish()),
      header: z.lazy(() => ComponentStoreHeaderFiltersInputSchema().nullish()),
      id: z.lazy(() => IdFilterInputSchema().nullish()),
      name: z.lazy(() => StringFilterInputSchema().nullish()),
      not: z.lazy(() => StoreFiltersInputSchema().nullish()),
      or: z.array(z.lazy(() => StoreFiltersInputSchema().nullable())).nullish(),
      publishedAt: z.lazy(() => DateTimeFilterInputSchema().nullish()),
      shopifySettings: z.lazy(() =>
         ComponentStoreShopifySettingsFiltersInputSchema().nullish()
      ),
      socialMediaAccounts: z.lazy(() =>
         ComponentStoreSocialMediaAccountsFiltersInputSchema().nullish()
      ),
      updatedAt: z.lazy(() => DateTimeFilterInputSchema().nullish()),
      url: z.lazy(() => StringFilterInputSchema().nullish()),
   });
}

export function StoreInputSchema(): z.ZodObject<Properties<StoreInput>> {
   return z.object<Properties<StoreInput>>({
      code: z.string().nullish(),
      currency: Enum_Store_CurrencySchema.nullish(),
      footer: z.lazy(() => ComponentStoreFooterInputSchema().nullish()),
      header: z.lazy(() => ComponentStoreHeaderInputSchema().nullish()),
      name: z.string().nullish(),
      publishedAt: z.unknown().nullish(),
      shopifySettings: z.lazy(() =>
         ComponentStoreShopifySettingsInputSchema().nullish()
      ),
      socialMediaAccounts: z.lazy(() =>
         ComponentStoreSocialMediaAccountsInputSchema().nullish()
      ),
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
      nei: z.string().nullish(),
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

export function UploadFileFiltersInputSchema(): z.ZodObject<
   Properties<UploadFileFiltersInput>
> {
   return z.object<Properties<UploadFileFiltersInput>>({
      alternativeText: z.lazy(() => StringFilterInputSchema().nullish()),
      and: z
         .array(z.lazy(() => UploadFileFiltersInputSchema().nullable()))
         .nullish(),
      caption: z.lazy(() => StringFilterInputSchema().nullish()),
      createdAt: z.lazy(() => DateTimeFilterInputSchema().nullish()),
      ext: z.lazy(() => StringFilterInputSchema().nullish()),
      folder: z.lazy(() => UploadFolderFiltersInputSchema().nullish()),
      folderPath: z.lazy(() => StringFilterInputSchema().nullish()),
      formats: z.lazy(() => JsonFilterInputSchema().nullish()),
      hash: z.lazy(() => StringFilterInputSchema().nullish()),
      height: z.lazy(() => IntFilterInputSchema().nullish()),
      id: z.lazy(() => IdFilterInputSchema().nullish()),
      mime: z.lazy(() => StringFilterInputSchema().nullish()),
      name: z.lazy(() => StringFilterInputSchema().nullish()),
      not: z.lazy(() => UploadFileFiltersInputSchema().nullish()),
      or: z
         .array(z.lazy(() => UploadFileFiltersInputSchema().nullable()))
         .nullish(),
      previewUrl: z.lazy(() => StringFilterInputSchema().nullish()),
      provider: z.lazy(() => StringFilterInputSchema().nullish()),
      provider_metadata: z.lazy(() => JsonFilterInputSchema().nullish()),
      size: z.lazy(() => FloatFilterInputSchema().nullish()),
      updatedAt: z.lazy(() => DateTimeFilterInputSchema().nullish()),
      url: z.lazy(() => StringFilterInputSchema().nullish()),
      width: z.lazy(() => IntFilterInputSchema().nullish()),
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
      formats: z.unknown().nullish(),
      hash: z.string().nullish(),
      height: z.number().nullish(),
      mime: z.string().nullish(),
      name: z.string().nullish(),
      previewUrl: z.string().nullish(),
      provider: z.string().nullish(),
      provider_metadata: z.unknown().nullish(),
      size: z.number().nullish(),
      url: z.string().nullish(),
      width: z.number().nullish(),
   });
}

export function UploadFolderFiltersInputSchema(): z.ZodObject<
   Properties<UploadFolderFiltersInput>
> {
   return z.object<Properties<UploadFolderFiltersInput>>({
      and: z
         .array(z.lazy(() => UploadFolderFiltersInputSchema().nullable()))
         .nullish(),
      children: z.lazy(() => UploadFolderFiltersInputSchema().nullish()),
      createdAt: z.lazy(() => DateTimeFilterInputSchema().nullish()),
      files: z.lazy(() => UploadFileFiltersInputSchema().nullish()),
      id: z.lazy(() => IdFilterInputSchema().nullish()),
      name: z.lazy(() => StringFilterInputSchema().nullish()),
      not: z.lazy(() => UploadFolderFiltersInputSchema().nullish()),
      or: z
         .array(z.lazy(() => UploadFolderFiltersInputSchema().nullable()))
         .nullish(),
      parent: z.lazy(() => UploadFolderFiltersInputSchema().nullish()),
      path: z.lazy(() => StringFilterInputSchema().nullish()),
      pathId: z.lazy(() => IntFilterInputSchema().nullish()),
      updatedAt: z.lazy(() => DateTimeFilterInputSchema().nullish()),
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
      action: z.lazy(() => StringFilterInputSchema().nullish()),
      and: z
         .array(
            z.lazy(() =>
               UsersPermissionsPermissionFiltersInputSchema().nullable()
            )
         )
         .nullish(),
      createdAt: z.lazy(() => DateTimeFilterInputSchema().nullish()),
      id: z.lazy(() => IdFilterInputSchema().nullish()),
      not: z.lazy(() =>
         UsersPermissionsPermissionFiltersInputSchema().nullish()
      ),
      or: z
         .array(
            z.lazy(() =>
               UsersPermissionsPermissionFiltersInputSchema().nullable()
            )
         )
         .nullish(),
      role: z.lazy(() => UsersPermissionsRoleFiltersInputSchema().nullish()),
      updatedAt: z.lazy(() => DateTimeFilterInputSchema().nullish()),
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
      and: z
         .array(
            z.lazy(() => UsersPermissionsRoleFiltersInputSchema().nullable())
         )
         .nullish(),
      createdAt: z.lazy(() => DateTimeFilterInputSchema().nullish()),
      description: z.lazy(() => StringFilterInputSchema().nullish()),
      id: z.lazy(() => IdFilterInputSchema().nullish()),
      name: z.lazy(() => StringFilterInputSchema().nullish()),
      not: z.lazy(() => UsersPermissionsRoleFiltersInputSchema().nullish()),
      or: z
         .array(
            z.lazy(() => UsersPermissionsRoleFiltersInputSchema().nullable())
         )
         .nullish(),
      permissions: z.lazy(() =>
         UsersPermissionsPermissionFiltersInputSchema().nullish()
      ),
      type: z.lazy(() => StringFilterInputSchema().nullish()),
      updatedAt: z.lazy(() => DateTimeFilterInputSchema().nullish()),
      users: z.lazy(() => UsersPermissionsUserFiltersInputSchema().nullish()),
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
      and: z
         .array(
            z.lazy(() => UsersPermissionsUserFiltersInputSchema().nullable())
         )
         .nullish(),
      blocked: z.lazy(() => BooleanFilterInputSchema().nullish()),
      confirmationToken: z.lazy(() => StringFilterInputSchema().nullish()),
      confirmed: z.lazy(() => BooleanFilterInputSchema().nullish()),
      createdAt: z.lazy(() => DateTimeFilterInputSchema().nullish()),
      email: z.lazy(() => StringFilterInputSchema().nullish()),
      id: z.lazy(() => IdFilterInputSchema().nullish()),
      not: z.lazy(() => UsersPermissionsUserFiltersInputSchema().nullish()),
      or: z
         .array(
            z.lazy(() => UsersPermissionsUserFiltersInputSchema().nullable())
         )
         .nullish(),
      password: z.lazy(() => StringFilterInputSchema().nullish()),
      provider: z.lazy(() => StringFilterInputSchema().nullish()),
      resetPasswordToken: z.lazy(() => StringFilterInputSchema().nullish()),
      role: z.lazy(() => UsersPermissionsRoleFiltersInputSchema().nullish()),
      updatedAt: z.lazy(() => DateTimeFilterInputSchema().nullish()),
      username: z.lazy(() => StringFilterInputSchema().nullish()),
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
