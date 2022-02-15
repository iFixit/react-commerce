export * from './types';
import {
   ALGOLIA_API_KEY,
   ALGOLIA_APP_ID,
   ALGOLIA_PRODUCTS_INDEX_NAME,
} from '@config/env';
import { assertNever, filterNullableItems } from '@helpers/application-helpers';
import {
   CallToActionFieldsFragment,
   Enum_Banner_Template,
   Enum_Componentpagesplitwithimage_Imageposition,
   ImageFieldsFragment,
   Maybe,
   PublicationState,
   strapi,
} from '@lib/strapi-sdk';
import algoliasearch from 'algoliasearch';
import {
   Banner,
   BannerTemplate,
   CMSImage,
   FeaturedProduct,
   FeaturedProductList,
   Page,
   PageSection,
   PageSectionType,
   SectionAction,
   SectionActionType,
   SocialPost,
   SplitImagePosition,
} from './types';

export async function findPageByPath(path: string): Promise<Page | null> {
   const response = await strapi.findPage({
      filters: {
         path: {
            eq: path,
         },
      },
      publicationState: PublicationState.Live,
      pagination: {
         limit: 1,
      },
   });

   const page = response.pages?.data?.[0]?.attributes;
   if (page == null) {
      return null;
   }
   const rawSections = filterNullableItems(page.sections);
   const sections = await Promise.all(
      rawSections.map(
         async (section, index): Promise<PageSection | null> => {
            switch (section.__typename) {
               case 'ComponentPageHero': {
                  const image = section.image?.data?.attributes;
                  return {
                     type: PageSectionType.Hero,
                     id: `${section.__typename}-${index}`,
                     title: section.title || null,
                     description: section.description || null,
                     callToAction: section.callToAction
                        ? {
                             type: SectionActionType.Link,
                             title: section.callToAction.title || '',
                             url: section.callToAction.url || '#',
                          }
                        : null,
                     image: image
                        ? {
                             alternativeText: image.alternativeText || null,
                             url: image.url,
                             formats: image.formats || null,
                          }
                        : null,
                  };
               }
               case 'ComponentPageBrowse': {
                  const productLists = section.featuredProductLists?.data;
                  const image = section.image?.data?.attributes;
                  const featuredProductLists = productLists?.map<FeaturedProductList | null>(
                     (productList) => {
                        if (productList.attributes == null) {
                           return null;
                        }
                        const image =
                           productList.attributes.image?.data?.attributes;
                        return {
                           handle: productList.attributes.handle,
                           title: productList.attributes.title,
                           image: image
                              ? {
                                   alternativeText:
                                      image.alternativeText || null,
                                   url: image.url,
                                   formats: image.formats || null,
                                }
                              : null,
                        };
                     }
                  );
                  return {
                     type: PageSectionType.Browse,
                     id: `${section.__typename}-${index}`,
                     title: section.title || null,
                     description: section.description || null,
                     featuredProductLists: filterNullableItems(
                        featuredProductLists
                     ),
                     image: image
                        ? {
                             alternativeText: image.alternativeText || null,
                             url: image.url,
                             formats: image.formats || null,
                          }
                        : null,
                  };
               }
               case 'ComponentPageWorkbench': {
                  return {
                     type: PageSectionType.Workbench,
                     id: `${section.__typename}-${index}`,
                     title: section.title || null,
                  };
               }
               case 'ComponentPageStats': {
                  const stats = filterNullableItems(section.stats);
                  return {
                     type: PageSectionType.Stats,
                     id: `${section.__typename}-${index}`,
                     stats: stats.map((statItem) => {
                        return {
                           label: statItem.label,
                           value: statItem.value,
                        };
                     }),
                  };
               }
               case 'ComponentPageSplitWithImage': {
                  const image = section.image?.data?.attributes;
                  return {
                     type: PageSectionType.SplitWithImageContent,
                     id: `${section.__typename}-${index}`,
                     title: section.title || null,
                     description: section.description || null,
                     callToAction: section.callToAction
                        ? {
                             type: SectionActionType.Link,
                             title: section.callToAction.title || '',
                             url: section.callToAction.url || '#',
                          }
                        : null,
                     image: image
                        ? {
                             alternativeText: image.alternativeText || null,
                             url: image.url,
                             formats: image.formats || null,
                          }
                        : null,
                     imagePosition:
                        section.imagePosition ===
                        Enum_Componentpagesplitwithimage_Imageposition.Left
                           ? SplitImagePosition.Left
                           : SplitImagePosition.Right,
                  };
               }
               case 'ComponentPagePress': {
                  const quotes = filterNullableItems(section.pressQuotes);
                  return {
                     type: PageSectionType.Press,
                     id: `${section.__typename}-${index}`,
                     title: section.title || null,
                     description: section.description || null,
                     callToAction: section.callToAction
                        ? {
                             type: SectionActionType.Link,
                             title: section.callToAction.title || '',
                             url: section.callToAction.url || '#',
                          }
                        : null,
                     quotes: quotes.map((quote) => {
                        const image = quote.logo?.data?.attributes;
                        return {
                           name: quote.name || null,
                           logo: image
                              ? {
                                   alternativeText:
                                      image.alternativeText || null,
                                   url: image.url,
                                   formats: image.formats || null,
                                }
                              : null,
                           text: quote.text || null,
                        };
                     }),
                  };
               }
               case 'ComponentPageFeaturedProductList': {
                  const productList = section.productList?.data?.attributes;
                  let products: FeaturedProduct[] = [];
                  if (productList != null) {
                     products = await findFeaturedProducts(
                        productList.handle,
                        10
                     );
                  }
                  return {
                     type: PageSectionType.FeaturedProductList,
                     id: `${section.__typename}-${index}`,
                     title: section.title || null,
                     description: section.description || null,
                     products,
                  };
               }
               case 'ComponentPageSocialGallery': {
                  const rawPosts = filterNullableItems(section.posts);
                  return {
                     type: PageSectionType.SocialGallery,
                     id: `${section.__typename}-${index}`,
                     title: section.title || null,
                     description: section.description || null,
                     posts: rawPosts.map(
                        (post): SocialPost => {
                           const image = post.image?.data?.attributes;
                           return {
                              username: post.author || null,
                              url: post.url || null,
                              image: image
                                 ? {
                                      alternativeText:
                                         image.alternativeText || null,
                                      url: image.url,
                                      formats: image.formats || null,
                                   }
                                 : null,
                           };
                        }
                     ),
                  };
               }
               case 'ComponentPageBanner': {
                  const banner = section.banner?.data?.attributes;
                  if (banner == null) {
                     return null;
                  }
                  const image = banner?.image?.data?.attributes;
                  return {
                     type: PageSectionType.Banner,
                     id: `${section.__typename}-${index}`,
                     template: getBannerTemplate(banner.template),
                     title: banner?.title || null,
                     description: banner.description || null,
                     image: image
                        ? {
                             alternativeText: image.alternativeText || null,
                             url: image.url,
                             formats: image.formats || null,
                          }
                        : null,
                     callToAction: banner.callToAction
                        ? {
                             type: SectionActionType.Link,
                             title: banner.callToAction.title || '',
                             url: banner.callToAction.url || '#',
                          }
                        : null,
                  };
               }
               case 'ComponentPageTestimonials': {
                  const quotes = filterNullableItems(section.quotes);
                  return {
                     type: PageSectionType.Testimonials,
                     id: `${section.__typename}-${index}`,
                     title: section.title || null,
                     description: section.description || null,
                     testimonials: quotes.map((quote) => {
                        const avatar = quote.avatar?.data?.attributes;
                        return {
                           richText: quote.text,
                           author: quote.author,
                           headline: quote.headline || null,
                           avatar: avatar
                              ? {
                                   alternativeText:
                                      avatar.alternativeText || null,
                                   url: avatar.url,
                                   formats: avatar.formats || null,
                                }
                              : null,
                        };
                     }),
                  };
               }
               case 'ComponentPageMultipleBanners': {
                  const cmsBanners = filterNullableItems(section.banners);
                  const banners = cmsBanners.map((cmsBanner): Banner | null => {
                     const bannerId = cmsBanner.banner?.data?.id;
                     const banner = cmsBanner.banner?.data?.attributes;
                     if (bannerId == null || banner == null) {
                        return null;
                     }
                     return {
                        id: bannerId,
                        title: banner.title || null,
                        description: banner.description || null,
                        image: getImageFromFragment(banner.image),
                        callToAction: getCallToActionFromFragment(
                           banner.callToAction
                        ),
                     };
                  });
                  return {
                     type: PageSectionType.MultipleBanners,
                     id: `${section.__typename}-${index}`,
                     title: section.title || null,
                     banners: filterNullableItems(banners),
                  };
               }
               case 'Error': {
                  return null;
               }
               default:
                  return assertNever(section);
            }
         }
      )
   );
   return {
      path: page.path,
      title: page.title,
      sections: filterNullableItems(sections),
   };
}

