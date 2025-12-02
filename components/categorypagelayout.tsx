import PostList from "./postlist";
import { Post } from "@/types";
import AdUnit from "./addunits"; // Import AdUnit

export default function CategoryPageLayout({ title, posts }: { title: string, posts: Post[] }) {
  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
        <div className="text-gray-600 dark:text-gray-300 mt-2 text-base md:text-lg">Latest articles in {title}</div>
      </header>

      <PostList posts={posts} />

      {/* Ad Unit */}
      <div className="mt-8">
        <AdUnit slot="9682322008" />
      </div>
    </div>
  );
}
