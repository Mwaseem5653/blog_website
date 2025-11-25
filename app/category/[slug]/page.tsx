export const dynamic = "force-dynamic";
export const revalidate = 0;

import { client } from "@/sanity/lib/client";
import { postsByCategoryQuery, allCategoriesQuery } from "@/sanity/lib/query";
import PostCard from "@/components/postcard";
import { Post } from "@/types";

import type { Metadata } from "next";

type DynamicPageParams = {
  slug: string;
};

interface Category {
  title: string;
  slug: string;
}

// ✅ Metadata function
export async function generateMetadata(
  { params }: { params: Promise<DynamicPageParams> }
): Promise<Metadata> {
  const { slug } = await params;

  const categories: Category[] = await client.fetch(allCategoriesQuery);
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return {
      title: "Category Not Found | Glow Guide Blogs",
      description: "This category does not exist.",
    };
  }

  return {
    title: `${category.title} | Glow Guide Blogs`,
    description: `Read the latest ${category.title} tips, guides, and beauty blogs.`,
    openGraph: {
      title: `${category.title} | Glow Guide Blogs`,
      description: `Explore beauty blogs and guides for ${category.title}.`,
      url: `https://glowguideblogs.vercel.app/category/${slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.title} | Glow Guide Blogs`,
      description: `Beauty tips for ${category.title}.`,
    },
    alternates: {
      canonical: `https://glowguideblogs.vercel.app/category/${slug}`,
    },
  };
}

// ✅ Static Params
export async function generateStaticParams() {
  const categories: Category[] = await client.fetch(allCategoriesQuery);
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

// ✅ Category Page

export default async function CategoryPage({
  params,
}: {
  params: Promise<DynamicPageParams>;
}) {
  const { slug } = await params;

  const posts: Post[] = await client.fetch(postsByCategoryQuery, { slug }, { cache: "no-store" });
  const categories: Category[] = await client.fetch(allCategoriesQuery);
  const category = categories.find((c) => c.slug === slug);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 capitalize">
        {category?.title || slug.replace("-", " ")} Blogs
      </h1>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post.slug.current} post={post} />)
        ) : (
          <p>No posts found in this category.</p>
        )}
      </section>

      {category && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
                          "@context": "https://schema.org",
                          "@type": "CollectionPage",
                          name: category.title,
                          description: `Explore ${category.title} blogs on Glow Guide Blogs`,
                          url: `https://glowguideblogs.vercel.app/category/${slug}`,
                          publisher: {
                            "@type": "Organization",
                            "name": "Glow Guide Blogs",
                            "logo": {
                              "@type": "ImageObject",
                              "url": "https://glowguideblogs.vercel.app/favicon.ico"
                            }
                          }            }),
          }}
        />
      )}
    </div>
  );
}
