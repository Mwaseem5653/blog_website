/**
 * components/PostList.tsx
 * Simple wrapper to map posts → PostCard
 */
import PostCard from "./postcard";
import { Post } from "@/types";
import AdUnit from "./addunits"; // Import AdUnit

export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
      {posts.map((p, index) => (
        <>
          <PostCard key={p.slug?.current || p._id} post={p} />
          {/* Add an AdUnit after every 3 posts */}
          {(index + 1) % 3 === 0 && (
            <div className="md:col-span-4 mt-4"> {/* Span full width for the ad */}
              <AdUnit slot="9682322008" />
            </div>
          )}
        </>
      ))}
    </div>
  );
}
