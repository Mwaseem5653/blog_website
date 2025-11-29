export const dynamic = "force-dynamic";
export const revalidate = 0;

import { client } from "@/sanity/lib/client";
import { postBySlugQuery } from "@/sanity/lib/query";
import PostPageLayout from "@/components/postpagelayout";
import { urlFor } from "@/sanity/lib/image";

import type { Metadata } from "next";


interface PortableTextChild {
  text: string;
}

interface PortableTextBlock {
  _type: string;
  children?: PortableTextChild[];
}

// Helper to convert Sanity block content to a plain string
function portableTextToString(blocks: PortableTextBlock[]) {
  if (!blocks || !Array.isArray(blocks)) {
    return '';
  }
  return blocks
    .map(block => {
      if (block._type !== 'block' || !block.children) {
        return '';
      }
      return block.children.map((child: PortableTextChild) => child.text).join('');
    })
    .join('\n\n');
}

type DynamicPageParams = {
  slug: string;
};

// ✅ DEEPLY ENHANCED METADATA
export async function generateMetadata(
  { params }: { params: Promise<DynamicPageParams> }
): Promise<Metadata> {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const post = await client.fetch(postBySlugQuery, { slug });

  if (!post) {
    return {
      title: "Post Not Found | Glow Guide Blogs",
      description: "",
    };
  }

  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1200).url()
    : "/default-og.jpg";

  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt || post.title,
    keywords: post.seo?.keywords,
    openGraph: {
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt || post.title,
      url: `https://glowguideblogs.vercel.app/post/${slug}`,
      type: "article",
      locale: "en_US",
      siteName: "Glow Guide Blogs",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      // Article specific OG tags
      publishedTime: post.publishedAt,
      modifiedTime: post._updatedAt,
      authors: [post.author?.name || "Glow Guide Blogs"],
      tags: post.seo?.keywords,
    },
    twitter: {
      card: "summary_large_image",
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt || post.title,
      images: [imageUrl],
      creator: "@GlowGuideBlogs",
      site: "@GlowGuideBlogs",
    },
    alternates: {
      canonical: `https://glowguideblogs.vercel.app/post/${slug}`,
    },
  };
}

// ✅ DYNAMIC POST PAGE
export default async function PostPage(
  { params }: { params: Promise<DynamicPageParams> }
) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const post = await client.fetch(postBySlugQuery, { slug }, { cache: "no-store" });

  if (!post) return <p>Post not found for slug: {slug}</p>;

  const articleBody = portableTextToString(post.content);
  const wordCount = articleBody.split(/\s+/).filter(Boolean).length;

  const postImageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1200).url()
    : "https://glowguideblogs.vercel.app/default-og.jpg";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://glowguideblogs.vercel.app/post/${slug}`,
    },
    wordCount: wordCount,
    articleSection: post.category, // Add category as articleSection
    articleBody: articleBody, // Add full article body
    image: {
      "@type": "ImageObject",
      url: postImageUrl,
      width: post.mainImage?.asset?.metadata?.dimensions?.width || 1200,
      height: post.mainImage?.asset?.metadata?.dimensions?.height || 630,
    },
    author: { "@type": "Person", name: post.author?.name || "Glow Guide Blogs" },
    publisher: {
      "@type": "Organization",
      "name": "Glow Guide Blogs",
      "logo": {
        "@type": "ImageObject",
        "url": "https://glowguideblogs.vercel.app/favicon.ico"
      }
    },
    datePublished: post.publishedAt,
    dateModified: post._updatedAt,
    description: post.seo?.metaDescription || post.excerpt || post.title,
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <PostPageLayout post={post} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
    </div>
  );
}
