import { client } from "@/sanity/lib/client";
import { allPostsQuery, allCategoriesQuery } from "@/sanity/lib/query";

export default async function sitemap() {
  const baseUrl = "https://glowguideblogs.vercel.app";

  // Fetch all posts and categories from Sanity
  const posts = await client.fetch(allPostsQuery);
  const categories = await client.fetch(allCategoriesQuery);

  // Create URLs for each post
  const postUrls = posts.map((post) => {
    return {
      url: `${baseUrl}/post/${post.slug.current}`,
      lastModified: new Date(post._updatedAt).toISOString(),
    };
  });

  // Create URLs for each category
  const categoryUrls = categories.map((category) => {
    return {
      url: `${baseUrl}/category/${category.slug}`,
      lastModified: category.lastmod ? new Date(category.lastmod).toISOString() : new Date().toISOString(),
    };
  });

  // Combine all URLs
  const urls = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
    },
    ...postUrls,
    ...categoryUrls,
  ];

  return urls;
}
