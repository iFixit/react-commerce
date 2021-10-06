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
  id: Scalars['ID'];
  username?: Maybe<Scalars['String']>;
  firstname: Scalars['String'];
  lastname: Scalars['String'];
};

export type BottomContext = {
  __typename?: 'BottomContext';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  subheading?: Maybe<Scalars['String']>;
  device_summary?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  localizations?: Maybe<Array<Maybe<BottomContext>>>;
};


export type BottomContextLocalizationsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
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
  values?: Maybe<Array<Maybe<BottomContext>>>;
  groupBy?: Maybe<BottomContextGroupBy>;
  aggregate?: Maybe<BottomContextAggregator>;
};

export type BottomContextConnectionCreated_At = {
  __typename?: 'BottomContextConnectionCreated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<BottomContextConnection>;
};

export type BottomContextConnectionDevice_Summary = {
  __typename?: 'BottomContextConnectionDevice_summary';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<BottomContextConnection>;
};

export type BottomContextConnectionId = {
  __typename?: 'BottomContextConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<BottomContextConnection>;
};

export type BottomContextConnectionLocale = {
  __typename?: 'BottomContextConnectionLocale';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<BottomContextConnection>;
};

export type BottomContextConnectionPublished_At = {
  __typename?: 'BottomContextConnectionPublished_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<BottomContextConnection>;
};

export type BottomContextConnectionSubheading = {
  __typename?: 'BottomContextConnectionSubheading';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<BottomContextConnection>;
};

export type BottomContextConnectionUpdated_At = {
  __typename?: 'BottomContextConnectionUpdated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<BottomContextConnection>;
};

export type BottomContextGroupBy = {
  __typename?: 'BottomContextGroupBy';
  id?: Maybe<Array<Maybe<BottomContextConnectionId>>>;
  created_at?: Maybe<Array<Maybe<BottomContextConnectionCreated_At>>>;
  updated_at?: Maybe<Array<Maybe<BottomContextConnectionUpdated_At>>>;
  subheading?: Maybe<Array<Maybe<BottomContextConnectionSubheading>>>;
  device_summary?: Maybe<Array<Maybe<BottomContextConnectionDevice_Summary>>>;
  locale?: Maybe<Array<Maybe<BottomContextConnectionLocale>>>;
  published_at?: Maybe<Array<Maybe<BottomContextConnectionPublished_At>>>;
};

export type BottomContextInput = {
  subheading?: Maybe<Scalars['String']>;
  device_summary?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type Collection = {
  __typename?: 'Collection';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  handle: Scalars['String'];
  title: Scalars['String'];
  description: Scalars['String'];
  image?: Maybe<UploadFile>;
  filters?: Maybe<Scalars['String']>;
  parent?: Maybe<Collection>;
  wiki_title_api_validated?: Maybe<Scalars['String']>;
  sections: Array<Maybe<CollectionSectionsDynamicZone>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  children?: Maybe<Array<Maybe<Collection>>>;
  localizations?: Maybe<Array<Maybe<Collection>>>;
};


export type CollectionChildrenArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type CollectionLocalizationsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
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
  values?: Maybe<Array<Maybe<Collection>>>;
  groupBy?: Maybe<CollectionGroupBy>;
  aggregate?: Maybe<CollectionAggregator>;
};

export type CollectionConnectionCreated_At = {
  __typename?: 'CollectionConnectionCreated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<CollectionConnection>;
};

export type CollectionConnectionDescription = {
  __typename?: 'CollectionConnectionDescription';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<CollectionConnection>;
};

export type CollectionConnectionFilters = {
  __typename?: 'CollectionConnectionFilters';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<CollectionConnection>;
};

export type CollectionConnectionHandle = {
  __typename?: 'CollectionConnectionHandle';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<CollectionConnection>;
};

export type CollectionConnectionId = {
  __typename?: 'CollectionConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<CollectionConnection>;
};

export type CollectionConnectionImage = {
  __typename?: 'CollectionConnectionImage';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<CollectionConnection>;
};

export type CollectionConnectionLocale = {
  __typename?: 'CollectionConnectionLocale';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<CollectionConnection>;
};

export type CollectionConnectionParent = {
  __typename?: 'CollectionConnectionParent';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<CollectionConnection>;
};

export type CollectionConnectionPublished_At = {
  __typename?: 'CollectionConnectionPublished_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<CollectionConnection>;
};

export type CollectionConnectionTitle = {
  __typename?: 'CollectionConnectionTitle';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<CollectionConnection>;
};

export type CollectionConnectionUpdated_At = {
  __typename?: 'CollectionConnectionUpdated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<CollectionConnection>;
};

export type CollectionConnectionWiki_Title_Api_Validated = {
  __typename?: 'CollectionConnectionWiki_title_api_validated';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<CollectionConnection>;
};

export type CollectionGroupBy = {
  __typename?: 'CollectionGroupBy';
  id?: Maybe<Array<Maybe<CollectionConnectionId>>>;
  created_at?: Maybe<Array<Maybe<CollectionConnectionCreated_At>>>;
  updated_at?: Maybe<Array<Maybe<CollectionConnectionUpdated_At>>>;
  handle?: Maybe<Array<Maybe<CollectionConnectionHandle>>>;
  title?: Maybe<Array<Maybe<CollectionConnectionTitle>>>;
  description?: Maybe<Array<Maybe<CollectionConnectionDescription>>>;
  image?: Maybe<Array<Maybe<CollectionConnectionImage>>>;
  filters?: Maybe<Array<Maybe<CollectionConnectionFilters>>>;
  parent?: Maybe<Array<Maybe<CollectionConnectionParent>>>;
  wiki_title_api_validated?: Maybe<Array<Maybe<CollectionConnectionWiki_Title_Api_Validated>>>;
  locale?: Maybe<Array<Maybe<CollectionConnectionLocale>>>;
  published_at?: Maybe<Array<Maybe<CollectionConnectionPublished_At>>>;
};

export type CollectionInput = {
  handle: Scalars['String'];
  title: Scalars['String'];
  description: Scalars['String'];
  image?: Maybe<Scalars['ID']>;
  filters?: Maybe<Scalars['String']>;
  parent?: Maybe<Scalars['ID']>;
  children?: Maybe<Array<Maybe<Scalars['ID']>>>;
  wiki_title_api_validated?: Maybe<Scalars['String']>;
  sections: Array<Scalars['CollectionSectionsDynamicZoneInput']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type CollectionSectionsDynamicZone = ComponentCollectionBanner | ComponentCollectionRelatedPosts | ComponentCollectionNewsletterForm | ComponentCollectionFeaturedCollection;

export type ComponentCollectionBanner = {
  __typename?: 'ComponentCollectionBanner';
  id: Scalars['ID'];
  title: Scalars['String'];
  description: Scalars['String'];
  callToActionLabel: Scalars['String'];
  url: Scalars['String'];
};

export type ComponentCollectionBannerInput = {
  title: Scalars['String'];
  description: Scalars['String'];
  callToActionLabel: Scalars['String'];
  url?: Maybe<Scalars['String']>;
};

export type ComponentCollectionFeaturedCollection = {
  __typename?: 'ComponentCollectionFeaturedCollection';
  id: Scalars['ID'];
  featuredCollection?: Maybe<Collection>;
};

export type ComponentCollectionFeaturedCollectionInput = {
  featuredCollection?: Maybe<Scalars['ID']>;
};

export type ComponentCollectionNewsletterForm = {
  __typename?: 'ComponentCollectionNewsletterForm';
  id: Scalars['ID'];
  title: Scalars['String'];
  description: Scalars['String'];
  inputPlaceholder?: Maybe<Scalars['String']>;
  callToActionLabel: Scalars['String'];
};

export type ComponentCollectionNewsletterFormInput = {
  title: Scalars['String'];
  description: Scalars['String'];
  inputPlaceholder?: Maybe<Scalars['String']>;
  callToActionLabel?: Maybe<Scalars['String']>;
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
  name: Scalars['String'];
  linkedCollection?: Maybe<Collection>;
};

export type ComponentMenuCollectionLinkInput = {
  name: Scalars['String'];
  linkedCollection?: Maybe<Scalars['ID']>;
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
  name: Scalars['String'];
  url: Scalars['String'];
  image?: Maybe<UploadFile>;
};

export type ComponentMenuLinkWithImageInput = {
  name: Scalars['String'];
  url: Scalars['String'];
  image?: Maybe<Scalars['ID']>;
};

export type ComponentSettingsFooter = {
  __typename?: 'ComponentSettingsFooter';
  id: Scalars['ID'];
  menu1?: Maybe<Menu>;
  menu2?: Maybe<Menu>;
  bottomMenu?: Maybe<Menu>;
  partners?: Maybe<Menu>;
};

export type ComponentSettingsFooterInput = {
  menu1?: Maybe<Scalars['ID']>;
  menu2?: Maybe<Scalars['ID']>;
  bottomMenu?: Maybe<Scalars['ID']>;
  partners?: Maybe<Scalars['ID']>;
};

export type ComponentSettingsPartner = {
  __typename?: 'ComponentSettingsPartner';
  id: Scalars['ID'];
  name: Scalars['String'];
  url: Scalars['String'];
  logo?: Maybe<UploadFile>;
};

export type ComponentSettingsPartnerInput = {
  name: Scalars['String'];
  url: Scalars['String'];
  logo?: Maybe<Scalars['ID']>;
};

export type ComponentSettingsSocial = {
  __typename?: 'ComponentSettingsSocial';
  id: Scalars['ID'];
  twitter?: Maybe<Scalars['String']>;
  facebook?: Maybe<Scalars['String']>;
  instagram?: Maybe<Scalars['String']>;
  youtube?: Maybe<Scalars['String']>;
  repairOrg?: Maybe<Scalars['String']>;
};

export type ComponentSettingsSocialInput = {
  twitter?: Maybe<Scalars['String']>;
  facebook?: Maybe<Scalars['String']>;
  instagram?: Maybe<Scalars['String']>;
  youtube?: Maybe<Scalars['String']>;
  repairOrg?: Maybe<Scalars['String']>;
};

export type ComponentStoreShopifySettingInput = {
  storefrontDomain: Scalars['String'];
  storefrontAccessToken: Scalars['String'];
};

export type ComponentStoreShopifySettings = {
  __typename?: 'ComponentStoreShopifySettings';
  id: Scalars['ID'];
  storefrontDomain: Scalars['String'];
  storefrontAccessToken: Scalars['String'];
};

export type Device = {
  __typename?: 'Device';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  device: Scalars['String'];
  part_type?: Maybe<Scalars['String']>;
  meta_description?: Maybe<Scalars['String']>;
  subheading?: Maybe<Scalars['String']>;
  summary?: Maybe<Scalars['String']>;
  canonical_override?: Maybe<Scalars['String']>;
  faq_section?: Maybe<FaqSection>;
  device_summary?: Maybe<BottomContext>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  image?: Maybe<Array<Maybe<UploadFile>>>;
  localizations?: Maybe<Array<Maybe<Device>>>;
};


export type DeviceImageArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type DeviceLocalizationsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
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
  values?: Maybe<Array<Maybe<Device>>>;
  groupBy?: Maybe<DeviceGroupBy>;
  aggregate?: Maybe<DeviceAggregator>;
};

