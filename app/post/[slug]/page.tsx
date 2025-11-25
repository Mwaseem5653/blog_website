export const dynamic = "force-dynamic";
export const revalidate = 0;

import { client } from "@/sanity/lib/client";
import { postBySlugQuery } from "@/sanity/lib/query";
import PostPageLayout from "@/components/postpagelayout";
import { urlFor } from "@/sanity/lib/image";

import type { Metadata, ResolvingMetadata } from "next";

type DynamicPageParams = {
  slug: string;
};

// ✅ FIXED METADATA
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

  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt || post.title,
    openGraph: {
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt || post.title,
      url: `https://glowguideblogs.vercel.app/post/${slug}`,
      type: "article",
      images: [
        {
          url: post.mainImage
            ? urlFor(post.mainImage).width(1200).url()
            : "/default-og.jpg",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    alternates: {
      canonical: `https://glowguideblogs.vercel.app/post/${slug}`,
    },
  };
}

// ✅ POST PAGE
export default async function PostPage(
  { params }: { params: Promise<DynamicPageParams> }
) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const post = await client.fetch(postBySlugQuery, { slug }, { cache: "no-store" });

  if (!post) return <p>Post not found for slug: {slug}</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <PostPageLayout post={post} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            image: {
              "@type": "ImageObject",
              url: post.mainImage
                ? urlFor(post.mainImage).width(1200).url()
                : "https://glowguideblogs.vercel.app/default-og.jpg",
            },
            author: { "@type": "Person", name: post.author?.name },
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
            description: post.excerpt || post.title,
          }),
        }}
      />
    </div>
  );
}
