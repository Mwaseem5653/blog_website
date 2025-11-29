import { PortableTextBlock } from "@portabletext/react";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface Post {
  title: string;
  slug: {
    current: string;
  };
  mainImage?: SanityImageSource;
  excerpt?: string;
  category: string;
  _id: string;
  author?: {
    name: string;
  };
  publishedAt?: string;
  content?: PortableTextBlock[];
  extraImage1?: SanityImageSource;
  extraContent1?: PortableTextBlock[];
  extraImage2?: SanityImageSource;
  extraContent2?: PortableTextBlock[];
  extraImage3?: SanityImageSource;
  extraContent3?: PortableTextBlock[];
  _updatedAt?: string; // Add this for sitemap lastModified
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[]; // Add keywords as an optional array of strings
  };
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
