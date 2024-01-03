export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
   [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
   [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
   [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
   ID: string;
   String: string;
   Boolean: boolean;
   Int: number;
   Float: number;
   DateTime: any;
   I18NLocaleCode: any;
   JSON: any;
   MenuItemsDynamicZoneInput: any;
   PageSectionsDynamicZoneInput: any;
   ProductListItemOverridesDynamicZoneInput: any;
   ProductListSectionsDynamicZoneInput: any;
   ProductSectionsDynamicZoneInput: any;
   ReusableSectionSectionDynamicZoneInput: any;
   Upload: any;
};

export type Banner = {
   __typename?: 'Banner';
   callToAction?: Maybe<ComponentPageCallToAction>;
   createdAt?: Maybe<Scalars['DateTime']>;
   description?: Maybe<Scalars['String']>;
   image?: Maybe<UploadFileEntityResponse>;
   label?: Maybe<Scalars['String']>;
   locale?: Maybe<Scalars['String']>;
   localizations?: Maybe<BannerRelationResponseCollection>;
   publishedAt?: Maybe<Scalars['DateTime']>;
   title?: Maybe<Scalars['String']>;
   updatedAt?: Maybe<Scalars['DateTime']>;
};

export type BannerLocalizationsArgs = {
   filters?: InputMaybe<BannerFiltersInput>;
   pagination?: InputMaybe<PaginationArg>;
   publicationState?: InputMaybe<PublicationState>;
   sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type BannerEntity = {
   __typename?: 'BannerEntity';
   attributes?: Maybe<Banner>;
   id?: Maybe<Scalars['ID']>;
};

export type BannerEntityResponse = {
   __typename?: 'BannerEntityResponse';
   data?: Maybe<BannerEntity>;
};

export type BannerEntityResponseCollection = {
   __typename?: 'BannerEntityResponseCollection';
   data: Array<BannerEntity>;
   meta: ResponseCollectionMeta;
};

export type BannerFiltersInput = {
   and?: InputMaybe<Array<InputMaybe<BannerFiltersInput>>>;
   callToAction?: InputMaybe<ComponentPageCallToActionFiltersInput>;
   createdAt?: InputMaybe<DateTimeFilterInput>;
   description?: InputMaybe<StringFilterInput>;
   id?: InputMaybe<IdFilterInput>;
   label?: InputMaybe<StringFilterInput>;
   locale?: InputMaybe<StringFilterInput>;
   localizations?: InputMaybe<BannerFiltersInput>;
   not?: InputMaybe<BannerFiltersInput>;
   or?: InputMaybe<Array<InputMaybe<BannerFiltersInput>>>;
   publishedAt?: InputMaybe<DateTimeFilterInput>;
   title?: InputMaybe<StringFilterInput>;
   updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type BannerInput = {
   callToAction?: InputMaybe<ComponentPageCallToActionInput>;
   description?: InputMaybe<Scalars['String']>;
   image?: InputMaybe<Scalars['ID']>;
   label?: InputMaybe<Scalars['String']>;
   publishedAt?: InputMaybe<Scalars['DateTime']>;
   title?: InputMaybe<Scalars['String']>;
};

export type BannerRelationResponseCollection = {
   __typename?: 'BannerRelationResponseCollection';
   data: Array<BannerEntity>;
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
   nei?: InputMaybe<Scalars['Boolean']>;
   not?: InputMaybe<BooleanFilterInput>;
   notContains?: InputMaybe<Scalars['Boolean']>;
   notContainsi?: InputMaybe<Scalars['Boolean']>;
   notIn?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
   notNull?: InputMaybe<Scalars['Boolean']>;
   null?: InputMaybe<Scalars['Boolean']>;
   or?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
   startsWith?: InputMaybe<Scalars['Boolean']>;
};

export type Company = {
   __typename?: 'Company';
   createdAt?: Maybe<Scalars['DateTime']>;
   logo?: Maybe<UploadFileEntityResponse>;
   name: Scalars['String'];
   publishedAt?: Maybe<Scalars['DateTime']>;
   updatedAt?: Maybe<Scalars['DateTime']>;
};

export type CompanyEntity = {
   __typename?: 'CompanyEntity';
   attributes?: Maybe<Company>;
   id?: Maybe<Scalars['ID']>;
};

export type CompanyEntityResponse = {
   __typename?: 'CompanyEntityResponse';
   data?: Maybe<CompanyEntity>;
};

export type CompanyEntityResponseCollection = {
   __typename?: 'CompanyEntityResponseCollection';
   data: Array<CompanyEntity>;
   meta: ResponseCollectionMeta;
};

export type CompanyFiltersInput = {
   and?: InputMaybe<Array<InputMaybe<CompanyFiltersInput>>>;
   createdAt?: InputMaybe<DateTimeFilterInput>;
   id?: InputMaybe<IdFilterInput>;
   name?: InputMaybe<StringFilterInput>;
   not?: InputMaybe<CompanyFiltersInput>;
   or?: InputMaybe<Array<InputMaybe<CompanyFiltersInput>>>;
   publishedAt?: InputMaybe<DateTimeFilterInput>;
   updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type CompanyInput = {
   logo?: InputMaybe<Scalars['ID']>;
   name?: InputMaybe<Scalars['String']>;
   publishedAt?: InputMaybe<Scalars['DateTime']>;
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

export type ComponentGlobalPerson = {
   __typename?: 'ComponentGlobalPerson';
   avatar?: Maybe<UploadFileEntityResponse>;
   id: Scalars['ID'];
   name?: Maybe<Scalars['String']>;
   role?: Maybe<Scalars['String']>;
};

export type ComponentGlobalPersonFiltersInput = {
   and?: InputMaybe<Array<InputMaybe<ComponentGlobalPersonFiltersInput>>>;
   name?: InputMaybe<StringFilterInput>;
   not?: InputMaybe<ComponentGlobalPersonFiltersInput>;
   or?: InputMaybe<Array<InputMaybe<ComponentGlobalPersonFiltersInput>>>;
   role?: InputMaybe<StringFilterInput>;
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

export type ComponentMiscPlacement = {
   __typename?: 'ComponentMiscPlacement';
   id: Scalars['ID'];
   productLists?: Maybe<ProductListRelationResponseCollection>;
   showInProductListPages: Enum_Componentmiscplacement_Showinproductlistpages;
};

export type ComponentMiscPlacementProductListsArgs = {
   filters?: InputMaybe<ProductListFiltersInput>;
   pagination?: InputMaybe<PaginationArg>;
   publicationState?: InputMaybe<PublicationState>;
   sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentMiscPlacementFiltersInput = {
   and?: InputMaybe<Array<InputMaybe<ComponentMiscPlacementFiltersInput>>>;
   not?: InputMaybe<ComponentMiscPlacementFiltersInput>;
   or?: InputMaybe<Array<InputMaybe<ComponentMiscPlacementFiltersInput>>>;
   productLists?: InputMaybe<ProductListFiltersInput>;
   showInProductListPages?: InputMaybe<StringFilterInput>;
};

export type ComponentMiscPlacementInput = {
   id?: InputMaybe<Scalars['ID']>;
   productLists?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
   showInProductListPages?: InputMaybe<Enum_Componentmiscplacement_Showinproductlistpages>;
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

export type ComponentPageCallToActionFiltersInput = {
   and?: InputMaybe<Array<InputMaybe<ComponentPageCallToActionFiltersInput>>>;
   not?: InputMaybe<ComponentPageCallToActionFiltersInput>;
   or?: InputMaybe<Array<InputMaybe<ComponentPageCallToActionFiltersInput>>>;
   title?: InputMaybe<StringFilterInput>;
   url?: InputMaybe<StringFilterInput>;
};

export type ComponentPageCallToActionInput = {
   id?: InputMaybe<Scalars['ID']>;
   title?: InputMaybe<Scalars['String']>;
   url?: InputMaybe<Scalars['String']>;
};

export type ComponentPageCategory = {
   __typename?: 'ComponentPageCategory';
   description?: Maybe<Scalars['String']>;
   id: Scalars['ID'];
   productList?: Maybe<ProductListEntityResponse>;
};

export type ComponentPageCategoryFiltersInput = {
   and?: InputMaybe<Array<InputMaybe<ComponentPageCategoryFiltersInput>>>;
   description?: InputMaybe<StringFilterInput>;
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

export type ComponentPagePress = {
   __typename?: 'ComponentPagePress';
   callToAction?: Maybe<ComponentPageCallToAction>;
   description?: Maybe<Scalars['String']>;
   id: Scalars['ID'];
   quotes?: Maybe<Array<Maybe<ComponentPagePressQuote>>>;
   title?: Maybe<Scalars['String']>;
};

export type ComponentPagePressQuotesArgs = {
   filters?: InputMaybe<ComponentPagePressQuoteFiltersInput>;
   pagination?: InputMaybe<PaginationArg>;
   sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentPagePressQuote = {
   __typename?: 'ComponentPagePressQuote';
   company?: Maybe<CompanyEntityResponse>;
   id: Scalars['ID'];
   text: Scalars['String'];
};

export type ComponentPagePressQuoteFiltersInput = {
   and?: InputMaybe<Array<InputMaybe<ComponentPagePressQuoteFiltersInput>>>;
   company?: InputMaybe<CompanyFiltersInput>;
   not?: InputMaybe<ComponentPagePressQuoteFiltersInput>;
   or?: InputMaybe<Array<InputMaybe<ComponentPagePressQuoteFiltersInput>>>;
   text?: InputMaybe<StringFilterInput>;
};

export type ComponentPageSplitWithImage = {
   __typename?: 'ComponentPageSplitWithImage';
   callToAction?: Maybe<ComponentPageCallToAction>;
   description?: Maybe<Scalars['String']>;
   id: Scalars['ID'];
   image?: Maybe<UploadFileEntityResponse>;
   imagePosition?: Maybe<Enum_Componentpagesplitwithimage_Imageposition>;
   label?: Maybe<Scalars['String']>;
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

export type ComponentProductBitTable = {
   __typename?: 'ComponentProductBitTable';
   bits?: Maybe<ScrewdriverBitRelationResponseCollection>;
   description?: Maybe<Scalars['String']>;
   id: Scalars['ID'];
   title?: Maybe<Scalars['String']>;
};

export type ComponentProductBitTableBitsArgs = {
   filters?: InputMaybe<ScrewdriverBitFiltersInput>;
   pagination?: InputMaybe<PaginationArg>;
   sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentProductCrossSell = {
   __typename?: 'ComponentProductCrossSell';
   id: Scalars['ID'];
   title?: Maybe<Scalars['String']>;
};

export type ComponentProductDeviceCompatibility = {
   __typename?: 'ComponentProductDeviceCompatibility';
   description?: Maybe<Scalars['String']>;
   id: Scalars['ID'];
   title?: Maybe<Scalars['String']>;
};

export type ComponentProductListBanner = {
   __typename?: 'ComponentProductListBanner';
   callToActionLabel: Scalars['String'];
   description: Scalars['String'];
   id: Scalars['ID'];
   title: Scalars['String'];
   url: Scalars['String'];
};

export type ComponentProductListItemTypeOverride = {
   __typename?: 'ComponentProductListItemTypeOverride';
   description?: Maybe<Scalars['String']>;
   id: Scalars['ID'];
   itemType?: Maybe<Scalars['String']>;
   metaDescription?: Maybe<Scalars['String']>;
   metaTitle?: Maybe<Scalars['String']>;
   tagline?: Maybe<Scalars['String']>;
   title?: Maybe<Scalars['String']>;
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

export type ComponentProductProduct = {
   __typename?: 'ComponentProductProduct';
   addToCartBar?: Maybe<Scalars['Boolean']>;
   id: Scalars['ID'];
};

export type ComponentProductProductCustomerReviews = {
   __typename?: 'ComponentProductProductCustomerReviews';
   id: Scalars['ID'];
   title?: Maybe<Scalars['String']>;
};

export type ComponentProductReplacementGuides = {
   __typename?: 'ComponentProductReplacementGuides';
   id: Scalars['ID'];
   title?: Maybe<Scalars['String']>;
};

export type ComponentSectionBanner = {
   __typename?: 'ComponentSectionBanner';
   banners?: Maybe<BannerRelationResponseCollection>;
   id: Scalars['ID'];
};

export type ComponentSectionBannerBannersArgs = {
   filters?: InputMaybe<BannerFiltersInput>;
   pagination?: InputMaybe<PaginationArg>;
   publicationState?: InputMaybe<PublicationState>;
   sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentSectionFaqs = {
   __typename?: 'ComponentSectionFaqs';
   description?: Maybe<Scalars['String']>;
   faqs?: Maybe<FaqRelationResponseCollection>;
   id: Scalars['ID'];
   title?: Maybe<Scalars['String']>;
};

export type ComponentSectionFaqsFaqsArgs = {
   filters?: InputMaybe<FaqFiltersInput>;
   pagination?: InputMaybe<PaginationArg>;
   publicationState?: InputMaybe<PublicationState>;
   sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentSectionFeaturedProducts = {
   __typename?: 'ComponentSectionFeaturedProducts';
   background?: Maybe<Enum_Componentsectionfeaturedproducts_Background>;
   description?: Maybe<Scalars['String']>;
   id: Scalars['ID'];
   productList?: Maybe<ProductListEntityResponse>;
   title?: Maybe<Scalars['String']>;
};

export type ComponentSectionLifetimeWarranty = {
   __typename?: 'ComponentSectionLifetimeWarranty';
   description?: Maybe<Scalars['String']>;
   id: Scalars['ID'];
   title?: Maybe<Scalars['String']>;
};

export type ComponentSectionQuote = {
   __typename?: 'ComponentSectionQuote';
   author?: Maybe<Scalars['String']>;
   id: Scalars['ID'];
   image?: Maybe<UploadFileEntityResponse>;
   text: Scalars['String'];
};

export type ComponentSectionQuoteCard = {
   __typename?: 'ComponentSectionQuoteCard';
   author?: Maybe<ComponentGlobalPerson>;
   id: Scalars['ID'];
   text: Scalars['String'];
};

export type ComponentSectionQuoteCardFiltersInput = {
   and?: InputMaybe<Array<InputMaybe<ComponentSectionQuoteCardFiltersInput>>>;
   author?: InputMaybe<ComponentGlobalPersonFiltersInput>;
   not?: InputMaybe<ComponentSectionQuoteCardFiltersInput>;
   or?: InputMaybe<Array<InputMaybe<ComponentSectionQuoteCardFiltersInput>>>;
   text?: InputMaybe<StringFilterInput>;
};

export type ComponentSectionQuoteGallery = {
   __typename?: 'ComponentSectionQuoteGallery';
   description?: Maybe<Scalars['String']>;
   id: Scalars['ID'];
   quotes?: Maybe<Array<Maybe<ComponentSectionQuoteCard>>>;
   title?: Maybe<Scalars['String']>;
};

export type ComponentSectionQuoteGalleryQuotesArgs = {
   filters?: InputMaybe<ComponentSectionQuoteCardFiltersInput>;
   pagination?: InputMaybe<PaginationArg>;
   sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentSectionServiceValuePropositions = {
   __typename?: 'ComponentSectionServiceValuePropositions';
   id: Scalars['ID'];
   title?: Maybe<Scalars['String']>;
};

export type ComponentSectionSocialGallery = {
   __typename?: 'ComponentSectionSocialGallery';
   description?: Maybe<Scalars['String']>;
   id: Scalars['ID'];
   posts?: Maybe<SocialPostRelationResponseCollection>;
   title?: Maybe<Scalars['String']>;
};

export type ComponentSectionSocialGalleryPostsArgs = {
   filters?: InputMaybe<SocialPostFiltersInput>;
   pagination?: InputMaybe<PaginationArg>;
   publicationState?: InputMaybe<PublicationState>;
   sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentSectionStories = {
   __typename?: 'ComponentSectionStories';
   id: Scalars['ID'];
   title?: Maybe<Scalars['String']>;
};

export type ComponentSectionTools = {
   __typename?: 'ComponentSectionTools';
   id: Scalars['ID'];
};

export type ComponentStoreFooter = {
   __typename?: 'ComponentStoreFooter';
   bottomMenu?: Maybe<MenuEntityResponse>;
   id: Scalars['ID'];
   menu1?: Maybe<MenuEntityResponse>;
   menu2?: Maybe<MenuEntityResponse>;
   menu3?: Maybe<MenuEntityResponse>;
   partners?: Maybe<MenuEntityResponse>;
};

export type ComponentStoreFooterFiltersInput = {
   and?: InputMaybe<Array<InputMaybe<ComponentStoreFooterFiltersInput>>>;
   bottomMenu?: InputMaybe<MenuFiltersInput>;
   menu1?: InputMaybe<MenuFiltersInput>;
   menu2?: InputMaybe<MenuFiltersInput>;
   menu3?: InputMaybe<MenuFiltersInput>;
   not?: InputMaybe<ComponentStoreFooterFiltersInput>;
   or?: InputMaybe<Array<InputMaybe<ComponentStoreFooterFiltersInput>>>;
   partners?: InputMaybe<MenuFiltersInput>;
};

export type ComponentStoreFooterInput = {
   bottomMenu?: InputMaybe<Scalars['ID']>;
   id?: InputMaybe<Scalars['ID']>;
   menu1?: InputMaybe<Scalars['ID']>;
   menu2?: InputMaybe<Scalars['ID']>;
   menu3?: InputMaybe<Scalars['ID']>;
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
   delegateAccessToken?: Maybe<Scalars['String']>;
   id: Scalars['ID'];
   storefrontAccessToken: Scalars['String'];
   storefrontDomain: Scalars['String'];
};

export type ComponentStoreShopifySettingsFiltersInput = {
   and?: InputMaybe<
      Array<InputMaybe<ComponentStoreShopifySettingsFiltersInput>>
   >;
   delegateAccessToken?: InputMaybe<StringFilterInput>;
   not?: InputMaybe<ComponentStoreShopifySettingsFiltersInput>;
   or?: InputMaybe<
      Array<InputMaybe<ComponentStoreShopifySettingsFiltersInput>>
   >;
   storefrontAccessToken?: InputMaybe<StringFilterInput>;
   storefrontDomain?: InputMaybe<StringFilterInput>;
};

export type ComponentStoreShopifySettingsInput = {
   delegateAccessToken?: InputMaybe<Scalars['String']>;
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
   tiktok?: Maybe<Scalars['String']>;
   twitter?: Maybe<Scalars['String']>;
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
   tiktok?: InputMaybe<StringFilterInput>;
   twitter?: InputMaybe<StringFilterInput>;
   youtube?: InputMaybe<StringFilterInput>;
};

export type ComponentStoreSocialMediaAccountsInput = {
   facebook?: InputMaybe<Scalars['String']>;
   id?: InputMaybe<Scalars['ID']>;
   instagram?: InputMaybe<Scalars['String']>;
   repairOrg?: InputMaybe<Scalars['String']>;
   tiktok?: InputMaybe<Scalars['String']>;
   twitter?: InputMaybe<Scalars['String']>;
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
   nei?: InputMaybe<Scalars['DateTime']>;
   not?: InputMaybe<DateTimeFilterInput>;
   notContains?: InputMaybe<Scalars['DateTime']>;
   notContainsi?: InputMaybe<Scalars['DateTime']>;
   notIn?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
   notNull?: InputMaybe<Scalars['Boolean']>;
   null?: InputMaybe<Scalars['Boolean']>;
   or?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
   startsWith?: InputMaybe<Scalars['DateTime']>;
};

export enum Enum_Componentmiscplacement_Showinproductlistpages {
   None = 'none',
   OnlyDescendants = 'only_descendants',
   OnlySelected = 'only_selected',
   SelectedAndDescendants = 'selected_and_descendants',
}

export enum Enum_Componentpagesplitwithimage_Imageposition {
   Left = 'Left',
   Right = 'Right',
}

export enum Enum_Componentsectionfeaturedproducts_Background {
   Transparent = 'transparent',
   White = 'white',
}

export enum Enum_Productlist_Redirecttotype {
   Permanent = 'permanent',
   Temporary = 'temporary',
}

export enum Enum_Productlist_Type {
   AllParts = 'all_parts',
   AllTools = 'all_tools',
   Marketing = 'marketing',
   Parts = 'parts',
   Tools = 'tools',
}

export enum Enum_Reusablesection_Positioninproductlist {
   AfterProducts = 'after_products',
   Bottom = 'bottom',
   Top = 'top',
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

export type Faq = {
   __typename?: 'Faq';
   answer: Scalars['String'];
   category?: Maybe<Scalars['String']>;
   createdAt?: Maybe<Scalars['DateTime']>;
   item_type?: Maybe<Scalars['String']>;
   priority?: Maybe<Scalars['Int']>;
   product_lists?: Maybe<ProductListRelationResponseCollection>;
   publishedAt?: Maybe<Scalars['DateTime']>;
   question: Scalars['String'];
   updatedAt?: Maybe<Scalars['DateTime']>;
};

export type FaqProduct_ListsArgs = {
   filters?: InputMaybe<ProductListFiltersInput>;
   pagination?: InputMaybe<PaginationArg>;
   publicationState?: InputMaybe<PublicationState>;
   sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type FaqEntity = {
   __typename?: 'FaqEntity';
   attributes?: Maybe<Faq>;
   id?: Maybe<Scalars['ID']>;
};

export type FaqEntityResponse = {
   __typename?: 'FaqEntityResponse';
   data?: Maybe<FaqEntity>;
};

export type FaqEntityResponseCollection = {
   __typename?: 'FaqEntityResponseCollection';
   data: Array<FaqEntity>;
   meta: ResponseCollectionMeta;
};

export type FaqFiltersInput = {
   and?: InputMaybe<Array<InputMaybe<FaqFiltersInput>>>;
   answer?: InputMaybe<StringFilterInput>;
   category?: InputMaybe<StringFilterInput>;
   createdAt?: InputMaybe<DateTimeFilterInput>;
   id?: InputMaybe<IdFilterInput>;
   item_type?: InputMaybe<StringFilterInput>;
   not?: InputMaybe<FaqFiltersInput>;
   or?: InputMaybe<Array<InputMaybe<FaqFiltersInput>>>;
   priority?: InputMaybe<IntFilterInput>;
   product_lists?: InputMaybe<ProductListFiltersInput>;
   publishedAt?: InputMaybe<DateTimeFilterInput>;
   question?: InputMaybe<StringFilterInput>;
   updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type FaqInput = {
   answer?: InputMaybe<Scalars['String']>;
   category?: InputMaybe<Scalars['String']>;
   item_type?: InputMaybe<Scalars['String']>;
   priority?: InputMaybe<Scalars['Int']>;
   product_lists?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
   publishedAt?: InputMaybe<Scalars['DateTime']>;
   question?: InputMaybe<Scalars['String']>;
};

export type FaqRelationResponseCollection = {
   __typename?: 'FaqRelationResponseCollection';
   data: Array<FaqEntity>;
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
   nei?: InputMaybe<Scalars['Float']>;
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
   | Banner
   | Company
   | ComponentGlobalNewsletterForm
   | ComponentGlobalPerson
   | ComponentMenuLink
   | ComponentMenuLinkWithImage
   | ComponentMenuProductListLink
   | ComponentMenuSubmenu
   | ComponentMiscPlacement
   | ComponentPageBrowse
   | ComponentPageCallToAction
   | ComponentPageCategory
   | ComponentPageHero
   | ComponentPagePress
   | ComponentPagePressQuote
   | ComponentPageSplitWithImage
   | ComponentPageStatItem
   | ComponentPageStats
   | ComponentProductBitTable
   | ComponentProductCrossSell
   | ComponentProductDeviceCompatibility
   | ComponentProductListBanner
   | ComponentProductListItemTypeOverride
   | ComponentProductListLinkedProductListSet
   | ComponentProductListRelatedPosts
   | ComponentProductProduct
   | ComponentProductProductCustomerReviews
   | ComponentProductReplacementGuides
   | ComponentSectionBanner
   | ComponentSectionFaqs
   | ComponentSectionFeaturedProducts
   | ComponentSectionLifetimeWarranty
   | ComponentSectionQuote
   | ComponentSectionQuoteCard
   | ComponentSectionQuoteGallery
   | ComponentSectionServiceValuePropositions
   | ComponentSectionSocialGallery
   | ComponentSectionStories
   | ComponentSectionTools
   | ComponentStoreFooter
   | ComponentStoreHeader
   | ComponentStoreShopifySettings
   | ComponentStoreSocialMediaAccounts
   | Faq
   | Global
   | I18NLocale
   | ItemType
   | Menu
   | Page
   | Product
   | ProductList
   | PublisherAction
   | ReusableSection
   | ScrewdriverBit
   | ScrewdriverBitType
   | SocialPost
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
   nei?: InputMaybe<Scalars['ID']>;
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
   nei?: InputMaybe<Scalars['Int']>;
   not?: InputMaybe<IntFilterInput>;
   notContains?: InputMaybe<Scalars['Int']>;
   notContainsi?: InputMaybe<Scalars['Int']>;
   notIn?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
   notNull?: InputMaybe<Scalars['Boolean']>;
   null?: InputMaybe<Scalars['Boolean']>;
   or?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
   startsWith?: InputMaybe<Scalars['Int']>;
};

export type ItemType = {
   __typename?: 'ItemType';
   akeneo_code: Scalars['String'];
   createdAt?: Maybe<Scalars['DateTime']>;
   fallback_image: UploadFileEntityResponse;
   publishedAt?: Maybe<Scalars['DateTime']>;
   updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ItemTypeEntity = {
   __typename?: 'ItemTypeEntity';
   attributes?: Maybe<ItemType>;
   id?: Maybe<Scalars['ID']>;
};

export type ItemTypeEntityResponse = {
   __typename?: 'ItemTypeEntityResponse';
   data?: Maybe<ItemTypeEntity>;
};

export type ItemTypeEntityResponseCollection = {
   __typename?: 'ItemTypeEntityResponseCollection';
   data: Array<ItemTypeEntity>;
   meta: ResponseCollectionMeta;
};

export type ItemTypeFiltersInput = {
   akeneo_code?: InputMaybe<StringFilterInput>;
   and?: InputMaybe<Array<InputMaybe<ItemTypeFiltersInput>>>;
   createdAt?: InputMaybe<DateTimeFilterInput>;
   id?: InputMaybe<IdFilterInput>;
   not?: InputMaybe<ItemTypeFiltersInput>;
   or?: InputMaybe<Array<InputMaybe<ItemTypeFiltersInput>>>;
   publishedAt?: InputMaybe<DateTimeFilterInput>;
   updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ItemTypeInput = {
   akeneo_code?: InputMaybe<Scalars['String']>;
   fallback_image?: InputMaybe<Scalars['ID']>;
   publishedAt?: InputMaybe<Scalars['DateTime']>;
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
   nei?: InputMaybe<Scalars['JSON']>;
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
   createBanner?: Maybe<BannerEntityResponse>;
   createBannerLocalization?: Maybe<BannerEntityResponse>;
   createCompany?: Maybe<CompanyEntityResponse>;
   createFaq?: Maybe<FaqEntityResponse>;
   createGlobalLocalization?: Maybe<GlobalEntityResponse>;
   createItemType?: Maybe<ItemTypeEntityResponse>;
   createMenu?: Maybe<MenuEntityResponse>;
   createMenuLocalization?: Maybe<MenuEntityResponse>;
   createPage?: Maybe<PageEntityResponse>;
   createPageLocalization?: Maybe<PageEntityResponse>;
   createProduct?: Maybe<ProductEntityResponse>;
   createProductList?: Maybe<ProductListEntityResponse>;
   createProductListLocalization?: Maybe<ProductListEntityResponse>;
   createPublisherAction?: Maybe<PublisherActionEntityResponse>;
   createReusableSection?: Maybe<ReusableSectionEntityResponse>;
   createScrewdriverBit?: Maybe<ScrewdriverBitEntityResponse>;
   createScrewdriverBitType?: Maybe<ScrewdriverBitTypeEntityResponse>;
   createSocialPost?: Maybe<SocialPostEntityResponse>;
   createStore?: Maybe<StoreEntityResponse>;
   createUploadFile?: Maybe<UploadFileEntityResponse>;
   createUploadFolder?: Maybe<UploadFolderEntityResponse>;
   /** Create a new role */
   createUsersPermissionsRole?: Maybe<UsersPermissionsCreateRolePayload>;
   /** Create a new user */
   createUsersPermissionsUser: UsersPermissionsUserEntityResponse;
   deleteBanner?: Maybe<BannerEntityResponse>;
   deleteCompany?: Maybe<CompanyEntityResponse>;
   deleteFaq?: Maybe<FaqEntityResponse>;
   deleteGlobal?: Maybe<GlobalEntityResponse>;
   deleteItemType?: Maybe<ItemTypeEntityResponse>;
   deleteMenu?: Maybe<MenuEntityResponse>;
   deletePage?: Maybe<PageEntityResponse>;
   deleteProduct?: Maybe<ProductEntityResponse>;
   deleteProductList?: Maybe<ProductListEntityResponse>;
   deletePublisherAction?: Maybe<PublisherActionEntityResponse>;
   deleteReusableSection?: Maybe<ReusableSectionEntityResponse>;
   deleteScrewdriverBit?: Maybe<ScrewdriverBitEntityResponse>;
   deleteScrewdriverBitType?: Maybe<ScrewdriverBitTypeEntityResponse>;
   deleteSocialPost?: Maybe<SocialPostEntityResponse>;
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
   updateBanner?: Maybe<BannerEntityResponse>;
   updateCompany?: Maybe<CompanyEntityResponse>;
   updateFaq?: Maybe<FaqEntityResponse>;
   updateFileInfo: UploadFileEntityResponse;
   updateGlobal?: Maybe<GlobalEntityResponse>;
   updateItemType?: Maybe<ItemTypeEntityResponse>;
   updateMenu?: Maybe<MenuEntityResponse>;
   updatePage?: Maybe<PageEntityResponse>;
   updateProduct?: Maybe<ProductEntityResponse>;
   updateProductList?: Maybe<ProductListEntityResponse>;
   updatePublisherAction?: Maybe<PublisherActionEntityResponse>;
   updateReusableSection?: Maybe<ReusableSectionEntityResponse>;
   updateScrewdriverBit?: Maybe<ScrewdriverBitEntityResponse>;
   updateScrewdriverBitType?: Maybe<ScrewdriverBitTypeEntityResponse>;
   updateSocialPost?: Maybe<SocialPostEntityResponse>;
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

export type MutationCreateBannerArgs = {
   data: BannerInput;
   locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};

export type MutationCreateBannerLocalizationArgs = {
   data?: InputMaybe<BannerInput>;
   id?: InputMaybe<Scalars['ID']>;
   locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};

export type MutationCreateCompanyArgs = {
   data: CompanyInput;
};

export type MutationCreateFaqArgs = {
   data: FaqInput;
};

export type MutationCreateGlobalLocalizationArgs = {
   data?: InputMaybe<GlobalInput>;
   id?: InputMaybe<Scalars['ID']>;
   locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};

export type MutationCreateItemTypeArgs = {
   data: ItemTypeInput;
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

export type MutationCreateProductArgs = {
   data: ProductInput;
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

export type MutationCreatePublisherActionArgs = {
   data: PublisherActionInput;
};

export type MutationCreateReusableSectionArgs = {
   data: ReusableSectionInput;
};

export type MutationCreateScrewdriverBitArgs = {
   data: ScrewdriverBitInput;
};

export type MutationCreateScrewdriverBitTypeArgs = {
   data: ScrewdriverBitTypeInput;
};

export type MutationCreateSocialPostArgs = {
   data: SocialPostInput;
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

export type MutationDeleteBannerArgs = {
   id: Scalars['ID'];
   locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};

export type MutationDeleteCompanyArgs = {
   id: Scalars['ID'];
};

export type MutationDeleteFaqArgs = {
   id: Scalars['ID'];
};

export type MutationDeleteGlobalArgs = {
   locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};

export type MutationDeleteItemTypeArgs = {
   id: Scalars['ID'];
};

export type MutationDeleteMenuArgs = {
   id: Scalars['ID'];
   locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};

export type MutationDeletePageArgs = {
   id: Scalars['ID'];
   locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};

export type MutationDeleteProductArgs = {
   id: Scalars['ID'];
};

export type MutationDeleteProductListArgs = {
   id: Scalars['ID'];
   locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};

export type MutationDeletePublisherActionArgs = {
   id: Scalars['ID'];
};

export type MutationDeleteReusableSectionArgs = {
   id: Scalars['ID'];
};

export type MutationDeleteScrewdriverBitArgs = {
   id: Scalars['ID'];
};

export type MutationDeleteScrewdriverBitTypeArgs = {
   id: Scalars['ID'];
};

export type MutationDeleteSocialPostArgs = {
   id: Scalars['ID'];
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

export type MutationUpdateBannerArgs = {
   data: BannerInput;
   id: Scalars['ID'];
   locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};

export type MutationUpdateCompanyArgs = {
   data: CompanyInput;
   id: Scalars['ID'];
};

export type MutationUpdateFaqArgs = {
   data: FaqInput;
   id: Scalars['ID'];
};

export type MutationUpdateFileInfoArgs = {
   id: Scalars['ID'];
   info?: InputMaybe<FileInfoInput>;
};

export type MutationUpdateGlobalArgs = {
   data: GlobalInput;
   locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};

export type MutationUpdateItemTypeArgs = {
   data: ItemTypeInput;
   id: Scalars['ID'];
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

export type MutationUpdateProductArgs = {
   data: ProductInput;
   id: Scalars['ID'];
};

export type MutationUpdateProductListArgs = {
   data: ProductListInput;
   id: Scalars['ID'];
   locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};

export type MutationUpdatePublisherActionArgs = {
   data: PublisherActionInput;
   id: Scalars['ID'];
};

export type MutationUpdateReusableSectionArgs = {
   data: ReusableSectionInput;
   id: Scalars['ID'];
};

export type MutationUpdateScrewdriverBitArgs = {
   data: ScrewdriverBitInput;
   id: Scalars['ID'];
};

export type MutationUpdateScrewdriverBitTypeArgs = {
   data: ScrewdriverBitTypeInput;
   id: Scalars['ID'];
};

export type MutationUpdateSocialPostArgs = {
   data: SocialPostInput;
   id: Scalars['ID'];
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
   metaDescription?: Maybe<Scalars['String']>;
   metaTitle?: Maybe<Scalars['String']>;
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
   metaDescription?: InputMaybe<StringFilterInput>;
   metaTitle?: InputMaybe<StringFilterInput>;
   not?: InputMaybe<PageFiltersInput>;
   or?: InputMaybe<Array<InputMaybe<PageFiltersInput>>>;
   path?: InputMaybe<StringFilterInput>;
   publishedAt?: InputMaybe<DateTimeFilterInput>;
   title?: InputMaybe<StringFilterInput>;
   updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type PageInput = {
   metaDescription?: InputMaybe<Scalars['String']>;
   metaTitle?: InputMaybe<Scalars['String']>;
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
   | ComponentPagePress
   | ComponentPageSplitWithImage
   | ComponentPageStats
   | ComponentSectionBanner
   | ComponentSectionFeaturedProducts
   | ComponentSectionLifetimeWarranty
   | ComponentSectionQuoteGallery
   | ComponentSectionSocialGallery
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

export type Product = {
   __typename?: 'Product';
   createdAt?: Maybe<Scalars['DateTime']>;
   handle: Scalars['String'];
   publishedAt?: Maybe<Scalars['DateTime']>;
   sections: Array<Maybe<ProductSectionsDynamicZone>>;
   updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ProductEntity = {
   __typename?: 'ProductEntity';
   attributes?: Maybe<Product>;
   id?: Maybe<Scalars['ID']>;
};

export type ProductEntityResponse = {
   __typename?: 'ProductEntityResponse';
   data?: Maybe<ProductEntity>;
};

export type ProductEntityResponseCollection = {
   __typename?: 'ProductEntityResponseCollection';
   data: Array<ProductEntity>;
   meta: ResponseCollectionMeta;
};

export type ProductFiltersInput = {
   and?: InputMaybe<Array<InputMaybe<ProductFiltersInput>>>;
   createdAt?: InputMaybe<DateTimeFilterInput>;
   handle?: InputMaybe<StringFilterInput>;
   id?: InputMaybe<IdFilterInput>;
   not?: InputMaybe<ProductFiltersInput>;
   or?: InputMaybe<Array<InputMaybe<ProductFiltersInput>>>;
   publishedAt?: InputMaybe<DateTimeFilterInput>;
   updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ProductInput = {
   handle?: InputMaybe<Scalars['String']>;
   publishedAt?: InputMaybe<Scalars['DateTime']>;
   sections?: InputMaybe<Array<Scalars['ProductSectionsDynamicZoneInput']>>;
};

export type ProductList = {
   __typename?: 'ProductList';
   brandLogo?: Maybe<UploadFileEntityResponse>;
   brandLogoWidth?: Maybe<Scalars['Int']>;
   children?: Maybe<ProductListRelationResponseCollection>;
   createdAt?: Maybe<Scalars['DateTime']>;
   defaultShowAllChildrenOnLgSizes?: Maybe<Scalars['Boolean']>;
   description: Scalars['String'];
   deviceTitle?: Maybe<Scalars['String']>;
   faqs?: Maybe<FaqRelationResponseCollection>;
   filters?: Maybe<Scalars['String']>;
   forceNoindex?: Maybe<Scalars['Boolean']>;
   h1?: Maybe<Scalars['String']>;
   handle: Scalars['String'];
   heroImage?: Maybe<UploadFileEntityResponse>;
   hideFromParent?: Maybe<Scalars['Boolean']>;
   image?: Maybe<UploadFileEntityResponse>;
   indexVariantsInsteadOfDevice?: Maybe<Scalars['Boolean']>;
   itemOverrides: Array<Maybe<ProductListItemOverridesDynamicZone>>;
   legacyDescription?: Maybe<Scalars['String']>;
   legacyPageId?: Maybe<Scalars['Int']>;
   locale?: Maybe<Scalars['String']>;
   localizations?: Maybe<ProductListRelationResponseCollection>;
   metaDescription?: Maybe<Scalars['String']>;
   metaTitle?: Maybe<Scalars['String']>;
   optionalFilters?: Maybe<Scalars['String']>;
   parent?: Maybe<ProductListEntityResponse>;
   publishedAt?: Maybe<Scalars['DateTime']>;
   redirectFrom?: Maybe<ProductListRelationResponseCollection>;
   redirectTo?: Maybe<ProductListEntityResponse>;
   redirectToType?: Maybe<Enum_Productlist_Redirecttotype>;
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

export type ProductListFaqsArgs = {
   filters?: InputMaybe<FaqFiltersInput>;
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

export type ProductListRedirectFromArgs = {
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
   brandLogoWidth?: InputMaybe<IntFilterInput>;
   children?: InputMaybe<ProductListFiltersInput>;
   createdAt?: InputMaybe<DateTimeFilterInput>;
   defaultShowAllChildrenOnLgSizes?: InputMaybe<BooleanFilterInput>;
   description?: InputMaybe<StringFilterInput>;
   deviceTitle?: InputMaybe<StringFilterInput>;
   faqs?: InputMaybe<FaqFiltersInput>;
   filters?: InputMaybe<StringFilterInput>;
   forceNoindex?: InputMaybe<BooleanFilterInput>;
   h1?: InputMaybe<StringFilterInput>;
   handle?: InputMaybe<StringFilterInput>;
   hideFromParent?: InputMaybe<BooleanFilterInput>;
   id?: InputMaybe<IdFilterInput>;
   indexVariantsInsteadOfDevice?: InputMaybe<BooleanFilterInput>;
   legacyDescription?: InputMaybe<StringFilterInput>;
   legacyPageId?: InputMaybe<IntFilterInput>;
   locale?: InputMaybe<StringFilterInput>;
   localizations?: InputMaybe<ProductListFiltersInput>;
   metaDescription?: InputMaybe<StringFilterInput>;
   metaTitle?: InputMaybe<StringFilterInput>;
   not?: InputMaybe<ProductListFiltersInput>;
   optionalFilters?: InputMaybe<StringFilterInput>;
   or?: InputMaybe<Array<InputMaybe<ProductListFiltersInput>>>;
   parent?: InputMaybe<ProductListFiltersInput>;
   publishedAt?: InputMaybe<DateTimeFilterInput>;
   redirectFrom?: InputMaybe<ProductListFiltersInput>;
   redirectTo?: InputMaybe<ProductListFiltersInput>;
   redirectToType?: InputMaybe<StringFilterInput>;
   sortPriority?: InputMaybe<IntFilterInput>;
   tagline?: InputMaybe<StringFilterInput>;
   title?: InputMaybe<StringFilterInput>;
   type?: InputMaybe<StringFilterInput>;
   updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ProductListInput = {
   brandLogo?: InputMaybe<Scalars['ID']>;
   brandLogoWidth?: InputMaybe<Scalars['Int']>;
   children?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
   defaultShowAllChildrenOnLgSizes?: InputMaybe<Scalars['Boolean']>;
   description?: InputMaybe<Scalars['String']>;
   deviceTitle?: InputMaybe<Scalars['String']>;
   faqs?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
   filters?: InputMaybe<Scalars['String']>;
   forceNoindex?: InputMaybe<Scalars['Boolean']>;
   h1?: InputMaybe<Scalars['String']>;
   handle?: InputMaybe<Scalars['String']>;
   heroImage?: InputMaybe<Scalars['ID']>;
   hideFromParent?: InputMaybe<Scalars['Boolean']>;
   image?: InputMaybe<Scalars['ID']>;
   indexVariantsInsteadOfDevice?: InputMaybe<Scalars['Boolean']>;
   itemOverrides?: InputMaybe<
      Array<Scalars['ProductListItemOverridesDynamicZoneInput']>
   >;
   legacyDescription?: InputMaybe<Scalars['String']>;
   legacyPageId?: InputMaybe<Scalars['Int']>;
   metaDescription?: InputMaybe<Scalars['String']>;
   metaTitle?: InputMaybe<Scalars['String']>;
   optionalFilters?: InputMaybe<Scalars['String']>;
   parent?: InputMaybe<Scalars['ID']>;
   publishedAt?: InputMaybe<Scalars['DateTime']>;
   redirectFrom?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
   redirectTo?: InputMaybe<Scalars['ID']>;
   redirectToType?: InputMaybe<Enum_Productlist_Redirecttotype>;
   sections?: InputMaybe<Array<Scalars['ProductListSectionsDynamicZoneInput']>>;
   sortPriority?: InputMaybe<Scalars['Int']>;
   tagline?: InputMaybe<Scalars['String']>;
   title?: InputMaybe<Scalars['String']>;
   type?: InputMaybe<Enum_Productlist_Type>;
};

export type ProductListItemOverridesDynamicZone =
   | ComponentProductListItemTypeOverride
   | Error;

export type ProductListRelationResponseCollection = {
   __typename?: 'ProductListRelationResponseCollection';
   data: Array<ProductListEntity>;
};

export type ProductListSectionsDynamicZone =
   | ComponentProductListBanner
   | ComponentProductListLinkedProductListSet
   | ComponentProductListRelatedPosts
   | Error;

export type ProductSectionsDynamicZone =
   | ComponentPageSplitWithImage
   | ComponentProductBitTable
   | ComponentProductCrossSell
   | ComponentProductDeviceCompatibility
   | ComponentProductProduct
   | ComponentProductProductCustomerReviews
   | ComponentProductReplacementGuides
   | ComponentSectionBanner
   | ComponentSectionFaqs
   | ComponentSectionFeaturedProducts
   | ComponentSectionLifetimeWarranty
   | ComponentSectionQuote
   | ComponentSectionServiceValuePropositions
   | ComponentSectionStories
   | ComponentSectionTools
   | Error;

export enum PublicationState {
   Live = 'LIVE',
   Preview = 'PREVIEW',
}

export type PublisherAction = {
   __typename?: 'PublisherAction';
   createdAt?: Maybe<Scalars['DateTime']>;
   entityId?: Maybe<Scalars['Int']>;
   entitySlug?: Maybe<Scalars['String']>;
   executeAt?: Maybe<Scalars['DateTime']>;
   mode?: Maybe<Scalars['String']>;
   updatedAt?: Maybe<Scalars['DateTime']>;
};

export type PublisherActionEntity = {
   __typename?: 'PublisherActionEntity';
   attributes?: Maybe<PublisherAction>;
   id?: Maybe<Scalars['ID']>;
};

export type PublisherActionEntityResponse = {
   __typename?: 'PublisherActionEntityResponse';
   data?: Maybe<PublisherActionEntity>;
};

export type PublisherActionEntityResponseCollection = {
   __typename?: 'PublisherActionEntityResponseCollection';
   data: Array<PublisherActionEntity>;
   meta: ResponseCollectionMeta;
};

export type PublisherActionFiltersInput = {
   and?: InputMaybe<Array<InputMaybe<PublisherActionFiltersInput>>>;
   createdAt?: InputMaybe<DateTimeFilterInput>;
   entityId?: InputMaybe<IntFilterInput>;
   entitySlug?: InputMaybe<StringFilterInput>;
   executeAt?: InputMaybe<DateTimeFilterInput>;
   id?: InputMaybe<IdFilterInput>;
   mode?: InputMaybe<StringFilterInput>;
   not?: InputMaybe<PublisherActionFiltersInput>;
   or?: InputMaybe<Array<InputMaybe<PublisherActionFiltersInput>>>;
   updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type PublisherActionInput = {
   entityId?: InputMaybe<Scalars['Int']>;
   entitySlug?: InputMaybe<Scalars['String']>;
   executeAt?: InputMaybe<Scalars['DateTime']>;
   mode?: InputMaybe<Scalars['String']>;
};

export type Query = {
   __typename?: 'Query';
   banner?: Maybe<BannerEntityResponse>;
   banners?: Maybe<BannerEntityResponseCollection>;
   companies?: Maybe<CompanyEntityResponseCollection>;
   company?: Maybe<CompanyEntityResponse>;
   faq?: Maybe<FaqEntityResponse>;
   faqs?: Maybe<FaqEntityResponseCollection>;
   global?: Maybe<GlobalEntityResponse>;
   i18NLocale?: Maybe<I18NLocaleEntityResponse>;
   i18NLocales?: Maybe<I18NLocaleEntityResponseCollection>;
   itemType?: Maybe<ItemTypeEntityResponse>;
   itemTypes?: Maybe<ItemTypeEntityResponseCollection>;
   me?: Maybe<UsersPermissionsMe>;
   menu?: Maybe<MenuEntityResponse>;
   menus?: Maybe<MenuEntityResponseCollection>;
   page?: Maybe<PageEntityResponse>;
   pages?: Maybe<PageEntityResponseCollection>;
   product?: Maybe<ProductEntityResponse>;
   productList?: Maybe<ProductListEntityResponse>;
   productLists?: Maybe<ProductListEntityResponseCollection>;
   products?: Maybe<ProductEntityResponseCollection>;
   publisherAction?: Maybe<PublisherActionEntityResponse>;
   publisherActions?: Maybe<PublisherActionEntityResponseCollection>;
   reusableSection?: Maybe<ReusableSectionEntityResponse>;
   reusableSections?: Maybe<ReusableSectionEntityResponseCollection>;
   screwdriverBit?: Maybe<ScrewdriverBitEntityResponse>;
   screwdriverBitType?: Maybe<ScrewdriverBitTypeEntityResponse>;
   screwdriverBitTypes?: Maybe<ScrewdriverBitTypeEntityResponseCollection>;
   screwdriverBits?: Maybe<ScrewdriverBitEntityResponseCollection>;
   socialPost?: Maybe<SocialPostEntityResponse>;
   socialPosts?: Maybe<SocialPostEntityResponseCollection>;
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

export type QueryBannerArgs = {
   id?: InputMaybe<Scalars['ID']>;
   locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};

export type QueryBannersArgs = {
   filters?: InputMaybe<BannerFiltersInput>;
   locale?: InputMaybe<Scalars['I18NLocaleCode']>;
   pagination?: InputMaybe<PaginationArg>;
   publicationState?: InputMaybe<PublicationState>;
   sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type QueryCompaniesArgs = {
   filters?: InputMaybe<CompanyFiltersInput>;
   pagination?: InputMaybe<PaginationArg>;
   publicationState?: InputMaybe<PublicationState>;
   sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type QueryCompanyArgs = {
   id?: InputMaybe<Scalars['ID']>;
};

export type QueryFaqArgs = {
   id?: InputMaybe<Scalars['ID']>;
};

export type QueryFaqsArgs = {
   filters?: InputMaybe<FaqFiltersInput>;
   pagination?: InputMaybe<PaginationArg>;
   publicationState?: InputMaybe<PublicationState>;
   sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
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

export type QueryItemTypeArgs = {
   id?: InputMaybe<Scalars['ID']>;
};

export type QueryItemTypesArgs = {
   filters?: InputMaybe<ItemTypeFiltersInput>;
   pagination?: InputMaybe<PaginationArg>;
   publicationState?: InputMaybe<PublicationState>;
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

export type QueryProductArgs = {
   id?: InputMaybe<Scalars['ID']>;
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

export type QueryProductsArgs = {
   filters?: InputMaybe<ProductFiltersInput>;
   pagination?: InputMaybe<PaginationArg>;
   publicationState?: InputMaybe<PublicationState>;
   sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type QueryPublisherActionArgs = {
   id?: InputMaybe<Scalars['ID']>;
};

export type QueryPublisherActionsArgs = {
   filters?: InputMaybe<PublisherActionFiltersInput>;
   pagination?: InputMaybe<PaginationArg>;
   sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type QueryReusableSectionArgs = {
   id?: InputMaybe<Scalars['ID']>;
};

export type QueryReusableSectionsArgs = {
   filters?: InputMaybe<ReusableSectionFiltersInput>;
   pagination?: InputMaybe<PaginationArg>;
   publicationState?: InputMaybe<PublicationState>;
   sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type QueryScrewdriverBitArgs = {
   id?: InputMaybe<Scalars['ID']>;
};

export type QueryScrewdriverBitTypeArgs = {
   id?: InputMaybe<Scalars['ID']>;
};

export type QueryScrewdriverBitTypesArgs = {
   filters?: InputMaybe<ScrewdriverBitTypeFiltersInput>;
   pagination?: InputMaybe<PaginationArg>;
   sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type QueryScrewdriverBitsArgs = {
   filters?: InputMaybe<ScrewdriverBitFiltersInput>;
   pagination?: InputMaybe<PaginationArg>;
   sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type QuerySocialPostArgs = {
   id?: InputMaybe<Scalars['ID']>;
};

export type QuerySocialPostsArgs = {
   filters?: InputMaybe<SocialPostFiltersInput>;
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

export type ReusableSection = {
   __typename?: 'ReusableSection';
   createdAt?: Maybe<Scalars['DateTime']>;
   placement: Array<Maybe<ComponentMiscPlacement>>;
   positionInProductList: Enum_Reusablesection_Positioninproductlist;
   priority: Scalars['Int'];
   publishedAt?: Maybe<Scalars['DateTime']>;
   section: Array<Maybe<ReusableSectionSectionDynamicZone>>;
   updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ReusableSectionPlacementArgs = {
   filters?: InputMaybe<ComponentMiscPlacementFiltersInput>;
   pagination?: InputMaybe<PaginationArg>;
   sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ReusableSectionEntity = {
   __typename?: 'ReusableSectionEntity';
   attributes?: Maybe<ReusableSection>;
   id?: Maybe<Scalars['ID']>;
};

export type ReusableSectionEntityResponse = {
   __typename?: 'ReusableSectionEntityResponse';
   data?: Maybe<ReusableSectionEntity>;
};

export type ReusableSectionEntityResponseCollection = {
   __typename?: 'ReusableSectionEntityResponseCollection';
   data: Array<ReusableSectionEntity>;
   meta: ResponseCollectionMeta;
};

export type ReusableSectionFiltersInput = {
   and?: InputMaybe<Array<InputMaybe<ReusableSectionFiltersInput>>>;
   createdAt?: InputMaybe<DateTimeFilterInput>;
   id?: InputMaybe<IdFilterInput>;
   not?: InputMaybe<ReusableSectionFiltersInput>;
   or?: InputMaybe<Array<InputMaybe<ReusableSectionFiltersInput>>>;
   placement?: InputMaybe<ComponentMiscPlacementFiltersInput>;
   positionInProductList?: InputMaybe<StringFilterInput>;
   priority?: InputMaybe<IntFilterInput>;
   publishedAt?: InputMaybe<DateTimeFilterInput>;
   title?: InputMaybe<StringFilterInput>;
   updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ReusableSectionInput = {
   placement?: InputMaybe<Array<InputMaybe<ComponentMiscPlacementInput>>>;
   positionInProductList?: InputMaybe<Enum_Reusablesection_Positioninproductlist>;
   priority?: InputMaybe<Scalars['Int']>;
   publishedAt?: InputMaybe<Scalars['DateTime']>;
   section?: InputMaybe<
      Array<Scalars['ReusableSectionSectionDynamicZoneInput']>
   >;
   title?: InputMaybe<Scalars['String']>;
};

export type ReusableSectionSectionDynamicZone =
   | ComponentPagePress
   | ComponentPageSplitWithImage
   | ComponentSectionBanner
   | ComponentSectionFaqs
   | ComponentSectionQuoteGallery
   | Error;

export type ScrewdriverBit = {
   __typename?: 'ScrewdriverBit';
   createdAt?: Maybe<Scalars['DateTime']>;
   size?: Maybe<Scalars['String']>;
   slug?: Maybe<Scalars['String']>;
   type?: Maybe<ScrewdriverBitTypeEntityResponse>;
   updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ScrewdriverBitEntity = {
   __typename?: 'ScrewdriverBitEntity';
   attributes?: Maybe<ScrewdriverBit>;
   id?: Maybe<Scalars['ID']>;
};

export type ScrewdriverBitEntityResponse = {
   __typename?: 'ScrewdriverBitEntityResponse';
   data?: Maybe<ScrewdriverBitEntity>;
};

export type ScrewdriverBitEntityResponseCollection = {
   __typename?: 'ScrewdriverBitEntityResponseCollection';
   data: Array<ScrewdriverBitEntity>;
   meta: ResponseCollectionMeta;
};

export type ScrewdriverBitFiltersInput = {
   and?: InputMaybe<Array<InputMaybe<ScrewdriverBitFiltersInput>>>;
   createdAt?: InputMaybe<DateTimeFilterInput>;
   id?: InputMaybe<IdFilterInput>;
   not?: InputMaybe<ScrewdriverBitFiltersInput>;
   or?: InputMaybe<Array<InputMaybe<ScrewdriverBitFiltersInput>>>;
   size?: InputMaybe<StringFilterInput>;
   slug?: InputMaybe<StringFilterInput>;
   type?: InputMaybe<ScrewdriverBitTypeFiltersInput>;
   updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ScrewdriverBitInput = {
   size?: InputMaybe<Scalars['String']>;
   slug?: InputMaybe<Scalars['String']>;
   type?: InputMaybe<Scalars['ID']>;
};

export type ScrewdriverBitRelationResponseCollection = {
   __typename?: 'ScrewdriverBitRelationResponseCollection';
   data: Array<ScrewdriverBitEntity>;
};

export type ScrewdriverBitType = {
   __typename?: 'ScrewdriverBitType';
   createdAt?: Maybe<Scalars['DateTime']>;
   driverSize: Scalars['String'];
   icon: UploadFileEntityResponse;
   name: Scalars['String'];
   slug?: Maybe<Scalars['String']>;
   updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ScrewdriverBitTypeEntity = {
   __typename?: 'ScrewdriverBitTypeEntity';
   attributes?: Maybe<ScrewdriverBitType>;
   id?: Maybe<Scalars['ID']>;
};

export type ScrewdriverBitTypeEntityResponse = {
   __typename?: 'ScrewdriverBitTypeEntityResponse';
   data?: Maybe<ScrewdriverBitTypeEntity>;
};

export type ScrewdriverBitTypeEntityResponseCollection = {
   __typename?: 'ScrewdriverBitTypeEntityResponseCollection';
   data: Array<ScrewdriverBitTypeEntity>;
   meta: ResponseCollectionMeta;
};

export type ScrewdriverBitTypeFiltersInput = {
   and?: InputMaybe<Array<InputMaybe<ScrewdriverBitTypeFiltersInput>>>;
   createdAt?: InputMaybe<DateTimeFilterInput>;
   driverSize?: InputMaybe<StringFilterInput>;
   id?: InputMaybe<IdFilterInput>;
   name?: InputMaybe<StringFilterInput>;
   not?: InputMaybe<ScrewdriverBitTypeFiltersInput>;
   or?: InputMaybe<Array<InputMaybe<ScrewdriverBitTypeFiltersInput>>>;
   slug?: InputMaybe<StringFilterInput>;
   updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ScrewdriverBitTypeInput = {
   driverSize?: InputMaybe<Scalars['String']>;
   icon?: InputMaybe<Scalars['ID']>;
   name?: InputMaybe<Scalars['String']>;
   slug?: InputMaybe<Scalars['String']>;
};

export type SocialPost = {
   __typename?: 'SocialPost';
   author: Scalars['String'];
   createdAt?: Maybe<Scalars['DateTime']>;
   image: UploadFileEntityResponse;
   publishedAt?: Maybe<Scalars['DateTime']>;
   updatedAt?: Maybe<Scalars['DateTime']>;
   url?: Maybe<Scalars['String']>;
};

export type SocialPostEntity = {
   __typename?: 'SocialPostEntity';
   attributes?: Maybe<SocialPost>;
   id?: Maybe<Scalars['ID']>;
};

export type SocialPostEntityResponse = {
   __typename?: 'SocialPostEntityResponse';
   data?: Maybe<SocialPostEntity>;
};

export type SocialPostEntityResponseCollection = {
   __typename?: 'SocialPostEntityResponseCollection';
   data: Array<SocialPostEntity>;
   meta: ResponseCollectionMeta;
};

export type SocialPostFiltersInput = {
   and?: InputMaybe<Array<InputMaybe<SocialPostFiltersInput>>>;
   author?: InputMaybe<StringFilterInput>;
   createdAt?: InputMaybe<DateTimeFilterInput>;
   id?: InputMaybe<IdFilterInput>;
   not?: InputMaybe<SocialPostFiltersInput>;
   or?: InputMaybe<Array<InputMaybe<SocialPostFiltersInput>>>;
   publishedAt?: InputMaybe<DateTimeFilterInput>;
   title?: InputMaybe<StringFilterInput>;
   updatedAt?: InputMaybe<DateTimeFilterInput>;
   url?: InputMaybe<StringFilterInput>;
};

export type SocialPostInput = {
   author?: InputMaybe<Scalars['String']>;
   image?: InputMaybe<Scalars['ID']>;
   publishedAt?: InputMaybe<Scalars['DateTime']>;
   title?: InputMaybe<Scalars['String']>;
   url?: InputMaybe<Scalars['String']>;
};

export type SocialPostRelationResponseCollection = {
   __typename?: 'SocialPostRelationResponseCollection';
   data: Array<SocialPostEntity>;
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
   nei?: InputMaybe<Scalars['String']>;
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

export type BannerFieldsFragment = {
   __typename?: 'BannerEntity';
   id?: string | null;
   attributes?: {
      __typename?: 'Banner';
      title?: string | null;
      label?: string | null;
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
      callToAction?: {
         __typename?: 'ComponentPageCallToAction';
         title: string;
         url: string;
      } | null;
   } | null;
};

export type CallToActionFieldsFragment = {
   __typename?: 'ComponentPageCallToAction';
   title: string;
   url: string;
};

export type CompanyFieldsFragment = {
   __typename?: 'CompanyEntity';
   id?: string | null;
   attributes?: {
      __typename?: 'Company';
      name: string;
      logo?: {
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

export type FaqFieldsFragment = {
   __typename?: 'FaqEntity';
   id?: string | null;
   attributes?: {
      __typename?: 'Faq';
      question: string;
      answer: string;
      category?: string | null;
      item_type?: string | null;
      priority?: number | null;
   } | null;
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

export type PersonFieldsFragment = {
   __typename?: 'ComponentGlobalPerson';
   id: string;
   name?: string | null;
   role?: string | null;
   avatar?: {
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
};

export type ProductListPreviewFieldsFragment = {
   __typename?: 'ProductList';
   type?: Enum_Productlist_Type | null;
   handle: string;
   deviceTitle?: string | null;
   title: string;
   description: string;
   metaDescription?: string | null;
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
};

export type QuoteCardFieldsFragment = {
   __typename?: 'ComponentSectionQuoteCard';
   id: string;
   text: string;
   author?: {
      __typename?: 'ComponentGlobalPerson';
      id: string;
      name?: string | null;
      role?: string | null;
      avatar?: {
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

export type ScrewdriverBitFieldsFragment = {
   __typename?: 'ScrewdriverBitEntity';
   id?: string | null;
   attributes?: {
      __typename?: 'ScrewdriverBit';
      size?: string | null;
      type?: {
         __typename?: 'ScrewdriverBitTypeEntityResponse';
         data?: {
            __typename?: 'ScrewdriverBitTypeEntity';
            id?: string | null;
            attributes?: {
               __typename?: 'ScrewdriverBitType';
               name: string;
               driverSize: string;
               icon: {
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
            } | null;
         } | null;
      } | null;
   } | null;
};

export type ScrewdriverBitTypeFieldsFragment = {
   __typename?: 'ScrewdriverBitTypeEntity';
   id?: string | null;
   attributes?: {
      __typename?: 'ScrewdriverBitType';
      name: string;
      driverSize: string;
      icon: {
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
            metaTitle?: string | null;
            metaDescription?: string | null;
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
                       description?: string | null;
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
                                description: string;
                                metaDescription?: string | null;
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
                    __typename: 'ComponentPagePress';
                    id: string;
                    title?: string | null;
                    description?: string | null;
                    quotes?: Array<{
                       __typename?: 'ComponentPagePressQuote';
                       id: string;
                       text: string;
                       company?: {
                          __typename?: 'CompanyEntityResponse';
                          data?: {
                             __typename?: 'CompanyEntity';
                             id?: string | null;
                             attributes?: {
                                __typename?: 'Company';
                                name: string;
                                logo?: {
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
                    callToAction?: {
                       __typename?: 'ComponentPageCallToAction';
                       title: string;
                       url: string;
                    } | null;
                 }
               | {
                    __typename: 'ComponentPageSplitWithImage';
                    id: string;
                    title?: string | null;
                    label?: string | null;
                    description?: string | null;
                    imagePosition?: Enum_Componentpagesplitwithimage_Imageposition | null;
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
               | {
                    __typename: 'ComponentSectionBanner';
                    id: string;
                    banners?: {
                       __typename?: 'BannerRelationResponseCollection';
                       data: Array<{
                          __typename?: 'BannerEntity';
                          id?: string | null;
                          attributes?: {
                             __typename?: 'Banner';
                             title?: string | null;
                             label?: string | null;
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
                             callToAction?: {
                                __typename?: 'ComponentPageCallToAction';
                                title: string;
                                url: string;
                             } | null;
                          } | null;
                       }>;
                    } | null;
                 }
               | {
                    __typename: 'ComponentSectionFeaturedProducts';
                    id: string;
                    title?: string | null;
                    description?: string | null;
                    background?: Enum_Componentsectionfeaturedproducts_Background | null;
                    productList?: {
                       __typename?: 'ProductListEntityResponse';
                       data?: {
                          __typename?: 'ProductListEntity';
                          id?: string | null;
                          attributes?: {
                             __typename?: 'ProductList';
                             filters?: string | null;
                             deviceTitle?: string | null;
                          } | null;
                       } | null;
                    } | null;
                 }
               | {
                    __typename: 'ComponentSectionLifetimeWarranty';
                    id: string;
                    title?: string | null;
                    description?: string | null;
                 }
               | {
                    __typename: 'ComponentSectionQuoteGallery';
                    id: string;
                    title?: string | null;
                    description?: string | null;
                    quotes?: Array<{
                       __typename?: 'ComponentSectionQuoteCard';
                       id: string;
                       text: string;
                       author?: {
                          __typename?: 'ComponentGlobalPerson';
                          id: string;
                          name?: string | null;
                          role?: string | null;
                          avatar?: {
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
                    } | null> | null;
                 }
               | {
                    __typename: 'ComponentSectionSocialGallery';
                    id: string;
                    title?: string | null;
                    description?: string | null;
                    posts?: {
                       __typename?: 'SocialPostRelationResponseCollection';
                       data: Array<{
                          __typename?: 'SocialPostEntity';
                          id?: string | null;
                          attributes?: {
                             __typename?: 'SocialPost';
                             author: string;
                             url?: string | null;
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
                          } | null;
                       }>;
                    } | null;
                 }
               | { __typename: 'Error' }
               | null
            >;
         } | null;
      }>;
   } | null;
};

export type FindProductQueryVariables = Exact<{
   handle?: InputMaybe<Scalars['String']>;
}>;

export type FindProductQuery = {
   __typename?: 'Query';
   products?: {
      __typename?: 'ProductEntityResponseCollection';
      data: Array<{
         __typename?: 'ProductEntity';
         id?: string | null;
         attributes?: {
            __typename?: 'Product';
            handle: string;
            sections: Array<
               | {
                    __typename: 'ComponentPageSplitWithImage';
                    id: string;
                    title?: string | null;
                    label?: string | null;
                    description?: string | null;
                    imagePosition?: Enum_Componentpagesplitwithimage_Imageposition | null;
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
                    __typename: 'ComponentProductBitTable';
                    id: string;
                    title?: string | null;
                    description?: string | null;
                    bits?: {
                       __typename?: 'ScrewdriverBitRelationResponseCollection';
                       data: Array<{
                          __typename?: 'ScrewdriverBitEntity';
                          id?: string | null;
                          attributes?: {
                             __typename?: 'ScrewdriverBit';
                             size?: string | null;
                             type?: {
                                __typename?: 'ScrewdriverBitTypeEntityResponse';
                                data?: {
                                   __typename?: 'ScrewdriverBitTypeEntity';
                                   id?: string | null;
                                   attributes?: {
                                      __typename?: 'ScrewdriverBitType';
                                      name: string;
                                      driverSize: string;
                                      icon: {
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
                                   } | null;
                                } | null;
                             } | null;
                          } | null;
                       }>;
                    } | null;
                 }
               | {
                    __typename: 'ComponentProductCrossSell';
                    id: string;
                    title?: string | null;
                 }
               | {
                    __typename: 'ComponentProductDeviceCompatibility';
                    id: string;
                    title?: string | null;
                    description?: string | null;
                 }
               | { __typename: 'ComponentProductProduct'; id: string }
               | {
                    __typename: 'ComponentProductProductCustomerReviews';
                    id: string;
                    title?: string | null;
                 }
               | {
                    __typename: 'ComponentProductReplacementGuides';
                    id: string;
                    title?: string | null;
                 }
               | {
                    __typename: 'ComponentSectionBanner';
                    id: string;
                    banners?: {
                       __typename?: 'BannerRelationResponseCollection';
                       data: Array<{
                          __typename?: 'BannerEntity';
                          id?: string | null;
                          attributes?: {
                             __typename?: 'Banner';
                             title?: string | null;
                             label?: string | null;
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
                             callToAction?: {
                                __typename?: 'ComponentPageCallToAction';
                                title: string;
                                url: string;
                             } | null;
                          } | null;
                       }>;
                    } | null;
                 }
               | {
                    __typename: 'ComponentSectionFaqs';
                    id: string;
                    title?: string | null;
                    description?: string | null;
                    faqs?: {
                       __typename?: 'FaqRelationResponseCollection';
                       data: Array<{
                          __typename?: 'FaqEntity';
                          id?: string | null;
                          attributes?: {
                             __typename?: 'Faq';
                             question: string;
                             answer: string;
                             category?: string | null;
                             item_type?: string | null;
                             priority?: number | null;
                          } | null;
                       }>;
                    } | null;
                 }
               | {
                    __typename: 'ComponentSectionFeaturedProducts';
                    id: string;
                    title?: string | null;
                    description?: string | null;
                    background?: Enum_Componentsectionfeaturedproducts_Background | null;
                    productList?: {
                       __typename?: 'ProductListEntityResponse';
                       data?: {
                          __typename?: 'ProductListEntity';
                          id?: string | null;
                          attributes?: {
                             __typename?: 'ProductList';
                             filters?: string | null;
                             deviceTitle?: string | null;
                          } | null;
                       } | null;
                    } | null;
                 }
               | {
                    __typename: 'ComponentSectionLifetimeWarranty';
                    id: string;
                    title?: string | null;
                    description?: string | null;
                 }
               | {
                    __typename: 'ComponentSectionQuote';
                    id: string;
                    text: string;
                    author?: string | null;
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
                    __typename: 'ComponentSectionServiceValuePropositions';
                    id: string;
                 }
               | { __typename: 'ComponentSectionStories' }
               | { __typename: 'ComponentSectionTools'; id: string }
               | { __typename: 'Error' }
               | null
            >;
         } | null;
      }>;
   } | null;
};

export type FindProductListQueryVariables = Exact<{
   filters?: InputMaybe<ProductListFiltersInput>;
}>;

export type FindProductListQuery = {
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
            h1?: string | null;
            tagline?: string | null;
            description: string;
            metaDescription?: string | null;
            metaTitle?: string | null;
            defaultShowAllChildrenOnLgSizes?: boolean | null;
            filters?: string | null;
            forceNoindex?: boolean | null;
            brandLogoWidth?: number | null;
            indexVariantsInsteadOfDevice?: boolean | null;
            optionalFilters?: string | null;
            heroImage?: {
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
            brandLogo?: {
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
                                                                  faqs?: {
                                                                     __typename?: 'FaqRelationResponseCollection';
                                                                     data: Array<{
                                                                        __typename?: 'FaqEntity';
                                                                        id?:
                                                                           | string
                                                                           | null;
                                                                        attributes?: {
                                                                           __typename?: 'Faq';
                                                                           question: string;
                                                                           answer: string;
                                                                           category?:
                                                                              | string
                                                                              | null;
                                                                           item_type?:
                                                                              | string
                                                                              | null;
                                                                           priority?:
                                                                              | number
                                                                              | null;
                                                                        } | null;
                                                                     }>;
                                                                  } | null;
                                                               } | null;
                                                            } | null;
                                                         } | null;
                                                         faqs?: {
                                                            __typename?: 'FaqRelationResponseCollection';
                                                            data: Array<{
                                                               __typename?: 'FaqEntity';
                                                               id?:
                                                                  | string
                                                                  | null;
                                                               attributes?: {
                                                                  __typename?: 'Faq';
                                                                  question: string;
                                                                  answer: string;
                                                                  category?:
                                                                     | string
                                                                     | null;
                                                                  item_type?:
                                                                     | string
                                                                     | null;
                                                                  priority?:
                                                                     | number
                                                                     | null;
                                                               } | null;
                                                            }>;
                                                         } | null;
                                                      } | null;
                                                   } | null;
                                                } | null;
                                                faqs?: {
                                                   __typename?: 'FaqRelationResponseCollection';
                                                   data: Array<{
                                                      __typename?: 'FaqEntity';
                                                      id?: string | null;
                                                      attributes?: {
                                                         __typename?: 'Faq';
                                                         question: string;
                                                         answer: string;
                                                         category?:
                                                            | string
                                                            | null;
                                                         item_type?:
                                                            | string
                                                            | null;
                                                         priority?:
                                                            | number
                                                            | null;
                                                      } | null;
                                                   }>;
                                                } | null;
                                             } | null;
                                          } | null;
                                       } | null;
                                       faqs?: {
                                          __typename?: 'FaqRelationResponseCollection';
                                          data: Array<{
                                             __typename?: 'FaqEntity';
                                             id?: string | null;
                                             attributes?: {
                                                __typename?: 'Faq';
                                                question: string;
                                                answer: string;
                                                category?: string | null;
                                                item_type?: string | null;
                                                priority?: number | null;
                                             } | null;
                                          }>;
                                       } | null;
                                    } | null;
                                 } | null;
                              } | null;
                              faqs?: {
                                 __typename?: 'FaqRelationResponseCollection';
                                 data: Array<{
                                    __typename?: 'FaqEntity';
                                    id?: string | null;
                                    attributes?: {
                                       __typename?: 'Faq';
                                       question: string;
                                       answer: string;
                                       category?: string | null;
                                       item_type?: string | null;
                                       priority?: number | null;
                                    } | null;
                                 }>;
                              } | null;
                           } | null;
                        } | null;
                     } | null;
                     faqs?: {
                        __typename?: 'FaqRelationResponseCollection';
                        data: Array<{
                           __typename?: 'FaqEntity';
                           id?: string | null;
                           attributes?: {
                              __typename?: 'Faq';
                              question: string;
                              answer: string;
                              category?: string | null;
                              item_type?: string | null;
                              priority?: number | null;
                           } | null;
                        }>;
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
                     hideFromParent?: boolean | null;
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
                             deviceTitle?: string | null;
                             title: string;
                             description: string;
                             metaDescription?: string | null;
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
            itemOverrides: Array<
               | {
                    __typename: 'ComponentProductListItemTypeOverride';
                    title?: string | null;
                    metaTitle?: string | null;
                    description?: string | null;
                    metaDescription?: string | null;
                    itemType?: string | null;
                    tagline?: string | null;
                 }
               | { __typename: 'Error' }
               | null
            >;
            faqs?: {
               __typename?: 'FaqRelationResponseCollection';
               data: Array<{
                  __typename?: 'FaqEntity';
                  id?: string | null;
                  attributes?: {
                     __typename?: 'Faq';
                     question: string;
                     answer: string;
                     category?: string | null;
                     item_type?: string | null;
                     priority?: number | null;
                  } | null;
               }>;
            } | null;
            redirectTo?: {
               __typename?: 'ProductListEntityResponse';
               data?: {
                  __typename?: 'ProductListEntity';
                  attributes?: {
                     __typename?: 'ProductList';
                     deviceTitle?: string | null;
                     handle: string;
                     type?: Enum_Productlist_Type | null;
                  } | null;
               } | null;
            } | null;
         } | null;
      }>;
   } | null;
};

export type ProductListFieldsFragment = {
   __typename?: 'ProductList';
   type?: Enum_Productlist_Type | null;
   handle: string;
   deviceTitle?: string | null;
   title: string;
   h1?: string | null;
   tagline?: string | null;
   description: string;
   metaDescription?: string | null;
   metaTitle?: string | null;
   defaultShowAllChildrenOnLgSizes?: boolean | null;
   filters?: string | null;
   forceNoindex?: boolean | null;
   brandLogoWidth?: number | null;
   indexVariantsInsteadOfDevice?: boolean | null;
   optionalFilters?: string | null;
   heroImage?: {
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
   brandLogo?: {
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
                                                         faqs?: {
                                                            __typename?: 'FaqRelationResponseCollection';
                                                            data: Array<{
                                                               __typename?: 'FaqEntity';
                                                               id?:
                                                                  | string
                                                                  | null;
                                                               attributes?: {
                                                                  __typename?: 'Faq';
                                                                  question: string;
                                                                  answer: string;
                                                                  category?:
                                                                     | string
                                                                     | null;
                                                                  item_type?:
                                                                     | string
                                                                     | null;
                                                                  priority?:
                                                                     | number
                                                                     | null;
                                                               } | null;
                                                            }>;
                                                         } | null;
                                                      } | null;
                                                   } | null;
                                                } | null;
                                                faqs?: {
                                                   __typename?: 'FaqRelationResponseCollection';
                                                   data: Array<{
                                                      __typename?: 'FaqEntity';
                                                      id?: string | null;
                                                      attributes?: {
                                                         __typename?: 'Faq';
                                                         question: string;
                                                         answer: string;
                                                         category?:
                                                            | string
                                                            | null;
                                                         item_type?:
                                                            | string
                                                            | null;
                                                         priority?:
                                                            | number
                                                            | null;
                                                      } | null;
                                                   }>;
                                                } | null;
                                             } | null;
                                          } | null;
                                       } | null;
                                       faqs?: {
                                          __typename?: 'FaqRelationResponseCollection';
                                          data: Array<{
                                             __typename?: 'FaqEntity';
                                             id?: string | null;
                                             attributes?: {
                                                __typename?: 'Faq';
                                                question: string;
                                                answer: string;
                                                category?: string | null;
                                                item_type?: string | null;
                                                priority?: number | null;
                                             } | null;
                                          }>;
                                       } | null;
                                    } | null;
                                 } | null;
                              } | null;
                              faqs?: {
                                 __typename?: 'FaqRelationResponseCollection';
                                 data: Array<{
                                    __typename?: 'FaqEntity';
                                    id?: string | null;
                                    attributes?: {
                                       __typename?: 'Faq';
                                       question: string;
                                       answer: string;
                                       category?: string | null;
                                       item_type?: string | null;
                                       priority?: number | null;
                                    } | null;
                                 }>;
                              } | null;
                           } | null;
                        } | null;
                     } | null;
                     faqs?: {
                        __typename?: 'FaqRelationResponseCollection';
                        data: Array<{
                           __typename?: 'FaqEntity';
                           id?: string | null;
                           attributes?: {
                              __typename?: 'Faq';
                              question: string;
                              answer: string;
                              category?: string | null;
                              item_type?: string | null;
                              priority?: number | null;
                           } | null;
                        }>;
                     } | null;
                  } | null;
               } | null;
            } | null;
            faqs?: {
               __typename?: 'FaqRelationResponseCollection';
               data: Array<{
                  __typename?: 'FaqEntity';
                  id?: string | null;
                  attributes?: {
                     __typename?: 'Faq';
                     question: string;
                     answer: string;
                     category?: string | null;
                     item_type?: string | null;
                     priority?: number | null;
                  } | null;
               }>;
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
            hideFromParent?: boolean | null;
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
                    deviceTitle?: string | null;
                    title: string;
                    description: string;
                    metaDescription?: string | null;
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
   itemOverrides: Array<
      | {
           __typename: 'ComponentProductListItemTypeOverride';
           title?: string | null;
           metaTitle?: string | null;
           description?: string | null;
           metaDescription?: string | null;
           itemType?: string | null;
           tagline?: string | null;
        }
      | { __typename: 'Error' }
      | null
   >;
   faqs?: {
      __typename?: 'FaqRelationResponseCollection';
      data: Array<{
         __typename?: 'FaqEntity';
         id?: string | null;
         attributes?: {
            __typename?: 'Faq';
            question: string;
            answer: string;
            category?: string | null;
            item_type?: string | null;
            priority?: number | null;
         } | null;
      }>;
   } | null;
   redirectTo?: {
      __typename?: 'ProductListEntityResponse';
      data?: {
         __typename?: 'ProductListEntity';
         attributes?: {
            __typename?: 'ProductList';
            deviceTitle?: string | null;
            handle: string;
            type?: Enum_Productlist_Type | null;
         } | null;
      } | null;
   } | null;
};

export type AncestorProductListFieldsFragment = {
   __typename?: 'ProductList';
   type?: Enum_Productlist_Type | null;
   title: string;
   handle: string;
   deviceTitle?: string | null;
   faqs?: {
      __typename?: 'FaqRelationResponseCollection';
      data: Array<{
         __typename?: 'FaqEntity';
         id?: string | null;
         attributes?: {
            __typename?: 'Faq';
            question: string;
            answer: string;
            category?: string | null;
            item_type?: string | null;
            priority?: number | null;
         } | null;
      }>;
   } | null;
};

export type FindReusableSectionsQueryVariables = Exact<{
   filters?: InputMaybe<ReusableSectionFiltersInput>;
}>;

export type FindReusableSectionsQuery = {
   __typename?: 'Query';
   reusableSections?: {
      __typename?: 'ReusableSectionEntityResponseCollection';
      data: Array<{
         __typename?: 'ReusableSectionEntity';
         id?: string | null;
         attributes?: {
            __typename?: 'ReusableSection';
            priority: number;
            positionInProductList: Enum_Reusablesection_Positioninproductlist;
            section: Array<
               | {
                    __typename: 'ComponentPagePress';
                    id: string;
                    title?: string | null;
                    description?: string | null;
                    quotes?: Array<{
                       __typename?: 'ComponentPagePressQuote';
                       id: string;
                       text: string;
                       company?: {
                          __typename?: 'CompanyEntityResponse';
                          data?: {
                             __typename?: 'CompanyEntity';
                             id?: string | null;
                             attributes?: {
                                __typename?: 'Company';
                                name: string;
                                logo?: {
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
                    callToAction?: {
                       __typename?: 'ComponentPageCallToAction';
                       title: string;
                       url: string;
                    } | null;
                 }
               | {
                    __typename: 'ComponentPageSplitWithImage';
                    id: string;
                    title?: string | null;
                    label?: string | null;
                    description?: string | null;
                    imagePosition?: Enum_Componentpagesplitwithimage_Imageposition | null;
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
                    __typename: 'ComponentSectionBanner';
                    id: string;
                    banners?: {
                       __typename?: 'BannerRelationResponseCollection';
                       data: Array<{
                          __typename?: 'BannerEntity';
                          id?: string | null;
                          attributes?: {
                             __typename?: 'Banner';
                             title?: string | null;
                             label?: string | null;
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
                             callToAction?: {
                                __typename?: 'ComponentPageCallToAction';
                                title: string;
                                url: string;
                             } | null;
                          } | null;
                       }>;
                    } | null;
                 }
               | {
                    __typename: 'ComponentSectionFaqs';
                    id: string;
                    title?: string | null;
                    description?: string | null;
                    faqs?: {
                       __typename?: 'FaqRelationResponseCollection';
                       data: Array<{
                          __typename?: 'FaqEntity';
                          id?: string | null;
                          attributes?: {
                             __typename?: 'Faq';
                             question: string;
                             answer: string;
                             category?: string | null;
                             item_type?: string | null;
                             priority?: number | null;
                          } | null;
                       }>;
                    } | null;
                 }
               | {
                    __typename: 'ComponentSectionQuoteGallery';
                    id: string;
                    title?: string | null;
                    description?: string | null;
                    quotes?: Array<{
                       __typename?: 'ComponentSectionQuoteCard';
                       id: string;
                       text: string;
                       author?: {
                          __typename?: 'ComponentGlobalPerson';
                          id: string;
                          name?: string | null;
                          role?: string | null;
                          avatar?: {
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
                    } | null> | null;
                 }
               | { __typename: 'Error' }
               | null
            >;
            placement: Array<{
               __typename?: 'ComponentMiscPlacement';
               showInProductListPages: Enum_Componentmiscplacement_Showinproductlistpages;
            } | null>;
         } | null;
      }>;
   } | null;
};

export type ReusableSectionFieldsFragment = {
   __typename?: 'ReusableSection';
   priority: number;
   positionInProductList: Enum_Reusablesection_Positioninproductlist;
   section: Array<
      | {
           __typename: 'ComponentPagePress';
           id: string;
           title?: string | null;
           description?: string | null;
           quotes?: Array<{
              __typename?: 'ComponentPagePressQuote';
              id: string;
              text: string;
              company?: {
                 __typename?: 'CompanyEntityResponse';
                 data?: {
                    __typename?: 'CompanyEntity';
                    id?: string | null;
                    attributes?: {
                       __typename?: 'Company';
                       name: string;
                       logo?: {
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
           callToAction?: {
              __typename?: 'ComponentPageCallToAction';
              title: string;
              url: string;
           } | null;
        }
      | {
           __typename: 'ComponentPageSplitWithImage';
           id: string;
           title?: string | null;
           label?: string | null;
           description?: string | null;
           imagePosition?: Enum_Componentpagesplitwithimage_Imageposition | null;
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
           __typename: 'ComponentSectionBanner';
           id: string;
           banners?: {
              __typename?: 'BannerRelationResponseCollection';
              data: Array<{
                 __typename?: 'BannerEntity';
                 id?: string | null;
                 attributes?: {
                    __typename?: 'Banner';
                    title?: string | null;
                    label?: string | null;
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
                    callToAction?: {
                       __typename?: 'ComponentPageCallToAction';
                       title: string;
                       url: string;
                    } | null;
                 } | null;
              }>;
           } | null;
        }
      | {
           __typename: 'ComponentSectionFaqs';
           id: string;
           title?: string | null;
           description?: string | null;
           faqs?: {
              __typename?: 'FaqRelationResponseCollection';
              data: Array<{
                 __typename?: 'FaqEntity';
                 id?: string | null;
                 attributes?: {
                    __typename?: 'Faq';
                    question: string;
                    answer: string;
                    category?: string | null;
                    item_type?: string | null;
                    priority?: number | null;
                 } | null;
              }>;
           } | null;
        }
      | {
           __typename: 'ComponentSectionQuoteGallery';
           id: string;
           title?: string | null;
           description?: string | null;
           quotes?: Array<{
              __typename?: 'ComponentSectionQuoteCard';
              id: string;
              text: string;
              author?: {
                 __typename?: 'ComponentGlobalPerson';
                 id: string;
                 name?: string | null;
                 role?: string | null;
                 avatar?: {
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
           } | null> | null;
        }
      | { __typename: 'Error' }
      | null
   >;
   placement: Array<{
      __typename?: 'ComponentMiscPlacement';
      showInProductListPages: Enum_Componentmiscplacement_Showinproductlistpages;
   } | null>;
};

export type PlacementFieldsFragment = {
   __typename?: 'ComponentMiscPlacement';
   showInProductListPages: Enum_Componentmiscplacement_Showinproductlistpages;
};

export type FindStoreQueryVariables = Exact<{
   filters?: InputMaybe<StoreFiltersInput>;
}>;

export type FindStoreQuery = {
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
               menu3?: {
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
               delegateAccessToken?: string | null;
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

export type BannersSectionFieldsFragment = {
   __typename?: 'ComponentSectionBanner';
   id: string;
   banners?: {
      __typename?: 'BannerRelationResponseCollection';
      data: Array<{
         __typename?: 'BannerEntity';
         id?: string | null;
         attributes?: {
            __typename?: 'Banner';
            title?: string | null;
            label?: string | null;
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
            callToAction?: {
               __typename?: 'ComponentPageCallToAction';
               title: string;
               url: string;
            } | null;
         } | null;
      }>;
   } | null;
};

export type BitTableSectionFieldsFragment = {
   __typename?: 'ComponentProductBitTable';
   id: string;
   title?: string | null;
   description?: string | null;
   bits?: {
      __typename?: 'ScrewdriverBitRelationResponseCollection';
      data: Array<{
         __typename?: 'ScrewdriverBitEntity';
         id?: string | null;
         attributes?: {
            __typename?: 'ScrewdriverBit';
            size?: string | null;
            type?: {
               __typename?: 'ScrewdriverBitTypeEntityResponse';
               data?: {
                  __typename?: 'ScrewdriverBitTypeEntity';
                  id?: string | null;
                  attributes?: {
                     __typename?: 'ScrewdriverBitType';
                     name: string;
                     driverSize: string;
                     icon: {
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
                  } | null;
               } | null;
            } | null;
         } | null;
      }>;
   } | null;
};

export type BrowseSectionFieldsFragment = {
   __typename?: 'ComponentPageBrowse';
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
      description?: string | null;
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
               description: string;
               metaDescription?: string | null;
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
   } | null> | null;
};

export type CategoryFieldsFragment = {
   __typename?: 'ComponentPageCategory';
   id: string;
   description?: string | null;
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
            description: string;
            metaDescription?: string | null;
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
};

export type DeviceCompatibilitySectionFieldsFragment = {
   __typename?: 'ComponentProductDeviceCompatibility';
   id: string;
   title?: string | null;
   description?: string | null;
};

export type FaQsSectionFieldsFragment = {
   __typename?: 'ComponentSectionFaqs';
   id: string;
   title?: string | null;
   description?: string | null;
   faqs?: {
      __typename?: 'FaqRelationResponseCollection';
      data: Array<{
         __typename?: 'FaqEntity';
         id?: string | null;
         attributes?: {
            __typename?: 'Faq';
            question: string;
            answer: string;
            category?: string | null;
            item_type?: string | null;
            priority?: number | null;
         } | null;
      }>;
   } | null;
};

export type FeaturedProductsSectionFieldsFragment = {
   __typename?: 'ComponentSectionFeaturedProducts';
   id: string;
   title?: string | null;
   description?: string | null;
   background?: Enum_Componentsectionfeaturedproducts_Background | null;
   productList?: {
      __typename?: 'ProductListEntityResponse';
      data?: {
         __typename?: 'ProductListEntity';
         id?: string | null;
         attributes?: {
            __typename?: 'ProductList';
            filters?: string | null;
            deviceTitle?: string | null;
         } | null;
      } | null;
   } | null;
};

export type HeroSectionFieldsFragment = {
   __typename?: 'ComponentPageHero';
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
};

export type LifetimeWarrantySectionFieldsFragment = {
   __typename?: 'ComponentSectionLifetimeWarranty';
   id: string;
   title?: string | null;
   description?: string | null;
};

export type PressQuotesSectionFieldsFragment = {
   __typename?: 'ComponentPagePress';
   id: string;
   title?: string | null;
   description?: string | null;
   quotes?: Array<{
      __typename?: 'ComponentPagePressQuote';
      id: string;
      text: string;
      company?: {
         __typename?: 'CompanyEntityResponse';
         data?: {
            __typename?: 'CompanyEntity';
            id?: string | null;
            attributes?: {
               __typename?: 'Company';
               name: string;
               logo?: {
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
   callToAction?: {
      __typename?: 'ComponentPageCallToAction';
      title: string;
      url: string;
   } | null;
};

export type PressQuoteFieldsFragment = {
   __typename?: 'ComponentPagePressQuote';
   id: string;
   text: string;
   company?: {
      __typename?: 'CompanyEntityResponse';
      data?: {
         __typename?: 'CompanyEntity';
         id?: string | null;
         attributes?: {
            __typename?: 'Company';
            name: string;
            logo?: {
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
};

export type ProductCrossSellSectionFieldsFragment = {
   __typename?: 'ComponentProductCrossSell';
   id: string;
   title?: string | null;
};

export type ProductCustomerReviewsSectionFieldsFragment = {
   __typename?: 'ComponentProductProductCustomerReviews';
   id: string;
   title?: string | null;
};

export type ProductListBannerSectionFieldsFragment = {
   __typename?: 'ComponentProductListBanner';
   id: string;
   title: string;
   description: string;
   callToActionLabel: string;
   url: string;
};

export type ProductListLinkedProductListSetSectionFieldsFragment = {
   __typename?: 'ComponentProductListLinkedProductListSet';
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
            deviceTitle?: string | null;
            title: string;
            description: string;
            metaDescription?: string | null;
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
};

export type ProductListRelatedPostsSectionFieldsFragment = {
   __typename?: 'ComponentProductListRelatedPosts';
   id: string;
   tags?: string | null;
};

export type ProductOverviewSectionFieldsFragment = {
   __typename?: 'ComponentProductProduct';
   id: string;
};

export type ProductReplacementGuidesSectionFieldsFragment = {
   __typename?: 'ComponentProductReplacementGuides';
   id: string;
   title?: string | null;
};

export type QuoteGallerySectionFieldsFragment = {
   __typename?: 'ComponentSectionQuoteGallery';
   id: string;
   title?: string | null;
   description?: string | null;
   quotes?: Array<{
      __typename?: 'ComponentSectionQuoteCard';
      id: string;
      text: string;
      author?: {
         __typename?: 'ComponentGlobalPerson';
         id: string;
         name?: string | null;
         role?: string | null;
         avatar?: {
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
   } | null> | null;
};

export type QuoteSectionFieldsFragment = {
   __typename?: 'ComponentSectionQuote';
   id: string;
   text: string;
   author?: string | null;
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
};

export type ServiceValuePropositionsSectionFieldsFragment = {
   __typename?: 'ComponentSectionServiceValuePropositions';
   id: string;
};

export type SocialGallerySectionFieldsFragment = {
   __typename?: 'ComponentSectionSocialGallery';
   id: string;
   title?: string | null;
   description?: string | null;
   posts?: {
      __typename?: 'SocialPostRelationResponseCollection';
      data: Array<{
         __typename?: 'SocialPostEntity';
         id?: string | null;
         attributes?: {
            __typename?: 'SocialPost';
            author: string;
            url?: string | null;
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
         } | null;
      }>;
   } | null;
};

export type SocialPostFieldsFragment = {
   __typename?: 'SocialPostEntity';
   id?: string | null;
   attributes?: {
      __typename?: 'SocialPost';
      author: string;
      url?: string | null;
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
   } | null;
};

export type SplitWithImageSectionFieldsFragment = {
   __typename?: 'ComponentPageSplitWithImage';
   id: string;
   title?: string | null;
   label?: string | null;
   description?: string | null;
   imagePosition?: Enum_Componentpagesplitwithimage_Imageposition | null;
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
};

export type StatsSectionFieldsFragment = {
   __typename?: 'ComponentPageStats';
   id: string;
   stats: Array<{
      __typename?: 'ComponentPageStatItem';
      id: string;
      label: string;
      value: string;
   } | null>;
};

export type ToolsSectionFieldsFragment = {
   __typename?: 'ComponentSectionTools';
   id: string;
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
export const ScrewdriverBitTypeFieldsFragmentDoc = `
    fragment ScrewdriverBitTypeFields on ScrewdriverBitTypeEntity {
  id
  attributes {
    icon {
      ...ImageFields
    }
    name
    driverSize
  }
}
    `;
export const FaqFieldsFragmentDoc = `
    fragment FAQFields on FaqEntity {
  id
  attributes {
    question
    answer
    category
    item_type
    priority
  }
}
    `;
export const AncestorProductListFieldsFragmentDoc = `
    fragment AncestorProductListFields on ProductList {
  type
  title
  handle
  deviceTitle
  faqs {
    data {
      ...FAQFields
    }
  }
}
    `;
export const ProductListBannerSectionFieldsFragmentDoc = `
    fragment ProductListBannerSectionFields on ComponentProductListBanner {
  id
  title
  description
  callToActionLabel
  url
}
    `;
export const ProductListRelatedPostsSectionFieldsFragmentDoc = `
    fragment ProductListRelatedPostsSectionFields on ComponentProductListRelatedPosts {
  id
  tags
}
    `;
export const ProductListPreviewFieldsFragmentDoc = `
    fragment ProductListPreviewFields on ProductList {
  type
  handle
  deviceTitle
  title
  description
  metaDescription
  filters
  image {
    ...ImageFields
  }
}
    `;
export const ProductListLinkedProductListSetSectionFieldsFragmentDoc = `
    fragment ProductListLinkedProductListSetSectionFields on ComponentProductListLinkedProductListSet {
  id
  title
  productLists(pagination: {limit: 3}) {
    data {
      attributes {
        ...ProductListPreviewFields
      }
    }
  }
}
    `;
export const ProductListFieldsFragmentDoc = `
    fragment ProductListFields on ProductList {
  type
  handle
  deviceTitle
  title
  h1
  tagline
  description
  metaDescription
  metaTitle
  defaultShowAllChildrenOnLgSizes
  filters
  forceNoindex
  heroImage {
    ...ImageFields
  }
  brandLogo {
    ...ImageFields
  }
  brandLogoWidth
  indexVariantsInsteadOfDevice
  parent {
    data {
      attributes {
        ...AncestorProductListFields
        parent {
          data {
            attributes {
              ...AncestorProductListFields
              parent {
                data {
                  attributes {
                    ...AncestorProductListFields
                    parent {
                      data {
                        attributes {
                          ...AncestorProductListFields
                          parent {
                            data {
                              attributes {
                                ...AncestorProductListFields
                                parent {
                                  data {
                                    attributes {
                                      ...AncestorProductListFields
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
          ...ImageFields
        }
        hideFromParent
      }
    }
  }
  sections {
    __typename
    ...ProductListBannerSectionFields
    ...ProductListRelatedPostsSectionFields
    ...ProductListLinkedProductListSetSectionFields
  }
  itemOverrides {
    __typename
    ... on ComponentProductListItemTypeOverride {
      title
      metaTitle
      description
      metaDescription
      itemType
      tagline
    }
  }
  faqs {
    data {
      ...FAQFields
    }
  }
  optionalFilters
  redirectTo {
    data {
      attributes {
        deviceTitle
        handle
        type
      }
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
export const BannerFieldsFragmentDoc = `
    fragment BannerFields on BannerEntity {
  id
  attributes {
    title
    label
    description
    image {
      ...ImageFields
    }
    callToAction {
      ...CallToActionFields
    }
  }
}
    `;
export const BannersSectionFieldsFragmentDoc = `
    fragment BannersSectionFields on ComponentSectionBanner {
  id
  banners {
    data {
      ...BannerFields
    }
  }
}
    `;
export const SplitWithImageSectionFieldsFragmentDoc = `
    fragment SplitWithImageSectionFields on ComponentPageSplitWithImage {
  id
  title
  label
  description
  callToAction {
    ...CallToActionFields
  }
  imagePosition
  image {
    ...ImageFields
  }
}
    `;
export const CompanyFieldsFragmentDoc = `
    fragment CompanyFields on CompanyEntity {
  id
  attributes {
    name
    logo {
      ...ImageFields
    }
  }
}
    `;
export const PressQuoteFieldsFragmentDoc = `
    fragment PressQuoteFields on ComponentPagePressQuote {
  id
  company {
    data {
      ...CompanyFields
    }
  }
  text
}
    `;
export const PressQuotesSectionFieldsFragmentDoc = `
    fragment PressQuotesSectionFields on ComponentPagePress {
  id
  title
  description
  quotes {
    ...PressQuoteFields
  }
  callToAction {
    ...CallToActionFields
  }
}
    `;
export const PersonFieldsFragmentDoc = `
    fragment PersonFields on ComponentGlobalPerson {
  id
  name
  role
  avatar {
    ...ImageFields
  }
}
    `;
export const QuoteCardFieldsFragmentDoc = `
    fragment QuoteCardFields on ComponentSectionQuoteCard {
  id
  text
  author {
    ...PersonFields
  }
}
    `;
export const QuoteGallerySectionFieldsFragmentDoc = `
    fragment QuoteGallerySectionFields on ComponentSectionQuoteGallery {
  id
  title
  description
  quotes {
    ...QuoteCardFields
  }
}
    `;
export const FaQsSectionFieldsFragmentDoc = `
    fragment FAQsSectionFields on ComponentSectionFaqs {
  id
  title
  description
  faqs {
    data {
      ...FAQFields
    }
  }
}
    `;
export const PlacementFieldsFragmentDoc = `
    fragment PlacementFields on ComponentMiscPlacement {
  showInProductListPages
}
    `;
export const ReusableSectionFieldsFragmentDoc = `
    fragment ReusableSectionFields on ReusableSection {
  section {
    __typename
    ...BannersSectionFields
    ...SplitWithImageSectionFields
    ...PressQuotesSectionFields
    ...QuoteGallerySectionFields
    ...FAQsSectionFields
  }
  placement {
    ...PlacementFields
  }
  priority
  positionInProductList
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
export const ScrewdriverBitFieldsFragmentDoc = `
    fragment ScrewdriverBitFields on ScrewdriverBitEntity {
  id
  attributes {
    type {
      data {
        id
        attributes {
          icon {
            ...ImageFields
          }
          name
          driverSize
        }
      }
    }
    size
  }
}
    `;
export const BitTableSectionFieldsFragmentDoc = `
    fragment BitTableSectionFields on ComponentProductBitTable {
  id
  title
  description
  bits(pagination: {limit: 1000}) {
    data {
      ...ScrewdriverBitFields
    }
  }
}
    `;
export const CategoryFieldsFragmentDoc = `
    fragment CategoryFields on ComponentPageCategory {
  id
  description
  productList {
    data {
      attributes {
        ...ProductListPreviewFields
      }
    }
  }
}
    `;
export const BrowseSectionFieldsFragmentDoc = `
    fragment BrowseSectionFields on ComponentPageBrowse {
  id
  title
  description
  image {
    ...ImageFields
  }
  categories(pagination: {limit: 100}) {
    ...CategoryFields
  }
}
    `;
export const DeviceCompatibilitySectionFieldsFragmentDoc = `
    fragment DeviceCompatibilitySectionFields on ComponentProductDeviceCompatibility {
  id
  title
  description
}
    `;
export const FeaturedProductsSectionFieldsFragmentDoc = `
    fragment FeaturedProductsSectionFields on ComponentSectionFeaturedProducts {
  id
  title
  description
  background
  productList {
    data {
      id
      attributes {
        filters
        deviceTitle
      }
    }
  }
}
    `;
export const HeroSectionFieldsFragmentDoc = `
    fragment HeroSectionFields on ComponentPageHero {
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
    `;
export const LifetimeWarrantySectionFieldsFragmentDoc = `
    fragment LifetimeWarrantySectionFields on ComponentSectionLifetimeWarranty {
  id
  title
  description
}
    `;
export const ProductCrossSellSectionFieldsFragmentDoc = `
    fragment ProductCrossSellSectionFields on ComponentProductCrossSell {
  id
  title
}
    `;
export const ProductCustomerReviewsSectionFieldsFragmentDoc = `
    fragment ProductCustomerReviewsSectionFields on ComponentProductProductCustomerReviews {
  id
  title
}
    `;
export const ProductOverviewSectionFieldsFragmentDoc = `
    fragment ProductOverviewSectionFields on ComponentProductProduct {
  id
}
    `;
export const ProductReplacementGuidesSectionFieldsFragmentDoc = `
    fragment ProductReplacementGuidesSectionFields on ComponentProductReplacementGuides {
  id
  title
}
    `;
export const QuoteSectionFieldsFragmentDoc = `
    fragment QuoteSectionFields on ComponentSectionQuote {
  id
  text
  author
  image {
    ...ImageFields
  }
}
    `;
export const ServiceValuePropositionsSectionFieldsFragmentDoc = `
    fragment ServiceValuePropositionsSectionFields on ComponentSectionServiceValuePropositions {
  id
}
    `;
export const SocialPostFieldsFragmentDoc = `
    fragment SocialPostFields on SocialPostEntity {
  id
  attributes {
    image {
      ...ImageFields
    }
    author
    url
  }
}
    `;
export const SocialGallerySectionFieldsFragmentDoc = `
    fragment SocialGallerySectionFields on ComponentSectionSocialGallery {
  id
  title
  description
  posts(publicationState: LIVE) {
    data {
      ...SocialPostFields
    }
  }
}
    `;
export const StatsSectionFieldsFragmentDoc = `
    fragment StatsSectionFields on ComponentPageStats {
  id
  stats {
    id
    label
    value
  }
}
    `;
export const ToolsSectionFieldsFragmentDoc = `
    fragment ToolsSectionFields on ComponentSectionTools {
  id
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
        metaTitle
        metaDescription
        sections {
          __typename
          ...HeroSectionFields
          ...BrowseSectionFields
          ...StatsSectionFields
          ...SplitWithImageSectionFields
          ...PressQuotesSectionFields
          ...FeaturedProductsSectionFields
          ...SocialGallerySectionFields
          ...LifetimeWarrantySectionFields
          ...BannersSectionFields
          ...QuoteGallerySectionFields
        }
      }
    }
  }
}
    ${HeroSectionFieldsFragmentDoc}
${CallToActionFieldsFragmentDoc}
${ImageFieldsFragmentDoc}
${BrowseSectionFieldsFragmentDoc}
${CategoryFieldsFragmentDoc}
${ProductListPreviewFieldsFragmentDoc}
${StatsSectionFieldsFragmentDoc}
${SplitWithImageSectionFieldsFragmentDoc}
${PressQuotesSectionFieldsFragmentDoc}
${PressQuoteFieldsFragmentDoc}
${CompanyFieldsFragmentDoc}
${FeaturedProductsSectionFieldsFragmentDoc}
${SocialGallerySectionFieldsFragmentDoc}
${SocialPostFieldsFragmentDoc}
${LifetimeWarrantySectionFieldsFragmentDoc}
${BannersSectionFieldsFragmentDoc}
${BannerFieldsFragmentDoc}
${QuoteGallerySectionFieldsFragmentDoc}
${QuoteCardFieldsFragmentDoc}
${PersonFieldsFragmentDoc}`;
export const FindProductDocument = `
    query findProduct($handle: String) {
  products(filters: {handle: {eq: $handle}}) {
    data {
      id
      attributes {
        handle
        sections {
          __typename
          ...ProductOverviewSectionFields
          ...ProductReplacementGuidesSectionFields
          ...ServiceValuePropositionsSectionFields
          ...ProductCrossSellSectionFields
          ...ProductCustomerReviewsSectionFields
          ...FeaturedProductsSectionFields
          ...LifetimeWarrantySectionFields
          ...SplitWithImageSectionFields
          ...BannersSectionFields
          ...QuoteSectionFields
          ...FAQsSectionFields
          ...DeviceCompatibilitySectionFields
          ...BitTableSectionFields
          ...ToolsSectionFields
        }
      }
    }
  }
}
    ${ProductOverviewSectionFieldsFragmentDoc}
${ProductReplacementGuidesSectionFieldsFragmentDoc}
${ServiceValuePropositionsSectionFieldsFragmentDoc}
${ProductCrossSellSectionFieldsFragmentDoc}
${ProductCustomerReviewsSectionFieldsFragmentDoc}
${FeaturedProductsSectionFieldsFragmentDoc}
${LifetimeWarrantySectionFieldsFragmentDoc}
${SplitWithImageSectionFieldsFragmentDoc}
${CallToActionFieldsFragmentDoc}
${ImageFieldsFragmentDoc}
${BannersSectionFieldsFragmentDoc}
${BannerFieldsFragmentDoc}
${QuoteSectionFieldsFragmentDoc}
${FaQsSectionFieldsFragmentDoc}
${FaqFieldsFragmentDoc}
${DeviceCompatibilitySectionFieldsFragmentDoc}
${BitTableSectionFieldsFragmentDoc}
${ScrewdriverBitFieldsFragmentDoc}
${ToolsSectionFieldsFragmentDoc}`;
export const FindProductListDocument = `
    query findProductList($filters: ProductListFiltersInput) {
  productLists(pagination: {limit: 1}, filters: $filters, publicationState: LIVE) {
    data {
      id
      attributes {
        ...ProductListFields
      }
    }
  }
}
    ${ProductListFieldsFragmentDoc}
${ImageFieldsFragmentDoc}
${AncestorProductListFieldsFragmentDoc}
${FaqFieldsFragmentDoc}
${ProductListBannerSectionFieldsFragmentDoc}
${ProductListRelatedPostsSectionFieldsFragmentDoc}
${ProductListLinkedProductListSetSectionFieldsFragmentDoc}
${ProductListPreviewFieldsFragmentDoc}`;
export const FindReusableSectionsDocument = `
    query findReusableSections($filters: ReusableSectionFiltersInput) {
  reusableSections(filters: $filters) {
    data {
      id
      attributes {
        ...ReusableSectionFields
      }
    }
  }
}
    ${ReusableSectionFieldsFragmentDoc}
${BannersSectionFieldsFragmentDoc}
${BannerFieldsFragmentDoc}
${ImageFieldsFragmentDoc}
${CallToActionFieldsFragmentDoc}
${SplitWithImageSectionFieldsFragmentDoc}
${PressQuotesSectionFieldsFragmentDoc}
${PressQuoteFieldsFragmentDoc}
${CompanyFieldsFragmentDoc}
${QuoteGallerySectionFieldsFragmentDoc}
${QuoteCardFieldsFragmentDoc}
${PersonFieldsFragmentDoc}
${FaQsSectionFieldsFragmentDoc}
${FaqFieldsFragmentDoc}
${PlacementFieldsFragmentDoc}`;
export const FindStoreDocument = `
    query findStore($filters: StoreFiltersInput) {
  store: stores(filters: $filters) {
    data {
      attributes {
        header {
          menu {
            ...MenuEntityResponseProps
          }
        }
        footer {
          partners {
            ...MenuEntityResponseProps
          }
          bottomMenu {
            ...MenuEntityResponseProps
          }
          menu1 {
            ...MenuEntityResponseProps
          }
          menu2 {
            ...MenuEntityResponseProps
          }
          menu3 {
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
          delegateAccessToken
        }
      }
    }
  }
}
    ${MenuEntityResponsePropsFragmentDoc}
${MenuPropsFragmentDoc}`;
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
      findProduct(
         variables?: FindProductQueryVariables,
         options?: C
      ): Promise<FindProductQuery> {
         return requester<FindProductQuery, FindProductQueryVariables>(
            FindProductDocument,
            variables,
            options
         );
      },
      findProductList(
         variables?: FindProductListQueryVariables,
         options?: C
      ): Promise<FindProductListQuery> {
         return requester<FindProductListQuery, FindProductListQueryVariables>(
            FindProductListDocument,
            variables,
            options
         );
      },
      findReusableSections(
         variables?: FindReusableSectionsQueryVariables,
         options?: C
      ): Promise<FindReusableSectionsQuery> {
         return requester<
            FindReusableSectionsQuery,
            FindReusableSectionsQueryVariables
         >(FindReusableSectionsDocument, variables, options);
      },
      findStore(
         variables?: FindStoreQueryVariables,
         options?: C
      ): Promise<FindStoreQuery> {
         return requester<FindStoreQuery, FindStoreQueryVariables>(
            FindStoreDocument,
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
