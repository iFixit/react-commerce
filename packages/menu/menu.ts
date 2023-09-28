export interface Menu {
   title: string;
   items: MenuItem[];
}

export type MenuItem =
   | LinkMenuItem
   | ImageLinkMenuItem
   | ProductListLinkMenuItem
   | SubmenuMenuItem;

export enum MenuItemType {
   Link = 'link',
   ImageLink = 'image-link',
   ProductListLink = 'product-list-link',
   Submenu = 'submenu',
}

export interface LinkMenuItem {
   type: MenuItemType.Link;
   name: string;
   url: string;
   description: string | null;
   trackingData?: TrackingData;
}

type TrackingData = {
   eventCategory: string;
   eventAction: string;
};

export interface ImageLinkMenuItem {
   type: MenuItemType.ImageLink;
   name: string;
   url: string;
   image: MenuImage | null;
}

interface MenuImage {
   alternativeText: string | null;
   url: string;
   formats: any;
}

export interface ProductListLinkMenuItem {
   type: MenuItemType.ProductListLink;
   name: string;
   productList: {
      handle: string;
   } | null;
}

export interface SubmenuMenuItem {
   type: MenuItemType.Submenu;
   name: string;
   submenu: Menu | null;
}