function getBannerTemplate(cmsTemplate: Enum_Banner_Template): BannerTemplate {
   switch (cmsTemplate) {
      case Enum_Banner_Template.Warranty:
         return BannerTemplate.Warranty;
      case Enum_Banner_Template.Default:
         return BannerTemplate.Default;
      default:
         return assertNever(cmsTemplate);
   }
}

function getImageFromFragment(
   fragment?: Maybe<ImageFieldsFragment>
): CMSImage | null {
   const image = fragment?.data?.attributes;
   if (image == null) {
      return null;
   }
   return {
      alternativeText: image.alternativeText || null,
      url: image.url,
      formats: image.formats || null,
   };
}

function getCallToActionFromFragment(
   fragment?: Maybe<CallToActionFieldsFragment>
): SectionAction | null {
   if (fragment == null || fragment.title == null || fragment.url == null) {
      return null;
   }
   return {
      type: SectionActionType.Link,
      title: fragment.title,
      url: fragment.url,
   };
}

async function findFeaturedProducts(
   productListHandle: string,
   limit: number
): Promise<FeaturedProduct[]> {
   const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
   const index = client.initIndex(ALGOLIA_PRODUCTS_INDEX_NAME);
   const result = await index.search<ProductSearchHit>('', {
      filters: `collections:${productListHandle}`,
      hitsPerPage: limit,
   });
   return result.hits.map((hit) => {
      return {
         id: hit.objectID,
         title: hit.title,
         sku: hit.sku,
         handle: hit.handle,
         rating: 4,
         ratingCount: 102,
         image: {
            alternativeText: '',
            url: hit.product_image,
            formats: {},
         },
         price: hit.price,
         compareAtPrice: hit.compare_at_price || null,
         inventoryQuantity: hit.inventory_quantity,
      };
   });
}

interface ProductSearchHit {
   title: string;
   handle: string;
   price: number;
   compare_at_price?: number;
   sku: string;
   product_image: string;
   body_html_safe?: string;
   inventory_quantity: number;
}
