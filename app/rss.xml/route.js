import { client } from "@/sanity/lib/client";
import { allPostsQuery } from "@/sanity/lib/query";
import { urlFor } from "@/sanity/lib/image"; // Assuming urlFor for images
import RSS from 'rss';

export async function GET() {
  const allPosts = await client.fetch(allPostsQuery);
  const siteUrl = "https://glowguideblogs.vercel.app"; // Your base URL

  const feed = new RSS({
    title: "Glow Guide Blogs",
    description: "Your go-to source for beauty, skincare, and wellness.",
    feed_url: `${siteUrl}/rss.xml`,
    site_url: siteUrl,
    image_url: `${siteUrl}/logo.png`, // Path to your blog logo
    managingEditor: "Glow Guide Blogs Admin", // Your name/entity
    webMaster: "Glow Guide Blogs Admin",
    copyright: `${new Date().getFullYear()} Glow Guide Blogs`,
    language: "en",
    pubDate: new Date().toUTCString(),
    ttl: 60, // Time to live in minutes
  });

  // Add posts to the feed
  allPosts.forEach((post) => {
    // You might need a helper to convert Sanity Portable Text to plain text HTML for description
    // For now, we'll use excerpt or title for description, as Portable Text requires a dedicated renderer
    const description = post.excerpt || post.seo?.metaDescription || post.title;
    const imageUrl = post.mainImage ? urlFor(post.mainImage).url() : null;

    feed.item({
      title: post.title,
      description: description,
      url: `${siteUrl}/post/${post.slug.current}`, // URL to the post
      guid: `${siteUrl}/post/${post.slug.current}`, // Unique identifier
      author: post.author?.name || "Glow Guide Blogs",
      date: post.publishedAt || post._createdAt, // Publication date
      enclosure: imageUrl ? { url: imageUrl, type: 'image/jpeg' } : undefined, // Conditionally include image
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
