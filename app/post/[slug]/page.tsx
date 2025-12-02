import { client } from "@/sanity/lib/client";
import { postBySlugQuery, allPostSlugsQuery } from "@/sanity/lib/query";
import PostPageLayout from "@/components/postpagelayout";
import { urlFor } from "@/sanity/lib/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

// Revalidate the page every hour
export const revalidate = 3600;

interface PortableTextChild {
  text: string;
}

interface PortableTextBlock {
  _type: string;
  children?: PortableTextChild[];
}

// Helper to convert Sanity block content to a plain string
function portableTextToString(blocks: PortableTextBlock[]): string {
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

type Props = {
  params: Promise<DynamicPageParams>;
};

// Generate static pages for all posts at build time
export async function generateStaticParams() {
  const posts = await client.fetch<{ slug: string }[]>(allPostSlugsQuery);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for the page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch(postBySlugQuery, { slug });

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : "/og-image.jpg";

  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    keywords: post.seo?.keywords,
    openGraph: {
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
      url: `/post/${slug}`,
      type: "article",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: post.title }],
      publishedTime: post.publishedAt,
      modifiedTime: post._updatedAt,
      authors: [post.author?.name || "Glow Guide Blogs"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
      images: [imageUrl],
    },
    alternates: {
      canonical: `/post/${slug}`,
    },
  };
}

// The main page component
export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await client.fetch(postBySlugQuery, { slug });

  if (!post) {
    notFound(); // Triggers the 404 page
  }

  const articleBody = portableTextToString(post.content);
  const wordCount = articleBody.split(/\s+/).filter(Boolean).length;

  const postImageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1200).url()
    : "https://glowguideblogs.vercel.app/og-image.jpg";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://glowguideblogs.vercel.app/post/${slug}`,
    },
    "wordCount": wordCount,
    "articleSection": post.category,
    "articleBody": articleBody,
    "image": {
      "@type": "ImageObject",
      "url": postImageUrl,
      "width": post.mainImage?.asset?.metadata?.dimensions?.width || 1200,
      "height": post.mainImage?.asset?.metadata?.dimensions?.height || 630,
    },
    "author": { "@type": "Person", "name": post.author?.name || "Glow Guide Blogs" },
    "publisher": {
      "@type": "Organization",
      "name": "Glow Guide Blogs",
      "logo": {
        "@type": "ImageObject",
        "url": "https://glowguideblogs.vercel.app/favicon.ico"
      }
    },
    "datePublished": post.publishedAt,
    "dateModified": post._updatedAt,
    "description": post.seo?.metaDescription || post.excerpt,
  };

  return (
    <>
      <PostPageLayout post={post} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
    </>
  );
}
