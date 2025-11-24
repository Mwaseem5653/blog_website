import PostContent from "./postcontent";
import { urlFor } from "@/sanity/lib/image";

export default function PostPageLayout({ post }: { post: any }) {
  return (
    <div className="max-w-10xl mx-auto">
      <article className="prose dark:prose-invert max-w-none">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight dark:text-white">
          {post.title}
        </h1>

        <div className="mt-3 text-sm text-gray-600 dark:text-gray-300">
          By {post.author?.name} •{" "}
          {post.publishedAt ? new Date(post.publishedAt).toDateString() : ""}
        </div>

        {post.mainImage && (
          // @ts-ignore
          <img
            src={urlFor(post.mainImage).width(1600).url()}
            alt={post.title}
            className="w-full aspect-video rounded-lg shadow-lg mt-8 object-cover"
          />
        )}

        <div className="prose  dark:prose-invert max-w-none mt-8 dark:text-white">
          <PostContent value={post.content || post.body} />
        </div>
      </article>
    </div>
  );
}
