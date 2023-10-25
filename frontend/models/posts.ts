import { SentryError } from '@ifixit/sentry';
export interface Post {
   id: number;
   title: string;
   date: string;
   image: PostImage | null;
   permalink: string;
   category: string;
}

export interface PostImage {
   url: string;
}

export async function fetchPosts(
   tags: string[],
   ifixitOrigin: string
): Promise<Post[]> {
   const response = await fetch(
      `${ifixitOrigin}/api/2.0/related_posts?data=${encodeURIComponent(
         JSON.stringify({ tags })
      )}`
   );
   if (response.status >= 200 && response.status < 300) {
      const rawStories: RawPost[] = await response.json();
      return rawStories.map<Post>((rawStory) => {
         return {
            id: rawStory.ID,
            title: rawStory.post_title,
            date: rawStory.post_date,
            category: rawStory.categories[0]?.name,
            image: rawStory.featured_image
               ? { url: rawStory.featured_image.md }
               : null,
            permalink: rawStory.permalink || '',
         };
      });
   }
   throw new SentryError(`failed with status "${response.statusText}"`);
}

interface RawPost {
   ID: number;
   post_author: string;
   post_date: string;
   post_date_gmt: string;
   post_content: string;
   post_title: string;
   post_excerpt: string;
   permalink?: string;
   featured_image: RawPostImage;
   categories: RawPostCategory[];
}

interface RawPostCategory {
   term_id: number;
   name: string;
   slug: string;
   term_group: number;
   term_taxonomy_id: number;
   taxonomy: string;
   description: string;
   parent: number;
   count: number;
   filter: string;
   cat_ID: number;
   category_count: number;
   category_description: string;
   cat_name: string;
   category_nicename: string;
   category_parent: number;
}

interface RawPostImage {
   thumbnail: string;
   medium: string;
   medium_large: string;
   large: string;
   '1536x1536': string;
   '2048x2048': string;
   'post-header': string;
   sm: string;
   md: string;
   lg: string;
   'homepage-featured': string;
   'homepage-small': string;
   'homepage-medium': string;
   'rp4wp-thumbnail-post': string;
}