export type DeviceConnectionCanonical_Override = {
  __typename?: 'DeviceConnectionCanonical_override';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<DeviceConnection>;
};

export type DeviceConnectionCreated_At = {
  __typename?: 'DeviceConnectionCreated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<DeviceConnection>;
};

export type DeviceConnectionDevice = {
  __typename?: 'DeviceConnectionDevice';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<DeviceConnection>;
};

export type DeviceConnectionDevice_Summary = {
  __typename?: 'DeviceConnectionDevice_summary';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<DeviceConnection>;
};

export type DeviceConnectionFaq_Section = {
  __typename?: 'DeviceConnectionFaq_section';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<DeviceConnection>;
};

export type DeviceConnectionId = {
  __typename?: 'DeviceConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<DeviceConnection>;
};

export type DeviceConnectionLocale = {
  __typename?: 'DeviceConnectionLocale';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<DeviceConnection>;
};

export type DeviceConnectionMeta_Description = {
  __typename?: 'DeviceConnectionMeta_description';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<DeviceConnection>;
};

export type DeviceConnectionPart_Type = {
  __typename?: 'DeviceConnectionPart_type';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<DeviceConnection>;
};

export type DeviceConnectionPublished_At = {
  __typename?: 'DeviceConnectionPublished_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<DeviceConnection>;
};

export type DeviceConnectionSubheading = {
  __typename?: 'DeviceConnectionSubheading';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<DeviceConnection>;
};

export type DeviceConnectionSummary = {
  __typename?: 'DeviceConnectionSummary';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<DeviceConnection>;
};

export type DeviceConnectionUpdated_At = {
  __typename?: 'DeviceConnectionUpdated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<DeviceConnection>;
};

export type DeviceGroupBy = {
  __typename?: 'DeviceGroupBy';
  id?: Maybe<Array<Maybe<DeviceConnectionId>>>;
  created_at?: Maybe<Array<Maybe<DeviceConnectionCreated_At>>>;
  updated_at?: Maybe<Array<Maybe<DeviceConnectionUpdated_At>>>;
  device?: Maybe<Array<Maybe<DeviceConnectionDevice>>>;
  part_type?: Maybe<Array<Maybe<DeviceConnectionPart_Type>>>;
  meta_description?: Maybe<Array<Maybe<DeviceConnectionMeta_Description>>>;
  subheading?: Maybe<Array<Maybe<DeviceConnectionSubheading>>>;
  summary?: Maybe<Array<Maybe<DeviceConnectionSummary>>>;
  canonical_override?: Maybe<Array<Maybe<DeviceConnectionCanonical_Override>>>;
  faq_section?: Maybe<Array<Maybe<DeviceConnectionFaq_Section>>>;
  device_summary?: Maybe<Array<Maybe<DeviceConnectionDevice_Summary>>>;
  locale?: Maybe<Array<Maybe<DeviceConnectionLocale>>>;
  published_at?: Maybe<Array<Maybe<DeviceConnectionPublished_At>>>;
};

export type DeviceHandle = {
  __typename?: 'DeviceHandle';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  handle: Scalars['String'];
  published_at?: Maybe<Scalars['DateTime']>;
};

export type DeviceHandleAggregator = {
  __typename?: 'DeviceHandleAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type DeviceHandleConnection = {
  __typename?: 'DeviceHandleConnection';
  values?: Maybe<Array<Maybe<DeviceHandle>>>;
  groupBy?: Maybe<DeviceHandleGroupBy>;
  aggregate?: Maybe<DeviceHandleAggregator>;
};

export type DeviceHandleConnectionCreated_At = {
  __typename?: 'DeviceHandleConnectionCreated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<DeviceHandleConnection>;
};

export type DeviceHandleConnectionHandle = {
  __typename?: 'DeviceHandleConnectionHandle';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<DeviceHandleConnection>;
};

export type DeviceHandleConnectionId = {
  __typename?: 'DeviceHandleConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<DeviceHandleConnection>;
};

export type DeviceHandleConnectionPublished_At = {
  __typename?: 'DeviceHandleConnectionPublished_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<DeviceHandleConnection>;
};

export type DeviceHandleConnectionUpdated_At = {
  __typename?: 'DeviceHandleConnectionUpdated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<DeviceHandleConnection>;
};

export type DeviceHandleGroupBy = {
  __typename?: 'DeviceHandleGroupBy';
  id?: Maybe<Array<Maybe<DeviceHandleConnectionId>>>;
  created_at?: Maybe<Array<Maybe<DeviceHandleConnectionCreated_At>>>;
  updated_at?: Maybe<Array<Maybe<DeviceHandleConnectionUpdated_At>>>;
  handle?: Maybe<Array<Maybe<DeviceHandleConnectionHandle>>>;
  published_at?: Maybe<Array<Maybe<DeviceHandleConnectionPublished_At>>>;
};

