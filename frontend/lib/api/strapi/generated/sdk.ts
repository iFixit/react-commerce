export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  ProductListSectionsDynamicZoneInput: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type BooleanFilterInput = {
  and?: Maybe<Array<Maybe<Scalars['Boolean']>>>;
  between?: Maybe<Array<Maybe<Scalars['Boolean']>>>;
  contains?: Maybe<Scalars['Boolean']>;
  containsi?: Maybe<Scalars['Boolean']>;
  endsWith?: Maybe<Scalars['Boolean']>;
  eq?: Maybe<Scalars['Boolean']>;
  gt?: Maybe<Scalars['Boolean']>;
  gte?: Maybe<Scalars['Boolean']>;
  in?: Maybe<Array<Maybe<Scalars['Boolean']>>>;
  lt?: Maybe<Scalars['Boolean']>;
  lte?: Maybe<Scalars['Boolean']>;
  ne?: Maybe<Scalars['Boolean']>;
  not?: Maybe<BooleanFilterInput>;
  notContains?: Maybe<Scalars['Boolean']>;
  notContainsi?: Maybe<Scalars['Boolean']>;
  notIn?: Maybe<Array<Maybe<Scalars['Boolean']>>>;
  notNull?: Maybe<Scalars['Boolean']>;
  null?: Maybe<Scalars['Boolean']>;
  or?: Maybe<Array<Maybe<Scalars['Boolean']>>>;
  startsWith?: Maybe<Scalars['Boolean']>;
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
  callToActionButtonTitle?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  inputPlaceholder?: Maybe<Scalars['String']>;
  subtitle?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
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
  filters?: Maybe<ProductListFiltersInput>;
  pagination?: Maybe<PaginationArg>;
  publicationState?: Maybe<PublicationState>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
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

export type ComponentStoreFooterInput = {
  bottomMenu?: Maybe<Scalars['ID']>;
  id?: Maybe<Scalars['ID']>;
  menu1?: Maybe<Scalars['ID']>;
  menu2?: Maybe<Scalars['ID']>;
  partners?: Maybe<Scalars['ID']>;
};

export type ComponentStoreHeader = {
  __typename?: 'ComponentStoreHeader';
  id: Scalars['ID'];
  menu?: Maybe<MenuEntityResponse>;
};

export type ComponentStoreHeaderInput = {
  id?: Maybe<Scalars['ID']>;
  menu?: Maybe<Scalars['ID']>;
};

export type ComponentStoreShopifySettings = {
  __typename?: 'ComponentStoreShopifySettings';
  id: Scalars['ID'];
  storefrontAccessToken: Scalars['String'];
  storefrontDomain: Scalars['String'];
};

export type ComponentStoreShopifySettingsInput = {
  id?: Maybe<Scalars['ID']>;
  storefrontAccessToken?: Maybe<Scalars['String']>;
  storefrontDomain?: Maybe<Scalars['String']>;
};

export type ComponentStoreSocialMediaAccounts = {
  __typename?: 'ComponentStoreSocialMediaAccounts';
  facebook?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  instagram?: Maybe<Scalars['String']>;
  repairOrg?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
  youtube?: Maybe<Scalars['String']>;
};

export type ComponentStoreSocialMediaAccountsInput = {
  facebook?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  instagram?: Maybe<Scalars['String']>;
  repairOrg?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
  youtube?: Maybe<Scalars['String']>;
};

export type DateTimeFilterInput = {
  and?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  between?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  contains?: Maybe<Scalars['DateTime']>;
  containsi?: Maybe<Scalars['DateTime']>;
  endsWith?: Maybe<Scalars['DateTime']>;
  eq?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  ne?: Maybe<Scalars['DateTime']>;
  not?: Maybe<DateTimeFilterInput>;
  notContains?: Maybe<Scalars['DateTime']>;
  notContainsi?: Maybe<Scalars['DateTime']>;
  notIn?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  notNull?: Maybe<Scalars['Boolean']>;
  null?: Maybe<Scalars['Boolean']>;
  or?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  startsWith?: Maybe<Scalars['DateTime']>;
};

export enum Enum_Store_Currency {
  Aud = 'AUD',
  Cad = 'CAD',
  Eur = 'EUR',
  Gbp = 'GBP',
  Usd = 'USD'
}

export type Error = {
  __typename?: 'Error';
  code: Scalars['String'];
  message?: Maybe<Scalars['String']>;
};

export type FileInfoInput = {
  alternativeText?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type FloatFilterInput = {
  and?: Maybe<Array<Maybe<Scalars['Float']>>>;
  between?: Maybe<Array<Maybe<Scalars['Float']>>>;
  contains?: Maybe<Scalars['Float']>;
  containsi?: Maybe<Scalars['Float']>;
  endsWith?: Maybe<Scalars['Float']>;
  eq?: Maybe<Scalars['Float']>;
  gt?: Maybe<Scalars['Float']>;
  gte?: Maybe<Scalars['Float']>;
  in?: Maybe<Array<Maybe<Scalars['Float']>>>;
  lt?: Maybe<Scalars['Float']>;
  lte?: Maybe<Scalars['Float']>;
  ne?: Maybe<Scalars['Float']>;
  not?: Maybe<FloatFilterInput>;
  notContains?: Maybe<Scalars['Float']>;
  notContainsi?: Maybe<Scalars['Float']>;
  notIn?: Maybe<Array<Maybe<Scalars['Float']>>>;
  notNull?: Maybe<Scalars['Boolean']>;
  null?: Maybe<Scalars['Boolean']>;
  or?: Maybe<Array<Maybe<Scalars['Float']>>>;
  startsWith?: Maybe<Scalars['Float']>;
};

export type GenericMorph = ComponentGlobalNewsletterForm | ComponentMenuLink | ComponentMenuLinkWithImage | ComponentMenuProductListLink | ComponentMenuSubmenu | ComponentProductListBanner | ComponentProductListFeaturedProductList | ComponentProductListLinkedProductListSet | ComponentProductListRelatedPosts | ComponentStoreFooter | ComponentStoreHeader | ComponentStoreShopifySettings | ComponentStoreSocialMediaAccounts | Global | I18NLocale | Menu | ProductList | Store | UploadFile | UsersPermissionsPermission | UsersPermissionsRole | UsersPermissionsUser;

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
  publicationState?: Maybe<PublicationState>;
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
  newsletterForm?: Maybe<ComponentGlobalNewsletterFormInput>;
  publishedAt?: Maybe<Scalars['DateTime']>;
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
  and?: Maybe<Array<Maybe<I18NLocaleFiltersInput>>>;
  code?: Maybe<StringFilterInput>;
  createdAt?: Maybe<DateTimeFilterInput>;
  id?: Maybe<IdFilterInput>;
  name?: Maybe<StringFilterInput>;
  not?: Maybe<I18NLocaleFiltersInput>;
  or?: Maybe<Array<Maybe<I18NLocaleFiltersInput>>>;
  updatedAt?: Maybe<DateTimeFilterInput>;
};

export type IdFilterInput = {
  and?: Maybe<Array<Maybe<Scalars['ID']>>>;
  between?: Maybe<Array<Maybe<Scalars['ID']>>>;
  contains?: Maybe<Scalars['ID']>;
  containsi?: Maybe<Scalars['ID']>;
  endsWith?: Maybe<Scalars['ID']>;
  eq?: Maybe<Scalars['ID']>;
  gt?: Maybe<Scalars['ID']>;
  gte?: Maybe<Scalars['ID']>;
  in?: Maybe<Array<Maybe<Scalars['ID']>>>;
  lt?: Maybe<Scalars['ID']>;
  lte?: Maybe<Scalars['ID']>;
  ne?: Maybe<Scalars['ID']>;
  not?: Maybe<IdFilterInput>;
  notContains?: Maybe<Scalars['ID']>;
  notContainsi?: Maybe<Scalars['ID']>;
  notIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  notNull?: Maybe<Scalars['Boolean']>;
  null?: Maybe<Scalars['Boolean']>;
  or?: Maybe<Array<Maybe<Scalars['ID']>>>;
  startsWith?: Maybe<Scalars['ID']>;
};

export type IntFilterInput = {
  and?: Maybe<Array<Maybe<Scalars['Int']>>>;
  between?: Maybe<Array<Maybe<Scalars['Int']>>>;
  contains?: Maybe<Scalars['Int']>;
  containsi?: Maybe<Scalars['Int']>;
  endsWith?: Maybe<Scalars['Int']>;
  eq?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  gte?: Maybe<Scalars['Int']>;
  in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  lt?: Maybe<Scalars['Int']>;
  lte?: Maybe<Scalars['Int']>;
  ne?: Maybe<Scalars['Int']>;
  not?: Maybe<IntFilterInput>;
  notContains?: Maybe<Scalars['Int']>;
  notContainsi?: Maybe<Scalars['Int']>;
  notIn?: Maybe<Array<Maybe<Scalars['Int']>>>;
  notNull?: Maybe<Scalars['Boolean']>;
  null?: Maybe<Scalars['Boolean']>;
  or?: Maybe<Array<Maybe<Scalars['Int']>>>;
  startsWith?: Maybe<Scalars['Int']>;
};

export type JsonFilterInput = {
  and?: Maybe<Array<Maybe<Scalars['JSON']>>>;
  between?: Maybe<Array<Maybe<Scalars['JSON']>>>;
  contains?: Maybe<Scalars['JSON']>;
  containsi?: Maybe<Scalars['JSON']>;
  endsWith?: Maybe<Scalars['JSON']>;
  eq?: Maybe<Scalars['JSON']>;
  gt?: Maybe<Scalars['JSON']>;
  gte?: Maybe<Scalars['JSON']>;
  in?: Maybe<Array<Maybe<Scalars['JSON']>>>;
  lt?: Maybe<Scalars['JSON']>;
  lte?: Maybe<Scalars['JSON']>;
  ne?: Maybe<Scalars['JSON']>;
  not?: Maybe<JsonFilterInput>;
  notContains?: Maybe<Scalars['JSON']>;
  notContainsi?: Maybe<Scalars['JSON']>;
  notIn?: Maybe<Array<Maybe<Scalars['JSON']>>>;
  notNull?: Maybe<Scalars['Boolean']>;
  null?: Maybe<Scalars['Boolean']>;
  or?: Maybe<Array<Maybe<Scalars['JSON']>>>;
  startsWith?: Maybe<Scalars['JSON']>;
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
  filters?: Maybe<MenuFiltersInput>;
  pagination?: Maybe<PaginationArg>;
  publicationState?: Maybe<PublicationState>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
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
  and?: Maybe<Array<Maybe<MenuFiltersInput>>>;
  createdAt?: Maybe<DateTimeFilterInput>;
  id?: Maybe<IdFilterInput>;
  locale?: Maybe<StringFilterInput>;
  localizations?: Maybe<MenuFiltersInput>;
  not?: Maybe<MenuFiltersInput>;
  or?: Maybe<Array<Maybe<MenuFiltersInput>>>;
  publishedAt?: Maybe<DateTimeFilterInput>;
  title?: Maybe<StringFilterInput>;
  updatedAt?: Maybe<DateTimeFilterInput>;
};

export type MenuInput = {
  items?: Maybe<Array<Scalars['MenuItemsDynamicZoneInput']>>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  title?: Maybe<Scalars['String']>;
};

export type MenuItemsDynamicZone = ComponentMenuLink | ComponentMenuLinkWithImage | ComponentMenuProductListLink | ComponentMenuSubmenu | Error;

export type MenuRelationResponseCollection = {
  __typename?: 'MenuRelationResponseCollection';
  data: Array<MenuEntity>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createGlobalLocalization?: Maybe<GlobalEntityResponse>;
  createMenu?: Maybe<MenuEntityResponse>;
  createMenuLocalization?: Maybe<MenuEntityResponse>;
  createProductList?: Maybe<ProductListEntityResponse>;
  createProductListLocalization?: Maybe<ProductListEntityResponse>;
  createStore?: Maybe<StoreEntityResponse>;
  createUploadFile?: Maybe<UploadFileEntityResponse>;
  /** Create a new role */
  createUsersPermissionsRole?: Maybe<UsersPermissionsCreateRolePayload>;
  /** Create a new user */
  createUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  deleteGlobal?: Maybe<GlobalEntityResponse>;
  deleteMenu?: Maybe<MenuEntityResponse>;
  deleteProductList?: Maybe<ProductListEntityResponse>;
  deleteStore?: Maybe<StoreEntityResponse>;
  deleteUploadFile?: Maybe<UploadFileEntityResponse>;
  /** Delete an existing role */
  deleteUsersPermissionsRole?: Maybe<UsersPermissionsDeleteRolePayload>;
  /** Update an existing user */
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
  updateProductList?: Maybe<ProductListEntityResponse>;
  updateStore?: Maybe<StoreEntityResponse>;
  updateUploadFile?: Maybe<UploadFileEntityResponse>;
  /** Update an existing role */
  updateUsersPermissionsRole?: Maybe<UsersPermissionsUpdateRolePayload>;
  /** Update an existing user */
  updateUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  upload: UploadFileEntityResponse;
};


export type MutationCreateGlobalLocalizationArgs = {
  data?: Maybe<GlobalInput>;
  id?: Maybe<Scalars['ID']>;
  locale?: Maybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateMenuArgs = {
  data: MenuInput;
  locale?: Maybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateMenuLocalizationArgs = {
  data?: Maybe<MenuInput>;
  id?: Maybe<Scalars['ID']>;
  locale?: Maybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateProductListArgs = {
  data: ProductListInput;
  locale?: Maybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateProductListLocalizationArgs = {
  data?: Maybe<ProductListInput>;
  id?: Maybe<Scalars['ID']>;
  locale?: Maybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateStoreArgs = {
  data: StoreInput;
};


export type MutationCreateUploadFileArgs = {
  data: UploadFileInput;
};


export type MutationCreateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
};


export type MutationCreateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
};


export type MutationDeleteGlobalArgs = {
  locale?: Maybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteMenuArgs = {
  id: Scalars['ID'];
  locale?: Maybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteProductListArgs = {
  id: Scalars['ID'];
  locale?: Maybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteStoreArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUploadFileArgs = {
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
  field?: Maybe<Scalars['String']>;
  files: Array<Maybe<Scalars['Upload']>>;
  ref?: Maybe<Scalars['String']>;
  refId?: Maybe<Scalars['ID']>;
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
  info?: Maybe<FileInfoInput>;
};


export type MutationUpdateGlobalArgs = {
  data: GlobalInput;
  locale?: Maybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateMenuArgs = {
  data: MenuInput;
  id: Scalars['ID'];
  locale?: Maybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateProductListArgs = {
  data: ProductListInput;
  id: Scalars['ID'];
  locale?: Maybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateStoreArgs = {
  data: StoreInput;
  id: Scalars['ID'];
};


export type MutationUpdateUploadFileArgs = {
  data: UploadFileInput;
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
  field?: Maybe<Scalars['String']>;
  file: Scalars['Upload'];
  info?: Maybe<FileInfoInput>;
  ref?: Maybe<Scalars['String']>;
  refId?: Maybe<Scalars['ID']>;
};

export type Pagination = {
  __typename?: 'Pagination';
  page: Scalars['Int'];
  pageCount: Scalars['Int'];
  pageSize: Scalars['Int'];
  total: Scalars['Int'];
};

export type PaginationArg = {
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
};

export type ProductList = {
  __typename?: 'ProductList';
  children?: Maybe<ProductListRelationResponseCollection>;
  createdAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  deviceTitle?: Maybe<Scalars['String']>;
  excludeFromHierarchyDisplay: Scalars['Boolean'];
  filters?: Maybe<Scalars['String']>;
  handle: Scalars['String'];
  image?: Maybe<UploadFileEntityResponse>;
  legacyPageId?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<ProductListRelationResponseCollection>;
  metaDescription?: Maybe<Scalars['String']>;
  parent?: Maybe<ProductListEntityResponse>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  sections: Array<Maybe<ProductListSectionsDynamicZone>>;
  tagline?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type ProductListChildrenArgs = {
  filters?: Maybe<ProductListFiltersInput>;
  pagination?: Maybe<PaginationArg>;
  publicationState?: Maybe<PublicationState>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type ProductListLocalizationsArgs = {
  filters?: Maybe<ProductListFiltersInput>;
  pagination?: Maybe<PaginationArg>;
  publicationState?: Maybe<PublicationState>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
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
  and?: Maybe<Array<Maybe<ProductListFiltersInput>>>;
  children?: Maybe<ProductListFiltersInput>;
  createdAt?: Maybe<DateTimeFilterInput>;
  description?: Maybe<StringFilterInput>;
  deviceTitle?: Maybe<StringFilterInput>;
  excludeFromHierarchyDisplay?: Maybe<BooleanFilterInput>;
  filters?: Maybe<StringFilterInput>;
  handle?: Maybe<StringFilterInput>;
  id?: Maybe<IdFilterInput>;
  legacyPageId?: Maybe<IntFilterInput>;
  locale?: Maybe<StringFilterInput>;
  localizations?: Maybe<ProductListFiltersInput>;
  metaDescription?: Maybe<StringFilterInput>;
  not?: Maybe<ProductListFiltersInput>;
  or?: Maybe<Array<Maybe<ProductListFiltersInput>>>;
  parent?: Maybe<ProductListFiltersInput>;
  publishedAt?: Maybe<DateTimeFilterInput>;
  tagline?: Maybe<StringFilterInput>;
  title?: Maybe<StringFilterInput>;
  updatedAt?: Maybe<DateTimeFilterInput>;
};

export type ProductListInput = {
  children?: Maybe<Array<Maybe<Scalars['ID']>>>;
  description?: Maybe<Scalars['String']>;
  deviceTitle?: Maybe<Scalars['String']>;
  excludeFromHierarchyDisplay?: Maybe<Scalars['Boolean']>;
  filters?: Maybe<Scalars['String']>;
  handle?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['ID']>;
  legacyPageId?: Maybe<Scalars['Int']>;
  metaDescription?: Maybe<Scalars['String']>;
  parent?: Maybe<Scalars['ID']>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  sections?: Maybe<Array<Scalars['ProductListSectionsDynamicZoneInput']>>;
  tagline?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type ProductListRelationResponseCollection = {
  __typename?: 'ProductListRelationResponseCollection';
  data: Array<ProductListEntity>;
};

export type ProductListSectionsDynamicZone = ComponentProductListBanner | ComponentProductListFeaturedProductList | ComponentProductListLinkedProductListSet | ComponentProductListRelatedPosts | Error;

export enum PublicationState {
  Live = 'LIVE',
  Preview = 'PREVIEW'
}

export type Query = {
  __typename?: 'Query';
  global?: Maybe<GlobalEntityResponse>;
  i18NLocale?: Maybe<I18NLocaleEntityResponse>;
  i18NLocales?: Maybe<I18NLocaleEntityResponseCollection>;
  me?: Maybe<UsersPermissionsMe>;
  menu?: Maybe<MenuEntityResponse>;
  menus?: Maybe<MenuEntityResponseCollection>;
  productList?: Maybe<ProductListEntityResponse>;
  productLists?: Maybe<ProductListEntityResponseCollection>;
  store?: Maybe<StoreEntityResponse>;
  stores?: Maybe<StoreEntityResponseCollection>;
  uploadFile?: Maybe<UploadFileEntityResponse>;
  uploadFiles?: Maybe<UploadFileEntityResponseCollection>;
  usersPermissionsRole?: Maybe<UsersPermissionsRoleEntityResponse>;
  usersPermissionsRoles?: Maybe<UsersPermissionsRoleEntityResponseCollection>;
  usersPermissionsUser?: Maybe<UsersPermissionsUserEntityResponse>;
  usersPermissionsUsers?: Maybe<UsersPermissionsUserEntityResponseCollection>;
};


export type QueryGlobalArgs = {
  locale?: Maybe<Scalars['I18NLocaleCode']>;
  publicationState?: Maybe<PublicationState>;
};


export type QueryI18NLocaleArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryI18NLocalesArgs = {
  filters?: Maybe<I18NLocaleFiltersInput>;
  pagination?: Maybe<PaginationArg>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type QueryMenuArgs = {
  id?: Maybe<Scalars['ID']>;
  locale?: Maybe<Scalars['I18NLocaleCode']>;
};


export type QueryMenusArgs = {
  filters?: Maybe<MenuFiltersInput>;
  locale?: Maybe<Scalars['I18NLocaleCode']>;
  pagination?: Maybe<PaginationArg>;
  publicationState?: Maybe<PublicationState>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type QueryProductListArgs = {
  id?: Maybe<Scalars['ID']>;
  locale?: Maybe<Scalars['I18NLocaleCode']>;
};


export type QueryProductListsArgs = {
  filters?: Maybe<ProductListFiltersInput>;
  locale?: Maybe<Scalars['I18NLocaleCode']>;
  pagination?: Maybe<PaginationArg>;
  publicationState?: Maybe<PublicationState>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type QueryStoreArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryStoresArgs = {
  filters?: Maybe<StoreFiltersInput>;
  pagination?: Maybe<PaginationArg>;
  publicationState?: Maybe<PublicationState>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type QueryUploadFileArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryUploadFilesArgs = {
  filters?: Maybe<UploadFileFiltersInput>;
  pagination?: Maybe<PaginationArg>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type QueryUsersPermissionsRoleArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryUsersPermissionsRolesArgs = {
  filters?: Maybe<UsersPermissionsRoleFiltersInput>;
  pagination?: Maybe<PaginationArg>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type QueryUsersPermissionsUserArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryUsersPermissionsUsersArgs = {
  filters?: Maybe<UsersPermissionsUserFiltersInput>;
  pagination?: Maybe<PaginationArg>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
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
  and?: Maybe<Array<Maybe<StoreFiltersInput>>>;
  code?: Maybe<StringFilterInput>;
  createdAt?: Maybe<DateTimeFilterInput>;
  currency?: Maybe<StringFilterInput>;
  id?: Maybe<IdFilterInput>;
  name?: Maybe<StringFilterInput>;
  not?: Maybe<StoreFiltersInput>;
  or?: Maybe<Array<Maybe<StoreFiltersInput>>>;
  publishedAt?: Maybe<DateTimeFilterInput>;
  updatedAt?: Maybe<DateTimeFilterInput>;
  url?: Maybe<StringFilterInput>;
};

export type StoreInput = {
  code?: Maybe<Scalars['String']>;
  currency?: Maybe<Enum_Store_Currency>;
  footer?: Maybe<ComponentStoreFooterInput>;
  header?: Maybe<ComponentStoreHeaderInput>;
  name?: Maybe<Scalars['String']>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  shopifySettings?: Maybe<ComponentStoreShopifySettingsInput>;
  socialMediaAccounts?: Maybe<ComponentStoreSocialMediaAccountsInput>;
  url?: Maybe<Scalars['String']>;
};

export type StringFilterInput = {
  and?: Maybe<Array<Maybe<Scalars['String']>>>;
  between?: Maybe<Array<Maybe<Scalars['String']>>>;
  contains?: Maybe<Scalars['String']>;
  containsi?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  eq?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Maybe<Scalars['String']>>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  ne?: Maybe<Scalars['String']>;
  not?: Maybe<StringFilterInput>;
  notContains?: Maybe<Scalars['String']>;
  notContainsi?: Maybe<Scalars['String']>;
  notIn?: Maybe<Array<Maybe<Scalars['String']>>>;
  notNull?: Maybe<Scalars['Boolean']>;
  null?: Maybe<Scalars['Boolean']>;
  or?: Maybe<Array<Maybe<Scalars['String']>>>;
  startsWith?: Maybe<Scalars['String']>;
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
  alternativeText?: Maybe<StringFilterInput>;
  and?: Maybe<Array<Maybe<UploadFileFiltersInput>>>;
  caption?: Maybe<StringFilterInput>;
  createdAt?: Maybe<DateTimeFilterInput>;
  ext?: Maybe<StringFilterInput>;
  formats?: Maybe<JsonFilterInput>;
  hash?: Maybe<StringFilterInput>;
  height?: Maybe<IntFilterInput>;
  id?: Maybe<IdFilterInput>;
  mime?: Maybe<StringFilterInput>;
  name?: Maybe<StringFilterInput>;
  not?: Maybe<UploadFileFiltersInput>;
  or?: Maybe<Array<Maybe<UploadFileFiltersInput>>>;
  previewUrl?: Maybe<StringFilterInput>;
  provider?: Maybe<StringFilterInput>;
  provider_metadata?: Maybe<JsonFilterInput>;
  size?: Maybe<FloatFilterInput>;
  updatedAt?: Maybe<DateTimeFilterInput>;
  url?: Maybe<StringFilterInput>;
  width?: Maybe<IntFilterInput>;
};

export type UploadFileInput = {
  alternativeText?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  ext?: Maybe<Scalars['String']>;
  formats?: Maybe<Scalars['JSON']>;
  hash?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Int']>;
  mime?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  previewUrl?: Maybe<Scalars['String']>;
  provider?: Maybe<Scalars['String']>;
  provider_metadata?: Maybe<Scalars['JSON']>;
  size?: Maybe<Scalars['Float']>;
  url?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
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
  action?: Maybe<StringFilterInput>;
  and?: Maybe<Array<Maybe<UsersPermissionsPermissionFiltersInput>>>;
  createdAt?: Maybe<DateTimeFilterInput>;
  id?: Maybe<IdFilterInput>;
  not?: Maybe<UsersPermissionsPermissionFiltersInput>;
  or?: Maybe<Array<Maybe<UsersPermissionsPermissionFiltersInput>>>;
  role?: Maybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: Maybe<DateTimeFilterInput>;
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
  filters?: Maybe<UsersPermissionsPermissionFiltersInput>;
  pagination?: Maybe<PaginationArg>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type UsersPermissionsRoleUsersArgs = {
  filters?: Maybe<UsersPermissionsUserFiltersInput>;
  pagination?: Maybe<PaginationArg>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
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
  and?: Maybe<Array<Maybe<UsersPermissionsRoleFiltersInput>>>;
  createdAt?: Maybe<DateTimeFilterInput>;
  description?: Maybe<StringFilterInput>;
  id?: Maybe<IdFilterInput>;
  name?: Maybe<StringFilterInput>;
  not?: Maybe<UsersPermissionsRoleFiltersInput>;
  or?: Maybe<Array<Maybe<UsersPermissionsRoleFiltersInput>>>;
  permissions?: Maybe<UsersPermissionsPermissionFiltersInput>;
  type?: Maybe<StringFilterInput>;
  updatedAt?: Maybe<DateTimeFilterInput>;
  users?: Maybe<UsersPermissionsUserFiltersInput>;
};

export type UsersPermissionsRoleInput = {
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  permissions?: Maybe<Array<Maybe<Scalars['ID']>>>;
  type?: Maybe<Scalars['String']>;
  users?: Maybe<Array<Maybe<Scalars['ID']>>>;
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
  and?: Maybe<Array<Maybe<UsersPermissionsUserFiltersInput>>>;
  blocked?: Maybe<BooleanFilterInput>;
  confirmationToken?: Maybe<StringFilterInput>;
  confirmed?: Maybe<BooleanFilterInput>;
  createdAt?: Maybe<DateTimeFilterInput>;
  email?: Maybe<StringFilterInput>;
  id?: Maybe<IdFilterInput>;
  not?: Maybe<UsersPermissionsUserFiltersInput>;
  or?: Maybe<Array<Maybe<UsersPermissionsUserFiltersInput>>>;
  password?: Maybe<StringFilterInput>;
  provider?: Maybe<StringFilterInput>;
  resetPasswordToken?: Maybe<StringFilterInput>;
  role?: Maybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: Maybe<DateTimeFilterInput>;
  username?: Maybe<StringFilterInput>;
};

export type UsersPermissionsUserInput = {
  blocked?: Maybe<Scalars['Boolean']>;
  confirmationToken?: Maybe<Scalars['String']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  provider?: Maybe<Scalars['String']>;
  resetPasswordToken?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['ID']>;
  username?: Maybe<Scalars['String']>;
};

export type UsersPermissionsUserRelationResponseCollection = {
  __typename?: 'UsersPermissionsUserRelationResponseCollection';
  data: Array<UsersPermissionsUserEntity>;
};

export type GetProductListPageDataQueryVariables = Exact<{
  productListFilters?: Maybe<ProductListFiltersInput>;
  currentStoreFilters?: Maybe<StoreFiltersInput>;
}>;


export type GetProductListPageDataQuery = { __typename?: 'Query', global?: Maybe<{ __typename?: 'GlobalEntityResponse', data?: Maybe<{ __typename?: 'GlobalEntity', attributes?: Maybe<{ __typename?: 'Global', newsletterForm: { __typename?: 'ComponentGlobalNewsletterForm', title: string, subtitle: string, inputPlaceholder: string, callToActionButtonTitle: string } }> }> }>, productLists?: Maybe<{ __typename?: 'ProductListEntityResponseCollection', data: Array<{ __typename?: 'ProductListEntity', id?: Maybe<string>, attributes?: Maybe<{ __typename?: 'ProductList', handle: string, title: string, tagline?: Maybe<string>, description: string, metaDescription?: Maybe<string>, filters?: Maybe<string>, image?: Maybe<{ __typename?: 'UploadFileEntityResponse', data?: Maybe<{ __typename?: 'UploadFileEntity', attributes?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> }> }>, parent?: Maybe<{ __typename?: 'ProductListEntityResponse', data?: Maybe<{ __typename?: 'ProductListEntity', attributes?: Maybe<{ __typename?: 'ProductList', title: string, handle: string, parent?: Maybe<{ __typename?: 'ProductListEntityResponse', data?: Maybe<{ __typename?: 'ProductListEntity', attributes?: Maybe<{ __typename?: 'ProductList', title: string, handle: string, parent?: Maybe<{ __typename?: 'ProductListEntityResponse', data?: Maybe<{ __typename?: 'ProductListEntity', attributes?: Maybe<{ __typename?: 'ProductList', title: string, handle: string, parent?: Maybe<{ __typename?: 'ProductListEntityResponse', data?: Maybe<{ __typename?: 'ProductListEntity', attributes?: Maybe<{ __typename?: 'ProductList', title: string, handle: string, parent?: Maybe<{ __typename?: 'ProductListEntityResponse', data?: Maybe<{ __typename?: 'ProductListEntity', attributes?: Maybe<{ __typename?: 'ProductList', title: string, handle: string, parent?: Maybe<{ __typename?: 'ProductListEntityResponse', data?: Maybe<{ __typename?: 'ProductListEntity', attributes?: Maybe<{ __typename?: 'ProductList', title: string, handle: string }> }> }> }> }> }> }> }> }> }> }> }> }> }> }> }> }> }>, children?: Maybe<{ __typename?: 'ProductListRelationResponseCollection', data: Array<{ __typename?: 'ProductListEntity', attributes?: Maybe<{ __typename?: 'ProductList', handle: string, title: string, image?: Maybe<{ __typename?: 'UploadFileEntityResponse', data?: Maybe<{ __typename?: 'UploadFileEntity', attributes?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> }> }> }> }> }>, sections: Array<Maybe<{ __typename: 'ComponentProductListBanner', id: string, title: string, description: string, callToActionLabel: string, url: string } | { __typename: 'ComponentProductListFeaturedProductList', id: string, productList?: Maybe<{ __typename?: 'ProductListEntityResponse', data?: Maybe<{ __typename?: 'ProductListEntity', attributes?: Maybe<{ __typename?: 'ProductList', handle: string, title: string, description: string, image?: Maybe<{ __typename?: 'UploadFileEntityResponse', data?: Maybe<{ __typename?: 'UploadFileEntity', attributes?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> }> }> }> }> }> } | { __typename: 'ComponentProductListLinkedProductListSet', id: string, title: string, productLists?: Maybe<{ __typename?: 'ProductListRelationResponseCollection', data: Array<{ __typename?: 'ProductListEntity', attributes?: Maybe<{ __typename?: 'ProductList', handle: string, title: string, description: string, image?: Maybe<{ __typename?: 'UploadFileEntityResponse', data?: Maybe<{ __typename?: 'UploadFileEntity', attributes?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> }> }> }> }> }> } | { __typename: 'ComponentProductListRelatedPosts', id: string, tags?: Maybe<string> } | { __typename: 'Error' }>> }> }> }>, stores?: Maybe<{ __typename?: 'StoreEntityResponseCollection', data: Array<{ __typename?: 'StoreEntity', attributes?: Maybe<{ __typename?: 'Store', code: string, name: string, url: string, currency: Enum_Store_Currency }> }> }>, currentStore?: Maybe<{ __typename?: 'StoreEntityResponseCollection', data: Array<{ __typename?: 'StoreEntity', attributes?: Maybe<{ __typename?: 'Store', shopifySettings?: Maybe<{ __typename?: 'ComponentStoreShopifySettings', storefrontDomain: string, storefrontAccessToken: string }>, header: { __typename?: 'ComponentStoreHeader', menu?: Maybe<{ __typename?: 'MenuEntityResponse', data?: Maybe<{ __typename?: 'MenuEntity', attributes?: Maybe<{ __typename?: 'Menu', items: Array<Maybe<{ __typename: 'ComponentMenuLink', name: string, url: string, description?: Maybe<string> } | { __typename: 'ComponentMenuLinkWithImage', name: string, url: string, image: { __typename?: 'UploadFileEntityResponse', data?: Maybe<{ __typename?: 'UploadFileEntity', attributes?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> }> } } | { __typename: 'ComponentMenuProductListLink', name: string, productList?: Maybe<{ __typename?: 'ProductListEntityResponse', data?: Maybe<{ __typename?: 'ProductListEntity', attributes?: Maybe<{ __typename?: 'ProductList', handle: string }> }> }> } | { __typename: 'ComponentMenuSubmenu', name: string, submenu?: Maybe<{ __typename?: 'MenuEntityResponse', data?: Maybe<{ __typename?: 'MenuEntity', attributes?: Maybe<{ __typename?: 'Menu', items: Array<Maybe<{ __typename: 'ComponentMenuLink', name: string, url: string, description?: Maybe<string> } | { __typename: 'ComponentMenuLinkWithImage', name: string, url: string, image: { __typename?: 'UploadFileEntityResponse', data?: Maybe<{ __typename?: 'UploadFileEntity', attributes?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> }> } } | { __typename: 'ComponentMenuProductListLink', name: string, productList?: Maybe<{ __typename?: 'ProductListEntityResponse', data?: Maybe<{ __typename?: 'ProductListEntity', attributes?: Maybe<{ __typename?: 'ProductList', handle: string }> }> }> } | { __typename: 'ComponentMenuSubmenu', name: string } | { __typename: 'Error' }>> }> }> }> } | { __typename: 'Error' }>> }> }> }> }, footer: { __typename?: 'ComponentStoreFooter', menu1?: Maybe<{ __typename?: 'MenuEntityResponse', data?: Maybe<{ __typename?: 'MenuEntity', attributes?: Maybe<{ __typename?: 'Menu', items: Array<Maybe<{ __typename: 'ComponentMenuLink', name: string, url: string, description?: Maybe<string> } | { __typename: 'ComponentMenuLinkWithImage', name: string, url: string, image: { __typename?: 'UploadFileEntityResponse', data?: Maybe<{ __typename?: 'UploadFileEntity', attributes?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> }> } } | { __typename: 'ComponentMenuProductListLink', name: string, productList?: Maybe<{ __typename?: 'ProductListEntityResponse', data?: Maybe<{ __typename?: 'ProductListEntity', attributes?: Maybe<{ __typename?: 'ProductList', handle: string }> }> }> } | { __typename: 'ComponentMenuSubmenu', name: string, submenu?: Maybe<{ __typename?: 'MenuEntityResponse', data?: Maybe<{ __typename?: 'MenuEntity', attributes?: Maybe<{ __typename?: 'Menu', items: Array<Maybe<{ __typename: 'ComponentMenuLink', name: string, url: string, description?: Maybe<string> } | { __typename: 'ComponentMenuLinkWithImage', name: string, url: string, image: { __typename?: 'UploadFileEntityResponse', data?: Maybe<{ __typename?: 'UploadFileEntity', attributes?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> }> } } | { __typename: 'ComponentMenuProductListLink', name: string, productList?: Maybe<{ __typename?: 'ProductListEntityResponse', data?: Maybe<{ __typename?: 'ProductListEntity', attributes?: Maybe<{ __typename?: 'ProductList', handle: string }> }> }> } | { __typename: 'ComponentMenuSubmenu', name: string } | { __typename: 'Error' }>> }> }> }> } | { __typename: 'Error' }>> }> }> }>, menu2?: Maybe<{ __typename?: 'MenuEntityResponse', data?: Maybe<{ __typename?: 'MenuEntity', attributes?: Maybe<{ __typename?: 'Menu', items: Array<Maybe<{ __typename: 'ComponentMenuLink', name: string, url: string, description?: Maybe<string> } | { __typename: 'ComponentMenuLinkWithImage', name: string, url: string, image: { __typename?: 'UploadFileEntityResponse', data?: Maybe<{ __typename?: 'UploadFileEntity', attributes?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> }> } } | { __typename: 'ComponentMenuProductListLink', name: string, productList?: Maybe<{ __typename?: 'ProductListEntityResponse', data?: Maybe<{ __typename?: 'ProductListEntity', attributes?: Maybe<{ __typename?: 'ProductList', handle: string }> }> }> } | { __typename: 'ComponentMenuSubmenu', name: string, submenu?: Maybe<{ __typename?: 'MenuEntityResponse', data?: Maybe<{ __typename?: 'MenuEntity', attributes?: Maybe<{ __typename?: 'Menu', items: Array<Maybe<{ __typename: 'ComponentMenuLink', name: string, url: string, description?: Maybe<string> } | { __typename: 'ComponentMenuLinkWithImage', name: string, url: string, image: { __typename?: 'UploadFileEntityResponse', data?: Maybe<{ __typename?: 'UploadFileEntity', attributes?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> }> } } | { __typename: 'ComponentMenuProductListLink', name: string, productList?: Maybe<{ __typename?: 'ProductListEntityResponse', data?: Maybe<{ __typename?: 'ProductListEntity', attributes?: Maybe<{ __typename?: 'ProductList', handle: string }> }> }> } | { __typename: 'ComponentMenuSubmenu', name: string } | { __typename: 'Error' }>> }> }> }> } | { __typename: 'Error' }>> }> }> }>, partners?: Maybe<{ __typename?: 'MenuEntityResponse', data?: Maybe<{ __typename?: 'MenuEntity', attributes?: Maybe<{ __typename?: 'Menu', items: Array<Maybe<{ __typename: 'ComponentMenuLink', name: string, url: string, description?: Maybe<string> } | { __typename: 'ComponentMenuLinkWithImage', name: string, url: string, image: { __typename?: 'UploadFileEntityResponse', data?: Maybe<{ __typename?: 'UploadFileEntity', attributes?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> }> } } | { __typename: 'ComponentMenuProductListLink', name: string, productList?: Maybe<{ __typename?: 'ProductListEntityResponse', data?: Maybe<{ __typename?: 'ProductListEntity', attributes?: Maybe<{ __typename?: 'ProductList', handle: string }> }> }> } | { __typename: 'ComponentMenuSubmenu', name: string, submenu?: Maybe<{ __typename?: 'MenuEntityResponse', data?: Maybe<{ __typename?: 'MenuEntity', attributes?: Maybe<{ __typename?: 'Menu', items: Array<Maybe<{ __typename: 'ComponentMenuLink', name: string, url: string, description?: Maybe<string> } | { __typename: 'ComponentMenuLinkWithImage', name: string, url: string, image: { __typename?: 'UploadFileEntityResponse', data?: Maybe<{ __typename?: 'UploadFileEntity', attributes?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> }> } } | { __typename: 'ComponentMenuProductListLink', name: string, productList?: Maybe<{ __typename?: 'ProductListEntityResponse', data?: Maybe<{ __typename?: 'ProductListEntity', attributes?: Maybe<{ __typename?: 'ProductList', handle: string }> }> }> } | { __typename: 'ComponentMenuSubmenu', name: string } | { __typename: 'Error' }>> }> }> }> } | { __typename: 'Error' }>> }> }> }>, bottomMenu?: Maybe<{ __typename?: 'MenuEntityResponse', data?: Maybe<{ __typename?: 'MenuEntity', attributes?: Maybe<{ __typename?: 'Menu', items: Array<Maybe<{ __typename: 'ComponentMenuLink', name: string, url: string, description?: Maybe<string> } | { __typename: 'ComponentMenuLinkWithImage', name: string, url: string, image: { __typename?: 'UploadFileEntityResponse', data?: Maybe<{ __typename?: 'UploadFileEntity', attributes?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> }> } } | { __typename: 'ComponentMenuProductListLink', name: string, productList?: Maybe<{ __typename?: 'ProductListEntityResponse', data?: Maybe<{ __typename?: 'ProductListEntity', attributes?: Maybe<{ __typename?: 'ProductList', handle: string }> }> }> } | { __typename: 'ComponentMenuSubmenu', name: string, submenu?: Maybe<{ __typename?: 'MenuEntityResponse', data?: Maybe<{ __typename?: 'MenuEntity', attributes?: Maybe<{ __typename?: 'Menu', items: Array<Maybe<{ __typename: 'ComponentMenuLink', name: string, url: string, description?: Maybe<string> } | { __typename: 'ComponentMenuLinkWithImage', name: string, url: string, image: { __typename?: 'UploadFileEntityResponse', data?: Maybe<{ __typename?: 'UploadFileEntity', attributes?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> }> } } | { __typename: 'ComponentMenuProductListLink', name: string, productList?: Maybe<{ __typename?: 'ProductListEntityResponse', data?: Maybe<{ __typename?: 'ProductListEntity', attributes?: Maybe<{ __typename?: 'ProductList', handle: string }> }> }> } | { __typename: 'ComponentMenuSubmenu', name: string } | { __typename: 'Error' }>> }> }> }> } | { __typename: 'Error' }>> }> }> }> }, socialMediaAccounts: { __typename?: 'ComponentStoreSocialMediaAccounts', twitter?: Maybe<string>, facebook?: Maybe<string>, instagram?: Maybe<string>, youtube?: Maybe<string>, repairOrg?: Maybe<string> } }> }> }> };

export type LayoutPropsFragment = { __typename?: 'Query', stores?: Maybe<{ __typename?: 'StoreEntityResponseCollection', data: Array<{ __typename?: 'StoreEntity', attributes?: Maybe<{ __typename?: 'Store', code: string, name: string, url: string, currency: Enum_Store_Currency }> }> }>, currentStore?: Maybe<{ __typename?: 'StoreEntityResponseCollection', data: Array<{ __typename?: 'StoreEntity', attributes?: Maybe<{ __typename?: 'Store', shopifySettings?: Maybe<{ __typename?: 'ComponentStoreShopifySettings', storefrontDomain: string, storefrontAccessToken: string }>, header: { __typename?: 'ComponentStoreHeader', menu?: Maybe<{ __typename?: 'MenuEntityResponse', data?: Maybe<{ __typename?: 'MenuEntity', attributes?: Maybe<{ __typename?: 'Menu', items: Array<Maybe<{ __typename: 'ComponentMenuLink', name: string, url: string, description?: Maybe<string> } | { __typename: 'ComponentMenuLinkWithImage', name: string, url: string, image: { __typename?: 'UploadFileEntityResponse', data?: Maybe<{ __typename?: 'UploadFileEntity', attributes?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> }> } } | { __typename: 'ComponentMenuProductListLink', name: string, productList?: Maybe<{ __typename?: 'ProductListEntityResponse', data?: Maybe<{ __typename?: 'ProductListEntity', attributes?: Maybe<{ __typename?: 'ProductList', handle: string }> }> }> } | { __typename: 'ComponentMenuSubmenu', name: string, submenu?: Maybe<{ __typename?: 'MenuEntityResponse', data?: Maybe<{ __typename?: 'MenuEntity', attributes?: Maybe<{ __typename?: 'Menu', items: Array<Maybe<{ __typename: 'ComponentMenuLink', name: string, url: string, description?: Maybe<string> } | { __typename: 'ComponentMenuLinkWithImage', name: string, url: string, image: { __typename?: 'UploadFileEntityResponse', data?: Maybe<{ __typename?: 'UploadFileEntity', attributes?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> }> } } | { __typename: 'ComponentMenuProductListLink', name: string, productList?: Maybe<{ __typename?: 'ProductListEntityResponse', data?: Maybe<{ __typename?: 'ProductListEntity', attributes?: Maybe<{ __typename?: 'ProductList', handle: string }> }> }> } | { __typename: 'ComponentMenuSubmenu', name: string } | { __typename: 'Error' }>> }> }> }> } | { __typename: 'Error' }>> }> }> }> }, footer: { __typename?: 'ComponentStoreFooter', menu1?: Maybe<{ __typename?: 'MenuEntityResponse', data?: Maybe<{ __typename?: 'MenuEntity', attributes?: Maybe<{ __typename?: 'Menu', items: Array<Maybe<{ __typename: 'ComponentMenuLink', name: string, url: string, description?: Maybe<string> } | { __typename: 'ComponentMenuLinkWithImage', name: string, url: string, image: { __typename?: 'UploadFileEntityResponse', data?: Maybe<{ __typename?: 'UploadFileEntity', attributes?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> }> } } | { __typename: 'ComponentMenuProductListLink', name: string, productList?: Maybe<{ __typename?: 'ProductListEntityResponse', data?: Maybe<{ __typename?: 'ProductListEntity', attributes?: Maybe<{ __typename?: 'ProductList', handle: string }> }> }> } | { __typename: 'ComponentMenuSubmenu', name: string, submenu?: Maybe<{ __typename?: 'MenuEntityResponse', data?: Maybe<{ __typename?: 'MenuEntity', attributes?: Maybe<{ __typename?: 'Menu', items: Array<Maybe<{ __typename: 'ComponentMenuLink', name: string, url: string, description?: Maybe<string> } | { __typename: 'ComponentMenuLinkWithImage', name: string, url: string, image: { __typename?: 'UploadFileEntityResponse', data?: Maybe<{ __typename?: 'UploadFileEntity', attributes?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> }> } } | { __typename: 'ComponentMenuProductListLink', name: string, productList?: Maybe<{ __typename?: 'ProductListEntityResponse', data?: Maybe<{ __typename?: 'ProductListEntity', attributes?: Maybe<{ __typename?: 'ProductList', handle: string }> }> }> } | { __typename: 'ComponentMenuSubmenu', name: string } | { __typename: 'Error' }>> }> }> }> } | { __typename: 'Error' }>> }> }> }>, menu2?: Maybe<{ __typename?: 'MenuEntityResponse', data?: Maybe<{ __typename?: 'MenuEntity', attributes?: Maybe<{ __typename?: 'Menu', items: Array<Maybe<{ __typename: 'ComponentMenuLink', name: string, url: string, description?: Maybe<string> } | { __typename: 'ComponentMenuLinkWithImage', name: string, url: string, image: { __typename?: 'UploadFileEntityResponse', data?: Maybe<{ __typename?: 'UploadFileEntity', attributes?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> }> } } | { __typename: 'ComponentMenuProductListLink', name: string, productList?: Maybe<{ __typename?: 'ProductListEntityResponse', data?: Maybe<{ __typename?: 'ProductListEntity', attributes?: Maybe<{ __typename?: 'ProductList', handle: string }> }> }> } | { __typename: 'ComponentMenuSubmenu', name: string, submenu?: Maybe<{ __typename?: 'MenuEntityResponse', data?: Maybe<{ __typename?: 'MenuEntity', attributes?: Maybe<{ __typename?: 'Menu', items: Array<Maybe<{ __typename: 'ComponentMenuLink', name: string, url: string, description?: Maybe<string> } | { __typename: 'ComponentMenuLinkWithImage', name: string, url: string, image: { __typename?: 'UploadFileEntityResponse', data?: Maybe<{ __typename?: 'UploadFileEntity', attributes?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> }> } } | { __typename: 'ComponentMenuProductListLink', name: string, productList?: Maybe<{ __typename?: 'ProductListEntityResponse', data?: Maybe<{ __typename?: 'ProductListEntity', attributes?: Maybe<{ __typename?: 'ProductList', handle: string }> }> }> } | { __typename: 'ComponentMenuSubmenu', name: string } | { __typename: 'Error' }>> }> }> }> } | { __typename: 'Error' }>> }> }> }>, partners?: Maybe<{ __typename?: 'MenuEntityResponse', data?: Maybe<{ __typename?: 'MenuEntity', attributes?: Maybe<{ __typename?: 'Menu', items: Array<Maybe<{ __typename: 'ComponentMenuLink', name: string, url: string, description?: Maybe<string> } | { __typename: 'ComponentMenuLinkWithImage', name: string, url: string, image: { __typename?: 'UploadFileEntityResponse', data?: Maybe<{ __typename?: 'UploadFileEntity', attributes?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> }> } } | { __typename: 'ComponentMenuProductListLink', name: string, productList?: Maybe<{ __typename?: 'ProductListEntityResponse', data?: Maybe<{ __typename?: 'ProductListEntity', attributes?: Maybe<{ __typename?: 'ProductList', handle: string }> }> }> } | { __typename: 'ComponentMenuSubmenu', name: string, submenu?: Maybe<{ __typename?: 'MenuEntityResponse', data?: Maybe<{ __typename?: 'MenuEntity', attributes?: Maybe<{ __typename?: 'Menu', items: Array<Maybe<{ __typename: 'ComponentMenuLink', name: string, url: string, description?: Maybe<string> } | { __typename: 'ComponentMenuLinkWithImage', name: string, url: string, image: { __typename?: 'UploadFileEntityResponse', data?: Maybe<{ __typename?: 'UploadFileEntity', attributes?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> }> } } | { __typename: 'ComponentMenuProductListLink', name: string, productList?: Maybe<{ __typename?: 'ProductListEntityResponse', data?: Maybe<{ __typename?: 'ProductListEntity', attributes?: Maybe<{ __typename?: 'ProductList', handle: string }> }> }> } | { __typename: 'ComponentMenuSubmenu', name: string } | { __typename: 'Error' }>> }> }> }> } | { __typename: 'Error' }>> }> }> }>, bottomMenu?: Maybe<{ __typename?: 'MenuEntityResponse', data?: Maybe<{ __typename?: 'MenuEntity', attributes?: Maybe<{ __typename?: 'Menu', items: Array<Maybe<{ __typename: 'ComponentMenuLink', name: string, url: string, description?: Maybe<string> } | { __typename: 'ComponentMenuLinkWithImage', name: string, url: string, image: { __typename?: 'UploadFileEntityResponse', data?: Maybe<{ __typename?: 'UploadFileEntity', attributes?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> }> } } | { __typename: 'ComponentMenuProductListLink', name: string, productList?: Maybe<{ __typename?: 'ProductListEntityResponse', data?: Maybe<{ __typename?: 'ProductListEntity', attributes?: Maybe<{ __typename?: 'ProductList', handle: string }> }> }> } | { __typename: 'ComponentMenuSubmenu', name: string, submenu?: Maybe<{ __typename?: 'MenuEntityResponse', data?: Maybe<{ __typename?: 'MenuEntity', attributes?: Maybe<{ __typename?: 'Menu', items: Array<Maybe<{ __typename: 'ComponentMenuLink', name: string, url: string, description?: Maybe<string> } | { __typename: 'ComponentMenuLinkWithImage', name: string, url: string, image: { __typename?: 'UploadFileEntityResponse', data?: Maybe<{ __typename?: 'UploadFileEntity', attributes?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> }> } } | { __typename: 'ComponentMenuProductListLink', name: string, productList?: Maybe<{ __typename?: 'ProductListEntityResponse', data?: Maybe<{ __typename?: 'ProductListEntity', attributes?: Maybe<{ __typename?: 'ProductList', handle: string }> }> }> } | { __typename: 'ComponentMenuSubmenu', name: string } | { __typename: 'Error' }>> }> }> }> } | { __typename: 'Error' }>> }> }> }> }, socialMediaAccounts: { __typename?: 'ComponentStoreSocialMediaAccounts', twitter?: Maybe<string>, facebook?: Maybe<string>, instagram?: Maybe<string>, youtube?: Maybe<string>, repairOrg?: Maybe<string> } }> }> }> };

export type MenuEntityResponsePropsFragment = { __typename?: 'MenuEntityResponse', data?: Maybe<{ __typename?: 'MenuEntity', attributes?: Maybe<{ __typename?: 'Menu', items: Array<Maybe<{ __typename: 'ComponentMenuLink', name: string, url: string, description?: Maybe<string> } | { __typename: 'ComponentMenuLinkWithImage', name: string, url: string, image: { __typename?: 'UploadFileEntityResponse', data?: Maybe<{ __typename?: 'UploadFileEntity', attributes?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> }> } } | { __typename: 'ComponentMenuProductListLink', name: string, productList?: Maybe<{ __typename?: 'ProductListEntityResponse', data?: Maybe<{ __typename?: 'ProductListEntity', attributes?: Maybe<{ __typename?: 'ProductList', handle: string }> }> }> } | { __typename: 'ComponentMenuSubmenu', name: string, submenu?: Maybe<{ __typename?: 'MenuEntityResponse', data?: Maybe<{ __typename?: 'MenuEntity', attributes?: Maybe<{ __typename?: 'Menu', items: Array<Maybe<{ __typename: 'ComponentMenuLink', name: string, url: string, description?: Maybe<string> } | { __typename: 'ComponentMenuLinkWithImage', name: string, url: string, image: { __typename?: 'UploadFileEntityResponse', data?: Maybe<{ __typename?: 'UploadFileEntity', attributes?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> }> } } | { __typename: 'ComponentMenuProductListLink', name: string, productList?: Maybe<{ __typename?: 'ProductListEntityResponse', data?: Maybe<{ __typename?: 'ProductListEntity', attributes?: Maybe<{ __typename?: 'ProductList', handle: string }> }> }> } | { __typename: 'ComponentMenuSubmenu', name: string } | { __typename: 'Error' }>> }> }> }> } | { __typename: 'Error' }>> }> }> };

export type MenuPropsFragment = { __typename?: 'Menu', items: Array<Maybe<{ __typename: 'ComponentMenuLink', name: string, url: string, description?: Maybe<string> } | { __typename: 'ComponentMenuLinkWithImage', name: string, url: string, image: { __typename?: 'UploadFileEntityResponse', data?: Maybe<{ __typename?: 'UploadFileEntity', attributes?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> }> } } | { __typename: 'ComponentMenuProductListLink', name: string, productList?: Maybe<{ __typename?: 'ProductListEntityResponse', data?: Maybe<{ __typename?: 'ProductListEntity', attributes?: Maybe<{ __typename?: 'ProductList', handle: string }> }> }> } | { __typename: 'ComponentMenuSubmenu', name: string, submenu?: Maybe<{ __typename?: 'MenuEntityResponse', data?: Maybe<{ __typename?: 'MenuEntity', attributes?: Maybe<{ __typename?: 'Menu', items: Array<Maybe<{ __typename: 'ComponentMenuLink', name: string, url: string, description?: Maybe<string> } | { __typename: 'ComponentMenuLinkWithImage', name: string, url: string, image: { __typename?: 'UploadFileEntityResponse', data?: Maybe<{ __typename?: 'UploadFileEntity', attributes?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> }> } } | { __typename: 'ComponentMenuProductListLink', name: string, productList?: Maybe<{ __typename?: 'ProductListEntityResponse', data?: Maybe<{ __typename?: 'ProductListEntity', attributes?: Maybe<{ __typename?: 'ProductList', handle: string }> }> }> } | { __typename: 'ComponentMenuSubmenu', name: string } | { __typename: 'Error' }>> }> }> }> } | { __typename: 'Error' }>> };

export const MenuPropsFragmentDoc = `
    fragment MenuProps on Menu {
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
    ${MenuPropsFragmentDoc}`;
export const LayoutPropsFragmentDoc = `
    fragment LayoutProps on Query {
  stores {
    data {
      attributes {
        code
        name
        url
        currency
      }
    }
  }
  currentStore: stores(filters: $currentStoreFilters) {
    data {
      attributes {
        shopifySettings {
          storefrontDomain
          storefrontAccessToken
        }
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
          facebook
          instagram
          youtube
          repairOrg
        }
      }
    }
  }
}
    ${MenuEntityResponsePropsFragmentDoc}`;
export const GetProductListPageDataDocument = `
    query getProductListPageData($productListFilters: ProductListFiltersInput, $currentStoreFilters: StoreFiltersInput) {
  ...LayoutProps
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
  productLists(pagination: {limit: 1}, filters: $productListFilters) {
    data {
      id
      attributes {
        handle
        title
        tagline
        description
        metaDescription
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
              title
              handle
              parent {
                data {
                  attributes {
                    title
                    handle
                    parent {
                      data {
                        attributes {
                          title
                          handle
                          parent {
                            data {
                              attributes {
                                title
                                handle
                                parent {
                                  data {
                                    attributes {
                                      title
                                      handle
                                      parent {
                                        data {
                                          attributes {
                                            title
                                            handle
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
        children {
          data {
            attributes {
              handle
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
                  title
                  description
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
                  handle
                  title
                  description
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
    ${LayoutPropsFragmentDoc}`;
export type Requester<C= {}> = <R, V>(doc: string, vars?: V, options?: C) => Promise<R>
export function getSdk<C>(requester: Requester<C>) {
  return {
    getProductListPageData(variables?: GetProductListPageDataQueryVariables, options?: C): Promise<GetProductListPageDataQuery> {
      return requester<GetProductListPageDataQuery, GetProductListPageDataQueryVariables>(GetProductListPageDataDocument, variables, options);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;