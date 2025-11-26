import { client } from "@/sanity/lib/client";
import { allPostsQuery, allCategoriesQuery } from "@/sanity/lib/query";

export default async function sitemap() {
  const baseUrl = "https://glowguideblogs.vercel.app";

  // Fetch data
  const posts = await client.fetch(allPostsQuery);
  const categories = await client.fetch(allCategoriesQuery);

  // Post URLs
  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/post/${post.slug.current}`,
    lastModified: post._updatedAt,
  }));

  // Category URLs
  const categoryUrls = categories.map((category) => ({
    url: `${baseUrl}/category/${category.slug.current}`,
    lastModified: new Date().toISOString(),
  }));

  // Combine all URLs
  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
    },
    ...postUrls,
    ...categoryUrls,
  ];
}
