export const dynamic = "force-dynamic";
export const revalidate = 0;

import { client } from '@/sanity/lib/client';
import { postsByCategoryQuery } from '@/sanity/lib/query';
import PostCard from '@/components/postcard';

interface Params {
  params: { slug: string };
}

export default async function CategoryPage({ params }: Params) {
  const { slug } = params;
  console.log("Fetching posts for slug:", slug);

  const posts = await client.fetch(
    postsByCategoryQuery,
    { slug },
    { cache: "no-store" }
  );
  console.log("Fetched posts:", posts);

  return (
    <div>
      

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.length > 0 ? (
          posts.map((post: any) => (
            <PostCard key={post.slug.current} post={post} />
          ))
        ) : (
          <p>No posts found in this category.</p>
        )}
      </section>
    </div>
  );
}
