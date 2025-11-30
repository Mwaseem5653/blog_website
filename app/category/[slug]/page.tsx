export const dynamic = "force-dynamic";
export const revalidate = 0;

import { client } from "@/sanity/lib/client";
import { postsByCategoryQuery, allCategoriesQuery } from "@/sanity/lib/query";
import PostCard from "@/components/postcard";
import { Post } from "@/types";
import { urlFor } from "@/sanity/lib/image";

import type { Metadata } from "next";

type DynamicPageParams = {
  slug: string;
};

interface Category {
  title: string;
  slug: string;
}

// New helper function to fetch and process unique categories
let uniqueCategoriesCache: Category[] | null = null;

async function getUniqueCategories(): Promise<Category[]> {

  if (uniqueCategoriesCache) {

    return uniqueCategoriesCache;

  }



  // allCategoriesQuery now returns an array of strings (e.g., ["skin-care", "hair-care"])

  const categoryStrings: string[] = await client.fetch(allCategoriesQuery);



  // Process into unique Category objects with title derived from slug

  const uniqueSlugs = Array.from(new Set(categoryStrings.filter(Boolean))); // Filter out null/undefined/empty strings



  uniqueCategoriesCache = uniqueSlugs.map(slug => ({

    slug: slug,

    title: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') // Convert slug to Title Case

  }));



  return uniqueCategoriesCache;

}



export async function generateMetadata(

  { params }: { params: Promise<DynamicPageParams> }

): Promise<Metadata> {

  const resolvedParams = await params;

  const { slug } = resolvedParams;



  const categories = await getUniqueCategories(); // Use new helper

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
    keywords: `${category.title}, ${category.title.toLowerCase()}, beauty blogs, glow guide blogs`,
    openGraph: {
      title: `${category.title} | Glow Guide Blogs`,
      description: `Explore beauty blogs and guides for ${category.title}.`,
      url: `https://glowguideblogs.vercel.app/category/${slug}`,
      type: "website",
      images: [
        {
          url: "https://glowguideblogs.vercel.app/default-og.jpg", // Default OG image for category pages
          width: 1200,
          height: 630,
          alt: `${category.title} Category`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.title} | Glow Guide Blogs`,
      description: `Beauty tips for ${category.title}.`,
      images: ["https://glowguideblogs.vercel.app/default-og.jpg"], // Default Twitter image for category pages
    },
    alternates: {
      canonical: `https://glowguideblogs.vercel.app/category/${slug}`,
    },
  };
}


// ✅ Static Params
export async function generateStaticParams() {
  const categories = await getUniqueCategories(); // Use new helper
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
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const posts: Post[] = await client.fetch(postsByCategoryQuery, { slug }, { cache: "no-store" });
  const categories = await getUniqueCategories(); // Use new helper
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
                          },
                          mainEntity: posts.map((post) => ({
                            "@type": "BlogPosting",
                            headline: post.title,
                            url: `https://glowguideblogs.vercel.app/post/${post.slug.current}`,
                            image: post.mainImage
                              ? `https://glowguideblogs.vercel.app/_next/image?url=${encodeURIComponent(urlFor(post.mainImage).url())}&w=1200&q=75`
                              : "https://glowguideblogs.vercel.app/default-og.jpg",
                            author: { "@type": "Person", name: post.author?.name || "Glow Guide Blogs" },
                            datePublished: post.publishedAt,
                            dateModified: post._updatedAt,
                            description: post.excerpt,
                          })),
            }),
          }}
        />
      )}
    </div>
  );
}


