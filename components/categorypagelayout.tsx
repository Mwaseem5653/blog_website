import PostList from "./postlist";
import { Post } from "@/types";

export default function CategoryPageLayout({ title, posts }: { title: string, posts: Post[] }) {
  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2 text-base md:text-lg">Latest articles in {title}</p>
      </header>

      <PostList posts={posts} />
    </div>
  );
}
