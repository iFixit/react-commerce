export interface Page {
   path: string;
   title: string;
   sections: PageSection[];
}

export enum PageSectionType {
   Browse = 'Browse',
   Hero = 'Hero',
   SplitWithImageContent = 'SplitWithImageContent',
   Stats = 'Stats',
   Workbench = 'Workbench',
   Press = 'Press',
   FeaturedProductList = 'FeaturedProductList',
   SocialGallery = 'SocialGallery',
   Banner = 'Banner',
   Testimonials = 'Testimonials',
}

export type PageSection =
   | BrowseSection
   | HeroSection
   | SplitWithImageContentSection
   | StatsSection
   | WorkbenchSection
   | PressSection
   | FeaturedProductListSection
   | SocialGallerySection
   | BannerSection
   | TestimonialsSection;

export interface HeroSection {
   type: PageSectionType.Hero;
   id: string;
   title: string | null;
   description: string | null;
   callToAction: NavigationAction | null;
   image: CMSImage | null;
}

export interface BrowseSection {
   type: PageSectionType.Browse;
   id: string;
   title: string | null;
   description: string | null;
   featuredProductLists: FeaturedProductList[];
   image: CMSImage | null;
}

export interface FeaturedProductList {
   handle: string;
   title: string;
   image: CMSImage | null;
}

export interface SplitWithImageContentSection {
   type: PageSectionType.SplitWithImageContent;
   id: string;
   title: string | null;
   description: string | null;
   callToAction: NavigationAction | null;
   image: CMSImage | null;
   imagePosition: SplitImagePosition;
}

export enum SplitImagePosition {
   Left = 'left',
   Right = 'right',
}

export interface WorkbenchSection {
   type: PageSectionType.Workbench;
   id: string;
   title: string | null;
}

export interface StatsSection {
   type: PageSectionType.Stats;
   id: string;
   stats: Stat[];
}

interface Stat {
   value: string;
   label: string;
}

export interface PressSection {
   type: PageSectionType.Press;
   id: string;
   title: string | null;
   description: string | null;
   callToAction: NavigationAction | null;
   quotes: PressQuote[];
}

interface PressQuote {
   name: string | null;
   logo: CMSImage | null;
   text: string | null;
}

export interface FeaturedProductListSection {
   type: PageSectionType.FeaturedProductList;
   id: string;
   title: string | null;
   description: string | null;
   products: FeaturedProduct[];
}

export interface FeaturedProduct {
   id: string;
   title: string;
   handle: string;
   sku: string;
   rating: number;
   ratingCount: number;
   price: number;
   compareAtPrice: number | null;
   inventoryQuantity: number;
   image: CMSImage | null;
}

export interface SocialGallerySection {
   type: PageSectionType.SocialGallery;
   id: string;
   title: string | null;
   description: string | null;
   posts: SocialPost[];
}

export interface SocialPost {
   username: string | null;
   url: string | null;
   image: CMSImage | null;
}

export interface BannerSection {
   type: PageSectionType.Banner;
   id: string;
   template: BannerTemplate;
   title: string | null;
   description: string | null;
   image: CMSImage | null;
   callToAction: NavigationAction | null;
}

export enum BannerTemplate {
   Warranty = 'Warranty',
}

export interface TestimonialsSection {
   type: PageSectionType.Testimonials;
   id: string;
   title: string | null;
   description: string | null;
   testimonials: TestimonialQuote[];
}

export interface TestimonialQuote {
   richText: string;
   author: string;
   avatar: CMSImage | null;
   headline: string | null;
}

export type NavigationAction = LinkAction;

export interface LinkAction {
   type: NavigationActionType.Link;
   title: string;
   url: string;
}

export enum NavigationActionType {
   Link = 'Link',
}

export interface CMSImage {
   alternativeText: string | null;
   url: string;
   formats: any;
}