export type DeviceHandleInput = {
  handle: Scalars['String'];
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type DeviceInput = {
  device: Scalars['String'];
  part_type?: Maybe<Scalars['String']>;
  meta_description?: Maybe<Scalars['String']>;
  subheading?: Maybe<Scalars['String']>;
  summary?: Maybe<Scalars['String']>;
  image?: Maybe<Array<Maybe<Scalars['ID']>>>;
  canonical_override?: Maybe<Scalars['String']>;
  faq_section?: Maybe<Scalars['ID']>;
  device_summary?: Maybe<Scalars['ID']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type Faq = {
  __typename?: 'Faq';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  Question?: Maybe<Scalars['String']>;
  Answer?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  localizations?: Maybe<Array<Maybe<Faq>>>;
};


export type FaqLocalizationsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
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
  values?: Maybe<Array<Maybe<Faq>>>;
  groupBy?: Maybe<FaqGroupBy>;
  aggregate?: Maybe<FaqAggregator>;
};

export type FaqConnectionAnswer = {
  __typename?: 'FaqConnectionAnswer';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<FaqConnection>;
};

export type FaqConnectionCreated_At = {
  __typename?: 'FaqConnectionCreated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<FaqConnection>;
};

export type FaqConnectionId = {
  __typename?: 'FaqConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<FaqConnection>;
};

export type FaqConnectionLocale = {
  __typename?: 'FaqConnectionLocale';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<FaqConnection>;
};

export type FaqConnectionPublished_At = {
  __typename?: 'FaqConnectionPublished_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<FaqConnection>;
};

export type FaqConnectionQuestion = {
  __typename?: 'FaqConnectionQuestion';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<FaqConnection>;
};

export type FaqConnectionUpdated_At = {
  __typename?: 'FaqConnectionUpdated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<FaqConnection>;
};

export type FaqGroupBy = {
  __typename?: 'FaqGroupBy';
  id?: Maybe<Array<Maybe<FaqConnectionId>>>;
  created_at?: Maybe<Array<Maybe<FaqConnectionCreated_At>>>;
  updated_at?: Maybe<Array<Maybe<FaqConnectionUpdated_At>>>;
  Question?: Maybe<Array<Maybe<FaqConnectionQuestion>>>;
  Answer?: Maybe<Array<Maybe<FaqConnectionAnswer>>>;
  locale?: Maybe<Array<Maybe<FaqConnectionLocale>>>;
  published_at?: Maybe<Array<Maybe<FaqConnectionPublished_At>>>;
};

export type FaqInput = {
  Question?: Maybe<Scalars['String']>;
  Answer?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type FaqSection = {
  __typename?: 'FaqSection';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  heading?: Maybe<Scalars['String']>;
  faq1?: Maybe<Faq>;
  faq2?: Maybe<Faq>;
  faq3?: Maybe<Faq>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  localizations?: Maybe<Array<Maybe<FaqSection>>>;
};


export type FaqSectionLocalizationsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
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
  values?: Maybe<Array<Maybe<FaqSection>>>;
  groupBy?: Maybe<FaqSectionGroupBy>;
  aggregate?: Maybe<FaqSectionAggregator>;
};

export type FaqSectionConnectionCreated_At = {
  __typename?: 'FaqSectionConnectionCreated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<FaqSectionConnection>;
};

export type FaqSectionConnectionFaq1 = {
  __typename?: 'FaqSectionConnectionFaq1';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<FaqSectionConnection>;
};

export type FaqSectionConnectionFaq2 = {
  __typename?: 'FaqSectionConnectionFaq2';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<FaqSectionConnection>;
};

export type FaqSectionConnectionFaq3 = {
  __typename?: 'FaqSectionConnectionFaq3';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<FaqSectionConnection>;
};

export type FaqSectionConnectionHeading = {
  __typename?: 'FaqSectionConnectionHeading';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<FaqSectionConnection>;
};

export type FaqSectionConnectionId = {
  __typename?: 'FaqSectionConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<FaqSectionConnection>;
};

export type FaqSectionConnectionLocale = {
  __typename?: 'FaqSectionConnectionLocale';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<FaqSectionConnection>;
};

export type FaqSectionConnectionPublished_At = {
  __typename?: 'FaqSectionConnectionPublished_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<FaqSectionConnection>;
};

export type FaqSectionConnectionUpdated_At = {
  __typename?: 'FaqSectionConnectionUpdated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<FaqSectionConnection>;
};

export type FaqSectionGroupBy = {
  __typename?: 'FaqSectionGroupBy';
  id?: Maybe<Array<Maybe<FaqSectionConnectionId>>>;
  created_at?: Maybe<Array<Maybe<FaqSectionConnectionCreated_At>>>;
  updated_at?: Maybe<Array<Maybe<FaqSectionConnectionUpdated_At>>>;
  heading?: Maybe<Array<Maybe<FaqSectionConnectionHeading>>>;
  faq1?: Maybe<Array<Maybe<FaqSectionConnectionFaq1>>>;
  faq2?: Maybe<Array<Maybe<FaqSectionConnectionFaq2>>>;
  faq3?: Maybe<Array<Maybe<FaqSectionConnectionFaq3>>>;
  locale?: Maybe<Array<Maybe<FaqSectionConnectionLocale>>>;
  published_at?: Maybe<Array<Maybe<FaqSectionConnectionPublished_At>>>;
};

export type FaqSectionInput = {
  heading?: Maybe<Scalars['String']>;
  faq1?: Maybe<Scalars['ID']>;
  faq2?: Maybe<Scalars['ID']>;
  faq3?: Maybe<Scalars['ID']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type FileInfoInput = {
  name?: Maybe<Scalars['String']>;
  alternativeText?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
};

export type FileInput = {
  name: Scalars['String'];
  alternativeText?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  formats?: Maybe<Scalars['JSON']>;
  hash: Scalars['String'];
  ext?: Maybe<Scalars['String']>;
  mime: Scalars['String'];
  size: Scalars['Float'];
  url: Scalars['String'];
  previewUrl?: Maybe<Scalars['String']>;
  provider: Scalars['String'];
  provider_metadata?: Maybe<Scalars['JSON']>;
  related?: Maybe<Array<Maybe<Scalars['ID']>>>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type FunFactInput = {
  title: Scalars['String'];
  content?: Maybe<Scalars['String']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type FunFacts = {
  __typename?: 'FunFacts';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  title: Scalars['String'];
  content?: Maybe<Scalars['String']>;
};

export type FunFactsAggregator = {
  __typename?: 'FunFactsAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type FunFactsConnection = {
  __typename?: 'FunFactsConnection';
  values?: Maybe<Array<Maybe<FunFacts>>>;
  groupBy?: Maybe<FunFactsGroupBy>;
  aggregate?: Maybe<FunFactsAggregator>;
};

export type FunFactsConnectionContent = {
  __typename?: 'FunFactsConnectionContent';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<FunFactsConnection>;
};

export type FunFactsConnectionCreated_At = {
  __typename?: 'FunFactsConnectionCreated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<FunFactsConnection>;
};

export type FunFactsConnectionId = {
  __typename?: 'FunFactsConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<FunFactsConnection>;
};

export type FunFactsConnectionTitle = {
  __typename?: 'FunFactsConnectionTitle';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<FunFactsConnection>;
};

export type FunFactsConnectionUpdated_At = {
  __typename?: 'FunFactsConnectionUpdated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<FunFactsConnection>;
};

export type FunFactsGroupBy = {
  __typename?: 'FunFactsGroupBy';
  id?: Maybe<Array<Maybe<FunFactsConnectionId>>>;
  created_at?: Maybe<Array<Maybe<FunFactsConnectionCreated_At>>>;
  updated_at?: Maybe<Array<Maybe<FunFactsConnectionUpdated_At>>>;
  title?: Maybe<Array<Maybe<FunFactsConnectionTitle>>>;
  content?: Maybe<Array<Maybe<FunFactsConnectionContent>>>;
};

export type I18NLocale = {
  __typename?: 'I18NLocale';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  name?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
};

export type InputId = {
  id: Scalars['ID'];
};

export type LocaleInput = {
  name?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type Menu = {
  __typename?: 'Menu';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  items: Array<Maybe<MenuItemsDynamicZone>>;
  title: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  localizations?: Maybe<Array<Maybe<Menu>>>;
};


export type MenuLocalizationsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
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
  values?: Maybe<Array<Maybe<Menu>>>;
  groupBy?: Maybe<MenuGroupBy>;
  aggregate?: Maybe<MenuAggregator>;
};

export type MenuConnectionCreated_At = {
  __typename?: 'MenuConnectionCreated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<MenuConnection>;
};

export type MenuConnectionId = {
  __typename?: 'MenuConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<MenuConnection>;
};

export type MenuConnectionLocale = {
  __typename?: 'MenuConnectionLocale';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<MenuConnection>;
};

export type MenuConnectionPublished_At = {
  __typename?: 'MenuConnectionPublished_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<MenuConnection>;
};

export type MenuConnectionTitle = {
  __typename?: 'MenuConnectionTitle';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<MenuConnection>;
};

export type MenuConnectionUpdated_At = {
  __typename?: 'MenuConnectionUpdated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<MenuConnection>;
};

export type MenuGroupBy = {
  __typename?: 'MenuGroupBy';
  id?: Maybe<Array<Maybe<MenuConnectionId>>>;
  created_at?: Maybe<Array<Maybe<MenuConnectionCreated_At>>>;
  updated_at?: Maybe<Array<Maybe<MenuConnectionUpdated_At>>>;
  title?: Maybe<Array<Maybe<MenuConnectionTitle>>>;
  locale?: Maybe<Array<Maybe<MenuConnectionLocale>>>;
  published_at?: Maybe<Array<Maybe<MenuConnectionPublished_At>>>;
};

export type MenuInput = {
  items: Array<Scalars['MenuItemsDynamicZoneInput']>;
  title: Scalars['String'];
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type MenuItemsDynamicZone = ComponentMenuLink | ComponentMenuCollectionLink | ComponentMenuLinkWithImage;

export type Morph = UsersPermissionsMe | UsersPermissionsMeRole | UsersPermissionsLoginPayload | UserPermissionsPasswordPayload | BottomContext | BottomContextConnection | BottomContextAggregator | BottomContextGroupBy | BottomContextConnectionId | BottomContextConnectionCreated_At | BottomContextConnectionUpdated_At | BottomContextConnectionSubheading | BottomContextConnectionDevice_Summary | BottomContextConnectionLocale | BottomContextConnectionPublished_At | CreateBottomContextPayload | UpdateBottomContextPayload | DeleteBottomContextPayload | Collection | CollectionConnection | CollectionAggregator | CollectionGroupBy | CollectionConnectionId | CollectionConnectionCreated_At | CollectionConnectionUpdated_At | CollectionConnectionHandle | CollectionConnectionTitle | CollectionConnectionDescription | CollectionConnectionImage | CollectionConnectionFilters | CollectionConnectionParent | CollectionConnectionWiki_Title_Api_Validated | CollectionConnectionLocale | CollectionConnectionPublished_At | CreateCollectionPayload | UpdateCollectionPayload | DeleteCollectionPayload | DeviceHandle | DeviceHandleConnection | DeviceHandleAggregator | DeviceHandleGroupBy | DeviceHandleConnectionId | DeviceHandleConnectionCreated_At | DeviceHandleConnectionUpdated_At | DeviceHandleConnectionHandle | DeviceHandleConnectionPublished_At | CreateDeviceHandlePayload | UpdateDeviceHandlePayload | DeleteDeviceHandlePayload | Device | DeviceConnection | DeviceAggregator | DeviceGroupBy | DeviceConnectionId | DeviceConnectionCreated_At | DeviceConnectionUpdated_At | DeviceConnectionDevice | DeviceConnectionPart_Type | DeviceConnectionMeta_Description | DeviceConnectionSubheading | DeviceConnectionSummary | DeviceConnectionCanonical_Override | DeviceConnectionFaq_Section | DeviceConnectionDevice_Summary | DeviceConnectionLocale | DeviceConnectionPublished_At | CreateDevicePayload | UpdateDevicePayload | DeleteDevicePayload | FaqSection | FaqSectionConnection | FaqSectionAggregator | FaqSectionGroupBy | FaqSectionConnectionId | FaqSectionConnectionCreated_At | FaqSectionConnectionUpdated_At | FaqSectionConnectionHeading | FaqSectionConnectionFaq1 | FaqSectionConnectionFaq2 | FaqSectionConnectionFaq3 | FaqSectionConnectionLocale | FaqSectionConnectionPublished_At | CreateFaqSectionPayload | UpdateFaqSectionPayload | DeleteFaqSectionPayload | Faq | FaqConnection | FaqAggregator | FaqGroupBy | FaqConnectionId | FaqConnectionCreated_At | FaqConnectionUpdated_At | FaqConnectionQuestion | FaqConnectionAnswer | FaqConnectionLocale | FaqConnectionPublished_At | CreateFaqPayload | UpdateFaqPayload | DeleteFaqPayload | FunFacts | FunFactsConnection | FunFactsAggregator | FunFactsGroupBy | FunFactsConnectionId | FunFactsConnectionCreated_At | FunFactsConnectionUpdated_At | FunFactsConnectionTitle | FunFactsConnectionContent | CreateFunFactPayload | UpdateFunFactPayload | DeleteFunFactPayload | Menu | MenuConnection | MenuAggregator | MenuGroupBy | MenuConnectionId | MenuConnectionCreated_At | MenuConnectionUpdated_At | MenuConnectionTitle | MenuConnectionLocale | MenuConnectionPublished_At | CreateMenuPayload | UpdateMenuPayload | DeleteMenuPayload | PartCollections | PartCollectionsConnection | PartCollectionsAggregator | PartCollectionsGroupBy | PartCollectionsConnectionId | PartCollectionsConnectionCreated_At | PartCollectionsConnectionUpdated_At | PartCollectionsConnectionTitle | PartCollectionsConnectionMeta_Description | PartCollectionsConnectionDetails | PartCollectionsConnectionSummary | PartCollectionsConnectionDevice_Handle | PartCollectionsConnectionPublished_At | CreatePartCollectionPayload | UpdatePartCollectionPayload | DeletePartCollectionPayload | StoreSettings | StoreSettingsConnection | StoreSettingsAggregator | StoreSettingsGroupBy | StoreSettingsConnectionId | StoreSettingsConnectionCreated_At | StoreSettingsConnectionUpdated_At | StoreSettingsConnectionFooter | StoreSettingsConnectionSocialMediaAccounts | StoreSettingsConnectionStore | StoreSettingsConnectionLocale | StoreSettingsConnectionPublished_At | CreateStoreSettingPayload | UpdateStoreSettingPayload | DeleteStoreSettingPayload | Store | StoreConnection | StoreAggregator | StoreGroupBy | StoreConnectionId | StoreConnectionCreated_At | StoreConnectionUpdated_At | StoreConnectionCode | StoreConnectionName | StoreConnectionUrl | StoreConnectionCurrency | StoreConnectionStore_Settings | StoreConnectionShopifySettings | StoreConnectionFooter | StoreConnectionSocialMediaAccounts | StoreConnectionPublished_At | CreateStorePayload | UpdateStorePayload | DeleteStorePayload | I18NLocale | UploadFile | UploadFileConnection | UploadFileAggregator | UploadFileAggregatorSum | UploadFileAggregatorAvg | UploadFileAggregatorMin | UploadFileAggregatorMax | UploadFileGroupBy | UploadFileConnectionId | UploadFileConnectionCreated_At | UploadFileConnectionUpdated_At | UploadFileConnectionName | UploadFileConnectionAlternativeText | UploadFileConnectionCaption | UploadFileConnectionWidth | UploadFileConnectionHeight | UploadFileConnectionFormats | UploadFileConnectionHash | UploadFileConnectionExt | UploadFileConnectionMime | UploadFileConnectionSize | UploadFileConnectionUrl | UploadFileConnectionPreviewUrl | UploadFileConnectionProvider | UploadFileConnectionProvider_Metadata | DeleteFilePayload | UsersPermissionsPermission | UsersPermissionsRole | UsersPermissionsRoleConnection | UsersPermissionsRoleAggregator | UsersPermissionsRoleGroupBy | UsersPermissionsRoleConnectionId | UsersPermissionsRoleConnectionName | UsersPermissionsRoleConnectionDescription | UsersPermissionsRoleConnectionType | CreateRolePayload | UpdateRolePayload | DeleteRolePayload | UsersPermissionsUser | UsersPermissionsUserConnection | UsersPermissionsUserAggregator | UsersPermissionsUserGroupBy | UsersPermissionsUserConnectionId | UsersPermissionsUserConnectionCreated_At | UsersPermissionsUserConnectionUpdated_At | UsersPermissionsUserConnectionUsername | UsersPermissionsUserConnectionEmail | UsersPermissionsUserConnectionProvider | UsersPermissionsUserConnectionConfirmed | UsersPermissionsUserConnectionBlocked | UsersPermissionsUserConnectionRole | CreateUserPayload | UpdateUserPayload | DeleteUserPayload | ComponentCollectionBanner | ComponentCollectionFeaturedCollection | ComponentCollectionNewsletterForm | ComponentCollectionRelatedPosts | ComponentMenuCollectionLink | ComponentMenuLinkWithImage | ComponentMenuLink | ComponentSettingsFooter | ComponentSettingsPartner | ComponentSettingsSocial | ComponentStoreShopifySettings;

export type Mutation = {
  __typename?: 'Mutation';
  createBottomContext?: Maybe<CreateBottomContextPayload>;
  updateBottomContext?: Maybe<UpdateBottomContextPayload>;
  deleteBottomContext?: Maybe<DeleteBottomContextPayload>;
  createCollection?: Maybe<CreateCollectionPayload>;
  updateCollection?: Maybe<UpdateCollectionPayload>;
  deleteCollection?: Maybe<DeleteCollectionPayload>;
  createDeviceHandle?: Maybe<CreateDeviceHandlePayload>;
  updateDeviceHandle?: Maybe<UpdateDeviceHandlePayload>;
  deleteDeviceHandle?: Maybe<DeleteDeviceHandlePayload>;
  createDevice?: Maybe<CreateDevicePayload>;
  updateDevice?: Maybe<UpdateDevicePayload>;
  deleteDevice?: Maybe<DeleteDevicePayload>;
  createFaqSection?: Maybe<CreateFaqSectionPayload>;
  updateFaqSection?: Maybe<UpdateFaqSectionPayload>;
  deleteFaqSection?: Maybe<DeleteFaqSectionPayload>;
  createFaq?: Maybe<CreateFaqPayload>;
  updateFaq?: Maybe<UpdateFaqPayload>;
  deleteFaq?: Maybe<DeleteFaqPayload>;
  createFunFact?: Maybe<CreateFunFactPayload>;
  updateFunFact?: Maybe<UpdateFunFactPayload>;
  deleteFunFact?: Maybe<DeleteFunFactPayload>;
  createMenu?: Maybe<CreateMenuPayload>;
  updateMenu?: Maybe<UpdateMenuPayload>;
  deleteMenu?: Maybe<DeleteMenuPayload>;
  createPartCollection?: Maybe<CreatePartCollectionPayload>;
  updatePartCollection?: Maybe<UpdatePartCollectionPayload>;
  deletePartCollection?: Maybe<DeletePartCollectionPayload>;
  createStoreSetting?: Maybe<CreateStoreSettingPayload>;
  updateStoreSetting?: Maybe<UpdateStoreSettingPayload>;
  deleteStoreSetting?: Maybe<DeleteStoreSettingPayload>;
  createStore?: Maybe<CreateStorePayload>;
  updateStore?: Maybe<UpdateStorePayload>;
  deleteStore?: Maybe<DeleteStorePayload>;
  /** Delete one file */
  deleteFile?: Maybe<DeleteFilePayload>;
  /** Create a new role */
  createRole?: Maybe<CreateRolePayload>;
  /** Update an existing role */
  updateRole?: Maybe<UpdateRolePayload>;
  /** Delete an existing role */
  deleteRole?: Maybe<DeleteRolePayload>;
  /** Create a new user */
  createUser?: Maybe<CreateUserPayload>;
  /** Update an existing user */
  updateUser?: Maybe<UpdateUserPayload>;
  /** Delete an existing user */
  deleteUser?: Maybe<DeleteUserPayload>;
  createBottomContextLocalization: BottomContext;
  createCollectionLocalization: Collection;
  createDeviceLocalization: Device;
  createFaqSectionLocalization: FaqSection;
  createFaqLocalization: Faq;
  createMenuLocalization: Menu;
  createStoreSettingLocalization: StoreSettings;
  upload: UploadFile;
  multipleUpload: Array<Maybe<UploadFile>>;
  updateFileInfo: UploadFile;
  login: UsersPermissionsLoginPayload;
  register: UsersPermissionsLoginPayload;
  forgotPassword?: Maybe<UserPermissionsPasswordPayload>;
  resetPassword?: Maybe<UsersPermissionsLoginPayload>;
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
};


export type MutationCreateBottomContextArgs = {
  input?: Maybe<CreateBottomContextInput>;
};


export type MutationUpdateBottomContextArgs = {
  input?: Maybe<UpdateBottomContextInput>;
};


export type MutationDeleteBottomContextArgs = {
  input?: Maybe<DeleteBottomContextInput>;
};


export type MutationCreateCollectionArgs = {
  input?: Maybe<CreateCollectionInput>;
};


export type MutationUpdateCollectionArgs = {
  input?: Maybe<UpdateCollectionInput>;
};


export type MutationDeleteCollectionArgs = {
  input?: Maybe<DeleteCollectionInput>;
};


export type MutationCreateDeviceHandleArgs = {
  input?: Maybe<CreateDeviceHandleInput>;
};


export type MutationUpdateDeviceHandleArgs = {
  input?: Maybe<UpdateDeviceHandleInput>;
};


export type MutationDeleteDeviceHandleArgs = {
  input?: Maybe<DeleteDeviceHandleInput>;
};


export type MutationCreateDeviceArgs = {
  input?: Maybe<CreateDeviceInput>;
};


export type MutationUpdateDeviceArgs = {
  input?: Maybe<UpdateDeviceInput>;
};


export type MutationDeleteDeviceArgs = {
  input?: Maybe<DeleteDeviceInput>;
};


export type MutationCreateFaqSectionArgs = {
  input?: Maybe<CreateFaqSectionInput>;
};


export type MutationUpdateFaqSectionArgs = {
  input?: Maybe<UpdateFaqSectionInput>;
};


export type MutationDeleteFaqSectionArgs = {
  input?: Maybe<DeleteFaqSectionInput>;
};


export type MutationCreateFaqArgs = {
  input?: Maybe<CreateFaqInput>;
};


export type MutationUpdateFaqArgs = {
  input?: Maybe<UpdateFaqInput>;
};


export type MutationDeleteFaqArgs = {
  input?: Maybe<DeleteFaqInput>;
};


export type MutationCreateFunFactArgs = {
  input?: Maybe<CreateFunFactInput>;
};


export type MutationUpdateFunFactArgs = {
  input?: Maybe<UpdateFunFactInput>;
};


export type MutationDeleteFunFactArgs = {
  input?: Maybe<DeleteFunFactInput>;
};


export type MutationCreateMenuArgs = {
  input?: Maybe<CreateMenuInput>;
};


export type MutationUpdateMenuArgs = {
  input?: Maybe<UpdateMenuInput>;
};


export type MutationDeleteMenuArgs = {
  input?: Maybe<DeleteMenuInput>;
};


export type MutationCreatePartCollectionArgs = {
  input?: Maybe<CreatePartCollectionInput>;
};


export type MutationUpdatePartCollectionArgs = {
  input?: Maybe<UpdatePartCollectionInput>;
};


export type MutationDeletePartCollectionArgs = {
  input?: Maybe<DeletePartCollectionInput>;
};


export type MutationCreateStoreSettingArgs = {
  input?: Maybe<CreateStoreSettingInput>;
};


export type MutationUpdateStoreSettingArgs = {
  input?: Maybe<UpdateStoreSettingInput>;
};


export type MutationDeleteStoreSettingArgs = {
  input?: Maybe<DeleteStoreSettingInput>;
};


export type MutationCreateStoreArgs = {
  input?: Maybe<CreateStoreInput>;
};


export type MutationUpdateStoreArgs = {
  input?: Maybe<UpdateStoreInput>;
};


export type MutationDeleteStoreArgs = {
  input?: Maybe<DeleteStoreInput>;
};


export type MutationDeleteFileArgs = {
  input?: Maybe<DeleteFileInput>;
};


export type MutationCreateRoleArgs = {
  input?: Maybe<CreateRoleInput>;
};


export type MutationUpdateRoleArgs = {
  input?: Maybe<UpdateRoleInput>;
};


export type MutationDeleteRoleArgs = {
  input?: Maybe<DeleteRoleInput>;
};


export type MutationCreateUserArgs = {
  input?: Maybe<CreateUserInput>;
};


export type MutationUpdateUserArgs = {
  input?: Maybe<UpdateUserInput>;
};


export type MutationDeleteUserArgs = {
  input?: Maybe<DeleteUserInput>;
};


export type MutationCreateBottomContextLocalizationArgs = {
  input: UpdateBottomContextInput;
};


export type MutationCreateCollectionLocalizationArgs = {
  input: UpdateCollectionInput;
};


export type MutationCreateDeviceLocalizationArgs = {
  input: UpdateDeviceInput;
};


export type MutationCreateFaqSectionLocalizationArgs = {
  input: UpdateFaqSectionInput;
};


export type MutationCreateFaqLocalizationArgs = {
  input: UpdateFaqInput;
};


export type MutationCreateMenuLocalizationArgs = {
  input: UpdateMenuInput;
};


export type MutationCreateStoreSettingLocalizationArgs = {
  input: UpdateStoreSettingInput;
};


export type MutationUploadArgs = {
  refId?: Maybe<Scalars['ID']>;
  ref?: Maybe<Scalars['String']>;
  field?: Maybe<Scalars['String']>;
  source?: Maybe<Scalars['String']>;
  info?: Maybe<FileInfoInput>;
  file: Scalars['Upload'];
};


export type MutationMultipleUploadArgs = {
  refId?: Maybe<Scalars['ID']>;
  ref?: Maybe<Scalars['String']>;
  field?: Maybe<Scalars['String']>;
  source?: Maybe<Scalars['String']>;
  files: Array<Maybe<Scalars['Upload']>>;
};


export type MutationUpdateFileInfoArgs = {
  id: Scalars['ID'];
  info: FileInfoInput;
};


export type MutationLoginArgs = {
  input: UsersPermissionsLoginInput;
};


export type MutationRegisterArgs = {
  input: UsersPermissionsRegisterInput;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
  code: Scalars['String'];
};


export type MutationEmailConfirmationArgs = {
  confirmation: Scalars['String'];
};

export type PartCollectionInput = {
  title: Scalars['String'];
  meta_description?: Maybe<Scalars['String']>;
  details?: Maybe<Scalars['String']>;
  summary?: Maybe<Scalars['String']>;
  device_handle: Scalars['String'];
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type PartCollections = {
  __typename?: 'PartCollections';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  title: Scalars['String'];
  meta_description?: Maybe<Scalars['String']>;
  details?: Maybe<Scalars['String']>;
  summary?: Maybe<Scalars['String']>;
  device_handle: Scalars['String'];
  published_at?: Maybe<Scalars['DateTime']>;
};

export type PartCollectionsAggregator = {
  __typename?: 'PartCollectionsAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type PartCollectionsConnection = {
  __typename?: 'PartCollectionsConnection';
  values?: Maybe<Array<Maybe<PartCollections>>>;
  groupBy?: Maybe<PartCollectionsGroupBy>;
  aggregate?: Maybe<PartCollectionsAggregator>;
};

export type PartCollectionsConnectionCreated_At = {
  __typename?: 'PartCollectionsConnectionCreated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<PartCollectionsConnection>;
};

export type PartCollectionsConnectionDetails = {
  __typename?: 'PartCollectionsConnectionDetails';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<PartCollectionsConnection>;
};

export type PartCollectionsConnectionDevice_Handle = {
  __typename?: 'PartCollectionsConnectionDevice_handle';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<PartCollectionsConnection>;
};

export type PartCollectionsConnectionId = {
  __typename?: 'PartCollectionsConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<PartCollectionsConnection>;
};

export type PartCollectionsConnectionMeta_Description = {
  __typename?: 'PartCollectionsConnectionMeta_description';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<PartCollectionsConnection>;
};

export type PartCollectionsConnectionPublished_At = {
  __typename?: 'PartCollectionsConnectionPublished_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<PartCollectionsConnection>;
};

export type PartCollectionsConnectionSummary = {
  __typename?: 'PartCollectionsConnectionSummary';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<PartCollectionsConnection>;
};

export type PartCollectionsConnectionTitle = {
  __typename?: 'PartCollectionsConnectionTitle';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<PartCollectionsConnection>;
};

export type PartCollectionsConnectionUpdated_At = {
  __typename?: 'PartCollectionsConnectionUpdated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<PartCollectionsConnection>;
};

export type PartCollectionsGroupBy = {
  __typename?: 'PartCollectionsGroupBy';
  id?: Maybe<Array<Maybe<PartCollectionsConnectionId>>>;
  created_at?: Maybe<Array<Maybe<PartCollectionsConnectionCreated_At>>>;
  updated_at?: Maybe<Array<Maybe<PartCollectionsConnectionUpdated_At>>>;
  title?: Maybe<Array<Maybe<PartCollectionsConnectionTitle>>>;
  meta_description?: Maybe<Array<Maybe<PartCollectionsConnectionMeta_Description>>>;
  details?: Maybe<Array<Maybe<PartCollectionsConnectionDetails>>>;
  summary?: Maybe<Array<Maybe<PartCollectionsConnectionSummary>>>;
  device_handle?: Maybe<Array<Maybe<PartCollectionsConnectionDevice_Handle>>>;
  published_at?: Maybe<Array<Maybe<PartCollectionsConnectionPublished_At>>>;
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
  deviceHandle?: Maybe<DeviceHandle>;
  deviceHandles?: Maybe<Array<Maybe<DeviceHandle>>>;
  deviceHandlesConnection?: Maybe<DeviceHandleConnection>;
  device?: Maybe<Device>;
  devices?: Maybe<Array<Maybe<Device>>>;
  devicesConnection?: Maybe<DeviceConnection>;
  faqSection?: Maybe<FaqSection>;
  faqSections?: Maybe<Array<Maybe<FaqSection>>>;
  faqSectionsConnection?: Maybe<FaqSectionConnection>;
  faq?: Maybe<Faq>;
  faqs?: Maybe<Array<Maybe<Faq>>>;
  faqsConnection?: Maybe<FaqConnection>;
  funFact?: Maybe<FunFacts>;
  funFacts?: Maybe<Array<Maybe<FunFacts>>>;
  funFactsConnection?: Maybe<FunFactsConnection>;
  menu?: Maybe<Menu>;
  menus?: Maybe<Array<Maybe<Menu>>>;
  menusConnection?: Maybe<MenuConnection>;
  partCollection?: Maybe<PartCollections>;
  partCollections?: Maybe<Array<Maybe<PartCollections>>>;
  partCollectionsConnection?: Maybe<PartCollectionsConnection>;
  storeSetting?: Maybe<StoreSettings>;
  storeSettings?: Maybe<Array<Maybe<StoreSettings>>>;
  storeSettingsConnection?: Maybe<StoreSettingsConnection>;
  store?: Maybe<Store>;
  stores?: Maybe<Array<Maybe<Store>>>;
  storesConnection?: Maybe<StoreConnection>;
  files?: Maybe<Array<Maybe<UploadFile>>>;
  filesConnection?: Maybe<UploadFileConnection>;
  role?: Maybe<UsersPermissionsRole>;
  /** Retrieve all the existing roles. You can't apply filters on this query. */
  roles?: Maybe<Array<Maybe<UsersPermissionsRole>>>;
  rolesConnection?: Maybe<UsersPermissionsRoleConnection>;
  user?: Maybe<UsersPermissionsUser>;
  users?: Maybe<Array<Maybe<UsersPermissionsUser>>>;
  usersConnection?: Maybe<UsersPermissionsUserConnection>;
  me?: Maybe<UsersPermissionsMe>;
};


export type QueryBottomContextArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryBottomContextsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryBottomContextsConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryCollectionArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryCollectionsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryCollectionsConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryDeviceHandleArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryDeviceHandlesArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
};


export type QueryDeviceHandlesConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryDeviceArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryDevicesArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryDevicesConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryFaqSectionArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryFaqSectionsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryFaqSectionsConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryFaqArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryFaqsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryFaqsConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryFunFactArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryFunFactsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
};


export type QueryFunFactsConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryMenuArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryMenusArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryMenusConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryPartCollectionArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryPartCollectionsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
};


export type QueryPartCollectionsConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryStoreSettingArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryStoreSettingsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryStoreSettingsConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryStoreArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryStoresArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
};


export type QueryStoresConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryFilesArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
};


export type QueryFilesConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryRoleArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryRolesArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
};


