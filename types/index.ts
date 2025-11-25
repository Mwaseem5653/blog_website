import { PortableTextBlock } from "@portabletext/react";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface Post {
  title: string;
  slug: {
    current: string;
  };
  mainImage?: {
    asset: {
      url: string;
    };
    alt?: string;
  };
  category: string;
  _id: string;
  excerpt?: string;
  author?: {
    name: string;
  };
  publishedAt?: string;
  content?: PortableTextBlock[];
  body?: PortableTextBlock[];
  _updatedAt?: string; // Add this for sitemap lastModified
}

export interface Category {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  image: SanityImageSource;
  description: string;
}
