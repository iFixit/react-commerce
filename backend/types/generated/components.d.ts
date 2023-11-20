import type { Schema, Attribute } from '@strapi/strapi';

export interface GlobalNewsletterForm extends Schema.Component {
   collectionName: 'components_global_newsletter_forms';
   info: {
      displayName: 'newsletterForm';
      icon: 'at';
   };
   attributes: {
      title: Attribute.String & Attribute.Required;
      subtitle: Attribute.String & Attribute.Required;
      inputPlaceholder: Attribute.String &
         Attribute.Required &
         Attribute.DefaultTo<'Enter your email'>;
      callToActionButtonTitle: Attribute.String &
         Attribute.Required &
         Attribute.DefaultTo<'Subscribe'>;
   };
}

export interface GlobalPerson extends Schema.Component {
   collectionName: 'components_global_people';
   info: {
      displayName: 'Person';
   };
   attributes: {
      name: Attribute.String;
      role: Attribute.String;
      avatar: Attribute.Media;
   };
}

export interface MenuLinkWithImage extends Schema.Component {
   collectionName: 'components_menu_link_with_images';
   info: {
      displayName: 'linkWithImage';
      icon: 'image';
   };
   attributes: {
      name: Attribute.String & Attribute.Required;
      url: Attribute.String & Attribute.Required;
      image: Attribute.Media & Attribute.Required;
   };
}

export interface MenuLink extends Schema.Component {
   collectionName: 'components_menu_links';
   info: {
      displayName: 'link';
      icon: 'external-link-alt';
   };
   attributes: {
      name: Attribute.String & Attribute.Required;
      url: Attribute.String & Attribute.Required;
      description: Attribute.RichText;
   };
}

export interface MenuProductListLink extends Schema.Component {
   collectionName: 'components_menu_product_list_links';
   info: {
      displayName: 'productListLink';
      icon: 'anchor';
   };
   attributes: {
      name: Attribute.String & Attribute.Required;
      productList: Attribute.Relation<
         'menu.product-list-link',
         'oneToOne',
         'api::product-list.product-list'
      >;
   };
}

export interface MenuSubmenu extends Schema.Component {
   collectionName: 'components_menu_submenus';
   info: {
      displayName: 'submenu';
      icon: 'stream';
   };
   attributes: {
      name: Attribute.String & Attribute.Required;
      submenu: Attribute.Relation<'menu.submenu', 'oneToOne', 'api::menu.menu'>;
   };
}

export interface MiscPlacement extends Schema.Component {
   collectionName: 'components_misc_placements';
   info: {
      displayName: 'Placement';
      description: '';
   };
   attributes: {
      productLists: Attribute.Relation<
         'misc.placement',
         'oneToMany',
         'api::product-list.product-list'
      >;
      showInProductListPages: Attribute.Enumeration<
         [
            'only selected',
            'selected and descendants',
            'only descendants',
            'none'
         ]
      > &
         Attribute.Required;
   };
}

export interface PageBrowse extends Schema.Component {
   collectionName: 'components_page_browses';
   info: {
      displayName: 'browse';
      icon: 'search';
      description: '';
   };
   attributes: {
      title: Attribute.String;
      description: Attribute.RichText;
      image: Attribute.Media;
      categories: Attribute.Component<'page.category', true>;
   };
}

export interface PageCallToAction extends Schema.Component {
   collectionName: 'components_page_call_to_actions';
   info: {
      displayName: 'callToAction';
      icon: 'bolt';
   };
   attributes: {
      title: Attribute.String & Attribute.Required;
      url: Attribute.String & Attribute.Required;
   };
}

export interface PageCategory extends Schema.Component {
   collectionName: 'components_page_categories';
   info: {
      displayName: 'category';
      icon: 'border-all';
      description: '';
   };
   attributes: {
      productList: Attribute.Relation<
         'page.category',
         'oneToOne',
         'api::product-list.product-list'
      >;
      description: Attribute.Text;
   };
}