export type QueryRolesConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryUsersArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
};


export type QueryUsersConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type RoleInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  permissions?: Maybe<Array<Maybe<Scalars['ID']>>>;
  users?: Maybe<Array<Maybe<Scalars['ID']>>>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type Store = {
  __typename?: 'Store';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  code: Scalars['String'];
  name: Scalars['String'];
  url: Scalars['String'];
  currency: Scalars['String'];
  store_settings?: Maybe<StoreSettings>;
  shopifySettings?: Maybe<ComponentStoreShopifySettings>;
  footer?: Maybe<ComponentSettingsFooter>;
  socialMediaAccounts?: Maybe<ComponentSettingsSocial>;
  published_at?: Maybe<Scalars['DateTime']>;
};

export type StoreAggregator = {
  __typename?: 'StoreAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type StoreConnection = {
  __typename?: 'StoreConnection';
  values?: Maybe<Array<Maybe<Store>>>;
  groupBy?: Maybe<StoreGroupBy>;
  aggregate?: Maybe<StoreAggregator>;
};

export type StoreConnectionCode = {
  __typename?: 'StoreConnectionCode';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<StoreConnection>;
};

export type StoreConnectionCreated_At = {
  __typename?: 'StoreConnectionCreated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<StoreConnection>;
};

