import { client } from "@/sanity/lib/client";
import { postsByCategoryQuery, allCategorySlugsQuery } from "@/sanity/lib/query";
import PostCard from "@/components/postcard";
import { Post } from "@/types";
import { urlFor } from "@/sanity/lib/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

// Revalidate the page every hour
export const revalidate = 3600;

type DynamicPageParams = {
  slug: string;
};

type Props = {
  params: Promise<DynamicPageParams>;
};

// Helper to convert slug to Title Case
function slugToTitle(slug: string): string {
  return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// Generate static pages for all categories at build time
export async function generateStaticParams() {
  const categorySlugs: string[] = await client.fetch(allCategorySlugsQuery);
  return categorySlugs.map((slug) => ({
    slug: slug,
  }));
}

// Generate metadata for the page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const title = slugToTitle(slug);

  // Optional: Verify category exists before generating metadata
  const categoryExists = (await client.fetch<string[]>(allCategorySlugsQuery)).includes(slug);
  if (!categoryExists) {
    return {
      title: "Category Not Found",
    }
  }

  return {
    title: `${title}`,
    description: `Read the latest ${title} tips, guides, and beauty blogs.`,
    keywords: `${title}, ${title.toLowerCase()}, beauty blogs, glow guide blogs`,
    openGraph: {
      title: `${title} | Glow Guide Blogs`,
      description: `Explore beauty blogs and guides for ${title}.`,
      url: `/category/${slug}`,
      type: "website",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `${title} Category`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Glow Guide Blogs`,
      description: `Beauty tips for ${title}.`,
      images: ["/og-image.jpg"],
    },
    alternates: {
      canonical: `/category/${slug}`,
    },
  };
}

// The main category page component
export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  
  const posts: Post[] = await client.fetch(postsByCategoryQuery, { slug });

  if (posts.length === 0) {
    // Even if the category exists but has no posts, we might want to show a 404
    // Or, show a message like "No posts found in this category."
    // For better SEO, if a category page has no content, it's often better to 404.
    const allCategories = await client.fetch<string[]>(allCategorySlugsQuery);
    if (!allCategories.includes(slug)) {
      notFound();
    }
  }

  const title = slugToTitle(slug);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 capitalize">{title} Blogs</h1>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post.slug.current} post={post} />)
        ) : (
          <div>No posts found in this category.</div>
        )}
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": title,
            "description": `Explore ${title} blogs on Glow Guide Blogs`,
            "url": `https://glowguideblogs.vercel.app/category/${slug}`,
            "publisher": {
              "@type": "Organization",
              "name": "Glow Guide Blogs",
              "logo": {
                "@type": "ImageObject",
                "url": "https://glowguideblogs.vercel.app/favicon.ico"
              }
            },
            "mainEntity": posts.map((post) => ({
              "@type": "BlogPosting",
              "headline": post.title,
              "url": `https://glowguideblogs.vercel.app/post/${post.slug.current}`,
              "image": post.mainImage ? urlFor(post.mainImage).width(1200).url() : "/og-image.jpg",
              "author": { "@type": "Person", "name": post.author?.name || "Glow Guide Blogs" },
              "datePublished": post.publishedAt,
              "dateModified": post._updatedAt,
              "description": post.excerpt,
            })),
          }),
        }}
      />
    </div>
  );
}