export interface PageHero extends Schema.Component {
   collectionName: 'components_page_heroes';
   info: {
      displayName: 'hero';
      icon: 'pager';
      description: '';
   };
   attributes: {
      title: Attribute.String;
      description: Attribute.RichText;
      image: Attribute.Media;
      callToAction: Attribute.Component<'page.call-to-action'>;
   };
}

export interface PagePressQuote extends Schema.Component {
   collectionName: 'components_page_press_quotes';
   info: {
      displayName: 'Press Quote';
   };
   attributes: {
      company: Attribute.Relation<
         'page.press-quote',
         'oneToOne',
         'api::company.company'
      >;
      text: Attribute.RichText & Attribute.Required;
   };
}

export interface PagePress extends Schema.Component {
   collectionName: 'components_page_presses';
   info: {
      displayName: 'press quotes';
   };
   attributes: {
      title: Attribute.String;
      description: Attribute.RichText;
      quotes: Attribute.Component<'page.press-quote', true>;
      callToAction: Attribute.Component<'page.call-to-action'>;
   };
}

export interface PageSplitWithImage extends Schema.Component {
   collectionName: 'components_page_split_with_images';
   info: {
      displayName: 'split with image';
      description: '';
   };
   attributes: {
      title: Attribute.String;
      description: Attribute.RichText;
      callToAction: Attribute.Component<'page.call-to-action'>;
      imagePosition: Attribute.Enumeration<['Left', 'Right']> &
         Attribute.DefaultTo<'Right'>;
      image: Attribute.Media;
      label: Attribute.String;
   };
}

export interface PageStatItem extends Schema.Component {
   collectionName: 'components_page_stat_items';
   info: {
      displayName: 'stat item';
   };
   attributes: {
      label: Attribute.String & Attribute.Required;
      value: Attribute.String & Attribute.Required;
   };
}

export interface PageStats extends Schema.Component {
   collectionName: 'components_page_stats';
   info: {
      displayName: 'stats';
      icon: 'chart-line';
   };
   attributes: {
      stats: Attribute.Component<'page.stat-item', true> & Attribute.Required;
   };
}

export interface ProductListBanner extends Schema.Component {
   collectionName: 'components_product_list_banners';
   info: {
      displayName: 'banner';
      icon: 'bullhorn';
   };
   attributes: {
      title: Attribute.String & Attribute.Required;
      description: Attribute.RichText & Attribute.Required;
      callToActionLabel: Attribute.String & Attribute.Required;
      url: Attribute.String & Attribute.Required;
   };
}

export interface ProductListItemTypeOverride extends Schema.Component {
   collectionName: 'components_product_list_item_type_overrides';
   info: {
      displayName: 'ItemTypeOverride';
      description: '';
   };
   attributes: {
      itemType: Attribute.String;
      title: Attribute.String;
      metaTitle: Attribute.String;
      description: Attribute.RichText;
      metaDescription: Attribute.String;
      tagline: Attribute.String;
   };
}

export interface ProductListLinkedProductListSet extends Schema.Component {
   collectionName: 'components_pl_linked_pl_sets';
   info: {
      displayName: 'linkedProductListSet';
      icon: 'sitemap';
   };
   attributes: {
      title: Attribute.String & Attribute.Required;
      productLists: Attribute.Relation<
         'product-list.linked-product-list-set',
         'oneToMany',
         'api::product-list.product-list'
      >;
   };
}

export interface ProductListRelatedPosts extends Schema.Component {
   collectionName: 'components_product_list_related_posts';
   info: {
      displayName: 'relatedPosts';
      icon: 'newspaper';
   };
   attributes: {
      tags: Attribute.String;
   };
}

export interface ProductBitTable extends Schema.Component {
   collectionName: 'components_product_bit_tables';
   info: {
      displayName: 'bit table';
      description: '';
   };
   attributes: {
      title: Attribute.String;
      description: Attribute.RichText;
      bits: Attribute.Relation<
         'product.bit-table',
         'oneToMany',
         'api::screwdriver-bit.screwdriver-bit'
      >;
   };
}

export interface ProductCrossSell extends Schema.Component {
   collectionName: 'components_product_cross_sells';
   info: {
      displayName: 'cross sell';
   };
   attributes: {
      title: Attribute.String;
   };
}

