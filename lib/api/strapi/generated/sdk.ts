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
  /** Input type for dynamic zone sections of Collection */
  CollectionSectionsDynamicZoneInput: any;
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

export type BottomContext = {
  __typename?: 'BottomContext';
  created_at: Scalars['DateTime'];
  device_summary?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<BottomContext>>>;
  published_at?: Maybe<Scalars['DateTime']>;
  subheading?: Maybe<Scalars['String']>;
  updated_at: Scalars['DateTime'];
};


export type BottomContextLocalizationsArgs = {
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type BottomContextAggregator = {
  __typename?: 'BottomContextAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type BottomContextConnection = {
  __typename?: 'BottomContextConnection';
  aggregate?: Maybe<BottomContextAggregator>;
  groupBy?: Maybe<BottomContextGroupBy>;
  values?: Maybe<Array<Maybe<BottomContext>>>;
};

export type BottomContextConnectionCreated_At = {
  __typename?: 'BottomContextConnectionCreated_at';
  connection?: Maybe<BottomContextConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type BottomContextConnectionDevice_Summary = {
  __typename?: 'BottomContextConnectionDevice_summary';
  connection?: Maybe<BottomContextConnection>;
  key?: Maybe<Scalars['String']>;
};

export type BottomContextConnectionId = {
  __typename?: 'BottomContextConnectionId';
  connection?: Maybe<BottomContextConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type BottomContextConnectionLocale = {
  __typename?: 'BottomContextConnectionLocale';
  connection?: Maybe<BottomContextConnection>;
  key?: Maybe<Scalars['String']>;
};

export type BottomContextConnectionPublished_At = {
  __typename?: 'BottomContextConnectionPublished_at';
  connection?: Maybe<BottomContextConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type BottomContextConnectionSubheading = {
  __typename?: 'BottomContextConnectionSubheading';
  connection?: Maybe<BottomContextConnection>;
  key?: Maybe<Scalars['String']>;
};

export type BottomContextConnectionUpdated_At = {
  __typename?: 'BottomContextConnectionUpdated_at';
  connection?: Maybe<BottomContextConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type BottomContextGroupBy = {
  __typename?: 'BottomContextGroupBy';
  created_at?: Maybe<Array<Maybe<BottomContextConnectionCreated_At>>>;
  device_summary?: Maybe<Array<Maybe<BottomContextConnectionDevice_Summary>>>;
  id?: Maybe<Array<Maybe<BottomContextConnectionId>>>;
  locale?: Maybe<Array<Maybe<BottomContextConnectionLocale>>>;
  published_at?: Maybe<Array<Maybe<BottomContextConnectionPublished_At>>>;
  subheading?: Maybe<Array<Maybe<BottomContextConnectionSubheading>>>;
  updated_at?: Maybe<Array<Maybe<BottomContextConnectionUpdated_At>>>;
};

export type BottomContextInput = {
  created_by?: Maybe<Scalars['ID']>;
  device_summary?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  published_at?: Maybe<Scalars['DateTime']>;
  subheading?: Maybe<Scalars['String']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type Collection = {
  __typename?: 'Collection';
  children?: Maybe<Array<Maybe<Collection>>>;
  created_at: Scalars['DateTime'];
  description: Scalars['String'];
  filters?: Maybe<Scalars['String']>;
  handle: Scalars['String'];
  id: Scalars['ID'];
  image?: Maybe<UploadFile>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<Collection>>>;
  metaDescription?: Maybe<Scalars['String']>;
  parent?: Maybe<Collection>;
  published_at?: Maybe<Scalars['DateTime']>;
  sections: Array<Maybe<CollectionSectionsDynamicZone>>;
  tagline?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updated_at: Scalars['DateTime'];
};


export type CollectionChildrenArgs = {
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type CollectionLocalizationsArgs = {
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type CollectionAggregator = {
  __typename?: 'CollectionAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type CollectionConnection = {
  __typename?: 'CollectionConnection';
  aggregate?: Maybe<CollectionAggregator>;
  groupBy?: Maybe<CollectionGroupBy>;
  values?: Maybe<Array<Maybe<Collection>>>;
};

export type CollectionConnectionCreated_At = {
  __typename?: 'CollectionConnectionCreated_at';
  connection?: Maybe<CollectionConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type CollectionConnectionDescription = {
  __typename?: 'CollectionConnectionDescription';
  connection?: Maybe<CollectionConnection>;
  key?: Maybe<Scalars['String']>;
};

export type CollectionConnectionFilters = {
  __typename?: 'CollectionConnectionFilters';
  connection?: Maybe<CollectionConnection>;
  key?: Maybe<Scalars['String']>;
};

export type CollectionConnectionHandle = {
  __typename?: 'CollectionConnectionHandle';
  connection?: Maybe<CollectionConnection>;
  key?: Maybe<Scalars['String']>;
};

export type CollectionConnectionId = {
  __typename?: 'CollectionConnectionId';
  connection?: Maybe<CollectionConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type CollectionConnectionImage = {
  __typename?: 'CollectionConnectionImage';
  connection?: Maybe<CollectionConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type CollectionConnectionLocale = {
  __typename?: 'CollectionConnectionLocale';
  connection?: Maybe<CollectionConnection>;
  key?: Maybe<Scalars['String']>;
};

export type CollectionConnectionMetaDescription = {
  __typename?: 'CollectionConnectionMetaDescription';
  connection?: Maybe<CollectionConnection>;
  key?: Maybe<Scalars['String']>;
};

export type CollectionConnectionParent = {
  __typename?: 'CollectionConnectionParent';
  connection?: Maybe<CollectionConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type CollectionConnectionPublished_At = {
  __typename?: 'CollectionConnectionPublished_at';
  connection?: Maybe<CollectionConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type CollectionConnectionTagline = {
  __typename?: 'CollectionConnectionTagline';
  connection?: Maybe<CollectionConnection>;
  key?: Maybe<Scalars['String']>;
};

export type CollectionConnectionTitle = {
  __typename?: 'CollectionConnectionTitle';
  connection?: Maybe<CollectionConnection>;
  key?: Maybe<Scalars['String']>;
};

export type CollectionConnectionUpdated_At = {
  __typename?: 'CollectionConnectionUpdated_at';
  connection?: Maybe<CollectionConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type CollectionGroupBy = {
  __typename?: 'CollectionGroupBy';
  created_at?: Maybe<Array<Maybe<CollectionConnectionCreated_At>>>;
  description?: Maybe<Array<Maybe<CollectionConnectionDescription>>>;
  filters?: Maybe<Array<Maybe<CollectionConnectionFilters>>>;
  handle?: Maybe<Array<Maybe<CollectionConnectionHandle>>>;
  id?: Maybe<Array<Maybe<CollectionConnectionId>>>;
  image?: Maybe<Array<Maybe<CollectionConnectionImage>>>;
  locale?: Maybe<Array<Maybe<CollectionConnectionLocale>>>;
  metaDescription?: Maybe<Array<Maybe<CollectionConnectionMetaDescription>>>;
  parent?: Maybe<Array<Maybe<CollectionConnectionParent>>>;
  published_at?: Maybe<Array<Maybe<CollectionConnectionPublished_At>>>;
  tagline?: Maybe<Array<Maybe<CollectionConnectionTagline>>>;
  title?: Maybe<Array<Maybe<CollectionConnectionTitle>>>;
  updated_at?: Maybe<Array<Maybe<CollectionConnectionUpdated_At>>>;
};

export type CollectionInput = {
  children?: Maybe<Array<Maybe<Scalars['ID']>>>;
  created_by?: Maybe<Scalars['ID']>;
  description: Scalars['String'];
  filters?: Maybe<Scalars['String']>;
  handle: Scalars['String'];
  image?: Maybe<Scalars['ID']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  metaDescription?: Maybe<Scalars['String']>;
  parent?: Maybe<Scalars['ID']>;
  published_at?: Maybe<Scalars['DateTime']>;
  sections: Array<Scalars['CollectionSectionsDynamicZoneInput']>;
  tagline?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updated_by?: Maybe<Scalars['ID']>;
};

export type CollectionSectionsDynamicZone = ComponentCollectionBanner | ComponentCollectionFeaturedCollection | ComponentCollectionFeaturedSubcollections | ComponentCollectionNewsletterForm | ComponentCollectionRelatedPosts;

export type ComponentCollectionBanner = {
  __typename?: 'ComponentCollectionBanner';
  callToActionLabel: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['ID'];
  title: Scalars['String'];
  url: Scalars['String'];
};

export type ComponentCollectionBannerInput = {
  callToActionLabel: Scalars['String'];
  description: Scalars['String'];
  title: Scalars['String'];
  url?: Maybe<Scalars['String']>;
};

export type ComponentCollectionFeaturedCollection = {
  __typename?: 'ComponentCollectionFeaturedCollection';
  featuredCollection?: Maybe<Collection>;
  id: Scalars['ID'];
};

export type ComponentCollectionFeaturedCollectionInput = {
  featuredCollection?: Maybe<Scalars['ID']>;
};

export type ComponentCollectionFeaturedSubcollectionInput = {
  collections?: Maybe<Array<Maybe<Scalars['ID']>>>;
  title: Scalars['String'];
};

export type ComponentCollectionFeaturedSubcollections = {
  __typename?: 'ComponentCollectionFeaturedSubcollections';
  collections?: Maybe<Array<Maybe<Collection>>>;
  id: Scalars['ID'];
  title: Scalars['String'];
};


export type ComponentCollectionFeaturedSubcollectionsCollectionsArgs = {
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type ComponentCollectionNewsletterForm = {
  __typename?: 'ComponentCollectionNewsletterForm';
  callToActionLabel: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['ID'];
  inputPlaceholder?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

export type ComponentCollectionNewsletterFormInput = {
  callToActionLabel?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  inputPlaceholder?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

export type ComponentCollectionRelatedPostInput = {
  tags?: Maybe<Scalars['String']>;
};

export type ComponentCollectionRelatedPosts = {
  __typename?: 'ComponentCollectionRelatedPosts';
  id: Scalars['ID'];
  tags?: Maybe<Scalars['String']>;
};

export type ComponentMenuCollectionLink = {
  __typename?: 'ComponentMenuCollectionLink';
  id: Scalars['ID'];
  linkedCollection?: Maybe<Collection>;
  name: Scalars['String'];
};

export type ComponentMenuCollectionLinkInput = {
  linkedCollection?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
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

export type ComponentSettingsFooter = {
  __typename?: 'ComponentSettingsFooter';
  bottomMenu?: Maybe<Menu>;
  id: Scalars['ID'];
  menu1?: Maybe<Menu>;
  menu2?: Maybe<Menu>;
  partners?: Maybe<Menu>;
};

export type ComponentSettingsFooterInput = {
  bottomMenu?: Maybe<Scalars['ID']>;
  menu1?: Maybe<Scalars['ID']>;
  menu2?: Maybe<Scalars['ID']>;
  partners?: Maybe<Scalars['ID']>;
};

export type ComponentSettingsPartner = {
  __typename?: 'ComponentSettingsPartner';
  id: Scalars['ID'];
  logo?: Maybe<UploadFile>;
  name: Scalars['String'];
  url: Scalars['String'];
};

export type ComponentSettingsPartnerInput = {
  logo?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  url: Scalars['String'];
};

export type ComponentSettingsSocial = {
  __typename?: 'ComponentSettingsSocial';
  facebook?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  instagram?: Maybe<Scalars['String']>;
  repairOrg?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
  youtube?: Maybe<Scalars['String']>;
};

export type ComponentSettingsSocialInput = {
  facebook?: Maybe<Scalars['String']>;
  instagram?: Maybe<Scalars['String']>;
  repairOrg?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
  youtube?: Maybe<Scalars['String']>;
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

export type Device = {
  __typename?: 'Device';
  canonical_override?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  device: Scalars['String'];
  device_summary?: Maybe<BottomContext>;
  faq_section?: Maybe<FaqSection>;
  id: Scalars['ID'];
  image?: Maybe<Array<Maybe<UploadFile>>>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<Device>>>;
  meta_description?: Maybe<Scalars['String']>;
  part_type?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  subheading?: Maybe<Scalars['String']>;
  summary?: Maybe<Scalars['String']>;
  updated_at: Scalars['DateTime'];
};


export type DeviceImageArgs = {
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type DeviceLocalizationsArgs = {
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type DeviceAggregator = {
  __typename?: 'DeviceAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type DeviceConnection = {
  __typename?: 'DeviceConnection';
  aggregate?: Maybe<DeviceAggregator>;
  groupBy?: Maybe<DeviceGroupBy>;
  values?: Maybe<Array<Maybe<Device>>>;
};

export type DeviceConnectionCanonical_Override = {
  __typename?: 'DeviceConnectionCanonical_override';
  connection?: Maybe<DeviceConnection>;
  key?: Maybe<Scalars['String']>;
};

export type DeviceConnectionCreated_At = {
  __typename?: 'DeviceConnectionCreated_at';
  connection?: Maybe<DeviceConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type DeviceConnectionDevice = {
  __typename?: 'DeviceConnectionDevice';
  connection?: Maybe<DeviceConnection>;
  key?: Maybe<Scalars['String']>;
};

export type DeviceConnectionDevice_Summary = {
  __typename?: 'DeviceConnectionDevice_summary';
  connection?: Maybe<DeviceConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type DeviceConnectionFaq_Section = {
  __typename?: 'DeviceConnectionFaq_section';
  connection?: Maybe<DeviceConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type DeviceConnectionId = {
  __typename?: 'DeviceConnectionId';
  connection?: Maybe<DeviceConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type DeviceConnectionLocale = {
  __typename?: 'DeviceConnectionLocale';
  connection?: Maybe<DeviceConnection>;
  key?: Maybe<Scalars['String']>;
};

export type DeviceConnectionMeta_Description = {
  __typename?: 'DeviceConnectionMeta_description';
  connection?: Maybe<DeviceConnection>;
  key?: Maybe<Scalars['String']>;
};

export type DeviceConnectionPart_Type = {
  __typename?: 'DeviceConnectionPart_type';
  connection?: Maybe<DeviceConnection>;
  key?: Maybe<Scalars['String']>;
};

export type DeviceConnectionPublished_At = {
  __typename?: 'DeviceConnectionPublished_at';
  connection?: Maybe<DeviceConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type DeviceConnectionSubheading = {
  __typename?: 'DeviceConnectionSubheading';
  connection?: Maybe<DeviceConnection>;
  key?: Maybe<Scalars['String']>;
};

export type DeviceConnectionSummary = {
  __typename?: 'DeviceConnectionSummary';
  connection?: Maybe<DeviceConnection>;
  key?: Maybe<Scalars['String']>;
};

export type DeviceConnectionUpdated_At = {
  __typename?: 'DeviceConnectionUpdated_at';
  connection?: Maybe<DeviceConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type DeviceGroupBy = {
  __typename?: 'DeviceGroupBy';
  canonical_override?: Maybe<Array<Maybe<DeviceConnectionCanonical_Override>>>;
  created_at?: Maybe<Array<Maybe<DeviceConnectionCreated_At>>>;
  device?: Maybe<Array<Maybe<DeviceConnectionDevice>>>;
  device_summary?: Maybe<Array<Maybe<DeviceConnectionDevice_Summary>>>;
  faq_section?: Maybe<Array<Maybe<DeviceConnectionFaq_Section>>>;
  id?: Maybe<Array<Maybe<DeviceConnectionId>>>;
  locale?: Maybe<Array<Maybe<DeviceConnectionLocale>>>;
  meta_description?: Maybe<Array<Maybe<DeviceConnectionMeta_Description>>>;
  part_type?: Maybe<Array<Maybe<DeviceConnectionPart_Type>>>;
  published_at?: Maybe<Array<Maybe<DeviceConnectionPublished_At>>>;
  subheading?: Maybe<Array<Maybe<DeviceConnectionSubheading>>>;
  summary?: Maybe<Array<Maybe<DeviceConnectionSummary>>>;
  updated_at?: Maybe<Array<Maybe<DeviceConnectionUpdated_At>>>;
};

export type DeviceHandle = {
  __typename?: 'DeviceHandle';
  created_at: Scalars['DateTime'];
  handle: Scalars['String'];
  id: Scalars['ID'];
  published_at?: Maybe<Scalars['DateTime']>;
  updated_at: Scalars['DateTime'];
};

export type DeviceHandleAggregator = {
  __typename?: 'DeviceHandleAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type DeviceHandleConnection = {
  __typename?: 'DeviceHandleConnection';
  aggregate?: Maybe<DeviceHandleAggregator>;
  groupBy?: Maybe<DeviceHandleGroupBy>;
  values?: Maybe<Array<Maybe<DeviceHandle>>>;
};

export type DeviceHandleConnectionCreated_At = {
  __typename?: 'DeviceHandleConnectionCreated_at';
  connection?: Maybe<DeviceHandleConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type DeviceHandleConnectionHandle = {
  __typename?: 'DeviceHandleConnectionHandle';
  connection?: Maybe<DeviceHandleConnection>;
  key?: Maybe<Scalars['String']>;
};

export type DeviceHandleConnectionId = {
  __typename?: 'DeviceHandleConnectionId';
  connection?: Maybe<DeviceHandleConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type DeviceHandleConnectionPublished_At = {
  __typename?: 'DeviceHandleConnectionPublished_at';
  connection?: Maybe<DeviceHandleConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type DeviceHandleConnectionUpdated_At = {
  __typename?: 'DeviceHandleConnectionUpdated_at';
  connection?: Maybe<DeviceHandleConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type DeviceHandleGroupBy = {
  __typename?: 'DeviceHandleGroupBy';
  created_at?: Maybe<Array<Maybe<DeviceHandleConnectionCreated_At>>>;
  handle?: Maybe<Array<Maybe<DeviceHandleConnectionHandle>>>;
  id?: Maybe<Array<Maybe<DeviceHandleConnectionId>>>;
  published_at?: Maybe<Array<Maybe<DeviceHandleConnectionPublished_At>>>;
  updated_at?: Maybe<Array<Maybe<DeviceHandleConnectionUpdated_At>>>;
};

export type DeviceHandleInput = {
  created_by?: Maybe<Scalars['ID']>;
  handle: Scalars['String'];
  published_at?: Maybe<Scalars['DateTime']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type DeviceInput = {
  canonical_override?: Maybe<Scalars['String']>;
  created_by?: Maybe<Scalars['ID']>;
  device: Scalars['String'];
  device_summary?: Maybe<Scalars['ID']>;
  faq_section?: Maybe<Scalars['ID']>;
  image?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  meta_description?: Maybe<Scalars['String']>;
  part_type?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  subheading?: Maybe<Scalars['String']>;
  summary?: Maybe<Scalars['String']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type Faq = {
  __typename?: 'Faq';
  Answer?: Maybe<Scalars['String']>;
  Question?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  id: Scalars['ID'];
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<Faq>>>;
  published_at?: Maybe<Scalars['DateTime']>;
  updated_at: Scalars['DateTime'];
};


export type FaqLocalizationsArgs = {
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type FaqAggregator = {
  __typename?: 'FaqAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type FaqConnection = {
  __typename?: 'FaqConnection';
  aggregate?: Maybe<FaqAggregator>;
  groupBy?: Maybe<FaqGroupBy>;
  values?: Maybe<Array<Maybe<Faq>>>;
};

export type FaqConnectionAnswer = {
  __typename?: 'FaqConnectionAnswer';
  connection?: Maybe<FaqConnection>;
  key?: Maybe<Scalars['String']>;
};

export type FaqConnectionCreated_At = {
  __typename?: 'FaqConnectionCreated_at';
  connection?: Maybe<FaqConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type FaqConnectionId = {
  __typename?: 'FaqConnectionId';
  connection?: Maybe<FaqConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type FaqConnectionLocale = {
  __typename?: 'FaqConnectionLocale';
  connection?: Maybe<FaqConnection>;
  key?: Maybe<Scalars['String']>;
};

export type FaqConnectionPublished_At = {
  __typename?: 'FaqConnectionPublished_at';
  connection?: Maybe<FaqConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type FaqConnectionQuestion = {
  __typename?: 'FaqConnectionQuestion';
  connection?: Maybe<FaqConnection>;
  key?: Maybe<Scalars['String']>;
};

export type FaqConnectionUpdated_At = {
  __typename?: 'FaqConnectionUpdated_at';
  connection?: Maybe<FaqConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type FaqGroupBy = {
  __typename?: 'FaqGroupBy';
  Answer?: Maybe<Array<Maybe<FaqConnectionAnswer>>>;
  Question?: Maybe<Array<Maybe<FaqConnectionQuestion>>>;
  created_at?: Maybe<Array<Maybe<FaqConnectionCreated_At>>>;
  id?: Maybe<Array<Maybe<FaqConnectionId>>>;
  locale?: Maybe<Array<Maybe<FaqConnectionLocale>>>;
  published_at?: Maybe<Array<Maybe<FaqConnectionPublished_At>>>;
  updated_at?: Maybe<Array<Maybe<FaqConnectionUpdated_At>>>;
};

export type FaqInput = {
  Answer?: Maybe<Scalars['String']>;
  Question?: Maybe<Scalars['String']>;
  created_by?: Maybe<Scalars['ID']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  published_at?: Maybe<Scalars['DateTime']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type FaqSection = {
  __typename?: 'FaqSection';
  created_at: Scalars['DateTime'];
  faq1?: Maybe<Faq>;
  faq2?: Maybe<Faq>;
  faq3?: Maybe<Faq>;
  heading?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<FaqSection>>>;
  published_at?: Maybe<Scalars['DateTime']>;
  updated_at: Scalars['DateTime'];
};


export type FaqSectionLocalizationsArgs = {
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type FaqSectionAggregator = {
  __typename?: 'FaqSectionAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type FaqSectionConnection = {
  __typename?: 'FaqSectionConnection';
  aggregate?: Maybe<FaqSectionAggregator>;
  groupBy?: Maybe<FaqSectionGroupBy>;
  values?: Maybe<Array<Maybe<FaqSection>>>;
};

export type FaqSectionConnectionCreated_At = {
  __typename?: 'FaqSectionConnectionCreated_at';
  connection?: Maybe<FaqSectionConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type FaqSectionConnectionFaq1 = {
  __typename?: 'FaqSectionConnectionFaq1';
  connection?: Maybe<FaqSectionConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type FaqSectionConnectionFaq2 = {
  __typename?: 'FaqSectionConnectionFaq2';
  connection?: Maybe<FaqSectionConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type FaqSectionConnectionFaq3 = {
  __typename?: 'FaqSectionConnectionFaq3';
  connection?: Maybe<FaqSectionConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type FaqSectionConnectionHeading = {
  __typename?: 'FaqSectionConnectionHeading';
  connection?: Maybe<FaqSectionConnection>;
  key?: Maybe<Scalars['String']>;
};

export type FaqSectionConnectionId = {
  __typename?: 'FaqSectionConnectionId';
  connection?: Maybe<FaqSectionConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type FaqSectionConnectionLocale = {
  __typename?: 'FaqSectionConnectionLocale';
  connection?: Maybe<FaqSectionConnection>;
  key?: Maybe<Scalars['String']>;
};

export type FaqSectionConnectionPublished_At = {
  __typename?: 'FaqSectionConnectionPublished_at';
  connection?: Maybe<FaqSectionConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type FaqSectionConnectionUpdated_At = {
  __typename?: 'FaqSectionConnectionUpdated_at';
  connection?: Maybe<FaqSectionConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type FaqSectionGroupBy = {
  __typename?: 'FaqSectionGroupBy';
  created_at?: Maybe<Array<Maybe<FaqSectionConnectionCreated_At>>>;
  faq1?: Maybe<Array<Maybe<FaqSectionConnectionFaq1>>>;
  faq2?: Maybe<Array<Maybe<FaqSectionConnectionFaq2>>>;
  faq3?: Maybe<Array<Maybe<FaqSectionConnectionFaq3>>>;
  heading?: Maybe<Array<Maybe<FaqSectionConnectionHeading>>>;
  id?: Maybe<Array<Maybe<FaqSectionConnectionId>>>;
  locale?: Maybe<Array<Maybe<FaqSectionConnectionLocale>>>;
  published_at?: Maybe<Array<Maybe<FaqSectionConnectionPublished_At>>>;
  updated_at?: Maybe<Array<Maybe<FaqSectionConnectionUpdated_At>>>;
};

export type FaqSectionInput = {
  created_by?: Maybe<Scalars['ID']>;
  faq1?: Maybe<Scalars['ID']>;
  faq2?: Maybe<Scalars['ID']>;
  faq3?: Maybe<Scalars['ID']>;
  heading?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  published_at?: Maybe<Scalars['DateTime']>;
  updated_by?: Maybe<Scalars['ID']>;
};

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

export type FunFactInput = {
  content?: Maybe<Scalars['String']>;
  created_by?: Maybe<Scalars['ID']>;
  title: Scalars['String'];
  updated_by?: Maybe<Scalars['ID']>;
};

export type FunFacts = {
  __typename?: 'FunFacts';
  content?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  id: Scalars['ID'];
  title: Scalars['String'];
  updated_at: Scalars['DateTime'];
};

export type FunFactsAggregator = {
  __typename?: 'FunFactsAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type FunFactsConnection = {
  __typename?: 'FunFactsConnection';
  aggregate?: Maybe<FunFactsAggregator>;
  groupBy?: Maybe<FunFactsGroupBy>;
  values?: Maybe<Array<Maybe<FunFacts>>>;
};

export type FunFactsConnectionContent = {
  __typename?: 'FunFactsConnectionContent';
  connection?: Maybe<FunFactsConnection>;
  key?: Maybe<Scalars['String']>;
};

export type FunFactsConnectionCreated_At = {
  __typename?: 'FunFactsConnectionCreated_at';
  connection?: Maybe<FunFactsConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type FunFactsConnectionId = {
  __typename?: 'FunFactsConnectionId';
  connection?: Maybe<FunFactsConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type FunFactsConnectionTitle = {
  __typename?: 'FunFactsConnectionTitle';
  connection?: Maybe<FunFactsConnection>;
  key?: Maybe<Scalars['String']>;
};

export type FunFactsConnectionUpdated_At = {
  __typename?: 'FunFactsConnectionUpdated_at';
  connection?: Maybe<FunFactsConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type FunFactsGroupBy = {
  __typename?: 'FunFactsGroupBy';
  content?: Maybe<Array<Maybe<FunFactsConnectionContent>>>;
  created_at?: Maybe<Array<Maybe<FunFactsConnectionCreated_At>>>;
  id?: Maybe<Array<Maybe<FunFactsConnectionId>>>;
  title?: Maybe<Array<Maybe<FunFactsConnectionTitle>>>;
  updated_at?: Maybe<Array<Maybe<FunFactsConnectionUpdated_At>>>;
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

export type MenuItemsDynamicZone = ComponentMenuCollectionLink | ComponentMenuLink | ComponentMenuLinkWithImage;

export type Morph = BottomContext | BottomContextAggregator | BottomContextConnection | BottomContextConnectionCreated_At | BottomContextConnectionDevice_Summary | BottomContextConnectionId | BottomContextConnectionLocale | BottomContextConnectionPublished_At | BottomContextConnectionSubheading | BottomContextConnectionUpdated_At | BottomContextGroupBy | Collection | CollectionAggregator | CollectionConnection | CollectionConnectionCreated_At | CollectionConnectionDescription | CollectionConnectionFilters | CollectionConnectionHandle | CollectionConnectionId | CollectionConnectionImage | CollectionConnectionLocale | CollectionConnectionMetaDescription | CollectionConnectionParent | CollectionConnectionPublished_At | CollectionConnectionTagline | CollectionConnectionTitle | CollectionConnectionUpdated_At | CollectionGroupBy | ComponentCollectionBanner | ComponentCollectionFeaturedCollection | ComponentCollectionFeaturedSubcollections | ComponentCollectionNewsletterForm | ComponentCollectionRelatedPosts | ComponentMenuCollectionLink | ComponentMenuLink | ComponentMenuLinkWithImage | ComponentSettingsFooter | ComponentSettingsPartner | ComponentSettingsSocial | ComponentStoreShopifySettings | Device | DeviceAggregator | DeviceConnection | DeviceConnectionCanonical_Override | DeviceConnectionCreated_At | DeviceConnectionDevice | DeviceConnectionDevice_Summary | DeviceConnectionFaq_Section | DeviceConnectionId | DeviceConnectionLocale | DeviceConnectionMeta_Description | DeviceConnectionPart_Type | DeviceConnectionPublished_At | DeviceConnectionSubheading | DeviceConnectionSummary | DeviceConnectionUpdated_At | DeviceGroupBy | DeviceHandle | DeviceHandleAggregator | DeviceHandleConnection | DeviceHandleConnectionCreated_At | DeviceHandleConnectionHandle | DeviceHandleConnectionId | DeviceHandleConnectionPublished_At | DeviceHandleConnectionUpdated_At | DeviceHandleGroupBy | Faq | FaqAggregator | FaqConnection | FaqConnectionAnswer | FaqConnectionCreated_At | FaqConnectionId | FaqConnectionLocale | FaqConnectionPublished_At | FaqConnectionQuestion | FaqConnectionUpdated_At | FaqGroupBy | FaqSection | FaqSectionAggregator | FaqSectionConnection | FaqSectionConnectionCreated_At | FaqSectionConnectionFaq1 | FaqSectionConnectionFaq2 | FaqSectionConnectionFaq3 | FaqSectionConnectionHeading | FaqSectionConnectionId | FaqSectionConnectionLocale | FaqSectionConnectionPublished_At | FaqSectionConnectionUpdated_At | FaqSectionGroupBy | FunFacts | FunFactsAggregator | FunFactsConnection | FunFactsConnectionContent | FunFactsConnectionCreated_At | FunFactsConnectionId | FunFactsConnectionTitle | FunFactsConnectionUpdated_At | FunFactsGroupBy | I18NLocale | Menu | MenuAggregator | MenuConnection | MenuConnectionCreated_At | MenuConnectionId | MenuConnectionLocale | MenuConnectionPublished_At | MenuConnectionTitle | MenuConnectionUpdated_At | MenuGroupBy | PartCollections | PartCollectionsAggregator | PartCollectionsConnection | PartCollectionsConnectionCreated_At | PartCollectionsConnectionDetails | PartCollectionsConnectionDevice_Handle | PartCollectionsConnectionId | PartCollectionsConnectionMeta_Description | PartCollectionsConnectionPublished_At | PartCollectionsConnectionSummary | PartCollectionsConnectionTitle | PartCollectionsConnectionUpdated_At | PartCollectionsGroupBy | Store | StoreAggregator | StoreConnection | StoreConnectionCode | StoreConnectionCreated_At | StoreConnectionCurrency | StoreConnectionFooter | StoreConnectionId | StoreConnectionName | StoreConnectionPublished_At | StoreConnectionShopifySettings | StoreConnectionSocialMediaAccounts | StoreConnectionStore_Settings | StoreConnectionUpdated_At | StoreConnectionUrl | StoreGroupBy | StoreSettings | StoreSettingsAggregator | StoreSettingsConnection | StoreSettingsConnectionCreated_At | StoreSettingsConnectionFooter | StoreSettingsConnectionId | StoreSettingsConnectionLocale | StoreSettingsConnectionPublished_At | StoreSettingsConnectionSocialMediaAccounts | StoreSettingsConnectionStore | StoreSettingsConnectionUpdated_At | StoreSettingsGroupBy | UploadFile | UploadFileAggregator | UploadFileAggregatorAvg | UploadFileAggregatorMax | UploadFileAggregatorMin | UploadFileAggregatorSum | UploadFileConnection | UploadFileConnectionAlternativeText | UploadFileConnectionCaption | UploadFileConnectionCreated_At | UploadFileConnectionExt | UploadFileConnectionFormats | UploadFileConnectionHash | UploadFileConnectionHeight | UploadFileConnectionId | UploadFileConnectionMime | UploadFileConnectionName | UploadFileConnectionPreviewUrl | UploadFileConnectionProvider | UploadFileConnectionProvider_Metadata | UploadFileConnectionSize | UploadFileConnectionUpdated_At | UploadFileConnectionUrl | UploadFileConnectionWidth | UploadFileGroupBy | UserPermissionsPasswordPayload | UsersPermissionsLoginPayload | UsersPermissionsMe | UsersPermissionsMeRole | UsersPermissionsPermission | UsersPermissionsRole | UsersPermissionsRoleAggregator | UsersPermissionsRoleConnection | UsersPermissionsRoleConnectionDescription | UsersPermissionsRoleConnectionId | UsersPermissionsRoleConnectionName | UsersPermissionsRoleConnectionType | UsersPermissionsRoleGroupBy | UsersPermissionsUser | UsersPermissionsUserAggregator | UsersPermissionsUserConnection | UsersPermissionsUserConnectionBlocked | UsersPermissionsUserConnectionConfirmed | UsersPermissionsUserConnectionCreated_At | UsersPermissionsUserConnectionEmail | UsersPermissionsUserConnectionId | UsersPermissionsUserConnectionProvider | UsersPermissionsUserConnectionRole | UsersPermissionsUserConnectionUpdated_At | UsersPermissionsUserConnectionUsername | UsersPermissionsUserGroupBy | CreateBottomContextPayload | CreateCollectionPayload | CreateDeviceHandlePayload | CreateDevicePayload | CreateFaqPayload | CreateFaqSectionPayload | CreateFunFactPayload | CreateMenuPayload | CreatePartCollectionPayload | CreateRolePayload | CreateStorePayload | CreateStoreSettingPayload | CreateUserPayload | DeleteBottomContextPayload | DeleteCollectionPayload | DeleteDeviceHandlePayload | DeleteDevicePayload | DeleteFaqPayload | DeleteFaqSectionPayload | DeleteFilePayload | DeleteFunFactPayload | DeleteMenuPayload | DeletePartCollectionPayload | DeleteRolePayload | DeleteStorePayload | DeleteStoreSettingPayload | DeleteUserPayload | UpdateBottomContextPayload | UpdateCollectionPayload | UpdateDeviceHandlePayload | UpdateDevicePayload | UpdateFaqPayload | UpdateFaqSectionPayload | UpdateFunFactPayload | UpdateMenuPayload | UpdatePartCollectionPayload | UpdateRolePayload | UpdateStorePayload | UpdateStoreSettingPayload | UpdateUserPayload;

export type Mutation = {
  __typename?: 'Mutation';
  createBottomContext?: Maybe<CreateBottomContextPayload>;
  createBottomContextLocalization: BottomContext;
  createCollection?: Maybe<CreateCollectionPayload>;
  createCollectionLocalization: Collection;
  createDevice?: Maybe<CreateDevicePayload>;
  createDeviceHandle?: Maybe<CreateDeviceHandlePayload>;
  createDeviceLocalization: Device;
  createFaq?: Maybe<CreateFaqPayload>;
  createFaqLocalization: Faq;
  createFaqSection?: Maybe<CreateFaqSectionPayload>;
  createFaqSectionLocalization: FaqSection;
  createFunFact?: Maybe<CreateFunFactPayload>;
  createMenu?: Maybe<CreateMenuPayload>;
  createMenuLocalization: Menu;
  createPartCollection?: Maybe<CreatePartCollectionPayload>;
  /** Create a new role */
  createRole?: Maybe<CreateRolePayload>;
  createStore?: Maybe<CreateStorePayload>;
  createStoreSetting?: Maybe<CreateStoreSettingPayload>;
  createStoreSettingLocalization: StoreSettings;
  /** Create a new user */
  createUser?: Maybe<CreateUserPayload>;
  deleteBottomContext?: Maybe<DeleteBottomContextPayload>;
  deleteCollection?: Maybe<DeleteCollectionPayload>;
  deleteDevice?: Maybe<DeleteDevicePayload>;
  deleteDeviceHandle?: Maybe<DeleteDeviceHandlePayload>;
  deleteFaq?: Maybe<DeleteFaqPayload>;
  deleteFaqSection?: Maybe<DeleteFaqSectionPayload>;
  /** Delete one file */
  deleteFile?: Maybe<DeleteFilePayload>;
  deleteFunFact?: Maybe<DeleteFunFactPayload>;
  deleteMenu?: Maybe<DeleteMenuPayload>;
  deletePartCollection?: Maybe<DeletePartCollectionPayload>;
  /** Delete an existing role */
  deleteRole?: Maybe<DeleteRolePayload>;
  deleteStore?: Maybe<DeleteStorePayload>;
  deleteStoreSetting?: Maybe<DeleteStoreSettingPayload>;
  /** Delete an existing user */
  deleteUser?: Maybe<DeleteUserPayload>;
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
  forgotPassword?: Maybe<UserPermissionsPasswordPayload>;
  login: UsersPermissionsLoginPayload;
  multipleUpload: Array<Maybe<UploadFile>>;
  register: UsersPermissionsLoginPayload;
  resetPassword?: Maybe<UsersPermissionsLoginPayload>;
  updateBottomContext?: Maybe<UpdateBottomContextPayload>;
  updateCollection?: Maybe<UpdateCollectionPayload>;
  updateDevice?: Maybe<UpdateDevicePayload>;
  updateDeviceHandle?: Maybe<UpdateDeviceHandlePayload>;
  updateFaq?: Maybe<UpdateFaqPayload>;
  updateFaqSection?: Maybe<UpdateFaqSectionPayload>;
  updateFileInfo: UploadFile;
  updateFunFact?: Maybe<UpdateFunFactPayload>;
  updateMenu?: Maybe<UpdateMenuPayload>;
  updatePartCollection?: Maybe<UpdatePartCollectionPayload>;
  /** Update an existing role */
  updateRole?: Maybe<UpdateRolePayload>;
  updateStore?: Maybe<UpdateStorePayload>;
  updateStoreSetting?: Maybe<UpdateStoreSettingPayload>;
  /** Update an existing user */
  updateUser?: Maybe<UpdateUserPayload>;
  upload: UploadFile;
};


export type MutationCreateBottomContextArgs = {
  input?: Maybe<CreateBottomContextInput>;
};


export type MutationCreateBottomContextLocalizationArgs = {
  input: UpdateBottomContextInput;
};


export type MutationCreateCollectionArgs = {
  input?: Maybe<CreateCollectionInput>;
};


export type MutationCreateCollectionLocalizationArgs = {
  input: UpdateCollectionInput;
};


export type MutationCreateDeviceArgs = {
  input?: Maybe<CreateDeviceInput>;
};


export type MutationCreateDeviceHandleArgs = {
  input?: Maybe<CreateDeviceHandleInput>;
};


export type MutationCreateDeviceLocalizationArgs = {
  input: UpdateDeviceInput;
};


export type MutationCreateFaqArgs = {
  input?: Maybe<CreateFaqInput>;
};


export type MutationCreateFaqLocalizationArgs = {
  input: UpdateFaqInput;
};


export type MutationCreateFaqSectionArgs = {
  input?: Maybe<CreateFaqSectionInput>;
};


export type MutationCreateFaqSectionLocalizationArgs = {
  input: UpdateFaqSectionInput;
};


export type MutationCreateFunFactArgs = {
  input?: Maybe<CreateFunFactInput>;
};


export type MutationCreateMenuArgs = {
  input?: Maybe<CreateMenuInput>;
};


export type MutationCreateMenuLocalizationArgs = {
  input: UpdateMenuInput;
};


export type MutationCreatePartCollectionArgs = {
  input?: Maybe<CreatePartCollectionInput>;
};


export type MutationCreateRoleArgs = {
  input?: Maybe<CreateRoleInput>;
};


export type MutationCreateStoreArgs = {
  input?: Maybe<CreateStoreInput>;
};


export type MutationCreateStoreSettingArgs = {
  input?: Maybe<CreateStoreSettingInput>;
};


export type MutationCreateStoreSettingLocalizationArgs = {
  input: UpdateStoreSettingInput;
};


export type MutationCreateUserArgs = {
  input?: Maybe<CreateUserInput>;
};


export type MutationDeleteBottomContextArgs = {
  input?: Maybe<DeleteBottomContextInput>;
};


export type MutationDeleteCollectionArgs = {
  input?: Maybe<DeleteCollectionInput>;
};


export type MutationDeleteDeviceArgs = {
  input?: Maybe<DeleteDeviceInput>;
};


export type MutationDeleteDeviceHandleArgs = {
  input?: Maybe<DeleteDeviceHandleInput>;
};


export type MutationDeleteFaqArgs = {
  input?: Maybe<DeleteFaqInput>;
};


export type MutationDeleteFaqSectionArgs = {
  input?: Maybe<DeleteFaqSectionInput>;
};


export type MutationDeleteFileArgs = {
  input?: Maybe<DeleteFileInput>;
};


export type MutationDeleteFunFactArgs = {
  input?: Maybe<DeleteFunFactInput>;
};


export type MutationDeleteMenuArgs = {
  input?: Maybe<DeleteMenuInput>;
};


export type MutationDeletePartCollectionArgs = {
  input?: Maybe<DeletePartCollectionInput>;
};


export type MutationDeleteRoleArgs = {
  input?: Maybe<DeleteRoleInput>;
};


export type MutationDeleteStoreArgs = {
  input?: Maybe<DeleteStoreInput>;
};


export type MutationDeleteStoreSettingArgs = {
  input?: Maybe<DeleteStoreSettingInput>;
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


export type MutationUpdateBottomContextArgs = {
  input?: Maybe<UpdateBottomContextInput>;
};


export type MutationUpdateCollectionArgs = {
  input?: Maybe<UpdateCollectionInput>;
};


export type MutationUpdateDeviceArgs = {
  input?: Maybe<UpdateDeviceInput>;
};


export type MutationUpdateDeviceHandleArgs = {
  input?: Maybe<UpdateDeviceHandleInput>;
};


export type MutationUpdateFaqArgs = {
  input?: Maybe<UpdateFaqInput>;
};


export type MutationUpdateFaqSectionArgs = {
  input?: Maybe<UpdateFaqSectionInput>;
};


export type MutationUpdateFileInfoArgs = {
  id: Scalars['ID'];
  info: FileInfoInput;
};


export type MutationUpdateFunFactArgs = {
  input?: Maybe<UpdateFunFactInput>;
};


export type MutationUpdateMenuArgs = {
  input?: Maybe<UpdateMenuInput>;
};


export type MutationUpdatePartCollectionArgs = {
  input?: Maybe<UpdatePartCollectionInput>;
};


export type MutationUpdateRoleArgs = {
  input?: Maybe<UpdateRoleInput>;
};


export type MutationUpdateStoreArgs = {
  input?: Maybe<UpdateStoreInput>;
};


export type MutationUpdateStoreSettingArgs = {
  input?: Maybe<UpdateStoreSettingInput>;
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

export type PartCollectionInput = {
  created_by?: Maybe<Scalars['ID']>;
  details?: Maybe<Scalars['String']>;
  device_handle: Scalars['String'];
  meta_description?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  summary?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updated_by?: Maybe<Scalars['ID']>;
};

export type PartCollections = {
  __typename?: 'PartCollections';
  created_at: Scalars['DateTime'];
  details?: Maybe<Scalars['String']>;
  device_handle: Scalars['String'];
  id: Scalars['ID'];
  meta_description?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  summary?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updated_at: Scalars['DateTime'];
};

export type PartCollectionsAggregator = {
  __typename?: 'PartCollectionsAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type PartCollectionsConnection = {
  __typename?: 'PartCollectionsConnection';
  aggregate?: Maybe<PartCollectionsAggregator>;
  groupBy?: Maybe<PartCollectionsGroupBy>;
  values?: Maybe<Array<Maybe<PartCollections>>>;
};

export type PartCollectionsConnectionCreated_At = {
  __typename?: 'PartCollectionsConnectionCreated_at';
  connection?: Maybe<PartCollectionsConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type PartCollectionsConnectionDetails = {
  __typename?: 'PartCollectionsConnectionDetails';
  connection?: Maybe<PartCollectionsConnection>;
  key?: Maybe<Scalars['String']>;
};

export type PartCollectionsConnectionDevice_Handle = {
  __typename?: 'PartCollectionsConnectionDevice_handle';
  connection?: Maybe<PartCollectionsConnection>;
  key?: Maybe<Scalars['String']>;
};

export type PartCollectionsConnectionId = {
  __typename?: 'PartCollectionsConnectionId';
  connection?: Maybe<PartCollectionsConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type PartCollectionsConnectionMeta_Description = {
  __typename?: 'PartCollectionsConnectionMeta_description';
  connection?: Maybe<PartCollectionsConnection>;
  key?: Maybe<Scalars['String']>;
};

export type PartCollectionsConnectionPublished_At = {
  __typename?: 'PartCollectionsConnectionPublished_at';
  connection?: Maybe<PartCollectionsConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type PartCollectionsConnectionSummary = {
  __typename?: 'PartCollectionsConnectionSummary';
  connection?: Maybe<PartCollectionsConnection>;
  key?: Maybe<Scalars['String']>;
};

export type PartCollectionsConnectionTitle = {
  __typename?: 'PartCollectionsConnectionTitle';
  connection?: Maybe<PartCollectionsConnection>;
  key?: Maybe<Scalars['String']>;
};

export type PartCollectionsConnectionUpdated_At = {
  __typename?: 'PartCollectionsConnectionUpdated_at';
  connection?: Maybe<PartCollectionsConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type PartCollectionsGroupBy = {
  __typename?: 'PartCollectionsGroupBy';
  created_at?: Maybe<Array<Maybe<PartCollectionsConnectionCreated_At>>>;
  details?: Maybe<Array<Maybe<PartCollectionsConnectionDetails>>>;
  device_handle?: Maybe<Array<Maybe<PartCollectionsConnectionDevice_Handle>>>;
  id?: Maybe<Array<Maybe<PartCollectionsConnectionId>>>;
  meta_description?: Maybe<Array<Maybe<PartCollectionsConnectionMeta_Description>>>;
  published_at?: Maybe<Array<Maybe<PartCollectionsConnectionPublished_At>>>;
  summary?: Maybe<Array<Maybe<PartCollectionsConnectionSummary>>>;
  title?: Maybe<Array<Maybe<PartCollectionsConnectionTitle>>>;
  updated_at?: Maybe<Array<Maybe<PartCollectionsConnectionUpdated_At>>>;
};

export enum PublicationState {
  Live = 'LIVE',
  Preview = 'PREVIEW'
}

export type Query = {
  __typename?: 'Query';
  bottomContext?: Maybe<BottomContext>;
  bottomContexts?: Maybe<Array<Maybe<BottomContext>>>;
  bottomContextsConnection?: Maybe<BottomContextConnection>;
  collection?: Maybe<Collection>;
  collections?: Maybe<Array<Maybe<Collection>>>;
  collectionsConnection?: Maybe<CollectionConnection>;
  device?: Maybe<Device>;
  deviceHandle?: Maybe<DeviceHandle>;
  deviceHandles?: Maybe<Array<Maybe<DeviceHandle>>>;
  deviceHandlesConnection?: Maybe<DeviceHandleConnection>;
  devices?: Maybe<Array<Maybe<Device>>>;
  devicesConnection?: Maybe<DeviceConnection>;
  faq?: Maybe<Faq>;
  faqSection?: Maybe<FaqSection>;
  faqSections?: Maybe<Array<Maybe<FaqSection>>>;
  faqSectionsConnection?: Maybe<FaqSectionConnection>;
  faqs?: Maybe<Array<Maybe<Faq>>>;
  faqsConnection?: Maybe<FaqConnection>;
  files?: Maybe<Array<Maybe<UploadFile>>>;
  filesConnection?: Maybe<UploadFileConnection>;
  funFact?: Maybe<FunFacts>;
  funFacts?: Maybe<Array<Maybe<FunFacts>>>;
  funFactsConnection?: Maybe<FunFactsConnection>;
  me?: Maybe<UsersPermissionsMe>;
  menu?: Maybe<Menu>;
  menus?: Maybe<Array<Maybe<Menu>>>;
  menusConnection?: Maybe<MenuConnection>;
  partCollection?: Maybe<PartCollections>;
  partCollections?: Maybe<Array<Maybe<PartCollections>>>;
  partCollectionsConnection?: Maybe<PartCollectionsConnection>;
  role?: Maybe<UsersPermissionsRole>;
  /** Retrieve all the existing roles. You can't apply filters on this query. */
  roles?: Maybe<Array<Maybe<UsersPermissionsRole>>>;
  rolesConnection?: Maybe<UsersPermissionsRoleConnection>;
  store?: Maybe<Store>;
  storeSetting?: Maybe<StoreSettings>;
  storeSettings?: Maybe<Array<Maybe<StoreSettings>>>;
  storeSettingsConnection?: Maybe<StoreSettingsConnection>;
  stores?: Maybe<Array<Maybe<Store>>>;
  storesConnection?: Maybe<StoreConnection>;
  user?: Maybe<UsersPermissionsUser>;
  users?: Maybe<Array<Maybe<UsersPermissionsUser>>>;
  usersConnection?: Maybe<UsersPermissionsUserConnection>;
};


export type QueryBottomContextArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryBottomContextsArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  publicationState?: Maybe<PublicationState>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryBottomContextsConnectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryCollectionArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryCollectionsArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  publicationState?: Maybe<PublicationState>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryCollectionsConnectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryDeviceArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryDeviceHandleArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryDeviceHandlesArgs = {
  limit?: Maybe<Scalars['Int']>;
  publicationState?: Maybe<PublicationState>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryDeviceHandlesConnectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryDevicesArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  publicationState?: Maybe<PublicationState>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryDevicesConnectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryFaqArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryFaqSectionArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryFaqSectionsArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  publicationState?: Maybe<PublicationState>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryFaqSectionsConnectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryFaqsArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  publicationState?: Maybe<PublicationState>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryFaqsConnectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
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


export type QueryFunFactArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryFunFactsArgs = {
  limit?: Maybe<Scalars['Int']>;
  publicationState?: Maybe<PublicationState>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryFunFactsConnectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
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


export type QueryPartCollectionArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryPartCollectionsArgs = {
  limit?: Maybe<Scalars['Int']>;
  publicationState?: Maybe<PublicationState>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryPartCollectionsConnectionArgs = {
  limit?: Maybe<Scalars['Int']>;
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


export type QueryStoreSettingArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryStoreSettingsArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  publicationState?: Maybe<PublicationState>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryStoreSettingsConnectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
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
  currency: Scalars['String'];
  footer?: Maybe<ComponentSettingsFooter>;
  id: Scalars['ID'];
  name: Scalars['String'];
  published_at?: Maybe<Scalars['DateTime']>;
  shopifySettings?: Maybe<ComponentStoreShopifySettings>;
  socialMediaAccounts?: Maybe<ComponentSettingsSocial>;
  store_settings?: Maybe<StoreSettings>;
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

export type StoreConnectionStore_Settings = {
  __typename?: 'StoreConnectionStore_settings';
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
  store_settings?: Maybe<Array<Maybe<StoreConnectionStore_Settings>>>;
  updated_at?: Maybe<Array<Maybe<StoreConnectionUpdated_At>>>;
  url?: Maybe<Array<Maybe<StoreConnectionUrl>>>;
};

export type StoreInput = {
  code: Scalars['String'];
  created_by?: Maybe<Scalars['ID']>;
  currency: Scalars['String'];
  footer: ComponentSettingsFooterInput;
  name: Scalars['String'];
  published_at?: Maybe<Scalars['DateTime']>;
  shopifySettings: ComponentStoreShopifySettingInput;
  socialMediaAccounts: ComponentSettingsSocialInput;
  store_settings?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
  url: Scalars['String'];
};

export type StoreSettingInput = {
  created_by?: Maybe<Scalars['ID']>;
  footer: ComponentSettingsFooterInput;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  published_at?: Maybe<Scalars['DateTime']>;
  socialMediaAccounts: ComponentSettingsSocialInput;
  store?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type StoreSettings = {
  __typename?: 'StoreSettings';
  created_at: Scalars['DateTime'];
  footer?: Maybe<ComponentSettingsFooter>;
  id: Scalars['ID'];
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<StoreSettings>>>;
  published_at?: Maybe<Scalars['DateTime']>;
  socialMediaAccounts?: Maybe<ComponentSettingsSocial>;
  store?: Maybe<Store>;
  updated_at: Scalars['DateTime'];
};


export type StoreSettingsLocalizationsArgs = {
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type StoreSettingsAggregator = {
  __typename?: 'StoreSettingsAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type StoreSettingsConnection = {
  __typename?: 'StoreSettingsConnection';
  aggregate?: Maybe<StoreSettingsAggregator>;
  groupBy?: Maybe<StoreSettingsGroupBy>;
  values?: Maybe<Array<Maybe<StoreSettings>>>;
};

export type StoreSettingsConnectionCreated_At = {
  __typename?: 'StoreSettingsConnectionCreated_at';
  connection?: Maybe<StoreSettingsConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type StoreSettingsConnectionFooter = {
  __typename?: 'StoreSettingsConnectionFooter';
  connection?: Maybe<StoreSettingsConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type StoreSettingsConnectionId = {
  __typename?: 'StoreSettingsConnectionId';
  connection?: Maybe<StoreSettingsConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type StoreSettingsConnectionLocale = {
  __typename?: 'StoreSettingsConnectionLocale';
  connection?: Maybe<StoreSettingsConnection>;
  key?: Maybe<Scalars['String']>;
};

export type StoreSettingsConnectionPublished_At = {
  __typename?: 'StoreSettingsConnectionPublished_at';
  connection?: Maybe<StoreSettingsConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type StoreSettingsConnectionSocialMediaAccounts = {
  __typename?: 'StoreSettingsConnectionSocialMediaAccounts';
  connection?: Maybe<StoreSettingsConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type StoreSettingsConnectionStore = {
  __typename?: 'StoreSettingsConnectionStore';
  connection?: Maybe<StoreSettingsConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type StoreSettingsConnectionUpdated_At = {
  __typename?: 'StoreSettingsConnectionUpdated_at';
  connection?: Maybe<StoreSettingsConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type StoreSettingsGroupBy = {
  __typename?: 'StoreSettingsGroupBy';
  created_at?: Maybe<Array<Maybe<StoreSettingsConnectionCreated_At>>>;
  footer?: Maybe<Array<Maybe<StoreSettingsConnectionFooter>>>;
  id?: Maybe<Array<Maybe<StoreSettingsConnectionId>>>;
  locale?: Maybe<Array<Maybe<StoreSettingsConnectionLocale>>>;
  published_at?: Maybe<Array<Maybe<StoreSettingsConnectionPublished_At>>>;
  socialMediaAccounts?: Maybe<Array<Maybe<StoreSettingsConnectionSocialMediaAccounts>>>;
  store?: Maybe<Array<Maybe<StoreSettingsConnectionStore>>>;
  updated_at?: Maybe<Array<Maybe<StoreSettingsConnectionUpdated_At>>>;
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

export type CreateBottomContextInput = {
  data?: Maybe<BottomContextInput>;
};

export type CreateBottomContextPayload = {
  __typename?: 'createBottomContextPayload';
  bottomContext?: Maybe<BottomContext>;
};

export type CreateCollectionInput = {
  data?: Maybe<CollectionInput>;
};

export type CreateCollectionPayload = {
  __typename?: 'createCollectionPayload';
  collection?: Maybe<Collection>;
};

export type CreateDeviceHandleInput = {
  data?: Maybe<DeviceHandleInput>;
};

export type CreateDeviceHandlePayload = {
  __typename?: 'createDeviceHandlePayload';
  deviceHandle?: Maybe<DeviceHandle>;
};

export type CreateDeviceInput = {
  data?: Maybe<DeviceInput>;
};

export type CreateDevicePayload = {
  __typename?: 'createDevicePayload';
  device?: Maybe<Device>;
};

export type CreateFaqInput = {
  data?: Maybe<FaqInput>;
};

export type CreateFaqPayload = {
  __typename?: 'createFaqPayload';
  faq?: Maybe<Faq>;
};

export type CreateFaqSectionInput = {
  data?: Maybe<FaqSectionInput>;
};

export type CreateFaqSectionPayload = {
  __typename?: 'createFaqSectionPayload';
  faqSection?: Maybe<FaqSection>;
};

export type CreateFunFactInput = {
  data?: Maybe<FunFactInput>;
};

export type CreateFunFactPayload = {
  __typename?: 'createFunFactPayload';
  funFact?: Maybe<FunFacts>;
};

export type CreateMenuInput = {
  data?: Maybe<MenuInput>;
};

export type CreateMenuPayload = {
  __typename?: 'createMenuPayload';
  menu?: Maybe<Menu>;
};

export type CreatePartCollectionInput = {
  data?: Maybe<PartCollectionInput>;
};

export type CreatePartCollectionPayload = {
  __typename?: 'createPartCollectionPayload';
  partCollection?: Maybe<PartCollections>;
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

export type CreateStoreSettingInput = {
  data?: Maybe<StoreSettingInput>;
};

export type CreateStoreSettingPayload = {
  __typename?: 'createStoreSettingPayload';
  storeSetting?: Maybe<StoreSettings>;
};

export type CreateUserInput = {
  data?: Maybe<UserInput>;
};

export type CreateUserPayload = {
  __typename?: 'createUserPayload';
  user?: Maybe<UsersPermissionsUser>;
};

export type DeleteBottomContextInput = {
  where?: Maybe<InputId>;
};

export type DeleteBottomContextPayload = {
  __typename?: 'deleteBottomContextPayload';
  bottomContext?: Maybe<BottomContext>;
};

export type DeleteCollectionInput = {
  where?: Maybe<InputId>;
};

export type DeleteCollectionPayload = {
  __typename?: 'deleteCollectionPayload';
  collection?: Maybe<Collection>;
};

export type DeleteDeviceHandleInput = {
  where?: Maybe<InputId>;
};

export type DeleteDeviceHandlePayload = {
  __typename?: 'deleteDeviceHandlePayload';
  deviceHandle?: Maybe<DeviceHandle>;
};

export type DeleteDeviceInput = {
  where?: Maybe<InputId>;
};

export type DeleteDevicePayload = {
  __typename?: 'deleteDevicePayload';
  device?: Maybe<Device>;
};

export type DeleteFaqInput = {
  where?: Maybe<InputId>;
};

export type DeleteFaqPayload = {
  __typename?: 'deleteFaqPayload';
  faq?: Maybe<Faq>;
};

export type DeleteFaqSectionInput = {
  where?: Maybe<InputId>;
};

export type DeleteFaqSectionPayload = {
  __typename?: 'deleteFaqSectionPayload';
  faqSection?: Maybe<FaqSection>;
};

export type DeleteFileInput = {
  where?: Maybe<InputId>;
};

export type DeleteFilePayload = {
  __typename?: 'deleteFilePayload';
  file?: Maybe<UploadFile>;
};

export type DeleteFunFactInput = {
  where?: Maybe<InputId>;
};

export type DeleteFunFactPayload = {
  __typename?: 'deleteFunFactPayload';
  funFact?: Maybe<FunFacts>;
};

export type DeleteMenuInput = {
  where?: Maybe<InputId>;
};

export type DeleteMenuPayload = {
  __typename?: 'deleteMenuPayload';
  menu?: Maybe<Menu>;
};

export type DeletePartCollectionInput = {
  where?: Maybe<InputId>;
};

export type DeletePartCollectionPayload = {
  __typename?: 'deletePartCollectionPayload';
  partCollection?: Maybe<PartCollections>;
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

export type DeleteStoreSettingInput = {
  where?: Maybe<InputId>;
};

export type DeleteStoreSettingPayload = {
  __typename?: 'deleteStoreSettingPayload';
  storeSetting?: Maybe<StoreSettings>;
};

export type DeleteUserInput = {
  where?: Maybe<InputId>;
};

export type DeleteUserPayload = {
  __typename?: 'deleteUserPayload';
  user?: Maybe<UsersPermissionsUser>;
};

export type EditBottomContextInput = {
  created_by?: Maybe<Scalars['ID']>;
  device_summary?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  published_at?: Maybe<Scalars['DateTime']>;
  subheading?: Maybe<Scalars['String']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditCollectionInput = {
  children?: Maybe<Array<Maybe<Scalars['ID']>>>;
  created_by?: Maybe<Scalars['ID']>;
  description?: Maybe<Scalars['String']>;
  filters?: Maybe<Scalars['String']>;
  handle?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['ID']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  metaDescription?: Maybe<Scalars['String']>;
  parent?: Maybe<Scalars['ID']>;
  published_at?: Maybe<Scalars['DateTime']>;
  sections: Array<Scalars['CollectionSectionsDynamicZoneInput']>;
  tagline?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditComponentCollectionBannerInput = {
  callToActionLabel?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type EditComponentCollectionFeaturedCollectionInput = {
  featuredCollection?: Maybe<Scalars['ID']>;
  id?: Maybe<Scalars['ID']>;
};

export type EditComponentCollectionFeaturedSubcollectionInput = {
  collections?: Maybe<Array<Maybe<Scalars['ID']>>>;
  id?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
};

export type EditComponentCollectionNewsletterFormInput = {
  callToActionLabel?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  inputPlaceholder?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type EditComponentCollectionRelatedPostInput = {
  id?: Maybe<Scalars['ID']>;
  tags?: Maybe<Scalars['String']>;
};

export type EditComponentMenuCollectionLinkInput = {
  id?: Maybe<Scalars['ID']>;
  linkedCollection?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
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

export type EditComponentSettingsFooterInput = {
  bottomMenu?: Maybe<Scalars['ID']>;
  id?: Maybe<Scalars['ID']>;
  menu1?: Maybe<Scalars['ID']>;
  menu2?: Maybe<Scalars['ID']>;
  partners?: Maybe<Scalars['ID']>;
};

export type EditComponentSettingsPartnerInput = {
  id?: Maybe<Scalars['ID']>;
  logo?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type EditComponentSettingsSocialInput = {
  facebook?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  instagram?: Maybe<Scalars['String']>;
  repairOrg?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
  youtube?: Maybe<Scalars['String']>;
};

export type EditComponentStoreShopifySettingInput = {
  id?: Maybe<Scalars['ID']>;
  storefrontAccessToken?: Maybe<Scalars['String']>;
  storefrontDomain?: Maybe<Scalars['String']>;
};

export type EditDeviceHandleInput = {
  created_by?: Maybe<Scalars['ID']>;
  handle?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditDeviceInput = {
  canonical_override?: Maybe<Scalars['String']>;
  created_by?: Maybe<Scalars['ID']>;
  device?: Maybe<Scalars['String']>;
  device_summary?: Maybe<Scalars['ID']>;
  faq_section?: Maybe<Scalars['ID']>;
  image?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  meta_description?: Maybe<Scalars['String']>;
  part_type?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  subheading?: Maybe<Scalars['String']>;
  summary?: Maybe<Scalars['String']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditFaqInput = {
  Answer?: Maybe<Scalars['String']>;
  Question?: Maybe<Scalars['String']>;
  created_by?: Maybe<Scalars['ID']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  published_at?: Maybe<Scalars['DateTime']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditFaqSectionInput = {
  created_by?: Maybe<Scalars['ID']>;
  faq1?: Maybe<Scalars['ID']>;
  faq2?: Maybe<Scalars['ID']>;
  faq3?: Maybe<Scalars['ID']>;
  heading?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  published_at?: Maybe<Scalars['DateTime']>;
  updated_by?: Maybe<Scalars['ID']>;
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

export type EditFunFactInput = {
  content?: Maybe<Scalars['String']>;
  created_by?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
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

export type EditPartCollectionInput = {
  created_by?: Maybe<Scalars['ID']>;
  details?: Maybe<Scalars['String']>;
  device_handle?: Maybe<Scalars['String']>;
  meta_description?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  summary?: Maybe<Scalars['String']>;
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
  currency?: Maybe<Scalars['String']>;
  footer?: Maybe<EditComponentSettingsFooterInput>;
  name?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  shopifySettings?: Maybe<EditComponentStoreShopifySettingInput>;
  socialMediaAccounts?: Maybe<EditComponentSettingsSocialInput>;
  store_settings?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
  url?: Maybe<Scalars['String']>;
};

export type EditStoreSettingInput = {
  created_by?: Maybe<Scalars['ID']>;
  footer?: Maybe<EditComponentSettingsFooterInput>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  published_at?: Maybe<Scalars['DateTime']>;
  socialMediaAccounts?: Maybe<EditComponentSettingsSocialInput>;
  store?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
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

export type UpdateBottomContextInput = {
  data?: Maybe<EditBottomContextInput>;
  where?: Maybe<InputId>;
};

export type UpdateBottomContextPayload = {
  __typename?: 'updateBottomContextPayload';
  bottomContext?: Maybe<BottomContext>;
};

export type UpdateCollectionInput = {
  data?: Maybe<EditCollectionInput>;
  where?: Maybe<InputId>;
};

export type UpdateCollectionPayload = {
  __typename?: 'updateCollectionPayload';
  collection?: Maybe<Collection>;
};

export type UpdateDeviceHandleInput = {
  data?: Maybe<EditDeviceHandleInput>;
  where?: Maybe<InputId>;
};

export type UpdateDeviceHandlePayload = {
  __typename?: 'updateDeviceHandlePayload';
  deviceHandle?: Maybe<DeviceHandle>;
};

export type UpdateDeviceInput = {
  data?: Maybe<EditDeviceInput>;
  where?: Maybe<InputId>;
};

export type UpdateDevicePayload = {
  __typename?: 'updateDevicePayload';
  device?: Maybe<Device>;
};

export type UpdateFaqInput = {
  data?: Maybe<EditFaqInput>;
  where?: Maybe<InputId>;
};

export type UpdateFaqPayload = {
  __typename?: 'updateFaqPayload';
  faq?: Maybe<Faq>;
};

export type UpdateFaqSectionInput = {
  data?: Maybe<EditFaqSectionInput>;
  where?: Maybe<InputId>;
};

export type UpdateFaqSectionPayload = {
  __typename?: 'updateFaqSectionPayload';
  faqSection?: Maybe<FaqSection>;
};

export type UpdateFunFactInput = {
  data?: Maybe<EditFunFactInput>;
  where?: Maybe<InputId>;
};

export type UpdateFunFactPayload = {
  __typename?: 'updateFunFactPayload';
  funFact?: Maybe<FunFacts>;
};

export type UpdateMenuInput = {
  data?: Maybe<EditMenuInput>;
  where?: Maybe<InputId>;
};

export type UpdateMenuPayload = {
  __typename?: 'updateMenuPayload';
  menu?: Maybe<Menu>;
};

export type UpdatePartCollectionInput = {
  data?: Maybe<EditPartCollectionInput>;
  where?: Maybe<InputId>;
};

export type UpdatePartCollectionPayload = {
  __typename?: 'updatePartCollectionPayload';
  partCollection?: Maybe<PartCollections>;
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

export type UpdateStoreSettingInput = {
  data?: Maybe<EditStoreSettingInput>;
  where?: Maybe<InputId>;
};

export type UpdateStoreSettingPayload = {
  __typename?: 'updateStoreSettingPayload';
  storeSetting?: Maybe<StoreSettings>;
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


export type GetCollectionPageDataQuery = { __typename?: 'Query', collections?: Maybe<Array<Maybe<{ __typename?: 'Collection', id: string, handle: string, title: string, tagline?: Maybe<string>, description: string, filters?: Maybe<string>, image?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }>, parent?: Maybe<{ __typename?: 'Collection', title: string, handle: string, parent?: Maybe<{ __typename?: 'Collection', title: string, handle: string, parent?: Maybe<{ __typename?: 'Collection', title: string, handle: string, parent?: Maybe<{ __typename?: 'Collection', title: string, handle: string }> }> }> }>, children?: Maybe<Array<Maybe<{ __typename?: 'Collection', handle: string, title: string, image?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> }>>>, sections: Array<Maybe<{ __typename: 'ComponentCollectionBanner', id: string, title: string, description: string, callToActionLabel: string, url: string } | { __typename: 'ComponentCollectionFeaturedCollection', id: string, featuredCollection?: Maybe<{ __typename?: 'Collection', handle: string, title: string, description: string, image?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> }> } | { __typename: 'ComponentCollectionFeaturedSubcollections', id: string, title: string, collections?: Maybe<Array<Maybe<{ __typename?: 'Collection', handle: string, title: string, description: string, image?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> }>>> } | { __typename: 'ComponentCollectionNewsletterForm', id: string, title: string, description: string, inputPlaceholder?: Maybe<string>, callToActionLabel: string } | { __typename: 'ComponentCollectionRelatedPosts', id: string, tags?: Maybe<string> }>> }>>>, stores?: Maybe<Array<Maybe<{ __typename?: 'Store', code: string, name: string, url: string, currency: string }>>>, currentStore?: Maybe<Array<Maybe<{ __typename?: 'Store', shopifySettings?: Maybe<{ __typename?: 'ComponentStoreShopifySettings', storefrontDomain: string, storefrontAccessToken: string }>, footer?: Maybe<{ __typename?: 'ComponentSettingsFooter', menu1?: Maybe<{ __typename?: 'Menu', items: Array<Maybe<{ __typename: 'ComponentMenuCollectionLink', name: string, linkedCollection?: Maybe<{ __typename?: 'Collection', handle: string }> } | { __typename: 'ComponentMenuLink', name: string, url: string } | { __typename: 'ComponentMenuLinkWithImage', name: string, url: string, image?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> }>> }>, menu2?: Maybe<{ __typename?: 'Menu', items: Array<Maybe<{ __typename: 'ComponentMenuCollectionLink', name: string, linkedCollection?: Maybe<{ __typename?: 'Collection', handle: string }> } | { __typename: 'ComponentMenuLink', name: string, url: string } | { __typename: 'ComponentMenuLinkWithImage', name: string, url: string, image?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> }>> }>, partners?: Maybe<{ __typename?: 'Menu', items: Array<Maybe<{ __typename: 'ComponentMenuCollectionLink', name: string, linkedCollection?: Maybe<{ __typename?: 'Collection', handle: string }> } | { __typename: 'ComponentMenuLink', name: string, url: string } | { __typename: 'ComponentMenuLinkWithImage', name: string, url: string, image?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> }>> }>, bottomMenu?: Maybe<{ __typename?: 'Menu', items: Array<Maybe<{ __typename: 'ComponentMenuCollectionLink', name: string, linkedCollection?: Maybe<{ __typename?: 'Collection', handle: string }> } | { __typename: 'ComponentMenuLink', name: string, url: string } | { __typename: 'ComponentMenuLinkWithImage', name: string, url: string, image?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> }>> }> }>, socialMediaAccounts?: Maybe<{ __typename?: 'ComponentSettingsSocial', twitter?: Maybe<string>, facebook?: Maybe<string>, instagram?: Maybe<string>, youtube?: Maybe<string>, repairOrg?: Maybe<string> }> }>>> };

export type LayoutPropsFragment = { __typename?: 'Query', stores?: Maybe<Array<Maybe<{ __typename?: 'Store', code: string, name: string, url: string, currency: string }>>>, currentStore?: Maybe<Array<Maybe<{ __typename?: 'Store', shopifySettings?: Maybe<{ __typename?: 'ComponentStoreShopifySettings', storefrontDomain: string, storefrontAccessToken: string }>, footer?: Maybe<{ __typename?: 'ComponentSettingsFooter', menu1?: Maybe<{ __typename?: 'Menu', items: Array<Maybe<{ __typename: 'ComponentMenuCollectionLink', name: string, linkedCollection?: Maybe<{ __typename?: 'Collection', handle: string }> } | { __typename: 'ComponentMenuLink', name: string, url: string } | { __typename: 'ComponentMenuLinkWithImage', name: string, url: string, image?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> }>> }>, menu2?: Maybe<{ __typename?: 'Menu', items: Array<Maybe<{ __typename: 'ComponentMenuCollectionLink', name: string, linkedCollection?: Maybe<{ __typename?: 'Collection', handle: string }> } | { __typename: 'ComponentMenuLink', name: string, url: string } | { __typename: 'ComponentMenuLinkWithImage', name: string, url: string, image?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> }>> }>, partners?: Maybe<{ __typename?: 'Menu', items: Array<Maybe<{ __typename: 'ComponentMenuCollectionLink', name: string, linkedCollection?: Maybe<{ __typename?: 'Collection', handle: string }> } | { __typename: 'ComponentMenuLink', name: string, url: string } | { __typename: 'ComponentMenuLinkWithImage', name: string, url: string, image?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> }>> }>, bottomMenu?: Maybe<{ __typename?: 'Menu', items: Array<Maybe<{ __typename: 'ComponentMenuCollectionLink', name: string, linkedCollection?: Maybe<{ __typename?: 'Collection', handle: string }> } | { __typename: 'ComponentMenuLink', name: string, url: string } | { __typename: 'ComponentMenuLinkWithImage', name: string, url: string, image?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> }>> }> }>, socialMediaAccounts?: Maybe<{ __typename?: 'ComponentSettingsSocial', twitter?: Maybe<string>, facebook?: Maybe<string>, instagram?: Maybe<string>, youtube?: Maybe<string>, repairOrg?: Maybe<string> }> }>>> };

export type MenuPropsFragment = { __typename?: 'Menu', items: Array<Maybe<{ __typename: 'ComponentMenuCollectionLink', name: string, linkedCollection?: Maybe<{ __typename?: 'Collection', handle: string }> } | { __typename: 'ComponentMenuLink', name: string, url: string } | { __typename: 'ComponentMenuLinkWithImage', name: string, url: string, image?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> }>> };

export const MenuPropsFragmentDoc = `
    fragment MenuProps on Menu {
  items {
    __typename
    ... on ComponentMenuLink {
      name
      url
    }
    ... on ComponentMenuCollectionLink {
      name
      linkedCollection {
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
  collections(limit: 1, where: $whereCollection) {
    id
    handle
    title
    tagline
    description
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
      ... on ComponentCollectionBanner {
        id
        title
        description
        callToActionLabel
        url
      }
      ... on ComponentCollectionRelatedPosts {
        id
        tags
      }
      ... on ComponentCollectionNewsletterForm {
        id
        title
        description
        inputPlaceholder
        callToActionLabel
      }
      ... on ComponentCollectionFeaturedCollection {
        id
        featuredCollection {
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
      ... on ComponentCollectionFeaturedSubcollections {
        id
        title
        collections(limit: 3) {
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