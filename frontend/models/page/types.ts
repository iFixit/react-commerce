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
}

export type PageSection =
   | BrowseSection
   | HeroSection
   | SplitWithImageContentSection
   | StatsSection
   | WorkbenchSection
   | PressSection;

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
   featuredProductList: FeaturedProductList[];
   image: CMSImage | null;
}

interface FeaturedProductList {
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
}

export interface StatsSection {
   type: PageSectionType.Stats;
   id: string;
   stats: Stat[];
}

interface Stat {
   number: string;
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

export type NavigationAction = InternalLinkAction | ExternalLinkAction;

export interface InternalLinkAction {
   type: NavigationActionType.InternalLink;
   title: string;
   url: string;
}

export interface ExternalLinkAction {
   type: NavigationActionType.ExternalLink;
   title: string;
   url: string;
}

export enum NavigationActionType {
   InternalLink = 'InternalLink',
   ExternalLink = 'ExternalLink',
}

export interface CMSImage {
   alternativeText: string | null;
   url: string;
   formats: any;
}
