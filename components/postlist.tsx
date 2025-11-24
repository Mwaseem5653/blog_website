/**
 * components/PostList.tsx
 * Simple wrapper to map posts → PostCard
 */
import PostCard from "./postcard";
import { Post } from "@/types";

export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
      {posts.map((p) => <PostCard key={p.slug?.current || p._id} post={p} />)}
    </div>
  );
}
