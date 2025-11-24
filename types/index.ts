import { PortableTextBlock } from "@portabletext/react";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface Post {
  title: string;
  slug: {
    current: string;
  };
  mainImage: SanityImageSource;
  category: string;
  _id: string;
  excerpt?: string;
  author?: {
    name: string;
  };
  publishedAt?: string;
  content?: PortableTextBlock[];
  body?: PortableTextBlock[];
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
