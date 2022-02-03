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
}

export type PageSection =
   | BrowseSection
   | HeroSection
   | SplitWithImageContentSection
   | StatsSection
   | WorkbenchSection;

export interface HeroSection {
   type: PageSectionType.Hero;
   id: string;
   title: string | null;
   description: string | null;
   callToAction: PageAction | null;
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
   callToAction: PageAction | null;
   image: CMSImage | null;
   imagePosition: 'left' | 'right';
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

export type PageAction = InternalLinkAction | ExternalLinkAction;

export interface InternalLinkAction {
   type: PageActionType.InternalLink;
   title: string;
   url: string;
}

export interface ExternalLinkAction {
   type: PageActionType.ExternalLink;
   title: string;
   url: string;
}

export enum PageActionType {
   InternalLink = 'InternalLink',
   ExternalLink = 'ExternalLink',
}

export interface CMSImage {
   alternativeText: string | null;
   url: string;
   formats: any;
}