export interface ProductDeviceCompatibility extends Schema.Component {
   collectionName: 'components_product_device_compatibilities';
   info: {
      displayName: 'device compatibility';
   };
   attributes: {
      title: Attribute.String;
      description: Attribute.RichText;
   };
}

export interface ProductProductCustomerReviews extends Schema.Component {
   collectionName: 'components_product_product_customer_reviews';
   info: {
      displayName: 'product customer reviews';
   };
   attributes: {
      title: Attribute.String;
   };
}

export interface ProductProduct extends Schema.Component {
   collectionName: 'components_product_products';
   info: {
      displayName: 'product overview';
   };
   attributes: {
      addToCartBar: Attribute.Boolean & Attribute.DefaultTo<true>;
   };
}

export interface ProductReplacementGuides extends Schema.Component {
   collectionName: 'components_product_replacement_guides';
   info: {
      displayName: 'replacement guides';
      description: '';
   };
   attributes: {
      title: Attribute.String;
   };
}

export interface SectionBanner extends Schema.Component {
   collectionName: 'components_section_banners';
   info: {
      displayName: 'banner';
   };
   attributes: {
      banners: Attribute.Relation<
         'section.banner',
         'oneToMany',
         'api::banner.banner'
      >;
   };
}

export interface SectionFaqs extends Schema.Component {
   collectionName: 'components_section_faqs';
   info: {
      displayName: 'faqs';
   };
   attributes: {
      title: Attribute.String;
      description: Attribute.RichText;
      faqs: Attribute.Relation<'section.faqs', 'oneToMany', 'api::faq.faq'>;
   };
}

export interface SectionFeaturedProducts extends Schema.Component {
   collectionName: 'components_section_featured_products';
   info: {
      displayName: 'featured products';
      description: '';
   };
   attributes: {
      title: Attribute.String;
      description: Attribute.RichText;
      productList: Attribute.Relation<
         'section.featured-products',
         'oneToOne',
         'api::product-list.product-list'
      >;
      background: Attribute.Enumeration<['white', 'transparent']> &
         Attribute.DefaultTo<'transparent'>;
   };
}

export interface SectionLifetimeWarranty extends Schema.Component {
   collectionName: 'components_section_lifetime_warranties';
   info: {
      displayName: 'lifetime warranty';
   };
   attributes: {
      title: Attribute.String;
      description: Attribute.RichText;
   };
}

export interface SectionQuoteCard extends Schema.Component {
   collectionName: 'components_section_quote_cards';
   info: {
      displayName: 'quote card';
   };
   attributes: {
      text: Attribute.RichText & Attribute.Required;
      author: Attribute.Component<'global.person'>;
   };
}

export interface SectionQuoteGallery extends Schema.Component {
   collectionName: 'components_section_quote_galleries';
   info: {
      displayName: 'quote gallery';
   };
   attributes: {
      title: Attribute.String;
      description: Attribute.RichText;
      quotes: Attribute.Component<'section.quote-card', true>;
   };
}

export interface SectionQuote extends Schema.Component {
   collectionName: 'components_section_quotes';
   info: {
      displayName: 'quote';
      description: '';
   };
   attributes: {
      text: Attribute.Text & Attribute.Required;
      author: Attribute.String;
      image: Attribute.Media;
   };
}

export interface SectionServiceValuePropositions extends Schema.Component {
   collectionName: 'components_section_service_value_propositions';
   info: {
      displayName: 'service value propositions';
   };
   attributes: {
      title: Attribute.String;
   };
}

export interface SectionSocialGallery extends Schema.Component {
   collectionName: 'components_section_social_galleries';
   info: {
      displayName: 'SocialGallery';
   };
   attributes: {
      title: Attribute.String;
      description: Attribute.RichText;
      posts: Attribute.Relation<
         'section.social-gallery',
         'oneToMany',
         'api::social-post.social-post'
      >;
   };
}

export interface SectionStories extends Schema.Component {
   collectionName: 'components_section_stories';
   info: {
      displayName: 'stories';
   };
   attributes: {
      title: Attribute.String;
   };
}

