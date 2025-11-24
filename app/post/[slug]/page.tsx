export const dynamic = "force-dynamic";
export const revalidate = 0;

import { client } from '@/sanity/lib/client';
import { postBySlugQuery } from '@/sanity/lib/query';
import PostPageLayout from '@/components/postpagelayout';

interface Params {
  params: { slug: string };
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;

  const post = await client.fetch(
    postBySlugQuery,
    { slug },
    { cache: "no-store" }
  );

  if (!post) return <p>Post not found</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <PostPageLayout post={post} />
    </div>
  );
}