export type StoreConnectionCurrency = {
  __typename?: 'StoreConnectionCurrency';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<StoreConnection>;
};

export type StoreConnectionFooter = {
  __typename?: 'StoreConnectionFooter';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<StoreConnection>;
};

export type StoreConnectionId = {
  __typename?: 'StoreConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<StoreConnection>;
};

export type StoreConnectionName = {
  __typename?: 'StoreConnectionName';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<StoreConnection>;
};

export type StoreConnectionPublished_At = {
  __typename?: 'StoreConnectionPublished_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<StoreConnection>;
};

export type StoreConnectionShopifySettings = {
  __typename?: 'StoreConnectionShopifySettings';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<StoreConnection>;
};

export type StoreConnectionSocialMediaAccounts = {
  __typename?: 'StoreConnectionSocialMediaAccounts';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<StoreConnection>;
};

export type StoreConnectionStore_Settings = {
  __typename?: 'StoreConnectionStore_settings';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<StoreConnection>;
};

export type StoreConnectionUpdated_At = {
  __typename?: 'StoreConnectionUpdated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<StoreConnection>;
};

export type StoreConnectionUrl = {
  __typename?: 'StoreConnectionUrl';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<StoreConnection>;
};

export type StoreGroupBy = {
  __typename?: 'StoreGroupBy';
  id?: Maybe<Array<Maybe<StoreConnectionId>>>;
  created_at?: Maybe<Array<Maybe<StoreConnectionCreated_At>>>;
  updated_at?: Maybe<Array<Maybe<StoreConnectionUpdated_At>>>;
  code?: Maybe<Array<Maybe<StoreConnectionCode>>>;
  name?: Maybe<Array<Maybe<StoreConnectionName>>>;
  url?: Maybe<Array<Maybe<StoreConnectionUrl>>>;
  currency?: Maybe<Array<Maybe<StoreConnectionCurrency>>>;
  store_settings?: Maybe<Array<Maybe<StoreConnectionStore_Settings>>>;
  shopifySettings?: Maybe<Array<Maybe<StoreConnectionShopifySettings>>>;
  footer?: Maybe<Array<Maybe<StoreConnectionFooter>>>;
  socialMediaAccounts?: Maybe<Array<Maybe<StoreConnectionSocialMediaAccounts>>>;
  published_at?: Maybe<Array<Maybe<StoreConnectionPublished_At>>>;
};

