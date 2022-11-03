export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
   [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
   { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
   { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
   ID: string;
   String: string;
   Boolean: boolean;
   Int: number;
   Float: number;
   /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
   DateTime: any;
   /** A string used to identify an i18n locale */
   I18NLocaleCode: any;
   /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
   JSON: any;
   MenuItemsDynamicZoneInput: any;
   PageSectionsDynamicZoneInput: any;
   ProductListSectionsDynamicZoneInput: any;
   /** The `Upload` scalar type represents a file upload. */
   Upload: any;
};

export type BooleanFilterInput = {
   and?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
   between?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
   contains?: InputMaybe<Scalars['Boolean']>;
   containsi?: InputMaybe<Scalars['Boolean']>;
   endsWith?: InputMaybe<Scalars['Boolean']>;
   eq?: InputMaybe<Scalars['Boolean']>;
   eqi?: InputMaybe<Scalars['Boolean']>;
   gt?: InputMaybe<Scalars['Boolean']>;
   gte?: InputMaybe<Scalars['Boolean']>;
   in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
   lt?: InputMaybe<Scalars['Boolean']>;
   lte?: InputMaybe<Scalars['Boolean']>;
   ne?: InputMaybe<Scalars['Boolean']>;
   not?: InputMaybe<BooleanFilterInput>;
   notContains?: InputMaybe<Scalars['Boolean']>;
   notContainsi?: InputMaybe<Scalars['Boolean']>;
   notIn?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
   notNull?: InputMaybe<Scalars['Boolean']>;
   null?: InputMaybe<Scalars['Boolean']>;
   or?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
   startsWith?: InputMaybe<Scalars['Boolean']>;
};

export type ComponentGlobalNewsletterForm = {
   __typename?: 'ComponentGlobalNewsletterForm';
   callToActionButtonTitle: Scalars['String'];
   id: Scalars['ID'];
   inputPlaceholder: Scalars['String'];
   subtitle: Scalars['String'];
   title: Scalars['String'];
};

export type ComponentGlobalNewsletterFormInput = {
   callToActionButtonTitle?: InputMaybe<Scalars['String']>;
   id?: InputMaybe<Scalars['ID']>;
   inputPlaceholder?: InputMaybe<Scalars['String']>;
   subtitle?: InputMaybe<Scalars['String']>;
   title?: InputMaybe<Scalars['String']>;
};

export type ComponentMenuLink = {
   __typename?: 'ComponentMenuLink';
   description?: Maybe<Scalars['String']>;
   id: Scalars['ID'];
   name: Scalars['String'];
   url: Scalars['String'];
};

export type ComponentMenuLinkWithImage = {
   __typename?: 'ComponentMenuLinkWithImage';
   id: Scalars['ID'];
   image: UploadFileEntityResponse;
   name: Scalars['String'];
   url: Scalars['String'];
};

export type ComponentMenuProductListLink = {
   __typename?: 'ComponentMenuProductListLink';
   id: Scalars['ID'];
   name: Scalars['String'];
   productList?: Maybe<ProductListEntityResponse>;
};

export type ComponentMenuSubmenu = {
   __typename?: 'ComponentMenuSubmenu';
   id: Scalars['ID'];
   name: Scalars['String'];
   submenu?: Maybe<MenuEntityResponse>;
};

export type ComponentPageBrowse = {
   __typename?: 'ComponentPageBrowse';
   categories?: Maybe<Array<Maybe<ComponentPageCategory>>>;
   description?: Maybe<Scalars['String']>;
   id: Scalars['ID'];
   image?: Maybe<UploadFileEntityResponse>;
   title?: Maybe<Scalars['String']>;
};

export type ComponentPageBrowseCategoriesArgs = {
   filters?: InputMaybe<ComponentPageCategoryFiltersInput>;
   pagination?: InputMaybe<PaginationArg>;
   sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentPageCallToAction = {
   __typename?: 'ComponentPageCallToAction';
   id: Scalars['ID'];
   title: Scalars['String'];
   url: Scalars['String'];
};

export type ComponentPageCategory = {
   __typename?: 'ComponentPageCategory';
   id: Scalars['ID'];
   productList?: Maybe<ProductListEntityResponse>;
};

export type ComponentPageCategoryFiltersInput = {
   and?: InputMaybe<Array<InputMaybe<ComponentPageCategoryFiltersInput>>>;
   not?: InputMaybe<ComponentPageCategoryFiltersInput>;
   or?: InputMaybe<Array<InputMaybe<ComponentPageCategoryFiltersInput>>>;
   productList?: InputMaybe<ProductListFiltersInput>;
};

export type ComponentPageHero = {
   __typename?: 'ComponentPageHero';
   callToAction?: Maybe<ComponentPageCallToAction>;
   description?: Maybe<Scalars['String']>;
   id: Scalars['ID'];
   image?: Maybe<UploadFileEntityResponse>;
   title?: Maybe<Scalars['String']>;
};

export type ComponentPageStatItem = {
   __typename?: 'ComponentPageStatItem';
   id: Scalars['ID'];
   label: Scalars['String'];
   value: Scalars['String'];
};

export type ComponentPageStatItemFiltersInput = {
   and?: InputMaybe<Array<InputMaybe<ComponentPageStatItemFiltersInput>>>;
   label?: InputMaybe<StringFilterInput>;
   not?: InputMaybe<ComponentPageStatItemFiltersInput>;
   or?: InputMaybe<Array<InputMaybe<ComponentPageStatItemFiltersInput>>>;
   value?: InputMaybe<StringFilterInput>;
};

export type ComponentPageStats = {
   __typename?: 'ComponentPageStats';
   id: Scalars['ID'];
   stats: Array<Maybe<ComponentPageStatItem>>;
};

export type ComponentPageStatsStatsArgs = {
   filters?: InputMaybe<ComponentPageStatItemFiltersInput>;
   pagination?: InputMaybe<PaginationArg>;
   sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentProductListBanner = {
   __typename?: 'ComponentProductListBanner';
   callToActionLabel: Scalars['String'];
   description: Scalars['String'];
   id: Scalars['ID'];
   title: Scalars['String'];
   url: Scalars['String'];
};

export type ComponentProductListFeaturedProductList = {
   __typename?: 'ComponentProductListFeaturedProductList';
   id: Scalars['ID'];
   productList?: Maybe<ProductListEntityResponse>;
};

export type ComponentProductListLinkedProductListSet = {
   __typename?: 'ComponentProductListLinkedProductListSet';
   id: Scalars['ID'];
   productLists?: Maybe<ProductListRelationResponseCollection>;
   title: Scalars['String'];
};

export type ComponentProductListLinkedProductListSetProductListsArgs = {
   filters?: InputMaybe<ProductListFiltersInput>;
   pagination?: InputMaybe<PaginationArg>;
   publicationState?: InputMaybe<PublicationState>;
   sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentProductListRelatedPosts = {
   __typename?: 'ComponentProductListRelatedPosts';
   id: Scalars['ID'];
   tags?: Maybe<Scalars['String']>;
};

export type ComponentStoreFooter = {
   __typename?: 'ComponentStoreFooter';
   bottomMenu?: Maybe<MenuEntityResponse>;
   id: Scalars['ID'];
   menu1?: Maybe<MenuEntityResponse>;
   menu2?: Maybe<MenuEntityResponse>;
   partners?: Maybe<MenuEntityResponse>;
};

export type ComponentStoreFooterFiltersInput = {
   and?: InputMaybe<Array<InputMaybe<ComponentStoreFooterFiltersInput>>>;
   bottomMenu?: InputMaybe<MenuFiltersInput>;
   menu1?: InputMaybe<MenuFiltersInput>;
   menu2?: InputMaybe<MenuFiltersInput>;
   not?: InputMaybe<ComponentStoreFooterFiltersInput>;
   or?: InputMaybe<Array<InputMaybe<ComponentStoreFooterFiltersInput>>>;
   partners?: InputMaybe<MenuFiltersInput>;
};

export type ComponentStoreFooterInput = {
   bottomMenu?: InputMaybe<Scalars['ID']>;
   id?: InputMaybe<Scalars['ID']>;
   menu1?: InputMaybe<Scalars['ID']>;
   menu2?: InputMaybe<Scalars['ID']>;
   partners?: InputMaybe<Scalars['ID']>;
};

export type ComponentStoreHeader = {
   __typename?: 'ComponentStoreHeader';
   id: Scalars['ID'];
   menu?: Maybe<MenuEntityResponse>;
};

export type ComponentStoreHeaderFiltersInput = {
   and?: InputMaybe<Array<InputMaybe<ComponentStoreHeaderFiltersInput>>>;
   menu?: InputMaybe<MenuFiltersInput>;
   not?: InputMaybe<ComponentStoreHeaderFiltersInput>;
   or?: InputMaybe<Array<InputMaybe<ComponentStoreHeaderFiltersInput>>>;
};

export type ComponentStoreHeaderInput = {
   id?: InputMaybe<Scalars['ID']>;
   menu?: InputMaybe<Scalars['ID']>;
};

export type ComponentStoreShopifySettings = {
   __typename?: 'ComponentStoreShopifySettings';
   id: Scalars['ID'];
   storefrontAccessToken: Scalars['String'];
   storefrontDomain: Scalars['String'];
};

export type ComponentStoreShopifySettingsFiltersInput = {
   and?: InputMaybe<
      Array<InputMaybe<ComponentStoreShopifySettingsFiltersInput>>
   >;
   not?: InputMaybe<ComponentStoreShopifySettingsFiltersInput>;
   or?: InputMaybe<
      Array<InputMaybe<ComponentStoreShopifySettingsFiltersInput>>
   >;
   storefrontAccessToken?: InputMaybe<StringFilterInput>;
   storefrontDomain?: InputMaybe<StringFilterInput>;
};

export type ComponentStoreShopifySettingsInput = {
   id?: InputMaybe<Scalars['ID']>;
   storefrontAccessToken?: InputMaybe<Scalars['String']>;
   storefrontDomain?: InputMaybe<Scalars['String']>;
};

export type ComponentStoreSocialMediaAccounts = {
   __typename?: 'ComponentStoreSocialMediaAccounts';
   facebook?: Maybe<Scalars['String']>;
   id: Scalars['ID'];
   instagram?: Maybe<Scalars['String']>;
   repairOrg?: Maybe<Scalars['String']>;
   twitter?: Maybe<Scalars['String']>;
   tiktok?: Maybe<Scalars['String']>;
   youtube?: Maybe<Scalars['String']>;
};

export type ComponentStoreSocialMediaAccountsFiltersInput = {
   and?: InputMaybe<
      Array<InputMaybe<ComponentStoreSocialMediaAccountsFiltersInput>>
   >;
   facebook?: InputMaybe<StringFilterInput>;
   instagram?: InputMaybe<StringFilterInput>;
   not?: InputMaybe<ComponentStoreSocialMediaAccountsFiltersInput>;
   or?: InputMaybe<
      Array<InputMaybe<ComponentStoreSocialMediaAccountsFiltersInput>>
   >;
   repairOrg?: InputMaybe<StringFilterInput>;
   twitter?: InputMaybe<StringFilterInput>;
   tiktok?: InputMaybe<StringFilterInput>;
   youtube?: InputMaybe<StringFilterInput>;
};

export type ComponentStoreSocialMediaAccountsInput = {
   facebook?: InputMaybe<Scalars['String']>;
   id?: InputMaybe<Scalars['ID']>;
   instagram?: InputMaybe<Scalars['String']>;
   repairOrg?: InputMaybe<Scalars['String']>;
   twitter?: InputMaybe<Scalars['String']>;
   tiktok?: InputMaybe<Scalars['String']>;
   youtube?: InputMaybe<Scalars['String']>;
};

export type DateTimeFilterInput = {
   and?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
   between?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
   contains?: InputMaybe<Scalars['DateTime']>;
   containsi?: InputMaybe<Scalars['DateTime']>;
   endsWith?: InputMaybe<Scalars['DateTime']>;
   eq?: InputMaybe<Scalars['DateTime']>;
   eqi?: InputMaybe<Scalars['DateTime']>;
   gt?: InputMaybe<Scalars['DateTime']>;
   gte?: InputMaybe<Scalars['DateTime']>;
   in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
   lt?: InputMaybe<Scalars['DateTime']>;
   lte?: InputMaybe<Scalars['DateTime']>;
   ne?: InputMaybe<Scalars['DateTime']>;
   not?: InputMaybe<DateTimeFilterInput>;
   notContains?: InputMaybe<Scalars['DateTime']>;
   notContainsi?: InputMaybe<Scalars['DateTime']>;
   notIn?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
   notNull?: InputMaybe<Scalars['Boolean']>;
   null?: InputMaybe<Scalars['Boolean']>;
   or?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
   startsWith?: InputMaybe<Scalars['DateTime']>;
};

export enum Enum_Productlist_Type {
   AllParts = 'all_parts',
   AllTools = 'all_tools',
   Marketing = 'marketing',
   Parts = 'parts',
   Tools = 'tools',
   Store = 'store',
}

export enum Enum_Store_Currency {
   Aud = 'AUD',
   Cad = 'CAD',
   Eur = 'EUR',
   Gbp = 'GBP',
   Usd = 'USD',
}

export type Error = {
   __typename?: 'Error';
   code: Scalars['String'];
   message?: Maybe<Scalars['String']>;
};

export type FileInfoInput = {
   alternativeText?: InputMaybe<Scalars['String']>;
   caption?: InputMaybe<Scalars['String']>;
   name?: InputMaybe<Scalars['String']>;
};

export type FloatFilterInput = {
   and?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
   between?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
   contains?: InputMaybe<Scalars['Float']>;
   containsi?: InputMaybe<Scalars['Float']>;
   endsWith?: InputMaybe<Scalars['Float']>;
   eq?: InputMaybe<Scalars['Float']>;
   eqi?: InputMaybe<Scalars['Float']>;
   gt?: InputMaybe<Scalars['Float']>;
   gte?: InputMaybe<Scalars['Float']>;
   in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
   lt?: InputMaybe<Scalars['Float']>;
   lte?: InputMaybe<Scalars['Float']>;
   ne?: InputMaybe<Scalars['Float']>;
   not?: InputMaybe<FloatFilterInput>;
   notContains?: InputMaybe<Scalars['Float']>;
   notContainsi?: InputMaybe<Scalars['Float']>;
   notIn?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
   notNull?: InputMaybe<Scalars['Boolean']>;
   null?: InputMaybe<Scalars['Boolean']>;
   or?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
   startsWith?: InputMaybe<Scalars['Float']>;
};

export type GenericMorph =
   | ComponentGlobalNewsletterForm
   | ComponentMenuLink
   | ComponentMenuLinkWithImage
   | ComponentMenuProductListLink
   | ComponentMenuSubmenu
   | ComponentPageBrowse
   | ComponentPageCallToAction
   | ComponentPageCategory
   | ComponentPageHero
   | ComponentPageStatItem
   | ComponentPageStats
   | ComponentProductListBanner
   | ComponentProductListFeaturedProductList
   | ComponentProductListLinkedProductListSet
   | ComponentProductListRelatedPosts
   | ComponentStoreFooter
   | ComponentStoreHeader
   | ComponentStoreShopifySettings
   | ComponentStoreSocialMediaAccounts
   | Global
   | I18NLocale
   | Menu
   | Page
   | ProductList
   | Store
   | UploadFile
   | UploadFolder
   | UsersPermissionsPermission
   | UsersPermissionsRole
   | UsersPermissionsUser;

export type Global = {
   __typename?: 'Global';
   createdAt?: Maybe<Scalars['DateTime']>;
   locale?: Maybe<Scalars['String']>;
   localizations?: Maybe<GlobalRelationResponseCollection>;
   newsletterForm: ComponentGlobalNewsletterForm;
   publishedAt?: Maybe<Scalars['DateTime']>;
   updatedAt?: Maybe<Scalars['DateTime']>;
};

export type GlobalLocalizationsArgs = {
   publicationState?: InputMaybe<PublicationState>;
};

export type GlobalEntity = {
   __typename?: 'GlobalEntity';
   attributes?: Maybe<Global>;
   id?: Maybe<Scalars['ID']>;
};

export type GlobalEntityResponse = {
   __typename?: 'GlobalEntityResponse';
   data?: Maybe<GlobalEntity>;
};

export type GlobalInput = {
   newsletterForm?: InputMaybe<ComponentGlobalNewsletterFormInput>;
   publishedAt?: InputMaybe<Scalars['DateTime']>;
};

export type GlobalRelationResponseCollection = {
   __typename?: 'GlobalRelationResponseCollection';
   data: Array<GlobalEntity>;
};

export type I18NLocale = {
   __typename?: 'I18NLocale';
   code?: Maybe<Scalars['String']>;
   createdAt?: Maybe<Scalars['DateTime']>;
   name?: Maybe<Scalars['String']>;
   updatedAt?: Maybe<Scalars['DateTime']>;
};

export type I18NLocaleEntity = {
   __typename?: 'I18NLocaleEntity';
   attributes?: Maybe<I18NLocale>;
   id?: Maybe<Scalars['ID']>;
};

export type I18NLocaleEntityResponse = {
   __typename?: 'I18NLocaleEntityResponse';
   data?: Maybe<I18NLocaleEntity>;
};

export type I18NLocaleEntityResponseCollection = {
   __typename?: 'I18NLocaleEntityResponseCollection';
   data: Array<I18NLocaleEntity>;
   meta: ResponseCollectionMeta;
};

export type I18NLocaleFiltersInput = {
   and?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
   code?: InputMaybe<StringFilterInput>;
   createdAt?: InputMaybe<DateTimeFilterInput>;
   id?: InputMaybe<IdFilterInput>;
   name?: InputMaybe<StringFilterInput>;
   not?: InputMaybe<I18NLocaleFiltersInput>;
   or?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
   updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type IdFilterInput = {
   and?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
   between?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
   contains?: InputMaybe<Scalars['ID']>;
   containsi?: InputMaybe<Scalars['ID']>;
   endsWith?: InputMaybe<Scalars['ID']>;
   eq?: InputMaybe<Scalars['ID']>;
   eqi?: InputMaybe<Scalars['ID']>;
   gt?: InputMaybe<Scalars['ID']>;
   gte?: InputMaybe<Scalars['ID']>;
   in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
   lt?: InputMaybe<Scalars['ID']>;
   lte?: InputMaybe<Scalars['ID']>;
   ne?: InputMaybe<Scalars['ID']>;
   not?: InputMaybe<IdFilterInput>;
   notContains?: InputMaybe<Scalars['ID']>;
   notContainsi?: InputMaybe<Scalars['ID']>;
   notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
   notNull?: InputMaybe<Scalars['Boolean']>;
   null?: InputMaybe<Scalars['Boolean']>;
   or?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
   startsWith?: InputMaybe<Scalars['ID']>;
};

export type IntFilterInput = {
   and?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
   between?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
   contains?: InputMaybe<Scalars['Int']>;
   containsi?: InputMaybe<Scalars['Int']>;
   endsWith?: InputMaybe<Scalars['Int']>;
   eq?: InputMaybe<Scalars['Int']>;
   eqi?: InputMaybe<Scalars['Int']>;
   gt?: InputMaybe<Scalars['Int']>;
   gte?: InputMaybe<Scalars['Int']>;
   in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
   lt?: InputMaybe<Scalars['Int']>;
   lte?: InputMaybe<Scalars['Int']>;
   ne?: InputMaybe<Scalars['Int']>;
   not?: InputMaybe<IntFilterInput>;
   notContains?: InputMaybe<Scalars['Int']>;
   notContainsi?: InputMaybe<Scalars['Int']>;
   notIn?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
   notNull?: InputMaybe<Scalars['Boolean']>;
   null?: InputMaybe<Scalars['Boolean']>;
   or?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
   startsWith?: InputMaybe<Scalars['Int']>;
};

export type JsonFilterInput = {
   and?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
   between?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
   contains?: InputMaybe<Scalars['JSON']>;
   containsi?: InputMaybe<Scalars['JSON']>;
   endsWith?: InputMaybe<Scalars['JSON']>;
   eq?: InputMaybe<Scalars['JSON']>;
   eqi?: InputMaybe<Scalars['JSON']>;
   gt?: InputMaybe<Scalars['JSON']>;
   gte?: InputMaybe<Scalars['JSON']>;
   in?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
   lt?: InputMaybe<Scalars['JSON']>;
   lte?: InputMaybe<Scalars['JSON']>;
   ne?: InputMaybe<Scalars['JSON']>;
   not?: InputMaybe<JsonFilterInput>;
   notContains?: InputMaybe<Scalars['JSON']>;
   notContainsi?: InputMaybe<Scalars['JSON']>;
   notIn?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
   notNull?: InputMaybe<Scalars['Boolean']>;
   null?: InputMaybe<Scalars['Boolean']>;
   or?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
   startsWith?: InputMaybe<Scalars['JSON']>;
};

export type Menu = {
   __typename?: 'Menu';
   createdAt?: Maybe<Scalars['DateTime']>;
   items: Array<Maybe<MenuItemsDynamicZone>>;
   locale?: Maybe<Scalars['String']>;
   localizations?: Maybe<MenuRelationResponseCollection>;
   publishedAt?: Maybe<Scalars['DateTime']>;
   title: Scalars['String'];
   updatedAt?: Maybe<Scalars['DateTime']>;
};

export type MenuLocalizationsArgs = {
   filters?: InputMaybe<MenuFiltersInput>;
   pagination?: InputMaybe<PaginationArg>;
   publicationState?: InputMaybe<PublicationState>;
   sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type MenuEntity = {
   __typename?: 'MenuEntity';
   attributes?: Maybe<Menu>;
   id?: Maybe<Scalars['ID']>;
};

export type MenuEntityResponse = {
   __typename?: 'MenuEntityResponse';
   data?: Maybe<MenuEntity>;
};

export type MenuEntityResponseCollection = {
   __typename?: 'MenuEntityResponseCollection';
   data: Array<MenuEntity>;
   meta: ResponseCollectionMeta;
};

export type MenuFiltersInput = {
   and?: InputMaybe<Array<InputMaybe<MenuFiltersInput>>>;
   createdAt?: InputMaybe<DateTimeFilterInput>;
   id?: InputMaybe<IdFilterInput>;
   locale?: InputMaybe<StringFilterInput>;
   localizations?: InputMaybe<MenuFiltersInput>;
   not?: InputMaybe<MenuFiltersInput>;
   or?: InputMaybe<Array<InputMaybe<MenuFiltersInput>>>;
   publishedAt?: InputMaybe<DateTimeFilterInput>;
   title?: InputMaybe<StringFilterInput>;
   updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type MenuInput = {
   items?: InputMaybe<Array<Scalars['MenuItemsDynamicZoneInput']>>;
   publishedAt?: InputMaybe<Scalars['DateTime']>;
   title?: InputMaybe<Scalars['String']>;
};

export type MenuItemsDynamicZone =
   | ComponentMenuLink
   | ComponentMenuLinkWithImage
   | ComponentMenuProductListLink
   | ComponentMenuSubmenu
   | Error;

export type MenuRelationResponseCollection = {
   __typename?: 'MenuRelationResponseCollection';
   data: Array<MenuEntity>;
};

export type Mutation = {
   __typename?: 'Mutation';
   /** Change user password. Confirm with the current password. */
   changePassword?: Maybe<UsersPermissionsLoginPayload>;
   createGlobalLocalization?: Maybe<GlobalEntityResponse>;
   createMenu?: Maybe<MenuEntityResponse>;
   createMenuLocalization?: Maybe<MenuEntityResponse>;
   createPage?: Maybe<PageEntityResponse>;
   createPageLocalization?: Maybe<PageEntityResponse>;
   createProductList?: Maybe<ProductListEntityResponse>;
   createProductListLocalization?: Maybe<ProductListEntityResponse>;
   createStore?: Maybe<StoreEntityResponse>;
   createUploadFile?: Maybe<UploadFileEntityResponse>;
   createUploadFolder?: Maybe<UploadFolderEntityResponse>;
   /** Create a new role */
   createUsersPermissionsRole?: Maybe<UsersPermissionsCreateRolePayload>;
   /** Create a new user */
   createUsersPermissionsUser: UsersPermissionsUserEntityResponse;
   deleteGlobal?: Maybe<GlobalEntityResponse>;
   deleteMenu?: Maybe<MenuEntityResponse>;
   deletePage?: Maybe<PageEntityResponse>;
   deleteProductList?: Maybe<ProductListEntityResponse>;
   deleteStore?: Maybe<StoreEntityResponse>;
   deleteUploadFile?: Maybe<UploadFileEntityResponse>;
   deleteUploadFolder?: Maybe<UploadFolderEntityResponse>;
   /** Delete an existing role */
   deleteUsersPermissionsRole?: Maybe<UsersPermissionsDeleteRolePayload>;
   /** Delete an existing user */
   deleteUsersPermissionsUser: UsersPermissionsUserEntityResponse;
   /** Confirm an email users email address */
   emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
   /** Request a reset password token */
   forgotPassword?: Maybe<UsersPermissionsPasswordPayload>;
   login: UsersPermissionsLoginPayload;
   multipleUpload: Array<Maybe<UploadFileEntityResponse>>;
   /** Register a user */
   register: UsersPermissionsLoginPayload;
   removeFile?: Maybe<UploadFileEntityResponse>;
   /** Reset user password. Confirm with a code (resetToken from forgotPassword) */
   resetPassword?: Maybe<UsersPermissionsLoginPayload>;
   updateFileInfo: UploadFileEntityResponse;
   updateGlobal?: Maybe<GlobalEntityResponse>;
   updateMenu?: Maybe<MenuEntityResponse>;
   updatePage?: Maybe<PageEntityResponse>;
   updateProductList?: Maybe<ProductListEntityResponse>;
   updateStore?: Maybe<StoreEntityResponse>;
   updateUploadFile?: Maybe<UploadFileEntityResponse>;
   updateUploadFolder?: Maybe<UploadFolderEntityResponse>;
   /** Update an existing role */
   updateUsersPermissionsRole?: Maybe<UsersPermissionsUpdateRolePayload>;
   /** Update an existing user */
   updateUsersPermissionsUser: UsersPermissionsUserEntityResponse;
   upload: UploadFileEntityResponse;
};

export type MutationChangePasswordArgs = {
   currentPassword: Scalars['String'];
   password: Scalars['String'];
   passwordConfirmation: Scalars['String'];
};

export type MutationCreateGlobalLocalizationArgs = {
   data?: InputMaybe<GlobalInput>;
   id?: InputMaybe<Scalars['ID']>;
   locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};

export type MutationCreateMenuArgs = {
   data: MenuInput;
   locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};

export type MutationCreateMenuLocalizationArgs = {
   data?: InputMaybe<MenuInput>;
   id?: InputMaybe<Scalars['ID']>;
   locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};

export type MutationCreatePageArgs = {
   data: PageInput;
   locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};

export type MutationCreatePageLocalizationArgs = {
   data?: InputMaybe<PageInput>;
   id?: InputMaybe<Scalars['ID']>;
   locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};

export type MutationCreateProductListArgs = {
   data: ProductListInput;
   locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};

export type MutationCreateProductListLocalizationArgs = {
   data?: InputMaybe<ProductListInput>;
   id?: InputMaybe<Scalars['ID']>;
   locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};

export type MutationCreateStoreArgs = {
   data: StoreInput;
};

export type MutationCreateUploadFileArgs = {
   data: UploadFileInput;
};

export type MutationCreateUploadFolderArgs = {
   data: UploadFolderInput;
};

export type MutationCreateUsersPermissionsRoleArgs = {
   data: UsersPermissionsRoleInput;
};

export type MutationCreateUsersPermissionsUserArgs = {
   data: UsersPermissionsUserInput;
};

export type MutationDeleteGlobalArgs = {
   locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};

export type MutationDeleteMenuArgs = {
   id: Scalars['ID'];
   locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};

export type MutationDeletePageArgs = {
   id: Scalars['ID'];
   locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};

export type MutationDeleteProductListArgs = {
   id: Scalars['ID'];
   locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};

export type MutationDeleteStoreArgs = {
   id: Scalars['ID'];
};

export type MutationDeleteUploadFileArgs = {
   id: Scalars['ID'];
};

export type MutationDeleteUploadFolderArgs = {
   id: Scalars['ID'];
};

export type MutationDeleteUsersPermissionsRoleArgs = {
   id: Scalars['ID'];
};

export type MutationDeleteUsersPermissionsUserArgs = {
   id: Scalars['ID'];
};

export type MutationEmailConfirmationArgs = {
   confirmation: Scalars['String'];
};

export type MutationForgotPasswordArgs = {
   email: Scalars['String'];
};

export type MutationLoginArgs = {
   input: UsersPermissionsLoginInput;
};

export type MutationMultipleUploadArgs = {
   field?: InputMaybe<Scalars['String']>;
   files: Array<InputMaybe<Scalars['Upload']>>;
   ref?: InputMaybe<Scalars['String']>;
   refId?: InputMaybe<Scalars['ID']>;
};

export type MutationRegisterArgs = {
   input: UsersPermissionsRegisterInput;
};

export type MutationRemoveFileArgs = {
   id: Scalars['ID'];
};

export type MutationResetPasswordArgs = {
   code: Scalars['String'];
   password: Scalars['String'];
   passwordConfirmation: Scalars['String'];
};

export type MutationUpdateFileInfoArgs = {
   id: Scalars['ID'];
   info?: InputMaybe<FileInfoInput>;
};

export type MutationUpdateGlobalArgs = {
   data: GlobalInput;
   locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};

export type MutationUpdateMenuArgs = {
   data: MenuInput;
   id: Scalars['ID'];
   locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};

export type MutationUpdatePageArgs = {
   data: PageInput;
   id: Scalars['ID'];
   locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};

export type MutationUpdateProductListArgs = {
   data: ProductListInput;
   id: Scalars['ID'];
   locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};

export type MutationUpdateStoreArgs = {
   data: StoreInput;
   id: Scalars['ID'];
};

export type MutationUpdateUploadFileArgs = {
   data: UploadFileInput;
   id: Scalars['ID'];
};

export type MutationUpdateUploadFolderArgs = {
   data: UploadFolderInput;
   id: Scalars['ID'];
};

export type MutationUpdateUsersPermissionsRoleArgs = {
   data: UsersPermissionsRoleInput;
   id: Scalars['ID'];
};

export type MutationUpdateUsersPermissionsUserArgs = {
   data: UsersPermissionsUserInput;
   id: Scalars['ID'];
};

export type MutationUploadArgs = {
   field?: InputMaybe<Scalars['String']>;
   file: Scalars['Upload'];
   info?: InputMaybe<FileInfoInput>;
   ref?: InputMaybe<Scalars['String']>;
   refId?: InputMaybe<Scalars['ID']>;
};

export type Page = {
   __typename?: 'Page';
   createdAt?: Maybe<Scalars['DateTime']>;
   locale?: Maybe<Scalars['String']>;
   localizations?: Maybe<PageRelationResponseCollection>;
   path: Scalars['String'];
   publishedAt?: Maybe<Scalars['DateTime']>;
   sections: Array<Maybe<PageSectionsDynamicZone>>;
   title: Scalars['String'];
   updatedAt?: Maybe<Scalars['DateTime']>;
};

export type PageLocalizationsArgs = {
   filters?: InputMaybe<PageFiltersInput>;
   pagination?: InputMaybe<PaginationArg>;
   publicationState?: InputMaybe<PublicationState>;
   sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type PageEntity = {
   __typename?: 'PageEntity';
   attributes?: Maybe<Page>;
   id?: Maybe<Scalars['ID']>;
};

export type PageEntityResponse = {
   __typename?: 'PageEntityResponse';
   data?: Maybe<PageEntity>;
};

export type PageEntityResponseCollection = {
   __typename?: 'PageEntityResponseCollection';
   data: Array<PageEntity>;
   meta: ResponseCollectionMeta;
};

export type PageFiltersInput = {
   and?: InputMaybe<Array<InputMaybe<PageFiltersInput>>>;
   createdAt?: InputMaybe<DateTimeFilterInput>;
   id?: InputMaybe<IdFilterInput>;
   locale?: InputMaybe<StringFilterInput>;
   localizations?: InputMaybe<PageFiltersInput>;
   not?: InputMaybe<PageFiltersInput>;
   or?: InputMaybe<Array<InputMaybe<PageFiltersInput>>>;
   path?: InputMaybe<StringFilterInput>;
   publishedAt?: InputMaybe<DateTimeFilterInput>;
   title?: InputMaybe<StringFilterInput>;
   updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type PageInput = {
   path?: InputMaybe<Scalars['String']>;
   publishedAt?: InputMaybe<Scalars['DateTime']>;
   sections?: InputMaybe<Array<Scalars['PageSectionsDynamicZoneInput']>>;
   title?: InputMaybe<Scalars['String']>;
};

export type PageRelationResponseCollection = {
   __typename?: 'PageRelationResponseCollection';
   data: Array<PageEntity>;
};

export type PageSectionsDynamicZone =
   | ComponentPageBrowse
   | ComponentPageHero
   | ComponentPageStats
   | Error;

export type Pagination = {
   __typename?: 'Pagination';
   page: Scalars['Int'];
   pageCount: Scalars['Int'];
   pageSize: Scalars['Int'];
   total: Scalars['Int'];
};

export type PaginationArg = {
   limit?: InputMaybe<Scalars['Int']>;
   page?: InputMaybe<Scalars['Int']>;
   pageSize?: InputMaybe<Scalars['Int']>;
   start?: InputMaybe<Scalars['Int']>;
};

export type ProductList = {
   __typename?: 'ProductList';
   children?: Maybe<ProductListRelationResponseCollection>;
   childrenHeading?: Maybe<Scalars['String']>;
   createdAt?: Maybe<Scalars['DateTime']>;
   description: Scalars['String'];
   deviceTitle?: Maybe<Scalars['String']>;
   excludeFromHierarchyDisplay: Scalars['Boolean'];
   filters?: Maybe<Scalars['String']>;
   handle: Scalars['String'];
   image?: Maybe<UploadFileEntityResponse>;
   legacyDescription?: Maybe<Scalars['String']>;
   legacyPageId?: Maybe<Scalars['Int']>;
   locale?: Maybe<Scalars['String']>;
   localizations?: Maybe<ProductListRelationResponseCollection>;
   metaDescription?: Maybe<Scalars['String']>;
   metaTitle?: Maybe<Scalars['String']>;
   parent?: Maybe<ProductListEntityResponse>;
   publishedAt?: Maybe<Scalars['DateTime']>;
   sections: Array<Maybe<ProductListSectionsDynamicZone>>;
   sortPriority?: Maybe<Scalars['Int']>;
   tagline?: Maybe<Scalars['String']>;
   title: Scalars['String'];
   type?: Maybe<Enum_Productlist_Type>;
   updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ProductListChildrenArgs = {
   filters?: InputMaybe<ProductListFiltersInput>;
   pagination?: InputMaybe<PaginationArg>;
   publicationState?: InputMaybe<PublicationState>;
   sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ProductListLocalizationsArgs = {
   filters?: InputMaybe<ProductListFiltersInput>;
   pagination?: InputMaybe<PaginationArg>;
   publicationState?: InputMaybe<PublicationState>;
   sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ProductListEntity = {
   __typename?: 'ProductListEntity';
   attributes?: Maybe<ProductList>;
   id?: Maybe<Scalars['ID']>;
};

export type ProductListEntityResponse = {
   __typename?: 'ProductListEntityResponse';
   data?: Maybe<ProductListEntity>;
};

export type ProductListEntityResponseCollection = {
   __typename?: 'ProductListEntityResponseCollection';
   data: Array<ProductListEntity>;
   meta: ResponseCollectionMeta;
};

export type ProductListFiltersInput = {
   and?: InputMaybe<Array<InputMaybe<ProductListFiltersInput>>>;
   children?: InputMaybe<ProductListFiltersInput>;
   childrenHeading?: InputMaybe<StringFilterInput>;
   createdAt?: InputMaybe<DateTimeFilterInput>;
   description?: InputMaybe<StringFilterInput>;
   deviceTitle?: InputMaybe<StringFilterInput>;
   excludeFromHierarchyDisplay?: InputMaybe<BooleanFilterInput>;
   filters?: InputMaybe<StringFilterInput>;
   handle?: InputMaybe<StringFilterInput>;
   id?: InputMaybe<IdFilterInput>;
   legacyDescription?: InputMaybe<StringFilterInput>;
   legacyPageId?: InputMaybe<IntFilterInput>;
   locale?: InputMaybe<StringFilterInput>;
   localizations?: InputMaybe<ProductListFiltersInput>;
   metaDescription?: InputMaybe<StringFilterInput>;
   metaTitle?: InputMaybe<StringFilterInput>;
   not?: InputMaybe<ProductListFiltersInput>;
   or?: InputMaybe<Array<InputMaybe<ProductListFiltersInput>>>;
   parent?: InputMaybe<ProductListFiltersInput>;
   publishedAt?: InputMaybe<DateTimeFilterInput>;
   sortPriority?: InputMaybe<IntFilterInput>;
   tagline?: InputMaybe<StringFilterInput>;
   title?: InputMaybe<StringFilterInput>;
   type?: InputMaybe<StringFilterInput>;
   updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ProductListInput = {
   children?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
   childrenHeading?: InputMaybe<Scalars['String']>;
   description?: InputMaybe<Scalars['String']>;
   deviceTitle?: InputMaybe<Scalars['String']>;
   excludeFromHierarchyDisplay?: InputMaybe<Scalars['Boolean']>;
   filters?: InputMaybe<Scalars['String']>;
   handle?: InputMaybe<Scalars['String']>;
   image?: InputMaybe<Scalars['ID']>;
   legacyDescription?: InputMaybe<Scalars['String']>;
   legacyPageId?: InputMaybe<Scalars['Int']>;
   metaDescription?: InputMaybe<Scalars['String']>;
   metaTitle?: InputMaybe<Scalars['String']>;
   parent?: InputMaybe<Scalars['ID']>;
   publishedAt?: InputMaybe<Scalars['DateTime']>;
   sections?: InputMaybe<Array<Scalars['ProductListSectionsDynamicZoneInput']>>;
   sortPriority?: InputMaybe<Scalars['Int']>;
   tagline?: InputMaybe<Scalars['String']>;
   title?: InputMaybe<Scalars['String']>;
   type?: InputMaybe<Enum_Productlist_Type>;
};

export type ProductListRelationResponseCollection = {
   __typename?: 'ProductListRelationResponseCollection';
   data: Array<ProductListEntity>;
};

export type ProductListSectionsDynamicZone =
   | ComponentProductListBanner
   | ComponentProductListFeaturedProductList
   | ComponentProductListLinkedProductListSet
   | ComponentProductListRelatedPosts
   | Error;

export enum PublicationState {
   Live = 'LIVE',
   Preview = 'PREVIEW',
}

export type Query = {
   __typename?: 'Query';
   global?: Maybe<GlobalEntityResponse>;
   i18NLocale?: Maybe<I18NLocaleEntityResponse>;
   i18NLocales?: Maybe<I18NLocaleEntityResponseCollection>;
   me?: Maybe<UsersPermissionsMe>;
   menu?: Maybe<MenuEntityResponse>;
   menus?: Maybe<MenuEntityResponseCollection>;
   page?: Maybe<PageEntityResponse>;
   pages?: Maybe<PageEntityResponseCollection>;
   productList?: Maybe<ProductListEntityResponse>;
   productLists?: Maybe<ProductListEntityResponseCollection>;
   store?: Maybe<StoreEntityResponse>;
   stores?: Maybe<StoreEntityResponseCollection>;
   uploadFile?: Maybe<UploadFileEntityResponse>;
   uploadFiles?: Maybe<UploadFileEntityResponseCollection>;
   uploadFolder?: Maybe<UploadFolderEntityResponse>;
   uploadFolders?: Maybe<UploadFolderEntityResponseCollection>;
   usersPermissionsRole?: Maybe<UsersPermissionsRoleEntityResponse>;
   usersPermissionsRoles?: Maybe<UsersPermissionsRoleEntityResponseCollection>;
   usersPermissionsUser?: Maybe<UsersPermissionsUserEntityResponse>;
   usersPermissionsUsers?: Maybe<UsersPermissionsUserEntityResponseCollection>;
};

export type QueryGlobalArgs = {
   locale?: InputMaybe<Scalars['I18NLocaleCode']>;
   publicationState?: InputMaybe<PublicationState>;
};

export type QueryI18NLocaleArgs = {
   id?: InputMaybe<Scalars['ID']>;
};

export type QueryI18NLocalesArgs = {
   filters?: InputMaybe<I18NLocaleFiltersInput>;
   pagination?: InputMaybe<PaginationArg>;
   sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type QueryMenuArgs = {
   id?: InputMaybe<Scalars['ID']>;
   locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};

export type QueryMenusArgs = {
   filters?: InputMaybe<MenuFiltersInput>;
   locale?: InputMaybe<Scalars['I18NLocaleCode']>;
   pagination?: InputMaybe<PaginationArg>;
   publicationState?: InputMaybe<PublicationState>;
   sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type QueryPageArgs = {
   id?: InputMaybe<Scalars['ID']>;
   locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};

export type QueryPagesArgs = {
   filters?: InputMaybe<PageFiltersInput>;
   locale?: InputMaybe<Scalars['I18NLocaleCode']>;
   pagination?: InputMaybe<PaginationArg>;
   publicationState?: InputMaybe<PublicationState>;
   sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type QueryProductListArgs = {
   id?: InputMaybe<Scalars['ID']>;
   locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};

export type QueryProductListsArgs = {
   filters?: InputMaybe<ProductListFiltersInput>;
   locale?: InputMaybe<Scalars['I18NLocaleCode']>;
   pagination?: InputMaybe<PaginationArg>;
   publicationState?: InputMaybe<PublicationState>;
   sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type QueryStoreArgs = {
   id?: InputMaybe<Scalars['ID']>;
};

export type QueryStoresArgs = {
   filters?: InputMaybe<StoreFiltersInput>;
   pagination?: InputMaybe<PaginationArg>;
   publicationState?: InputMaybe<PublicationState>;
   sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type QueryUploadFileArgs = {
   id?: InputMaybe<Scalars['ID']>;
};

export type QueryUploadFilesArgs = {
   filters?: InputMaybe<UploadFileFiltersInput>;
   pagination?: InputMaybe<PaginationArg>;
   sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type QueryUploadFolderArgs = {
   id?: InputMaybe<Scalars['ID']>;
};

export type QueryUploadFoldersArgs = {
   filters?: InputMaybe<UploadFolderFiltersInput>;
   pagination?: InputMaybe<PaginationArg>;
   sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type QueryUsersPermissionsRoleArgs = {
   id?: InputMaybe<Scalars['ID']>;
};

export type QueryUsersPermissionsRolesArgs = {
   filters?: InputMaybe<UsersPermissionsRoleFiltersInput>;
   pagination?: InputMaybe<PaginationArg>;
   sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type QueryUsersPermissionsUserArgs = {
   id?: InputMaybe<Scalars['ID']>;
};

export type QueryUsersPermissionsUsersArgs = {
   filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
   pagination?: InputMaybe<PaginationArg>;
   sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ResponseCollectionMeta = {
   __typename?: 'ResponseCollectionMeta';
   pagination: Pagination;
};

export type Store = {
   __typename?: 'Store';
   code: Scalars['String'];
   createdAt?: Maybe<Scalars['DateTime']>;
   currency: Enum_Store_Currency;
   footer: ComponentStoreFooter;
   header: ComponentStoreHeader;
   name: Scalars['String'];
   publishedAt?: Maybe<Scalars['DateTime']>;
   shopifySettings?: Maybe<ComponentStoreShopifySettings>;
   socialMediaAccounts: ComponentStoreSocialMediaAccounts;
   updatedAt?: Maybe<Scalars['DateTime']>;
   url: Scalars['String'];
};

export type StoreEntity = {
   __typename?: 'StoreEntity';
   attributes?: Maybe<Store>;
   id?: Maybe<Scalars['ID']>;
};

export type StoreEntityResponse = {
   __typename?: 'StoreEntityResponse';
   data?: Maybe<StoreEntity>;
};

export type StoreEntityResponseCollection = {
   __typename?: 'StoreEntityResponseCollection';
   data: Array<StoreEntity>;
   meta: ResponseCollectionMeta;
};

export type StoreFiltersInput = {
   and?: InputMaybe<Array<InputMaybe<StoreFiltersInput>>>;
   code?: InputMaybe<StringFilterInput>;
   createdAt?: InputMaybe<DateTimeFilterInput>;
   currency?: InputMaybe<StringFilterInput>;
   footer?: InputMaybe<ComponentStoreFooterFiltersInput>;
   header?: InputMaybe<ComponentStoreHeaderFiltersInput>;
   id?: InputMaybe<IdFilterInput>;
   name?: InputMaybe<StringFilterInput>;
   not?: InputMaybe<StoreFiltersInput>;
   or?: InputMaybe<Array<InputMaybe<StoreFiltersInput>>>;
   publishedAt?: InputMaybe<DateTimeFilterInput>;
   shopifySettings?: InputMaybe<ComponentStoreShopifySettingsFiltersInput>;
   socialMediaAccounts?: InputMaybe<ComponentStoreSocialMediaAccountsFiltersInput>;
   updatedAt?: InputMaybe<DateTimeFilterInput>;
   url?: InputMaybe<StringFilterInput>;
};

export type StoreInput = {
   code?: InputMaybe<Scalars['String']>;
   currency?: InputMaybe<Enum_Store_Currency>;
   footer?: InputMaybe<ComponentStoreFooterInput>;
   header?: InputMaybe<ComponentStoreHeaderInput>;
   name?: InputMaybe<Scalars['String']>;
   publishedAt?: InputMaybe<Scalars['DateTime']>;
   shopifySettings?: InputMaybe<ComponentStoreShopifySettingsInput>;
   socialMediaAccounts?: InputMaybe<ComponentStoreSocialMediaAccountsInput>;
   url?: InputMaybe<Scalars['String']>;
};

export type StringFilterInput = {
   and?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
   between?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
   contains?: InputMaybe<Scalars['String']>;
   containsi?: InputMaybe<Scalars['String']>;
   endsWith?: InputMaybe<Scalars['String']>;
   eq?: InputMaybe<Scalars['String']>;
   eqi?: InputMaybe<Scalars['String']>;
   gt?: InputMaybe<Scalars['String']>;
   gte?: InputMaybe<Scalars['String']>;
   in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
   lt?: InputMaybe<Scalars['String']>;
   lte?: InputMaybe<Scalars['String']>;
   ne?: InputMaybe<Scalars['String']>;
   not?: InputMaybe<StringFilterInput>;
   notContains?: InputMaybe<Scalars['String']>;
   notContainsi?: InputMaybe<Scalars['String']>;
   notIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
   notNull?: InputMaybe<Scalars['Boolean']>;
   null?: InputMaybe<Scalars['Boolean']>;
   or?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
   startsWith?: InputMaybe<Scalars['String']>;
};

export type UploadFile = {
   __typename?: 'UploadFile';
   alternativeText?: Maybe<Scalars['String']>;
   caption?: Maybe<Scalars['String']>;
   createdAt?: Maybe<Scalars['DateTime']>;
   ext?: Maybe<Scalars['String']>;
   formats?: Maybe<Scalars['JSON']>;
   hash: Scalars['String'];
   height?: Maybe<Scalars['Int']>;
   mime: Scalars['String'];
   name: Scalars['String'];
   previewUrl?: Maybe<Scalars['String']>;
   provider: Scalars['String'];
   provider_metadata?: Maybe<Scalars['JSON']>;
   related?: Maybe<Array<Maybe<GenericMorph>>>;
   size: Scalars['Float'];
   updatedAt?: Maybe<Scalars['DateTime']>;
   url: Scalars['String'];
   width?: Maybe<Scalars['Int']>;
};

export type UploadFileEntity = {
   __typename?: 'UploadFileEntity';
   attributes?: Maybe<UploadFile>;
   id?: Maybe<Scalars['ID']>;
};

export type UploadFileEntityResponse = {
   __typename?: 'UploadFileEntityResponse';
   data?: Maybe<UploadFileEntity>;
};

export type UploadFileEntityResponseCollection = {
   __typename?: 'UploadFileEntityResponseCollection';
   data: Array<UploadFileEntity>;
   meta: ResponseCollectionMeta;
};

export type UploadFileFiltersInput = {
   alternativeText?: InputMaybe<StringFilterInput>;
   and?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
   caption?: InputMaybe<StringFilterInput>;
   createdAt?: InputMaybe<DateTimeFilterInput>;
   ext?: InputMaybe<StringFilterInput>;
   folder?: InputMaybe<UploadFolderFiltersInput>;
   folderPath?: InputMaybe<StringFilterInput>;
   formats?: InputMaybe<JsonFilterInput>;
   hash?: InputMaybe<StringFilterInput>;
   height?: InputMaybe<IntFilterInput>;
   id?: InputMaybe<IdFilterInput>;
   mime?: InputMaybe<StringFilterInput>;
   name?: InputMaybe<StringFilterInput>;
   not?: InputMaybe<UploadFileFiltersInput>;
   or?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
   previewUrl?: InputMaybe<StringFilterInput>;
   provider?: InputMaybe<StringFilterInput>;
   provider_metadata?: InputMaybe<JsonFilterInput>;
   size?: InputMaybe<FloatFilterInput>;
   updatedAt?: InputMaybe<DateTimeFilterInput>;
   url?: InputMaybe<StringFilterInput>;
   width?: InputMaybe<IntFilterInput>;
};

export type UploadFileInput = {
   alternativeText?: InputMaybe<Scalars['String']>;
   caption?: InputMaybe<Scalars['String']>;
   ext?: InputMaybe<Scalars['String']>;
   folder?: InputMaybe<Scalars['ID']>;
   folderPath?: InputMaybe<Scalars['String']>;
   formats?: InputMaybe<Scalars['JSON']>;
   hash?: InputMaybe<Scalars['String']>;
   height?: InputMaybe<Scalars['Int']>;
   mime?: InputMaybe<Scalars['String']>;
   name?: InputMaybe<Scalars['String']>;
   previewUrl?: InputMaybe<Scalars['String']>;
   provider?: InputMaybe<Scalars['String']>;
   provider_metadata?: InputMaybe<Scalars['JSON']>;
   size?: InputMaybe<Scalars['Float']>;
   url?: InputMaybe<Scalars['String']>;
   width?: InputMaybe<Scalars['Int']>;
};

export type UploadFileRelationResponseCollection = {
   __typename?: 'UploadFileRelationResponseCollection';
   data: Array<UploadFileEntity>;
};

export type UploadFolder = {
   __typename?: 'UploadFolder';
   children?: Maybe<UploadFolderRelationResponseCollection>;
   createdAt?: Maybe<Scalars['DateTime']>;
   files?: Maybe<UploadFileRelationResponseCollection>;
   name: Scalars['String'];
   parent?: Maybe<UploadFolderEntityResponse>;
   path: Scalars['String'];
   pathId: Scalars['Int'];
   updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UploadFolderChildrenArgs = {
   filters?: InputMaybe<UploadFolderFiltersInput>;
   pagination?: InputMaybe<PaginationArg>;
   sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type UploadFolderFilesArgs = {
   filters?: InputMaybe<UploadFileFiltersInput>;
   pagination?: InputMaybe<PaginationArg>;
   sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type UploadFolderEntity = {
   __typename?: 'UploadFolderEntity';
   attributes?: Maybe<UploadFolder>;
   id?: Maybe<Scalars['ID']>;
};

export type UploadFolderEntityResponse = {
   __typename?: 'UploadFolderEntityResponse';
   data?: Maybe<UploadFolderEntity>;
};

export type UploadFolderEntityResponseCollection = {
   __typename?: 'UploadFolderEntityResponseCollection';
   data: Array<UploadFolderEntity>;
   meta: ResponseCollectionMeta;
};

export type UploadFolderFiltersInput = {
   and?: InputMaybe<Array<InputMaybe<UploadFolderFiltersInput>>>;
   children?: InputMaybe<UploadFolderFiltersInput>;
   createdAt?: InputMaybe<DateTimeFilterInput>;
   files?: InputMaybe<UploadFileFiltersInput>;
   id?: InputMaybe<IdFilterInput>;
   name?: InputMaybe<StringFilterInput>;
   not?: InputMaybe<UploadFolderFiltersInput>;
   or?: InputMaybe<Array<InputMaybe<UploadFolderFiltersInput>>>;
   parent?: InputMaybe<UploadFolderFiltersInput>;
   path?: InputMaybe<StringFilterInput>;
   pathId?: InputMaybe<IntFilterInput>;
   updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UploadFolderInput = {
   children?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
   files?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
   name?: InputMaybe<Scalars['String']>;
   parent?: InputMaybe<Scalars['ID']>;
   path?: InputMaybe<Scalars['String']>;
   pathId?: InputMaybe<Scalars['Int']>;
};

export type UploadFolderRelationResponseCollection = {
   __typename?: 'UploadFolderRelationResponseCollection';
   data: Array<UploadFolderEntity>;
};

export type UsersPermissionsCreateRolePayload = {
   __typename?: 'UsersPermissionsCreateRolePayload';
   ok: Scalars['Boolean'];
};

export type UsersPermissionsDeleteRolePayload = {
   __typename?: 'UsersPermissionsDeleteRolePayload';
   ok: Scalars['Boolean'];
};

export type UsersPermissionsLoginInput = {
   identifier: Scalars['String'];
   password: Scalars['String'];
   provider?: Scalars['String'];
};

export type UsersPermissionsLoginPayload = {
   __typename?: 'UsersPermissionsLoginPayload';
   jwt?: Maybe<Scalars['String']>;
   user: UsersPermissionsMe;
};

export type UsersPermissionsMe = {
   __typename?: 'UsersPermissionsMe';
   blocked?: Maybe<Scalars['Boolean']>;
   confirmed?: Maybe<Scalars['Boolean']>;
   email?: Maybe<Scalars['String']>;
   id: Scalars['ID'];
   role?: Maybe<UsersPermissionsMeRole>;
   username: Scalars['String'];
};

export type UsersPermissionsMeRole = {
   __typename?: 'UsersPermissionsMeRole';
   description?: Maybe<Scalars['String']>;
   id: Scalars['ID'];
   name: Scalars['String'];
   type?: Maybe<Scalars['String']>;
};

export type UsersPermissionsPasswordPayload = {
   __typename?: 'UsersPermissionsPasswordPayload';
   ok: Scalars['Boolean'];
};

export type UsersPermissionsPermission = {
   __typename?: 'UsersPermissionsPermission';
   action: Scalars['String'];
   createdAt?: Maybe<Scalars['DateTime']>;
   role?: Maybe<UsersPermissionsRoleEntityResponse>;
   updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UsersPermissionsPermissionEntity = {
   __typename?: 'UsersPermissionsPermissionEntity';
   attributes?: Maybe<UsersPermissionsPermission>;
   id?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsPermissionFiltersInput = {
   action?: InputMaybe<StringFilterInput>;
   and?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
   createdAt?: InputMaybe<DateTimeFilterInput>;
   id?: InputMaybe<IdFilterInput>;
   not?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
   or?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
   role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
   updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UsersPermissionsPermissionRelationResponseCollection = {
   __typename?: 'UsersPermissionsPermissionRelationResponseCollection';
   data: Array<UsersPermissionsPermissionEntity>;
};

export type UsersPermissionsRegisterInput = {
   email: Scalars['String'];
   password: Scalars['String'];
   username: Scalars['String'];
};

export type UsersPermissionsRole = {
   __typename?: 'UsersPermissionsRole';
   createdAt?: Maybe<Scalars['DateTime']>;
   description?: Maybe<Scalars['String']>;
   name: Scalars['String'];
   permissions?: Maybe<UsersPermissionsPermissionRelationResponseCollection>;
   type?: Maybe<Scalars['String']>;
   updatedAt?: Maybe<Scalars['DateTime']>;
   users?: Maybe<UsersPermissionsUserRelationResponseCollection>;
};

export type UsersPermissionsRolePermissionsArgs = {
   filters?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
   pagination?: InputMaybe<PaginationArg>;
   sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type UsersPermissionsRoleUsersArgs = {
   filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
   pagination?: InputMaybe<PaginationArg>;
   sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type UsersPermissionsRoleEntity = {
   __typename?: 'UsersPermissionsRoleEntity';
   attributes?: Maybe<UsersPermissionsRole>;
   id?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsRoleEntityResponse = {
   __typename?: 'UsersPermissionsRoleEntityResponse';
   data?: Maybe<UsersPermissionsRoleEntity>;
};

export type UsersPermissionsRoleEntityResponseCollection = {
   __typename?: 'UsersPermissionsRoleEntityResponseCollection';
   data: Array<UsersPermissionsRoleEntity>;
   meta: ResponseCollectionMeta;
};

export type UsersPermissionsRoleFiltersInput = {
   and?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
   createdAt?: InputMaybe<DateTimeFilterInput>;
   description?: InputMaybe<StringFilterInput>;
   id?: InputMaybe<IdFilterInput>;
   name?: InputMaybe<StringFilterInput>;
   not?: InputMaybe<UsersPermissionsRoleFiltersInput>;
   or?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
   permissions?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
   type?: InputMaybe<StringFilterInput>;
   updatedAt?: InputMaybe<DateTimeFilterInput>;
   users?: InputMaybe<UsersPermissionsUserFiltersInput>;
};

export type UsersPermissionsRoleInput = {
   description?: InputMaybe<Scalars['String']>;
   name?: InputMaybe<Scalars['String']>;
   permissions?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
   type?: InputMaybe<Scalars['String']>;
   users?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type UsersPermissionsUpdateRolePayload = {
   __typename?: 'UsersPermissionsUpdateRolePayload';
   ok: Scalars['Boolean'];
};

export type UsersPermissionsUser = {
   __typename?: 'UsersPermissionsUser';
   blocked?: Maybe<Scalars['Boolean']>;
   confirmed?: Maybe<Scalars['Boolean']>;
   createdAt?: Maybe<Scalars['DateTime']>;
   email: Scalars['String'];
   provider?: Maybe<Scalars['String']>;
   role?: Maybe<UsersPermissionsRoleEntityResponse>;
   updatedAt?: Maybe<Scalars['DateTime']>;
   username: Scalars['String'];
};

export type UsersPermissionsUserEntity = {
   __typename?: 'UsersPermissionsUserEntity';
   attributes?: Maybe<UsersPermissionsUser>;
   id?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsUserEntityResponse = {
   __typename?: 'UsersPermissionsUserEntityResponse';
   data?: Maybe<UsersPermissionsUserEntity>;
};

export type UsersPermissionsUserEntityResponseCollection = {
   __typename?: 'UsersPermissionsUserEntityResponseCollection';
   data: Array<UsersPermissionsUserEntity>;
   meta: ResponseCollectionMeta;
};

export type UsersPermissionsUserFiltersInput = {
   and?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
   blocked?: InputMaybe<BooleanFilterInput>;
   confirmationToken?: InputMaybe<StringFilterInput>;
   confirmed?: InputMaybe<BooleanFilterInput>;
   createdAt?: InputMaybe<DateTimeFilterInput>;
   email?: InputMaybe<StringFilterInput>;
   id?: InputMaybe<IdFilterInput>;
   not?: InputMaybe<UsersPermissionsUserFiltersInput>;
   or?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
   password?: InputMaybe<StringFilterInput>;
   provider?: InputMaybe<StringFilterInput>;
   resetPasswordToken?: InputMaybe<StringFilterInput>;
   role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
   updatedAt?: InputMaybe<DateTimeFilterInput>;
   username?: InputMaybe<StringFilterInput>;
};

export type UsersPermissionsUserInput = {
   blocked?: InputMaybe<Scalars['Boolean']>;
   confirmationToken?: InputMaybe<Scalars['String']>;
   confirmed?: InputMaybe<Scalars['Boolean']>;
   email?: InputMaybe<Scalars['String']>;
   password?: InputMaybe<Scalars['String']>;
   provider?: InputMaybe<Scalars['String']>;
   resetPasswordToken?: InputMaybe<Scalars['String']>;
   role?: InputMaybe<Scalars['ID']>;
   username?: InputMaybe<Scalars['String']>;
};

export type UsersPermissionsUserRelationResponseCollection = {
   __typename?: 'UsersPermissionsUserRelationResponseCollection';
   data: Array<UsersPermissionsUserEntity>;
};

export type ImageFieldsFragment = {
   __typename?: 'UploadFileEntityResponse';
   data?: {
      __typename?: 'UploadFileEntity';
      attributes?: {
         __typename?: 'UploadFile';
         alternativeText?: string | null;
         url: string;
         formats?: any | null;
      } | null;
   } | null;
};

export type ProductListFieldsFragment = {
   __typename?: 'ProductListEntity';
   attributes?: {
      __typename?: 'ProductList';
      type?: Enum_Productlist_Type | null;
      handle: string;
      deviceTitle?: string | null;
      title: string;
      metaDescription?: string | null;
      image?: {
         __typename?: 'UploadFileEntityResponse';
         data?: {
            __typename?: 'UploadFileEntity';
            attributes?: {
               __typename?: 'UploadFile';
               alternativeText?: string | null;
               url: string;
               formats?: any | null;
            } | null;
         } | null;
      } | null;
   } | null;
};

export type FindPageQueryVariables = Exact<{
   filters?: InputMaybe<PageFiltersInput>;
   publicationState?: InputMaybe<PublicationState>;
}>;

export type FindPageQuery = {
   __typename?: 'Query';
   pages?: {
      __typename?: 'PageEntityResponseCollection';
      data: Array<{
         __typename?: 'PageEntity';
         id?: string | null;
         attributes?: {
            __typename?: 'Page';
            path: string;
            title: string;
            sections: Array<
               | {
                    __typename: 'ComponentPageBrowse';
                    id: string;
                    title?: string | null;
                    description?: string | null;
                    image?: {
                       __typename?: 'UploadFileEntityResponse';
                       data?: {
                          __typename?: 'UploadFileEntity';
                          attributes?: {
                             __typename?: 'UploadFile';
                             alternativeText?: string | null;
                             url: string;
                             formats?: any | null;
                          } | null;
                       } | null;
                    } | null;
                    categories?: Array<{
                       __typename?: 'ComponentPageCategory';
                       id: string;
                       productList?: {
                          __typename?: 'ProductListEntityResponse';
                          data?: {
                             __typename?: 'ProductListEntity';
                             attributes?: {
                                __typename?: 'ProductList';
                                type?: Enum_Productlist_Type | null;
                                handle: string;
                                deviceTitle?: string | null;
                                title: string;
                                metaDescription?: string | null;
                                image?: {
                                   __typename?: 'UploadFileEntityResponse';
                                   data?: {
                                      __typename?: 'UploadFileEntity';
                                      attributes?: {
                                         __typename?: 'UploadFile';
                                         alternativeText?: string | null;
                                         url: string;
                                         formats?: any | null;
                                      } | null;
                                   } | null;
                                } | null;
                             } | null;
                          } | null;
                       } | null;
                    } | null> | null;
                 }
               | {
                    __typename: 'ComponentPageHero';
                    id: string;
                    title?: string | null;
                    description?: string | null;
                    callToAction?: {
                       __typename?: 'ComponentPageCallToAction';
                       title: string;
                       url: string;
                    } | null;
                    image?: {
                       __typename?: 'UploadFileEntityResponse';
                       data?: {
                          __typename?: 'UploadFileEntity';
                          attributes?: {
                             __typename?: 'UploadFile';
                             alternativeText?: string | null;
                             url: string;
                             formats?: any | null;
                          } | null;
                       } | null;
                    } | null;
                 }
               | {
                    __typename: 'ComponentPageStats';
                    id: string;
                    stats: Array<{
                       __typename?: 'ComponentPageStatItem';
                       id: string;
                       label: string;
                       value: string;
                    } | null>;
                 }
               | { __typename: 'Error' }
               | null
            >;
         } | null;
      }>;
   } | null;
};

export type CallToActionFieldsFragment = {
   __typename?: 'ComponentPageCallToAction';
   title: string;
   url: string;
};

export type GetGlobalSettingsQueryVariables = Exact<{ [key: string]: never }>;

export type GetGlobalSettingsQuery = {
   __typename?: 'Query';
   global?: {
      __typename?: 'GlobalEntityResponse';
      data?: {
         __typename?: 'GlobalEntity';
         attributes?: {
            __typename?: 'Global';
            newsletterForm: {
               __typename?: 'ComponentGlobalNewsletterForm';
               title: string;
               subtitle: string;
               inputPlaceholder: string;
               callToActionButtonTitle: string;
            };
         } | null;
      } | null;
   } | null;
};

export type GetProductListQueryVariables = Exact<{
   filters?: InputMaybe<ProductListFiltersInput>;
}>;

export type GetProductListQuery = {
   __typename?: 'Query';
   productLists?: {
      __typename?: 'ProductListEntityResponseCollection';
      data: Array<{
         __typename?: 'ProductListEntity';
         id?: string | null;
         attributes?: {
            __typename?: 'ProductList';
            type?: Enum_Productlist_Type | null;
            handle: string;
            deviceTitle?: string | null;
            title: string;
            tagline?: string | null;
            description: string;
            metaDescription?: string | null;
            metaTitle?: string | null;
            filters?: string | null;
            childrenHeading?: string | null;
            image?: {
               __typename?: 'UploadFileEntityResponse';
               data?: {
                  __typename?: 'UploadFileEntity';
                  attributes?: {
                     __typename?: 'UploadFile';
                     alternativeText?: string | null;
                     url: string;
                     formats?: any | null;
                  } | null;
               } | null;
            } | null;
            parent?: {
               __typename?: 'ProductListEntityResponse';
               data?: {
                  __typename?: 'ProductListEntity';
                  attributes?: {
                     __typename?: 'ProductList';
                     type?: Enum_Productlist_Type | null;
                     title: string;
                     handle: string;
                     deviceTitle?: string | null;
                     parent?: {
                        __typename?: 'ProductListEntityResponse';
                        data?: {
                           __typename?: 'ProductListEntity';
                           attributes?: {
                              __typename?: 'ProductList';
                              type?: Enum_Productlist_Type | null;
                              title: string;
                              handle: string;
                              deviceTitle?: string | null;
                              parent?: {
                                 __typename?: 'ProductListEntityResponse';
                                 data?: {
                                    __typename?: 'ProductListEntity';
                                    attributes?: {
                                       __typename?: 'ProductList';
                                       type?: Enum_Productlist_Type | null;
                                       title: string;
                                       handle: string;
                                       deviceTitle?: string | null;
                                       parent?: {
                                          __typename?: 'ProductListEntityResponse';
                                          data?: {
                                             __typename?: 'ProductListEntity';
                                             attributes?: {
                                                __typename?: 'ProductList';
                                                type?: Enum_Productlist_Type | null;
                                                title: string;
                                                handle: string;
                                                deviceTitle?: string | null;
                                                parent?: {
                                                   __typename?: 'ProductListEntityResponse';
                                                   data?: {
                                                      __typename?: 'ProductListEntity';
                                                      attributes?: {
                                                         __typename?: 'ProductList';
                                                         type?: Enum_Productlist_Type | null;
                                                         title: string;
                                                         handle: string;
                                                         deviceTitle?:
                                                            | string
                                                            | null;
                                                         parent?: {
                                                            __typename?: 'ProductListEntityResponse';
                                                            data?: {
                                                               __typename?: 'ProductListEntity';
                                                               attributes?: {
                                                                  __typename?: 'ProductList';
                                                                  type?: Enum_Productlist_Type | null;
                                                                  title: string;
                                                                  handle: string;
                                                                  deviceTitle?:
                                                                     | string
                                                                     | null;
                                                               } | null;
                                                            } | null;
                                                         } | null;
                                                      } | null;
                                                   } | null;
                                                } | null;
                                             } | null;
                                          } | null;
                                       } | null;
                                    } | null;
                                 } | null;
                              } | null;
                           } | null;
                        } | null;
                     } | null;
                  } | null;
               } | null;
            } | null;
            children?: {
               __typename?: 'ProductListRelationResponseCollection';
               data: Array<{
                  __typename?: 'ProductListEntity';
                  attributes?: {
                     __typename?: 'ProductList';
                     type?: Enum_Productlist_Type | null;
                     sortPriority?: number | null;
                     handle: string;
                     deviceTitle?: string | null;
                     title: string;
                     image?: {
                        __typename?: 'UploadFileEntityResponse';
                        data?: {
                           __typename?: 'UploadFileEntity';
                           attributes?: {
                              __typename?: 'UploadFile';
                              alternativeText?: string | null;
                              url: string;
                              formats?: any | null;
                           } | null;
                        } | null;
                     } | null;
                  } | null;
               }>;
            } | null;
            sections: Array<
               | {
                    __typename: 'ComponentProductListBanner';
                    id: string;
                    title: string;
                    description: string;
                    callToActionLabel: string;
                    url: string;
                 }
               | {
                    __typename: 'ComponentProductListFeaturedProductList';
                    id: string;
                    productList?: {
                       __typename?: 'ProductListEntityResponse';
                       data?: {
                          __typename?: 'ProductListEntity';
                          attributes?: {
                             __typename?: 'ProductList';
                             handle: string;
                             type?: Enum_Productlist_Type | null;
                             title: string;
                             deviceTitle?: string | null;
                             description: string;
                             filters?: string | null;
                             image?: {
                                __typename?: 'UploadFileEntityResponse';
                                data?: {
                                   __typename?: 'UploadFileEntity';
                                   attributes?: {
                                      __typename?: 'UploadFile';
                                      alternativeText?: string | null;
                                      url: string;
                                      formats?: any | null;
                                   } | null;
                                } | null;
                             } | null;
                          } | null;
                       } | null;
                    } | null;
                 }
               | {
                    __typename: 'ComponentProductListLinkedProductListSet';
                    id: string;
                    title: string;
                    productLists?: {
                       __typename?: 'ProductListRelationResponseCollection';
                       data: Array<{
                          __typename?: 'ProductListEntity';
                          attributes?: {
                             __typename?: 'ProductList';
                             type?: Enum_Productlist_Type | null;
                             handle: string;
                             title: string;
                             deviceTitle?: string | null;
                             description: string;
                             filters?: string | null;
                             image?: {
                                __typename?: 'UploadFileEntityResponse';
                                data?: {
                                   __typename?: 'UploadFileEntity';
                                   attributes?: {
                                      __typename?: 'UploadFile';
                                      alternativeText?: string | null;
                                      url: string;
                                      formats?: any | null;
                                   } | null;
                                } | null;
                             } | null;
                          } | null;
                       }>;
                    } | null;
                 }
               | {
                    __typename: 'ComponentProductListRelatedPosts';
                    id: string;
                    tags?: string | null;
                 }
               | { __typename: 'Error' }
               | null
            >;
         } | null;
      }>;
   } | null;
};

export type GetStoreQueryVariables = Exact<{
   filters?: InputMaybe<StoreFiltersInput>;
}>;

export type GetStoreQuery = {
   __typename?: 'Query';
   store?: {
      __typename?: 'StoreEntityResponseCollection';
      data: Array<{
         __typename?: 'StoreEntity';
         attributes?: {
            __typename?: 'Store';
            header: {
               __typename?: 'ComponentStoreHeader';
               menu?: {
                  __typename?: 'MenuEntityResponse';
                  data?: {
                     __typename?: 'MenuEntity';
                     attributes?: {
                        __typename?: 'Menu';
                        title: string;
                        items: Array<
                           | {
                                __typename: 'ComponentMenuLink';
                                name: string;
                                url: string;
                                description?: string | null;
                             }
                           | {
                                __typename: 'ComponentMenuLinkWithImage';
                                name: string;
                                url: string;
                                image: {
                                   __typename?: 'UploadFileEntityResponse';
                                   data?: {
                                      __typename?: 'UploadFileEntity';
                                      attributes?: {
                                         __typename?: 'UploadFile';
                                         alternativeText?: string | null;
                                         url: string;
                                         formats?: any | null;
                                      } | null;
                                   } | null;
                                };
                             }
                           | {
                                __typename: 'ComponentMenuProductListLink';
                                name: string;
                                productList?: {
                                   __typename?: 'ProductListEntityResponse';
                                   data?: {
                                      __typename?: 'ProductListEntity';
                                      attributes?: {
                                         __typename?: 'ProductList';
                                         handle: string;
                                      } | null;
                                   } | null;
                                } | null;
                             }
                           | {
                                __typename: 'ComponentMenuSubmenu';
                                name: string;
                                submenu?: {
                                   __typename?: 'MenuEntityResponse';
                                   data?: {
                                      __typename?: 'MenuEntity';
                                      attributes?: {
                                         __typename?: 'Menu';
                                         title: string;
                                         items: Array<
                                            | {
                                                 __typename: 'ComponentMenuLink';
                                                 name: string;
                                                 url: string;
                                                 description?: string | null;
                                              }
                                            | {
                                                 __typename: 'ComponentMenuLinkWithImage';
                                                 name: string;
                                                 url: string;
                                                 image: {
                                                    __typename?: 'UploadFileEntityResponse';
                                                    data?: {
                                                       __typename?: 'UploadFileEntity';
                                                       attributes?: {
                                                          __typename?: 'UploadFile';
                                                          alternativeText?:
                                                             | string
                                                             | null;
                                                          url: string;
                                                          formats?: any | null;
                                                       } | null;
                                                    } | null;
                                                 };
                                              }
                                            | {
                                                 __typename: 'ComponentMenuProductListLink';
                                                 name: string;
                                                 productList?: {
                                                    __typename?: 'ProductListEntityResponse';
                                                    data?: {
                                                       __typename?: 'ProductListEntity';
                                                       attributes?: {
                                                          __typename?: 'ProductList';
                                                          handle: string;
                                                       } | null;
                                                    } | null;
                                                 } | null;
                                              }
                                            | {
                                                 __typename: 'ComponentMenuSubmenu';
                                                 name: string;
                                              }
                                            | { __typename: 'Error' }
                                            | null
                                         >;
                                      } | null;
                                   } | null;
                                } | null;
                             }
                           | { __typename: 'Error' }
                           | null
                        >;
                     } | null;
                  } | null;
               } | null;
            };
            footer: {
               __typename?: 'ComponentStoreFooter';
               menu1?: {
                  __typename?: 'MenuEntityResponse';
                  data?: {
                     __typename?: 'MenuEntity';
                     attributes?: {
                        __typename?: 'Menu';
                        title: string;
                        items: Array<
                           | {
                                __typename: 'ComponentMenuLink';
                                name: string;
                                url: string;
                                description?: string | null;
                             }
                           | {
                                __typename: 'ComponentMenuLinkWithImage';
                                name: string;
                                url: string;
                                image: {
                                   __typename?: 'UploadFileEntityResponse';
                                   data?: {
                                      __typename?: 'UploadFileEntity';
                                      attributes?: {
                                         __typename?: 'UploadFile';
                                         alternativeText?: string | null;
                                         url: string;
                                         formats?: any | null;
                                      } | null;
                                   } | null;
                                };
                             }
                           | {
                                __typename: 'ComponentMenuProductListLink';
                                name: string;
                                productList?: {
                                   __typename?: 'ProductListEntityResponse';
                                   data?: {
                                      __typename?: 'ProductListEntity';
                                      attributes?: {
                                         __typename?: 'ProductList';
                                         handle: string;
                                      } | null;
                                   } | null;
                                } | null;
                             }
                           | {
                                __typename: 'ComponentMenuSubmenu';
                                name: string;
                                submenu?: {
                                   __typename?: 'MenuEntityResponse';
                                   data?: {
                                      __typename?: 'MenuEntity';
                                      attributes?: {
                                         __typename?: 'Menu';
                                         title: string;
                                         items: Array<
                                            | {
                                                 __typename: 'ComponentMenuLink';
                                                 name: string;
                                                 url: string;
                                                 description?: string | null;
                                              }
                                            | {
                                                 __typename: 'ComponentMenuLinkWithImage';
                                                 name: string;
                                                 url: string;
                                                 image: {
                                                    __typename?: 'UploadFileEntityResponse';
                                                    data?: {
                                                       __typename?: 'UploadFileEntity';
                                                       attributes?: {
                                                          __typename?: 'UploadFile';
                                                          alternativeText?:
                                                             | string
                                                             | null;
                                                          url: string;
                                                          formats?: any | null;
                                                       } | null;
                                                    } | null;
                                                 };
                                              }
                                            | {
                                                 __typename: 'ComponentMenuProductListLink';
                                                 name: string;
                                                 productList?: {
                                                    __typename?: 'ProductListEntityResponse';
                                                    data?: {
                                                       __typename?: 'ProductListEntity';
                                                       attributes?: {
                                                          __typename?: 'ProductList';
                                                          handle: string;
                                                       } | null;
                                                    } | null;
                                                 } | null;
                                              }
                                            | {
                                                 __typename: 'ComponentMenuSubmenu';
                                                 name: string;
                                              }
                                            | { __typename: 'Error' }
                                            | null
                                         >;
                                      } | null;
                                   } | null;
                                } | null;
                             }
                           | { __typename: 'Error' }
                           | null
                        >;
                     } | null;
                  } | null;
               } | null;
               menu2?: {
                  __typename?: 'MenuEntityResponse';
                  data?: {
                     __typename?: 'MenuEntity';
                     attributes?: {
                        __typename?: 'Menu';
                        title: string;
                        items: Array<
                           | {
                                __typename: 'ComponentMenuLink';
                                name: string;
                                url: string;
                                description?: string | null;
                             }
                           | {
                                __typename: 'ComponentMenuLinkWithImage';
                                name: string;
                                url: string;
                                image: {
                                   __typename?: 'UploadFileEntityResponse';
                                   data?: {
                                      __typename?: 'UploadFileEntity';
                                      attributes?: {
                                         __typename?: 'UploadFile';
                                         alternativeText?: string | null;
                                         url: string;
                                         formats?: any | null;
                                      } | null;
                                   } | null;
                                };
                             }
                           | {
                                __typename: 'ComponentMenuProductListLink';
                                name: string;
                                productList?: {
                                   __typename?: 'ProductListEntityResponse';
                                   data?: {
                                      __typename?: 'ProductListEntity';
                                      attributes?: {
                                         __typename?: 'ProductList';
                                         handle: string;
                                      } | null;
                                   } | null;
                                } | null;
                             }
                           | {
                                __typename: 'ComponentMenuSubmenu';
                                name: string;
                                submenu?: {
                                   __typename?: 'MenuEntityResponse';
                                   data?: {
                                      __typename?: 'MenuEntity';
                                      attributes?: {
                                         __typename?: 'Menu';
                                         title: string;
                                         items: Array<
                                            | {
                                                 __typename: 'ComponentMenuLink';
                                                 name: string;
                                                 url: string;
                                                 description?: string | null;
                                              }
                                            | {
                                                 __typename: 'ComponentMenuLinkWithImage';
                                                 name: string;
                                                 url: string;
                                                 image: {
                                                    __typename?: 'UploadFileEntityResponse';
                                                    data?: {
                                                       __typename?: 'UploadFileEntity';
                                                       attributes?: {
                                                          __typename?: 'UploadFile';
                                                          alternativeText?:
                                                             | string
                                                             | null;
                                                          url: string;
                                                          formats?: any | null;
                                                       } | null;
                                                    } | null;
                                                 };
                                              }
                                            | {
                                                 __typename: 'ComponentMenuProductListLink';
                                                 name: string;
                                                 productList?: {
                                                    __typename?: 'ProductListEntityResponse';
                                                    data?: {
                                                       __typename?: 'ProductListEntity';
                                                       attributes?: {
                                                          __typename?: 'ProductList';
                                                          handle: string;
                                                       } | null;
                                                    } | null;
                                                 } | null;
                                              }
                                            | {
                                                 __typename: 'ComponentMenuSubmenu';
                                                 name: string;
                                              }
                                            | { __typename: 'Error' }
                                            | null
                                         >;
                                      } | null;
                                   } | null;
                                } | null;
                             }
                           | { __typename: 'Error' }
                           | null
                        >;
                     } | null;
                  } | null;
               } | null;
               partners?: {
                  __typename?: 'MenuEntityResponse';
                  data?: {
                     __typename?: 'MenuEntity';
                     attributes?: {
                        __typename?: 'Menu';
                        title: string;
                        items: Array<
                           | {
                                __typename: 'ComponentMenuLink';
                                name: string;
                                url: string;
                                description?: string | null;
                             }
                           | {
                                __typename: 'ComponentMenuLinkWithImage';
                                name: string;
                                url: string;
                                image: {
                                   __typename?: 'UploadFileEntityResponse';
                                   data?: {
                                      __typename?: 'UploadFileEntity';
                                      attributes?: {
                                         __typename?: 'UploadFile';
                                         alternativeText?: string | null;
                                         url: string;
                                         formats?: any | null;
                                      } | null;
                                   } | null;
                                };
                             }
                           | {
                                __typename: 'ComponentMenuProductListLink';
                                name: string;
                                productList?: {
                                   __typename?: 'ProductListEntityResponse';
                                   data?: {
                                      __typename?: 'ProductListEntity';
                                      attributes?: {
                                         __typename?: 'ProductList';
                                         handle: string;
                                      } | null;
                                   } | null;
                                } | null;
                             }
                           | {
                                __typename: 'ComponentMenuSubmenu';
                                name: string;
                                submenu?: {
                                   __typename?: 'MenuEntityResponse';
                                   data?: {
                                      __typename?: 'MenuEntity';
                                      attributes?: {
                                         __typename?: 'Menu';
                                         title: string;
                                         items: Array<
                                            | {
                                                 __typename: 'ComponentMenuLink';
                                                 name: string;
                                                 url: string;
                                                 description?: string | null;
                                              }
                                            | {
                                                 __typename: 'ComponentMenuLinkWithImage';
                                                 name: string;
                                                 url: string;
                                                 image: {
                                                    __typename?: 'UploadFileEntityResponse';
                                                    data?: {
                                                       __typename?: 'UploadFileEntity';
                                                       attributes?: {
                                                          __typename?: 'UploadFile';
                                                          alternativeText?:
                                                             | string
                                                             | null;
                                                          url: string;
                                                          formats?: any | null;
                                                       } | null;
                                                    } | null;
                                                 };
                                              }
                                            | {
                                                 __typename: 'ComponentMenuProductListLink';
                                                 name: string;
                                                 productList?: {
                                                    __typename?: 'ProductListEntityResponse';
                                                    data?: {
                                                       __typename?: 'ProductListEntity';
                                                       attributes?: {
                                                          __typename?: 'ProductList';
                                                          handle: string;
                                                       } | null;
                                                    } | null;
                                                 } | null;
                                              }
                                            | {
                                                 __typename: 'ComponentMenuSubmenu';
                                                 name: string;
                                              }
                                            | { __typename: 'Error' }
                                            | null
                                         >;
                                      } | null;
                                   } | null;
                                } | null;
                             }
                           | { __typename: 'Error' }
                           | null
                        >;
                     } | null;
                  } | null;
               } | null;
               bottomMenu?: {
                  __typename?: 'MenuEntityResponse';
                  data?: {
                     __typename?: 'MenuEntity';
                     attributes?: {
                        __typename?: 'Menu';
                        title: string;
                        items: Array<
                           | {
                                __typename: 'ComponentMenuLink';
                                name: string;
                                url: string;
                                description?: string | null;
                             }
                           | {
                                __typename: 'ComponentMenuLinkWithImage';
                                name: string;
                                url: string;
                                image: {
                                   __typename?: 'UploadFileEntityResponse';
                                   data?: {
                                      __typename?: 'UploadFileEntity';
                                      attributes?: {
                                         __typename?: 'UploadFile';
                                         alternativeText?: string | null;
                                         url: string;
                                         formats?: any | null;
                                      } | null;
                                   } | null;
                                };
                             }
                           | {
                                __typename: 'ComponentMenuProductListLink';
                                name: string;
                                productList?: {
                                   __typename?: 'ProductListEntityResponse';
                                   data?: {
                                      __typename?: 'ProductListEntity';
                                      attributes?: {
                                         __typename?: 'ProductList';
                                         handle: string;
                                      } | null;
                                   } | null;
                                } | null;
                             }
                           | {
                                __typename: 'ComponentMenuSubmenu';
                                name: string;
                                submenu?: {
                                   __typename?: 'MenuEntityResponse';
                                   data?: {
                                      __typename?: 'MenuEntity';
                                      attributes?: {
                                         __typename?: 'Menu';
                                         title: string;
                                         items: Array<
                                            | {
                                                 __typename: 'ComponentMenuLink';
                                                 name: string;
                                                 url: string;
                                                 description?: string | null;
                                              }
                                            | {
                                                 __typename: 'ComponentMenuLinkWithImage';
                                                 name: string;
                                                 url: string;
                                                 image: {
                                                    __typename?: 'UploadFileEntityResponse';
                                                    data?: {
                                                       __typename?: 'UploadFileEntity';
                                                       attributes?: {
                                                          __typename?: 'UploadFile';
                                                          alternativeText?:
                                                             | string
                                                             | null;
                                                          url: string;
                                                          formats?: any | null;
                                                       } | null;
                                                    } | null;
                                                 };
                                              }
                                            | {
                                                 __typename: 'ComponentMenuProductListLink';
                                                 name: string;
                                                 productList?: {
                                                    __typename?: 'ProductListEntityResponse';
                                                    data?: {
                                                       __typename?: 'ProductListEntity';
                                                       attributes?: {
                                                          __typename?: 'ProductList';
                                                          handle: string;
                                                       } | null;
                                                    } | null;
                                                 } | null;
                                              }
                                            | {
                                                 __typename: 'ComponentMenuSubmenu';
                                                 name: string;
                                              }
                                            | { __typename: 'Error' }
                                            | null
                                         >;
                                      } | null;
                                   } | null;
                                } | null;
                             }
                           | { __typename: 'Error' }
                           | null
                        >;
                     } | null;
                  } | null;
               } | null;
            };
            socialMediaAccounts: {
               __typename?: 'ComponentStoreSocialMediaAccounts';
               twitter?: string | null;
               tiktok?: string | null;
               facebook?: string | null;
               instagram?: string | null;
               youtube?: string | null;
               repairOrg?: string | null;
            };
            shopifySettings?: {
               __typename?: 'ComponentStoreShopifySettings';
               storefrontDomain: string;
               storefrontAccessToken: string;
            } | null;
         } | null;
      }>;
   } | null;
};

export type MenuEntityResponsePropsFragment = {
   __typename?: 'MenuEntityResponse';
   data?: {
      __typename?: 'MenuEntity';
      attributes?: {
         __typename?: 'Menu';
         title: string;
         items: Array<
            | {
                 __typename: 'ComponentMenuLink';
                 name: string;
                 url: string;
                 description?: string | null;
              }
            | {
                 __typename: 'ComponentMenuLinkWithImage';
                 name: string;
                 url: string;
                 image: {
                    __typename?: 'UploadFileEntityResponse';
                    data?: {
                       __typename?: 'UploadFileEntity';
                       attributes?: {
                          __typename?: 'UploadFile';
                          alternativeText?: string | null;
                          url: string;
                          formats?: any | null;
                       } | null;
                    } | null;
                 };
              }
            | {
                 __typename: 'ComponentMenuProductListLink';
                 name: string;
                 productList?: {
                    __typename?: 'ProductListEntityResponse';
                    data?: {
                       __typename?: 'ProductListEntity';
                       attributes?: {
                          __typename?: 'ProductList';
                          handle: string;
                       } | null;
                    } | null;
                 } | null;
              }
            | {
                 __typename: 'ComponentMenuSubmenu';
                 name: string;
                 submenu?: {
                    __typename?: 'MenuEntityResponse';
                    data?: {
                       __typename?: 'MenuEntity';
                       attributes?: {
                          __typename?: 'Menu';
                          title: string;
                          items: Array<
                             | {
                                  __typename: 'ComponentMenuLink';
                                  name: string;
                                  url: string;
                                  description?: string | null;
                               }
                             | {
                                  __typename: 'ComponentMenuLinkWithImage';
                                  name: string;
                                  url: string;
                                  image: {
                                     __typename?: 'UploadFileEntityResponse';
                                     data?: {
                                        __typename?: 'UploadFileEntity';
                                        attributes?: {
                                           __typename?: 'UploadFile';
                                           alternativeText?: string | null;
                                           url: string;
                                           formats?: any | null;
                                        } | null;
                                     } | null;
                                  };
                               }
                             | {
                                  __typename: 'ComponentMenuProductListLink';
                                  name: string;
                                  productList?: {
                                     __typename?: 'ProductListEntityResponse';
                                     data?: {
                                        __typename?: 'ProductListEntity';
                                        attributes?: {
                                           __typename?: 'ProductList';
                                           handle: string;
                                        } | null;
                                     } | null;
                                  } | null;
                               }
                             | {
                                  __typename: 'ComponentMenuSubmenu';
                                  name: string;
                               }
                             | { __typename: 'Error' }
                             | null
                          >;
                       } | null;
                    } | null;
                 } | null;
              }
            | { __typename: 'Error' }
            | null
         >;
      } | null;
   } | null;
};

export type MenuPropsFragment = {
   __typename?: 'Menu';
   title: string;
   items: Array<
      | {
           __typename: 'ComponentMenuLink';
           name: string;
           url: string;
           description?: string | null;
        }
      | {
           __typename: 'ComponentMenuLinkWithImage';
           name: string;
           url: string;
           image: {
              __typename?: 'UploadFileEntityResponse';
              data?: {
                 __typename?: 'UploadFileEntity';
                 attributes?: {
                    __typename?: 'UploadFile';
                    alternativeText?: string | null;
                    url: string;
                    formats?: any | null;
                 } | null;
              } | null;
           };
        }
      | {
           __typename: 'ComponentMenuProductListLink';
           name: string;
           productList?: {
              __typename?: 'ProductListEntityResponse';
              data?: {
                 __typename?: 'ProductListEntity';
                 attributes?: {
                    __typename?: 'ProductList';
                    handle: string;
                 } | null;
              } | null;
           } | null;
        }
      | {
           __typename: 'ComponentMenuSubmenu';
           name: string;
           submenu?: {
              __typename?: 'MenuEntityResponse';
              data?: {
                 __typename?: 'MenuEntity';
                 attributes?: {
                    __typename?: 'Menu';
                    title: string;
                    items: Array<
                       | {
                            __typename: 'ComponentMenuLink';
                            name: string;
                            url: string;
                            description?: string | null;
                         }
                       | {
                            __typename: 'ComponentMenuLinkWithImage';
                            name: string;
                            url: string;
                            image: {
                               __typename?: 'UploadFileEntityResponse';
                               data?: {
                                  __typename?: 'UploadFileEntity';
                                  attributes?: {
                                     __typename?: 'UploadFile';
                                     alternativeText?: string | null;
                                     url: string;
                                     formats?: any | null;
                                  } | null;
                               } | null;
                            };
                         }
                       | {
                            __typename: 'ComponentMenuProductListLink';
                            name: string;
                            productList?: {
                               __typename?: 'ProductListEntityResponse';
                               data?: {
                                  __typename?: 'ProductListEntity';
                                  attributes?: {
                                     __typename?: 'ProductList';
                                     handle: string;
                                  } | null;
                               } | null;
                            } | null;
                         }
                       | { __typename: 'ComponentMenuSubmenu'; name: string }
                       | { __typename: 'Error' }
                       | null
                    >;
                 } | null;
              } | null;
           } | null;
        }
      | { __typename: 'Error' }
      | null
   >;
};

export type GetStoreListQueryVariables = Exact<{ [key: string]: never }>;

export type GetStoreListQuery = {
   __typename?: 'Query';
   stores?: {
      __typename?: 'StoreEntityResponseCollection';
      data: Array<{
         __typename?: 'StoreEntity';
         attributes?: {
            __typename?: 'Store';
            code: string;
            name: string;
            url: string;
            currency: Enum_Store_Currency;
         } | null;
      }>;
   } | null;
};

export const ImageFieldsFragmentDoc = `
    fragment ImageFields on UploadFileEntityResponse {
  data {
    attributes {
      alternativeText
      url
      formats
    }
  }
}
    `;
export const ProductListFieldsFragmentDoc = `
    fragment ProductListFields on ProductListEntity {
  attributes {
    type
    handle
    deviceTitle
    title
    metaDescription
    image {
      ...ImageFields
    }
  }
}
    `;
export const CallToActionFieldsFragmentDoc = `
    fragment CallToActionFields on ComponentPageCallToAction {
  title
  url
}
    `;
export const MenuPropsFragmentDoc = `
    fragment MenuProps on Menu {
  title
  items {
    __typename
    ... on ComponentMenuLink {
      name
      url
      description
    }
    ... on ComponentMenuProductListLink {
      name
      productList {
        data {
          attributes {
            handle
          }
        }
      }
    }
    ... on ComponentMenuLinkWithImage {
      name
      url
      image {
        data {
          attributes {
            alternativeText
            url
            formats
          }
        }
      }
    }
    ... on ComponentMenuSubmenu {
      name
      submenu {
        data {
          attributes {
            title
            items {
              __typename
              ... on ComponentMenuLink {
                name
                url
                description
              }
              ... on ComponentMenuProductListLink {
                name
                productList {
                  data {
                    attributes {
                      handle
                    }
                  }
                }
              }
              ... on ComponentMenuLinkWithImage {
                name
                url
                image {
                  data {
                    attributes {
                      alternativeText
                      url
                      formats
                    }
                  }
                }
              }
              ... on ComponentMenuSubmenu {
                name
              }
            }
          }
        }
      }
    }
  }
}
    `;
export const MenuEntityResponsePropsFragmentDoc = `
    fragment MenuEntityResponseProps on MenuEntityResponse {
  data {
    attributes {
      ...MenuProps
    }
  }
}
    `;
export const FindPageDocument = `
    query findPage($filters: PageFiltersInput, $publicationState: PublicationState) {
  pages(
    filters: $filters
    publicationState: $publicationState
    pagination: {limit: 1}
  ) {
    data {
      id
      attributes {
        path
        title
        sections {
          __typename
          ... on ComponentPageHero {
            id
            title
            description
            callToAction {
              ...CallToActionFields
            }
            image {
              ...ImageFields
            }
          }
          ... on ComponentPageBrowse {
            id
            title
            description
            image {
              ...ImageFields
            }
            categories(pagination: {limit: 100}) {
              id
              productList {
                data {
                  ...ProductListFields
                }
              }
            }
          }
          ... on ComponentPageStats {
            id
            stats {
              id
              label
              value
            }
          }
        }
      }
    }
  }
}
    ${CallToActionFieldsFragmentDoc}
${ImageFieldsFragmentDoc}
${ProductListFieldsFragmentDoc}`;
export const GetGlobalSettingsDocument = `
    query getGlobalSettings {
  global {
    data {
      attributes {
        newsletterForm {
          title
          subtitle
          inputPlaceholder
          callToActionButtonTitle
        }
      }
    }
  }
}
    `;
export const GetProductListDocument = `
    query getProductList($filters: ProductListFiltersInput) {
  productLists(pagination: {limit: 1}, filters: $filters, publicationState: LIVE) {
    data {
      id
      attributes {
        type
        handle
        deviceTitle
        title
        tagline
        description
        metaDescription
        metaTitle
        filters
        image {
          data {
            attributes {
              alternativeText
              url
              formats
            }
          }
        }
        parent {
          data {
            attributes {
              type
              title
              handle
              deviceTitle
              parent {
                data {
                  attributes {
                    type
                    title
                    handle
                    deviceTitle
                    parent {
                      data {
                        attributes {
                          type
                          title
                          handle
                          deviceTitle
                          parent {
                            data {
                              attributes {
                                type
                                title
                                handle
                                deviceTitle
                                parent {
                                  data {
                                    attributes {
                                      type
                                      title
                                      handle
                                      deviceTitle
                                      parent {
                                        data {
                                          attributes {
                                            type
                                            title
                                            handle
                                            deviceTitle
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        children(
          publicationState: LIVE
          pagination: {pageSize: 100}
          sort: ["sortPriority:desc", "title:asc"]
        ) {
          data {
            attributes {
              type
              sortPriority
              handle
              deviceTitle
              title
              image {
                data {
                  attributes {
                    alternativeText
                    url
                    formats
                  }
                }
              }
            }
          }
        }
        childrenHeading
        sections {
          __typename
          ... on ComponentProductListBanner {
            id
            title
            description
            callToActionLabel
            url
          }
          ... on ComponentProductListRelatedPosts {
            id
            tags
          }
          ... on ComponentProductListFeaturedProductList {
            id
            productList {
              data {
                attributes {
                  handle
                  type
                  title
                  deviceTitle
                  description
                  filters
                  image {
                    data {
                      attributes {
                        alternativeText
                        url
                        formats
                      }
                    }
                  }
                }
              }
            }
          }
          ... on ComponentProductListLinkedProductListSet {
            id
            title
            productLists(pagination: {limit: 3}) {
              data {
                attributes {
                  type
                  handle
                  title
                  deviceTitle
                  description
                  filters
                  image {
                    data {
                      attributes {
                        alternativeText
                        url
                        formats
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
    `;
export const GetStoreDocument = `
    query getStore($filters: StoreFiltersInput) {
  store: stores(filters: $filters) {
    data {
      attributes {
        header {
          menu {
            ...MenuEntityResponseProps
          }
        }
        footer {
          menu1 {
            ...MenuEntityResponseProps
          }
          menu2 {
            ...MenuEntityResponseProps
          }
          partners {
            ...MenuEntityResponseProps
          }
          bottomMenu {
            ...MenuEntityResponseProps
          }
        }
        socialMediaAccounts {
          twitter
          tiktok
          facebook
          instagram
          youtube
          repairOrg
        }
        shopifySettings {
          storefrontDomain
          storefrontAccessToken
        }
      }
    }
  }
}
    ${MenuEntityResponsePropsFragmentDoc}
${MenuPropsFragmentDoc}`;
export const GetStoreListDocument = `
    query getStoreList {
  stores(pagination: {pageSize: 100}) {
    data {
      attributes {
        code
        name
        url
        currency
      }
    }
  }
}
    `;
export type Requester<C = {}, E = unknown> = <R, V>(
   doc: string,
   vars?: V,
   options?: C
) => Promise<R>;
export function getSdk<C, E>(requester: Requester<C, E>) {
   return {
      findPage(
         variables?: FindPageQueryVariables,
         options?: C
      ): Promise<FindPageQuery> {
         return requester<FindPageQuery, FindPageQueryVariables>(
            FindPageDocument,
            variables,
            options
         );
      },
      getGlobalSettings(
         variables?: GetGlobalSettingsQueryVariables,
         options?: C
      ): Promise<GetGlobalSettingsQuery> {
         return requester<
            GetGlobalSettingsQuery,
            GetGlobalSettingsQueryVariables
         >(GetGlobalSettingsDocument, variables, options);
      },
      getProductList(
         variables?: GetProductListQueryVariables,
         options?: C
      ): Promise<GetProductListQuery> {
         return requester<GetProductListQuery, GetProductListQueryVariables>(
            GetProductListDocument,
            variables,
            options
         );
      },
      getStore(
         variables?: GetStoreQueryVariables,
         options?: C
      ): Promise<GetStoreQuery> {
         return requester<GetStoreQuery, GetStoreQueryVariables>(
            GetStoreDocument,
            variables,
            options
         );
      },
      getStoreList(
         variables?: GetStoreListQueryVariables,
         options?: C
      ): Promise<GetStoreListQuery> {
         return requester<GetStoreListQuery, GetStoreListQueryVariables>(
            GetStoreListDocument,
            variables,
            options
         );
      },
   };
}
export type Sdk = ReturnType<typeof getSdk>;
