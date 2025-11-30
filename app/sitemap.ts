import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { allPostsQuery, allCategoriesQuery } from "@/sanity/lib/query";

export const revalidate = 3600; // Revalidate every hour

// Define types for Sanity posts & categories
type Post = {
  slug: { current: string };
  _updatedAt?: string;
};

type Category = {
  slug?: string;
  lastmod?: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://glowguideblogs.vercel.app";

  const posts: Post[] = await client.fetch(allPostsQuery);
  const categories: Category[] = await client.fetch(allCategoriesQuery);

  const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/post/${post.slug.current}`,
    lastModified: post._updatedAt ? new Date(post._updatedAt) : new Date(),
  }));

  const categoryUrls: MetadataRoute.Sitemap = categories
    .filter((c) => c.slug)
    .map((category) => ({
      url: `${baseUrl}/category/${category.slug}`,
      lastModified: category.lastmod ? new Date(category.lastmod) : new Date(),
    }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...postUrls,
    ...categoryUrls,
  ];
}