export interface StoreFooter extends Schema.Component {
   collectionName: 'components_store_footers';
   info: {
      displayName: 'footer';
      icon: 'shoe-prints';
      description: '';
   };
   attributes: {
      bottomMenu: Attribute.Relation<
         'store.footer',
         'oneToOne',
         'api::menu.menu'
      >;
      partners: Attribute.Relation<
         'store.footer',
         'oneToOne',
         'api::menu.menu'
      >;
      menu1: Attribute.Relation<'store.footer', 'oneToOne', 'api::menu.menu'>;
      menu2: Attribute.Relation<'store.footer', 'oneToOne', 'api::menu.menu'>;
      menu3: Attribute.Relation<'store.footer', 'oneToOne', 'api::menu.menu'>;
   };
}

export interface StoreHeader extends Schema.Component {
   collectionName: 'components_store_headers';
   info: {
      displayName: 'header';
      icon: 'window-maximize';
   };
   attributes: {
      menu: Attribute.Relation<'store.header', 'oneToOne', 'api::menu.menu'>;
   };
}

export interface StoreShopifySettings extends Schema.Component {
   collectionName: 'components_store_shopify_settings';
   info: {
      displayName: 'shopifySettings';
      icon: 'shopping-bag';
      description: '';
   };
   attributes: {
      storefrontDomain: Attribute.String & Attribute.Required;
      storefrontAccessToken: Attribute.String & Attribute.Required;
      delegateAccessToken: Attribute.String;
   };
}

export interface StoreSocialMediaAccounts extends Schema.Component {
   collectionName: 'components_store_social_media_accounts';
   info: {
      displayName: 'socialMediaAccounts';
      icon: 'address-card';
   };
   attributes: {
      twitter: Attribute.String;
      tiktok: Attribute.String;
      facebook: Attribute.String;
      instagram: Attribute.String;
      youtube: Attribute.String;
      repairOrg: Attribute.String;
   };
}

declare module '@strapi/types' {
   export module Shared {
      export interface Components {
         'global.newsletter-form': GlobalNewsletterForm;
         'global.person': GlobalPerson;
         'menu.link-with-image': MenuLinkWithImage;
         'menu.link': MenuLink;
         'menu.product-list-link': MenuProductListLink;
         'menu.submenu': MenuSubmenu;
         'misc.placement': MiscPlacement;
         'page.browse': PageBrowse;
         'page.call-to-action': PageCallToAction;
         'page.category': PageCategory;
         'page.hero': PageHero;
         'page.press-quote': PagePressQuote;
         'page.press': PagePress;
         'page.split-with-image': PageSplitWithImage;
         'page.stat-item': PageStatItem;
         'page.stats': PageStats;
         'product-list.banner': ProductListBanner;
         'product-list.item-type-override': ProductListItemTypeOverride;
         'product-list.linked-product-list-set': ProductListLinkedProductListSet;
         'product-list.related-posts': ProductListRelatedPosts;
         'product.bit-table': ProductBitTable;
         'product.cross-sell': ProductCrossSell;
         'product.device-compatibility': ProductDeviceCompatibility;
         'product.product-customer-reviews': ProductProductCustomerReviews;
         'product.product': ProductProduct;
         'product.replacement-guides': ProductReplacementGuides;
         'section.banner': SectionBanner;
         'section.faqs': SectionFaqs;
         'section.featured-products': SectionFeaturedProducts;
         'section.lifetime-warranty': SectionLifetimeWarranty;
         'section.quote-card': SectionQuoteCard;
         'section.quote-gallery': SectionQuoteGallery;
         'section.quote': SectionQuote;
         'section.service-value-propositions': SectionServiceValuePropositions;
         'section.social-gallery': SectionSocialGallery;
         'section.stories': SectionStories;
         'store.footer': StoreFooter;
         'store.header': StoreHeader;
         'store.shopify-settings': StoreShopifySettings;
         'store.social-media-accounts': StoreSocialMediaAccounts;
      }
   }
}
