export const dynamic = "force-dynamic";
export const revalidate = 0;

import { client } from "@/sanity/lib/client";
import { postBySlugQuery } from "@/sanity/lib/query";
import PostPageLayout from "@/components/postpagelayout";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await client.fetch(
    postBySlugQuery,
    { slug },
    { cache: "no-store" }
  );

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <PostPageLayout post={post} />
    </div>
  );
}
