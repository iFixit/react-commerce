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
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `Long` scalar type represents 52-bit integers */
  Long: any;
  /** Input type for dynamic zone items of Menu */
  MenuItemsDynamicZoneInput: any;
  /** Input type for dynamic zone sections of ProductList */
  ProductListSectionsDynamicZoneInput: any;
  /** A time string with format: HH:mm:ss.SSS */
  Time: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AdminUser = {
  __typename?: 'AdminUser';
  firstname: Scalars['String'];
  id: Scalars['ID'];
  lastname: Scalars['String'];
  username?: Maybe<Scalars['String']>;
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
  inputPlaceholder?: Maybe<Scalars['String']>;
  subtitle: Scalars['String'];
  title: Scalars['String'];
};

export type ComponentMenuLink = {
  __typename?: 'ComponentMenuLink';
  id: Scalars['ID'];
  name: Scalars['String'];
  url: Scalars['String'];
};

export type ComponentMenuLinkInput = {
  name: Scalars['String'];
  url: Scalars['String'];
};

export type ComponentMenuLinkWithImage = {
  __typename?: 'ComponentMenuLinkWithImage';
  id: Scalars['ID'];
  image?: Maybe<UploadFile>;
  name: Scalars['String'];
  url: Scalars['String'];
};

export type ComponentMenuLinkWithImageInput = {
  image?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  url: Scalars['String'];
};

export type ComponentMenuProductListLink = {
  __typename?: 'ComponentMenuProductListLink';
  id: Scalars['ID'];
  name: Scalars['String'];
  productList?: Maybe<ProductList>;
};

export type ComponentMenuProductListLinkInput = {
  name: Scalars['String'];
  productList?: Maybe<Scalars['ID']>;
};

export type ComponentMenuSubmenu = {
  __typename?: 'ComponentMenuSubmenu';
  id: Scalars['ID'];
  name: Scalars['String'];
  submenu?: Maybe<Menu>;
};

export type ComponentMenuSubmenuInput = {
  name: Scalars['String'];
  submenu?: Maybe<Scalars['ID']>;
};

export type ComponentProductListBanner = {
  __typename?: 'ComponentProductListBanner';
  callToActionLabel: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['ID'];
  title: Scalars['String'];
  url: Scalars['String'];
};

export type ComponentProductListBannerInput = {
  callToActionLabel: Scalars['String'];
  description: Scalars['String'];
  title: Scalars['String'];
  url: Scalars['String'];
};

export type ComponentProductListFeaturedProductList = {
  __typename?: 'ComponentProductListFeaturedProductList';
  id: Scalars['ID'];
  productList?: Maybe<ProductList>;
};

export type ComponentProductListFeaturedProductListInput = {
  productList?: Maybe<Scalars['ID']>;
};

export type ComponentProductListLinkedProductListSet = {
  __typename?: 'ComponentProductListLinkedProductListSet';
  id: Scalars['ID'];
  productLists?: Maybe<Array<Maybe<ProductList>>>;
  title: Scalars['String'];
};


