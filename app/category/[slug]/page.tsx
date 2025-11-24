export const dynamic = "force-dynamic";
export const revalidate = 0;

import { client } from "@/sanity/lib/client";
import { postsByCategoryQuery, allCategoriesQuery } from "@/sanity/lib/query";
import PostCard from "@/components/postcard";
import { Post } from "@/types";

export async function generateStaticParams() {
  const categories = await client.fetch(allCategoriesQuery);
  return categories.map((category: { slug: string }) => ({
    slug: category.slug,
  }));
}

// Fix: explicit type for params
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const posts: Post[] = await client.fetch(
    postsByCategoryQuery,
    { slug },
    { cache: "no-store" }
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post.slug.current} post={post} />)
        ) : (
          <p>No posts found in this category.</p>
        )}
      </section>
    </div>
  );
}