export type StoreInput = {
  code: Scalars['String'];
  name: Scalars['String'];
  url: Scalars['String'];
  currency: Scalars['String'];
  store_settings?: Maybe<Scalars['ID']>;
  shopifySettings: ComponentStoreShopifySettingInput;
  footer: ComponentSettingsFooterInput;
  socialMediaAccounts: ComponentSettingsSocialInput;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type StoreSettingInput = {
  footer: ComponentSettingsFooterInput;
  socialMediaAccounts: ComponentSettingsSocialInput;
  store?: Maybe<Scalars['ID']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type StoreSettings = {
  __typename?: 'StoreSettings';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  footer?: Maybe<ComponentSettingsFooter>;
  socialMediaAccounts?: Maybe<ComponentSettingsSocial>;
  store?: Maybe<Store>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  localizations?: Maybe<Array<Maybe<StoreSettings>>>;
};


export type StoreSettingsLocalizationsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
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
  values?: Maybe<Array<Maybe<StoreSettings>>>;
  groupBy?: Maybe<StoreSettingsGroupBy>;
  aggregate?: Maybe<StoreSettingsAggregator>;
};

export type StoreSettingsConnectionCreated_At = {
  __typename?: 'StoreSettingsConnectionCreated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<StoreSettingsConnection>;
};

export type StoreSettingsConnectionFooter = {
  __typename?: 'StoreSettingsConnectionFooter';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<StoreSettingsConnection>;
};

export type StoreSettingsConnectionId = {
  __typename?: 'StoreSettingsConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<StoreSettingsConnection>;
};

export type StoreSettingsConnectionLocale = {
  __typename?: 'StoreSettingsConnectionLocale';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<StoreSettingsConnection>;
};

export type StoreSettingsConnectionPublished_At = {
  __typename?: 'StoreSettingsConnectionPublished_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<StoreSettingsConnection>;
};

export type StoreSettingsConnectionSocialMediaAccounts = {
  __typename?: 'StoreSettingsConnectionSocialMediaAccounts';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<StoreSettingsConnection>;
};

export type StoreSettingsConnectionStore = {
  __typename?: 'StoreSettingsConnectionStore';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<StoreSettingsConnection>;
};

export type StoreSettingsConnectionUpdated_At = {
  __typename?: 'StoreSettingsConnectionUpdated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<StoreSettingsConnection>;
};

export type StoreSettingsGroupBy = {
  __typename?: 'StoreSettingsGroupBy';
  id?: Maybe<Array<Maybe<StoreSettingsConnectionId>>>;
  created_at?: Maybe<Array<Maybe<StoreSettingsConnectionCreated_At>>>;
  updated_at?: Maybe<Array<Maybe<StoreSettingsConnectionUpdated_At>>>;
  footer?: Maybe<Array<Maybe<StoreSettingsConnectionFooter>>>;
  socialMediaAccounts?: Maybe<Array<Maybe<StoreSettingsConnectionSocialMediaAccounts>>>;
  store?: Maybe<Array<Maybe<StoreSettingsConnectionStore>>>;
  locale?: Maybe<Array<Maybe<StoreSettingsConnectionLocale>>>;
  published_at?: Maybe<Array<Maybe<StoreSettingsConnectionPublished_At>>>;
};

export type UploadFile = {
  __typename?: 'UploadFile';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  name: Scalars['String'];
  alternativeText?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  formats?: Maybe<Scalars['JSON']>;
  hash: Scalars['String'];
  ext?: Maybe<Scalars['String']>;
  mime: Scalars['String'];
  size: Scalars['Float'];
  url: Scalars['String'];
  previewUrl?: Maybe<Scalars['String']>;
  provider: Scalars['String'];
  provider_metadata?: Maybe<Scalars['JSON']>;
  related?: Maybe<Array<Maybe<Morph>>>;
};


export type UploadFileRelatedArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type UploadFileAggregator = {
  __typename?: 'UploadFileAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
  sum?: Maybe<UploadFileAggregatorSum>;
  avg?: Maybe<UploadFileAggregatorAvg>;
  min?: Maybe<UploadFileAggregatorMin>;
  max?: Maybe<UploadFileAggregatorMax>;
};

export type UploadFileAggregatorAvg = {
  __typename?: 'UploadFileAggregatorAvg';
  width?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
};

export type UploadFileAggregatorMax = {
  __typename?: 'UploadFileAggregatorMax';
  width?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
};

export type UploadFileAggregatorMin = {
  __typename?: 'UploadFileAggregatorMin';
  width?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
};

export type UploadFileAggregatorSum = {
  __typename?: 'UploadFileAggregatorSum';
  width?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
};

export type UploadFileConnection = {
  __typename?: 'UploadFileConnection';
  values?: Maybe<Array<Maybe<UploadFile>>>;
  groupBy?: Maybe<UploadFileGroupBy>;
  aggregate?: Maybe<UploadFileAggregator>;
};

export type UploadFileConnectionAlternativeText = {
  __typename?: 'UploadFileConnectionAlternativeText';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionCaption = {
  __typename?: 'UploadFileConnectionCaption';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionCreated_At = {
  __typename?: 'UploadFileConnectionCreated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionExt = {
  __typename?: 'UploadFileConnectionExt';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionFormats = {
  __typename?: 'UploadFileConnectionFormats';
  key?: Maybe<Scalars['JSON']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionHash = {
  __typename?: 'UploadFileConnectionHash';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionHeight = {
  __typename?: 'UploadFileConnectionHeight';
  key?: Maybe<Scalars['Int']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionId = {
  __typename?: 'UploadFileConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionMime = {
  __typename?: 'UploadFileConnectionMime';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionName = {
  __typename?: 'UploadFileConnectionName';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionPreviewUrl = {
  __typename?: 'UploadFileConnectionPreviewUrl';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionProvider = {
  __typename?: 'UploadFileConnectionProvider';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionProvider_Metadata = {
  __typename?: 'UploadFileConnectionProvider_metadata';
  key?: Maybe<Scalars['JSON']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionSize = {
  __typename?: 'UploadFileConnectionSize';
  key?: Maybe<Scalars['Float']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionUpdated_At = {
  __typename?: 'UploadFileConnectionUpdated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionUrl = {
  __typename?: 'UploadFileConnectionUrl';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionWidth = {
  __typename?: 'UploadFileConnectionWidth';
  key?: Maybe<Scalars['Int']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileGroupBy = {
  __typename?: 'UploadFileGroupBy';
  id?: Maybe<Array<Maybe<UploadFileConnectionId>>>;
  created_at?: Maybe<Array<Maybe<UploadFileConnectionCreated_At>>>;
  updated_at?: Maybe<Array<Maybe<UploadFileConnectionUpdated_At>>>;
  name?: Maybe<Array<Maybe<UploadFileConnectionName>>>;
  alternativeText?: Maybe<Array<Maybe<UploadFileConnectionAlternativeText>>>;
  caption?: Maybe<Array<Maybe<UploadFileConnectionCaption>>>;
  width?: Maybe<Array<Maybe<UploadFileConnectionWidth>>>;
  height?: Maybe<Array<Maybe<UploadFileConnectionHeight>>>;
  formats?: Maybe<Array<Maybe<UploadFileConnectionFormats>>>;
  hash?: Maybe<Array<Maybe<UploadFileConnectionHash>>>;
  ext?: Maybe<Array<Maybe<UploadFileConnectionExt>>>;
  mime?: Maybe<Array<Maybe<UploadFileConnectionMime>>>;
  size?: Maybe<Array<Maybe<UploadFileConnectionSize>>>;
  url?: Maybe<Array<Maybe<UploadFileConnectionUrl>>>;
  previewUrl?: Maybe<Array<Maybe<UploadFileConnectionPreviewUrl>>>;
  provider?: Maybe<Array<Maybe<UploadFileConnectionProvider>>>;
  provider_metadata?: Maybe<Array<Maybe<UploadFileConnectionProvider_Metadata>>>;
};

export type UserInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  provider?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  resetPasswordToken?: Maybe<Scalars['String']>;
  confirmationToken?: Maybe<Scalars['String']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  blocked?: Maybe<Scalars['Boolean']>;
  role?: Maybe<Scalars['ID']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
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
  id: Scalars['ID'];
  username: Scalars['String'];
  email: Scalars['String'];
  confirmed?: Maybe<Scalars['Boolean']>;
  blocked?: Maybe<Scalars['Boolean']>;
  role?: Maybe<UsersPermissionsMeRole>;
};

export type UsersPermissionsMeRole = {
  __typename?: 'UsersPermissionsMeRole';
  id: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type UsersPermissionsPermission = {
  __typename?: 'UsersPermissionsPermission';
  id: Scalars['ID'];
  type: Scalars['String'];
  controller: Scalars['String'];
  action: Scalars['String'];
  enabled: Scalars['Boolean'];
  policy?: Maybe<Scalars['String']>;
  role?: Maybe<UsersPermissionsRole>;
};

export type UsersPermissionsRegisterInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UsersPermissionsRole = {
  __typename?: 'UsersPermissionsRole';
  id: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  permissions?: Maybe<Array<Maybe<UsersPermissionsPermission>>>;
  users?: Maybe<Array<Maybe<UsersPermissionsUser>>>;
};


export type UsersPermissionsRolePermissionsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type UsersPermissionsRoleUsersArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
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
  values?: Maybe<Array<Maybe<UsersPermissionsRole>>>;
  groupBy?: Maybe<UsersPermissionsRoleGroupBy>;
  aggregate?: Maybe<UsersPermissionsRoleAggregator>;
};

export type UsersPermissionsRoleConnectionDescription = {
  __typename?: 'UsersPermissionsRoleConnectionDescription';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UsersPermissionsRoleConnection>;
};

export type UsersPermissionsRoleConnectionId = {
  __typename?: 'UsersPermissionsRoleConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<UsersPermissionsRoleConnection>;
};

export type UsersPermissionsRoleConnectionName = {
  __typename?: 'UsersPermissionsRoleConnectionName';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UsersPermissionsRoleConnection>;
};

export type UsersPermissionsRoleConnectionType = {
  __typename?: 'UsersPermissionsRoleConnectionType';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UsersPermissionsRoleConnection>;
};

export type UsersPermissionsRoleGroupBy = {
  __typename?: 'UsersPermissionsRoleGroupBy';
  id?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionId>>>;
  name?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionName>>>;
  description?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionDescription>>>;
  type?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionType>>>;
};

export type UsersPermissionsUser = {
  __typename?: 'UsersPermissionsUser';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  username: Scalars['String'];
  email: Scalars['String'];
  provider?: Maybe<Scalars['String']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  blocked?: Maybe<Scalars['Boolean']>;
  role?: Maybe<UsersPermissionsRole>;
};

export type UsersPermissionsUserAggregator = {
  __typename?: 'UsersPermissionsUserAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type UsersPermissionsUserConnection = {
  __typename?: 'UsersPermissionsUserConnection';
  values?: Maybe<Array<Maybe<UsersPermissionsUser>>>;
  groupBy?: Maybe<UsersPermissionsUserGroupBy>;
  aggregate?: Maybe<UsersPermissionsUserAggregator>;
};

export type UsersPermissionsUserConnectionBlocked = {
  __typename?: 'UsersPermissionsUserConnectionBlocked';
  key?: Maybe<Scalars['Boolean']>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionConfirmed = {
  __typename?: 'UsersPermissionsUserConnectionConfirmed';
  key?: Maybe<Scalars['Boolean']>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionCreated_At = {
  __typename?: 'UsersPermissionsUserConnectionCreated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionEmail = {
  __typename?: 'UsersPermissionsUserConnectionEmail';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionId = {
  __typename?: 'UsersPermissionsUserConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionProvider = {
  __typename?: 'UsersPermissionsUserConnectionProvider';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionRole = {
  __typename?: 'UsersPermissionsUserConnectionRole';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionUpdated_At = {
  __typename?: 'UsersPermissionsUserConnectionUpdated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionUsername = {
  __typename?: 'UsersPermissionsUserConnectionUsername';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserGroupBy = {
  __typename?: 'UsersPermissionsUserGroupBy';
  id?: Maybe<Array<Maybe<UsersPermissionsUserConnectionId>>>;
  created_at?: Maybe<Array<Maybe<UsersPermissionsUserConnectionCreated_At>>>;
  updated_at?: Maybe<Array<Maybe<UsersPermissionsUserConnectionUpdated_At>>>;
  username?: Maybe<Array<Maybe<UsersPermissionsUserConnectionUsername>>>;
  email?: Maybe<Array<Maybe<UsersPermissionsUserConnectionEmail>>>;
  provider?: Maybe<Array<Maybe<UsersPermissionsUserConnectionProvider>>>;
  confirmed?: Maybe<Array<Maybe<UsersPermissionsUserConnectionConfirmed>>>;
  blocked?: Maybe<Array<Maybe<UsersPermissionsUserConnectionBlocked>>>;
  role?: Maybe<Array<Maybe<UsersPermissionsUserConnectionRole>>>;
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
  subheading?: Maybe<Scalars['String']>;
  device_summary?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditCollectionInput = {
  handle?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['ID']>;
  filters?: Maybe<Scalars['String']>;
  parent?: Maybe<Scalars['ID']>;
  children?: Maybe<Array<Maybe<Scalars['ID']>>>;
  wiki_title_api_validated?: Maybe<Scalars['String']>;
  sections: Array<Scalars['CollectionSectionsDynamicZoneInput']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditComponentCollectionBannerInput = {
  id?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  callToActionLabel?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type EditComponentCollectionFeaturedCollectionInput = {
  id?: Maybe<Scalars['ID']>;
  featuredCollection?: Maybe<Scalars['ID']>;
};

export type EditComponentCollectionNewsletterFormInput = {
  id?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  inputPlaceholder?: Maybe<Scalars['String']>;
  callToActionLabel?: Maybe<Scalars['String']>;
};

export type EditComponentCollectionRelatedPostInput = {
  id?: Maybe<Scalars['ID']>;
  tags?: Maybe<Scalars['String']>;
};

export type EditComponentMenuCollectionLinkInput = {
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  linkedCollection?: Maybe<Scalars['ID']>;
};

export type EditComponentMenuLinkInput = {
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type EditComponentMenuLinkWithImageInput = {
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['ID']>;
};

export type EditComponentSettingsFooterInput = {
  id?: Maybe<Scalars['ID']>;
  menu1?: Maybe<Scalars['ID']>;
  menu2?: Maybe<Scalars['ID']>;
  bottomMenu?: Maybe<Scalars['ID']>;
  partners?: Maybe<Scalars['ID']>;
};

export type EditComponentSettingsPartnerInput = {
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  logo?: Maybe<Scalars['ID']>;
};

export type EditComponentSettingsSocialInput = {
  id?: Maybe<Scalars['ID']>;
  twitter?: Maybe<Scalars['String']>;
  facebook?: Maybe<Scalars['String']>;
  instagram?: Maybe<Scalars['String']>;
  youtube?: Maybe<Scalars['String']>;
  repairOrg?: Maybe<Scalars['String']>;
};

export type EditComponentStoreShopifySettingInput = {
  id?: Maybe<Scalars['ID']>;
  storefrontDomain?: Maybe<Scalars['String']>;
  storefrontAccessToken?: Maybe<Scalars['String']>;
};

export type EditDeviceHandleInput = {
  handle?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditDeviceInput = {
  device?: Maybe<Scalars['String']>;
  part_type?: Maybe<Scalars['String']>;
  meta_description?: Maybe<Scalars['String']>;
  subheading?: Maybe<Scalars['String']>;
  summary?: Maybe<Scalars['String']>;
  image?: Maybe<Array<Maybe<Scalars['ID']>>>;
  canonical_override?: Maybe<Scalars['String']>;
  faq_section?: Maybe<Scalars['ID']>;
  device_summary?: Maybe<Scalars['ID']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditFaqInput = {
  Question?: Maybe<Scalars['String']>;
  Answer?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditFaqSectionInput = {
  heading?: Maybe<Scalars['String']>;
  faq1?: Maybe<Scalars['ID']>;
  faq2?: Maybe<Scalars['ID']>;
  faq3?: Maybe<Scalars['ID']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditFileInput = {
  name?: Maybe<Scalars['String']>;
  alternativeText?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  formats?: Maybe<Scalars['JSON']>;
  hash?: Maybe<Scalars['String']>;
  ext?: Maybe<Scalars['String']>;
  mime?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Float']>;
  url?: Maybe<Scalars['String']>;
  previewUrl?: Maybe<Scalars['String']>;
  provider?: Maybe<Scalars['String']>;
  provider_metadata?: Maybe<Scalars['JSON']>;
  related?: Maybe<Array<Maybe<Scalars['ID']>>>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditFunFactInput = {
  title?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditLocaleInput = {
  name?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditMenuInput = {
  items: Array<Scalars['MenuItemsDynamicZoneInput']>;
  title?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditPartCollectionInput = {
  title?: Maybe<Scalars['String']>;
  meta_description?: Maybe<Scalars['String']>;
  details?: Maybe<Scalars['String']>;
  summary?: Maybe<Scalars['String']>;
  device_handle?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditRoleInput = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  permissions?: Maybe<Array<Maybe<Scalars['ID']>>>;
  users?: Maybe<Array<Maybe<Scalars['ID']>>>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditStoreInput = {
  code?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  store_settings?: Maybe<Scalars['ID']>;
  shopifySettings?: Maybe<EditComponentStoreShopifySettingInput>;
  footer?: Maybe<EditComponentSettingsFooterInput>;
  socialMediaAccounts?: Maybe<EditComponentSettingsSocialInput>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditStoreSettingInput = {
  footer?: Maybe<EditComponentSettingsFooterInput>;
  socialMediaAccounts?: Maybe<EditComponentSettingsSocialInput>;
  store?: Maybe<Scalars['ID']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditUserInput = {
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  provider?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  resetPasswordToken?: Maybe<Scalars['String']>;
  confirmationToken?: Maybe<Scalars['String']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  blocked?: Maybe<Scalars['Boolean']>;
  role?: Maybe<Scalars['ID']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type UpdateBottomContextInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditBottomContextInput>;
};

export type UpdateBottomContextPayload = {
  __typename?: 'updateBottomContextPayload';
  bottomContext?: Maybe<BottomContext>;
};

export type UpdateCollectionInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditCollectionInput>;
};

export type UpdateCollectionPayload = {
  __typename?: 'updateCollectionPayload';
  collection?: Maybe<Collection>;
};

export type UpdateDeviceHandleInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditDeviceHandleInput>;
};

export type UpdateDeviceHandlePayload = {
  __typename?: 'updateDeviceHandlePayload';
  deviceHandle?: Maybe<DeviceHandle>;
};

export type UpdateDeviceInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditDeviceInput>;
};

export type UpdateDevicePayload = {
  __typename?: 'updateDevicePayload';
  device?: Maybe<Device>;
};

export type UpdateFaqInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditFaqInput>;
};

export type UpdateFaqPayload = {
  __typename?: 'updateFaqPayload';
  faq?: Maybe<Faq>;
};

export type UpdateFaqSectionInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditFaqSectionInput>;
};

export type UpdateFaqSectionPayload = {
  __typename?: 'updateFaqSectionPayload';
  faqSection?: Maybe<FaqSection>;
};

export type UpdateFunFactInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditFunFactInput>;
};

export type UpdateFunFactPayload = {
  __typename?: 'updateFunFactPayload';
  funFact?: Maybe<FunFacts>;
};

export type UpdateMenuInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditMenuInput>;
};

export type UpdateMenuPayload = {
  __typename?: 'updateMenuPayload';
  menu?: Maybe<Menu>;
};

export type UpdatePartCollectionInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditPartCollectionInput>;
};

export type UpdatePartCollectionPayload = {
  __typename?: 'updatePartCollectionPayload';
  partCollection?: Maybe<PartCollections>;
};

export type UpdateRoleInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditRoleInput>;
};

export type UpdateRolePayload = {
  __typename?: 'updateRolePayload';
  role?: Maybe<UsersPermissionsRole>;
};

export type UpdateStoreInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditStoreInput>;
};

export type UpdateStorePayload = {
  __typename?: 'updateStorePayload';
  store?: Maybe<Store>;
};

export type UpdateStoreSettingInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditStoreSettingInput>;
};

export type UpdateStoreSettingPayload = {
  __typename?: 'updateStoreSettingPayload';
  storeSetting?: Maybe<StoreSettings>;
};

export type UpdateUserInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditUserInput>;
};

export type UpdateUserPayload = {
  __typename?: 'updateUserPayload';
  user?: Maybe<UsersPermissionsUser>;
};

export type GetCollectionPageDataQueryVariables = Exact<{
  whereCollection?: Maybe<Scalars['JSON']>;
  whereStoreSettings?: Maybe<Scalars['JSON']>;
}>;


export type GetCollectionPageDataQuery = { __typename?: 'Query', collections?: Maybe<Array<Maybe<{ __typename?: 'Collection', id: string, handle: string, title: string, description: string, filters?: Maybe<string>, image?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }>, parent?: Maybe<{ __typename?: 'Collection', title: string, handle: string, parent?: Maybe<{ __typename?: 'Collection', title: string, handle: string, parent?: Maybe<{ __typename?: 'Collection', title: string, handle: string, parent?: Maybe<{ __typename?: 'Collection', title: string, handle: string }> }> }> }>, children?: Maybe<Array<Maybe<{ __typename?: 'Collection', handle: string, title: string, image?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> }>>>, sections: Array<Maybe<{ __typename: 'ComponentCollectionBanner', id: string, title: string, description: string, callToActionLabel: string, url: string } | { __typename: 'ComponentCollectionRelatedPosts', id: string, tags?: Maybe<string> } | { __typename: 'ComponentCollectionNewsletterForm', id: string, title: string, description: string, inputPlaceholder?: Maybe<string>, callToActionLabel: string } | { __typename: 'ComponentCollectionFeaturedCollection', id: string, featuredCollection?: Maybe<{ __typename?: 'Collection', handle: string, title: string, description: string, image?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> }> }>> }>>>, stores?: Maybe<Array<Maybe<{ __typename?: 'Store', code: string, name: string, url: string, currency: string }>>>, currentStore?: Maybe<Array<Maybe<{ __typename?: 'Store', shopifySettings?: Maybe<{ __typename?: 'ComponentStoreShopifySettings', storefrontDomain: string, storefrontAccessToken: string }>, footer?: Maybe<{ __typename?: 'ComponentSettingsFooter', menu1?: Maybe<{ __typename?: 'Menu', items: Array<Maybe<{ __typename: 'ComponentMenuLink', name: string, url: string } | { __typename: 'ComponentMenuCollectionLink', name: string, linkedCollection?: Maybe<{ __typename?: 'Collection', handle: string }> } | { __typename: 'ComponentMenuLinkWithImage', name: string, url: string, image?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> }>> }>, menu2?: Maybe<{ __typename?: 'Menu', items: Array<Maybe<{ __typename: 'ComponentMenuLink', name: string, url: string } | { __typename: 'ComponentMenuCollectionLink', name: string, linkedCollection?: Maybe<{ __typename?: 'Collection', handle: string }> } | { __typename: 'ComponentMenuLinkWithImage', name: string, url: string, image?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> }>> }>, partners?: Maybe<{ __typename?: 'Menu', items: Array<Maybe<{ __typename: 'ComponentMenuLink', name: string, url: string } | { __typename: 'ComponentMenuCollectionLink', name: string, linkedCollection?: Maybe<{ __typename?: 'Collection', handle: string }> } | { __typename: 'ComponentMenuLinkWithImage', name: string, url: string, image?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> }>> }>, bottomMenu?: Maybe<{ __typename?: 'Menu', items: Array<Maybe<{ __typename: 'ComponentMenuLink', name: string, url: string } | { __typename: 'ComponentMenuCollectionLink', name: string, linkedCollection?: Maybe<{ __typename?: 'Collection', handle: string }> } | { __typename: 'ComponentMenuLinkWithImage', name: string, url: string, image?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> }>> }> }>, socialMediaAccounts?: Maybe<{ __typename?: 'ComponentSettingsSocial', twitter?: Maybe<string>, facebook?: Maybe<string>, instagram?: Maybe<string>, youtube?: Maybe<string>, repairOrg?: Maybe<string> }> }>>> };

export type LayoutPropsFragment = { __typename?: 'Query', stores?: Maybe<Array<Maybe<{ __typename?: 'Store', code: string, name: string, url: string, currency: string }>>>, currentStore?: Maybe<Array<Maybe<{ __typename?: 'Store', shopifySettings?: Maybe<{ __typename?: 'ComponentStoreShopifySettings', storefrontDomain: string, storefrontAccessToken: string }>, footer?: Maybe<{ __typename?: 'ComponentSettingsFooter', menu1?: Maybe<{ __typename?: 'Menu', items: Array<Maybe<{ __typename: 'ComponentMenuLink', name: string, url: string } | { __typename: 'ComponentMenuCollectionLink', name: string, linkedCollection?: Maybe<{ __typename?: 'Collection', handle: string }> } | { __typename: 'ComponentMenuLinkWithImage', name: string, url: string, image?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> }>> }>, menu2?: Maybe<{ __typename?: 'Menu', items: Array<Maybe<{ __typename: 'ComponentMenuLink', name: string, url: string } | { __typename: 'ComponentMenuCollectionLink', name: string, linkedCollection?: Maybe<{ __typename?: 'Collection', handle: string }> } | { __typename: 'ComponentMenuLinkWithImage', name: string, url: string, image?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> }>> }>, partners?: Maybe<{ __typename?: 'Menu', items: Array<Maybe<{ __typename: 'ComponentMenuLink', name: string, url: string } | { __typename: 'ComponentMenuCollectionLink', name: string, linkedCollection?: Maybe<{ __typename?: 'Collection', handle: string }> } | { __typename: 'ComponentMenuLinkWithImage', name: string, url: string, image?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> }>> }>, bottomMenu?: Maybe<{ __typename?: 'Menu', items: Array<Maybe<{ __typename: 'ComponentMenuLink', name: string, url: string } | { __typename: 'ComponentMenuCollectionLink', name: string, linkedCollection?: Maybe<{ __typename?: 'Collection', handle: string }> } | { __typename: 'ComponentMenuLinkWithImage', name: string, url: string, image?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> }>> }> }>, socialMediaAccounts?: Maybe<{ __typename?: 'ComponentSettingsSocial', twitter?: Maybe<string>, facebook?: Maybe<string>, instagram?: Maybe<string>, youtube?: Maybe<string>, repairOrg?: Maybe<string> }> }>>> };

export type MenuPropsFragment = { __typename?: 'Menu', items: Array<Maybe<{ __typename: 'ComponentMenuLink', name: string, url: string } | { __typename: 'ComponentMenuCollectionLink', name: string, linkedCollection?: Maybe<{ __typename?: 'Collection', handle: string }> } | { __typename: 'ComponentMenuLinkWithImage', name: string, url: string, image?: Maybe<{ __typename?: 'UploadFile', alternativeText?: Maybe<string>, url: string, formats?: Maybe<any> }> }>> };

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