export type ComponentProductListLinkedProductListSetProductListsArgs = {
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type ComponentProductListLinkedProductListSetInput = {
  productLists?: Maybe<Array<Maybe<Scalars['ID']>>>;
  title: Scalars['String'];
};

export type ComponentProductListRelatedPostInput = {
  tags?: Maybe<Scalars['String']>;
};

export type ComponentProductListRelatedPosts = {
  __typename?: 'ComponentProductListRelatedPosts';
  id: Scalars['ID'];
  tags?: Maybe<Scalars['String']>;
};

export type ComponentStoreFooter = {
  __typename?: 'ComponentStoreFooter';
  bottomMenu?: Maybe<Menu>;
  id: Scalars['ID'];
  menu1?: Maybe<Menu>;
  menu2?: Maybe<Menu>;
  partners?: Maybe<Menu>;
};

export type ComponentStoreFooterInput = {
  bottomMenu?: Maybe<Scalars['ID']>;
  menu1?: Maybe<Scalars['ID']>;
  menu2?: Maybe<Scalars['ID']>;
  partners?: Maybe<Scalars['ID']>;
};

export type ComponentStoreShopifySettingInput = {
  storefrontAccessToken: Scalars['String'];
  storefrontDomain: Scalars['String'];
};

export type ComponentStoreShopifySettings = {
  __typename?: 'ComponentStoreShopifySettings';
  id: Scalars['ID'];
  storefrontAccessToken: Scalars['String'];
  storefrontDomain: Scalars['String'];
};

export type ComponentStoreSocialMediaAccountInput = {
  facebook?: Maybe<Scalars['String']>;
  instagram?: Maybe<Scalars['String']>;
  repairOrg?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
  youtube?: Maybe<Scalars['String']>;
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

export enum Enum_Store_Currency {
  Aud = 'AUD',
  Cad = 'CAD',
  Eur = 'EUR',
  Gbp = 'GBP',
  Usd = 'USD'
}

export type FileInfoInput = {
  alternativeText?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type FileInput = {
  alternativeText?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  created_by?: Maybe<Scalars['ID']>;
  ext?: Maybe<Scalars['String']>;
  formats?: Maybe<Scalars['JSON']>;
  hash: Scalars['String'];
  height?: Maybe<Scalars['Int']>;
  mime: Scalars['String'];
  name: Scalars['String'];
  previewUrl?: Maybe<Scalars['String']>;
  provider: Scalars['String'];
  provider_metadata?: Maybe<Scalars['JSON']>;
  related?: Maybe<Array<Maybe<Scalars['ID']>>>;
  size: Scalars['Float'];
  updated_by?: Maybe<Scalars['ID']>;
  url: Scalars['String'];
  width?: Maybe<Scalars['Int']>;
};

export type Global = {
  __typename?: 'Global';
  created_at: Scalars['DateTime'];
  id: Scalars['ID'];
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<Global>>>;
  newsletterForm?: Maybe<ComponentGlobalNewsletterForm>;
  published_at?: Maybe<Scalars['DateTime']>;
  updated_at: Scalars['DateTime'];
};


export type GlobalLocalizationsArgs = {
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type GlobalInput = {
  created_by?: Maybe<Scalars['ID']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  newsletterForm: ComponentGlobalNewsletterFormInput;
  published_at?: Maybe<Scalars['DateTime']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type I18NLocale = {
  __typename?: 'I18NLocale';
  code?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  updated_at: Scalars['DateTime'];
};

export type InputId = {
  id: Scalars['ID'];
};

export type LocaleInput = {
  code?: Maybe<Scalars['String']>;
  created_by?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type Menu = {
  __typename?: 'Menu';
  created_at: Scalars['DateTime'];
  id: Scalars['ID'];
  items: Array<Maybe<MenuItemsDynamicZone>>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<Menu>>>;
  published_at?: Maybe<Scalars['DateTime']>;
  title: Scalars['String'];
  updated_at: Scalars['DateTime'];
};


export type MenuLocalizationsArgs = {
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type MenuAggregator = {
  __typename?: 'MenuAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type MenuConnection = {
  __typename?: 'MenuConnection';
  aggregate?: Maybe<MenuAggregator>;
  groupBy?: Maybe<MenuGroupBy>;
  values?: Maybe<Array<Maybe<Menu>>>;
};

export type MenuConnectionCreated_At = {
  __typename?: 'MenuConnectionCreated_at';
  connection?: Maybe<MenuConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type MenuConnectionId = {
  __typename?: 'MenuConnectionId';
  connection?: Maybe<MenuConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type MenuConnectionLocale = {
  __typename?: 'MenuConnectionLocale';
  connection?: Maybe<MenuConnection>;
  key?: Maybe<Scalars['String']>;
};

export type MenuConnectionPublished_At = {
  __typename?: 'MenuConnectionPublished_at';
  connection?: Maybe<MenuConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type MenuConnectionTitle = {
  __typename?: 'MenuConnectionTitle';
  connection?: Maybe<MenuConnection>;
  key?: Maybe<Scalars['String']>;
};

export type MenuConnectionUpdated_At = {
  __typename?: 'MenuConnectionUpdated_at';
  connection?: Maybe<MenuConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type MenuGroupBy = {
  __typename?: 'MenuGroupBy';
  created_at?: Maybe<Array<Maybe<MenuConnectionCreated_At>>>;
  id?: Maybe<Array<Maybe<MenuConnectionId>>>;
  locale?: Maybe<Array<Maybe<MenuConnectionLocale>>>;
  published_at?: Maybe<Array<Maybe<MenuConnectionPublished_At>>>;
  title?: Maybe<Array<Maybe<MenuConnectionTitle>>>;
  updated_at?: Maybe<Array<Maybe<MenuConnectionUpdated_At>>>;
};

export type MenuInput = {
  created_by?: Maybe<Scalars['ID']>;
  items: Array<Scalars['MenuItemsDynamicZoneInput']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  published_at?: Maybe<Scalars['DateTime']>;
  title: Scalars['String'];
  updated_by?: Maybe<Scalars['ID']>;
};

export type MenuItemsDynamicZone = ComponentMenuLink | ComponentMenuLinkWithImage | ComponentMenuProductListLink | ComponentMenuSubmenu;

export type Morph = ComponentGlobalNewsletterForm | ComponentMenuLink | ComponentMenuLinkWithImage | ComponentMenuProductListLink | ComponentMenuSubmenu | ComponentProductListBanner | ComponentProductListFeaturedProductList | ComponentProductListLinkedProductListSet | ComponentProductListRelatedPosts | ComponentStoreFooter | ComponentStoreShopifySettings | ComponentStoreSocialMediaAccounts | Global | I18NLocale | Menu | MenuAggregator | MenuConnection | MenuConnectionCreated_At | MenuConnectionId | MenuConnectionLocale | MenuConnectionPublished_At | MenuConnectionTitle | MenuConnectionUpdated_At | MenuGroupBy | ProductList | ProductListAggregator | ProductListAggregatorAvg | ProductListAggregatorMax | ProductListAggregatorMin | ProductListAggregatorSum | ProductListConnection | ProductListConnectionCreated_At | ProductListConnectionDescription | ProductListConnectionDeviceTitle | ProductListConnectionExcludeFromHierarchyDisplay | ProductListConnectionFilters | ProductListConnectionHandle | ProductListConnectionId | ProductListConnectionImage | ProductListConnectionLegacyPageId | ProductListConnectionLocale | ProductListConnectionMetaDescription | ProductListConnectionParent | ProductListConnectionPublished_At | ProductListConnectionTagline | ProductListConnectionTitle | ProductListConnectionUpdated_At | ProductListGroupBy | Store | StoreAggregator | StoreConnection | StoreConnectionCode | StoreConnectionCreated_At | StoreConnectionCurrency | StoreConnectionFooter | StoreConnectionId | StoreConnectionName | StoreConnectionPublished_At | StoreConnectionShopifySettings | StoreConnectionSocialMediaAccounts | StoreConnectionUpdated_At | StoreConnectionUrl | StoreGroupBy | UploadFile | UploadFileAggregator | UploadFileAggregatorAvg | UploadFileAggregatorMax | UploadFileAggregatorMin | UploadFileAggregatorSum | UploadFileConnection | UploadFileConnectionAlternativeText | UploadFileConnectionCaption | UploadFileConnectionCreated_At | UploadFileConnectionExt | UploadFileConnectionFormats | UploadFileConnectionHash | UploadFileConnectionHeight | UploadFileConnectionId | UploadFileConnectionMime | UploadFileConnectionName | UploadFileConnectionPreviewUrl | UploadFileConnectionProvider | UploadFileConnectionProvider_Metadata | UploadFileConnectionSize | UploadFileConnectionUpdated_At | UploadFileConnectionUrl | UploadFileConnectionWidth | UploadFileGroupBy | UserPermissionsPasswordPayload | UsersPermissionsLoginPayload | UsersPermissionsMe | UsersPermissionsMeRole | UsersPermissionsPermission | UsersPermissionsRole | UsersPermissionsRoleAggregator | UsersPermissionsRoleConnection | UsersPermissionsRoleConnectionDescription | UsersPermissionsRoleConnectionId | UsersPermissionsRoleConnectionName | UsersPermissionsRoleConnectionType | UsersPermissionsRoleGroupBy | UsersPermissionsUser | UsersPermissionsUserAggregator | UsersPermissionsUserConnection | UsersPermissionsUserConnectionBlocked | UsersPermissionsUserConnectionConfirmed | UsersPermissionsUserConnectionCreated_At | UsersPermissionsUserConnectionEmail | UsersPermissionsUserConnectionId | UsersPermissionsUserConnectionProvider | UsersPermissionsUserConnectionRole | UsersPermissionsUserConnectionUpdated_At | UsersPermissionsUserConnectionUsername | UsersPermissionsUserGroupBy | CreateMenuPayload | CreateProductListPayload | CreateRolePayload | CreateStorePayload | CreateUserPayload | DeleteFilePayload | DeleteGlobalPayload | DeleteMenuPayload | DeleteProductListPayload | DeleteRolePayload | DeleteStorePayload | DeleteUserPayload | UpdateGlobalPayload | UpdateMenuPayload | UpdateProductListPayload | UpdateRolePayload | UpdateStorePayload | UpdateUserPayload;

export type Mutation = {
  __typename?: 'Mutation';
  createGlobalLocalization: Global;
  createMenu?: Maybe<CreateMenuPayload>;
  createMenuLocalization: Menu;
  createProductList?: Maybe<CreateProductListPayload>;
  createProductListLocalization: ProductList;
  /** Create a new role */
  createRole?: Maybe<CreateRolePayload>;
  createStore?: Maybe<CreateStorePayload>;
  /** Create a new user */
  createUser?: Maybe<CreateUserPayload>;
  /** Delete one file */
  deleteFile?: Maybe<DeleteFilePayload>;
  deleteGlobal?: Maybe<DeleteGlobalPayload>;
  deleteMenu?: Maybe<DeleteMenuPayload>;
  deleteProductList?: Maybe<DeleteProductListPayload>;
  /** Delete an existing role */
  deleteRole?: Maybe<DeleteRolePayload>;
  deleteStore?: Maybe<DeleteStorePayload>;
  /** Delete an existing user */
  deleteUser?: Maybe<DeleteUserPayload>;
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
  forgotPassword?: Maybe<UserPermissionsPasswordPayload>;
  login: UsersPermissionsLoginPayload;
  multipleUpload: Array<Maybe<UploadFile>>;
  register: UsersPermissionsLoginPayload;
  resetPassword?: Maybe<UsersPermissionsLoginPayload>;
  updateFileInfo: UploadFile;
  updateGlobal?: Maybe<UpdateGlobalPayload>;
  updateMenu?: Maybe<UpdateMenuPayload>;
  updateProductList?: Maybe<UpdateProductListPayload>;
  /** Update an existing role */
  updateRole?: Maybe<UpdateRolePayload>;
  updateStore?: Maybe<UpdateStorePayload>;
  /** Update an existing user */
  updateUser?: Maybe<UpdateUserPayload>;
  upload: UploadFile;
};


export type MutationCreateGlobalLocalizationArgs = {
  input: UpdateGlobalInput;
};


export type MutationCreateMenuArgs = {
  input?: Maybe<CreateMenuInput>;
};


export type MutationCreateMenuLocalizationArgs = {
  input: UpdateMenuInput;
};


export type MutationCreateProductListArgs = {
  input?: Maybe<CreateProductListInput>;
};


export type MutationCreateProductListLocalizationArgs = {
  input: UpdateProductListInput;
};


export type MutationCreateRoleArgs = {
  input?: Maybe<CreateRoleInput>;
};


export type MutationCreateStoreArgs = {
  input?: Maybe<CreateStoreInput>;
};


export type MutationCreateUserArgs = {
  input?: Maybe<CreateUserInput>;
};


export type MutationDeleteFileArgs = {
  input?: Maybe<DeleteFileInput>;
};


export type MutationDeleteGlobalArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type MutationDeleteMenuArgs = {
  input?: Maybe<DeleteMenuInput>;
};


export type MutationDeleteProductListArgs = {
  input?: Maybe<DeleteProductListInput>;
};


export type MutationDeleteRoleArgs = {
  input?: Maybe<DeleteRoleInput>;
};


export type MutationDeleteStoreArgs = {
  input?: Maybe<DeleteStoreInput>;
};


export type MutationDeleteUserArgs = {
  input?: Maybe<DeleteUserInput>;
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
  source?: Maybe<Scalars['String']>;
};


export type MutationRegisterArgs = {
  input: UsersPermissionsRegisterInput;
};


export type MutationResetPasswordArgs = {
  code: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
};


export type MutationUpdateFileInfoArgs = {
  id: Scalars['ID'];
  info: FileInfoInput;
};


export type MutationUpdateGlobalArgs = {
  input?: Maybe<UpdateGlobalInput>;
  locale?: Maybe<Scalars['String']>;
};


export type MutationUpdateMenuArgs = {
  input?: Maybe<UpdateMenuInput>;
};


export type MutationUpdateProductListArgs = {
  input?: Maybe<UpdateProductListInput>;
};


export type MutationUpdateRoleArgs = {
  input?: Maybe<UpdateRoleInput>;
};


export type MutationUpdateStoreArgs = {
  input?: Maybe<UpdateStoreInput>;
};


export type MutationUpdateUserArgs = {
  input?: Maybe<UpdateUserInput>;
};


export type MutationUploadArgs = {
  field?: Maybe<Scalars['String']>;
  file: Scalars['Upload'];
  info?: Maybe<FileInfoInput>;
  ref?: Maybe<Scalars['String']>;
  refId?: Maybe<Scalars['ID']>;
  source?: Maybe<Scalars['String']>;
};

export type ProductList = {
  __typename?: 'ProductList';
  children?: Maybe<Array<Maybe<ProductList>>>;
  created_at: Scalars['DateTime'];
  description: Scalars['String'];
  deviceTitle?: Maybe<Scalars['String']>;
  excludeFromHierarchyDisplay: Scalars['Boolean'];
  filters?: Maybe<Scalars['String']>;
  handle: Scalars['String'];
  id: Scalars['ID'];
  image?: Maybe<UploadFile>;
  legacyPageId?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<ProductList>>>;
  metaDescription?: Maybe<Scalars['String']>;
  parent?: Maybe<ProductList>;
  published_at?: Maybe<Scalars['DateTime']>;
  sections: Array<Maybe<ProductListSectionsDynamicZone>>;
  tagline?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updated_at: Scalars['DateTime'];
};


export type ProductListChildrenArgs = {
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type ProductListLocalizationsArgs = {
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type ProductListAggregator = {
  __typename?: 'ProductListAggregator';
  avg?: Maybe<ProductListAggregatorAvg>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<ProductListAggregatorMax>;
  min?: Maybe<ProductListAggregatorMin>;
  sum?: Maybe<ProductListAggregatorSum>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type ProductListAggregatorAvg = {
  __typename?: 'ProductListAggregatorAvg';
  legacyPageId?: Maybe<Scalars['Float']>;
};

export type ProductListAggregatorMax = {
  __typename?: 'ProductListAggregatorMax';
  legacyPageId?: Maybe<Scalars['Float']>;
};

export type ProductListAggregatorMin = {
  __typename?: 'ProductListAggregatorMin';
  legacyPageId?: Maybe<Scalars['Float']>;
};

export type ProductListAggregatorSum = {
  __typename?: 'ProductListAggregatorSum';
  legacyPageId?: Maybe<Scalars['Float']>;
};

export type ProductListConnection = {
  __typename?: 'ProductListConnection';
  aggregate?: Maybe<ProductListAggregator>;
  groupBy?: Maybe<ProductListGroupBy>;
  values?: Maybe<Array<Maybe<ProductList>>>;
};

export type ProductListConnectionCreated_At = {
  __typename?: 'ProductListConnectionCreated_at';
  connection?: Maybe<ProductListConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type ProductListConnectionDescription = {
  __typename?: 'ProductListConnectionDescription';
  connection?: Maybe<ProductListConnection>;
  key?: Maybe<Scalars['String']>;
};

export type ProductListConnectionDeviceTitle = {
  __typename?: 'ProductListConnectionDeviceTitle';
  connection?: Maybe<ProductListConnection>;
  key?: Maybe<Scalars['String']>;
};

export type ProductListConnectionExcludeFromHierarchyDisplay = {
  __typename?: 'ProductListConnectionExcludeFromHierarchyDisplay';
  connection?: Maybe<ProductListConnection>;
  key?: Maybe<Scalars['Boolean']>;
};

export type ProductListConnectionFilters = {
  __typename?: 'ProductListConnectionFilters';
  connection?: Maybe<ProductListConnection>;
  key?: Maybe<Scalars['String']>;
};

export type ProductListConnectionHandle = {
  __typename?: 'ProductListConnectionHandle';
  connection?: Maybe<ProductListConnection>;
  key?: Maybe<Scalars['String']>;
};

export type ProductListConnectionId = {
  __typename?: 'ProductListConnectionId';
  connection?: Maybe<ProductListConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type ProductListConnectionImage = {
  __typename?: 'ProductListConnectionImage';
  connection?: Maybe<ProductListConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type ProductListConnectionLegacyPageId = {
  __typename?: 'ProductListConnectionLegacyPageId';
  connection?: Maybe<ProductListConnection>;
  key?: Maybe<Scalars['Int']>;
};

export type ProductListConnectionLocale = {
  __typename?: 'ProductListConnectionLocale';
  connection?: Maybe<ProductListConnection>;
  key?: Maybe<Scalars['String']>;
};

export type ProductListConnectionMetaDescription = {
  __typename?: 'ProductListConnectionMetaDescription';
  connection?: Maybe<ProductListConnection>;
  key?: Maybe<Scalars['String']>;
};

export type ProductListConnectionParent = {
  __typename?: 'ProductListConnectionParent';
  connection?: Maybe<ProductListConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type ProductListConnectionPublished_At = {
  __typename?: 'ProductListConnectionPublished_at';
  connection?: Maybe<ProductListConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type ProductListConnectionTagline = {
  __typename?: 'ProductListConnectionTagline';
  connection?: Maybe<ProductListConnection>;
  key?: Maybe<Scalars['String']>;
};

export type ProductListConnectionTitle = {
  __typename?: 'ProductListConnectionTitle';
  connection?: Maybe<ProductListConnection>;
  key?: Maybe<Scalars['String']>;
};

export type ProductListConnectionUpdated_At = {
  __typename?: 'ProductListConnectionUpdated_at';
  connection?: Maybe<ProductListConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type ProductListGroupBy = {
  __typename?: 'ProductListGroupBy';
  created_at?: Maybe<Array<Maybe<ProductListConnectionCreated_At>>>;
  description?: Maybe<Array<Maybe<ProductListConnectionDescription>>>;
  deviceTitle?: Maybe<Array<Maybe<ProductListConnectionDeviceTitle>>>;
  excludeFromHierarchyDisplay?: Maybe<Array<Maybe<ProductListConnectionExcludeFromHierarchyDisplay>>>;
  filters?: Maybe<Array<Maybe<ProductListConnectionFilters>>>;
  handle?: Maybe<Array<Maybe<ProductListConnectionHandle>>>;
  id?: Maybe<Array<Maybe<ProductListConnectionId>>>;
  image?: Maybe<Array<Maybe<ProductListConnectionImage>>>;
  legacyPageId?: Maybe<Array<Maybe<ProductListConnectionLegacyPageId>>>;
  locale?: Maybe<Array<Maybe<ProductListConnectionLocale>>>;
  metaDescription?: Maybe<Array<Maybe<ProductListConnectionMetaDescription>>>;
  parent?: Maybe<Array<Maybe<ProductListConnectionParent>>>;
  published_at?: Maybe<Array<Maybe<ProductListConnectionPublished_At>>>;
  tagline?: Maybe<Array<Maybe<ProductListConnectionTagline>>>;
  title?: Maybe<Array<Maybe<ProductListConnectionTitle>>>;
  updated_at?: Maybe<Array<Maybe<ProductListConnectionUpdated_At>>>;
};

export type ProductListInput = {
  children?: Maybe<Array<Maybe<Scalars['ID']>>>;
  created_by?: Maybe<Scalars['ID']>;
  description: Scalars['String'];
  deviceTitle?: Maybe<Scalars['String']>;
  excludeFromHierarchyDisplay?: Maybe<Scalars['Boolean']>;
  filters?: Maybe<Scalars['String']>;
  handle: Scalars['String'];
  image?: Maybe<Scalars['ID']>;
  legacyPageId?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  metaDescription?: Maybe<Scalars['String']>;
  parent?: Maybe<Scalars['ID']>;
  published_at?: Maybe<Scalars['DateTime']>;
  sections: Array<Scalars['ProductListSectionsDynamicZoneInput']>;
  tagline?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updated_by?: Maybe<Scalars['ID']>;
};

export type ProductListSectionsDynamicZone = ComponentProductListBanner | ComponentProductListFeaturedProductList | ComponentProductListLinkedProductListSet | ComponentProductListRelatedPosts;

export enum PublicationState {
  Live = 'LIVE',
  Preview = 'PREVIEW'
}

export type Query = {
  __typename?: 'Query';
  files?: Maybe<Array<Maybe<UploadFile>>>;
  filesConnection?: Maybe<UploadFileConnection>;
  global?: Maybe<Global>;
  me?: Maybe<UsersPermissionsMe>;
  menu?: Maybe<Menu>;
  menus?: Maybe<Array<Maybe<Menu>>>;
  menusConnection?: Maybe<MenuConnection>;
  productList?: Maybe<ProductList>;
  productLists?: Maybe<Array<Maybe<ProductList>>>;
  productListsConnection?: Maybe<ProductListConnection>;
  role?: Maybe<UsersPermissionsRole>;
  /** Retrieve all the existing roles. You can't apply filters on this query. */
  roles?: Maybe<Array<Maybe<UsersPermissionsRole>>>;
  rolesConnection?: Maybe<UsersPermissionsRoleConnection>;
  store?: Maybe<Store>;
  stores?: Maybe<Array<Maybe<Store>>>;
  storesConnection?: Maybe<StoreConnection>;
  user?: Maybe<UsersPermissionsUser>;
  users?: Maybe<Array<Maybe<UsersPermissionsUser>>>;
  usersConnection?: Maybe<UsersPermissionsUserConnection>;
};


export type QueryFilesArgs = {
  limit?: Maybe<Scalars['Int']>;
  publicationState?: Maybe<PublicationState>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryFilesConnectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryGlobalArgs = {
  locale?: Maybe<Scalars['String']>;
  publicationState?: Maybe<PublicationState>;
};


export type QueryMenuArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryMenusArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  publicationState?: Maybe<PublicationState>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryMenusConnectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryProductListArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryProductListsArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  publicationState?: Maybe<PublicationState>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryProductListsConnectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryRoleArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryRolesArgs = {
  limit?: Maybe<Scalars['Int']>;
  publicationState?: Maybe<PublicationState>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryRolesConnectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryStoreArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryStoresArgs = {
  limit?: Maybe<Scalars['Int']>;
  publicationState?: Maybe<PublicationState>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryStoresConnectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryUsersArgs = {
  limit?: Maybe<Scalars['Int']>;
  publicationState?: Maybe<PublicationState>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryUsersConnectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type RoleInput = {
  created_by?: Maybe<Scalars['ID']>;
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  permissions?: Maybe<Array<Maybe<Scalars['ID']>>>;
  type?: Maybe<Scalars['String']>;
  updated_by?: Maybe<Scalars['ID']>;
  users?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type Store = {
  __typename?: 'Store';
  code: Scalars['String'];
  created_at: Scalars['DateTime'];
  currency: Enum_Store_Currency;
  footer?: Maybe<ComponentStoreFooter>;
  id: Scalars['ID'];
  name: Scalars['String'];
  published_at?: Maybe<Scalars['DateTime']>;
  shopifySettings?: Maybe<ComponentStoreShopifySettings>;
  socialMediaAccounts?: Maybe<ComponentStoreSocialMediaAccounts>;
  updated_at: Scalars['DateTime'];
  url: Scalars['String'];
};

export type StoreAggregator = {
  __typename?: 'StoreAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type StoreConnection = {
  __typename?: 'StoreConnection';
  aggregate?: Maybe<StoreAggregator>;
  groupBy?: Maybe<StoreGroupBy>;
  values?: Maybe<Array<Maybe<Store>>>;
};

export type StoreConnectionCode = {
  __typename?: 'StoreConnectionCode';
  connection?: Maybe<StoreConnection>;
  key?: Maybe<Scalars['String']>;
};

export type StoreConnectionCreated_At = {
  __typename?: 'StoreConnectionCreated_at';
  connection?: Maybe<StoreConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type StoreConnectionCurrency = {
  __typename?: 'StoreConnectionCurrency';
  connection?: Maybe<StoreConnection>;
  key?: Maybe<Scalars['String']>;
};

export type StoreConnectionFooter = {
  __typename?: 'StoreConnectionFooter';
  connection?: Maybe<StoreConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type StoreConnectionId = {
  __typename?: 'StoreConnectionId';
  connection?: Maybe<StoreConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type StoreConnectionName = {
  __typename?: 'StoreConnectionName';
  connection?: Maybe<StoreConnection>;
  key?: Maybe<Scalars['String']>;
};

export type StoreConnectionPublished_At = {
  __typename?: 'StoreConnectionPublished_at';
  connection?: Maybe<StoreConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type StoreConnectionShopifySettings = {
  __typename?: 'StoreConnectionShopifySettings';
  connection?: Maybe<StoreConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type StoreConnectionSocialMediaAccounts = {
  __typename?: 'StoreConnectionSocialMediaAccounts';
  connection?: Maybe<StoreConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type StoreConnectionUpdated_At = {
  __typename?: 'StoreConnectionUpdated_at';
  connection?: Maybe<StoreConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type StoreConnectionUrl = {
  __typename?: 'StoreConnectionUrl';
  connection?: Maybe<StoreConnection>;
  key?: Maybe<Scalars['String']>;
};

export type StoreGroupBy = {
  __typename?: 'StoreGroupBy';
  code?: Maybe<Array<Maybe<StoreConnectionCode>>>;
  created_at?: Maybe<Array<Maybe<StoreConnectionCreated_At>>>;
  currency?: Maybe<Array<Maybe<StoreConnectionCurrency>>>;
  footer?: Maybe<Array<Maybe<StoreConnectionFooter>>>;
  id?: Maybe<Array<Maybe<StoreConnectionId>>>;
  name?: Maybe<Array<Maybe<StoreConnectionName>>>;
  published_at?: Maybe<Array<Maybe<StoreConnectionPublished_At>>>;
  shopifySettings?: Maybe<Array<Maybe<StoreConnectionShopifySettings>>>;
  socialMediaAccounts?: Maybe<Array<Maybe<StoreConnectionSocialMediaAccounts>>>;
  updated_at?: Maybe<Array<Maybe<StoreConnectionUpdated_At>>>;
  url?: Maybe<Array<Maybe<StoreConnectionUrl>>>;
};

export type StoreInput = {
  code: Scalars['String'];
  created_by?: Maybe<Scalars['ID']>;
  currency: Enum_Store_Currency;
  footer: ComponentStoreFooterInput;
  name: Scalars['String'];
  published_at?: Maybe<Scalars['DateTime']>;
  shopifySettings: ComponentStoreShopifySettingInput;
  socialMediaAccounts: ComponentStoreSocialMediaAccountInput;
  updated_by?: Maybe<Scalars['ID']>;
  url: Scalars['String'];
};

export type UploadFile = {
  __typename?: 'UploadFile';
  alternativeText?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  ext?: Maybe<Scalars['String']>;
  formats?: Maybe<Scalars['JSON']>;
  hash: Scalars['String'];
  height?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  mime: Scalars['String'];
  name: Scalars['String'];
  previewUrl?: Maybe<Scalars['String']>;
  provider: Scalars['String'];
  provider_metadata?: Maybe<Scalars['JSON']>;
  related?: Maybe<Array<Maybe<Morph>>>;
  size: Scalars['Float'];
  updated_at: Scalars['DateTime'];
  url: Scalars['String'];
  width?: Maybe<Scalars['Int']>;
};


export type UploadFileRelatedArgs = {
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type UploadFileAggregator = {
  __typename?: 'UploadFileAggregator';
  avg?: Maybe<UploadFileAggregatorAvg>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<UploadFileAggregatorMax>;
  min?: Maybe<UploadFileAggregatorMin>;
  sum?: Maybe<UploadFileAggregatorSum>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type UploadFileAggregatorAvg = {
  __typename?: 'UploadFileAggregatorAvg';
  height?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
};

export type UploadFileAggregatorMax = {
  __typename?: 'UploadFileAggregatorMax';
  height?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
};

export type UploadFileAggregatorMin = {
  __typename?: 'UploadFileAggregatorMin';
  height?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
};

export type UploadFileAggregatorSum = {
  __typename?: 'UploadFileAggregatorSum';
  height?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
};

export type UploadFileConnection = {
  __typename?: 'UploadFileConnection';
  aggregate?: Maybe<UploadFileAggregator>;
  groupBy?: Maybe<UploadFileGroupBy>;
  values?: Maybe<Array<Maybe<UploadFile>>>;
};

export type UploadFileConnectionAlternativeText = {
  __typename?: 'UploadFileConnectionAlternativeText';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionCaption = {
  __typename?: 'UploadFileConnectionCaption';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionCreated_At = {
  __typename?: 'UploadFileConnectionCreated_at';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type UploadFileConnectionExt = {
  __typename?: 'UploadFileConnectionExt';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionFormats = {
  __typename?: 'UploadFileConnectionFormats';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['JSON']>;
};

export type UploadFileConnectionHash = {
  __typename?: 'UploadFileConnectionHash';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionHeight = {
  __typename?: 'UploadFileConnectionHeight';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['Int']>;
};

export type UploadFileConnectionId = {
  __typename?: 'UploadFileConnectionId';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type UploadFileConnectionMime = {
  __typename?: 'UploadFileConnectionMime';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionName = {
  __typename?: 'UploadFileConnectionName';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionPreviewUrl = {
  __typename?: 'UploadFileConnectionPreviewUrl';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionProvider = {
  __typename?: 'UploadFileConnectionProvider';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionProvider_Metadata = {
  __typename?: 'UploadFileConnectionProvider_metadata';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['JSON']>;
};

export type UploadFileConnectionSize = {
  __typename?: 'UploadFileConnectionSize';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['Float']>;
};

export type UploadFileConnectionUpdated_At = {
  __typename?: 'UploadFileConnectionUpdated_at';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type UploadFileConnectionUrl = {
  __typename?: 'UploadFileConnectionUrl';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionWidth = {
  __typename?: 'UploadFileConnectionWidth';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['Int']>;
};

export type UploadFileGroupBy = {
  __typename?: 'UploadFileGroupBy';
  alternativeText?: Maybe<Array<Maybe<UploadFileConnectionAlternativeText>>>;
  caption?: Maybe<Array<Maybe<UploadFileConnectionCaption>>>;
  created_at?: Maybe<Array<Maybe<UploadFileConnectionCreated_At>>>;
  ext?: Maybe<Array<Maybe<UploadFileConnectionExt>>>;
  formats?: Maybe<Array<Maybe<UploadFileConnectionFormats>>>;
  hash?: Maybe<Array<Maybe<UploadFileConnectionHash>>>;
  height?: Maybe<Array<Maybe<UploadFileConnectionHeight>>>;
  id?: Maybe<Array<Maybe<UploadFileConnectionId>>>;
  mime?: Maybe<Array<Maybe<UploadFileConnectionMime>>>;
  name?: Maybe<Array<Maybe<UploadFileConnectionName>>>;
  previewUrl?: Maybe<Array<Maybe<UploadFileConnectionPreviewUrl>>>;
  provider?: Maybe<Array<Maybe<UploadFileConnectionProvider>>>;
  provider_metadata?: Maybe<Array<Maybe<UploadFileConnectionProvider_Metadata>>>;
  size?: Maybe<Array<Maybe<UploadFileConnectionSize>>>;
  updated_at?: Maybe<Array<Maybe<UploadFileConnectionUpdated_At>>>;
  url?: Maybe<Array<Maybe<UploadFileConnectionUrl>>>;
  width?: Maybe<Array<Maybe<UploadFileConnectionWidth>>>;
};

export type UserInput = {
  blocked?: Maybe<Scalars['Boolean']>;
  confirmationToken?: Maybe<Scalars['String']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  created_by?: Maybe<Scalars['ID']>;
  email: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  provider?: Maybe<Scalars['String']>;
  resetPasswordToken?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
  username: Scalars['String'];
};

export type UserPermissionsPasswordPayload = {
  __typename?: 'UserPermissionsPasswordPayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsLoginInput = {
  identifier: Scalars['String'];
  password: Scalars['String'];
  provider?: Maybe<Scalars['String']>;
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
  email: Scalars['String'];
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

export type UsersPermissionsPermission = {
  __typename?: 'UsersPermissionsPermission';
  action: Scalars['String'];
  controller: Scalars['String'];
  enabled: Scalars['Boolean'];
  id: Scalars['ID'];
  policy?: Maybe<Scalars['String']>;
  role?: Maybe<UsersPermissionsRole>;
  type: Scalars['String'];
};

export type UsersPermissionsRegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UsersPermissionsRole = {
  __typename?: 'UsersPermissionsRole';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  permissions?: Maybe<Array<Maybe<UsersPermissionsPermission>>>;
  type?: Maybe<Scalars['String']>;
  users?: Maybe<Array<Maybe<UsersPermissionsUser>>>;
};


export type UsersPermissionsRolePermissionsArgs = {
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type UsersPermissionsRoleUsersArgs = {
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type UsersPermissionsRoleAggregator = {
  __typename?: 'UsersPermissionsRoleAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type UsersPermissionsRoleConnection = {
  __typename?: 'UsersPermissionsRoleConnection';
  aggregate?: Maybe<UsersPermissionsRoleAggregator>;
  groupBy?: Maybe<UsersPermissionsRoleGroupBy>;
  values?: Maybe<Array<Maybe<UsersPermissionsRole>>>;
};

export type UsersPermissionsRoleConnectionDescription = {
  __typename?: 'UsersPermissionsRoleConnectionDescription';
  connection?: Maybe<UsersPermissionsRoleConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UsersPermissionsRoleConnectionId = {
  __typename?: 'UsersPermissionsRoleConnectionId';
  connection?: Maybe<UsersPermissionsRoleConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsRoleConnectionName = {
  __typename?: 'UsersPermissionsRoleConnectionName';
  connection?: Maybe<UsersPermissionsRoleConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UsersPermissionsRoleConnectionType = {
  __typename?: 'UsersPermissionsRoleConnectionType';
  connection?: Maybe<UsersPermissionsRoleConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UsersPermissionsRoleGroupBy = {
  __typename?: 'UsersPermissionsRoleGroupBy';
  description?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionDescription>>>;
  id?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionId>>>;
  name?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionName>>>;
  type?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionType>>>;
};

export type UsersPermissionsUser = {
  __typename?: 'UsersPermissionsUser';
  blocked?: Maybe<Scalars['Boolean']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  created_at: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['ID'];
  provider?: Maybe<Scalars['String']>;
  role?: Maybe<UsersPermissionsRole>;
  updated_at: Scalars['DateTime'];
  username: Scalars['String'];
};

export type UsersPermissionsUserAggregator = {
  __typename?: 'UsersPermissionsUserAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type UsersPermissionsUserConnection = {
  __typename?: 'UsersPermissionsUserConnection';
  aggregate?: Maybe<UsersPermissionsUserAggregator>;
  groupBy?: Maybe<UsersPermissionsUserGroupBy>;
  values?: Maybe<Array<Maybe<UsersPermissionsUser>>>;
};

export type UsersPermissionsUserConnectionBlocked = {
  __typename?: 'UsersPermissionsUserConnectionBlocked';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['Boolean']>;
};

export type UsersPermissionsUserConnectionConfirmed = {
  __typename?: 'UsersPermissionsUserConnectionConfirmed';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['Boolean']>;
};

export type UsersPermissionsUserConnectionCreated_At = {
  __typename?: 'UsersPermissionsUserConnectionCreated_at';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type UsersPermissionsUserConnectionEmail = {
  __typename?: 'UsersPermissionsUserConnectionEmail';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UsersPermissionsUserConnectionId = {
  __typename?: 'UsersPermissionsUserConnectionId';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsUserConnectionProvider = {
  __typename?: 'UsersPermissionsUserConnectionProvider';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UsersPermissionsUserConnectionRole = {
  __typename?: 'UsersPermissionsUserConnectionRole';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsUserConnectionUpdated_At = {
  __typename?: 'UsersPermissionsUserConnectionUpdated_at';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type UsersPermissionsUserConnectionUsername = {
  __typename?: 'UsersPermissionsUserConnectionUsername';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UsersPermissionsUserGroupBy = {
  __typename?: 'UsersPermissionsUserGroupBy';
  blocked?: Maybe<Array<Maybe<UsersPermissionsUserConnectionBlocked>>>;
  confirmed?: Maybe<Array<Maybe<UsersPermissionsUserConnectionConfirmed>>>;
  created_at?: Maybe<Array<Maybe<UsersPermissionsUserConnectionCreated_At>>>;
  email?: Maybe<Array<Maybe<UsersPermissionsUserConnectionEmail>>>;
  id?: Maybe<Array<Maybe<UsersPermissionsUserConnectionId>>>;
  provider?: Maybe<Array<Maybe<UsersPermissionsUserConnectionProvider>>>;
  role?: Maybe<Array<Maybe<UsersPermissionsUserConnectionRole>>>;
  updated_at?: Maybe<Array<Maybe<UsersPermissionsUserConnectionUpdated_At>>>;
  username?: Maybe<Array<Maybe<UsersPermissionsUserConnectionUsername>>>;
};

export type CreateMenuInput = {
  data?: Maybe<MenuInput>;
};

export type CreateMenuPayload = {
  __typename?: 'createMenuPayload';
  menu?: Maybe<Menu>;
};

export type CreateProductListInput = {
  data?: Maybe<ProductListInput>;
};

export type CreateProductListPayload = {
  __typename?: 'createProductListPayload';
  productList?: Maybe<ProductList>;
};

export type CreateRoleInput = {
  data?: Maybe<RoleInput>;
};

export type CreateRolePayload = {
  __typename?: 'createRolePayload';
  role?: Maybe<UsersPermissionsRole>;
};

export type CreateStoreInput = {
  data?: Maybe<StoreInput>;
};

export type CreateStorePayload = {
  __typename?: 'createStorePayload';
  store?: Maybe<Store>;
};

export type CreateUserInput = {
  data?: Maybe<UserInput>;
};

export type CreateUserPayload = {
  __typename?: 'createUserPayload';
  user?: Maybe<UsersPermissionsUser>;
};

export type DeleteFileInput = {
  where?: Maybe<InputId>;
};

export type DeleteFilePayload = {
  __typename?: 'deleteFilePayload';
  file?: Maybe<UploadFile>;
};

export type DeleteGlobalPayload = {
  __typename?: 'deleteGlobalPayload';
  global?: Maybe<Global>;
};

export type DeleteMenuInput = {
  where?: Maybe<InputId>;
};

export type DeleteMenuPayload = {
  __typename?: 'deleteMenuPayload';
  menu?: Maybe<Menu>;
};

export type DeleteProductListInput = {
  where?: Maybe<InputId>;
};

export type DeleteProductListPayload = {
  __typename?: 'deleteProductListPayload';
  productList?: Maybe<ProductList>;
};

export type DeleteRoleInput = {
  where?: Maybe<InputId>;
};

export type DeleteRolePayload = {
  __typename?: 'deleteRolePayload';
  role?: Maybe<UsersPermissionsRole>;
};

export type DeleteStoreInput = {
  where?: Maybe<InputId>;
};

export type DeleteStorePayload = {
  __typename?: 'deleteStorePayload';
  store?: Maybe<Store>;
};

export type DeleteUserInput = {
  where?: Maybe<InputId>;
};

export type DeleteUserPayload = {
  __typename?: 'deleteUserPayload';
  user?: Maybe<UsersPermissionsUser>;
};

export type EditComponentGlobalNewsletterFormInput = {
  callToActionButtonTitle?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  inputPlaceholder?: Maybe<Scalars['String']>;
  subtitle?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type EditComponentMenuLinkInput = {
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type EditComponentMenuLinkWithImageInput = {
  id?: Maybe<Scalars['ID']>;
  image?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type EditComponentMenuProductListLinkInput = {
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  productList?: Maybe<Scalars['ID']>;
};

export type EditComponentMenuSubmenuInput = {
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  submenu?: Maybe<Scalars['ID']>;
};

export type EditComponentProductListBannerInput = {
  callToActionLabel?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type EditComponentProductListFeaturedProductListInput = {
  id?: Maybe<Scalars['ID']>;
  productList?: Maybe<Scalars['ID']>;
};

export type EditComponentProductListLinkedProductListSetInput = {
  id?: Maybe<Scalars['ID']>;
  productLists?: Maybe<Array<Maybe<Scalars['ID']>>>;
  title?: Maybe<Scalars['String']>;
};

export type EditComponentProductListRelatedPostInput = {
  id?: Maybe<Scalars['ID']>;
  tags?: Maybe<Scalars['String']>;
};

export type EditComponentStoreFooterInput = {
  bottomMenu?: Maybe<Scalars['ID']>;
  id?: Maybe<Scalars['ID']>;
  menu1?: Maybe<Scalars['ID']>;
  menu2?: Maybe<Scalars['ID']>;
  partners?: Maybe<Scalars['ID']>;
};

export type EditComponentStoreShopifySettingInput = {
  id?: Maybe<Scalars['ID']>;
  storefrontAccessToken?: Maybe<Scalars['String']>;
  storefrontDomain?: Maybe<Scalars['String']>;
};

export type EditComponentStoreSocialMediaAccountInput = {
  facebook?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  instagram?: Maybe<Scalars['String']>;
  repairOrg?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
  youtube?: Maybe<Scalars['String']>;
};

export type EditFileInput = {
  alternativeText?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  created_by?: Maybe<Scalars['ID']>;
  ext?: Maybe<Scalars['String']>;
  formats?: Maybe<Scalars['JSON']>;
  hash?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Int']>;
  mime?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  previewUrl?: Maybe<Scalars['String']>;
  provider?: Maybe<Scalars['String']>;
  provider_metadata?: Maybe<Scalars['JSON']>;
  related?: Maybe<Array<Maybe<Scalars['ID']>>>;
  size?: Maybe<Scalars['Float']>;
  updated_by?: Maybe<Scalars['ID']>;
  url?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
};

export type EditGlobalInput = {
  created_by?: Maybe<Scalars['ID']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  newsletterForm?: Maybe<EditComponentGlobalNewsletterFormInput>;
  published_at?: Maybe<Scalars['DateTime']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditLocaleInput = {
  code?: Maybe<Scalars['String']>;
  created_by?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditMenuInput = {
  created_by?: Maybe<Scalars['ID']>;
  items: Array<Scalars['MenuItemsDynamicZoneInput']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  published_at?: Maybe<Scalars['DateTime']>;
  title?: Maybe<Scalars['String']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditProductListInput = {
  children?: Maybe<Array<Maybe<Scalars['ID']>>>;
  created_by?: Maybe<Scalars['ID']>;
  description?: Maybe<Scalars['String']>;
  deviceTitle?: Maybe<Scalars['String']>;
  excludeFromHierarchyDisplay?: Maybe<Scalars['Boolean']>;
  filters?: Maybe<Scalars['String']>;
  handle?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['ID']>;
  legacyPageId?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  metaDescription?: Maybe<Scalars['String']>;
  parent?: Maybe<Scalars['ID']>;
  published_at?: Maybe<Scalars['DateTime']>;
  sections: Array<Scalars['ProductListSectionsDynamicZoneInput']>;
  tagline?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditRoleInput = {
  created_by?: Maybe<Scalars['ID']>;
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  permissions?: Maybe<Array<Maybe<Scalars['ID']>>>;
  type?: Maybe<Scalars['String']>;
  updated_by?: Maybe<Scalars['ID']>;
  users?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type EditStoreInput = {
  code?: Maybe<Scalars['String']>;
  created_by?: Maybe<Scalars['ID']>;
  currency?: Maybe<Enum_Store_Currency>;
  footer?: Maybe<EditComponentStoreFooterInput>;
  name?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  shopifySettings?: Maybe<EditComponentStoreShopifySettingInput>;
  socialMediaAccounts?: Maybe<EditComponentStoreSocialMediaAccountInput>;
  updated_by?: Maybe<Scalars['ID']>;
  url?: Maybe<Scalars['String']>;
};

export type EditUserInput = {
  blocked?: Maybe<Scalars['Boolean']>;
  confirmationToken?: Maybe<Scalars['String']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  created_by?: Maybe<Scalars['ID']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  provider?: Maybe<Scalars['String']>;
  resetPasswordToken?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
  username?: Maybe<Scalars['String']>;
};

export type UpdateGlobalInput = {
  data?: Maybe<EditGlobalInput>;
};

export type UpdateGlobalPayload = {
  __typename?: 'updateGlobalPayload';
  global?: Maybe<Global>;
};

export type UpdateMenuInput = {
  data?: Maybe<EditMenuInput>;
  where?: Maybe<InputId>;
};

export type UpdateMenuPayload = {
  __typename?: 'updateMenuPayload';
  menu?: Maybe<Menu>;
};

export type UpdateProductListInput = {
  data?: Maybe<EditProductListInput>;
  where?: Maybe<InputId>;
};

export type UpdateProductListPayload = {
  __typename?: 'updateProductListPayload';
  productList?: Maybe<ProductList>;
};

export type UpdateRoleInput = {
  data?: Maybe<EditRoleInput>;
  where?: Maybe<InputId>;
};

export type UpdateRolePayload = {
  __typename?: 'updateRolePayload';
  role?: Maybe<UsersPermissionsRole>;
};

export type UpdateStoreInput = {
  data?: Maybe<EditStoreInput>;
  where?: Maybe<InputId>;
};

export type UpdateStorePayload = {
  __typename?: 'updateStorePayload';
  store?: Maybe<Store>;
};

export type UpdateUserInput = {
  data?: Maybe<EditUserInput>;
  where?: Maybe<InputId>;
};

export type UpdateUserPayload = {
  __typename?: 'updateUserPayload';
  user?: Maybe<UsersPermissionsUser>;
};

export type GetCollectionPageDataQueryVariables = Exact<{
  whereCollection?: Maybe<Scalars['JSON']>;
  whereStoreSettings?: Maybe<Scalars['JSON']>;
}>;


export type GetCollectionPageDataQuery = { __typename?: 'Query', global?: Maybe<{ __typename?: 'Global', newsletterForm?: Maybe<{ __typename?: 'ComponentGlobalNewsletterForm', title: string, subtitle: string, inputPlaceholder: string, callToActionButtonTitle: string }> }>, productLists?: Maybe<Array<Maybe<{ __typename?: 'ProductList', id: string, handle: string, title: string, tagline?: Maybe<string>, description: string, metaDescription?: Maybe<string>, filters?: Maybe<string>, image?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }>, parent?: Maybe<{ __typename?: 'ProductList', title: string, handle: string, parent?: Maybe<{ __typename?: 'ProductList', title: string, handle: string, parent?: Maybe<{ __typename?: 'ProductList', title: string, handle: string, parent?: Maybe<{ __typename?: 'ProductList', title: string, handle: string, parent?: Maybe<{ __typename?: 'ProductList', title: string, handle: string, parent?: Maybe<{ __typename?: 'ProductList', title: string, handle: string }> }> }> }> }> }>, children?: Maybe<Array<Maybe<{ __typename?: 'ProductList', handle: string, title: string, image?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> }>>>, sections: Array<Maybe<{ __typename: 'ComponentProductListBanner', id: string, title: string, description: string, callToActionLabel: string, url: string } | { __typename: 'ComponentProductListFeaturedProductList', id: string, productList?: Maybe<{ __typename?: 'ProductList', handle: string, title: string, description: string, image?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> }> } | { __typename: 'ComponentProductListLinkedProductListSet', id: string, title: string, productLists?: Maybe<Array<Maybe<{ __typename?: 'ProductList', handle: string, title: string, description: string, image?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> }>>> } | { __typename: 'ComponentProductListRelatedPosts', id: string, tags?: Maybe<string> }>> }>>>, stores?: Maybe<Array<Maybe<{ __typename?: 'Store', code: string, name: string, url: string, currency: Enum_Store_Currency }>>>, currentStore?: Maybe<Array<Maybe<{ __typename?: 'Store', shopifySettings?: Maybe<{ __typename?: 'ComponentStoreShopifySettings', storefrontDomain: string, storefrontAccessToken: string }>, footer?: Maybe<{ __typename?: 'ComponentStoreFooter', menu1?: Maybe<{ __typename?: 'Menu', items: Array<Maybe<{ __typename: 'ComponentMenuLink', name: string, url: string } | { __typename: 'ComponentMenuLinkWithImage', name: string, url: string, image?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> } | { __typename: 'ComponentMenuProductListLink', name: string, productList?: Maybe<{ __typename?: 'ProductList', handle: string }> } | { __typename: 'ComponentMenuSubmenu' }>> }>, menu2?: Maybe<{ __typename?: 'Menu', items: Array<Maybe<{ __typename: 'ComponentMenuLink', name: string, url: string } | { __typename: 'ComponentMenuLinkWithImage', name: string, url: string, image?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> } | { __typename: 'ComponentMenuProductListLink', name: string, productList?: Maybe<{ __typename?: 'ProductList', handle: string }> } | { __typename: 'ComponentMenuSubmenu' }>> }>, partners?: Maybe<{ __typename?: 'Menu', items: Array<Maybe<{ __typename: 'ComponentMenuLink', name: string, url: string } | { __typename: 'ComponentMenuLinkWithImage', name: string, url: string, image?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> } | { __typename: 'ComponentMenuProductListLink', name: string, productList?: Maybe<{ __typename?: 'ProductList', handle: string }> } | { __typename: 'ComponentMenuSubmenu' }>> }>, bottomMenu?: Maybe<{ __typename?: 'Menu', items: Array<Maybe<{ __typename: 'ComponentMenuLink', name: string, url: string } | { __typename: 'ComponentMenuLinkWithImage', name: string, url: string, image?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> } | { __typename: 'ComponentMenuProductListLink', name: string, productList?: Maybe<{ __typename?: 'ProductList', handle: string }> } | { __typename: 'ComponentMenuSubmenu' }>> }> }>, socialMediaAccounts?: Maybe<{ __typename?: 'ComponentStoreSocialMediaAccounts', twitter?: Maybe<string>, facebook?: Maybe<string>, instagram?: Maybe<string>, youtube?: Maybe<string>, repairOrg?: Maybe<string> }> }>>> };

export type LayoutPropsFragment = { __typename?: 'Query', stores?: Maybe<Array<Maybe<{ __typename?: 'Store', code: string, name: string, url: string, currency: Enum_Store_Currency }>>>, currentStore?: Maybe<Array<Maybe<{ __typename?: 'Store', shopifySettings?: Maybe<{ __typename?: 'ComponentStoreShopifySettings', storefrontDomain: string, storefrontAccessToken: string }>, footer?: Maybe<{ __typename?: 'ComponentStoreFooter', menu1?: Maybe<{ __typename?: 'Menu', items: Array<Maybe<{ __typename: 'ComponentMenuLink', name: string, url: string } | { __typename: 'ComponentMenuLinkWithImage', name: string, url: string, image?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> } | { __typename: 'ComponentMenuProductListLink', name: string, productList?: Maybe<{ __typename?: 'ProductList', handle: string }> } | { __typename: 'ComponentMenuSubmenu' }>> }>, menu2?: Maybe<{ __typename?: 'Menu', items: Array<Maybe<{ __typename: 'ComponentMenuLink', name: string, url: string } | { __typename: 'ComponentMenuLinkWithImage', name: string, url: string, image?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> } | { __typename: 'ComponentMenuProductListLink', name: string, productList?: Maybe<{ __typename?: 'ProductList', handle: string }> } | { __typename: 'ComponentMenuSubmenu' }>> }>, partners?: Maybe<{ __typename?: 'Menu', items: Array<Maybe<{ __typename: 'ComponentMenuLink', name: string, url: string } | { __typename: 'ComponentMenuLinkWithImage', name: string, url: string, image?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> } | { __typename: 'ComponentMenuProductListLink', name: string, productList?: Maybe<{ __typename?: 'ProductList', handle: string }> } | { __typename: 'ComponentMenuSubmenu' }>> }>, bottomMenu?: Maybe<{ __typename?: 'Menu', items: Array<Maybe<{ __typename: 'ComponentMenuLink', name: string, url: string } | { __typename: 'ComponentMenuLinkWithImage', name: string, url: string, image?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> } | { __typename: 'ComponentMenuProductListLink', name: string, productList?: Maybe<{ __typename?: 'ProductList', handle: string }> } | { __typename: 'ComponentMenuSubmenu' }>> }> }>, socialMediaAccounts?: Maybe<{ __typename?: 'ComponentStoreSocialMediaAccounts', twitter?: Maybe<string>, facebook?: Maybe<string>, instagram?: Maybe<string>, youtube?: Maybe<string>, repairOrg?: Maybe<string> }> }>>> };

export type MenuPropsFragment = { __typename?: 'Menu', items: Array<Maybe<{ __typename: 'ComponentMenuLink', name: string, url: string } | { __typename: 'ComponentMenuLinkWithImage', name: string, url: string, image?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> } | { __typename: 'ComponentMenuProductListLink', name: string, productList?: Maybe<{ __typename?: 'ProductList', handle: string }> } | { __typename: 'ComponentMenuSubmenu' }>> };

export const MenuPropsFragmentDoc = `
    fragment MenuProps on Menu {
  items {
    __typename
    ... on ComponentMenuLink {
      name
      url
    }
    ... on ComponentMenuProductListLink {
      name
      productList {
        handle
      }
    }
    ... on ComponentMenuLinkWithImage {
      name
      url
      image {
        alternativeText
        url
        formats
      }
    }
  }
}
    `;
export const LayoutPropsFragmentDoc = `
    fragment LayoutProps on Query {
  stores {
    code
    name
    url
    currency
  }
  currentStore: stores(where: $whereStoreSettings) {
    shopifySettings {
      storefrontDomain
      storefrontAccessToken
    }
    footer {
      menu1 {
        ...MenuProps
      }
      menu2 {
        ...MenuProps
      }
      partners {
        ...MenuProps
      }
      bottomMenu {
        ...MenuProps
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
    ${MenuPropsFragmentDoc}`;
export const GetCollectionPageDataDocument = `
    query getCollectionPageData($whereCollection: JSON, $whereStoreSettings: JSON) {
  ...LayoutProps
  global {
    newsletterForm {
      title
      subtitle
      inputPlaceholder
      callToActionButtonTitle
    }
  }
  productLists(limit: 1, where: $whereCollection) {
    id
    handle
    title
    tagline
    description
    metaDescription
    filters
    image {
      alternativeText
      url
      formats
    }
    parent {
      title
      handle
      parent {
        title
        handle
        parent {
          title
          handle
          parent {
            title
            handle
            parent {
              title
              handle
              parent {
                title
                handle
              }
            }
          }
        }
      }
    }
    children {
      handle
      title
      image {
        alternativeText
        url
        formats
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
          handle
          title
          description
          image {
            alternativeText
            url
            formats
          }
        }
      }
      ... on ComponentProductListLinkedProductListSet {
        id
        title
        productLists(limit: 3) {
          handle
          title
          description
          image {
            alternativeText
            url
            formats
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
    getCollectionPageData(variables?: GetCollectionPageDataQueryVariables, options?: C): Promise<GetCollectionPageDataQuery> {
      return requester<GetCollectionPageDataQuery, GetCollectionPageDataQueryVariables>(GetCollectionPageDataDocument, variables, options);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;