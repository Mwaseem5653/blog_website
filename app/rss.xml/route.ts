/* eslint-disable @typescript-eslint/no-explicit-any */

import { client } from "@/sanity/lib/client";
import { allPostsQuery } from "@/sanity/lib/query";
import { urlFor } from "@/sanity/lib/image";
import RSS from "rss";

export const revalidate = 3600; // 1 hour revalidation

type PostType = {
  title: string;
  slug: { current: string };
  excerpt?: string;
  seo?: { metaDescription?: string };
  mainImage?: any;
  author?: { name?: string };
  publishedAt?: string;
  _createdAt: string;
};

export async function GET() {
  const siteUrl = "https://glowguideblogs.vercel.app";

  const posts = await client.fetch(allPostsQuery);

  const feed = new RSS({
    title: "Glow Guide Blogs",
    description: "Your go-to source for beauty, skincare, and wellness.",
    feed_url: `${siteUrl}/rss.xml`,
    site_url: siteUrl,
    image_url: `${siteUrl}/logo.png`,
    managingEditor: "Glow Guide Blogs Admin",
    webMaster: "Glow Guide Blogs Admin",
    language: "en",
    pubDate: new Date(),
    copyright: `${new Date().getFullYear()} Glow Guide`,
    ttl: 60,
  });

  (posts as PostType[]).forEach((post) => {
    const description =
      post.excerpt || post.seo?.metaDescription || post.title;

    const imageUrl = post.mainImage ? urlFor(post.mainImage).url() : null;

    feed.item({
      title: post.title,
      description,
      url: `${siteUrl}/post/${post.slug.current}`,
      guid: `${siteUrl}/post/${post.slug.current}`,

      date: post.publishedAt || post._createdAt,
      enclosure: imageUrl
        ? { url: imageUrl, type: "image/jpeg" }
        : undefined,
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
